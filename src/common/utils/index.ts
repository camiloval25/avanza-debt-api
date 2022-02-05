export const groupByKey = (array: any[], key: string) => {
  const groupedValues = array.reduce((prev, curr) => {
    prev[curr[key]] = prev[curr[key]] || [];
    prev[curr[key]].push(curr);
    return prev;
  }, {});

  return groupedValues;
};
