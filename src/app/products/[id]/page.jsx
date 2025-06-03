'use client'

import {useEffect, useState} from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import {
  Star,
  Check,
  Shield,
  Smartphone,
  Cpu,
  ChevronLeft,
  ShoppingCart,
  MapPin,
  Car,
  Zap
} from 'lucide-react'
import { useTranslation } from '../../../hooks/useTranslation'
import { productDetailLocales } from './productDetail'
import axios from "axios";
import {useLanguageStore} from "@/src/store/language";

export default function ProductDetailPage() {
  const params = useParams()
  const [activeTab, setActiveTab] = useState('features')
  const [products, setProducts] = useState([])
  const [currentProduct, setCurrentProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const { t } = useTranslation(productDetailLocales)
  const {currentLocale} = useLanguageStore()

  useEffect(() => {
    fetchProducts()
  }, [currentLocale])

  useEffect(() => {
    if (products.length > 0 && params.id) {
      const product = products.find(p => p.id === params.id)
      if (product) {
        setCurrentProduct(enrichProductData(product))
      }
      setLoading(false)
    }
  }, [products, params.id])

  const fetchProducts = async () => {
    try {
      setLoading(true)
      const response = await axios.post('/api/get-products', { locale: currentLocale })
      if (response.status !== 200) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      setProducts(response.data)
    } catch (error) {
      console.error('Error fetching products:', error)
      setLoading(false)
    }
  }

  // Function to determine product category and icon based on product name
  const getProductCategory = (name) => {
    const lowerName = name.toLowerCase()

    if (lowerName.includes('dx 9') || lowerName.includes('dx9')) {
      return { type: 'premium', icon: Shield }
    } else if (lowerName.includes('vx 4g') || lowerName.includes('4g')) {
      return { type: 'smart', icon: Smartphone }
    } else if (lowerName.includes('dxl') || lowerName.includes('ux')) {
      return { type: 'luxury', icon: Cpu }
    } else if (lowerName.includes('dx 40') || lowerName.includes('dx40')) {
      return { type: 'basic', icon: Car }
    } else {
      return { type: 'standard', icon: Zap }
    }
  }

  // Function to enrich basic product data with detailed information
  const enrichProductData = (basicProduct) => {
    const category = getProductCategory(basicProduct.name)
    const basePrice = parseInt(basicProduct.price) || 250

    // Generate features based on product type
    const getFeaturesByType = (type) => {
      switch (type) {
        case 'premium':
          return {
            main: [
              t('productDetail.features.dialogCode'),
              t('productDetail.features.lcdRemote'),
              t('productDetail.features.range2000'),
              t('productDetail.features.autostart'),
              t('productDetail.features.turboTimer'),
              t('productDetail.features.protection')
            ],
            technical: {
              [t('productDetail.technical.voltage')]: '9-18В',
              [t('productDetail.technical.consumption')]: '20 мА',
              [t('productDetail.technical.temperature')]: '-40°C до +85°C',
              [t('productDetail.technical.frequency')]: '868 МГц',
              [t('productDetail.technical.zones')]: '8',
              [t('productDetail.technical.channels')]: '5'
            }
          }
        case 'smart':
          return {
            main: [
              t('productDetail.features.gsmModule'),
              t('productDetail.features.mobileControl'),
              t('productDetail.features.gpsRealtime'),
              t('productDetail.features.pushNotifications'),
              t('productDetail.features.eventsHistory'),
              t('productDetail.features.cabinTemp')
            ],
            technical: {
              [t('productDetail.technical.voltage')]: '9-18В',
              [t('productDetail.technical.gsmModule')]: t('productDetail.technical.builtin'),
              [t('productDetail.technical.gpsReceiver')]: t('productDetail.technical.builtin'),
              [t('productDetail.technical.simCard')]: 'Nano-SIM',
              [t('productDetail.technical.protocols')]: 'CAN, LIN',
              [t('productDetail.technical.mobileApp')]: 'iOS/Android'
            }
          }
        case 'luxury':
          return {
            main: [
              t('productDetail.features.bluetooth5'),
              t('productDetail.features.2canInterface'),
              t('productDetail.features.keylessBypass'),
              t('productDetail.features.ownerRecognition'),
              t('productDetail.features.slaveMode'),
              t('productDetail.features.fullIntegration')
            ],
            technical: {
              [t('productDetail.technical.voltage')]: '9-18В',
              'Bluetooth': '5.0',
              [t('productDetail.technical.interfaces')]: '2xCAN, LIN',
              [t('productDetail.technical.tagRange')]: t('productDetail.technical.upto10m'),
              [t('productDetail.technical.tagsCount')]: t('productDetail.technical.upto8'),
              [t('productDetail.technical.encryption')]: 'AES-128'
            }
          }
        default:
          return {
            main: [
              t('productDetail.features.dialogCode'),
              t('productDetail.features.lcdRemote'),
              t('productDetail.features.autostart'),
              t('productDetail.features.protection')
            ],
            technical: {
              [t('productDetail.technical.voltage')]: '9-18В',
              [t('productDetail.technical.consumption')]: '15 мА',
              [t('productDetail.technical.temperature')]: '-40°C до +85°C',
              [t('productDetail.technical.frequency')]: '433 МГц'
            }
          }
      }
    }

    const getCompatibilityByType = (type) => {
      switch (type) {
        case 'premium':
        case 'luxury':
          return [
            t('productDetail.compatibility.premiumAll'),
            t('productDetail.compatibility.100percent')
          ]
        case 'smart':
          return [
            t('productDetail.compatibility.modernCan'),
            t('productDetail.compatibility.support1000')
          ]
        default:
          return [
            'Toyota (Camry, Corolla, RAV4, Land Cruiser)',
            'Chevrolet (Malibu, Tracker, Tahoe)',
            'Kia (K5, Sportage, Sorento)',
            'Hyundai (Sonata, Tucson, Santa Fe)',
            t('productDetail.compatibility.more500')
          ]
      }
    }

    const getDescriptionByType = (type, name) => {
      switch (type) {
        case 'premium':
          return t('productDetail.products.dx91.description')
        case 'smart':
          return t('productDetail.products.dx4gs.description')
        case 'luxury':
          return t('productDetail.products.dxl5000.description')
        default:
          return `Надежная автосигнализация ${name} с базовым функционалом защиты автомобиля`
      }
    }

    // Calculate rating based on product type
    const getRatingByType = (type) => {
      switch (type) {
        case 'luxury': return 4.9
        case 'smart': return 4.8
        case 'premium': return 4.7
        default: return 4.5
      }
    }

    return {
      id: basicProduct.id,
      name: basicProduct.name,
      price: Math.round(basePrice / 1000), // Convert to reasonable USD price
      rating: getRatingByType(category.type),
      reviewsCount: Math.floor(Math.random() * 200) + 50,
      description: getDescriptionByType(category.type, basicProduct.name),
      icon: category.icon,
      image: basicProduct.img ? `https://crm.carsale.uz${basicProduct.img}` : null,
      features: getFeaturesByType(category.type),
      compatibility: getCompatibilityByType(category.type),
      category: category.type,
      reviewsList: [
        {
          user: 'Андрей П.',
          rating: 5,
          text: 'Отличная сигнализация, работает без нареканий',
          date: '15.05.2025',
          verified: true
        },
        {
          user: 'Мария К.',
          rating: 4,
          text: 'Хорошее качество, быстрая установка',
          date: '10.05.2025',
          verified: true
        }
      ]
    }
  }

  if (loading) {
    return (
        <div className="page-container min-h-screen bg-black flex items-center justify-center">
          <div className="text-white">Loading...</div>
        </div>
    )
  }

  if (!currentProduct) {
    return (
        <div className="page-container min-h-screen bg-black flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl text-white mb-4">Product not found</h1>
            <Link href="/products" className="text-blue-400 hover:text-blue-300">
              Back to products
            </Link>
          </div>
        </div>
    )
  }

  const Icon = currentProduct.icon

  return (
      <div className="page-container min-h-screen bg-black">
        <div className="max-w-7xl mx-auto px-4 py-20">
          {/* Breadcrumbs */}
          <div className="flex items-center space-x-2 text-sm text-gray-500 mb-6">
            <Link href="/" className="hover:text-white transition-colors">{t('productDetail.breadcrumbs.home')}</Link>
            <span>/</span>
            <Link href="/products" className="hover:text-white transition-colors">{t('productDetail.breadcrumbs.products')}</Link>
            <span>/</span>
            <span className="text-gray-300">{currentProduct.name}</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Product Image */}
            <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
            >
              <div className="bg-gradient-to-br from-gray-900 to-gray-950 border border-gray-800 p-16 flex items-center justify-center">
                {currentProduct.image ? (
                    <img
                        src={currentProduct.image}
                        alt={currentProduct.name}
                        className="w-48 h-48 object-contain"
                        onError={(e) => {
                          e.target.style.display = 'none'
                          e.target.nextSibling.style.display = 'block'
                        }}
                    />
                ) : null}
                <Icon
                    className="w-48 h-48 text-gray-700"
                    strokeWidth={0.5}
                    style={{ display: currentProduct.image ? 'none' : 'block' }}
                />
              </div>
              <div className="flex gap-4 mt-4">
                {[1, 2, 3].map((i) => (
                    <div key={i} className="bg-gray-950 border border-gray-800 p-4 flex items-center justify-center">
                      <Icon className="w-12 h-12 text-gray-700" strokeWidth={1} />
                    </div>
                ))}
              </div>
            </motion.div>

            {/* Product Info */}
            <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
            >
              <h1 className="text-4xl font-thin text-white mb-4">{currentProduct.name}</h1>
              <div className="flex items-center space-x-4 mb-6">
                <div className="flex text-white">
                  {[...Array(5)].map((_, i) => (
                      <Star key={i} className={`w-5 h-5 ${i < Math.floor(currentProduct.rating) ? 'fill-current' : ''}`} />
                  ))}
                </div>
                <span className="text-gray-400">{currentProduct.rating} ({currentProduct.reviewsCount} {t('productDetail.reviews')})</span>
              </div>

              <p className="text-gray-400 mb-8 font-light">{currentProduct.description}</p>

              <div className="bg-gray-950 border border-gray-800 p-6 mb-6">
                <div className="text-4xl font-thin text-white mb-2">${currentProduct.price}</div>
                <p className="text-gray-500 mb-4">{t('productDetail.or')} ${Math.round(currentProduct.price/12)}/{t('productDetail.month')}</p>
                <button className="w-full bg-white text-black py-3 mb-2 hover:bg-gray-100 transition-colors font-medium flex items-center justify-center gap-2">
                  <ShoppingCart className="w-5 h-5" />
                  {t('productDetail.orderInstallation')}
                </button>
                <Link href="/service" className="block w-full text-center border border-gray-700 text-gray-300 py-3 hover:bg-gray-900 transition-all flex items-center justify-center gap-2">
                  <MapPin className="w-5 h-5" />
                  {t('productDetail.findMaster')}
                </Link>
              </div>

              <div className="bg-gray-950 border border-gray-800 p-6">
                <h3 className="font-light mb-3 text-white">{t('productDetail.inBox')}:</h3>
                <ul className="space-y-2 text-sm text-gray-400">
                  <li>• {t('productDetail.boxContents.centralUnit')}</li>
                  <li>• {t('productDetail.boxContents.lcdRemote')}</li>
                  <li>• {t('productDetail.boxContents.additionalRemote')}</li>
                  <li>• {t('productDetail.boxContents.sensorsAntenna')}</li>
                  <li>• {t('productDetail.boxContents.manual')}</li>
                </ul>
              </div>
            </motion.div>
          </div>

          {/* Tabs */}
          <div className="mt-12">
            <div className="flex space-x-8 border-b border-gray-800">
              {['features', 'compatibility', 'reviews'].map(tab => (
                  <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`pb-4 px-2 border-b-2 transition ${
                          activeTab === tab
                              ? 'border-white text-white'
                              : 'border-transparent text-gray-500 hover:text-gray-300'
                      }`}
                  >
                    {tab === 'features' && t('productDetail.tabs.features')}
                    {tab === 'compatibility' && t('productDetail.tabs.compatibility')}
                    {/*{tab === 'reviews' && `${t('productDetail.tabs.reviews')} (${currentProduct.reviewsList.length})`}*/}
                  </button>
              ))}
            </div>

            <div className="py-8">
              {activeTab === 'features' && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <h3 className="font-light text-lg mb-4 text-white">{t('productDetail.mainFeatures')}</h3>
                      <ul className="space-y-3">
                        {currentProduct.features.main.map((feature, i) => (
                            <li key={i} className="flex items-start text-gray-300">
                              <Check className="w-5 h-5 text-gray-600 mr-2 mt-0.5" />
                              <span className="font-light">{feature}</span>
                            </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h3 className="font-light text-lg mb-4 text-white">{t('productDetail.technicalSpecs')}</h3>
                      <dl className="space-y-3">
                        {Object.entries(currentProduct.features.technical).map(([key, value]) => (
                            <div key={key} className="flex justify-between">
                              <dt className="text-gray-500 font-light">{key}:</dt>
                              <dd className="font-light text-gray-300">{value}</dd>
                            </div>
                        ))}
                      </dl>
                    </div>
                  </div>
              )}

              {activeTab === 'compatibility' && (
                  <div>
                    <h3 className="font-light text-lg mb-4 text-white">{t('productDetail.supportedCars')}</h3>
                    <ul className="space-y-2">
                      {currentProduct.compatibility.map((item, i) => (
                          <li key={i} className="flex items-center text-gray-300">
                            <Check className="w-5 h-5 text-green-500 mr-2" />
                            <span className="font-light">{item}</span>
                          </li>
                      ))}
                    </ul>
                    <div className="mt-6 p-4 bg-blue-950/20 border border-blue-900">
                      <p className="text-sm text-gray-300">
                        {t('productDetail.notFoundCar')}
                      </p>
                      <a href="tel:+998901234567" className="text-blue-400 font-light hover:text-blue-300">
                        +998 90 123 45 67
                      </a>
                    </div>
                  </div>
              )}

              {/*{activeTab === 'reviews' && (*/}
              {/*    <div className="space-y-6">*/}
              {/*      {currentProduct.reviewsList.map((review, i) => (*/}
              {/*          <motion.div*/}
              {/*              key={i}*/}
              {/*              initial={{ opacity: 0, y: 20 }}*/}
              {/*              animate={{ opacity: 1, y: 0 }}*/}
              {/*              transition={{ delay: i * 0.1 }}*/}
              {/*              className="bg-gray-950 border border-gray-800 p-6"*/}
              {/*          >*/}
              {/*            <div className="flex justify-between items-start mb-3">*/}
              {/*              <div>*/}
              {/*                <h4 className="font-light text-white">{review.user}</h4>*/}
              {/*                <div className="flex text-white text-sm">*/}
              {/*                  {[...Array(5)].map((_, i) => (*/}
              {/*                      <Star key={i} className={`w-4 h-4 ${i < review.rating ? 'fill-current' : ''}`} />*/}
              {/*                  ))}*/}
              {/*                </div>*/}
              {/*              </div>*/}
              {/*              <span className="text-sm text-gray-500">{review.date}</span>*/}
              {/*            </div>*/}
              {/*            <p className="text-gray-400 font-light">{review.text}</p>*/}
              {/*          </motion.div>*/}
              {/*      ))}*/}
              {/*      <button className="w-full py-3 border border-gray-700 text-gray-500 hover:text-white hover:bg-gray-900 transition-all">*/}
              {/*        {t('productDetail.showAllReviews')}*/}
              {/*      </button>*/}
              {/*    </div>*/}
              {/*)}*/}
            </div>
          </div>
        </div>
      </div>
  )
}