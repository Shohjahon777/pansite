'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { useParams } from 'next/navigation'

export default function ProductDetailPage() {
  const params = useParams()
  const [activeTab, setActiveTab] = useState('features')
  
  const products = {
    'dx91': {
      name: 'Pandora DX-91',
      price: 250,
      rating: 4.7,
      reviewsCount: 156,
      description: 'Надежная охранная система с диалоговым кодом и автозапуском. Идеальное соотношение цены и качества.',
      images: ['🔐', '🚗', '📱'],
      features: {
        main: [
          'Диалоговый код с индивидуальным ключом шифрования',
          'LCD брелок с обратной связью',
          'Дальность управления до 2000 метров',
          'Автозапуск по температуре, времени, напряжению',
          'Турботаймер для турбированных двигателей',
          'Защита от подбора кода и ретрансляции'
        ],
        technical: {
          'Рабочее напряжение': '9-18В',
          'Потребление в режиме охраны': '20 мА',
          'Диапазон рабочих температур': '-40°C до +85°C',
          'Частота': '868 МГц',
          'Количество охранных зон': '8',
          'Количество каналов управления': '5'
        }
      },
      compatibility: [
        'Toyota (Camry, Corolla, RAV4, Land Cruiser)',
        'Chevrolet (Malibu, Tracker, Tahoe)',
        'Kia (K5, Sportage, Sorento)',
        'Hyundai (Sonata, Tucson, Santa Fe)',
        'И более 500 других моделей'
      ],
      reviewsList: [
        { user: 'Андрей П.', rating: 5, text: 'Отличная сигнализация, работает без нареканий уже год', date: '15.05.2025' },
        { user: 'Мария К.', rating: 4, text: 'Хорошее качество, но настройка заняла время', date: '10.05.2025' }
      ]
    },
    'dx4gs': {
      name: 'Pandora DX-4GS',
      price: 350,
      rating: 4.8,
      reviewsCount: 203,
      description: 'Современная система с GSM модулем и управлением через смартфон из любой точки мира.',
      images: ['📱', '🌐', '🔐'],
      features: {
        main: [
          'Встроенный GSM/GPRS модуль',
          'Управление через мобильное приложение',
          'GPS трекинг в реальном времени',
          'Push-уведомления о событиях',
          'История поездок и событий',
          'Контроль температуры в салоне'
        ],
        technical: {
          'Рабочее напряжение': '9-18В',
          'GSM модуль': 'Встроенный',
          'GPS приемник': 'Встроенный',
          'Sim-карта': 'Nano-SIM',
          'Протоколы': 'CAN, LIN',
          'Мобильное приложение': 'iOS/Android'
        }
      },
      compatibility: [
        'Все современные автомобили с CAN-шиной',
        'Поддержка более 1000 моделей'
      ],
      reviewsList: [
        { user: 'Виктор С.', rating: 5, text: 'Управление со смартфона - это удобно!', date: '20.05.2025' }
      ]
    },
    'dxl5000': {
      name: 'Pandora DXL-5000',
      price: 550,
      rating: 4.9,
      reviewsCount: 89,
      description: 'Премиальная система с максимальным уровнем защиты и функциональности.',
      images: ['💎', '🔐', '🚗'],
      features: {
        main: [
          'Bluetooth 5.0 для умной авторизации',
          '2CAN интерфейс для полной интеграции',
          'Бесключевой обход иммобилайзера',
          'Распознавание владельца по метке',
          'Slave режим работы',
          'Интеграция со штатными системами'
        ],
        technical: {
          'Рабочее напряжение': '9-18В',
          'Bluetooth': '5.0',
          'Интерфейсы': '2xCAN, LIN',
          'Дальность метки': 'до 10м',
          'Количество меток': 'до 8',
          'Шифрование': 'AES-128'
        }
      },
      compatibility: [
        'Премиум автомобили всех марок',
        '100% совместимость с современными авто'
      ],
      reviewsList: [
        { user: 'Павел М.', rating: 5, text: 'Премиум во всем! Метка очень удобна', date: '22.05.2025' }
      ]
    }
  }
  
  const product = products[params.id] || products['dx91']
  
  return (
    <div className="page-container min-h-screen bg-gradient-to-br from-black to-gray-900">
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Хлебные крошки */}
        <div className="flex items-center space-x-2 text-sm text-gray-400 mb-6">
          <Link href="/" className="hover:text-purple-400">Главная</Link>
          <span>/</span>
          <Link href="/products" className="hover:text-purple-400">Продукты</Link>
          <span>/</span>
          <span className="text-gray-300">{product.name}</span>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Галерея */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <div className="bg-gradient-to-br from-purple-600 to-pink-600 rounded-3xl p-12 text-center">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="text-9xl text-white/20 mb-6"
              >
                {product.images[0]}
              </motion.div>
            </div>
            <div className="flex gap-4 mt-4">
              {product.images.map((img, i) => (
                <div key={i} className="bg-gray-800 rounded-xl p-4 text-4xl border border-gray-700">
                  {img}
                </div>
              ))}
            </div>
          </motion.div>
          
          {/* Информация */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <h1 className="text-4xl font-bold mb-4 text-white">{product.name}</h1>
            <div className="flex items-center space-x-4 mb-6">
              <div className="flex text-yellow-400">
                {'★'.repeat(Math.floor(product.rating))}
              </div>
              <span className="text-gray-300">{product.rating} ({product.reviewsCount} отзывов)</span>
            </div>
            
            <p className="text-gray-400 mb-8">{product.description}</p>
            
            <div className="bg-gray-900 rounded-2xl p-6 mb-6 border border-gray-800">
              <div className="text-4xl font-bold text-purple-400 mb-2">${product.price}</div>
              <p className="text-gray-500 mb-4">или от ${Math.round(product.price/12)}/мес в рассрочку</p>
              <button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 rounded-xl mb-2">
                Заказать установку
              </button>
              <Link href="/service" className="block w-full text-center border-2 border-purple-600 text-purple-400 py-3 rounded-xl">
                Найти мастера
              </Link>
            </div>
            
            <div className="bg-purple-900/20 rounded-2xl p-6 border border-purple-800">
              <h3 className="font-semibold mb-3 text-white">В комплекте:</h3>
              <ul className="space-y-2 text-sm text-gray-300">
                <li>• Центральный блок</li>
                <li>• LCD брелок управления</li>
                <li>• Дополнительный брелок</li>
                <li>• Датчики и антенна</li>
                <li>• Инструкция и гарантийный талон</li>
              </ul>
            </div>
          </motion.div>
        </div>
        
        {/* Табы с информацией */}
        <div className="mt-12">
          <div className="flex space-x-8 border-b border-gray-800">
            {['features', 'compatibility', 'reviews'].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`pb-4 px-2 border-b-2 transition ${
                  activeTab === tab
                    ? 'border-purple-600 text-purple-400'
                    : 'border-transparent text-gray-500'
                }`}
              >
                {tab === 'features' && 'Характеристики'}
                {tab === 'compatibility' && 'Совместимость'}
                {tab === 'reviews' && `Отзывы (${product.reviewsList.length})`}
              </button>
            ))}
          </div>
          
          <div className="py-8">
            {activeTab === 'features' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="font-semibold text-lg mb-4 text-white">Основные функции</h3>
                  <ul className="space-y-3">
                    {product.features.main.map((feature, i) => (
                      <li key={i} className="flex items-start text-gray-300">
                        <span className="text-purple-400 mr-2">✓</span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-4 text-white">Технические характеристики</h3>
                  <dl className="space-y-3">
                    {Object.entries(product.features.technical).map(([key, value]) => (
                      <div key={key} className="flex justify-between">
                        <dt className="text-gray-500">{key}:</dt>
                        <dd className="font-medium text-gray-300">{value}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              </div>
            )}
            
            {activeTab === 'compatibility' && (
              <div>
                <h3 className="font-semibold text-lg mb-4 text-white">Поддерживаемые автомобили</h3>
                <ul className="space-y-2">
                  {product.compatibility.map((item, i) => (
                    <li key={i} className="flex items-center text-gray-300">
                      <span className="text-green-400 mr-2">✓</span>
                      {item}
                    </li>
                  ))}
                </ul>
                <div className="mt-6 p-4 bg-blue-900/20 rounded-xl border border-blue-800">
                  <p className="text-sm text-gray-300">
                    Не нашли свой автомобиль? Позвоните нам, и мы проверим совместимость!
                  </p>
                  <a href="tel:+998901234567" className="text-purple-400 font-medium">
                    +998 90 123 45 67
                  </a>
                </div>
              </div>
            )}
            
            {activeTab === 'reviews' && (
              <div className="space-y-6">
                {product.reviewsList.map((review, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="bg-gray-900 rounded-2xl p-6 border border-gray-800"
                  >
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h4 className="font-semibold text-white">{review.user}</h4>
                        <div className="flex text-yellow-400 text-sm">
                          {'★'.repeat(review.rating)}
                        </div>
                      </div>
                      <span className="text-sm text-gray-500">{review.date}</span>
                    </div>
                    <p className="text-gray-400">{review.text}</p>
                  </motion.div>
                ))}
                <button className="w-full py-3 border-2 border-gray-700 rounded-xl text-gray-500">
                  Показать все отзывы
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}