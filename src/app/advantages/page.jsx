// src/app/advantages/page.jsx
'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
export default function AdvantagesPage() {
  const technologies = [
    {
      icon: '🔐',
      title: 'Диалоговый код',
      description: 'Уникальный алгоритм шифрования с индивидуальным ключом для каждого устройства',
      details: [
        'Защита от перехвата и ретрансляции сигнала',
        'Невозможность клонирования брелока',
        'Динамическое изменение кода при каждом нажатии',
        '128-битное шифрование AES'
      ]
    },
    {
      icon: '📡',
      title: 'Дальность связи',
      description: 'До 2000 метров в городских условиях благодаря современным технологиям',
      details: [
        'Усиленный радиомодуль',
        'Оптимизированная антенна',
        'Автоматическая регулировка мощности',
        'Помехозащищенный канал связи'
      ]
    },
    {
      icon: '🌡️',
      title: 'Климат-контроль',
      description: 'Умный автозапуск с учетом погодных условий и ваших предпочтений',
      details: [
        'Запуск по температуре двигателя',
        'Программирование до 4 запусков в сутки',
        'Контроль температуры в салоне',
        'Турботаймер для турбированных двигателей'
      ]
    },
    {
      icon: '📱',
      title: 'Мобильное управление',
      description: 'Полный контроль через смартфон из любой точки мира',
      details: [
        'Мгновенные push-уведомления',
        'История всех событий',
        'GPS отслеживание маршрутов',
        'Удаленная диагностика'
      ]
    },
    {
      icon: '🛡️',
      title: 'Многоуровневая защита',
      description: 'Комплексная система безопасности для максимальной защиты',
      details: [
        '8 независимых охранных зон',
        'Защита от сканирования',
        'Блокировка двигателя по CAN',
        'Тревожная сирена 110 дБ'
      ]
    },
    {
      icon: '🔧',
      title: 'Простая интеграция',
      description: 'Бесшовная работа со штатными системами автомобиля',
      details: [
        'Подключение по CAN-шине',
        'Сохранение заводской гарантии',
        'Работа со штатным иммобилайзером',
        'Управление штатной сигнализацией'
      ]
    }
  ]
  
  return (
    <div className="page-container min-h-screen bg-gradient-to-br from-gray-50 to-purple-50">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl font-bold text-center mb-4"
        >
          Технологии Pandora
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center text-gray-600 mb-12 text-lg"
        >
          Инновационные решения для защиты вашего автомобиля
        </motion.p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {technologies.map((tech, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -5 }}
              className="bg-white rounded-3xl shadow-xl p-8 group"
            >
              <motion.div
                className="text-6xl mb-4 inline-block"
                whileGroupHover={{ rotate: 360 }}
                transition={{ duration: 0.5 }}
              >
                {tech.icon}
              </motion.div>
              <h3 className="text-2xl font-bold mb-3">{tech.title}</h3>
              <p className="text-gray-600 mb-6">{tech.description}</p>
              <ul className="space-y-2">
                {tech.details.map((detail, j) => (
                  <li key={j} className="flex items-start text-sm">
                    <span className="text-purple-600 mr-2 mt-0.5">•</span>
                    <span className="text-gray-700">{detail}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
        
        {/* Сравнение с конкурентами */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-8">Почему именно Pandora?</h2>
          <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
            <table className="w-full">
              <thead className="bg-gradient-to-r from-purple-600 to-pink-600 text-white">
                <tr>
                  <th className="px-6 py-4 text-left">Функция</th>
                  <th className="px-6 py-4 text-center">Pandora</th>
                  <th className="px-6 py-4 text-center">Другие бренды</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['Дальность связи', 'До 2000м', 'До 800м'],
                  ['Защита от взлома', 'Диалоговый код', 'Статический код'],
                  ['Мобильное приложение', '✓ Бесплатно', '✗ Платная опция'],
                  ['Автозапуск', '✓ Умный', '✓ Базовый'],
                  ['Гарантия', '2 года', '1 год'],
                  ['Поддержка 24/7', '✓', '✗']
                ].map(([feature, pandora, others], i) => (
                  <tr key={i} className={i % 2 === 0 ? 'bg-gray-50' : ''}>
                    <td className="px-6 py-4 font-medium">{feature}</td>
                    <td className="px-6 py-4 text-center text-green-600 font-semibold">{pandora}</td>
                    <td className="px-6 py-4 text-center text-gray-500">{others}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
        
        {/* CTA секция */}
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="text-center bg-gradient-to-r from-purple-600 to-pink-600 rounded-3xl p-12 text-white"
        >
          <h2 className="text-3xl font-bold mb-4">Готовы к максимальной защите?</h2>
          <p className="text-xl mb-8 opacity-90">
            Выберите свою систему Pandora и получите профессиональную установку
          </p>
          <div className="flex gap-4 justify-center">
            <Link href="/products" className="bg-white text-purple-600 px-8 py-3 rounded-xl font-semibold hover:shadow-lg transition">
              Выбрать систему
            </Link>
            <Link href="/service" className="border-2 border-white text-white px-8 py-3 rounded-xl font-semibold hover:bg-white/10 transition">
              Найти мастера
            </Link>
          </div>
        </motion.section>
      </div>
    </div>
  )
}