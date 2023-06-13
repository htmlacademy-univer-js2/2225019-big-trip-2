const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

const updateItem = (items, update) => {
  const index = items.findIndex((item) => item.id === update.id);
  if (index === -1) {
    return items;
  }
  return [
    ...items.slice(0, index),
    update,
    ...items.slice(index + 1),
  ];
};

const getRandomElement = (elements) => {
  const Min = 0;
  const Max = elements.length - 1;
  return elements[getRandomInteger(Min, Max)];
};

const legalizeValue = (value) => {
  if (value === false) {
    return '';
  }
  const capFirstValue = value[0].toUpperCase();
  const restOfValue = value.slice(1);
  return capFirstValue + restOfValue;
};

export { getRandomInteger, getRandomElement, legalizeValue };
