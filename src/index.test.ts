import min from '.'

test('should lowercase keywords', () => {
  expect(min('RED')).toBe('red')
})

test('should convert shorthand hex to keyword', () => {
  expect(min('#f00')).toBe('red')
})

test('should convert longhand hex to keyword', () => {
  expect(min('#ff0000')).toBe('red')
})

test('should convert rgb to keyword', () => {
  expect(min('rgb(255,0,0)')).toBe('red')
})

test('should convert fully opaque rgb to keyword', () => {
  expect(min('rgba(255, 0, 0, 1)')).toBe('red')
})

test('should convert hsl to keyword', () => {
  expect(min('hsl(0, 100%, 50%)')).toBe('red')
})

test('should convert fully oqaque hsl to keyword', () => {
  expect(min('hsla(0, 100%, 50%, 1)')).toBe('red')
})

test('should convert translucent hsla to rgba', () => {
  expect(min('hsla(0, 100%, 50%, .5)')).toBe('rgba(255,0,0,.5)')
})

test('should convert longhand hex to shorthand, case insensitive', () => {
  expect(min('#FFFFFF')).toBe('#fff')
})

test('should convert keyword to hex, case insensitive', () => {
  expect(min('WHiTE')).toBe('#fff')
})

test('should convert keyword to hex', () => {
  expect(min('yellow')).toBe('#ff0')
})

test('should convert rgb to hex', () => {
  expect(min('rgb(12, 134, 29)')).toBe('#0c861d')
})

test('should convert hsl to hex', () => {
  expect(min('hsl(230, 50%, 40%)')).toBe('#349')
})

test('should convert another longhand hex to keyword', () => {
  expect(min('#000080')).toBe('navy')
})

test('should convert rgba to hsla when shorter', () => {
  expect(min('rgba(199, 190, 179, 0.8)')).toBe('hsla(33,15%,74%,.8)')
})

test('should convert this specific rgba value to "transparent"', () => {
  expect(min('rgba(0,0,0,0)')).toBe('transparent')
})

test('should not convert this specific rgba value to "transparent" (legacy mode)', () => {
  expect(min('hsla(0,0%,0%,0)', { legacy: true })).toBe('transparent')
})

test('should convert this specific hsla value to "transparent"', () => {
  expect(min('hsla(0,0%,0%,0)')).toBe('transparent')
})

test('should convert this specific hsla value to "transparent"', () => {
  expect(min('hsla(0,0%,0%,0)')).toBe('transparent')
})

test('should convert hsla values with 0 saturation & 0 lightness to "transparent"', () => {
  expect(min('hsla(200,0%,0%,0)')).toBe('transparent')
})

test('should leave transparent as it is', () => {
  expect(min('transparent')).toBe('transparent')
})

test('should prefer to output hex rather than keywords when they are the same length', () => {
  expect(min('#696969')).toBe('#696969')
})

test('should cap values at their maximum', () => {
  expect(min('rgb(400,400,400)')).toBe('#fff')
})

test('should cap values at their maximum (2)', () => {
  expect(min('hsl(400, 400%, 50%)')).toBe('red')
})

test('should remove leading zeros', () => {
  expect(min('hsla(0, 0%, 100%, 0.5)')).toBe('hsla(0,0%,100%,.5)')
})

test('should convert signed numbers', () => {
  expect(min('rgba(-100,0,-100,.5)')).toBe('rgba(0,0,0,.5)')
})

test('should convert signed numbers (2)', () => {
  expect(min('hsla(-400,50%,10%,.5)')).toBe('rgba(38,13,13,.5)')
})

test('should convert percentage based rgb values', () => {
  expect(min('rgb(100%,100%,100%)')).toBe('#fff')
})

test('should convert percentage based rgba values (2)', () => {
  expect(min('rgba(50%,50%,50%,0.5)')).toBe('hsla(0,0%,50%,.5)')
})

test('should convert percentage based rgba values (3)', () => {
  expect(min('rgb(100%,100%,100%)')).toBe('#fff')
})

test('should convert percentage based rgba values (4)', () => {
  expect(min('rgba(100%,100%,100%,0.5)')).toBe('hsla(0,0%,100%,.5)')
})

test('should convert percentage based rgba values (5)', () => {
  expect(min('rgba(100%,64.7%,0%,.5)')).toBe('rgba(255,165,0,.5)')
})

test('should pass through on invalid rgb functions', () => {
  expect(min('rgb(50%,23,54)')).toBe('rgb(50%,23,54)')
})

test('should pass through if not recognised', () => {
  expect(min('Unrecognised')).toBe('Unrecognised')
  expect(min('inherit')).toBe('inherit')
})
