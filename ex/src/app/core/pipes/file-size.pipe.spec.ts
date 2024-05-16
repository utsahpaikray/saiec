import { FileSizePipe } from './file-size.pipe'

describe('FileSizePipe', () => {
  // This pipe is a pure, stateless function so no need for BeforeEach
  const pipe = new FileSizePipe()

  it('transforms to kb with no decimals by default', () => {
    expect(pipe.transform(1500)).toBe('1 KB')
  })

  it('transforms to kb with decimals', () => {
    expect(pipe.transform(1500, 2)).toBe('1.46 KB')
  })

  it('transforms to mb with 1 decimal by default', () => {
    expect(pipe.transform(2100000)).toBe('2.0 MB')
  })

  it('transforms to mb with decimals', () => {
    expect(pipe.transform(2100000, 2)).toBe('2.00 MB')
  })

  it('transforms to gb with 1 decimal by default', () => {
    expect(pipe.transform(2100000000)).toBe('2.0 GB')
  })

  it('transforms to gb with decimals', () => {
    expect(pipe.transform(2100000000, 2)).toBe('1.96 GB')
  })

  it('transforms to tb with 2 deciamls by default', () => {
    expect(pipe.transform(2100000000000)).toBe('1.91 TB')
  })

  it('transforms to tb with decimals', () => {
    expect(pipe.transform(2100000000000, 3)).toBe('1.910 TB')
  })
})
