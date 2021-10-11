export const BASE_URL = 'https://api.line.me/v2/bot/message'

export const REPLY_URL = `${BASE_URL}/reply`
export const PUSH_URL = `${BASE_URL}/push`

export const LINE_CHANNEL_ACCESS_TOKEN = PropertiesService.getScriptProperties().getProperty(
  'LINE_CHANNEL_ACCESS_TOKEN'
)
export const LINE_USER_ID = PropertiesService.getScriptProperties().getProperty('LINE_USER_ID')

export const HEADER: GoogleAppsScript.URL_Fetch.HttpHeaders = {
  'Content-Type': 'application/json; charset=UTF-8',
  Authorization: `Bearer ${LINE_CHANNEL_ACCESS_TOKEN}`,
}
