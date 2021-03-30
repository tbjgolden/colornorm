export const hwbToRgb = ([hue, whiteness, blackness, alpha]: [
  number,
  number,
  number,
  number
]): [number, number, number, number] => {
  if (hue < 0) hue = hue + Math.ceil(hue / -360) * 360
  hue = Math.round(hue)
  if (hue >= 360) hue = hue % 360

  const huePrime = hue / 60
  const hueSector = Math.floor(hue / 60) as 0 | 1 | 2 | 3 | 4 | 5

  if (blackness < 0) blackness = 0
  if (blackness > 1) blackness = 1
  if (whiteness < 0) whiteness = 0
  if (whiteness > 1) whiteness = 1

  const sum = whiteness + blackness
  if (sum > 1) {
    whiteness /= sum
    blackness /= sum
  }

  const a = Math.round(255 * (1 - blackness))
  const b = Math.round(255 * whiteness)

  let delta = huePrime - hueSector
  if (hueSector === 1 || hueSector === 3 || hueSector === 5) delta = 1 - delta
  const c = Math.round(255 * (whiteness + delta * (1 - blackness - whiteness)))

  if (hueSector === 0) return [a, c, b, alpha]
  else if (hueSector === 1) return [c, a, b, alpha]
  else if (hueSector === 2) return [b, a, c, alpha]
  else if (hueSector === 3) return [b, c, a, alpha]
  else if (hueSector === 4) return [c, b, a, alpha]
  else return [a, b, c, alpha]
}
