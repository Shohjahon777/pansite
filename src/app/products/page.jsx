'use client'

import { useEffect, useState } from 'react'
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
  X,
  Image as ImageIcon
} from 'lucide-react'
import { useTranslation } from '../../hooks/useTranslation'
import { productsLocales } from './products'
import { FilterDropdown } from '@/src/components/FilterDropdown'
import { useLanguageStore } from '@/src/store/language'
import axios from 'axios'

export default function ProductsPage() {
  const [selectedCategory, setSelectedCategory] = useState(null)
  const [filters, setFilters] = useState([])
  const [compareList, setCompareList] = useState([])
  const [showModal, setShowModal] = useState(false)
  const [showComparison, setShowComparison] = useState(false)
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const { t } = useTranslation(productsLocales)
  const { currentLocale } = useLanguageStore()

  useEffect(() => {
    fetchFilters()
    fetchProducts()
  }, [currentLocale, selectedCategory])

  const fetchFilters = async () => {
    try {
      const response = await axios.post('/api/get-model-types', { locale: currentLocale })
      if (response.status !== 200) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      setFilters(response.data)
    } catch (error) {
      console.error('Error fetching filters:', error)
      setError('Failed to load filters')
    }
  }

  const fetchProducts = async () => {
    try {
      setLoading(true)
      setError(null)

      const response = await axios.post('/api/get-products', {
        locale: currentLocale,
        type_id: selectedCategory
      })

      if (response.status !== 200) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      // Transform API response to match component expectations
      const transformedProducts = response.data.map(product => ({
        ...product,
        // Convert price to number for proper display
        price: parseInt(product.price),
        // Add missing properties with defaults
        monthly: Math.round(parseInt(product.price) / 12),
        rating: 4.5 + Math.random() * 0.4, // Random rating between 4.5-4.9
        reviews: Math.floor(Math.random() * 200) + 50, // Random reviews 50-250
        badge: getBadgeForProduct(product.name),
        icon: getIconForProduct(product.name),
        features: getFeaturesForProduct(product.name),
        compatibility: getCompatibilityForProduct(product.name),
        // Handle image URL
        imageUrl: product.img && product.img.includes('sha=') && !product.img.endsWith('sha=')
            ? product.img
            : null
      }))

      setProducts(transformedProducts)
    } catch (error) {
      console.error('Error fetching products:', error)
      setError('Failed to load products')
    } finally {
      setLoading(false)
    }
  }

  // Helper functions to determine product characteristics based on name
  const getBadgeForProduct = (name) => {
    const nameLower = name.toLowerCase()
    if (nameLower.includes('dx 9x') || nameLower.includes('vx 4g gps')) {
      return t('products.badges.bestseller')
    }
    if (nameLower.includes('dxl') || nameLower.includes('v3')) {
      return t('products.badges.premium')
    }
    if (nameLower.includes('4g') || nameLower.includes('gps')) {
      return t('products.badges.expertChoice')
    }
    return null
  }

  const getIconForProduct = (name) => {
    const nameLower = name.toLowerCase()
    if (nameLower.includes('4g') || nameLower.includes('gps')) {
      return Smartphone
    }
    if (nameLower.includes('dxl') || nameLower.includes('v3')) {
      return Cpu
    }
    return Shield
  }

  const getFeaturesForProduct = (name) => {
    const nameLower = name.toLowerCase()
    const baseFeatures = [
      t('products.features.dialogCode'),
      t('products.features.lcdRemote'),
      t('products.features.autostart')
    ]

    if (nameLower.includes('4g')) {
      return [
        t('products.features.gsmModule'),
        t('products.features.mobileApp'),
        t('products.features.gpsTracking'),
        t('products.features.onlineMonitoring'),
        t('products.features.smartNotifications')
      ]
    }

    if (nameLower.includes('gps')) {
      return [
        ...baseFeatures,
        t('products.features.gpsTracking'),
        t('products.features.onlineMonitoring')
      ]
    }

    if (nameLower.includes('dxl') || nameLower.includes('v3')) {
      return [
        t('products.features.bluetooth5'),
        t('products.features.2canInterface'),
        t('products.features.keylessEntry'),
        t('products.features.smartAuth'),
        t('products.features.fullIntegration')
      ]
    }

    return [
      ...baseFeatures,
      t('products.features.turboTimer'),
      t('products.features.range2000')
    ]
  }

  const getCompatibilityForProduct = (name) => {
    const nameLower = name.toLowerCase()
    if (nameLower.includes('dxl') || nameLower.includes('v3')) {
      return '100%'
    }
    if (nameLower.includes('4g') || nameLower.includes('gps')) {
      return '95%'
    }
    return '90%'
  }

  const filteredProducts = selectedCategory === null
      ? products
      : products.filter(p => p.category === selectedCategory)

  const [formData, setFormData] = useState({
    name: '', phone: '', car: '', comment: '', product: ''
  })

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      // Submit form data to your API
      await axios.post('/api/submit-order', formData)
      setShowModal(false)
      setFormData({ name: '', phone: '', car: '', comment: '', product: '' })
      // Show success message
    } catch (error) {
      console.error('Error submitting order:', error)
      // Show error message
    }
  }

  if (loading) {
    return (
        <div className="page-container min-h-screen bg-black">
          <div className="max-w-7xl mx-auto px-4 py-16">
            <div className="flex items-center justify-center h-96">
              <div className="text-white text-xl">Loading products...</div>
            </div>
          </div>
        </div>
    )
  }

  if (error) {
    return (
        <div className="page-container min-h-screen bg-black">
          <div className="max-w-7xl mx-auto px-4 py-16">
            <div className="flex items-center justify-center h-96">
              <div className="text-red-500 text-xl">{error}</div>
            </div>
          </div>
        </div>
    )
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
            <FilterDropdown
                filters={filters}
                selectedCategory={selectedCategory}
                onCategoryChange={setSelectedCategory}
                t={t}
            />
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
                        {/* Product Image or Icon */}
                        <div className="mb-6 flex items-center justify-center h-16">
                          {product.imageUrl ? (
                              <img
                                  src={product.imageUrl}
                                  alt={product.name}
                                  className="w-16 h-16 object-contain"
                                  onError={(e) => {
                                    e.target.style.display = 'none'
                                    e.target.nextSibling.style.display = 'block'
                                  }}
                              />
                          ) : null}
                          <product.icon
                              className={`w-16 h-16 text-gray-700 ${product.imageUrl ? 'hidden' : 'block'}`}
                              strokeWidth={1}
                          />
                        </div>

                        <h3 className="text-2xl font-light text-white mb-2">{product.name}</h3>
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                          <span>★ {product.rating.toFixed(1)}</span>
                          <span>({product.reviews})</span>
                        </div>
                      </div>
                    </Link>

                    <div className="p-8">
                      <div className="mb-6">
                        <div className="text-3xl font-thin text-white">${product.price.toLocaleString()}</div>
                        <div className="text-sm text-gray-500">
                          {t('products.or')} ${product.monthly}/{t('products.month')}
                        </div>
                      </div>

                      <div className="space-y-2 mb-6">
                        {product.features.slice(0, 3).map((feature, j) => (
                            <div key={j} className="flex items-start gap-2 text-sm text-gray-400">
                              <Check className="w-4 h-4 mt-0.5 text-gray-600" />
                              <span className="font-light">{feature}</span>
                            </div>
                        ))}
                        {product.features.length > 3 && (
                            <div className="text-sm text-gray-600 pl-6">
                              +{product.features.length - 3} {t('products.moreFeatures')}
                            </div>
                        )}
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
                            className={`w-full py-3 text-sm font-light transition-all ${compareList.includes(product.id)
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

          {/* No Products Message */}
          {filteredProducts.length === 0 && !loading && (
              <div className="text-center py-16">
                <div className="text-gray-500 text-lg mb-4">No products found</div>
                <p className="text-gray-600">Try adjusting your filters or check back later.</p>
              </div>
          )}

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
                        onChange={e => setFormData({ ...formData, name: e.target.value })}
                    />
                    <input
                        type="tel"
                        placeholder={t('products.form.phone')}
                        required
                        className="w-full px-4 py-3 bg-black border border-gray-800 text-white placeholder-gray-600 focus:border-gray-700 focus:outline-none transition-colors"
                        value={formData.phone}
                        onChange={e => setFormData({ ...formData, phone: e.target.value })}
                    />
                    <input
                        type="text"
                        placeholder={t('products.form.car')}
                        required
                        className="w-full px-4 py-3 bg-black border border-gray-800 text-white placeholder-gray-600 focus:border-gray-700 focus:outline-none transition-colors"
                        value={formData.car}
                        onChange={e => setFormData({ ...formData, car: e.target.value })}
                    />
                    <textarea
                        placeholder={t('products.form.comment')}
                        rows="3"
                        className="w-full px-4 py-3 bg-black border border-gray-800 text-white placeholder-gray-600 focus:border-gray-700 focus:outline-none transition-colors resize-none"
                        value={formData.comment}
                        onChange={e => setFormData({ ...formData, comment: e.target.value })}
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