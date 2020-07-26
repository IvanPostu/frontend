import { sayHello } from './hello.js'
import { mock } from 'sinon'
import test from 'ava'

test('sayHello function test', (t) => {
  const helloRick = sayHello('Rick')
  t.is(helloRick, 'Hello Rick')
})

const jonny = {
  work: function () {
    return 'I work.'
  }
}

test('test case with mock', (t) => {
  const m = mock(jonny)
  m.expects('work').once().returns('Mock value')

  const val = jonny.work()
  t.is(val, 'Mock value')

  jonny.work.restore()

  const val2 = jonny.work()
  t.is(val2, 'I work.')
})
