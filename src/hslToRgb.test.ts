import { hslToRgb } from './hslToRgb'

test('hslToRgb: should convert fully opaque hsl to keyword', () => {
  expect(hslToRgb([0, 100, 50, 1])).toEqual([255, 0, 0, 1])
})

test('hslToRgb: should convert translucent hsla to rgba', () => {
  expect(hslToRgb([0, 100, 50, 0.5])).toEqual([255, 0, 0, 0.5])
})

test('hslToRgb: should convert hsl to hex', () => {
  expect(hslToRgb([230, 50, 40, 1])).toEqual([51, 68, 153, 1])
})

test('hslToRgb: should cap values at their maximum (2)', () => {
  expect(hslToRgb([400, 400, 50, 1])).toEqual([255, 170, 0, 1])
})

test('hslToRgb: should remove leading zeros', () => {
  expect(hslToRgb([0, 0, 100, 0.5])).toEqual([255, 255, 255, 0.5])
})

test('hslToRgb: should convert signed numbers (2)', () => {
  expect(hslToRgb([-400, 50, 10, 0.5])).toEqual([38, 13, 30, 0.5])
})
