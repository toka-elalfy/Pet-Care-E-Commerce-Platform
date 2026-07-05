const API_BASE_URL = 'http://localhost:5000/api';

export const fetchInfoPage = async (slug) => {
    const res = await fetch(`${API_BASE_URL}/info/${slug}`);
    if (!res.ok) throw new Error(`Failed to fetch ${slug} page`);
    return res.json();
};

export const fetchJobs = async () => {
    const res = await fetch(`${API_BASE_URL}/careers/listings`);
    if (!res.ok) throw new Error('Failed to fetch jobs');
    return res.json();
};

export const submitJobApplication = async (formData) => {
    const res = await fetch(`${API_BASE_URL}/careers/apply`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
    });
    if (!res.ok) throw new Error('Failed to submit application');
    return res.json();
};

export const fetchFAQs = async () => {
    const res = await fetch(`${API_BASE_URL}/help-center/faqs`);
    if (!res.ok) throw new Error('Failed to fetch FAQs');
    return res.json();
};

export const fetchPressReleases = async () => {
    const res = await fetch(`${API_BASE_URL}/press/releases`);
    if (!res.ok) throw new Error('Failed to fetch press releases');
    return res.json();
};

export const submitContactMessage = async (formData) => {
    const res = await fetch(`${API_BASE_URL}/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
    });
    if (!res.ok) throw new Error('Failed to send contact message');
    return res.json();
};

export const forgotPassword = async (email) => {
    const res = await fetch(`${API_BASE_URL}/auth/forgot-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
    });
    if (!res.ok) {
        const data = await res.json();
        throw new Error(data.msg || 'Failed to request password reset');
    }
    return res.json();
};

export const resetPassword = async (token, password) => {
    const res = await fetch(`${API_BASE_URL}/auth/reset-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, password }),
    });
    if (!res.ok) {
        const data = await res.json();
        throw new Error(data.msg || 'Failed to reset password');
    }
    return res.json();
};
