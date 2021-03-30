import colors from 'css-color-names'
import toShorthand from './toShorthand'

export default Object.entries(colors).reduce<Record<string, string>>(
  (o, [k, v]) => {
    o[k] = toShorthand(v)
    return o
  },
  {}
) as typeof colors
