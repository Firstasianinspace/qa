export const countDuplicates = (arr) => {
  const count = Array.from(
    arr.reduce((r, c) => r.set(c, (r.get(c) || 0) + 1), new Map()),
    ([id, quantity]) => ({ id, quantity })
  );
  return count;
};
