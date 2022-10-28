export const deserializeQuery = (query, noQuestionMark = false) => {
  const pairs = (noQuestionMark ? query : query.substring(1)).split('&');
  const array = pairs.map(elem => elem.split('='));
  return Object.fromEntries(array);
};

export const serializeQuery = queryParams =>
  Object.entries(queryParams).reduce((acc, [key, value], index, array) => {
    if (typeof value === 'undefined') {
      return acc;
    }
    const postfix = index === array.length - 1 ? '' : '&';
    return `${acc}${encodeURIComponent(key)}=${encodeURIComponent(value)}${postfix}`;
  }, '?');

// TODO: replace with server request
export const loadLaureates = () =>
  fetch('https://code.s3.yandex.net/react/code/laureate.json').then(response => response.json()).then(({ laureates }) => laureates);
// TODO: replace with server request
export const loadCountries = () =>
  fetch('https://code.s3.yandex.net/react/code/country.json').then(response => response.json()).then(({ countries }) => countries);