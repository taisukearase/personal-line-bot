const SUNDAY = 0
const MONDAY = 1
const TUESDAY = 2
const WEDNESDAY = 3
const THURSDAY = 4
const FRIDAY = 5
const SATURDAY = 6

const BASE_URL = 'https://api.line.me/v2/bot/message'
const REPLY_URL = `${BASE_URL}/reply`
const PUSH_URL = `${BASE_URL}/push`
const LINE_CHANNEL_ACCESS_TOKEN = PropertiesService.getScriptProperties().getProperty(
  'LINE_CHANNEL_ACCESS_TOKEN'
)
const LINE_USER_ID = PropertiesService.getScriptProperties().getProperty('LINE_USER_ID')
const HEADERS: GoogleAppsScript.URL_Fetch.HttpHeaders = {
  'Content-Type': 'application/json; charset=UTF-8',
  Authorization: `Bearer ${LINE_CHANNEL_ACCESS_TOKEN}`,
}

// 明日は何のごみの日か
const getWasteTypeName = (date: Date) => {
  date.setDate(new Date().getDate() + 1)

  const dayOfWeekNum = date.getDay()

  if (dayOfWeekNum === TUESDAY) {
    const weekNum = Math.floor((date.getDate() - 1) / 7) + 1

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

// Push
const pushLineMessage = (message: string) => {
  const options: GoogleAppsScript.URL_Fetch.URLFetchRequestOptions = {
    method: 'post',
    headers: HEADERS,
    payload: JSON.stringify({
      to: LINE_USER_ID,
      messages: [
        {
          type: 'text',
          text: message,
        },
      ],
    }),
  }
  UrlFetchApp.fetch(PUSH_URL, options)
}
const range = SpreadsheetApp.getActiveSheet().getRange(1, 1)
const isCompleted = Boolean(range.getValue())

function sendMorningMessage() {
  // フラグを初期化
  range.setValue(false)
  const message = 'おはようさん！起きや！☀️\nサプリもちゃんと飲むんやで〜'
  pushLineMessage(message)
}

function sendAfternoonMessage() {
  if (isCompleted) return
  const message = 'まだ飲んでへんやろ！ちゃんと飲むんやで〜'
  pushLineMessage(message)
}

function sendNightMessage(date = new Date()) {
  const wasteTypeName = getWasteTypeName(date)
  const message = `今日もお疲れさん！\n明日は${wasteTypeName}の日やで!\n歯磨いてはよ寝なね〜🌙`
  pushLineMessage(message)
}

// Reply
const getCompletedMessage = () => {
  // 未完了なら褒めてシートを更新
  range.setValue(true)
  return 'ちゃんと飲んだんやな！偉いで〜'
}

const getEchoMessage = (userMessage: string) => {
  return `${userMessage}ンゴ`
}

function doPost(e: GoogleAppsScript.Events.DoPost) {
  const { replyToken, message } = JSON.parse(e.postData.contents).events[0]

  const replyText = !isCompleted ? getCompletedMessage() : getEchoMessage(message.text)

  UrlFetchApp.fetch(REPLY_URL, {
    headers: HEADERS,
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
}
