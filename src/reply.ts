import { getHeaders, getReplyUrl } from './modules/http'
import { getIsCompleted, setSheetValue } from './modules/spreadsheet'

const getCompletedMessage = () => {
  // 未完了なら褒めてシートを更新
  setSheetValue(true)
  return 'ちゃんと飲んだんやな！偉いで〜'
}

const getEchoMessage = (userMessage: string) => {
  return `${userMessage}ンゴ`
}

export function doPost(e: GoogleAppsScript.Events.DoPost) {
  const { replyToken, message } = JSON.parse(e.postData.contents).events[0]
  const isCompleted = getIsCompleted()

  const replyText = !isCompleted ? getCompletedMessage() : getEchoMessage(message.text)
  const replyUrl = getReplyUrl()
  const headers = getHeaders()

  UrlFetchApp.fetch(replyUrl, {
    headers,
    method: 'post',
    payload: JSON.stringify({
      replyToken,
      messages: [
        {
          type: 'text',
          text: replyText,
        },
      ],
    }),
  })

  return ContentService.createTextOutput(JSON.stringify({ content: 'post ok' })).setMimeType(
    ContentService.MimeType.JSON
  )
}

export default null
