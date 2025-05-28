'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { 
  Filter, 
  ChevronRight, 
  Check, 
  ArrowRight,
  Cpu,
  Smartphone,
  Shield,
  X
} from 'lucide-react'
import { useTranslation } from '../../hooks/useTranslation'
import { productsLocales } from './products'

export default function ProductsPage() {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [compareList, setCompareList] = useState([])
  const [showModal, setShowModal] = useState(false)
  const [showComparison, setShowComparison] = useState(false)
  const { t } = useTranslation(productsLocales)
  
  const products = [
    {
      id: 'dx91',
      name: 'Pandora DX-91',
      price: 250,
      monthly: 21,
      category: 'standard',
      rating: 4.7,
      reviews: 156,
      badge: t('products.badges.bestseller'),
      icon: Shield,
      features: [
        t('products.features.dialogCode'),
        t('products.features.lcdRemote'),
        t('products.features.autostart'),
        t('products.features.turboTimer'),
        t('products.features.range2000')
      ],
      compatibility: '90%'
    },
    {
      id: 'dx4gs',
      name: 'Pandora DX-4GS',
      price: 350,
      monthly: 29,
      category: 'gsm',
      rating: 4.8,
      reviews: 203,
      badge: t('products.badges.expertChoice'),
      icon: Smartphone,
      features: [
        t('products.features.gsmModule'),
        t('products.features.mobileApp'),
        t('products.features.gpsTracking'),
        t('products.features.onlineMonitoring'),
        t('products.features.smartNotifications')
      ],
      compatibility: '95%'
    },
    {
      id: 'dxl5000',
      name: 'Pandora DXL-5000',
      price: 550,
      monthly: 46,
      category: 'premium',
      rating: 4.9,
      reviews: 89,
      badge: t('products.badges.premium'),
      icon: Cpu,
      features: [
        t('products.features.bluetooth5'),
        t('products.features.2canInterface'),
        t('products.features.keylessEntry'),
        t('products.features.smartAuth'),
        t('products.features.fullIntegration')
      ],
      compatibility: '100%'
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
    setShowModal(false)
    setFormData({ name: '', phone: '', car: '', comment: '', product: '' })
  }
  
  return (
    <div className="page-container min-h-screen bg-black">
      <div className="max-w-7xl mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl font-thin text-white mb-4">
            {t('products.title')}
          </h1>
          <p className="text-xl text-gray-500 font-light">
            {t('products.subtitle')}
          </p>
        </motion.div>
        
        {/* Filters */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex border border-gray-800 p-1">
            {[
              { value: 'all', label: t('products.filters.all') },
              { value: 'standard', label: t('products.filters.standard') },
              { value: 'gsm', label: t('products.filters.gsm') },
              { value: 'premium', label: t('products.filters.premium') }
            ].map(filter => (
              <button
                key={filter.value}
                onClick={() => setSelectedCategory(filter.value)}
                className={`px-6 py-2 text-sm font-light transition-all ${
                  selectedCategory === filter.value
                    ? 'bg-white text-black'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>
        
        {/* Products Grid */}
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
                <div className="absolute -top-3 right-6 z-10">
                  <span className="bg-white text-black px-4 py-1 text-xs uppercase tracking-wider">
                    {product.badge}
                  </span>
                </div>
              )}
              
              <div className="bg-gray-950 border border-gray-800 h-full hover:border-gray-700 transition-all">
                <Link href={`/products/${product.id}`}>
                  <div className="p-8 border-b border-gray-800">
                    <product.icon className="w-16 h-16 text-gray-700 mb-6" strokeWidth={1} />
                    <h3 className="text-2xl font-light text-white mb-2">{product.name}</h3>
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <span>★ {product.rating}</span>
                      <span>({product.reviews})</span>
                    </div>
                  </div>
                </Link>
                
                <div className="p-8">
                  <div className="mb-6">
                    <div className="text-3xl font-thin text-white">${product.price}</div>
                    <div className="text-sm text-gray-500">{t('products.or')} ${product.monthly}/{t('products.month')}</div>
                  </div>
                  
                  <div className="space-y-2 mb-6">
                    {product.features.slice(0, 3).map((feature, j) => (
                      <div key={j} className="flex items-start gap-2 text-sm text-gray-400">
                        <Check className="w-4 h-4 mt-0.5 text-gray-600" />
                        <span className="font-light">{feature}</span>
                      </div>
                    ))}
                    <div className="text-sm text-gray-600 pl-6">
                      +{product.features.length - 3} {t('products.moreFeatures')}
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-500">{t('products.compatibility')}</span>
                      <span className="text-gray-400">{product.compatibility}</span>
                    </div>
                    <div className="w-full bg-gray-900 h-1">
                      <div 
                        className="h-full bg-gradient-to-r from-gray-700 to-gray-600"
                        style={{ width: product.compatibility }}
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <button
                      onClick={() => {
                        setFormData({ ...formData, product: product.id })
                        setShowModal(true)
                      }}
                      className="w-full bg-white text-black py-3 hover:bg-gray-100 transition-colors text-sm font-medium"
                    >
                      {t('products.orderInstallation')}
                    </button>
                    <Link 
                      href={`/products/${product.id}`}
                      className="w-full border border-gray-700 text-gray-300 py-3 hover:bg-gray-900 hover:text-white transition-all text-sm font-light flex items-center justify-center gap-2 group"
                    >
                      {t('products.details')}
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                    <button
                      onClick={() => {
                        if (compareList.includes(product.id)) {
                          setCompareList(compareList.filter(id => id !== product.id))
                        } else {
                          setCompareList([...compareList, product.id])
                        }
                      }}
                      className={`w-full py-3 text-sm font-light transition-all ${
                        compareList.includes(product.id)
                          ? 'bg-gray-900 text-white border border-gray-700'
                          : 'border border-gray-800 text-gray-500 hover:text-white hover:border-gray-700'
                      }`}
                    >
                      {compareList.includes(product.id) 
                        ? t('products.inComparison') 
                        : t('products.compare')
                      }
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        {/* Compare Button */}
        {compareList.length > 1 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-20"
          >
            <button
              onClick={() => setShowComparison(true)}
              className="bg-white text-black px-8 py-3 shadow-2xl hover:bg-gray-100 transition-colors font-medium"
            >
              {t('products.compareSelected')} ({compareList.length})
            </button>
          </motion.div>
        )}
      </div>
      
      {/* Order Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50"
            onClick={() => setShowModal(false)}
          >
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              className="bg-gray-950 border border-gray-800 p-8 max-w-md w-full"
              onClick={e => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-light text-white">{t('products.quickOrder')}</h2>
                <button
                  onClick={() => setShowModal(false)}
                  className="text-gray-500 hover:text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <input
                  type="text"
                  placeholder={t('products.form.name')}
                  required
                  className="w-full px-4 py-3 bg-black border border-gray-800 text-white placeholder-gray-600 focus:border-gray-700 focus:outline-none transition-colors"
                  value={formData.name}
                  onChange={e => setFormData({...formData, name: e.target.value})}
                />
                <input
                  type="tel"
                  placeholder={t('products.form.phone')}
                  required
                  className="w-full px-4 py-3 bg-black border border-gray-800 text-white placeholder-gray-600 focus:border-gray-700 focus:outline-none transition-colors"
                  value={formData.phone}
                  onChange={e => setFormData({...formData, phone: e.target.value})}
                />
                <input
                  type="text"
                  placeholder={t('products.form.car')}
                  required
                  className="w-full px-4 py-3 bg-black border border-gray-800 text-white placeholder-gray-600 focus:border-gray-700 focus:outline-none transition-colors"
                  value={formData.car}
                  onChange={e => setFormData({...formData, car: e.target.value})}
                />
                <textarea
                  placeholder={t('products.form.comment')}
                  rows="3"
                  className="w-full px-4 py-3 bg-black border border-gray-800 text-white placeholder-gray-600 focus:border-gray-700 focus:outline-none transition-colors resize-none"
                  value={formData.comment}
                  onChange={e => setFormData({...formData, comment: e.target.value})}
                />
                <button
                  type="submit"
                  className="w-full bg-white text-black py-3 hover:bg-gray-100 transition-colors font-medium"
                >
                  {t('products.form.submit')}
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}