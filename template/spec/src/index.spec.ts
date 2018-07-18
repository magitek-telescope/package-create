import { sum } from '../../src/index'

describe('index.js', () => {
  describe('sum', () => {
    it('should be returns sum values', () => {
      expect(sum(1, 2)).toBe(3)
    })
  })
})
