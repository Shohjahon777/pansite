'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  FileText, 
  Calendar, 
  User, 
  LogOut,
  Phone,
  Car,
  Clock,
  TrendingUp,
  DollarSign,
  Star
} from 'lucide-react'
import { useTranslation } from '../../../hooks/useTranslation'
import { accountLocales } from '../accountLocales'

export default function MasterDashboard() {
  const [activeTab, setActiveTab] = useState('requests')
  const { t } = useTranslation(accountLocales)
  
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
    <div className="page-container min-h-screen bg-black">
      <div className="max-w-7xl mx-auto px-4 py-20">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-thin text-white">{t('account.master.title')}</h1>
          <button className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
            <LogOut className="w-4 h-4" />
            <span className="text-sm">{t('account.logout')}</span>
          </button>
        </div>
        
        {/* Statistics */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gray-950 border border-gray-800 p-4 text-center"
          >
            <p className="text-3xl font-thin text-white">{stats.today}</p>
            <p className="text-gray-500 text-sm">{t('account.master.stats.today')}</p>
            <p className="text-sm text-green-500 mt-1">+${stats.income.today}</p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-gray-950 border border-gray-800 p-4 text-center"
          >
            <p className="text-3xl font-thin text-white">{stats.week}</p>
            <p className="text-gray-500 text-sm">{t('account.master.stats.week')}</p>
            <p className="text-sm text-green-500 mt-1">+${stats.income.week}</p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-gray-950 border border-gray-800 p-4 text-center"
          >
            <p className="text-3xl font-thin text-white">{stats.month}</p>
            <p className="text-gray-500 text-sm">{t('account.master.stats.month')}</p>
            <p className="text-sm text-green-500 mt-1">+${stats.income.month}</p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-gray-950 border border-gray-800 p-4 text-center"
          >
            <p className="text-3xl font-thin text-white">{stats.total}</p>
            <p className="text-gray-500 text-sm">{t('account.master.stats.total')}</p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-gray-950 border border-gray-800 p-4 text-center"
          >
            <div className="flex items-center justify-center gap-1">
              <Star className="w-5 h-5 fill-white text-white" />
              <p className="text-3xl font-thin text-white">{stats.rating}</p>
            </div>
            <p className="text-gray-500 text-sm">{t('account.master.stats.rating')}</p>
          </motion.div>
        </div>
        
        {/* Tabs */}
        <div className="flex gap-4 mb-8">
          <button
            onClick={() => setActiveTab('requests')}
            className={`flex items-center gap-2 px-6 py-3 transition-all ${
              activeTab === 'requests'
                ? 'bg-white text-black'
                : 'border border-gray-800 text-gray-400 hover:text-white hover:border-gray-700'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span className="font-light">{t('account.master.tabs.requests')}</span>
          </button>
          <button
            onClick={() => setActiveTab('schedule')}
            className={`flex items-center gap-2 px-6 py-3 transition-all ${
              activeTab === 'schedule'
                ? 'bg-white text-black'
                : 'border border-gray-800 text-gray-400 hover:text-white hover:border-gray-700'
            }`}
          >
            <Calendar className="w-4 h-4" />
            <span className="font-light">{t('account.master.tabs.schedule')}</span>
          </button>
          <button
            onClick={() => setActiveTab('profile')}
            className={`flex items-center gap-2 px-6 py-3 transition-all ${
              activeTab === 'profile'
                ? 'bg-white text-black'
                : 'border border-gray-800 text-gray-400 hover:text-white hover:border-gray-700'
            }`}
          >
            <User className="w-4 h-4" />
            <span className="font-light">{t('account.master.tabs.profile')}</span>
          </button>
        </div>
        
        {activeTab === 'requests' && (
          <div className="space-y-6">
            {/* New Requests */}
            <div>
              <h3 className="font-light text-lg mb-4 text-blue-400">
                {t('account.master.newRequests')} ({requests.new.length})
              </h3>
              {requests.new.map((req, i) => (
                <motion.div
                  key={req.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-gray-950 border border-gray-800 p-6 mb-4"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-light text-lg text-white mb-2">{req.product}</h4>
                      <div className="space-y-1 text-sm">
                        <p className="text-gray-400 flex items-center gap-2">
                          <User className="w-4 h-4 text-gray-600" />
                          {t('account.master.client')}: {req.client}
                        </p>
                        <p className="text-gray-400 flex items-center gap-2">
                          <Phone className="w-4 h-4 text-gray-600" />
                          {t('account.master.phone')}: {req.phone}
                        </p>
                        <p className="text-gray-400 flex items-center gap-2">
                          <Car className="w-4 h-4 text-gray-600" />
                          {t('account.master.car')}: {req.car}
                        </p>
                        <p className="text-gray-400 flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-gray-600" />
                          {t('account.master.date')}: {req.date} в {req.time}
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button className="bg-white text-black px-4 py-2 hover:bg-gray-100 transition-colors">
                        {t('account.master.accept')}
                      </button>
                      <button className="border border-gray-700 text-gray-300 px-4 py-2 hover:bg-gray-900 transition-all">
                        {t('account.master.decline')}
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
            
            {/* Accepted Requests */}
            <div>
              <h3 className="font-light text-lg mb-4 text-yellow-400">
                {t('account.master.acceptedRequests')} ({requests.accepted.length})
              </h3>
              {requests.accepted.map((req, i) => (
                <motion.div
                  key={req.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="bg-gray-950 border border-gray-800 p-6 mb-4"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-light text-lg text-white mb-2">{req.product}</h4>
                      <div className="space-y-1 text-sm">
                        <p className="text-gray-400">{t('account.master.client')}: {req.client}</p>
                        <p className="text-gray-400">{t('account.master.phone')}: {req.phone}</p>
                        <p className="text-gray-400">{t('account.master.car')}: {req.car}</p>
                        <p className="text-gray-400">{t('account.master.date')}: {req.date} в {req.time}</p>
                      </div>
                    </div>
                    <button className="bg-green-900 text-green-400 px-4 py-2 hover:bg-green-800 transition-colors">
                      {t('account.master.complete')}
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}
        
        {activeTab === 'schedule' && (
          <div className="bg-gray-950 border border-gray-800 p-8">
            <h2 className="text-2xl font-thin mb-6 text-white">{t('account.master.weekSchedule')}</h2>
            <div className="grid grid-cols-7 gap-4">
              {['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'].map((day, i) => (
                <div key={i} className="text-center">
                  <p className="font-light mb-3 text-gray-400">{day}</p>
                  <div className="space-y-2">
                    {i < 3 && (
                      <div className="bg-gray-900 border border-gray-800 p-2 text-xs text-gray-300">
                        10:00 - DX-91
                      </div>
                    )}
                    {i === 2 && (
                      <div className="bg-gray-900 border border-gray-800 p-2 text-xs text-gray-300">
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
          <div className="bg-gray-950 border border-gray-800 p-8 max-w-2xl">
            <h2 className="text-2xl font-thin mb-6 text-white">{t('account.master.profile.title')}</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-light mb-2 text-gray-400">
                  {t('account.master.profile.name')}
                </label>
                <input 
                  type="text" 
                  value="Алексей Кириллов" 
                  className="w-full px-4 py-3 bg-black border border-gray-800 text-white focus:border-gray-700 focus:outline-none" 
                />
              </div>
              <div>
                <label className="block text-sm font-light mb-2 text-gray-400">
                  {t('account.master.profile.phone')}
                </label>
                <input 
                  type="tel" 
                  value="+998 90 123 45 67" 
                  className="w-full px-4 py-3 bg-black border border-gray-800 text-gray-500" 
                  disabled 
                />
              </div>
              <div>
                <label className="block text-sm font-light mb-2 text-gray-400">
                  {t('account.master.profile.experience')}
                </label>
                <input 
                  type="text" 
                  value="8 лет" 
                  className="w-full px-4 py-3 bg-black border border-gray-800 text-white focus:border-gray-700 focus:outline-none" 
                />
              </div>
              <div>
                <label className="block text-sm font-light mb-2 text-gray-400">
                  {t('account.master.profile.specialization')}
                </label>
                <input 
                  type="text" 
                  value="Премиум системы, GSM модули" 
                  className="w-full px-4 py-3 bg-black border border-gray-800 text-white focus:border-gray-700 focus:outline-none" 
                />
              </div>
              <button className="bg-white text-black px-8 py-3 hover:bg-gray-100 transition-colors font-medium">
                {t('account.master.profile.save')}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}