let expect = require('expect')
let {generateMessage} = require('./message')

describe('generateMessage', () => {
  it('should generate correct message object', () => {
    let from = 'Tester'
    let text = 'Text message'
    let res = generateMessage(from, text)

    expect(res.createdAt).toBeA('number')
    expect(res).toInclude({from, text})
  })
})
