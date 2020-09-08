class Time {
  // https://gist.github.com/ca0v/73a31f57b397606c9813472f7493a940#gistcomment-3306762
  public debounce = <F extends (...args: any[]) => any>(
    func: F,
    waitFor: number,
  ) => {
    let timeout: ReturnType<typeof setTimeout> | null = null;

    const debounced = (...args: Parameters<F>) => {
      if (timeout !== null) {
        clearTimeout(timeout);
        timeout = null;
      }
      timeout = setTimeout(() => func(...args), waitFor);
    };

    return debounced as (...args: Parameters<F>) => ReturnType<F>;
  };
}

const singleton = new Time();
export { singleton as Time };
