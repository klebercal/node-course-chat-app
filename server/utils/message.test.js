let expect = require('expect')
let {generateMessage} = require('./message')
let {generateLocationMessage} = require('./message')

describe('generateMessage', () => {
  it('should generate correct message object', () => {
    let from = 'Tester'
    let text = 'Text message'
    let res = generateMessage(from, text)

    expect(res.createdAt).toBeA('number')
    expect(res).toInclude({from, text})
  })
})

describe('generateLocationMessage', () => {
  it('should generate correct location object', () => {
    let from = 'Tester'
    let latitude = '123'
    let longitude = '456'
    let url = `https://www.google.com/maps?q=${latitude},${longitude}`

    let res = generateLocationMessage(from, latitude, longitude)

    expect(res.createdAt).toBeA('number')
    expect(res).toInclude({from, url})
  })
})
