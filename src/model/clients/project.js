/*
 * Prototype is copy from Vue implementation
 * Since getters aren't enumerated in Object.assign, JSON.stringify and destructuring
 * it could be an idea to use everywhere... for now only used in projectNr and CSV templating
 */

import moment from 'moment'
import {interpolateEvil} from '../../util'

/**
 * Sort projects by date, an then id
 * @param {project} a
 * @param {project} b
 * @returns {number}
 */
export function projectSort(a, b){
  return a.date.toString()===b.date.toString()?(a.id>b.id?1:-1):(a.date>b.date?1:-1)
}

const proto = {

  /**
   * Returns the config
   * @returns {config}
   */
  get config(){
    return this.model.config
  }

  , set model(model) {
    this._model = Object.assign(Object.create({
      get projects(){ return this.clients.reduce((acc, client)=>(acc.push(...client.projects), acc), []) }
    }), model)
  }

  , get model(){ return this._model }

  // /**
  //  * Returns an exact clone of the project
  //  * @returns {Project}
  //  */
  // ,clone(){
  //   const cloned = JSON.parse(JSON.stringify(this))
  //   return create(cloned,this.client,this.model)
  // }

  // /**
  //  * Returns an exact clone of the project
  //  * @returns {Project}
  //  */
  // ,cloneNew(){
  //   const id = Math.max(...this.model.projects.map(p=>p.id))+1
  //   return Object.assign(this.clone(),{
  //     id
  //     ,description: this.description.match(/\s\(clone\s\d*\)/)?this.description.replace(/\d*\)/,`${id})`):`${this.description} (clone ${id})`
  //     ,invoices: []
  //     ,paid: false
  //   })
  // }

  /**
   * Calculate the invoice number by interpolating the template
   * (is same as selectors::getProjectNumber?)
   * @returns {string}
   */
  , calculateInvoiceNr(){
    // ${client.nr}.${project.indexOnClient+1}.${project.dateYear.substr(2,2)}.${project.indexOnYear+1}
    // return (new Function('project','client','return `'+this.model.config.projectNumberTemplate+'`'))(this,this.client)
    return interpolateEvil(this.model.config.projectNumberTemplate, {
      project: this
      , client: this.client
    })
  }

  /**
   * A getter for the invoice number
   * @returns {string}
   */
  , get invoiceNr(){
    return this.calculateInvoiceNr()
  }

  /**
   * Getter for the number of invoices
   * @returns {number}
   */
  , get invoiceNum(){
    return this.invoices.length
  }

  /**
   * Getter for the total excluding VAT
   * @returns {number}
   */
  , get total(){
    return this.lines.reduce((acc, line) => acc + line.amount, 0)
  }

  /**
   * Getter for the total VAT amount
   * @returns {number}
   */
  , get totalVat(){
    return this.lines.reduce((acc, line) => acc + line.amount * 0.01 * line.vat, 0)
  }

  /**
   * Calculate final/cumulative vat percentage
   * @returns {number}
   */
  , get vatAmount(){
    return Math.round(this.totalVat/this.total*100)
  }

  /**
   * Getter for the total discount excluding VAT
   * @returns {number}
   */
  , get totalDiscount(){
    return this.total * 0.01 * this.discount
  }

  /**
   * Getter for the total discounted VAT
   * @returns {number}
   */
  , get totalVatDiscount(){
    return this.totalVat * 0.01 * this.discount
  }

  /**
   * Getter for the total minus discount excluding VAT
   * @returns {number}
   */
  , get totalDiscounted(){
    return this.total - this.totalDiscount
  }

  /**
   * Getter for the total discounted VAT
   * @returns {number}
   */
  , get totalVatDiscounted(){
    return this.totalVat - this.totalVatDiscount
  }

  /**
   * Getter for the discounted total including VAT
   * @returns {number}
   */
  , get totalIncDiscounted(){
    return this.totalDiscounted + this.totalVatDiscounted
  }

  /**
   * Getter for the discounted total with interest excluding VAT
   * @returns {number}
   */
  , get totalIncDiscountedInterest(){
    return this.totalIncDiscounted + this.interest
  }

  /**
   * Getter for the total interest
   * @returns {number}
   */
  , get interest(){
    return (this.daysLate/365)*(0.01*this.model.personal.interestAmount)*this.total
  }

  /**
   * Getter for the date
   * @returns {Date}
   */
  , get date(){
    return this.invoices.length!==0?new Date(this.invoices[0].date):new Date()
  }

  /**
   * Getter for the formatted project date
   * @returns {string}
   */
  , get dateFormatted(){
    const dateFormat = this.model.copy.dateFormat[this.model.config.lang]
    return moment(this.date).format(dateFormat)
  }

  /**
   * Getter for the timestamp of the project
   * @returns {number}
   */
  , get timestamp(){
    return this.date.getTime()
  }

  /**
   * Getter for number of days late
   * @returns {number}
   */
  , get daysLate(){
    let today = new Date()
      , diffMillis = today.getTime()-this.date.getTime()
      , day = 1000*60*60*24
    return diffMillis/day<<0
  }

  /**
   * Getter for late state
   * @returns {boolean}
   */
  , get isLate(){
    return !this.paid&&this.daysLate>this.client.paymentterm
  }

  /**
   * Getter boolean if the project payment is overdue
   * @returns {boolean}
   */
  , get overdue(){
    const dateDiff = new Date() - this.dateLatest
    const dateDiffDays = dateDiff/(1000*60*60*24)
    return !this.paid&&dateDiffDays>this.client.paymentterm
  }

  /**
   * Getter for the latest invoice date
   * @returns {number}
   */
  , get dateLatest(){
    let latestDate = new Date(this.quotationDate||0)
    this.invoices.forEach(invoice=> {
      let invoiceDate = new Date(invoice.date)
      if (invoiceDate>latestDate){
        latestDate = invoiceDate
      }
    })
    return latestDate
  }

  /**
   * Getter for the timestamp of the latest project date
   * @returns {number}
   */
  , get timestampLatest(){
    return this.dateLatest.getTime()
  }

  /**
   * Getter for project date year
   * @returns {number}
   */
  , get year(){
      return this.date.getFullYear()
  }

  /**
   * Getter for project date year as string
   * @returns {string}
   */
  , get dateYear(){
      return this.year.toString()
  }

  /**
   * Returns the project index in that project years projects
   * @returns {number}
   */
  , get indexOnYear(){
    let year = this.year
        , projectsInYear = this.model.projects
            .map(p=>project(p)) // applies prototype
            .filter(project=>project.invoices.length>0&&project.year===year)
            .sort(projectSort)
            .map(project=>project.id)
    return projectsInYear.indexOf(this.id)
  }

  /**
   * Getter for project date quarter
   * @returns {number}
   */
  , get quarter(){
    return ((this.date.getMonth()+1)/4)<<0 + 1
  }

  /**
   * Calculate hourly rate by minimum and maximum
   * @returns {number}
   */
  , get hourlyRateCalculated(){
    const {hourrateMin, hourrateMax, hoursMin, hoursMax} = this.model.personal
    const {totalHours} = this
    let hourlyRate = hourrateMax
    if (totalHours>=hoursMax){
      hourlyRate = hourrateMin
    } else if (totalHours>hoursMin){
      const asdf = (totalHours - hoursMin)/(hoursMax - hoursMin)
      hourlyRate = hourrateMax - asdf*(hourrateMax - hourrateMin)
    }
    return hourlyRate
  }

  /**
   * Getter for the discounted hourly rate
   * @returns {number}
   */
  , get hourlyRateDiscounted(){
    return this.hourlyRate - 0.01*this.discount*this.hourlyRate
  }

  /**
   * Getter for the total hours
   * @returns {number}
   */
  , get totalHours(){
    return this.lines.reduce((acc, line)=>acc+line.hours, 0)
  }

  /**
   * Getter for the project client
   * @returns {client}
   */
  , get client(){
    return this._client
  }

  /**
   * Client name shortcut
   * @returns {string}
   */
  , get clientName(){
    return this.client.name
  }

  /**
   * Returns the project index in client.projects
   * @returns {number}
   */
  , get indexOnClient(){
    let index = -1
    this.client.projects
        .slice(0)
        .forEach((p, i)=>{
          if (p.id===this.id) index = i
        })
    return index
  }

  // /**
  //  * Add a line to the project
  //  * @param {number} vat
  //  */
  // ,addLine(vat=21){
  //   this.lines.push({amount:0,hours:0,vat})
  // }

  // /**
  //  * Add an invoice
  //  */
  // ,addInvoice(invoice){
  //   const {invoices} = this
  //   const defaultInvoice = {
  //     date: moment().format('YYYY-MM-DD')
  //     ,type: invoices.length===0?'invoice':'reminder'
  //     ,interest: false
  //     ,exhortation: false
  //   }
  //   invoice&&Object.assign(defaultInvoice,invoice)
  //   invoices.push(createInvoice(defaultInvoice))
  // }

  /**
   * Highest VAT amount
   * @returns {number}
   */
  , get vatMax(){
    return Math.max(...this.lines.map(line=>line.vat))
  }

  /**
   * Getter for the url of the project
   * @returns {string}
   */
  , get uri(){
    return `/client/${this.clientNr}/${this.indexOnClient}`
  }

  /**
   * Get the number of lines
   * @returns {number}
   */
  , get numLines(){
    return (this.lines||[]).length
  }

}

export const project = (...props) => Object.assign(Object.create(proto), ...props)