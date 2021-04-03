import colornorm from '.'

// prettier-ignore
const inputs = [
  ["RED", "hsl(0 100% 50%)", "#f00", "rgb(255 0 0)", "hsl(0 100% 50%)", "hwb(0 0% 0%)", "lab(53% 80 67)", "lch(53% 105 40)", "device-cmyk(0% 100% 100% 0%)"],
  ["#f00", "hsl(0 100% 50%)", "#f00", "rgb(255 0 0)", "hsl(0 100% 50%)", "hwb(0 0% 0%)", "lab(53% 80 67)", "lch(53% 105 40)", "device-cmyk(0% 100% 100% 0%)"],
  ["#ff0000", "hsl(0 100% 50%)", "#f00", "rgb(255 0 0)", "hsl(0 100% 50%)", "hwb(0 0% 0%)", "lab(53% 80 67)", "lch(53% 105 40)", "device-cmyk(0% 100% 100% 0%)"],
  ["rgb(255,0,0)", "hsl(0 100% 50%)", "#f00", "rgb(255 0 0)", "hsl(0 100% 50%)", "hwb(0 0% 0%)", "lab(53% 80 67)", "lch(53% 105 40)", "device-cmyk(0% 100% 100% 0%)"],
  ["rgba(255, 0, 0, 1)", "hsl(0 100% 50%)", "#f00", "rgb(255 0 0)", "hsl(0 100% 50%)", "hwb(0 0% 0%)", "lab(53% 80 67)", "lch(53% 105 40)", "device-cmyk(0% 100% 100% 0%)"],
  ["hsl(0, 100%, 50%)", "hsl(0 100% 50%)", "#f00", "rgb(255 0 0)", "hsl(0 100% 50%)", "hwb(0 0% 0%)", "lab(53% 80 67)", "lch(53% 105 40)", "device-cmyk(0% 100% 100% 0%)"],
  ["hsla(0, 100%, 50%, 1)", "hsl(0 100% 50%)", "#f00", "rgb(255 0 0)", "hsl(0 100% 50%)", "hwb(0 0% 0%)", "lab(53% 80 67)", "lch(53% 105 40)", "device-cmyk(0% 100% 100% 0%)"],
  ["hsla(0, 100%, 50%, .5)", "hsl(0 100% 50%/0.5)", "#ff000080", "rgb(255 0 0/0.5)", "hsl(0 100% 50%/0.5)", "hwb(0 0% 0%/0.5)", "lab(53% 80 67/0.5)", "lch(53% 105 40/0.5)", "device-cmyk(0% 100% 100% 0%/0.5)"],
  ["#FFFFFF", "hsl(0 0% 100%)", "#fff", "rgb(255 255 255)", "hsl(0 0% 100%)", "hwb(0 100% 0%)", "lab(100% 0 0)", "lch(100% 0 297)", "device-cmyk(0% 0% 0% 0%)"],
  ["WHiTE", "hsl(0 0% 100%)", "#fff", "rgb(255 255 255)", "hsl(0 0% 100%)", "hwb(0 100% 0%)", "lab(100% 0 0)", "lch(100% 0 297)", "device-cmyk(0% 0% 0% 0%)"],
  ["yellow", "hsl(60 100% 50%)", "#ff0", "rgb(255 255 0)", "hsl(60 100% 50%)", "hwb(60 0% 0%)", "lab(97% -22 94)", "lch(97% 97 103)", "device-cmyk(0% 0% 100% 0%)"],
  ["rgb(12, 134, 29)", "hsl(128 84% 29%)", "#0c861d", "rgb(12 134 29)", "hsl(128 84% 29%)", "hwb(128 5% 47%)", "lab(49% -51 45)", "lch(49% 68 139)", "device-cmyk(91% 0% 78% 47%)"],
  ["hsl(230, 50%, 40%)", "hsl(230 50% 40%)", "#349", "rgb(51 68 153)", "hsl(230 50% 40%)", "hwb(230 20% 40%)", "lab(32% 22 -49)", "lch(32% 53 294)", "device-cmyk(67% 56% 0% 40%)"],
  ["#000080", "hsl(240 100% 25%)", "#000080", "rgb(0 0 128)", "hsl(240 100% 25%)", "hwb(240 0% 50%)", "lab(13% 48 -65)", "lch(13% 80 306)", "device-cmyk(100% 100% 0% 50%)"],
  ["rgba(199, 190, 179, 0.8)", "hsl(33 15% 74%/0.8)", "#c7beb3cc", "rgb(199 190 179/0.8)", "hsl(33 15% 74%/0.8)", "hwb(33 70% 22%/0.8)", "lab(77% 1 7/0.8)", "lch(77% 7 79/0.8)", "device-cmyk(0% 5% 10% 22%/0.8)"],
  ["rgba(0,0,0,0)", "hsl(0 0% 0%/0)", "#0000", "rgb(0 0 0/0)", "hsl(0 0% 0%/0)", "hwb(0 0% 100%/0)", "lab(0% 0 0/0)", "lch(0% 0 0/0)", "device-cmyk(0% 0% 0% 100%/0)"],
  ["hsla(0,0%,0%,0)", "hsl(0 0% 0%/0)", "#0000", "rgb(0 0 0/0)", "hsl(0 0% 0%/0)", "hwb(0 0% 100%/0)", "lab(0% 0 0/0)", "lch(0% 0 0/0)", "device-cmyk(0% 0% 0% 100%/0)"],
  ["hsla(0,0%,0%,0)", "hsl(0 0% 0%/0)", "#0000", "rgb(0 0 0/0)", "hsl(0 0% 0%/0)", "hwb(0 0% 100%/0)", "lab(0% 0 0/0)", "lch(0% 0 0/0)", "device-cmyk(0% 0% 0% 100%/0)"],
  ["hsla(0,0%,0%,0)", "hsl(0 0% 0%/0)", "#0000", "rgb(0 0 0/0)", "hsl(0 0% 0%/0)", "hwb(0 0% 100%/0)", "lab(0% 0 0/0)", "lch(0% 0 0/0)", "device-cmyk(0% 0% 0% 100%/0)"],
  ["hsla(200,0%,0%,0)", "hsl(0 0% 0%/0)", "#0000", "rgb(0 0 0/0)", "hsl(0 0% 0%/0)", "hwb(0 0% 100%/0)", "lab(0% 0 0/0)", "lch(0% 0 0/0)", "device-cmyk(0% 0% 0% 100%/0)"],
  ["transparent", "hsl(0 0% 0%/0)", "#0000", "rgb(0 0 0/0)", "hsl(0 0% 0%/0)", "hwb(0 0% 100%/0)", "lab(0% 0 0/0)", "lch(0% 0 0/0)", "device-cmyk(0% 0% 0% 100%/0)"],
  ["#696969", "hsl(0 0% 41%)", "#696969", "rgb(105 105 105)", "hsl(0 0% 41%)", "hwb(0 41% 59%)", "lab(44% 0 0)", "lch(44% 0 297)", "device-cmyk(0% 0% 0% 59%)"],
  ["rgb(400,400,400)", "hsl(0 0% 100%)", "#fff", "rgb(255 255 255)", "hsl(0 0% 100%)", "hwb(0 100% 0%)", "lab(100% 0 0)", "lch(100% 0 297)", "device-cmyk(0% 0% 0% 0%)"],
  ["hsl(400, 400%, 50%)", "hsl(40 100% 50%)", "#fa0", "rgb(255 170 0)", "hsl(40 100% 50%)", "hwb(40 0% 0%)", "lab(76% 21 80)", "lch(76% 83 75)", "device-cmyk(0% 33% 100% 0%)"],
  ["hsla(0, 0%, 100%, 0.5)", "hsl(0 0% 100%/0.5)", "#ffffff80", "rgb(255 255 255/0.5)", "hsl(0 0% 100%/0.5)", "hwb(0 100% 0%/0.5)", "lab(100% 0 0/0.5)", "lch(100% 0 297/0.5)", "device-cmyk(0% 0% 0% 0%/0.5)"],
  ["rgba(-100,0,-100,.5)", "hsl(0 0% 0%/0.5)", "#00000080", "rgb(0 0 0/0.5)", "hsl(0 0% 0%/0.5)", "hwb(0 0% 100%/0.5)", "lab(0% 0 0/0.5)", "lch(0% 0 0/0.5)", "device-cmyk(0% 0% 0% 100%/0.5)"],
  ["hsla(-400,50%,10%,.5)", "hsl(320 50% 10%/0.5)", "#260d1e80", "rgb(38 13 30/0.5)", "hsl(320 50% 10%/0.5)", "hwb(320 5% 85%/0.5)", "lab(7% 16 -6/0.5)", "lch(7% 17 340/0.5)", "device-cmyk(0% 67% 22% 85%/0.5)"],
  ["rgb(100%,100%,100%)", "hsl(0 0% 100%)", "#fff", "rgb(255 255 255)", "hsl(0 0% 100%)", "hwb(0 100% 0%)", "lab(100% 0 0)", "lch(100% 0 297)", "device-cmyk(0% 0% 0% 0%)"],
  ["rgba(50%,50%,50%,0.5)", "hsl(0 0% 50%/0.5)", "#80808080", "rgb(128 128 128/0.5)", "hsl(0 0% 50%/0.5)", "hwb(0 50% 50%/0.5)", "lab(54% 0 0/0.5)", "lch(54% 0 297/0.5)", "device-cmyk(0% 0% 0% 50%/0.5)"],
  ["rgba(100%,100%,100%,0.5)", "hsl(0 0% 100%/0.5)", "#ffffff80", "rgb(255 255 255/0.5)", "hsl(0 0% 100%/0.5)", "hwb(0 100% 0%/0.5)", "lab(100% 0 0/0.5)", "lch(100% 0 297/0.5)", "device-cmyk(0% 0% 0% 0%/0.5)"],
  ["rgba(100%,64.7%,0%,.5)", "hsl(39 100% 50%/0.5)", "#ffa50080", "rgb(255 165 0/0.5)", "hsl(39 100% 50%/0.5)", "hwb(39 0% 0%/0.5)", "lab(75% 24 79/0.5)", "lch(75% 83 73/0.5)", "device-cmyk(0% 35% 100% 0%/0.5)"],
  ["rgb(50%,23,54)", "rgb(50%,23,54)", "rgb(50%,23,54)", "rgb(50%,23,54)", "rgb(50%,23,54)", "rgb(50%,23,54)", "rgb(50%,23,54)", "rgb(50%,23,54)", "rgb(50%,23,54)"],
  ["Unrecognised", "unrecognised", "unrecognised", "unrecognised", "unrecognised", "unrecognised", "unrecognised", "unrecognised", "unrecognised"],
  ["inherit", "inherit", "inherit", "inherit", "inherit", "inherit", "inherit", "inherit", "inherit"],
  ["currentcolor", "currentcolor", "currentcolor", "currentcolor", "currentcolor", "currentcolor", "currentcolor", "currentcolor", "currentcolor"],
]

