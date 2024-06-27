export const debounce = <Return, Arguments extends unknown[]>(
  fn: (...args: Arguments) => Return,
  ms = 300
) => {
  let timerId: ReturnType<typeof setTimeout> | undefined = undefined;

  return (...args: Arguments) => {
    clearTimeout(timerId);
    timerId = setTimeout(() => {
      fn.apply(this, args);
    }, ms);
  };
};
