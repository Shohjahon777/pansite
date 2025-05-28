export interface LocaleMessages {
    [locale: string]: {
        [key: string]: any
    }
}

export type Locale = 'ru' | 'uz'