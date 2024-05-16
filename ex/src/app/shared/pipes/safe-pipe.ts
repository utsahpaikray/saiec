import { Pipe, PipeTransform, inject } from '@angular/core'
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser'

export type SafePipeType = 'html' | 'style' | 'script' | 'url' | 'resourceUrl'

@Pipe({
  standalone: true,
  name: 'SafeResourceUrl'
})
export class SafeResourceUrlPipe implements PipeTransform {
  private sanitizer = inject(DomSanitizer)

  public transform(value: string | null): SafeResourceUrl {
    if (!value) {
      return ''
    }
    return this.sanitizer.bypassSecurityTrustResourceUrl(value)
  }
}
