'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function ProductsPage() {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [compareList, setCompareList] = useState([])
  const [showModal, setShowModal] = useState(false)
  const [showComparison, setShowComparison] = useState(false)
  
  const products = [
    {
      id: 'dx91',
      name: 'Pandora DX-91',
      price: 250,
      monthly: 21,
      category: 'standard',
      rating: 4.7,
      reviews: 156,
      badge: 'Хит продаж',
      color: 'from-blue-500 to-purple-500',
      features: ['Диалоговый код', 'LCD брелок', 'Автозапуск', 'Турботаймер', '2000м дальность'],
      pros: ['Надежная защита', 'Простая установка', 'Долгий срок службы'],
      compatibility: '90% автомобилей'
    },
    {
      id: 'dx4gs',
      name: 'Pandora DX-4GS',
      price: 350,
      monthly: 29,
      category: 'gsm',
      rating: 4.8,
      reviews: 203,
      badge: 'Выбор экспертов',
      color: 'from-purple-500 to-pink-500',
      features: ['GSM модуль', 'Мобильное приложение', 'GPS трекинг', 'Онлайн мониторинг', 'Умные уведомления'],
      pros: ['Управление из любой точки мира', 'GPS отслеживание', 'История поездок'],
      compatibility: '95% автомобилей'
    },
    {
      id: 'dxl5000',
      name: 'Pandora DXL-5000',
      price: 550,
      monthly: 46,
      category: 'premium',
      rating: 4.9,
      reviews: 89,
      badge: 'Премиум',
      color: 'from-gold-500 to-orange-500',
      features: ['Bluetooth 5.0', '2CAN интерфейс', 'Бесключевой обход', 'Умная авторизация', 'Интеграция со штатными системами'],
      pros: ['Максимальная защита', 'Полная интеграция', 'Премиум функции'],
      compatibility: '100% автомобилей'
    }
  ]
  
  const filteredProducts = selectedCategory === 'all' 
    ? products 
    : products.filter(p => p.category === selectedCategory)
  
  const [formData, setFormData] = useState({
    name: '', phone: '', car: '', comment: '', product: ''
  })
  
  const handleSubmit = (e) => {
    e.preventDefault()
    alert('Заявка отправлена! Мы свяжемся с вами в течение 15 минут.')
    setShowModal(false)
  }
  
  return (
    <div className="page-container min-h-screen bg-gradient-to-br from-gray-50 to-purple-50">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl font-bold text-center mb-4"
        >
          Выберите охранную систему
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center text-gray-600 mb-12"
        >
          Подберем идеальное решение для вашего автомобиля
        </motion.p>
        
        {/* Фильтры */}
        <div className="flex justify-center mb-12">
          <div className="bg-white rounded-full shadow-lg p-1 flex">
            {[
              { value: 'all', label: 'Все системы' },
              { value: 'standard', label: 'Стандарт' },
              { value: 'gsm', label: 'С GSM' },
              { value: 'premium', label: 'Премиум' }
            ].map(filter => (
              <button
                key={filter.value}
                onClick={() => setSelectedCategory(filter.value)}
                className={`px-6 py-2 rounded-full transition ${
                  selectedCategory === filter.value
                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white'
                    : 'text-gray-600 hover:text-purple-600'
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>
        
        {/* Карточки продуктов */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {filteredProducts.map((product, i) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="relative group"
            >
              {product.badge && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 z-10">
                  <span className={`bg-gradient-to-r ${product.color} text-white px-4 py-1 rounded-full text-sm`}>
                    {product.badge}
                  </span>
                </div>
              )}
              
              <motion.div
                whileHover={{ y: -5 }}
                className="bg-white rounded-3xl shadow-xl overflow-hidden h-full"
              >
                <div className={`h-48 bg-gradient-to-br ${product.color} relative overflow-hidden`}>
                  <motion.div
                    className="absolute inset-0 flex items-center justify-center text-white text-8xl opacity-20"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                  >
                    🔐
                  </motion.div>
                  <div className="relative z-10 p-6 text-white">
                    <h3 className="text-2xl font-bold">{product.name}</h3>
                    <div className="flex items-center mt-2">
                      <div className="flex text-yellow-300">
                        {'★'.repeat(Math.floor(product.rating))}
                      </div>
                      <span className="ml-2">{product.rating} ({product.reviews})</span>
                    </div>
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="mb-4">
                    <div className="text-3xl font-bold text-purple-600">${product.price}</div>
                    <div className="text-gray-600">или ${product.monthly}/мес</div>
                  </div>
                  
                  <div className="space-y-2 mb-6">
                    {product.features.slice(0, 3).map((feature, j) => (
                      <div key={j} className="flex items-center text-sm">
                        <span className="text-purple-600 mr-2">✓</span>
                        {feature}
                      </div>
                    ))}
                    <div className="text-sm text-gray-500">+{product.features.length - 3} функций</div>
                  </div>
                  
                  <div className="mb-6">
                    <div className="text-sm text-gray-600 mb-1">Совместимость</div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className={`h-full rounded-full bg-gradient-to-r ${product.color}`}
                        style={{ width: product.compatibility }}
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <button
                      onClick={() => {
                        setFormData({ ...formData, product: product.id })
                        setShowModal(true)
                      }}
                      className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 rounded-xl hover:shadow-lg transition"
                    >
                      Заказать установку
                    </button>
                    <button
                      onClick={() => {
                        if (compareList.includes(product.id)) {
                          setCompareList(compareList.filter(id => id !== product.id))
                        } else {
                          setCompareList([...compareList, product.id])
                        }
                      }}
                      className={`w-full py-2 rounded-xl border-2 transition ${
                        compareList.includes(product.id)
                          ? 'border-purple-600 text-purple-600 bg-purple-50'
                          : 'border-gray-300 text-gray-600 hover:border-purple-600'
                      }`}
                    >
                      {compareList.includes(product.id) ? '✓ В сравнении' : 'Сравнить'}
                    </button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
        
        {/* Сравнение */}
        {compareList.length > 1 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-20"
          >
            <button
              onClick={() => setShowComparison(true)}
              className="bg-purple-600 text-white px-8 py-3 rounded-full shadow-lg hover:bg-purple-700 transition"
            >
              Сравнить выбранные ({compareList.length})
            </button>
          </motion.div>
        )}
      </div>
      
      {/* Модалка заявки */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
            onClick={() => setShowModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="bg-white rounded-3xl p-8 max-w-md w-full"
              onClick={e => e.stopPropagation()}
            >
              <h2 className="text-2xl font-bold mb-6">Быстрая заявка</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <input
                  type="text"
                  placeholder="Ваше имя"
                  required
                  className="w-full px-4 py-3 border rounded-xl"
                  value={formData.name}
                  onChange={e => setFormData({...formData, name: e.target.value})}
                />
                <input
                  type="tel"
                  placeholder="+998 XX XXX XX XX"
                  required
                  className="w-full px-4 py-3 border rounded-xl"
                  value={formData.phone}
                  onChange={e => setFormData({...formData, phone: e.target.value})}
                />
                <input
                  type="text"
                  placeholder="Марка и модель авто"
                  required
                  className="w-full px-4 py-3 border rounded-xl"
                  value={formData.car}
                  onChange={e => setFormData({...formData, car: e.target.value})}
                />
                <textarea
                  placeholder="Комментарий (необязательно)"
                  rows="3"
                  className="w-full px-4 py-3 border rounded-xl"
                  value={formData.comment}
                  onChange={e => setFormData({...formData, comment: e.target.value})}
                />
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 rounded-xl"
                >
                  Отправить заявку
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Модалка сравнения */}
      <AnimatePresence>
        {showComparison && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
            onClick={() => setShowComparison(false)}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              className="bg-white rounded-3xl p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto"
              onClick={e => e.stopPropagation()}
            >
              <h2 className="text-2xl font-bold mb-6">Сравнение систем</h2>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr>
                      <th className="text-left p-2">Характеристика</th>
                      {compareList.map(id => {
                        const product = products.find(p => p.id === id)
                        return <th key={id} className="text-center p-2">{product.name}</th>
                      })}
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-t">
                      <td className="p-2">Цена</td>
                      {compareList.map(id => {
                        const product = products.find(p => p.id === id)
                        return <td key={id} className="text-center p-2 font-bold">${product.price}</td>
                      })}
                    </tr>
                    <tr className="border-t">
                      <td className="p-2">Рейтинг</td>
                      {compareList.map(id => {
                        const product = products.find(p => p.id === id)
                        return <td key={id} className="text-center p-2">⭐ {product.rating}</td>
                      })}
                    </tr>
                    <tr className="border-t">
                      <td className="p-2">Основные функции</td>
                      {compareList.map(id => {
                        const product = products.find(p => p.id === id)
                        return (
                          <td key={id} className="text-center p-2">
                            <ul className="text-sm text-left">
                              {product.features.map((f, i) => <li key={i}>• {f}</li>)}
                            </ul>
                          </td>
                        )
                      })}
                    </tr>
                  </tbody>
                </table>
              </div>
              <button
                onClick={() => setShowComparison(false)}
                className="mt-6 px-6 py-2 bg-gray-200 rounded-xl"
              >
                Закрыть
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}