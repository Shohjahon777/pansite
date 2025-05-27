'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'

export default function ReviewsPage() {
  const [filter, setFilter] = useState('all')
  
  const reviews = [
    {
      id: 1,
      type: 'product',
      product: 'Pandora DX-91',
      user: 'Андрей Петров',
      rating: 5,
      date: '20.05.2025',
      text: 'Отличная сигнализация! Установил полгода назад, работает без сбоев.',
      master: 'Алексей К.',
      verified: true
    },
    {
      id: 2,
      name: 'Алексей Кириллов',
      type: 'master',
      user: 'Мария Сидорова',
      rating: 5,
      date: '18.05.2025',
      text: 'Мастер Сергей - настоящий профессионал. Установка заняла 2 часа, все объяснил.',
      master: 'Сергей М.',
      product: 'Pandora DX-4GS',
      verified: true
    }
  ]
  
  const stats = {
    average: 4.8,
    total: 1234,
    distribution: { 5: 80, 4: 15, 3: 3, 2: 1, 1: 1 }
  }
  
  return (
    <div className="page-container min-h-screen bg-gradient-to-br from-black to-gray-900">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl font-bold text-center mb-12 text-white"
        >
          Отзывы клиентов
        </motion.h1>
        
        {/* Статистика */}
        <div className="bg-gray-900 rounded-3xl shadow-xl p-8 mb-8 border border-gray-800">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-5xl font-bold text-purple-400">{stats.average}</div>
              <div className="flex justify-center text-yellow-400 text-2xl my-2">
                {'★'.repeat(Math.floor(stats.average))}
              </div>
              <p className="text-gray-400">Средний рейтинг</p>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold text-purple-400">{stats.total}</div>
              <p className="text-gray-400 mt-2">Всего отзывов</p>
            </div>
            <div>
              {Object.entries(stats.distribution).reverse().map(([rating, percent]) => (
                <div key={rating} className="flex items-center mb-1">
                  <span className="w-8 text-gray-300">{rating}★</span>
                  <div className="flex-1 bg-gray-700 rounded-full h-4 mx-2">
                    <div 
                      className="bg-gradient-to-r from-purple-600 to-pink-600 h-full rounded-full"
                      style={{ width: `${percent}%` }}
                    />
                  </div>
                  <span className="text-sm text-gray-400 w-12">{percent}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Фильтры */}
        <div className="flex justify-center mb-8">
          <div className="bg-gray-900 rounded-full shadow-lg p-1 flex">
            {[
              { value: 'all', label: 'Все отзывы' },
              { value: 'product', label: 'О продуктах' },
              { value: 'master', label: 'О мастерах' }
            ].map(f => (
              <button
                key={f.value}
                onClick={() => setFilter(f.value)}
                className={`px-6 py-2 rounded-full transition ${
                  filter === f.value
                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white'
                    : 'text-gray-400 hover:text-purple-400'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>
        
        {/* Список отзывов */}
        <div className="space-y-6">
          {reviews
            .filter(r => filter === 'all' || r.type === filter)
            .map((review, i) => (
              <motion.div
                key={review.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="bg-gray-900 rounded-2xl shadow-lg p-6 border border-gray-800"
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-lg text-white">{review.user}</h3>
                      {review.verified && (
                        <span className="text-green-400 text-sm">✓ Проверено</span>
                      )}
                    </div>
                    <div className="flex text-yellow-400">
                      {'★'.repeat(review.rating)}
                    </div>
                  </div>
                  <span className="text-gray-500 text-sm">{review.date}</span>
                </div>
                
                <p className="text-gray-300 mb-4">{review.text}</p>
                
                <div className="flex items-center gap-4 text-sm text-gray-500">
                  {review.product && <span>Продукт: {review.product}</span>}
                  {review.master && (
                    <Link href={`/service/${review.master.toLowerCase().replace(/\s+/g, '-')}`} className="hover:text-purple-400">
                      Мастер: {review.master}
                    </Link>
                  )}
                </div>
              </motion.div>
            ))}
        </div>
      </div>
    </div>
  )
}