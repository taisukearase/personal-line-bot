import rewire from 'rewire'

const mainModule = rewire('../src/main.ts')
const wasteTypeDataProvider = [
  {
    date: '2021-10-10',
    expected: '可燃ごみ🔥',
  },
  {
    date: '2021-10-11',
    expected: 'ビン缶ペットボトル♻',
  },
  {
    date: '2021-10-12',
    expected: '古紙📦',
  },
  {
    date: '2021-10-13',
    expected: '可燃ごみ🔥',
  },
  {
    date: '2021-10-14',
    expected: '回収なし',
  },
  {
    date: '2021-10-15',
    expected: '回収なし',
  },
  {
    date: '2021-10-16',
    expected: '回収なし',
  },
  {
    date: '2021-10-18',
    expected: '不燃ごみ🔋とビン缶ペットボトル♻',
  },
]

describe('main', (): void => {
  test.each(wasteTypeDataProvider)(
    '翌日のごみの種類が正しく取得できる',
    ({ date, expected }): void => {
      const getWasteTypeName = mainModule.__get__('getWasteTypeName')
      expect(getWasteTypeName(new Date(date))).toBe(expected)
    }
  )

  test('メッセージを加工して返す', (): void => {
    const testMessage = Math.random().toString(36).substr(2, 5)
    const getEchoMessage = mainModule.__get__('getEchoMessage')
    expect(getEchoMessage(testMessage)).toBe(`${testMessage}ンゴ`)
  })
})
