// src/app/service/[id]/page.jsx
'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { useParams, useRouter } from 'next/navigation'

export default function MasterDetailPage() {
  const params = useParams()
  const router = useRouter()
  const [master, setMaster] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [activeTab, setActiveTab] = useState('about')
  const [showBooking, setShowBooking] = useState(false)
  
  useEffect(() => {
    const fetchMaster = async () => {
      try {
        setLoading(true)
        
        // В реальном приложении это был бы API запрос:
        // const response = await fetch(`/api/masters/${params.id}`)
        // if (!response.ok) throw new Error('Master not found')
        // const data = await response.json()
        // setMaster(data)
        
        // Временная имитация API запроса
        await new Promise(resolve => setTimeout(resolve, 500))
        
        // Имитация ответа от API
        const mastersDB = {
          'aleksey-kirillov': {
            id: 'aleksey-kirillov',
            name: 'Алексей Кириллов',
            avatar: '👨‍🔧',
            rating: 4.8,
            reviewsCount: 156,
            installations: 483,
            region: 'Ташкент',
            experience: '8 лет',
            specialization: ['Премиум системы', 'GSM модули', 'Сложные установки'],
            responseTime: '30 мин',
            badges: ['⭐ Топ мастер', '⚡ Быстрая установка', '🏆 Сертифицированный эксперт'],
            schedule: {
              'Пн-Пт': '9:00-19:00',
              'Сб': '10:00-17:00',
              'Вс': 'Выходной'
            },
            phone: '+998 90 123 45 67',
            about: 'Профессиональный установщик с большим опытом работы. Специализируюсь на премиальных системах Pandora.',
            services: [
              { name: 'Установка Pandora DX-91', price: 50, time: '2 часа' },
              { name: 'Установка Pandora DX-4GS', price: 70, time: '2.5 часа' },
              { name: 'Установка Pandora DXL-5000', price: 100, time: '3 часа' }
            ],
              gallery: ['🔧', '🚙', '📡', '⚡'],
            stats: {
              satisfaction: 98,
              onTime: 95,
              warranty: 100
            },
            reviews: [
              {
                id: 1,
                user: 'Андрей П.',
                rating: 5,
                date: '20.05.2025',
                text: 'Отличный мастер! Установил сигнализацию быстро и качественно.',
                product: 'Pandora DX-91',
                verified: true
              }
            ]
          },
          'sergey-mihaylov': {
            id: 'sergey-mihaylov',
            name: 'Сергей Михайлов',
            avatar: '👨‍💼',
            rating: 4.9,
            reviewsCount: 142,
            installations: 392,
            region: 'Ташкент',
            experience: '6 лет',
            specialization: ['Все типы систем', 'Экспресс-установка'],
            responseTime: '15 мин',
            badges: ['🏆 Сертифицированный эксперт', '⭐ Высокий рейтинг'],
            schedule: {
              'Пн-Сб': '8:00-20:00',
              'Вс': '10:00-18:00'
            },
            phone: '+998 90 987 65 43',
            about: 'Устанавливаю все типы сигнализаций Pandora. Работаю быстро и качественно.',
            services: [
              { name: 'Установка Pandora DX-91', price: 45, time: '1.5 часа' },
              { name: 'Установка Pandora DX-4GS', price: 65, time: '2 часа' }
            ],
              gallery: ['🔧', '🚙', '📡', '⚡'],
            stats: {
              satisfaction: 99,
              onTime: 98,
              warranty: 100
            },
            reviews: [
              {
                id: 3,
                user: 'Виктор К.',
                rating: 5,
                date: '22.05.2025',
                text: 'Мастер знает свое дело! Рекомендую всем.',
                product: 'Pandora DXL-5000',
                verified: true
              }
            ]
          }
        }
        
        const masterData = mastersDB[params.id]
        
        if (!masterData) {
          throw new Error('Мастер не найден')
        }
        
        setMaster(masterData)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }
    
    fetchMaster()
  }, [params.id])
  
  useEffect(() => {
    if (activeTab === 'location' && master) {
      const script = document.createElement('script')
      script.src = 'https://api-maps.yandex.ru/2.1/?apikey=YOUR_API_KEY&lang=ru_RU'
      script.async = true
      script.onload = () => {
        window.ymaps.ready(() => {
          const map = new window.ymaps.Map('master-map', {
            center: [41.311081, 69.240562],
            zoom: 14
          })
          
          const placemark = new window.ymaps.Placemark(
            [41.311081, 69.240562],
            {
              hintContent: master.name,
              balloonContent: `<strong>${master.name}</strong><br/>📱 ${master.phone}`
            }
          )
          map.geoObjects.add(placemark)
        })
      }
      document.body.appendChild(script)
    }
  }, [activeTab, master])
  
  if (loading) {
    return (
      <div className="page-container min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin text-6xl mb-4">⚙️</div>
          <p className="text-gray-600">Загрузка данных мастера...</p>
        </div>
      </div>
    )
  }
  
  if (error) {
    return (
      <div className="page-container min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Мастер не найден</h1>
          <p className="text-gray-600 mb-6">{error}</p>
          <Link href="/service" className="bg-purple-600 text-white px-6 py-3 rounded-xl">
            Все мастера
          </Link>
        </div>
      </div>
    )
  }
  
  return (
    <div className="page-container min-h-screen bg-gradient-to-br from-gray-50 to-purple-50">
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Хлебные крошки */}
        <div className="flex items-center space-x-2 text-sm text-gray-600 mb-6">
          <Link href="/" className="hover:text-purple-600">Главная</Link>
          <span>/</span>
          <Link href="/service" className="hover:text-purple-600">Мастера</Link>
          <span>/</span>
          <span className="text-gray-900">{master.name}</span>
        </div>
        
        {/* Основная информация */}
        <div className="bg-white rounded-3xl shadow-xl p-8 mb-8">
          <div className="flex flex-col md:flex-row gap-8">
            <div className="flex-1">
              <div className="flex items-start gap-6">
                <motion.div
                  animate={{ rotate: [0, 10, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="text-8xl"
                >
                  {master.avatar}
                </motion.div>
                <div className="flex-1">
                  <h1 className="text-3xl font-bold mb-2">{master.name}</h1>
                  <div className="flex items-center gap-4 mb-4">
                    <div className="flex items-center">
                      <span className="text-2xl text-yellow-400 mr-1">★</span>
                      <span className="font-semibold">{master.rating}</span>
                      <span className="text-gray-500 ml-1">({master.reviewsCount} отзывов)</span>
                    </div>
                    <span className="text-gray-400">•</span>
                    <span className="text-gray-600">{master.region}</span>
                  </div>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {master.badges.map((badge, i) => (
                      <span key={i} className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm">
                        {badge}
                      </span>
                    ))}
                  </div>
                  <p className="text-gray-600 mb-6">{master.about}</p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">{master.installations}</div>
                  <div className="text-sm text-gray-600">Установок</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">{master.experience}</div>
                  <div className="text-sm text-gray-600">Опыт работы</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">{master.responseTime}</div>
                  <div className="text-sm text-gray-600">Время ответа</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">{master.stats.satisfaction}%</div>
                  <div className="text-sm text-gray-600">Довольны</div>
                </div>
              </div>
            </div>
            
            <div className="md:w-80">
              <div className="bg-purple-50 rounded-2xl p-6">
                <h3 className="font-semibold mb-4">Контакты</h3>
                <a href={`tel:${master.phone}`} className="flex items-center gap-3 text-purple-600 font-semibold mb-4">
                  <span className="text-2xl">📱</span>
                  {master.phone}
                </a>
                <button
                  onClick={() => setShowBooking(true)}
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 rounded-xl mb-3"
                >
                  Записаться к мастеру
                </button>
                <Link href="/service" className="block w-full text-center border-2 border-purple-600 text-purple-600 py-3 rounded-xl">
                  Все мастера
                </Link>
              </div>
              
              <div className="mt-4 bg-gray-50 rounded-2xl p-6">
                <h3 className="font-semibold mb-3">График работы</h3>
                {Object.entries(master.schedule).map(([day, time]) => (
                  <div key={day} className="flex justify-between text-sm mb-2">
                    <span className="text-gray-600">{day}:</span>
                    <span className="font-medium">{time}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        
        {/* Табы */}
        <div className="flex gap-2 mb-6 overflow-x-auto">
          {['about', 'services', 'reviews', 'gallery', 'location'].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-2 rounded-full whitespace-nowrap transition ${
                activeTab === tab
                  ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white'
                  : 'bg-white text-gray-600'
              }`}
            >
              {tab === 'about' && 'О мастере'}
              {tab === 'services' && 'Услуги и цены'}
              {tab === 'reviews' && `Отзывы (${master.reviews.length})`}
              {tab === 'gallery' && 'Работы'}
              {tab === 'location' && 'Расположение'}
            </button>
          ))}
        </div>
        
        {/* Контент табов */}
        {activeTab === 'about' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-2xl p-6">
              <h3 className="font-semibold text-lg mb-4">Специализация</h3>
              <div className="space-y-2">
                {master.specialization.map((spec, i) => (
                  <div key={i} className="flex items-center">
                    <span className="text-purple-600 mr-2">✓</span>
                    {spec}
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-white rounded-2xl p-6">
              <h3 className="font-semibold text-lg mb-4">Показатели работы</h3>
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm text-gray-600">Удовлетворенность клиентов</span>
                    <span className="text-sm font-medium">{master.stats.satisfaction}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-green-500 h-full rounded-full" style={{ width: `${master.stats.satisfaction}%` }} />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm text-gray-600">Пунктуальность</span>
                    <span className="text-sm font-medium">{master.stats.onTime}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-500 h-full rounded-full" style={{ width: `${master.stats.onTime}%` }} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {activeTab === 'services' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {master.services.map((service, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="bg-white rounded-2xl p-6"
              >
                <h4 className="font-semibold mb-2">{service.name}</h4>
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-2xl font-bold text-purple-600">${service.price}</p>
                    <p className="text-sm text-gray-600">Время: {service.time}</p>
                  </div>
                  <button
                    onClick={() => setShowBooking(true)}
                    className="bg-purple-100 text-purple-600 px-4 py-2 rounded-lg hover:bg-purple-200"
                  >
                    Записаться
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
        
        {activeTab === 'reviews' && (
          <div className="space-y-4">
            {master.reviews.map((review, i) => (
              <motion.div
                key={review.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="bg-white rounded-2xl p-6"
              >
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-semibold">{review.user}</h4>
                      {review.verified && (
                        <span className="text-green-600 text-sm">✓ Проверено</span>
                      )}
                    </div>
                    <div className="flex text-yellow-400">
                      {'★'.repeat(review.rating)}
                    </div>
                  </div>
                  <span className="text-sm text-gray-500">{review.date}</span>
                </div>
                <p className="text-gray-700 mb-2">{review.text}</p>
                {review.product && (
                  <span className="text-sm text-gray-600">Установлена: {review.product}</span>
                )}
              </motion.div>
            ))}
            <Link href="/reviews" className="block w-full text-center py-3 border-2 border-gray-300 rounded-xl text-gray-600">
              Все отзывы о мастере
            </Link>
          </div>
        )}
        
        {activeTab === 'gallery' && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {master.gallery.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.1 }}
                className="bg-white rounded-2xl p-8 text-center"
              >
                <div className="text-6xl mb-2">{item}</div>
                <p className="text-sm text-gray-600">Работа #{i + 1}</p>
              </motion.div>
            ))}
          </div>
        )}
        
        {activeTab === 'location' && (
          <div className="bg-white rounded-2xl p-6">
            <div id="master-map" className="w-full h-[400px] rounded-xl mb-4"></div>
            <p className="text-gray-600">Мастер выезжает по всему городу {master.region}</p>
          </div>
        )}
      </div>
      
      {/* Модалка записи */}
      {showBooking && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
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
            <p className="text-gray-600 mb-6">Мастер: {master.name}</p>
            
            <form className="space-y-4">
              <input type="text" placeholder="Ваше имя" className="w-full px-4 py-3 border rounded-xl" />
              <input type="tel" placeholder="Телефон" className="w-full px-4 py-3 border rounded-xl" />
              <select className="w-full px-4 py-3 border rounded-xl">
                <option>Выберите услугу</option>
                {master.services.map((s, i) => (
                  <option key={i}>{s.name} - ${s.price}</option>
                ))}
              </select>
              <input type="date" className="w-full px-4 py-3 border rounded-xl" />
              <button type="submit" className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 rounded-xl">
                Подтвердить запись
              </button>
            </form>
          </motion.div>
        </motion.div>
      )}
    </div>
  )
}