import colors from 'css-color-names';
import toShorthand from './toShorthand';

Object.keys(colors).forEach(c => (colors[c] = toShorthand(colors[c])));
export default colors;
