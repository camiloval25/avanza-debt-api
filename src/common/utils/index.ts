export const groupByKey = (array: any[], key: string) => {
  const groupedValues = array.reduce((prev, curr) => {
    prev[curr[key]] = prev[curr[key]] || [];
    prev[curr[key]].push(curr);
    return prev;
  }, {});

  return groupedValues;
};

export const documentTypeToString = (documentType: string): string => {
  const documentTypesAvailable = {
    identificationCard: 'Cédula de Ciudadanía',
    identityCard: 'Tarjeta de Identidad',
    foreignCard: 'Cédula de Extranjería',
    passport: 'Pasaporte',
  };

  return documentTypesAvailable[documentType];
};

export const scheduleTypeToString = (scheduleType: string): string => {
  const scheduleTypeAvailable = {
    week: 'Semana',
    weekend: 'Fin de Semana',
  };

  return scheduleTypeAvailable[scheduleType];
};

export const formatNumberToCurrency = (value: number): string => {
  return `$${new Intl.NumberFormat().format(value)}`;
};

export const capitalizeFirstLetter = (string: string): string => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

export const getLastCharsOfId = (string: string): string => {
  const splitUUID = string.split('-');
  return splitUUID[splitUUID.length - 1];
};
