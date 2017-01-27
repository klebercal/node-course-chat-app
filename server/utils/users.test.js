const expect = require('expect')

const {Users} = require('./users')

describe('Users', () => {
  let list

  beforeEach(() => {
    users = new Users
    users.list = [{
      id: '1',
      name: 'Jim',
      room: 'Node Room'
    },{
      id: '2',
      name: 'Barbara',
      room: 'PHP Room'
    },{
      id: '3',
      name: 'Frank',
      room: 'Node Room'
    }]
  })

  it('should add new user', () => {
    let users = new Users()
    let user = {
      id: '123',
      name: 'Kleber',
      room: 'Aroma Room'
    }
    let res = users.addUser(user.id, user.name, user.room)

    expect(users.list).toEqual([user])
  })

  it('should remove a user', () => {
    let user = users.removeUser('1')

    expect(user).toExist()
    expect(users.list.length).toBe(2)
  })

  it('should not remove user', () => {
    let user = users.removeUser('12')

    expect(user).toNotExist()
    expect(users.list.length).toBe(3)
  })

  it('should find user', () => {
    let res = users.getUser('1')

    expect(res).toExist()
  })

  it('should not find user', () => {
    let res = users.getUser('12')

    expect(res).toNotExist()
  })

  it('should return names for node course', () => {
    let list = users.getUserList('Node Room')

    expect(list).toEqual(['Jim', 'Frank'])
  })

  it('should return names for php course', () => {
    let list = users.getUserList('PHP Room')

    expect(list).toEqual(['Barbara'])
  })
})
