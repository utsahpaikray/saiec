import { Pipe, PipeTransform } from '@angular/core'

@Pipe({
  name: 'sortBy'
})
export class SortByPipe implements PipeTransform {
  transform(
    value: any[] | undefined,
    sortBy: object,
    culture?: string
  ): any[] | undefined {
    if (!value) return

    let sortedValue = value

    Object.entries(sortBy).forEach(([sortType, sortPropertyName]) => {
      switch (sortType) {
        case 'alphabet':
          sortedValue = this.sortAlphabetically(
            sortedValue,
            sortPropertyName,
            culture
          )
          break

        case 'property':
          sortedValue = this.sortExistingProperty(sortedValue, sortPropertyName)
          break

        default:
          // For now there's no default sort behavior, so we just break the switch
          break
      }
    })

    return sortedValue
  }

  /**
   * Sorts provided list alphabetically based on a list item's property name or the item itself
   * @param {any[]} list
   * @param {string} propertyName
   * @param {string} culture
   * @returns {any[]}
   */
  sortAlphabetically(
    list: any[],
    propertyName: string,
    culture?: string
  ): any[] {
    const collator = new Intl.Collator(culture, {
      caseFirst: 'upper'
    })

    // If item's property name is provided then we sort by that property
    if (propertyName) {
      return list.sort((a, b) =>
        collator.compare(a[propertyName], b[propertyName])
      )
    }

    // If item's property name is not provided then we sort by the item itself
    return list.sort((a, b) => collator.compare(a, b))
  }

  /**
   * Sorts provided list by existing property based on a list item's property name
   * @param {object[]} list
   * @param {string} propertyName
   * @returns {object[]}
   */
  sortExistingProperty(list: object[], propertyName: string): object[] {
    if (!propertyName) return list

    return list.sort(
      (itemA, itemB) =>
        Number(propertyName in itemB) - Number(propertyName in itemA)
    )
  }
}
