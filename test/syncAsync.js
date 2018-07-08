import test from 'ava'

test('非同期の書き方', async t => {
  const bar = Promise.resolve('bar')

  t.is(await bar, 'bar')
})

test('同期の書き方', t => {
  const bar = 'abcd'

  t.is(bar.substr(1), 'bcd')
})
