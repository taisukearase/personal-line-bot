import { MONDAY, THURSDAY, TUESDAY, WEDNESDAY } from '../consts/day'

const getTomorrow = () => {
  const date = new Date()
  date.setDate(new Date().getDate() + 1)

  return date
}

const getDayOfWeekNum = (tomorrow: Date) => {
  return tomorrow.getDay()
}

const getWeekNum = (tomorrow: Date) => {
  const date = tomorrow.getDate()
  return Math.floor((date - 1) / 7) + 1
}

export const getWasteTypeName = () => {
  const tomorrow = getTomorrow()
  const dayOfWeekNum = getDayOfWeekNum(tomorrow)

  if (dayOfWeekNum === TUESDAY) {
    const weekNum = getWeekNum(tomorrow)

    // 第1週または第3週の場合
    if (weekNum === 1 || weekNum === 3) {
      return '不燃ごみ🔋とビン缶ペットボトル♻'
    }
    return 'ビン缶ペットボトル♻'
  }

  switch (dayOfWeekNum) {
    case MONDAY:
    case THURSDAY:
      return '可燃ごみ🔥'
    case WEDNESDAY:
      return '古紙📦'
    default:
      return '回収なし'
  }
}

export default null
