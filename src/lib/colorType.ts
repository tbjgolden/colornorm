import has from 'has';
import colorNames from './colorNames';
import toLonghand from './toLonghand';

export const isHex = color => {
  if (color[0] === '#') {
    let c = toLonghand(color).substring(1);
    return c.length === 6 && ! isNaN(parseInt(c, 16));
  }
  return false;
};

export const isRGBorHSL = color => /^(rgb|hsl)a?\(.*?\)/.test(color);

export const isKeyword = color => has(colorNames, color.toLowerCase());
