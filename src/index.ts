import { parseColor, RGB } from 'css-color-l4'
import convert from 'color-convert'

export default (
  cssColorString: string,
  outputType?: 'hsl' | 'hwb' | 'lab' | 'lch' | 'cmyk' | 'rgb' | 'hex'
): string | null => {
  const output = outputType ?? 'hsl'
  const inputString = cssColorString.toLowerCase().trim()

  if (inputString === 'currentcolor') return 'currentcolor'

  const parsedColor = parseColor(inputString)
  if (parsedColor === null) return null

  // If alpha is zero, it is transparent, normalize to 0,0,0,0
  const transparent: RGB = {
    type: 'rgb',
    r: 0,
    g: 0,
    b: 0,
    alpha: 0
  }

  const color = parsedColor.alpha === 0 ? transparent : parsedColor

  let inputType: 'hsl' | 'hwb' | 'lab' | 'lch' | 'cmyk' | 'rgb'
  let input: number[]
  if (color.type === 'hsl') {
    input = [color.h, color.s, color.l]
    inputType = 'hsl'
  } else if (color.type === 'hwb') {
    input = [color.h, color.w, color.b]
    inputType = 'hwb'
  } else if (color.type === 'lab') {
    input = [color.l, color.a, color.b]
    inputType = 'lab'
  } else if (color.type === 'lch') {
    input = [color.l, color.c, color.h]
    inputType = 'lch'
  } else if (color.type === 'device-cmyk') {
    input = [color.c, color.m, color.y, color.k]
    inputType = 'cmyk'
  } else {
    input = [color.r, color.g, color.b]
    inputType = 'rgb'
  }

  let _result: any
  const converter = convert?.[inputType as 'rgb']?.[output as 'hsl'] ?? null

  if (converter === null) {
    _result = input
  } else {
    _result = converter(input as Parameters<typeof converter>)
  }

  let cssColorOut: string
  if (output === 'hex') {
    const result: string = _result

    const alphaHex = Math.round(color.alpha * 255)
      .toString(16)
      .padStart(2, '0')
    const hex = result.toLowerCase()
    cssColorOut = '#'
    if (alphaHex === 'ff') {
      // 3 or 6
      if (hex[0] === hex[1] && hex[2] === hex[3] && hex[4] === hex[5]) {
        cssColorOut += hex[0] + hex[2] + hex[4]
      } else {
        cssColorOut += hex
      }
    } else {
      // 4 or 8
      if (
        hex[0] === hex[1] &&
        hex[2] === hex[3] &&
        hex[4] === hex[5] &&
        alphaHex[0] === alphaHex[1]
      ) {
        cssColorOut += hex[0] + hex[2] + hex[4] + alphaHex[0]
      } else {
        cssColorOut += hex + alphaHex
      }
    }
  } else {
    const result: number[] = _result
    if (output === 'hsl') {
      cssColorOut = `hsl(${result[0]} ${result[1]}% ${result[2]}%`
    } else if (output === 'hwb') {
      cssColorOut = `hwb(${result[0]} ${result[1]}% ${result[2]}%`
    } else if (output === 'lab') {
      cssColorOut = `lab(${result[0]}% ${result[1]} ${result[2]}`
    } else if (output === 'lch') {
      cssColorOut = `lch(${result[0]}% ${result[1]} ${result[2]}`
    } else if (output === 'rgb') {
      cssColorOut = `rgb(${result[0]} ${result[1]} ${result[2]}`
    } else {
      // if (output === "cmyk") {
      cssColorOut = `device-cmyk(${result[0]}% ${result[1]}% ${result[2]}% ${result[3]}%`
    }
    // alpha
    cssColorOut += color.alpha === 1 ? ')' : `/${color.alpha})`
  }

  return cssColorOut
}
