// https://en.wikipedia.org/wiki/ISO_4217
const currencyISO = {};
[
  ['Albania Lek', 'ALL', 'Lek'],
  ['Afghanistan Afghani', 'AFN', '؋'],
  ['Argentina Peso', 'ARS', '$'],
  ['Aruba Guilder', 'AWG', 'ƒ'],
  ['Australia Dollar', 'AUD', '$'],
  ['Azerbaijan New Manat', 'AZN', 'ман'],
  ['Bahamas Dollar', 'BSD', '$'],
  ['Barbados Dollar', 'BBD', '$'],
  ['Belarus Ruble', 'BYN', 'Br'],
  ['Belize Dollar', 'BZD', 'BZ$'],
  ['Bermuda Dollar', 'BMD', '$'],
  ['Bolivia Bolíviano', 'BOB', '$b'],
  ['Bosnia and Herzegovina Conververtable Marka', 'BAM', 'KM'],
  ['Botswana Pula', 'BWP', 'P'],
  ['Bulgaria Lev', 'BGN', 'лв'],
  ['Brazil Real', 'BRL', 'R$'],
  ['Brunei Darussalam Dollar', 'BND', '$'],
  ['Cambodia Riel', 'KHR', '៛'],
  ['Canada Dollar', 'CAD', '$'],
  ['Cayman Islands Dollar', 'KYD', '$'],
  ['Chile Peso', 'CLP', '$'],
  ['China Yuan Renminbi', 'CNY', '¥'],
  ['Colombia Peso', 'COP', '$'],
  ['Costa Rica Colon', 'CRC', '₡'],
  ['Croatia Kuna', 'HRK', 'kn'],
  ['Cuba Peso', 'CUP', '₱'],
  ['Czech Republic Koruna', 'CZK', 'Kč', ],
  ['Denmark Krone', 'DKK', 'kr'],
  ['Dominican Republic Peso', 'RD$', '$'],
  ['East Caribbean Dollar', 'XCD', '$'],
  ['Egypt Pound', 'EGP', '£'],
  ['El Salvador Colon', 'SVC', '$'],
  ['Euro Member Countries', 'EUR', '€'],
  ['Falkland Islands (Malvinas) Pound', 'FKP', '£'],
  ['Fiji Dollar', 'FJD', '$'],
  ['Ghana Cedi', 'GHS', '¢'],
  ['Gibraltar Pound', 'GIP', '£'],
  ['Guatemala Quetzal', 'GTQ', 'Q'],
  ['Guernsey Pound', 'GGP', '£'],
  ['Guyana Dollar', 'GYD', '$'],
  ['Honduras Lempira', 'HNL', 'L'],
  ['Hong Kong Dollar', 'HKD', '$'],
  ['Hungary Forint', 'HUF', 'Ft'],
  ['Iceland Krona', 'ISK', 'kr'],
  ['India Rupee', 'INR', '₹'],
  ['Indonesia Rupiah', 'IDR', 'Rp'],
  ['Iran Rial', 'IRR', '﷼'],
  ['Isle of Man Pound', 'IMP', '£'],
  ['Israel Shekel', 'ILS', '₪'],
  ['Jamaica Dollar', 'JMD', 'J$'],
  ['Japan Yen', 'JPY', '¥'],
  ['Jersey Pound', 'JEP', '£'],
  ['Kazakhstan Tenge', 'KZT', 'лв'],
  ['Korea (North) Won', 'KPW', '₩'],
  ['Korea (South) Won', 'KRW', '₩'],
  ['Kyrgyzstan Som', 'KGS', 'лв'],
  ['Laos Kip', 'LAK', '₭'],
  ['Lebanon Pound', 'LBP', '£'],
  ['Liberia Dollar', 'LRD', '$'],
  ['Macedonia Denar', 'MKD', 'ден'],
  ['Malaysia Ringgit', 'MYR', 'RM'],
  ['Mauritius Rupee', 'MUR', '₨'],
  ['Mexico Peso', 'MXN', '$'],
  ['Mongolia Tughrik', 'MNT', '₮'],
  ['Mozambique Metical', 'MZN', 'MT'],
  ['Namibia Dollar', 'NAD', '$'],
  ['Nepal Rupee', 'NPR', '₨'],
  ['Netherlands Antilles Guilder', 'ANG',  'ƒ'],
  ['New Zealand Dollar', 'NZD', '$'],
  ['Nicaragua Cordoba', 'NIO', 'C$'],
  ['Nigeria Naira', 'NGN', '₦'],
  ['Norway Krone', 'NOK', 'kr'],
  ['Oman Rial', 'OMR', '﷼'],
  ['Pakistan Rupee', 'PKR', '₨'],
  ['Panama Balboa', 'PAB', 'B'],
  ['Paraguay Guarani', 'PYG', 'Gs'],
  ['Peru Sol', 'PEN', 'S'],
  ['Philippines Peso', 'PHP', '₱'],
  ['Poland Zloty', 'PLN', 'zł'],
  ['Qatar Riyal', 'QAR', '﷼'],
  ['Romania New Leu', 'RON', 'lei'],
  ['Russia Ruble', 'RUB', '₽'],
  ['Saint Helena Pound', 'SHP', '£'],
  ['Saudi Arabia Riyal', 'SAR', '﷼'],
  ['Serbia Dinar', 'RSD', 'Дин.'],
  ['Seychelles Rupee', 'SCR', '₨'],
  ['Singapore Dollar', 'SGD', '$'],
  ['Solomon Islands Dollar', 'SBD', '$'],
  ['Somalia Shilling', 'SOS', 'S'],
  ['South Africa Rand', 'ZAR', 'R'],
  ['Sri Lanka Rupee', 'LKR', '₨'],
  ['Sweden Krona', 'SEK', 'kr'],
  ['Switzerland Franc', 'CHF', 'CHF'],
  ['Suriname Dollar', 'SRD', '$'],
  ['Syria Pound', 'SYP', '£'],
  ['Taiwan New Dollar', 'TWD', 'NT$'],
  ['Thailand Baht', 'THB', '฿'],
  ['Trinidad and Tobago Dollar',  'TT$', 'TTD'],
  ['Turkey Lira', 'TRY', '₺'],
  ['Tuvalu Dollar', 'TVD', '$'],
  ['Ukraine Hryvnia', 'UAH', '₴'],
  ['United Kingdom Pound', 'GBP', '£'],
  ['United States Dollar', 'USD', '$'],
  ['Uruguay Peso', 'UYU', '$U'],
  ['Uzbekistan Som', 'UZS', 'лв'],
  ['Venezuela Bolivar', 'VEF', 'Bs'],
  ['Viet Nam Dong', 'VND', '₫'],
  ['Yemen Rial', 'YER', '﷼'],
  ['Zimbabwe Dollar', 'ZWD', 'Z$']
].forEach(([name, ISO, sign])=>{
  currencyISO[ISO] = {name, ISO, sign}
})
// Object.freeze(currencyISO)

export const CURRENCY_ISO = currencyISO
