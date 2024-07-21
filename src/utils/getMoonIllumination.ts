export const getMoonIllumination = (phase: number) => {
  const min = 0;
  const max = 100;
  const phasePercent = phase * 100;

  if (phase <= 0.5) {
    return (min + (phasePercent / 50) * (max - min));
  } else {
    return max - ((phasePercent - 50) / 50) * (max - min);
  }
};
