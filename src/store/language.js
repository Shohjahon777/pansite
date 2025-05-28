import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const useLanguageStore = create(
    persist(
        (set) => ({
            currentLocale: 'ru',
            setLocale: (locale) => set({ currentLocale: locale }),
        }),
        {
            name: 'language-storage',
        }
    )
)