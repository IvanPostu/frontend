import { sayHello } from './hello';

class People{

  static X = 22

  constructor(){
    this.name = 'jonny'
  }

}

const p = new People()

console.log(p.name);
console.log(People.X);

console.log('11AAAAAAAAa');
console.log(sayHello('Jonny'));
console.log('11AAAAAAAAa');

async function asyncTest(){
  const res = await Promise.resolve('async work with success')
  console.log(res);
}


asyncTest()
