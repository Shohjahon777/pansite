export const tokenManager = {
    get: () => {
        if (typeof window !== 'undefined') {
            return localStorage.getItem('authToken')
        }
        return null
    },

    set: (token) => {
        if (typeof window !== 'undefined') {
            localStorage.setItem('authToken', token)
        }
    },

    remove: () => {
        if (typeof window !== 'undefined') {
            localStorage.removeItem('authToken')
            localStorage.removeItem('userInfo')
        }
    },

    isValid: () => {
        const token = tokenManager.get()
        if (!token) return false

        try {
            const payload = JSON.parse(atob(token.split('.')[1]))
            const currentTime = Date.now() / 1000
            return payload.exp > currentTime
        } catch (error) {
            return false
        }
    }
}

export const userManager = {
    get: () => {
        if (typeof window !== 'undefined') {
            const userInfo = localStorage.getItem('userInfo')
            return userInfo ? JSON.parse(userInfo) : null
        }
        return null
    },

    set: (userInfo) => {
        if (typeof window !== 'undefined') {
            localStorage.setItem('userInfo', JSON.stringify(userInfo))
        }
    },

    remove: () => {
        if (typeof window !== 'undefined') {
            localStorage.removeItem('userInfo')
        }
    }
}

export const apiRequest = async (endpoint, options = {}) => {
    const token = tokenManager.get()
    const headers = {
        'Content-Type': 'application/json',
        ...options.headers
    }

    if (token && tokenManager.isValid()) {
        headers.Authorization = `Bearer ${token}`
    }

    try {
        const response = await fetch(`/api/${endpoint}`, {
            ...options,
            headers
        })

        if (response.status === 401) {
            tokenManager.remove()
            userManager.remove()
            if (typeof window !== 'undefined') {
                window.location.href = '/account'
            }
            throw new Error('Unauthorized')
        }

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}))
            throw new Error(errorData.message || `HTTP error! status: ${response.status}`)
        }

        return await response.json()
    } catch (error) {
        console.error('API request failed:', error)
        throw error
    }
}

