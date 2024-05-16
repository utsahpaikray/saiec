import {
  breakpoint2xlMin,
  breakpointLgMin,
  breakpointMdMin,
  breakpointSmMin,
  breakpointXlMin
} from 'src/tokens/build/js/es6'

export enum Breakpoints {
  SM = parseInt(breakpointSmMin, 10),
  MD = parseInt(breakpointMdMin, 10),
  LG = parseInt(breakpointLgMin, 10),
  XL = parseInt(breakpointXlMin, 10),
  XXL = parseInt(breakpoint2xlMin, 10)
}

export enum Viewports {
  Mobile = 'Mobile',
  Tablet = 'Tablet',
  Desktop = 'Desktop'
}
