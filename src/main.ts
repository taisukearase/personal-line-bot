export const greeter = (person: string) => {
  return `Hello, ${person}!`
}

export const testGreeter = () => {
  const user = 'Grant'
  Logger.log(greeter(user))
}

export default null
