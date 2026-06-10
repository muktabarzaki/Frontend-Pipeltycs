import axios from 'axios';

const api = axios.create({
    // Menggunakan variabel environment Vercel, jika tidak terbaca otomatis fallback ke localhost
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8000/api',
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    },
    withCredentials: false, 
});

// Otomatis kirim token di setiap request
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// Handle token expired
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            localStorage.removeItem('token');
            window.location.href = '/'; // Diubah ke '/' agar kembali ke landing page / login utama kamu
        }
        return Promise.reject(error);
    }
);

export default api;