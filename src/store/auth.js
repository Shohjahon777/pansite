// src/store/auth.js
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const useAuthStore = create(
    persist(
        (set) => ({
            phone: null,
            isAuthenticated: false,
            userType: null,

            setPhone: (phone) => set({ phone }),
            setAuthenticated: (value) => set({ isAuthenticated: value }),
            setUserType: (type) => set({ userType: type }),
            logout: () => set({ phone: null, isAuthenticated: false, userType: null }),
        }),
        {
            name: 'auth-storage',
        }
    )
)