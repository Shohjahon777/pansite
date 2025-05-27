'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'

export default function ClientDashboard() {
  const [activeTab, setActiveTab] = useState('requests')
  
  const requests = [
    {
      id: 1,
      product: 'Pandora DX-91',
      status: 'В обработке',
      date: '23.05.2025',
      master: null,
      color: 'bg-yellow-900/20 text-yellow-400 border border-yellow-800'
    },
    {
      id: 2,
      product: 'Pandora DX-4GS',
      status: 'Принято',
      date: '21.05.2025',
      master: 'Алексей К.',
      color: 'bg-blue-900/20 text-blue-400 border border-blue-800'
    },
    {
      id: 3,
      product: 'Pandora DXL-5000',
      status: 'Установлено',
      date: '15.05.2025',
      master: 'Сергей М.',
      color: 'bg-green-900/20 text-green-400 border border-green-800',
      canReview: true
    }
  ]
  
  const [serialNumber, setSerialNumber] = useState('')
  const [warrantyResult, setWarrantyResult] = useState(null)
  
  const checkWarranty = (e) => {
    e.preventDefault()
    setWarrantyResult({
      isValid: serialNumber.length >= 6,
      model: 'Pandora DX-91',
      installDate: '15.01.2025',
      expiryDate: '15.01.2027',
      installer: 'АвтоПро Центр'
    })
  }
  
  return (
    <div className="page-container min-h-screen bg-gradient-to-br from-black to-gray-900">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-white">Личный кабинет клиента</h1>
          <button className="text-purple-400 hover:text-purple-300">
            Выйти →
          </button>
        </div>
        
        <div className="flex gap-4 mb-8">
          <button
            onClick={() => setActiveTab('requests')}
            className={`px-6 py-2 rounded-lg transition ${
              activeTab === 'requests'
                ? 'bg-purple-600 text-white'
                : 'bg-gray-800 text-gray-400 border border-gray-700'
            }`}
          >
            Мои заявки
          </button>
          <button
            onClick={() => setActiveTab('warranty')}
            className={`px-6 py-2 rounded-lg transition ${
              activeTab === 'warranty'
                ? 'bg-purple-600 text-white'
                : 'bg-gray-800 text-gray-400 border border-gray-700'
            }`}
          >
            Гарантия
          </button>
          <button
            onClick={() => setActiveTab('profile')}
            className={`px-6 py-2 rounded-lg transition ${
              activeTab === 'profile'
                ? 'bg-purple-600 text-white'
                : 'bg-gray-800 text-gray-400 border border-gray-700'
            }`}
          >
            Профиль
          </button>
        </div>
        
        {activeTab === 'requests' && (
          <div className="space-y-4">
            {requests.map((request, i) => (
              <motion.div
                key={request.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="bg-gray-900 rounded-2xl shadow-lg p-6 border border-gray-800"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold text-lg text-white">{request.product}</h3>
                    <p className="text-gray-400">Дата заявки: {request.date}</p>
                    {request.master && <p className="text-gray-400">Мастер: {request.master}</p>}
                  </div>
                  <span className={`px-3 py-1 rounded-full text-sm ${request.color}`}>
                    {request.status}
                  </span>
                </div>
                
                <div className="mt-4 flex gap-2">
                  {request.status === 'В обработке' && (
                    <button className="text-red-400 hover:text-red-300">
                      Отменить заявку
                    </button>
                  )}
                  {request.canReview && (
                    <button className="text-purple-400 hover:text-purple-300">
                      Оставить отзыв
                    </button>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        )}
        
        {activeTab === 'warranty' && (
          <div className="bg-gray-900 rounded-2xl shadow-lg p-8 max-w-2xl border border-gray-800">
            <h2 className="text-2xl font-semibold mb-6 text-white">Проверка гарантии</h2>
            <form onSubmit={checkWarranty} className="space-y-4">
              <input
                type="text"
                placeholder="Серийный номер устройства"
                required
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white placeholder-gray-500"
                value={serialNumber}
                onChange={e => setSerialNumber(e.target.value)}
              />
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 rounded-xl"
              >
                Проверить
              </button>
            </form>
            
            {warrantyResult && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`mt-6 p-6 rounded-xl ${
                  warrantyResult.isValid
                    ? 'bg-green-900/20 border border-green-800'
                    : 'bg-red-900/20 border border-red-800'
                }`}
              >
                {warrantyResult.isValid ? (
                  <>
                    <h3 className="font-semibold text-green-400 mb-3">✓ Гарантия активна</h3>
                    <div className="space-y-1 text-sm text-gray-300">
                      <p><span className="font-medium text-gray-400">Модель:</span> {warrantyResult.model}</p>
                      <p><span className="font-medium text-gray-400">Установлено:</span> {warrantyResult.installDate}</p>
                      <p><span className="font-medium text-gray-400">Действует до:</span> {warrantyResult.expiryDate}</p>
                      <p><span className="font-medium text-gray-400">Установщик:</span> {warrantyResult.installer}</p>
                    </div>
                  </>
                ) : (
                  <p className="text-red-400">✗ Гарантия не найдена</p>
                )}
              </motion.div>
            )}
          </div>
        )}
        
        {activeTab === 'profile' && (
          <div className="bg-gray-900 rounded-2xl shadow-lg p-8 max-w-2xl border border-gray-800">
            <h2 className="text-2xl font-semibold mb-6 text-white">Мой профиль</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-400">Телефон</label>
                <input type="tel" value="+998 90 123 45 67" className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white" disabled />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-400">Имя</label>
                <input type="text" placeholder="Введите имя" className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white placeholder-gray-500" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-400">Email</label>
                <input type="email" placeholder="email@example.com" className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white placeholder-gray-500" />
              </div>
              <button className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-xl">
                Сохранить изменения
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}