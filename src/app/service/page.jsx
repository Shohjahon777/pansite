'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'

export default function ServicePage() {
  const [activeTab, setActiveTab] = useState('masters')
  const [selectedRegion, setSelectedRegion] = useState('all')
  const [selectedMaster, setSelectedMaster] = useState(null)
  const [showBooking, setShowBooking] = useState(false)
  
  const masters = [
    {
      id: 'aleksey-kirillov',
      name: 'Алексей Кириллов',
      avatar: '👨‍🔧',
      rating: 4.8,
      reviewsCount: 156,
      installations: 483,
      region: 'Ташкент',
      experience: '8 лет',
      specialization: ['Премиум системы', 'GSM модули'],
      responseTime: '30 мин',
      badges: ['⭐ Топ мастер', '⚡ Быстрая установка'],
      schedule: ['Пн-Пт: 9:00-19:00', 'Сб: 10:00-17:00'],
      phone: '+998 90 123 45 67'
    },
    {
      id: 'sergey-mihaylov',
      name: 'Сергей Михайлов',
      avatar: '👨‍💼',
      rating: 4.9,
      reviewsCount: 142,
      installations: 392,
      region: 'Ташкент',
      experience: '6 лет',
      specialization: ['Все типы систем'],
      responseTime: '15 мин',
      badges: ['🏆 Сертифицированный эксперт'],
      schedule: ['Пн-Сб: 8:00-20:00'],
      phone: '+998 90 987 65 43'
    }
  ]
  
  const dealers = [
    {
      id: 1,
      name: 'АвтоПро Центр',
      rating: 4.8,
      reviewsCount: 234,
      address: 'Ташкент, ул. Амира Темура, 12',
      phone: '+998 71 123 45 67',
      workHours: 'Пн-Сб: 9:00-19:00',
      services: ['Установка', 'Гарантийное обслуживание', 'Диагностика'],
      parking: true,
      wifi: true,
      lounge: true
    }
  ]
  
  const filteredMasters = selectedRegion === 'all' 
    ? masters 
    : masters.filter(m => m.region === selectedRegion)
  
  useEffect(() => {
    if (activeTab === 'map') {
      const script = document.createElement('script')
      script.src = 'https://api-maps.yandex.ru/2.1/?apikey=YOUR_API_KEY&lang=ru_RU'
      script.async = true
      script.onload = () => {
        window.ymaps.ready(() => {
          const map = new window.ymaps.Map('service-map', {
            center: [41.311081, 69.240562],
            zoom: 12
          })
          
          masters.forEach(master => {
            const placemark = new window.ymaps.Placemark(
              [41.311081 + Math.random() * 0.05, 69.240562 + Math.random() * 0.05],
              {
                hintContent: master.name,
                balloonContent: `<strong>${master.name}</strong><br/>⭐ ${master.rating}<br/>${master.phone}`
              }
            )
            map.geoObjects.add(placemark)
          })
        })
      }
      document.body.appendChild(script)
    }
  }, [activeTab])
  
  return (
    <div className="page-container min-h-screen bg-gradient-to-br from-black to-gray-900">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl font-bold text-center mb-4 text-white"
        >
          Установка и обслуживание
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center text-gray-400 mb-8"
        >
          Найдите сертифицированного мастера рядом с вами
        </motion.p>
        
        {/* Табы */}
        <div className="flex justify-center mb-8">
          <div className="bg-gray-900 rounded-full shadow-lg p-1 flex">
            {[
              { value: 'masters', label: 'Мастера', icon: '👨‍🔧' },
              { value: 'dealers', label: 'Дилеры', icon: '🏢' },
              { value: 'map', label: 'На карте', icon: '🗺️' }
            ].map(tab => (
              <button
                key={tab.value}
                onClick={() => setActiveTab(tab.value)}
                className={`px-6 py-2 rounded-full transition flex items-center ${
                  activeTab === tab.value
                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white'
                    : 'text-gray-400 hover:text-purple-400'
                }`}
              >
                <span className="mr-2">{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </div>
        </div>
        
        {/* Фильтр региона */}
        {activeTab !== 'map' && (
          <div className="flex justify-center mb-8">
            <select
              value={selectedRegion}
              onChange={e => setSelectedRegion(e.target.value)}
              className="px-6 py-2 bg-gray-900 rounded-full shadow-lg border border-gray-800 text-gray-300"
            >
              <option value="all">Все регионы</option>
              <option value="Ташкент">Ташкент</option>
              <option value="Самарканд">Самарканд</option>
              <option value="Бухара">Бухара</option>
            </select>
          </div>
        )}
        
        {/* Список мастеров */}
        {activeTab === 'masters' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredMasters.map((master, i) => (
              <motion.div
                key={master.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -5 }}
                className="bg-gray-900 rounded-3xl shadow-xl overflow-hidden group border border-gray-800"
              >
                <div className="p-6">
                  <div className="flex items-center mb-4">
                    <motion.div
                      className="text-5xl mr-4"
                      whileGroupHover={{ rotate: 10 }}
                    >
                      {master.avatar}
                    </motion.div>
                    <div className="flex-1">
                      <Link href={`/service/${master.id}`}>
                        <h3 className="font-bold text-lg hover:text-purple-400 cursor-pointer transition text-white">
                          {master.name}
                        </h3>
                      </Link>
                      <p className="text-gray-400">{master.region}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl text-yellow-400">★ {master.rating}</div>
                      <p className="text-sm text-gray-500">{master.reviewsCount} отзывов</p>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {master.badges.map((badge, j) => (
                      <span key={j} className="text-xs bg-purple-900/20 text-purple-400 px-3 py-1 rounded-full border border-purple-800">
                        {badge}
                      </span>
                    ))}
                  </div>
                  
                  <div className="space-y-2 mb-4 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-500">Опыт:</span>
                      <span className="font-medium text-gray-300">{master.experience}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Установок:</span>
                      <span className="font-medium text-gray-300">{master.installations}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Ответ:</span>
                      <span className="font-medium text-green-400">{master.responseTime}</span>
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <p className="text-sm text-gray-500 mb-1">Специализация:</p>
                    <div className="flex flex-wrap gap-1">
                      {master.specialization.map((spec, j) => (
                        <span key={j} className="text-xs bg-gray-800 px-2 py-1 rounded text-gray-400">
                          {spec}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <button
                      onClick={() => {
                        setSelectedMaster(master)
                        setShowBooking(true)
                      }}
                      className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-2 rounded-xl"
                    >
                      Записаться
                    </button>
                    <Link
                      href={`/service/${master.id}`}
                      className="block w-full text-center border border-purple-600 text-purple-400 py-2 rounded-xl hover:bg-purple-900/20 transition"
                    >
                      Подробнее
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
        
        {/* Список дилеров */}
        {activeTab === 'dealers' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {dealers.map((dealer, i) => (
              <motion.div
                key={dealer.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="bg-gray-900 rounded-3xl shadow-xl p-6 border border-gray-800"
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="font-bold text-xl text-white">{dealer.name}</h3>
                    <p className="text-gray-400">{dealer.address}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-yellow-400">★ {dealer.rating}</div>
                    <p className="text-sm text-gray-500">{dealer.reviewsCount} отзывов</p>
                  </div>
                </div>
                
                <div className="space-y-2 mb-4 text-sm">
                  <p className="text-gray-300"><span className="font-medium text-gray-400">Телефон:</span> {dealer.phone}</p>
                  <p className="text-gray-300"><span className="font-medium text-gray-400">Время работы:</span> {dealer.workHours}</p>
                </div>
                
                <div className="mb-4">
                  <p className="text-sm font-medium mb-2 text-gray-400">Услуги:</p>
                  <div className="flex flex-wrap gap-1">
                    {dealer.services.map((service, j) => (
                      <span key={j} className="text-xs bg-gray-800 px-2 py-1 rounded text-gray-400">
                        {service}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="flex gap-2 mb-4">
                  {dealer.parking && <span className="text-xs bg-green-900/20 text-green-400 px-2 py-1 rounded border border-green-800">🚗 Парковка</span>}
                  {dealer.wifi && <span className="text-xs bg-blue-900/20 text-blue-400 px-2 py-1 rounded border border-blue-800">📶 Wi-Fi</span>}
                  {dealer.lounge && <span className="text-xs bg-purple-900/20 text-purple-400 px-2 py-1 rounded border border-purple-800">☕ Зона ожидания</span>}
                </div>
                
                <div className="flex gap-2">
                  <button className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 text-white py-2 rounded-xl">
                    Записаться
                  </button>
                  <a href={`tel:${dealer.phone}`} className="px-4 py-2 bg-gray-800 rounded-xl text-gray-300">
                    📞
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        )}
        
        {/* Карта */}
        {activeTab === 'map' && (
          <div id="service-map" className="w-full h-[600px] rounded-3xl shadow-2xl overflow-hidden"></div>
        )}
      </div>
      
      {/* Модалка записи */}
      <AnimatePresence>
        {showBooking && selectedMaster && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4 z-50"
            onClick={() => setShowBooking(false)}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              className="bg-gray-900 rounded-3xl p-8 max-w-md w-full border border-gray-800"
              onClick={e => e.stopPropagation()}
            >
              <h2 className="text-2xl font-bold mb-4 text-white">Запись к мастеру</h2>
              <p className="text-gray-400 mb-6">Мастер: {selectedMaster.name}</p>
              
              <form className="space-y-4">
                <input type="text" placeholder="Ваше имя" className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white placeholder-gray-500" />
                <input type="tel" placeholder="Телефон" className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white placeholder-gray-500" />
                <input type="date" className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white" />
                <select className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white">
                  <option>9:00 - 11:00</option>
                  <option>11:00 - 13:00</option>
                  <option>14:00 - 16:00</option>
                  <option>16:00 - 18:00</option>
                </select>
                <button type="submit" className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 rounded-xl">
                  Подтвердить запись
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}