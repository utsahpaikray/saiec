import { DocumentTableItem } from '@pages/documentation/document-table/document-table-item.interface'
import { SortByPipe } from './sort-by.pipe'

const mockStringsNotSortedAlphabetically: string[] = [
  'ZB_MOE.C22-PV-K02-24-P1-EN_2019_04_23.pdf',
  'aB_MOE.C22-PV-K02-24-P1-EN_2019_04_15.pdf',
  'zB_MOE.C22-L-B-24_EN_2019_02.pdf',
  'dB_MOE.C22-L-B-24_EN_2019_02.pdf'
]

describe('SortByPipe', () => {
  let pipe: SortByPipe
  let mockDocumentItemsNotSorted: DocumentTableItem[]

  beforeEach(() => {
    pipe = new SortByPipe()
    mockDocumentItemsNotSorted = [
      {
        name: 'ZB_MOE.C22-PV-K02-24-P1-EN_2019_04_23.pdf',
        depth: 0
      },
      {
        children: [
          {
            name: '2019_02.pdf',
            depth: 1
          }
        ],
        name: 'aB_MOE.C22-PV-K02-24-P1-EN_2019_04_15',
        depth: 0
      },
      {
        name: 'dB_MOE.C22-L-B-24_EN_2019_02.pdf',
        depth: 0
      },
      {
        children: [
          {
            name: '23.pdf',
            depth: 1
          }
        ],
        name: 'zB_MOE.C22-L-B-24_EN_2019_02',
        depth: 0
      }
    ]
  })

  it('create an instance', () => {
    expect(pipe).toBeTruthy()
  })

  describe('By existing property', () => {
    it("sorts document items by property name 'children'", () => {
      const mockDocumentItemsSorted: DocumentTableItem[] = [
        {
          children: [
            {
              name: '2019_02.pdf',
              depth: 1
            }
          ],
          name: 'aB_MOE.C22-PV-K02-24-P1-EN_2019_04_15',
          depth: 0
        },
        {
          children: [
            {
              name: '23.pdf',
              depth: 1
            }
          ],
          name: 'zB_MOE.C22-L-B-24_EN_2019_02',
          depth: 0
        },
        {
          name: 'ZB_MOE.C22-PV-K02-24-P1-EN_2019_04_23.pdf',
          depth: 0
        },
        {
          name: 'dB_MOE.C22-L-B-24_EN_2019_02.pdf',
          depth: 0
        }
      ]

      expect(
        pipe.transform(
          mockDocumentItemsNotSorted,
          {
            property: 'children'
          },
          'en-US'
        )
      ).toEqual(mockDocumentItemsSorted)
    })

    it("doesn't sort document items if no property name provided", () => {
      expect(
        pipe.transform(mockDocumentItemsNotSorted, {
          property: ''
        })
      ).toEqual(mockDocumentItemsNotSorted)
    })

    it("doesn't sort document items if property provided doesn't exist", () => {
      expect(
        pipe.transform(mockDocumentItemsNotSorted, { property: 'not-existent' })
      ).toEqual(mockDocumentItemsNotSorted)
    })
  })

  describe('Alphabetically (with culture)', () => {
    it('sorts document items if property is provided (name) with correct culture', () => {
      const mockDocumentItemsSorted: DocumentTableItem[] = [
        {
          children: [
            {
              name: '2019_02.pdf',
              depth: 1
            }
          ],
          name: 'aB_MOE.C22-PV-K02-24-P1-EN_2019_04_15',
          depth: 0
        },
        {
          name: 'dB_MOE.C22-L-B-24_EN_2019_02.pdf',
          depth: 0
        },
        {
          children: [
            {
              name: '23.pdf',
              depth: 1
            }
          ],
          name: 'zB_MOE.C22-L-B-24_EN_2019_02',
          depth: 0
        },
        {
          name: 'ZB_MOE.C22-PV-K02-24-P1-EN_2019_04_23.pdf',
          depth: 0
        }
      ]

      expect(
        pipe.transform(
          mockDocumentItemsNotSorted,
          {
            alphabet: 'name'
          },
          'en-US'
        )
      ).toEqual(mockDocumentItemsSorted)
    })

    it('sorts strings if no property is provided', () => {
      const mockStringsSorted: string[] = [
        'aB_MOE.C22-PV-K02-24-P1-EN_2019_04_15.pdf',
        'dB_MOE.C22-L-B-24_EN_2019_02.pdf',
        'zB_MOE.C22-L-B-24_EN_2019_02.pdf',
        'ZB_MOE.C22-PV-K02-24-P1-EN_2019_04_23.pdf'
      ]

      expect(
        pipe.transform(
          mockStringsNotSortedAlphabetically,
          {
            alphabet: ''
          },
          'en-US'
        )
      ).toEqual(mockStringsSorted)
    })
  })

  describe('Alphabetically & By existing property', () => {
    it('sorts document items if both properties are provided', () => {
      const mockDocumentItemsSorted: DocumentTableItem[] = [
        {
          children: [
            {
              name: '2019_02.pdf',
              depth: 1
            }
          ],
          name: 'aB_MOE.C22-PV-K02-24-P1-EN_2019_04_15',
          depth: 0
        },
        {
          children: [
            {
              name: '23.pdf',
              depth: 1
            }
          ],
          name: 'zB_MOE.C22-L-B-24_EN_2019_02',
          depth: 0
        },
        {
          name: 'dB_MOE.C22-L-B-24_EN_2019_02.pdf',
          depth: 0
        },
        {
          name: 'ZB_MOE.C22-PV-K02-24-P1-EN_2019_04_23.pdf',
          depth: 0
        }
      ]

      expect(
        pipe.transform(
          mockDocumentItemsNotSorted,
          {
            alphabet: 'name',
            property: 'children'
          },
          'en-US'
        )
      ).toEqual(mockDocumentItemsSorted)
    })
  })
})
