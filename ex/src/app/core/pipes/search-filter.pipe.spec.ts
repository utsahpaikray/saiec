import { SearchFilterPipe } from './search-filter.pipe'

describe('SearchFilterPipe', () => {
  let pipe: SearchFilterPipe

  const documents = [
    {
      name: '10166-072-99999-EN-A DHL CdG O&M manual.pdf',
      depth: 0
    },
    {
      name: 'Operator documents',
      depth: 0
    },
    {
      name: 'Technical documents',
      depth: 0
    }
  ]

  beforeEach(() => {
    pipe = new SearchFilterPipe()
  })

  it('create an instance', () => {
    expect(pipe).toBeTruthy()
  })

  it('shows correct filter results', () => {
    const expectedResult = [
      {
        name: 'Operator documents',
        depth: 0
      },
      {
        name: 'Technical documents',
        depth: 0
      }
    ]
    expect(pipe.transform(documents, 'doc')).toEqual(expectedResult)
  })

  it('returns fallback when no filter text is given', () => {
    expect(pipe.transform(documents, '')).toBe(documents)
  })
})
