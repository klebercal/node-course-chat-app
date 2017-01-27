const _ = require ('lodash')


class Users {
  constructor () {
    this.list = []
  }

  addUser (id, name, room) {
    let user = {id, name, room}
    this.list.push(user)

    return user
  }

  removeUser (id) {
    return _.remove(this.list, (user) => user.id === id)[0]
  }

  getUser (id) {
    return _.find(this.list, (user) => user.id === id)
  }

  getUserList(room) {
    let filtered = this.list.filter((user) => user.room === room)
    let names = filtered.map((user) => user.name)

    return names
  }
}

module.exports = {Users}

// let users = new Users
// console.log(users.removeUser('2'))
// console.log(users.list)

// let user = users.getUser('1')
// console.log(user)

// class Person {
//   constructor (name, age) {
//     this.name = name
//     this.age = age
//   }
//
//   getUserDescription () {
//     return `${this.name} is ${this.age} year(s) old`
//   }
// }
//
// let me = new Person('Kleber', 36)
// let description = me.getUserDescription()
//
// console.log(description)
