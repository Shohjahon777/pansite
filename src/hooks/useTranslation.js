import { useMemo } from 'react'
import { useLanguageStore } from '../store/language'

export function useTranslation(localization) {
    const store = useLanguageStore()

    const messages = useMemo(
        () => localization[store.currentLocale],
        [localization, store.currentLocale]
    )

    const t = (key, params) => {
        const keys = key.split('.')
        let message = messages

        for (const part of keys) {
            if (message[part] === undefined) {
                return key
            }
            message = message[part]
        }

        if (typeof message === 'string' && params) {
            // Handle {{param}} syntax
            message = message.replace(/\{\{(\w+)\}\}/g, (_, match) => {
                return params[match] !== undefined ? String(params[match]) : `{{${match}}}`
            })

            // Handle {param} syntax  
            message = message.replace(/\{(\w+)\}/g, (_, match) => {
                return params[match] !== undefined ? String(params[match]) : `{${match}}`
            })
        }

        return typeof message === 'string' ? message : key
    }

    return { t, messages }
}