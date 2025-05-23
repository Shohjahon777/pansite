'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'

export default function WarrantyPage() {
  const [serialNumber, setSerialNumber] = useState('')
  const [isChecking, setIsChecking] = useState(false)
  const [result, setResult] = useState(null)
  
  const handleCheck = (e) => {
    e.preventDefault()
    setIsChecking(true)
    
    setTimeout(() => {
      if (serialNumber.toUpperCase().startsWith('PD') && serialNumber.length >= 10) {
        setResult({
          isValid: true,
          model: 'Pandora DX-91',
          installDate: '15 января 2025',
          expiryDate: '15 января 2027',
          installer: 'АвтоПро Центр',
          installerPhone: '+998 71 123 45 67',
          remainingDays: 365,
          serialNumber: serialNumber.toUpperCase()
        })
      } else {
        setResult({ isValid: false })
      }
      setIsChecking(false)
    }, 1500)
  }
  
  return (
    <div className="page-container min-h-screen bg-gradient-to-br from-gray-50 to-purple-50">
      <div className="max-w-2xl mx-auto px-4 py-12">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-bold text-center mb-4"
        >
          Проверка гарантии
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center text-gray-600 mb-12"
        >
          Введите серийный номер вашего устройства Pandora
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-3xl shadow-xl p-8"
        >
          <form onSubmit={handleCheck} className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2">Серийный номер</label>
              <input
                type="text"
                placeholder="Например: PD1234567890"
                required
                className="w-full px-6 py-4 text-lg border-2 rounded-xl focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                value={serialNumber}
                onChange={(e) => setSerialNumber(e.target.value)}
                disabled={isChecking}
              />
              <p className="mt-2 text-sm text-gray-500">
                Серийный номер находится на корпусе устройства
              </p>
            </div>
            
            <button
              type="submit"
              disabled={isChecking}
              className={`w-full py-4 rounded-xl font-semibold text-lg transition ${
                isChecking
                  ? 'bg-gray-300 text-gray-500'
                  : 'bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:shadow-lg'
              }`}
            >
              {isChecking ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Проверяем...
                </span>
              ) : 'Проверить гарантию'}
            </button>
          </form>
          
          {result && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className={`mt-8 p-6 rounded-2xl ${
                result.isValid
                  ? 'bg-gradient-to-br from-green-50 to-green-100 border border-green-200'
                  : 'bg-gradient-to-br from-red-50 to-red-100 border border-red-200'
              }`}
            >
              {result.isValid ? (
                <>
                  <div className="flex items-center mb-4">
                    <div className="text-4xl mr-3">✅</div>
                    <h3 className="text-xl font-semibold text-green-800">Гарантия активна</h3>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="bg-white rounded-xl p-4">
                      <p className="text-sm text-gray-600">Серийный номер</p>
                      <p className="font-semibold">{result.serialNumber}</p>
                    </div>
                    
                    <div className="bg-white rounded-xl p-4">
                      <p className="text-sm text-gray-600">Модель устройства</p>
                      <p className="font-semibold">{result.model}</p>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-3">
                      <div className="bg-white rounded-xl p-4">
                        <p className="text-sm text-gray-600">Дата установки</p>
                        <p className="font-semibold">{result.installDate}</p>
                      </div>
                      <div className="bg-white rounded-xl p-4">
                        <p className="text-sm text-gray-600">Действует до</p>
                        <p className="font-semibold">{result.expiryDate}</p>
                      </div>
                    </div>
                    
                    <div className="bg-white rounded-xl p-4">
                      <p className="text-sm text-gray-600">Установщик</p>
                      <p className="font-semibold">{result.installer}</p>
                      <a href={`tel:${result.installerPhone}`} className="text-purple-600 text-sm hover:text-purple-700">
                        {result.installerPhone}
                      </a>
                    </div>
                    
                    <div className="bg-purple-100 rounded-xl p-4 text-center">
                      <p className="text-purple-800">
                        До окончания гарантии осталось <span className="font-bold">{result.remainingDays} дней</span>
                      </p>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="flex items-center mb-4">
                    <div className="text-4xl mr-3">❌</div>
                    <h3 className="text-xl font-semibold text-red-800">Гарантия не найдена</h3>
                  </div>
                  <p className="text-red-700 mb-4">
                    Устройство с серийным номером <strong>{serialNumber}</strong> не найдено в базе данных.
                  </p>
                  <div className="bg-white rounded-xl p-4">
                    <p className="text-sm mb-2">Возможные причины:</p>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Неверно введен серийный номер</li>
                      <li>• Устройство не зарегистрировано</li>
                      <li>• Истек срок гарантии</li>
                    </ul>
                  </div>
                  <div className="mt-4 text-center">
                    <p className="text-sm text-gray-600 mb-2">Нужна помощь?</p>
                    <a href="tel:+998901234567" className="text-purple-600 font-semibold hover:text-purple-700">
                      Позвонить в поддержку
                    </a>
                  </div>
                </>
              )}
            </motion.div>
          )}
        </motion.div>
        
        <div className="mt-12 bg-white rounded-2xl shadow-lg p-6">
          <h2 className="font-semibold text-lg mb-3">Как найти серийный номер?</h2>
          <div className="space-y-2 text-gray-600">
            <p>• На корпусе основного блока сигнализации</p>
            <p>• В гарантийном талоне</p>
            <p>• В документах об установке</p>
            <p>• В мобильном приложении Pandora</p>
          </div>
        </div>
      </div>
    </div>
  )
}