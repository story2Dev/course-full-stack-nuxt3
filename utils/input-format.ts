export const parseInput = (input: string) => {
  const nums = input.replace(/,/g, "").trim();
  if (/^\d+(\.(\d+)?)?$/.test(nums)) return Number(nums);
  return nums === "" ? null : Number.NaN;
};

export const formatNumber = (value: number | null) => {
  if (value === null) return "";
  return value.toLocaleString("en-US");
};
