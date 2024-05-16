import { Component, Input } from '@angular/core'
import {
  breakpointSmMin,
  breakpointMdMin,
  breakpointLgMin,
  breakpointXlMin,
  breakpoint2xlMin
} from 'src/tokens/build/js/es6'

@Component({
  selector: 'app-picture',
  templateUrl: './picture.component.html'
})
export class PictureComponent {
  public breakpointSm = `(min-width: ${breakpointSmMin})`
  public breakpointMd = `(min-width: ${breakpointMdMin})`
  public breakpointLg = `(min-width: ${breakpointLgMin})`
  public breakpointXl = `(min-width: ${breakpointXlMin})`
  public breakpoint2xl = `(min-width: ${breakpoint2xlMin})`

  @Input()
  imageClass: string = ''
  @Input()
  imageTitle?: string | null

  @Input()
  imageXs?: string | null
  @Input()
  imageSm?: string | null
  @Input()
  imageMd?: string | null
  @Input()
  imageLg?: string | null
  @Input()
  imageXl?: string | null
  @Input()
  image2xl?: string | null

  constructor() {}
}
