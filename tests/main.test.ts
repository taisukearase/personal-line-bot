import rewire from 'rewire'

const mainModule = rewire('../src/main.ts')
const wasteTypeDataProvider = [
  {
    date: '2021-10-10',
    expected: 'ๅฏ็ใใฟ๐ฅ',
  },
  {
    date: '2021-10-11',
    expected: 'ใใณ็ผถใใใใใใซโป',
  },
  {
    date: '2021-10-12',
    expected: 'ๅค็ด๐ฆ',
  },
  {
    date: '2021-10-13',
    expected: 'ๅฏ็ใใฟ๐ฅ',
  },
  {
    date: '2021-10-14',
    expected: 'ๅๅใชใ',
  },
  {
    date: '2021-10-15',
    expected: 'ๅๅใชใ',
  },
  {
    date: '2021-10-16',
    expected: 'ๅๅใชใ',
  },
  {
    date: '2021-10-18',
    expected: 'ไธ็ใใฟ๐ใจใใณ็ผถใใใใใใซโป',
  },
]

describe('main', (): void => {
  test.each(wasteTypeDataProvider)(
    '็ฟๆฅใฎใใฟใฎ็จฎ้กใๆญฃใใๅๅพใงใใ',
    ({ date, expected }): void => {
      const getWasteTypeName = mainModule.__get__('getWasteTypeName')
      expect(getWasteTypeName(new Date(date))).toBe(expected)
    }
  )

  test('ใกใใปใผใธใๅ ๅทฅใใฆ่ฟใ', (): void => {
    const testMessage = Math.random().toString(36).substr(2, 5)
    const getEchoMessage = mainModule.__get__('getEchoMessage')
    expect(getEchoMessage(testMessage)).toBe(`${testMessage}ใณใด`)
  })
})
