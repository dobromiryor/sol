type Options = {
  limitMinPercentage?: boolean;
  limitMaxPercentage?: boolean;
};

export const getPercentage = (
  min: number,
  max: number,
  value: number,
  options: Options = { limitMaxPercentage: true, limitMinPercentage: true }
) => {
  const { limitMaxPercentage, limitMinPercentage } = options;

  const diff = max - min;
  const valueDiff = value - min;
  const percentage = (valueDiff / diff) * 100;

  if (limitMinPercentage && percentage <= 0) {
    return 0;
  }

  if (limitMaxPercentage && percentage >= 100) {
    return 100;
  }

  return percentage;
};
