const API_BASE = import.meta.env.VITE_API_BASE_URL || '';

export const fetchStats = async () => {
    const res = await fetch(`${API_BASE}/stats/live`);
    return res.json();
};

export const fetchAlerts = async () => {
    const res = await fetch(`${API_BASE}/alerts`);
    return res.json();
};

export const login = async (username, password) => {
    const formData = new FormData();
    formData.append('username', username);
    formData.append('password', password);

    const res = await fetch(`${API_BASE}/token`, {
        method: 'POST',
        body: formData
    });
    return res.json();
};
