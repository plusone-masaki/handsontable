/* eslint-disable jsdoc/require-description-complete-sentence */
/**
 * Checks if the passed value is numeric one.
 *
 * @param {*} value The value to check.
 * @param {string[]} additionalDelimiters An additional delimiters to be used while checking the numeric value.
 * @returns {boolean}
 */
export function isNumeric(value, additionalDelimiters = []) {
  const type = typeof value;

  if (type === 'number') {
    return !isNaN(value) && isFinite(value);

  } else if (type === 'string') {
    if (value.length === 0) {
      return false;

    } else if (value.length === 1) {
      return /\d/.test(value);
    }

    const delimiter = Array.from(new Set(['.', ...additionalDelimiters]))
      .map(d => `\\${d}`)
      .join('|');

    return new RegExp(`^[+-]?\\s*(((${delimiter})?\\d+((${delimiter})\\d+)?(e[+-]?\\d+)?)|(0x[a-f\\d]+))$`, 'i')
      .test(value.trim());

  } else if (type === 'object') {
    return !!value && typeof value.valueOf() === 'number' && !(value instanceof Date);
  }

  return false;
}
/* eslint-enable jsdoc/require-description-complete-sentence */

/**
 * Checks if the passed value is numeric-like value (allows comma as delimiter).
 *
 * @param {*} value The value to check.
 * @returns {boolean}
 */
export function isNumericLike(value) {
  return isNumeric(value, [',']);
}

/**
 * A specialized version of `.forEach` defined by ranges.
 *
 * @param {Number} rangeFrom The number from start iterate.
 * @param {Number|Function} rangeTo The number where finish iterate or function as a iteratee.
 * @param {Function} [iteratee] The function invoked per iteration.
 */
export function rangeEach(rangeFrom, rangeTo, iteratee) {
  let index = -1;

  if (typeof rangeTo === 'function') {
    iteratee = rangeTo;
    rangeTo = rangeFrom;
  } else {
    index = rangeFrom - 1;
  }
  while (++index <= rangeTo) {
    if (iteratee(index) === false) {
      break;
    }
  }
}

/**
 * A specialized version of `.forEach` defined by ranges iterable in reverse order.
 *
 * @param {Number} rangeFrom The number from start iterate.
 * @param {Number|Function} rangeTo The number where finish iterate or function as a iteratee.
 * @param {Function} [iteratee] The function invoked per iteration.
 */
export function rangeEachReverse(rangeFrom, rangeTo, iteratee) {
  let index = rangeFrom + 1;

  if (typeof rangeTo === 'function') {
    iteratee = rangeTo;
    rangeTo = 0;
  }
  while (--index >= rangeTo) {
    if (iteratee(index) === false) {
      break;
    }
  }
}

/**
 * Calculate value from percent.
 *
 * @param {Number} value Base value from percent will be calculated.
 * @param {String|Number} percent Can be Number or String (eq. `'33%'`).
 * @returns {Number}
 */
export function valueAccordingPercent(value, percent) {
  percent = parseInt(percent.toString().replace('%', ''), 10);
  percent = parseInt(value * percent / 100, 10);

  return percent;
}
