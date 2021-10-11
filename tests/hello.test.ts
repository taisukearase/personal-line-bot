import { greeter } from '../src/main'

describe(greeter.name, () => {
  it('should return greeting', () => {
    const greeting = greeter('John')

    expect(greeting).toBe('Hello, John!')
  })
})
