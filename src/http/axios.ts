import axios, { AxiosResponse, AxiosRequestConfig } from 'axios'
import store from "@/store";
import { Modal } from "iview";
//import router from "@/router";
import Cookies from 'js-cookie'

axios.defaults.withCredentials = true;
axios.defaults.timeout = 20000;

// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
axios.defaults.headers.post["Content-Type"] = "application/json";
class HttpRequest {
  baseUrl: string;
  constructor() {
    this.baseUrl = (process.env.NODE_ENV == "development") ? "/api" : window.location.origin;
  }
  getInsideConfig() {
    const config = {
      baseURL: this.baseUrl,
      headers: {
        //
      }
    };
    return config; 
  }
  interceptors(instance: any, url?: string) {
    // 请求拦截器
    instance.interceptors.request.use((config: any) => {
      if (!store.state.internetNormal) {
        store.commit("changeInternetNormal", true);
      }
      config.headers.Authorization = Cookies.get("AUTH_TOCKEN");
      store.commit("changeGlobalLoading", true);
      return config;
    }, (error: object) => {
      return Promise.reject(error);
    });
    // 响应拦截
    instance.interceptors.response.use((res: AxiosResponse) => {
      store.commit("changeGlobalLoading", false);
      return Promise.resolve(res);
    }, (error: object) => {
      store.commit("changeGlobalLoading", false);
      // if (error.response && error.response.status === 401) {
      //   Modal.confirm({
      //     title: "提示",
      //     content: "<p>登录状态失效，请重新登录！</p>",
      //     onOk: () => {
      //       Cookies.remove("AUTH_TOCKEN");
      //       router.push({
      //         "path": "/"
      //       });
      //     }
      //   });
      // } else {
        store.commit("changeInternetNormal", false);
      //}
      return Promise.reject(error);
    });
  }
  request(options:AxiosRequestConfig) {
    const instance = axios.create();
    options = Object.assign(this.getInsideConfig(), options);
    this.interceptors(instance);
    return instance(options);
  }
}
let api = new HttpRequest();
export default api as any;
