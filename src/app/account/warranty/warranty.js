export const warrantyLocales = {
    ru: {
        warranty: {
            title: 'Проверка гарантии',
            subtitle: 'Введите серийный номер вашего устройства Pandora',
            serialNumber: 'Серийный номер',
            placeholder: 'Например: PD1234567890',
            hint: 'Серийный номер находится на корпусе устройства',
            checkButton: 'Проверить гарантию',
            checking: 'Проверяем...',
            valid: {
                title: 'Гарантия активна',
                serialNumber: 'Серийный номер',
                model: 'Модель устройства',
                installDate: 'Дата установки',
                expiryDate: 'Действует до',
                installer: 'Установщик',
                remaining: 'До окончания гарантии осталось',
                days: 'дней'
            },
            invalid: {
                title: 'Гарантия не найдена',
                description: 'Устройство с серийным номером {{serialNumber}} не найдено в базе данных.',
                reasons: {
                    title: 'Возможные причины:',
                    wrongNumber: 'Неверно введен серийный номер',
                    notRegistered: 'Устройство не зарегистрировано',
                    expired: 'Истек срок гарантии'
                },
                needHelp: 'Нужна помощь?',
                callSupport: 'Позвонить в поддержку'
            },
            findSerial: {
                title: 'Как найти серийный номер?',
                onDevice: 'На корпусе основного блока сигнализации',
                inWarranty: 'В гарантийном талоне',
                inDocs: 'В документах об установке',
                inApp: 'В мобильном приложении Pandora'
            }
        }
    },
    uz: {
        warranty: {
            title: 'Kafolatni tekshirish',
            subtitle: 'Pandora qurilmangizning seriya raqamini kiriting',
            serialNumber: 'Seriya raqami',
            placeholder: 'Masalan: PD1234567890',
            hint: 'Seriya raqami qurilma korpusida joylashgan',
            checkButton: 'Kafolatni tekshirish',
            checking: 'Tekshirilmoqda...',
            valid: {
                title: 'Kafolat faol',
                serialNumber: 'Seriya raqami',
                model: 'Qurilma modeli',
                installDate: "O'rnatilgan sana",
                expiryDate: 'Amal qiladi',
                installer: "O'rnatuvchi",
                remaining: 'Kafolat tugashiga qoldi',
                days: 'kun'
            },
            invalid: {
                title: 'Kafolat topilmadi',
                description: '{{serialNumber}} seriya raqamli qurilma ma\'lumotlar bazasida topilmadi.',
                reasons: {
                    title: 'Mumkin bo\'lgan sabablar:',
                    wrongNumber: 'Seriya raqami noto\'g\'ri kiritilgan',
                    notRegistered: 'Qurilma ro\'yxatdan o\'tmagan',
                    expired: 'Kafolat muddati tugagan'
                },
                needHelp: 'Yordam kerakmi?',
                callSupport: 'Qo\'llab-quvvatlashga qo\'ng\'iroq qiling'
            },
            findSerial: {
                title: 'Seriya raqamini qanday topish mumkin?',
                onDevice: 'Signalizatsiya asosiy blokining korpusida',
                inWarranty: 'Kafolat varaqasida',
                inDocs: "O'rnatish hujjatlarida",
                inApp: 'Pandora mobil ilovasida'
            }
        }
    }
}