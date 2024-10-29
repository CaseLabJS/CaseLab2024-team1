import { CoreApi } from './coreApi';

class PrivateApi extends CoreApi {
  setAuthHeader = (token: string) => {
    this.api.defaults.headers.common.Authorization = `Bearer ${token}`;
  };

  removeAuthHeader = () => {
    this.api.defaults.headers.common.Authorization = null;
  };
}

export const privateApi = new PrivateApi();
