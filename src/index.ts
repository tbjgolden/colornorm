import colorString from 'color-string'
import { hslToRgb } from './hslToRgb'
import { hwlToRgb } from './hwlToRgb'

// const shorterOf = (a: string, b: string): string => (a && a.length < b.length ? a : b);

export default (
  cssColor: string,
  opts: Partial<{ legacy: boolean }> = {}
): string => {
  const colorDetails = colorString.get(cssColor)
  if (colorDetails === null) return cssColor

  if (opts.legacy && colorDetails.value[3] === 0) return 'transparent'

  const { model, value } = colorDetails

  let rgb: [number, number, number, number]
  if (model == 'rgb') {
    rgb = value
  } else {
    if (model === 'hsl') {
      // convert to rgb
      rgb = hslToRgb(value)
    } else if (model === 'hwb') {
      // convert to rgb
      rgb = hwlToRgb(value)
    } else {
      throw new Error(
        `colornorm does not support this unknown color format (${cssColor}) - leave an issue`
      )
    }
  }

  // convert rgb to output type
}
