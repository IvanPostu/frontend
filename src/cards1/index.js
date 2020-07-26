import { sayHello } from './hello'

class People {
  static X = 22

  constructor() {
    this.name = 'jonny'
  }
}

const p = new People()

const node = document.getElementById('q')

node.innerHTML += '<br/>' + p.name
node.innerHTML += '<br/>' + People.X

node.innerHTML += '<br/>' + sayHello('Jonny')
node.innerHTML += '<br/>' + People.X

async function asyncTest() {
  const res = await Promise.resolve('async work with success')
  node.innerHTML += '<br/>' + res
}

asyncTest()
