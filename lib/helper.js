/**
 * @module helper
 * @description basic library helpers
 */

exports.isNumeric = function(num) {
  num = "" + num; //coerce num to be a string
  return !isNaN(num) && !isNaN(parseFloat(num));
}
