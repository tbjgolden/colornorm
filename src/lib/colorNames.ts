import colors from 'css-color-names';
import toShorthand from './toShorthand';

export default Object.entries(colors).reduce((o, [k, v]) => {
  o[k] = toShorthand(v);
  return o;
});
