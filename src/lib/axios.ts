import axios from 'axios';
import { Cookies } from 'react-cookie';

const TOKEN = localStorage.getItem('accessToken');
const cookies = new Cookies();

const client = axios.create({
  baseURL: process.env.REACT_APP_IP,
  headers: {
    'Content-type': 'application/json',
    Authorization: `Bearer ${TOKEN}`,
  },
});

///** config에는 위의 axiosInstance 객체를 이용하여 request를 보냈을떄의 모든 설정값들이 들어있다.
client.interceptors.request.use((config: any) => {
  const headers = {
    ...config.headers,
    accessToken: localStorage.getItem('accessToken'),
    refreshToken: cookies.get('refreshToken'),
  };

  return { ...config, headers };
});

client.interceptors.response.use(
  function (response) {
    console.log(response);

    return response.data.data;
  },
  async (error) => {
    const {
      config,
      response: { status },
    } = error;

    console.log(error);
    const originalRequest = config;

    if (status === 401) {
      console.log('토큰 만료');
      //token refresh 요청

      const res = await client.post(
        `/auth/token`, // token refresh api
        {
          accessToken: localStorage.getItem('accessToken'),
          refreshToken: cookies.get('refreshToken'),
        },
      );

      console.log(res.data.message);

      const newAccessToken = res.data.data.accessToken;

      localStorage.setItem('accessToken', newAccessToken);
      originalRequest.headers = {
        newAccessToken,
      };

      //리프레시 토큰도 만료돠거나 유효하지 않은 토큰인 경우
      if (res.data.status === 400) {
        window.location.href = '/login';
      }

      return axios(originalRequest);
    }
    console.log(client.interceptors);
    return error.response;
  },
);
export { client };
