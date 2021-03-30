export const hslToRgb = ([hue, saturation, lightness, alpha]: [
  number,
  number,
  number,
  number
]): [number, number, number, number] => {
  if (hue < 0) hue = hue + Math.ceil(hue / -360) * 360
  hue = Math.round(hue)
  if (hue >= 360) hue = hue % 360
  if (saturation < 0) saturation = 0
  if (saturation > 1) saturation = 1
  if (lightness < 0) lightness = 0
  if (lightness > 1) lightness = 1

  const chroma = (1 - Math.abs(2 * lightness - 1)) * saturation
  let huePrime = hue / 60
  const secondComponent = chroma * (1 - Math.abs((huePrime % 2) - 1))

  huePrime = Math.floor(huePrime) as 0 | 1 | 2 | 3 | 4 | 5
  let red: number
  let green: number
  let blue: number

  if (huePrime === 0) {
    red = chroma
    green = secondComponent
    blue = 0
  } else if (huePrime === 1) {
    red = secondComponent
    green = chroma
    blue = 0
  } else if (huePrime === 2) {
    red = 0
    green = chroma
    blue = secondComponent
  } else if (huePrime === 3) {
    red = 0
    green = secondComponent
    blue = chroma
  } else if (huePrime === 4) {
    red = secondComponent
    green = 0
    blue = chroma
  } else {
    red = chroma
    green = 0
    blue = secondComponent
  }

  const lightnessAdjustment = lightness - chroma / 2
  red += lightnessAdjustment
  green += lightnessAdjustment
  blue += lightnessAdjustment

  return [
    Math.round(red * 255),
    Math.round(green * 255),
    Math.round(blue * 255),
    alpha
  ]
}
