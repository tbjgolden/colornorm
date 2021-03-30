import { hwbToRgb } from './hwbToRgb'

test('hwbToRgb: should convert fully oqaque hsl to keyword', () => {
  expect(hwbToRgb([0, 100, 50, 1])).toEqual([])
})

test('hwbToRgb: should convert translucent hsla to rgba', () => {
  expect(hwbToRgb([0, 100, 50, 0.5])).toEqual([])
})

test('hwbToRgb: should convert hsl to hex', () => {
  expect(hwbToRgb([230, 50, 40, 1])).toEqual([])
})

test('hwbToRgb: should cap values at their maximum (2)', () => {
  expect(hwbToRgb([400, 400, 50, 1])).toEqual([])
})

test('hwbToRgb: should remove leading zeros', () => {
  expect(hwbToRgb([0, 0, 100, 0.5])).toEqual([])
})

test('hwbToRgb: should convert signed numbers (2)', () => {
  expect(hwbToRgb([-400, 50, 10, 0.5])).toEqual([])
})
