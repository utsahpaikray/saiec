import { GravIcon } from '@vanderlande-gravity/components/types/svg-icon/icon.model'

const loadingSpinner: GravIcon = {
  data: `
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 90 90">
    <defs>
        <linearGradient id="spinner-gradient">
            <stop offset="0%" stop-color="var(--grav-color-layout-content-link-ondark-text-hover)"/>
            <stop offset="100%" stop-color="var(--grav-color-layout-component-border-disabled)"/>
        </linearGradient>
        <style>@keyframes rotate{0%{transform:rotate(105deg)}to{transform:rotate(465deg)}}
        </style>
    </defs>
    <circle cx="45" cy="45" r="40" fill="var(--grav-color-base-clear)" stroke-width="10" style="stroke:url(#spinner-gradient);animation-name:rotate;animation-duration:1200ms;animation-iteration-count:infinite;animation-timing-function:cubic-bezier(.4,0,.2,1);transform-origin:center;transform-box:fill-box"/>
  </svg>
  `,
  name: 'loading-spinner'
}

export default loadingSpinner
