import {
  defaultEasing,
  defaultEasingString,
  consoleName
} from '../constants';

import { easing } from './easing';
import { path } from './path';

/**
 * parseEasing - function to parse all easing values to a function.
 *
 * @param  {String, Function, Array} Easing representation.
 * @return {Function} Parsed Easing.
 */
const parseEasing = (ease = defaultEasingString) => {
  const type = typeof ease;

  switch (type) {
    case 'function': { return ease; }
    case 'string': {
      // path easing
      if (ease[0].toLowerCase() === 'm') {
          return path(ease);
      }

      ease = ease.toLowerCase().split('.');
      const easeParent = easing[ease[0]];

      if (!easeParent) {
        console.error(`${consoleName} Easing with name "${ease[0]}" wasn't found, fallback to "${defaultEasingString}" instead.`, easing);

        return easing[defaultEasing[0]][defaultEasing[1]];
      }
      return easeParent[ease[1]];
    }
    // // comming soon:
    // //   - if array passed - parse as `bezier` function
    // // ---
    // case 'object' {
    //   if (easing instanceof Array) {
    //     return this.bezier.apply(this, easing);
    //   } else {
    //     console.error(
    //       `:mojs: Failed to parse easing value of `,
    //       easing,
    //       ` fallback to "linear.none" instead`
    //     );
    //     return easing[defaultEasing[0]][defaultEasing[1]];
    //   }
    // }
  }
};

export { parseEasing as parseEasing };
