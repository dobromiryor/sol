export const getMoonPhase = (phase: number) => {
  if (phase === 0 || phase === 100) {
    return "New moon";
  }

  if (phase === 0.25) return "First quarter";

  if (phase === 0.5) return "Full Moon";

  if (phase === 0.75) return "Last quarter";

  if (phase > 0 && phase < 0.25) return "Waxing crescent";
  if (phase > 0.25 && phase < 0.5) return "Waxing gibbous";
  if (phase > 0.5 && phase < 0.75) return "Waning gibbous";
  if (phase > 0.75 && phase < 1) return "Waning crescent";

  return "";
};
