import numeral from 'numeral';
import { countryLocales, currencyCodes } from '../shared/globals';

export function fNumber(number) {
  return numeral(number).format();
}

export function formatCurrency(
  amount,
  currency = currencyCodes.EGY,
  locale = countryLocales.EGY
) {
  let currencyReplaced = false;
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency,
  })
    .formatToParts(amount / 100)
    .map((item, idx, arr) => {
      if (
        (item.type === 'currency' || item.type === 'literal') &&
        currencyReplaced
      )
        return '';
      const nextCurrency =
        arr[idx + 1] && arr[idx + 1].type === 'currency' && arr[idx + 1].value;
      if (item.type === 'minusSign' && nextCurrency && !currencyReplaced) {
        currencyReplaced = true;
        return `${nextCurrency} ${item.value}`;
      }
      return `${item.value}`;
    })
    .join('');
}

export function fCurrency(number) {
  const format = number ? numeral(number).format('$0,0.00') : '';

  return result(format, '.00');
}

export function fPercent(number) {
  const format = number ? numeral(Number(number) / 100).format('0.0%') : '';

  return result(format, '.0');
}

export function fShortenNumber(number) {
  const format = number ? numeral(number).format('0.00a') : '0';

  return result(format, '.00');
}

export function fData(number) {
  const format = number ? numeral(number).format('0.0 b') : '';

  return result(format, '.0');
}

function result(format, key = '.00') {
  const isInteger = format.includes(key);

  return isInteger ? format.replace(key, '') : format;
}
