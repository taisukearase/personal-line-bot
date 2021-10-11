import { getHeaders, getLineUserId, getPushUrl } from './modules/http'
import { getIsCompleted, setSheetValue } from './modules/spreadsheet'
import { getWasteTypeName } from './modules/waste'

const makeOptions = (message: string): GoogleAppsScript.URL_Fetch.URLFetchRequestOptions => {
  const headers = getHeaders()
  const lineUserId = getLineUserId()
  return {
    method: 'post',
    headers,
    payload: JSON.stringify({
      to: lineUserId,
      messages: [
        {
          type: 'text',
          text: message,
        },
      ],
    }),
  }
}

const pushUrl = getPushUrl()

export function sendMorningMessage() {
  // フラグを初期化
  setSheetValue(false)

  const message = 'おはようさん！起きや！☀️\n薬もちゃんと飲むんやで〜'
  const options = makeOptions(message)
  return UrlFetchApp.fetch(pushUrl, options)
}

export function sendAfternoonMessage() {
  if (getIsCompleted()) {
    return null
  }

  const message = 'まだ飲んでへんやろ！ちゃんと飲むんやで〜'
  const options = makeOptions(message)

  return UrlFetchApp.fetch(pushUrl, options)
}

export function sendNightMessage() {
  const wasteTypeName = getWasteTypeName()

  const message = `今日もお疲れさん！\n明日は${wasteTypeName}の日やで!\n歯磨いてはよ寝なね〜🌙`
  const options = makeOptions(message)

  return UrlFetchApp.fetch(pushUrl, options)
}

export default null
