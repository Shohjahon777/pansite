'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { Star, CheckCircle, Filter, User } from 'lucide-react'
import { useTranslation } from '../../hooks/useTranslation'
import { reviewsLocales } from './reviewsLocales'

export default function ReviewsPage() {
  const [filter, setFilter] = useState('all')
  const { t } = useTranslation(reviewsLocales)
  
  const reviews = [
    {
      id: 1,
      type: 'product',
      product: 'Pandora DX-91',
      user: 'Андрей Петров',
      rating: 5,
      date: '20.05.2025',
      text: 'Отличная сигнализация! Установил полгода назад, работает без сбоев. Особенно нравится дальность действия брелока.',
      master: 'Алексей К.',
      verified: true
    },
    {
      id: 2,
      type: 'master',
      product: 'Pandora DX-4GS',
      user: 'Мария Сидорова',
      rating: 5,
      date: '18.05.2025',
      text: 'Мастер Сергей - настоящий профессионал. Установка заняла 2 часа, все объяснил и показал как пользоваться.',
      master: 'Сергей М.',
      verified: true
    },
    {
      id: 3,
      type: 'product',
      product: 'Pandora DXL-5000',
      user: 'Виктор Козлов',
      rating: 4,
      date: '15.05.2025',
      text: 'Премиальная система с отличным функционалом. Единственный минус - сложновато разобраться с настройками.',
      master: 'Дмитрий А.',
      verified: true
    }
  ]
  
  const stats = {
    average: 4.8,
    total: 1234,
    distribution: { 5: 80, 4: 15, 3: 3, 2: 1, 1: 1 }
  }
  
  const filteredReviews = filter === 'all' 
    ? reviews 
    : reviews.filter(r => r.type === filter)
  
  return (
    <div className="page-container min-h-screen bg-black">
      <div className="max-w-7xl mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl font-thin text-white mb-4">
            {t('reviews.title')}
          </h1>
        </motion.div>
        
        {/* Statistics */}
        <div className="bg-gray-950 border border-gray-800 p-8 mb-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-5xl font-thin text-white mb-2">{stats.average}</div>
              <div className="flex justify-center gap-1 mb-2">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    className={`w-5 h-5 ${i < Math.floor(stats.average) ? 'fill-white text-white' : 'text-gray-700'}`} 
                  />
                ))}
              </div>
              <p className="text-gray-500 text-sm">{t('reviews.averageRating')}</p>
            </div>
            
            <div className="text-center">
              <div className="text-5xl font-thin text-white mb-2">{stats.total}</div>
              <p className="text-gray-500 text-sm">{t('reviews.totalReviews')}</p>
            </div>
            
            <div className="space-y-2">
              {Object.entries(stats.distribution).reverse().map(([rating, percent]) => (
                <div key={rating} className="flex items-center">
                  <span className="w-8 text-gray-400 text-sm">{rating}★</span>
                  <div className="flex-1 bg-gray-900 h-2 mx-3">
                    <div 
                      className="bg-gradient-to-r from-gray-700 to-gray-600 h-full"
                      style={{ width: `${percent}%` }}
                    />
                  </div>
                  <span className="text-sm text-gray-500 w-12 text-right">{percent}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Filters */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex border border-gray-800 p-1">
            {[
              { value: 'all', label: t('reviews.filters.all') },
              { value: 'product', label: t('reviews.filters.products') },
              { value: 'master', label: t('reviews.filters.masters') }
            ].map(f => (
              <button
                key={f.value}
                onClick={() => setFilter(f.value)}
                className={`px-6 py-2 text-sm font-light transition-all ${
                  filter === f.value
                    ? 'bg-white text-black'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>
        
        {/* Reviews List */}
        <div className="space-y-6">
          {filteredReviews.map((review, i) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-gray-950 border border-gray-800 p-6"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gray-900 border border-gray-800 flex items-center justify-center flex-shrink-0">
                    <User className="w-6 h-6 text-gray-700" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-light text-lg text-white">{review.user}</h3>
                      {review.verified && (
                        <CheckCircle className="w-4 h-4 text-green-500" />
                      )}
                    </div>
                    <div className="flex gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          className={`w-4 h-4 ${i < review.rating ? 'fill-white text-white' : 'text-gray-700'}`} 
                        />
                      ))}
                    </div>
                  </div>
                </div>
                <span className="text-gray-500 text-sm">{review.date}</span>
              </div>
              
              <p className="text-gray-300 mb-4 font-light">{review.text}</p>
              
              <div className="flex items-center gap-4 text-sm text-gray-500">
                {review.product && (
                  <span>{t('reviews.product')}: <span className="text-gray-400">{review.product}</span></span>
                )}
                {review.master && (
                  <Link 
                    href={`/service/${review.master.toLowerCase().replace(/\s+/g, '-')}`} 
                    className="hover:text-gray-300 transition-colors"
                  >
                    {t('reviews.master')}: <span className="text-gray-400">{review.master}</span>
                  </Link>
                )}
              </div>
            </motion.div>
          ))}
        </div>
        
        {/* Load More */}
        <div className="text-center mt-12">
          <button className="border border-gray-700 text-gray-400 px-8 py-3 hover:bg-gray-900 hover:text-white transition-all">
            {t('reviews.loadMore')}
          </button>
        </div>
      </div>
    </div>
  )
}