import { Directive, ElementRef, Input } from '@angular/core';

@Directive({
  selector: '[appMark]'
})
export class MarkBaseDirective {

  @Input() mark: string | undefined;
 
  constructor(private el: ElementRef) {
  }
 
  ngOnInit() {
    console.log(this.mark)
    console.log(this.el.nativeElement.innerText)
    this.el.nativeElement.color = this.setColor(this.mark);
  }
  setColor(value: any) {
    console.log(value)
    switch (true) {
      
      // If score is 90 or greater
      case value >= 90:
       
       return 'success'
      case value >= 80:
        return 'success'
      case value >= 70:
        return 'secondary'
      // If score is 60 or greater
      case value >= 60:
       return 'warning'
      // Anything 59 or below is failing
      default:
        return 'danger'
    }
    
  }

}
