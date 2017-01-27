const expect = require('expect')
const {isRealString} = require('./validation')

describe('isRealString', () => {
  it('should reject non-string values', () => {
    let str = false
    let res = isRealString(str)

    expect(res).toBe(false)
  })

  it('should reject string with only spaces', () => {
    let str = '          '
    let res = isRealString(str)

    expect(res).toBe(false)
  })

  it('should allow strings with non-space characters', () => {
    let str = '   string value   '
    let res = isRealString(str)

    expect(res).toBe(true)
  })
})
