const BASE_URL = 'https://api.line.me/v2/bot/message'

export const getReplyUrl = () => {
  return `${BASE_URL}/reply`
}

export const getPushUrl = () => {
  return `${BASE_URL}/push`
}

export const getLineChannelAccessToken = () => {
  return PropertiesService.getScriptProperties().getProperty('LINE_CHANNEL_ACCESS_TOKEN')
}
export const getLineUserId = () => {
  return PropertiesService.getScriptProperties().getProperty('LINE_USER_ID')
}

export const getHeaders = (): GoogleAppsScript.URL_Fetch.HttpHeaders => {
  const lineChannelAccessToken = getLineChannelAccessToken()
  return {
    'Content-Type': 'application/json; charset=UTF-8',
    Authorization: `Bearer ${lineChannelAccessToken}`,
  }
}

export default null
