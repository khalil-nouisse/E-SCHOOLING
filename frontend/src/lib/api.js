import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true, // For handling cookies if needed later
});

api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export const AuthService = {
    login: async (email, password) => {
        const response = await api.post('/auth/login', { email, password });
        if (response.data.accessToken) {
            localStorage.setItem('token', response.data.accessToken);
            localStorage.setItem('user', JSON.stringify(response.data.user || {}));
        }
        return response.data;
    },
    register: async (data) => {
        const response = await api.post('/auth/register', data);
        return response.data;
    },
    logout: () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
    }
};

export const AdminService = {
    // Dashboard
    getDashboardStats: async () => {
        const response = await api.get('/admin/dashboard/stats');
        return response.data;
    },

    // Users
    getAllUsers: async () => {
        const response = await api.get('/admin/users');
        return response.data;
    },
    createUser: async (userData) => {
        const response = await api.post('/admin/users', userData);
        return response.data;
    },
    updateUser: async (id, userData) => {
        const response = await api.put(`/admin/users/${id}`, userData);
        return response.data;
    },
    deleteUser: async (id) => {
        const response = await api.delete(`/admin/users/${id}`);
        return response.data;
    },

    // Inscriptions (Applications)
    getAllInscriptions: async () => {
        const response = await api.get('/admin/inscriptions');
        return response.data;
    },
    getInscriptionDetails: async (id) => {
        const response = await api.get(`/admin/inscriptions/${id}`);
        return response.data;
    },
    updateInscriptionStatus: async (id, data) => {
        // data: { status, agentId, rejectionComment }
        const response = await api.patch(`/admin/inscriptions/${id}/status`, data);
        return response.data;
    },
    getRecentApplications: async (limit = 5) => {
        const response = await api.get(`/admin/inscriptions/recent-applications?limit=${limit}`);
        return response.data;
    }
};

export const StudentService = {
    getMajors: async () => {
        const response = await api.get('/student/majors');
        return response.data;
    },
    apply: async (data) => {
        const response = await api.post('/student/apply', data);
        return response.data;
    },
    getMyApplications: async () => {
        const response = await api.get('/student/my-applications');
        return response.data;
    },
    uploadDocument: async (id, file, type = 'OTHER') => {
        const formData = new FormData();
        formData.append('document', file);
        formData.append('documentType', type);
        const response = await api.post(`/student/upload/${id}`, formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        });
        return response.data;
    }
};

export default api;
