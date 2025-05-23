'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'

export default function MasterDashboard() {
  const [activeTab, setActiveTab] = useState('requests')
  
  const stats = {
    today: 3,
    week: 12,
    month: 45,
    total: 156,
    rating: 4.8,
    income: {
      today: 150,
      week: 1200,
      month: 4500
    }
  }
  
  const requests = {
    new: [
      {
        id: 1,
        product: 'Pandora DX-91',
        client: 'Андрей П.',
        phone: '+998 90 987 65 43',
        car: 'Toyota Camry',
        date: '23.05.2025',
        time: '14:00'
      },
      {
        id: 2,
        product: 'Pandora DX-4GS',
        client: 'Мария С.',
        phone: '+998 90 123 45 67',
        car: 'Kia Rio',
        date: '24.05.2025',
        time: '10:00'
      }
    ],
    accepted: [
      {
        id: 3,
        product: 'Pandora DXL-5000',
        client: 'Виктор К.',
        phone: '+998 90 456 78 90',
        car: 'Chevrolet Malibu',
        date: '22.05.2025',
        time: '16:00'
      }
    ],
    completed: [
      {
        id: 4,
        product: 'Pandora DX-91',
        client: 'Павел М.',
        date: '20.05.2025',
        price: 50
      }
    ]
  }
  
  return (
    <div className="page-container min-h-screen bg-gradient-to-br from-gray-50 to-purple-50">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Кабинет мастера</h1>
          <button className="text-purple-600 hover:text-purple-700">
            Выйти →
          </button>
        </div>
        
        {/* Статистика */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white p-4 rounded-xl shadow text-center"
          >
            <p className="text-3xl font-bold text-purple-600">{stats.today}</p>
            <p className="text-gray-600">Сегодня</p>
            <p className="text-sm text-green-600">+${stats.income.today}</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white p-4 rounded-xl shadow text-center"
          >
            <p className="text-3xl font-bold text-purple-600">{stats.week}</p>
            <p className="text-gray-600">За неделю</p>
            <p className="text-sm text-green-600">+${stats.income.week}</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white p-4 rounded-xl shadow text-center"
          >
            <p className="text-3xl font-bold text-purple-600">{stats.month}</p>
            <p className="text-gray-600">За месяц</p>
            <p className="text-sm text-green-600">+${stats.income.month}</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white p-4 rounded-xl shadow text-center"
          >
            <p className="text-3xl font-bold text-purple-600">{stats.total}</p>
            <p className="text-gray-600">Всего</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white p-4 rounded-xl shadow text-center"
          >
            <p className="text-3xl font-bold text-yellow-500">⭐ {stats.rating}</p>
            <p className="text-gray-600">Рейтинг</p>
          </motion.div>
        </div>
        
        {/* Табы */}
        <div className="flex gap-4 mb-8">
          <button
            onClick={() => setActiveTab('requests')}
            className={`px-6 py-2 rounded-lg transition ${
              activeTab === 'requests'
                ? 'bg-purple-600 text-white'
                : 'bg-white text-gray-600'
            }`}
          >
            Заявки
          </button>
          <button
            onClick={() => setActiveTab('schedule')}
            className={`px-6 py-2 rounded-lg transition ${
              activeTab === 'schedule'
                ? 'bg-purple-600 text-white'
                : 'bg-white text-gray-600'
            }`}
          >
            Расписание
          </button>
          <button
            onClick={() => setActiveTab('profile')}
            className={`px-6 py-2 rounded-lg transition ${
              activeTab === 'profile'
                ? 'bg-purple-600 text-white'
                : 'bg-white text-gray-600'
            }`}
          >
            Профиль
          </button>
        </div>
        
        {activeTab === 'requests' && (
          <div className="space-y-6">
            {/* Новые заявки */}
            <div>
              <h3 className="font-semibold text-lg mb-4 text-blue-600">
                Новые заявки ({requests.new.length})
              </h3>
              {requests.new.map((req, i) => (
                <motion.div
                  key={req.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-white rounded-xl shadow-lg p-6 mb-4"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-semibold text-lg">{req.product}</h4>
                      <p className="text-gray-600">Клиент: {req.client}</p>
                      <p className="text-gray-600">Телефон: {req.phone}</p>
                      <p className="text-gray-600">Авто: {req.car}</p>
                      <p className="text-gray-600">Дата: {req.date} в {req.time}</p>
                    </div>
                    <div className="flex gap-2">
                      <button className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600">
                        Принять
                      </button>
                      <button className="bg-gray-200 px-4 py-2 rounded-lg hover:bg-gray-300">
                        Отклонить
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
            
            {/* Принятые заявки */}
            <div>
              <h3 className="font-semibold text-lg mb-4 text-yellow-600">
                Принятые заявки ({requests.accepted.length})
              </h3>
              {requests.accepted.map((req, i) => (
                <motion.div
                  key={req.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="bg-white rounded-xl shadow-lg p-6 mb-4"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-semibold text-lg">{req.product}</h4>
                      <p className="text-gray-600">Клиент: {req.client}</p>
                      <p className="text-gray-600">Телефон: {req.phone}</p>
                      <p className="text-gray-600">Авто: {req.car}</p>
                      <p className="text-gray-600">Дата: {req.date} в {req.time}</p>
                    </div>
                    <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
                      Завершить
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}
        
        {activeTab === 'schedule' && (
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-semibold mb-6">Расписание на неделю</h2>
            <div className="grid grid-cols-7 gap-4">
              {['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'].map((day, i) => (
                <div key={i} className="text-center">
                  <p className="font-medium mb-2">{day}</p>
                  <div className="space-y-2">
                    {i < 3 && (
                      <div className="bg-purple-100 p-2 rounded text-xs">
                        10:00 - DX-91
                      </div>
                    )}
                    {i === 2 && (
                      <div className="bg-purple-100 p-2 rounded text-xs">
                        14:00 - DX-4GS
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {activeTab === 'profile' && (
          <div className="bg-white rounded-2xl shadow-lg p-8 max-w-2xl">
            <h2 className="text-2xl font-semibold mb-6">Мой профиль</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Имя</label>
                <input type="text" value="Алексей Кириллов" className="w-full px-4 py-3 border rounded-xl" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Телефон</label>
                <input type="tel" value="+998 90 123 45 67" className="w-full px-4 py-3 border rounded-xl" disabled />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Опыт работы</label>
                <input type="text" value="8 лет" className="w-full px-4 py-3 border rounded-xl" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Специализация</label>
                <input type="text" value="Премиум системы, GSM модули" className="w-full px-4 py-3 border rounded-xl" />
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