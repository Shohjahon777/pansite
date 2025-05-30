'use client'

import { useState } from 'react'
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
  MapPin
} from 'lucide-react'
import { useTranslation } from '../../../hooks/useTranslation'
import { productDetailLocales } from './productDetail'

export default function ProductDetailPage() {
  const params = useParams()
  const [activeTab, setActiveTab] = useState('features')
  const { t } = useTranslation(productDetailLocales)
  
  const products = {
    'dx91': {
      name: 'Pandora DX-91',
      price: 250,
      rating: 4.7,
      reviewsCount: 156,
      description: t('productDetail.products.dx91.description'),
      icon: Shield,
      features: {
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
      },
      compatibility: [
        'Toyota (Camry, Corolla, RAV4, Land Cruiser)',
        'Chevrolet (Malibu, Tracker, Tahoe)',
        'Kia (K5, Sportage, Sorento)',
        'Hyundai (Sonata, Tucson, Santa Fe)',
        t('productDetail.compatibility.more500')
      ],
      reviewsList: [
        { 
          user: 'Андрей П.', 
          rating: 5, 
          text: 'Отличная сигнализация, работает без нареканий уже год', 
          date: '15.05.2025',
          verified: true
        },
        { 
          user: 'Мария К.', 
          rating: 4, 
          text: 'Хорошее качество, но настройка заняла время', 
          date: '10.05.2025',
          verified: true
        }
      ]
    },
    'dx4gs': {
      name: 'Pandora DX-4GS',
      price: 350,
      rating: 4.8,
      reviewsCount: 203,
      description: t('productDetail.products.dx4gs.description'),
      icon: Smartphone,
      features: {
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
      },
      compatibility: [
        t('productDetail.compatibility.modernCan'),
        t('productDetail.compatibility.support1000')
      ],
      reviewsList: [
        { 
          user: 'Виктор С.', 
          rating: 5, 
          text: 'Управление со смартфона - это удобно!', 
          date: '20.05.2025',
          verified: true
        }
      ]
    },
    'dxl5000': {
      name: 'Pandora DXL-5000',
      price: 550,
      rating: 4.9,
      reviewsCount: 89,
      description: t('productDetail.products.dxl5000.description'),
      icon: Cpu,
      features: {
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
      },
      compatibility: [
        t('productDetail.compatibility.premiumAll'),
        t('productDetail.compatibility.100percent')
      ],
      reviewsList: [
        { 
          user: 'Павел М.', 
          rating: 5, 
          text: 'Премиум во всем! Метка очень удобна', 
          date: '22.05.2025',
          verified: true
        }
      ]
    }
  }
  
  const product = products[params.id] || products['dx91']
  const Icon = product.icon
  
  return (
    <div className="page-container min-h-screen bg-black">
      <div className="max-w-7xl mx-auto px-4 py-20">
        {/* Breadcrumbs */}
        <div className="flex items-center space-x-2 text-sm text-gray-500 mb-6">
          <Link href="/" className="hover:text-white transition-colors">{t('productDetail.breadcrumbs.home')}</Link>
          <span>/</span>
          <Link href="/products" className="hover:text-white transition-colors">{t('productDetail.breadcrumbs.products')}</Link>
          <span>/</span>
          <span className="text-gray-300">{product.name}</span>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Image */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <div className="bg-gradient-to-br from-gray-900 to-gray-950 border border-gray-800 p-16 flex items-center justify-center">
              <Icon className="w-48 h-48 text-gray-700" strokeWidth={0.5} />
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
            <h1 className="text-4xl font-thin text-white mb-4">{product.name}</h1>
            <div className="flex items-center space-x-4 mb-6">
              <div className="flex text-white">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className={`w-5 h-5 ${i < Math.floor(product.rating) ? 'fill-current' : ''}`} />
                ))}
              </div>
              <span className="text-gray-400">{product.rating} ({product.reviewsCount} {t('productDetail.reviews')})</span>
            </div>
            
            <p className="text-gray-400 mb-8 font-light">{product.description}</p>
            
            <div className="bg-gray-950 border border-gray-800 p-6 mb-6">
              <div className="text-4xl font-thin text-white mb-2">${product.price}</div>
              <p className="text-gray-500 mb-4">{t('productDetail.or')} ${Math.round(product.price/12)}/{t('productDetail.month')}</p>
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
                {tab === 'reviews' && `${t('productDetail.tabs.reviews')} (${product.reviewsList.length})`}
              </button>
            ))}
          </div>
          
          <div className="py-8">
            {activeTab === 'features' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="font-light text-lg mb-4 text-white">{t('productDetail.mainFeatures')}</h3>
                  <ul className="space-y-3">
                    {product.features.main.map((feature, i) => (
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
                    {Object.entries(product.features.technical).map(([key, value]) => (
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
                  {product.compatibility.map((item, i) => (
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
            
            {activeTab === 'reviews' && (
              <div className="space-y-6">
                {product.reviewsList.map((review, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="bg-gray-950 border border-gray-800 p-6"
                  >
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h4 className="font-light text-white">{review.user}</h4>
                        <div className="flex text-white text-sm">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className={`w-4 h-4 ${i < review.rating ? 'fill-current' : ''}`} />
                          ))}
                        </div>
                      </div>
                      <span className="text-sm text-gray-500">{review.date}</span>
                    </div>
                    <p className="text-gray-400 font-light">{review.text}</p>
                  </motion.div>
                ))}
                <button className="w-full py-3 border border-gray-700 text-gray-500 hover:text-white hover:bg-gray-900 transition-all">
                  {t('productDetail.showAllReviews')}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}