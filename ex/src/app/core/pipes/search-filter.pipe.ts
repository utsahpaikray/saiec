import { Pipe, PipeTransform } from '@angular/core'

@Pipe({
  name: 'searchFilter'
})
export class SearchFilterPipe implements PipeTransform {
  transform(value: any, filterText: string): any {
    if (!filterText) return value
    return value.filter(
      (v: { name: string }) =>
        v.name.toLowerCase().indexOf(filterText.toLowerCase()) > -1
    )
  }
}
