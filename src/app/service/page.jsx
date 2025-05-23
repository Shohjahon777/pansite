'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function ServicePage() {
  const [activeTab, setActiveTab] = useState('masters')
  const [selectedRegion, setSelectedRegion] = useState('all')
  const [selectedMaster, setSelectedMaster] = useState(null)
  const [showBooking, setShowBooking] = useState(false)
  
  const masters = [
    {
      id: 1,
      name: 'Алексей Кириллов',
      avatar: '👨‍🔧',
      rating: 4.8,
      reviews: 156,
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
      id: 2,
      name: 'Сергей Михайлов',
      avatar: '👨‍💼',
      rating: 4.9,
      reviews: 142,
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
      reviews: 234,
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
    <div className="page-container min-h-screen bg-gradient-to-br from-gray-50 to-purple-50">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl font-bold text-center mb-4"
        >
          Установка и обслуживание
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center text-gray-600 mb-8"
        >
          Найдите сертифицированного мастера рядом с вами
        </motion.p>
        
        {/* Табы */}
        <div className="flex justify-center mb-8">
          <div className="bg-white rounded-full shadow-lg p-1 flex">
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
                    : 'text-gray-600 hover:text-purple-600'
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
              className="px-6 py-2 bg-white rounded-full shadow-lg"
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
                className="bg-white rounded-3xl shadow-xl overflow-hidden group"
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
                      <h3 className="font-bold text-lg">{master.name}</h3>
                      <p className="text-gray-600">{master.region}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl text-yellow-400">★ {master.rating}</div>
                      <p className="text-sm text-gray-500">{master.reviews} отзывов</p>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {master.badges.map((badge, j) => (
                      <span key={j} className="text-xs bg-purple-100 text-purple-700 px-3 py-1 rounded-full">
                        {badge}
                      </span>
                    ))}
                  </div>
                  
                  <div className="space-y-2 mb-4 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Опыт:</span>
                      <span className="font-medium">{master.experience}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Установок:</span>
                      <span className="font-medium">{master.installations}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Ответ:</span>
                      <span className="font-medium text-green-600">{master.responseTime}</span>
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <p className="text-sm text-gray-600 mb-1">Специализация:</p>
                    <div className="flex flex-wrap gap-1">
                      {master.specialization.map((spec, j) => (
                        <span key={j} className="text-xs bg-gray-100 px-2 py-1 rounded">
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
                    <button
                      onClick={() => setSelectedMaster(master)}
                      className="w-full border border-purple-600 text-purple-600 py-2 rounded-xl"
                    >
                      Подробнее
                    </button>
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
                className="bg-white rounded-3xl shadow-xl p-6"
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="font-bold text-xl">{dealer.name}</h3>
                    <p className="text-gray-600">{dealer.address}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-yellow-400">★ {dealer.rating}</div>
                    <p className="text-sm text-gray-500">{dealer.reviews} отзывов</p>
                  </div>
                </div>
                
                <div className="space-y-2 mb-4 text-sm">
                  <p><span className="font-medium">Телефон:</span> {dealer.phone}</p>
                  <p><span className="font-medium">Время работы:</span> {dealer.workHours}</p>
                </div>
                
                <div className="mb-4">
                  <p className="text-sm font-medium mb-2">Услуги:</p>
                  <div className="flex flex-wrap gap-1">
                    {dealer.services.map((service, j) => (
                      <span key={j} className="text-xs bg-gray-100 px-2 py-1 rounded">
                        {service}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="flex gap-2 mb-4">
                  {dealer.parking && <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">🚗 Парковка</span>}
                  {dealer.wifi && <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">📶 Wi-Fi</span>}
                  {dealer.lounge && <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded">☕ Зона ожидания</span>}
                </div>
                
                <div className="flex gap-2">
                  <button className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 text-white py-2 rounded-xl">
                    Записаться
                  </button>
                  <a href={`tel:${dealer.phone}`} className="px-4 py-2 bg-gray-100 rounded-xl">
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
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
            onClick={() => setShowBooking(false)}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              className="bg-white rounded-3xl p-8 max-w-md w-full"
              onClick={e => e.stopPropagation()}
            >
              <h2 className="text-2xl font-bold mb-4">Запись к мастеру</h2>
              <p className="text-gray-600 mb-6">Мастер: {selectedMaster.name}</p>
              
              <form className="space-y-4">
                <input type="text" placeholder="Ваше имя" className="w-full px-4 py-3 border rounded-xl" />
                <input type="tel" placeholder="Телефон" className="w-full px-4 py-3 border rounded-xl" />
                <input type="date" className="w-full px-4 py-3 border rounded-xl" />
                <select className="w-full px-4 py-3 border rounded-xl">
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