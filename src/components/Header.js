import React, { useState } from 'react'
import { Link, withRouter } from 'react-router-dom'
import styled, {css} from 'styled-components'
// import './header.scss'
import { SaveableButtons } from './SaveableButtons'
import {Logo} from './Logo'
import {size, color, breakpoint} from '../cssService'

const {breakpointLow, breakpointHigh} = breakpoint
const {headerHeight, padding, multiply, sum} = size
const halfHeaderHeight = multiply(headerHeight, 0.5)
const {colorHeader} = color

const StyledHeaderLink = styled(Link)`
  color: white;
  text-decoration: none;
  ${props => props.current==='true' && css`
    background-color: #333;
    color: white;
  `}
`
const HeaderLink = withRouter(props => {
  const { children, to, location: { pathname }} = props
  const { staticContext, ...attr } = props
  const isCurrent = to === pathname
  return <StyledHeaderLink current={isCurrent.toString()} {...attr}>{children}</StyledHeaderLink>
})

const StyledHeader = styled.header`
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  max-width: 100vw;
  max-height: ${headerHeight};
  overflow: visible;
  z-index: 3;
  background-color: ${colorHeader};
  box-shadow: 0 0 16px ${colorHeader};
  color: #FFF;
  .home-icon {
    position: absolute;
    left: 0;
    top: 0;
    z-index: 3;
    float: left;
    height: ${headerHeight};
    width: ${headerHeight};
    padding: 0;
    overflow: hidden;
    @media ${breakpointHigh} { position: relative; }
    svg {
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%,-50%);
    }
  }
  
  .page-title {
    position: absolute;
    left: 48px;
    top: 0;
    padding: 0;
    color: white;
    line-height: ${headerHeight};
  }
  
  a { font-size: 14px; }
  
  @media ${breakpointLow} {
    
    nav>ul>li {
      float: right;
      width: 100vw;
      height: ${headerHeight};
      text-align: right;
      background-color: ${colorHeader};
      a {
        display: block;
        width: 100%;
        height: 100%;
        padding: ${padding};
      }
    }
    [for=hamburger] {
      display: block;
      width: ${halfHeaderHeight};
      height: ${headerHeight};
      padding: 1px 0;
      margin: 0;
      margin-left: calc(100vw - ${halfHeaderHeight});
      &:before, &:after, span {
        content: '';
        display: block;
        width: 100%;
        height: 4px;
        margin: 6px 0;
        background-color: white;
      }
      +ul {
        background-color: ${colorHeader};
      }
    }
    #hamburger+label+ul {
      position: absolute;
      right: 0;
      height: 100vh;
      background: #444 linear-gradient(to right, lighten(${colorHeader},5%), ${colorHeader});
      overflow: hidden;
      transform: translateX(100%);
      transition: transform 300ms ease;
      box-shadow: 0 0 0 ${colorHeader};
      li {
        display: block;
      }
      a {
        padding-left: 1rem;
      }
    }
    #hamburger:checked+label+ul {
      transform: translateX(0);
      box-shadow: 0 0 16px ${colorHeader};
    }
    >*:last-child {
      right: ${sum(halfHeaderHeight, padding)};
    }
  }
  @media ${breakpointHigh} {
    ul ul ul ${StyledHeaderLink}[current="true"] {
      box-shadow: 3rem 0 #333;
    }
    a {
      display: inline-block;
      padding: 0 16px;
      min-height: ${headerHeight};
      line-height: ${headerHeight};
      transition: background-color 200ms linear;
      &[current="false"] {
       background-color: ${colorHeader};
      }
      &:hover {
        background-color: lighten(${colorHeader},5%);
        box-shadow: 100px 0 0 lighten(${colorHeader},5%) inset;
      }
    }
  }
`

const DropLiStyled = styled.li`
  @media ${breakpointHigh} {
    position: relative;
    label {
      position: relative;
      z-index: 1;
      min-height: ${headerHeight};
      margin: 0;
      padding: 0;
      background-color: red;
    }
    ul {
      position: absolute;
      left: 0;
      top: ${headerHeight};
      display: block;
      min-width: 100%;
      overflow: hidden;
      background-color: ${colorHeader};
      transform: translateY(-100%);
      transition: transform 200ms linear;
    }
    &:hover ul, input:checked+ul {
      transform: translateY(0);
    }
  }
`
const DropLi = ({to,title,children}) => <DropLiStyled>
  <label htmlFor={'drop'+to}><HeaderLink to={to}>{title}</HeaderLink></label>
  <input className="visually-hidden" id={'drop'+to} type="checkbox" />
  {children}
</DropLiStyled>

export const Header = () => {
  const [hamburger, setHamburger] = useState(false)
  return (
    <StyledHeader>
      <nav>
        <HeaderLink to="/" className="home-icon" style={{backgroundColor:'transparent'}}>
          <Logo/>
        </HeaderLink>
        <h2 className="page-title hide-high">pageTitle</h2>
        <ul className="list-unstyled list-inline">
          <li>
            <input
              defaultChecked={hamburger}
              className="visually-hidden"
              id="hamburger"
              type="checkbox"
            />
            <label htmlFor="hamburger"><span /></label>
            <ul onClick={() => setHamburger(!hamburger)} className="list-inline">
              <li className="hide-high"><HeaderLink to="/">home</HeaderLink></li>
              <DropLi to="/overview" title="overview">
                <ul>
                  <li><HeaderLink to="/overview/quarter">quarter</HeaderLink></li>
                </ul>
              </DropLi>
              <li><HeaderLink to="/clients">clients</HeaderLink></li>
              <DropLi to="/settings" title="settings">
                <ul>
                  <li><HeaderLink to="/layout">layout</HeaderLink></li>
                  <li><HeaderLink to="/data">data</HeaderLink></li>
                  <li><HeaderLink to="/copy">copy</HeaderLink></li>
                </ul>
              </DropLi>
              <li><HeaderLink to="/about">about</HeaderLink></li>
            </ul>
          </li>
        </ul>
      </nav>
      <SaveableButtons />
    </StyledHeader>
  )
}
