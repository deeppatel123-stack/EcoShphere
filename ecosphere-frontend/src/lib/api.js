const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

const getAuthHeaders = () => {
    const token = localStorage.getItem('accessToken');
    return {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` }),
    };
};

const handleResponse = async (res) => {
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Something went wrong');
    return data;
};

export const api = {
    get: (endpoint) =>
        fetch(`${BASE_URL}${endpoint}`, { headers: getAuthHeaders() }).then(handleResponse),

    post: (endpoint, payload) =>
        fetch(`${BASE_URL}${endpoint}`, {
            method: 'POST',
            headers: getAuthHeaders(),
            body: JSON.stringify(payload),
        }).then(handleResponse),

    put: (endpoint, payload) =>
        fetch(`${BASE_URL}${endpoint}`, {
            method: 'PUT',
            headers: getAuthHeaders(),
            body: JSON.stringify(payload),
        }).then(handleResponse),

    delete: (endpoint) =>
        fetch(`${BASE_URL}${endpoint}`, {
            method: 'DELETE',
            headers: getAuthHeaders(),
        }).then(handleResponse),
};
