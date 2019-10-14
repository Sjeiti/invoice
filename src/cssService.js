
// todo temp solution, names and values should be same as _variables.scss


import {css} from 'styled-components'

export const color = {
  colorButton: '#1d85b4'
  , colorShade: 'rgba(0,0,0,0.1)'
  , shadeFlat: '2px 3px 1px rgba(0, 0, 0, 0.2)'
  , colorBorder: '#BBB'
}

export const clearfix = css`
  &:after {
    content: '';
    display: table;
    clear: both;
  }
`

export const formElement = css`
  display: block;
  margin: 0 2px 4px 0;
  padding: 8px 14px;
  border: 0;
  border-radius: 3px;
  line-height: 100%;
  font-family: inherit;
  font-size: inherit;
  &:focus {
    outline: none;
    border: 0;
  }
  &:last-child { margin-right: 0; }
`

export const icon = css`
  font-family: icomoon;
  speak: none;
  font-style: normal;
  font-weight: 400;
  font-variant: normal;
  text-transform: none;
  line-height: 1;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
`

export const absolute = (left, top) => ({position: 'absolute', left: `${left}rem`, top: `${top}rem`})