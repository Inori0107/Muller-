import axios from "axios";
import { useUserStore } from "@/stores/user";

// 建立實例
const api = axios.create({
  baseURL: import.meta.env.VITE_API,
});
const apiAuth = axios.create({
  baseURL: import.meta.env.VITE_API,
});

// 在每個請求中自動加上 JWT Token
apiAuth.interceptors.request.use((config) => {
  const user = useUserStore();
  config.headers.Authorization = "Bearer " + user.token;
  return config;
});

// 處理回應錯誤，特別是處理登入過期的情況
apiAuth.interceptors.response.use(
  (res) => {
    return res;
  },
  async (error) => {
    // 如果失敗有回應 (網路斷線也算是失敗，但網路斷線不會有回應)
    if (error.response) {
      // 如果得到登入過期的回應訊息，且不是舊換新
      if (
        error.response.data.message === "登入過期" &&
        error.config.url !== "/user/extend"
      ) {
        const user = useUserStore();
        try {
          // 傳送舊換新的請求
          const { data } = await apiAuth.patch("/user/extend");
          // 舊換新成功 更新 store 的 token
          user.token = data.result;
          // 修改原本發生錯誤的請求設定
          error.config.headers.Authorization = "Bearer " + user.token;
          // 重新傳送一次原本的請求
          return axios(error.config);
        } catch (_) {
          // 舊換新錯誤 登出
          user.logout();
        }
      }
    }
    // 回傳原本請求的錯誤到呼叫 apiAuth 的地方
    return Promise.reject(error);
  }
);

export const useApi = () => {
  return { api, apiAuth };
};
