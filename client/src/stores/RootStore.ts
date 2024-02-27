import axios from 'axios';
import { config } from 'dotenv';


import { AuthStore } from './AuthStore';



config();

export class RootStore {
    public authStore: AuthStore;
  
    public constructor() {
        axios.defaults.timeout = 15000;
        axios.defaults.baseURL = process.env.REACT_APP_BASE_URL;
        axios.defaults.withCredentials = true;
        axios.defaults.headers.post['Content-Type'] = 'application/json';

        axios.interceptors.request.use(function (config) {
            console.debug(`Initiating ${config.method} request to '${config.url}'`, { config });

            return config;
        });
        axios.interceptors.response.use(
            function (response) {
                return response;
            },
            async (error) => {
                const config = error.config;
                if (
                    config.url !== '/api/Auth/refresh-token' &&
                    error.config &&
                    !error.config.__isRetry &&
                    error.response.status === 401 &&
                    !config.retried
                ) {
                    await axios.post('/api/Auth/refresh-token');
                    config.retried = true;
                    return axios(config);
                }
                return Promise.reject(error);
            }
        );

        this.authStore = new AuthStore();
      
    }
}
