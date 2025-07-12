import axios from 'axios';

// 기본 Axios 인스턴스 설정
const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL ?? 'https://api.example.com',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 요청 인터셉터
instance.interceptors.request.use(
  config => {
    const token = localStorage.getItem('accessToken'); // 또는 쿠키에서 가져오기
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => Promise.reject(error)
);

// 응답 인터셉터
instance.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 401) {
      console.warn('인증 오류: 로그인 필요');
    }
    return Promise.reject(error);
  }
);

export default instance;