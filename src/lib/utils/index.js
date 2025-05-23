// src/lib/utils/index.js
// Утилиты для проекта

// Функция для объединения классов (полезна при использовании с Tailwind)
export function cn(...classes) {
    return classes.filter(Boolean).join(' ')
}

// Функция для форматирования номера телефона
export function formatPhoneNumber(phone) {
    // Формат для узбекских номеров +998 XX XXX XX XX
    if (phone.startsWith('+998') && phone.length === 13) {
        return `+998 ${phone.slice(4, 6)} ${phone.slice(6, 9)} ${phone.slice(9, 11)} ${phone.slice(11, 13)}`
    }
    return phone
}

// Функция для проверки валидности серийного номера
export function isValidSerialNumber(serialNumber) {
    // Это заглушка, в реальном приложении должна быть более сложная проверка
    return /^[A-Z0-9]{10,15}$/.test(serialNumber)
}

// Функция для получения статуса заявки с цветом
export function getRequestStatusStyle(status) {
    switch (status) {
        case 'В обработке':
        case 'Новая':
            return { color: 'bg-gray-100 text-gray-800' }
        case 'Принято':
        case 'Принята':
            return { color: 'bg-blue-100 text-blue-800' }
        case 'Установлено':
        case 'Выполнена':
            return { color: 'bg-green-100 text-green-800' }
        case 'Отменено':
            return { color: 'bg-red-100 text-red-800' }
        default:
            return { color: 'bg-gray-100 text-gray-800' }
    }
}