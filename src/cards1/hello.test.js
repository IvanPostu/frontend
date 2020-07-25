import { sayHello } from './hello.js'
import test from 'ava';

test('sayHello function test', t => {
  const helloRick = sayHello('Rick')
  t.is(helloRick, 'Hello Rick')
})
