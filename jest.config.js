module.exports = {
  testMatch: ["**/__tests__/**/*.+(ts|js)", "**/?(*.)+(spec|test).+(ts|js)"],
  transform: {
    "^.+\\.ts$": "ts-jest",
  },
  preset: "ts-jest",
  testEnvironment: "node",
  globals: {
    "PropertiesService": {},
    "SpreadsheetApp": {},
    "UrlFetchApp": {},
  },
}
