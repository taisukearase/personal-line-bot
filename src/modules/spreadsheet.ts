const getSheet = () => {
  return SpreadsheetApp.getActiveSheet()
}

export const getIsCompleted = () => {
  return Boolean(getSheet().getRange(1, 1).getValue())
}

export const setSheetValue = (bool: Boolean) => {
  getSheet().getRange(1, 1).setValue(bool)
}

export default null
