import Axios, { AxiosError, AxiosInstance, AxiosRequestConfig } from 'axios';
import { EventEmitter } from 'events';

import { Logger } from '~/utils';

class Rest extends EventEmitter {
  public kOnUnauthorized = 'onUnauthorized';

  private _axios: AxiosInstance;
  private _config: AxiosRequestConfig;

  public init(config: AxiosRequestConfig) {
    this._config = config;
    this._axios = Axios.create(config);
  }

  ///////////////////////////////////////////////////////////////////

  /**
   * Set Authorization for the default fetch config
   * @param token
   */
  public setAuthorization(token: string) {
    const { headers } = this._config;
    this._axios.defaults.headers = {
      ...headers,
      Authorization: `Bearer ${token}`,
    };
  }

  ///////////////////////////////////////////////////////////////////

  public async get<T>(url: string, cfg?: AxiosRequestConfig): Promise<T> {
    Logger.debug('GET', url);
    try {
      const res = await this._axios.get<T>(url, cfg);
      return res.data;
    } catch (err) {
      if (this.isUnauthorized(err)) {
        this.emit(this.kOnUnauthorized);
      }

      throw err;
    }
  }

  ///////////////////////////////////////////////////////////////////

  public getCode(err: AxiosError): number {
    if (err.code) {
      return Number.parseInt(err.code, 10);
    }

    if (err.response?.status) {
      return err.response.status;
    }

    const matches = err.message.match(/.*(\d+)$/);
    if (matches && matches.length > 0) {
      return Number.parseInt(matches[1], 10);
    }

    return 200;
  }

  public isUnauthorized(err: AxiosError) {
    if (this.getCode(err) === 401) {
      return true;
    }

    return false;
  }
}

const singleton = new Rest();
export { singleton as Rest };
