class Logger {
  public debug(message?: any, ...optionalParams: any[]): void {
    if (process.env.NODE_ENV === 'development') {
      console.debug(message, ...optionalParams);
    }
  }

  public log(message?: any, ...optionalParams: any[]): void {
    if (process.env.NODE_ENV === 'development') {
      console.log(message, ...optionalParams);
    }
  }

  public info(message?: any, ...optionalParams: any[]): void {
    if (process.env.NODE_ENV === 'development') {
      console.info(message, ...optionalParams);
    }
  }

  public warn(message?: any, ...optionalParams: any[]): void {
    if (process.env.NODE_ENV === 'development') {
      console.warn(message, ...optionalParams);
    }
  }

  public error(message?: any, ...optionalParams: any[]): void {
    if (process.env.NODE_ENV === 'development') {
      console.error(message, ...optionalParams);
    }
  }
}

const singleton = new Logger();
export { singleton as Logger };
