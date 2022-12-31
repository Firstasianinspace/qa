export const countDuplicates = (arr) => {
  if (Array.isArray(arr)) {
    const count = Array.from(
      arr.reduce((r, c) => r.set(c, (r.get(c) || 0) + 1), new Map()),
      ([id, quantity]) => ({ id, quantity })
    );
    return count;
  }
  return [{ id: arr, quantity: 1 }];
};

export const addMockObjectToArray = (arr) => {
  if (arr.length < 4) {
    return arr;
  }
  const mockObject = {
    id: null,
    quantity: null,
    mock: true,
  };
  return [...arr.slice(0, 3), mockObject];
};