describe('colornorm does as expected', () => {
  test('default', () => {
    for (const [input, hslDefault] of inputs) {
      expect(colornorm(input)).toBe(hslDefault)
    }
  })
  test('hex', () => {
    for (const [input, , hex] of inputs) {
      expect(colornorm(input, 'hex')).toBe(hex)
    }
  })
  test('rgb', () => {
    for (const [input, , , rgb] of inputs) {
      expect(colornorm(input, 'rgb')).toBe(rgb)
    }
  })
  test('hsl', () => {
    for (const [input, , , , hsl] of inputs) {
      expect(colornorm(input, 'hsl')).toBe(hsl)
    }
  })
  test('hwb', () => {
    for (const [input, , , , , hwb] of inputs) {
      expect(colornorm(input, 'hwb')).toBe(hwb)
    }
  })
  test('lab', () => {
    for (const [input, , , , , , lab] of inputs) {
      expect(colornorm(input, 'lab')).toBe(lab)
    }
  })
  test('lch', () => {
    for (const [input, , , , , , , lch] of inputs) {
      expect(colornorm(input, 'lch')).toBe(lch)
    }
  })
  test('cmyk', () => {
    for (const [input, , , , , , , , cmyk] of inputs) {
      expect(colornorm(input, 'cmyk')).toBe(cmyk)
    }
  })
})
