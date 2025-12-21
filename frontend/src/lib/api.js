import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true, // For handling cookies if needed later
});

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

export default api;
