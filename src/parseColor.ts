import { nameToRgb } from './colorNames'

export type Result = {
  model: 'hsl' | 'hwb' | 'rgb'
  value: [number, number, number, number]
}

export const parse = (colorString: string): Result | null => {
  colorString = colorString.trim().toLowerCase()
  const prefix = colorString.substr(0, 3)

  if (prefix === 'hsl') {
    const value = parseHsl(colorString)
    if (value !== null) return { model: 'hsl', value }
  } else if (prefix === 'hwb') {
    const value = parseHwb(colorString)
    if (value !== null) return { model: 'hwb', value }
  } else {
    // rgb + hex + colornames
    const value = parseRgb(colorString)
    if (value !== null) return { model: 'rgb', value }
  }

  return null
}

const parseRgb = (str: string): [number, number, number, number] | null => {
  const shortHex = /^#([a-f0-9]{3})([a-f0-9]{1})?$/i
  const longHex = /^#([a-f0-9]{6})([a-f0-9]{2})?$/i
  const rgba = /^rgba?\(\s*([+-]?\d+)\s*,\s*([+-]?\d+)\s*,\s*([+-]?\d+)\s*(?:,\s*([+-]?[\d\.]+)\s*)?\)$/
  const rgbaSpace = /^rgba?\(\s*([+-]?\d+)\s* \s*([+-]?\d+)\s* \s*([+-]?\d+)\s*(?:\/\s*([+-]?[\d\.]+)\s*)?\)$/
  const percent = /^rgba?\(\s*([+-]?[\d\.]+)\%\s*,\s*([+-]?[\d\.]+)\%\s*,\s*([+-]?[\d\.]+)\%\s*(?:,\s*([+-]?[\d\.]+)\s*)?\)$/
  const percentSpace = /^rgba?\(\s*([+-]?[\d\.]+)\%\s* \s*([+-]?[\d\.]+)\%\s* \s*([+-]?[\d\.]+)\%\s*(?:\/\s*([+-]?[\d\.]+)\s*)?\)$/
  const keyword = /(\D+)/

  // note: still does not support percent on alpha
  let match: RegExpMatchArray | null
  if ((match = str.match(shortHex))) {
    const shortRgb = match[1]
    const shortAlpha = match[2]

    // no need to clamp as every regex match is within range
    return [
      parseInt(shortRgb[0], 16) * 17,
      parseInt(shortRgb[1], 16) * 17,
      parseInt(shortRgb[2], 16) * 17,
      shortAlpha ? Math.round(parseInt(shortAlpha, 16) * 6.666666666) : 1
    ]
  } else if ((match = str.match(longHex))) {
    const longRgb = match[1]
    const longAlpha = match[2]

    // no need to clamp as every regex match is within range
    return [
      parseInt(longRgb.slice(0, 3), 16),
      parseInt(longRgb.slice(3, 5), 16),
      parseInt(longRgb.slice(5, 7), 16),
      longAlpha ? Math.round(parseInt(longAlpha, 16) * 0.392156863) : 1
    ]
  } else if ((match = str.match(rgba)) || (match = str.match(rgbaSpace))) {
    return [
      clamp(Math.round(parseFloat(match[1])), 0, 255),
      clamp(Math.round(parseFloat(match[2])), 0, 255),
      clamp(Math.round(parseFloat(match[3])), 0, 255),
      clamp(Math.round(parseFloat(match[4]) * 100), 0, 100)
    ]
  } else if (
    (match = str.match(percent)) ||
    (match = str.match(percentSpace))
  ) {
    return [
      clamp(Math.round(parseFloat(match[1]) * 2.55), 0, 255),
      clamp(Math.round(parseFloat(match[2]) * 2.55), 0, 255),
      clamp(Math.round(parseFloat(match[3]) * 2.55), 0, 255),
      clamp(Math.round(parseFloat(match[4]) * 100), 0, 100)
    ]
  } else if ((match = str.match(keyword))) {
    return nameToRgb(match[1])
  }

  return null
}

const parseHsl = (str: string): [number, number, number, number] | null => {
  if (!str) {
    return null
  }

  const hsl = /^hsla?\(\s*([+-]?(?:\d{0,3}\.)?\d+)(?:deg)?\s*,\s*([+-]?[\d\.]+)%\s*,\s*([+-]?[\d\.]+)%\s*(?:,\s*([+-]?[\d\.]+)\s*)?\)$/
  const hslSpace = /^hsla?\(\s*([+-]?(?:\d{0,3}\.)?\d+)(?:deg)?\s* \s*([+-]?[\d\.]+)%\s* \s*([+-]?[\d\.]+)%\s*(?:\/\s*([+-]?[\d\.]+)\s*)?\)$/
  const match = str.match(hsl) || str.match(hslSpace)

  if (match) {
    const alpha = parseFloat(match[4])
    const h = (parseFloat(match[1]) + 360) % 360
    const s = clamp(parseFloat(match[2]), 0, 100)
    const l = clamp(parseFloat(match[3]), 0, 100)
    const a = clamp(isNaN(alpha) ? 1 : alpha, 0, 1)

    return [h, s, l, a]
  }

  return null
}

const parseHwb = (str: string): [number, number, number, number] | null => {
  if (!str) {
    return null
  }

  const hwb = /^hwb\(\s*([+-]?\d{0,3}(?:\.\d+)?)(?:deg)?\s*,\s*([+-]?[\d\.]+)%\s*,\s*([+-]?[\d\.]+)%\s*(?:,\s*([+-]?[\d\.]+)\s*)?\)$/
  const match = str.match(hwb)

  if (match) {
    const alpha = parseFloat(match[4])
    const h = ((parseFloat(match[1]) % 360) + 360) % 360
    const w = clamp(parseFloat(match[2]), 0, 100)
    const b = clamp(parseFloat(match[3]), 0, 100)
    const a = clamp(isNaN(alpha) ? 1 : alpha, 0, 1)
    return [h, w, b, a]
  }

  return null
}

const clamp = (num: number, min: number, max: number) => {
  if (num <= min) return min
  else if (num >= max) return max
  return num
}

const hexDouble = (num) => {
  const str = num.tostr(16).toUpperCase()
  return str.length < 2 ? '0' + str : str
}
