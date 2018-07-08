import test from 'ava'

// 基本形
test('ava動作確認', t => {
  t.pass()
})

test('確実に成功 or 失敗', t => {
  t.pass()// 絶対成立
  //t.fail()// 絶対失敗
})

test('値が期待通り', t => {
  t.is('abc', 'bcd')// 実際の値 = 期待値
})

test('値が等しくない', t => {
  t.not('abc', 'bcd')// 等しくない
})

test('厳密なboolean - true', t => {
  t.true(1 < 2)// boolean
  //t.true(1)
})

test('厳密なboolean - false', t => {
  t.false(1 > 2)//boolean
  t.false(0)
})

test('曖昧なboolean', t => {
  t.truthy(1 < 2)// booleanかそれに相当
  //t.truthy(1)
  //t.falsy(1 > 2)
  //t.falsy(0)
})

test('深さを持ったものが同一', t => {
  t.deepEqual([1, 2, 3], [2, 3, 4])// 配列内部の値も含めて等しい
})

test('深さを持ったものが相違', t => {
  t.notDeepEqual([1, 2, 3], [2, 4])// 配列内部の値を含めて等しくない
})

test('正規表現', t => {
  t.regex('abcdefghijklmn', /fgh/)// 正規表現
  //t.notRegex('abcdefghijklmn', /fgh/)// 正規表現で調べて含まれていない
})