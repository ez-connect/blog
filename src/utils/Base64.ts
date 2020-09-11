import { Buffer } from 'buffer';

class Base64 {
  public encode(value: string) {
    const buff = new Buffer(value);
    return buff.toString('base64');
  }

  public decode(value: string) {
    const buff = new Buffer(value, 'base64');
    return buff.toString('utf-8');
  }
}

const singleton = new Base64();
export { singleton as Base64 };