export const authAPI = {
    loginMaster: async (login, password) => {
        try {
            const response = await apiRequest('login-master', {
                method: 'POST',
                body: JSON.stringify({ login, password })
            })

            if (response.success && response.token) {
                tokenManager.set(response.token)
                userManager.set(response.user)
                return response
            } else {
                throw new Error('Login failed')
            }
        } catch (error) {
            throw new Error(error.message || 'Login failed')
        }
    },

    loginClient: async (login, password) => {
        try {
            const response = await apiRequest('client-login', {
                method: 'POST',
                body: JSON.stringify({ login, password })
            })

            if (response.success && response.token) {
                tokenManager.set(response.token)
                userManager.set(response.user)
                return response
            } else {
                throw new Error('Login failed')
            }
        } catch (error) {
            throw new Error(error.message || 'Login failed')
        }
    },

    sendRegistrationSMS: async (phone) => {
        try {
            const response = await apiRequest('get-client-phone', {
                method: 'POST',
                body: JSON.stringify({ phone })
            })
            return response
        } catch (error) {
            throw new Error(error.message || 'Failed to send registration SMS')
        }
    },

    verifyRegistrationSMS: async (phone, code) => {
        try {
            const response = await apiRequest('get-user-verification-code', {
                method: 'POST',
                body: JSON.stringify({ phone, code })
            })
            return response
        } catch (error) {
            throw new Error(error.message || 'Failed to verify registration code')
        }
    },

    registerClient: async (userData) => {
        try {
            const response = await apiRequest('client-register', {
                method: 'POST',
                body: JSON.stringify(userData)
            })

            if (response.success && response.token) {
                tokenManager.set(response.token)
                userManager.set(response.user)
                return response
            } else {
                throw new Error('Registration failed')
            }
        } catch (error) {
            throw new Error(error.message || 'Registration failed')
        }
    },

    sendResetPasswordSMS: async (phone) => {
        try {
            const response = await apiRequest('auth/send-reset-password-sms', {
                method: 'POST',
                body: JSON.stringify({ phone })
            })
            return response
        } catch (error) {
            throw new Error(error.message || 'Failed to send reset code')
        }
    },

    verifyResetPasswordSMS: async (phone, code) => {
        try {
            const response = await apiRequest('auth/verify-reset-password-sms', {
                method: 'POST',
                body: JSON.stringify({ phone, code })
            })
            return response
        } catch (error) {
            throw new Error(error.message || 'Failed to verify reset code')
        }
    },

    resetPassword: async (phone, code, newPassword) => {
        try {
            const response = await apiRequest('auth/reset-password', {
                method: 'POST',
                body: JSON.stringify({ phone, code, newPassword })
            })
            return response
        } catch (error) {
            throw new Error(error.message || 'Failed to reset password')
        }
    },

    sendSMSCode: async (phone) => {
        try {
            const response = await apiRequest('auth/send-sms', {
                method: 'POST',
                body: JSON.stringify({ phone })
            })
            return response
        } catch (error) {
            throw new Error(error.message || 'Failed to send SMS code')
        }
    },

    verifySMSCode: async (phone, code) => {
        try {
            const response = await apiRequest('auth/verify-sms', {
                method: 'POST',
                body: JSON.stringify({ phone, code })
            })

            if (response.success && response.token) {
                tokenManager.set(response.token)
                userManager.set(response.user)
                return response
            } else {
                throw new Error('Code verification failed')
            }
        } catch (error) {
            throw new Error(error.message || 'Code verification failed')
        }
    },

    logout: async () => {
        try {
            const user = userManager.get()
            const endpoint = user?.role === 'master' ? 'logout-master' : 'logout-master'
            await apiRequest(endpoint, { method: 'POST' })
        } catch (error) {
            console.warn('Logout API call failed:', error)
        } finally {
            tokenManager.remove()
            userManager.remove()
        }
    },

    getCurrentUser: async () => {
        try {
            const response = await apiRequest('auth/me')
            return response.user
        } catch (error) {
            throw new Error('Failed to get user info')
        }
    },

    checkLoginAvailability: async (login) => {
        try {
            const response = await apiRequest('auth/check-login-availability', {
                method: 'POST',
                body: JSON.stringify({ login })
            })
            return response
        } catch (error) {
            throw new Error(error.message || 'Failed to check login availability')
        }
    },

    checkPhoneAvailability: async (phone) => {
        try {
            const response = await apiRequest('auth/check-phone-availability', {
                method: 'POST',
                body: JSON.stringify({ phone })
            })
            return response
        } catch (error) {
            throw new Error(error.message || 'Failed to check phone availability')
        }
    }
}

export const masterAPI = {
    getDashboard: async () => {
        return await apiRequest('master/dashboard')
    },

    getOrders: async (params = {}) => {
        const queryString = new URLSearchParams(params).toString()
        return await apiRequest(`master/orders${queryString ? `?${queryString}` : ''}`)
    },

    updateOrderStatus: async (orderId, status) => {
        return await apiRequest(`master/orders/${orderId}/status`, {
            method: 'PATCH',
            body: JSON.stringify({ status })
        })
    },

    getClients: async (params = {}) => {
        const queryString = new URLSearchParams(params).toString()
        return await apiRequest(`master/clients${queryString ? `?${queryString}` : ''}`)
    },

    getClient: async (clientId) => {
        return await apiRequest(`master/clients/${clientId}`)
    }
}

export const clientAPI = {
    getOrders: async () => {
        return await apiRequest('client/orders')
    },

    createOrder: async (orderData) => {
        return await apiRequest('client/orders', {
            method: 'POST',
            body: JSON.stringify(orderData)
        })
    },

    getOrder: async (orderId) => {
        return await apiRequest(`client/orders/${orderId}`)
    },

    updateProfile: async (profileData) => {
        return await apiRequest('client/profile', {
            method: 'PATCH',
            body: JSON.stringify(profileData)
        })
    },

    changePassword: async (currentPassword, newPassword) => {
        return await apiRequest('client/change-password', {
            method: 'POST',
            body: JSON.stringify({ currentPassword, newPassword })
        })
    },

    getProfile: async () => {
        return await apiRequest('client/profile')
    }
}

export const warrantyAPI = {
    checkWarranty: async (serialNumber) => {
        return await apiRequest('warranty/check', {
            method: 'POST',
            body: JSON.stringify({ serialNumber })
        })
    }
}
