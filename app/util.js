import uuidv5 from 'uuid/v5';

export const genUUID = function(email) {
  return uuidv5(email, uuidv5.URL);
}

// eg 9.99 => 999, or $7.77 => 777
// HT: https://codereview.stackexchange.com/a/3530
export const dollarStringToCents = function(money_string) {
  return Math.round(100 * parseFloat(money_string.replace(/[$,]/g, '')));
}

// http://stackoverflow.com/a/33286686/548170
export const centsToDollaString = function(x, dollar_sign) {
  if (dollar_sign == null) { dollar_sign = true; }
  let cents = x + '';
  while (cents.length < 4) {
    cents = `0${cents}`;
  }
  let dollars = cents.substr(0, cents.length - 2);
  const decimal = cents.substr(cents.length - 2, 2);
  while ((dollars.length % 3) !== 0) {
    dollars = `0${dollars}`;
  }
  const str = dollars.replace(/(\d{3})(?=\d)/g, '$1,').replace(/^0*(?=.)/, '');
  return (dollar_sign ? '$' : '') + str + '.' + decimal;
}
