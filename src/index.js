import color from 'color';
import colorNames from './lib/colorNames';
import toShorthand from './lib/toShorthand';
import * as ctype from './lib/colorType';
import trim from './lib/stripWhitespace';
import zero from './lib/trimLeadingZero';

const filterColor = callback => Object.keys(colorNames).filter(callback);
const shorter = (a, b) => (a && a.length < b.length ? a : b).toLowerCase();

export default (color, opts = {}) => {
  if (ctype.isRGBorHSL(color)) {
    let c;
    // Pass through invalid rgb/hsl functions
    try {
      c = color(color);
    } catch (err) {
      return color;
    }
    if (c.alpha() === 1) {
      // At full alpha, just use hex
      color = c.hexString();
    } else {
      let rgb = c.rgb();
      if (
        !opts.legacy &&
        !rgb.r &&
        !rgb.g &&
        !rgb.b &&
        !rgb.a
      ) {
        return 'transparent';
      }
      let hsla = c.hslaString();
      let rgba = c.rgbString();
      return zero(trim(hsla.length < rgba.length ? hsla : rgba));
    }
  }
  if (ctype.isHex(color)) {
    color = toShorthand(color.toLowerCase());
    let keyword = filterColor(key => colorNames[key] === color)[0];
    return shorter(keyword, color);
  } else if (ctype.isKeyword(color)) {
    let hex = colorNames[filterColor(k => k === color.toLowerCase())[0]];
    return shorter(hex, color);
  }
  // Possibly malformed, just pass through
  return color;
};
