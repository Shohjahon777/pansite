'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'

export default function HomePage() {
  const [currentSlide, setCurrentSlide] = useState(0)

  const slides = [
    {
      title: 'Pandora DXL-5000',
      subtitle: 'Премиальная защита',
      description: 'Bluetooth 5.0, умная авторизация, интеграция с CAN',
      price: 'от $550',
      image: '🔐',
      gradient: 'from-purple-600 to-pink-600'
    },
    {
      title: 'Pandora DX-4GS',
      subtitle: 'Управление со смартфона',
      description: 'GSM модуль, GPS трекинг, мобильное приложение',
      price: 'от $350',
      image: '📱',
      gradient: 'from-blue-600 to-purple-600'
    },
    {
      title: 'Установка за 2 часа',
      subtitle: '50+ мастеров по всей стране',
      description: 'Официальная гарантия 2 года, сертифицированные специалисты',
      price: 'Бесплатная диагностика',
      image: '👨‍🔧',
      gradient: 'from-green-600 to-blue-600'
    }
  ]

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length)
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)

  const advantages = [
    { icon: '🛡️', title: 'Диалоговый код', desc: 'Защита от перехвата сигнала' },
    { icon: '📱', title: 'Управление 24/7', desc: 'Из любой точки мира' },
    { icon: '🌡️', title: 'Автозапуск', desc: 'По температуре и времени' },
    { icon: '🔋', title: 'Автономность', desc: 'До 60 дней без подзарядки' },
    { icon: '🚨', title: 'Мгновенные уведомления', desc: 'SMS и push-уведомления' },
    { icon: '🏆', title: 'Гарантия 2 года', desc: 'Официальное обслуживание' }
  ]

  const quickActions = [
    {
      icon: '📦',
      title: 'Каталог',
      desc: '3 линейки охранных систем',
      href: '/products',
      color: 'from-purple-500 to-pink-500'
    },
    {
      icon: '🔍',
      title: 'Найти мастера',
      desc: 'Рядом с вами',
      href: '/service',
      color: 'from-blue-500 to-purple-500'
    },
    {
      icon: '✅',
      title: 'Проверить гарантию',
      desc: 'По серийному номеру',
      href: '/account',
      color: 'from-green-500 to-blue-500'
    }
  ]

  useEffect(() => {
    const script = document.createElement('script')
    script.src = 'https://api-maps.yandex.ru/2.1/?apikey=YOUR_API_KEY&lang=ru_RU'
    script.async = true
    script.onload = () => {
      window.ymaps.ready(() => {
        const map = new window.ymaps.Map('map', {
          center: [41.311081, 69.240562], // Ташкент
          zoom: 12,
          controls: ['zoomControl', 'fullscreenControl']
        })

        // Добавляем метки
        const points = [
          { coords: [41.311081, 69.240562], name: 'АвтоПро Центр', type: 'dealer' },
          { coords: [41.320000, 69.250000], name: 'Алексей К.', type: 'master' },
          { coords: [41.300000, 69.230000], name: 'ПрофиТех', type: 'dealer' },
        ]

        points.forEach(point => {
          const placemark = new window.ymaps.Placemark(point.coords, {
            hintContent: point.name,
            balloonContent: `<strong>${point.name}</strong><br/>${point.type === 'dealer' ? 'Дилерский центр' : 'Сертифицированный мастер'}`
          }, {
            preset: point.type === 'dealer' ? 'islands#redIcon' : 'islands#blueIcon'
          })
          map.geoObjects.add(placemark)
        })
      })
    }
    document.body.appendChild(script)

    return () => {
      if (script.parentNode) {
        script.parentNode.removeChild(script)
      }
    }
  }, [])

  return (
    <div>
      {/* Промо-слайдер */}
      <section className="relative h-screen bg-black overflow-hidden">
        <div className={`absolute inset-0 bg-gradient-to-br ${slides[currentSlide].gradient} transition-all duration-700`}>
          <div className="h-full flex items-center justify-center">
            <div className="max-w-7xl mx-auto px-4 text-center text-white">
              <motion.div
                key={currentSlide}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="text-8xl mb-6"
              >
                {slides[currentSlide].image}
              </motion.div>
              <motion.h1
                key={`title-${currentSlide}`}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-5xl md:text-7xl font-bold mb-4"
              >
                {slides[currentSlide].title}
              </motion.h1>
              <motion.p
                key={`subtitle-${currentSlide}`}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-2xl mb-2"
              >
                {slides[currentSlide].subtitle}
              </motion.p>
              <motion.p
                key={`desc-${currentSlide}`}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="text-xl opacity-90 mb-6"
              >
                {slides[currentSlide].description}
              </motion.p>
              <motion.div
                key={`price-${currentSlide}`}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="text-3xl font-bold mb-8"
              >
                {slides[currentSlide].price}
              </motion.div>
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                <Link href="/products" className="bg-white text-gray-900 px-8 py-4 rounded-full font-semibold text-lg hover:shadow-2xl transition inline-block">
                  Узнать подробнее
                </Link>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Кнопки навигации */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition"
        >
          ←
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition"
        >
          →
        </button>

        {/* Индикаторы */}
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`h-3 rounded-full transition-all duration-300 ${currentSlide === index ? 'bg-white w-8' : 'bg-white/50 w-3'
                }`}
            />
          ))}
        </div>
      </section>

      {/* Преимущества */}
      <section className="py-20 bg-gray-950">
        <div className="max-w-7xl mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-4xl font-bold text-center mb-4 text-white"
          >
            Преимущества Pandora
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-center text-gray-400 mb-12"
          >
            Почему нас выбирают более 1000 клиентов
          </motion.p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {advantages.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="bg-gray-900 p-6 rounded-2xl border border-gray-800 hover:border-purple-600 transition group"
              >
                <motion.div
                  className="text-4xl mb-4 inline-block"
                  animate={{ rotate: 0 }}
                  whileHover={{ scale: 1.2, rotate: 10 }}
                >
                  {item.icon}
                </motion.div>
                <h3 className="font-semibold text-lg mb-2 group-hover:text-purple-400 transition text-white">
                  {item.title}
                </h3>
                <p className="text-gray-400">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Быстрые ссылки */}
      <section className="py-20 bg-black">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12 text-white">Быстрые действия</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {quickActions.map((action, i) => (
              <Link key={i} href={action.href}>
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  whileHover={{ y: -10 }}
                  transition={{ delay: i * 0.1 }}
                  className="relative overflow-hidden rounded-3xl shadow-xl group cursor-pointer"
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${action.color} opacity-90`} />
                  <div className="relative z-10 p-8 text-white text-center">
                    <motion.div
                      className="text-6xl mb-4 inline-block"
                      animate={{ rotate: 0 }}
                      whileGroupHover={{ rotate: 360 }}
                      transition={{ duration: 0.5 }}
                    >
                      {action.icon}
                    </motion.div>
                    <h3 className="text-2xl font-bold mb-2">{action.title}</h3>
                    <p className="opacity-90">{action.desc}</p>
                    <div className="mt-4 inline-flex items-center space-x-2">
                      <span>Перейти</span>
                      <span className="group-hover:translate-x-2 transition">→</span>
                    </div>
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Яндекс Карта */}
      <section className="py-20 bg-gray-950">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-4 text-white">Ближайшие точки</h2>
          <p className="text-center text-gray-400 mb-12">Дилеры и мастера рядом с вами</p>

          <div className="relative">
            <div id="map" className="w-full h-[500px] rounded-3xl shadow-2xl overflow-hidden"></div>

            <div className="absolute bottom-6 left-6 bg-gray-900 rounded-2xl shadow-xl p-6 border border-gray-800">
              <h3 className="font-bold text-lg mb-2 text-white">В Узбекистане:</h3>
              <div className="space-y-1 text-sm text-gray-300">
                <p>• 15+ официальных дилеров</p>
                <p>• 50+ сертифицированных мастеров</p>
                <p>• Установка в день обращения</p>
              </div>
              <Link href="/service" className="mt-4 text-purple-400 font-medium inline-flex items-center hover:text-purple-300">
                Показать всех
                <span className="ml-2">→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}