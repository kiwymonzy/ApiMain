"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.addSignPrefixAndSuffix = void 0;

const addSignPrefixAndSuffix = (value, options) => {
  const {
    prefix,
    sign,
    suffix,
    signPosition
  } = options;

  switch (signPosition) {
    case 'beforePrefix':
      return "".concat(sign).concat(prefix).concat(value).concat(suffix);

    case 'afterPrefix':
      return "".concat(prefix).concat(sign).concat(value).concat(suffix);
  }
};

exports.addSignPrefixAndSuffix = addSignPrefixAndSuffix;

var _default = (input, options) => {
  const {
    precision,
    separator = ',',
    delimiter = '.',
    prefix = '',
    suffix = '',
    ignoreNegative,
    showPositiveSign,
    signPosition = 'afterPrefix'
  } = options || {};
  const negative = ignoreNegative ? false : input < 0;
  const sign = negative ? '-' : showPositiveSign ? '+' : '';
  const string = Math.abs(input).toFixed(precision);
  const parts = string.split('.');
  const buffer = [];
  let number = parts[0];

  while (number.length > 0) {
    buffer.unshift(number.substr(Math.max(0, number.length - 3), 3));
    number = number.substr(0, number.length - 3);
  }

  let formattedNumber = '';
  formattedNumber = buffer.join(delimiter);
  const decimals = parts[1];

  if (!!precision && decimals) {
    formattedNumber += separator + decimals;
  }

  return addSignPrefixAndSuffix(formattedNumber, {
    prefix,
    suffix,
    sign,
    signPosition
  });
};

exports.default = _default;
//# sourceMappingURL=formatNumber.js.map