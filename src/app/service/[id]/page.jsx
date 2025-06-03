'use client'

import { useState, useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Link from 'next/link'
import { useParams, useRouter } from 'next/navigation'
import { 
  ChevronLeft,
  Star, 
  Clock, 
  Phone,
  MapPin,
  Calendar,
  CheckCircle,
  Award,
  User,
  Briefcase,
  MessageSquare,
  TrendingUp,
  Shield,
  Zap,
  DollarSign,
  X,
  Camera
} from 'lucide-react'
import { useTranslation } from '../../../hooks/useTranslation'
import { masterDetailLocales } from './masterDetail'
import {useLanguageStore} from "@/src/store/language";
import axios from "axios";

export default function MasterDetailPage() {
  const params = useParams()
  const router = useRouter()
  const [master, setMaster] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [activeTab, setActiveTab] = useState('about')
  const [showBooking, setShowBooking] = useState(false)
  const [selectedService, setSelectedService] = useState(null)
  const [regions, setRegions] = useState([]);

    // const [mastersDB, setMastersDB] = useState([])
  const { t } = useTranslation(masterDetailLocales)
  const {currentLocale} = useLanguageStore()
  const mainUrl = process.env.NEXT_PUBLIC_API_URL


    const fetchRegions = async () => {
        try {
            const response = await axios.post('/api/get-regions', { locale: currentLocale });
            if (response.status !== 200) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            setRegions(response.data);
        } catch (error) {
            console.error('Error fetching regions:', error);
        }
    };

    useEffect(() => {
        fetchRegions();
    }, [currentLocale]);



    const transformMasterData = (apiData) => {
        if (!apiData || apiData.length === 0) return null;

        const masterData = apiData[0];

        const parseSchedule = (scheduleArray) => {
            const schedule = {};
            if (scheduleArray && scheduleArray.length > 0) {
                const scheduleStr = scheduleArray[0];
                if (scheduleStr && scheduleStr !== '-') {
                    const parts = scheduleStr.split(': ');
                    if (parts.length === 2) {
                        const days = parts[0].split(',');
                        const time = parts[1];
                        days.forEach(day => {
                            schedule[day.trim()] = time;
                        });
                    }
                }
            }

            if (Object.keys(schedule).length === 0) {
                schedule['Пн-Пт'] = '9:00-18:00';
                schedule['Сб'] = '10:00-17:00';
                schedule['Вс'] = 'Выходной';
            }

            return schedule;
        };

        const getRegionName = (regionId) => {
            const region = regions.find(r => r.region_id === regionId);
            return region ? region.region_name : 'Не указан';
        };


        return {
            id: masterData.id,
            name: masterData.name || 'Не указано',
            avatar: masterData.avatar || null,
            rating: 4.5, // Default rating as API doesn't provide this
            reviewsCount: 0, // Default as API doesn't provide this
            installations: 0, // Default as API doesn't provide this
            region: getRegionName(masterData.region),
            experience: masterData.experience || 'Не указан',
            specialization: masterData.specialization ?
                masterData.specialization.split(',').map(s => s.trim()) :
                ['Установка сигнализаций', 'Настройка систем'],
            responseTime: masterData.responsetime || '1 час',
            badges: [
                { id: 'certified', name: t('masterDetail.badges.certified'), icon: Shield }
            ],
            schedule: parseSchedule(masterData.schedule),
            phone: masterData.phone ? `+998 ${masterData.phone}` : 'Не указан',
            about: 'Профессиональный установщик автосигнализаций с большим опытом работы.',
            services: [
                {
                    id: 1,
                    name: 'Установка Pandora DX-91',
                    price: 50,
                    time: '2 часа',
                    description: 'Базовая установка с настройкой всех функций'
                },
                {
                    id: 2,
                    name: 'Установка Pandora DX-4GS',
                    price: 70,
                    time: '2.5 часа',
                    description: 'Установка с подключением GSM модуля и настройкой приложения'
                }
            ],
            gallery: [], // Empty by default as API doesn't provide gallery
            stats: {
                satisfaction: 95,
                onTime: 90,
                warranty: 100,
                repeatClients: 80
            },
            reviews: [], // Empty by default as API doesn't provide reviews
            certificates: []
        };
    };

    const fetchMaster = async () => {
        try {
            setLoading(true);
            const response = await axios.post('/api/get-master-info', {
                locale: currentLocale,
                id: params.id
            });

            if (response.status !== 200) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const transformedData = transformMasterData(response.data);

            if (!transformedData) {
                throw new Error('Master not found');
            }

            setMaster(transformedData);
            setError(null);
        } catch (error) {
            console.error('Error fetching master:', error);
            setError(error.message || 'Failed to load master information');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (params.id) {
            fetchMaster();
        }
    }, [params.id, currentLocale]);

  const mastersDB = {
    'aleksey-kirillov': {
      id: 'aleksey-kirillov',
      name: 'Алексей Кириллов',
      avatar: null, // URL фото будет здесь
      rating: 4.8,
      reviewsCount: 156,
      installations: 483,
      region: 'Ташкент',
      experience: '8 лет',
      specialization: ['Премиум системы', 'GSM модули', 'Сложные установки'],
      responseTime: '30 мин',
      badges: [
        { id: 'top', name: t('masterDetail.badges.topMaster'), icon: Award },
        { id: 'fast', name: t('masterDetail.badges.fastInstall'), icon: Zap },
        { id: 'certified', name: t('masterDetail.badges.certified'), icon: Shield }
      ],
      schedule: {
        'Пн-Пт': '9:00-19:00',
        'Сб': '10:00-17:00',
        'Вс': 'Выходной'
      },
      phone: '+998 90 123 45 67',
      about: 'Профессиональный установщик с большим опытом работы. Специализируюсь на премиальных системах Pandora. Работаю с любыми автомобилями, включая редкие модели.',
      services: [
        {
          id: 1,
          name: 'Установка Pandora DX-91',
          price: 50,
          time: '2 часа',
          description: 'Базовая установка с настройкой всех функций'
        },
        {
          id: 2,
          name: 'Установка Pandora DX-4GS',
          price: 70,
          time: '2.5 часа',
          description: 'Установка с подключением GSM модуля и настройкой приложения'
        },
        {
          id: 3,
          name: 'Установка Pandora DXL-5000',
          price: 100,
          time: '3 часа',
          description: 'Премиальная установка с полной интеграцией'
        }
      ],
      gallery: [
        { id: 1, url: null, description: 'Установка на Toyota Camry' },
        { id: 2, url: null, description: 'Работа с проводкой' },
        { id: 3, url: null, description: 'Настройка системы' },
        { id: 4, url: null, description: 'Готовая работа' }
      ],
      stats: {
        satisfaction: 98,
        onTime: 95,
        warranty: 100,
        repeatClients: 87
      },
      reviews: [
        {
          id: 1,
          user: 'Андрей П.',
          avatar: null,
          rating: 5,
          date: '20.05.2025',
          text: 'Отличный мастер! Установил сигнализацию быстро и качественно. Все объяснил, показал как пользоваться.',
          product: 'Pandora DX-91',
          verified: true
        },
        {
          id: 2,
          user: 'Мария С.',
          avatar: null,
          rating: 5,
          date: '15.05.2025',
          text: 'Профессионал своего дела. Работа выполнена аккуратно, провода спрятаны. Рекомендую!',
          product: 'Pandora DX-4GS',
          verified: true
        },
        {
          id: 3,
          user: 'Виктор К.',
          avatar: null,
          rating: 4,
          date: '10.05.2025',
          text: 'Хорошая работа, но пришлось немного подождать из-за загруженности мастера.',
          product: 'Pandora DXL-5000',
          verified: true
        }
      ],
      certificates: [
        { id: 1, name: 'Сертификат Pandora', year: '2023' },
        { id: 2, name: 'Повышение квалификации', year: '2024' }
      ]
    },
  }
  
  // Инициализация карты
  useEffect(() => {
    if (activeTab === 'location' && master) {
      const script = document.createElement('script')
      script.src = 'https://api-maps.yandex.ru/2.1/?apikey=YOUR_API_KEY&lang=ru_RU'
      script.async = true
      script.onload = () => {
        window.ymaps.ready(() => {
          const map = new window.ymaps.Map('master-map', {
            center: [41.311081, 69.240562],
            zoom: 14,
            controls: ['zoomControl', 'fullscreenControl']
          })
          
          const placemark = new window.ymaps.Placemark(
            [41.311081, 69.240562],
            {
              hintContent: master.name,
              balloonContent: `<strong>${master.name}</strong><br/>📱 ${master.phone}`
            }
          )
          map.geoObjects.add(placemark)
        })
      }
      document.body.appendChild(script)
      
      return () => {
        if (script.parentNode) {
          script.parentNode.removeChild(script)
        }
      }
    }
  }, [activeTab, master])
  
  if (loading) {
    return (
      <div className="page-container min-h-screen bg-black flex items-center justify-center">
       
      </div>
    )
  }
  
  if (error) {
    return (
      <div className="page-container min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-thin mb-4 text-white">{t('masterDetail.notFound')}</h1>
          <p className="text-gray-500 mb-6">{error}</p>
          <Link href="/service" className="bg-white text-black px-6 py-3 hover:bg-gray-100 transition-colors">
            {t('masterDetail.allMasters')}
          </Link>
        </div>
      </div>
    )
  }
  
  return (
    <div className="page-container min-h-screen bg-black">
      <div className="max-w-7xl mx-auto px-4 py-20">
        {/* Breadcrumbs */}
        <div className="flex items-center space-x-2 text-sm text-gray-500 mb-6">
          <Link href="/" className="hover:text-white transition-colors">{t('masterDetail.breadcrumbs.home')}</Link>
          <span>/</span>
          <Link href="/service" className="hover:text-white transition-colors">{t('masterDetail.breadcrumbs.masters')}</Link>
          <span>/</span>
          <span className="text-gray-300">{master.name}</span>
        </div>
        
        {/* Main Info */}
        <div className="bg-gray-950 border border-gray-800 p-8 mb-8">
          <div className="flex flex-col md:flex-row gap-8">
            <div className="flex-1">
              <div className="flex items-start gap-6">
                {/* Avatar */}
                <div className="w-32 h-32 bg-gray-900 border border-gray-800 flex items-center justify-center flex-shrink-0">
                  {master.avatar ? (
                    <img 
                      src={`${mainUrl}/${master.avatar}`}
                      alt={master.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <User className="w-16 h-16 text-gray-700" />
                  )}
                </div>
                
                <div className="flex-1">
                  <h1 className="text-3xl font-thin text-white mb-2">{master.name}</h1>
                  <div className="flex items-center gap-4 mb-4">
                    <div className="flex items-center gap-1">
                      <Star className="w-5 h-5 fill-white text-white" />
                      <span className="font-light text-white text-lg">{master.rating}</span>
                      <span className="text-gray-500">({master.reviewsCount} {t('masterDetail.reviews')})</span>
                    </div>
                    <span className="text-gray-600">•</span>
                    <span className="text-gray-400">{master.region}</span>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 mb-6">
                    {master.badges.map((badge) => (
                      <span key={badge.id} className="flex items-center gap-2 px-3 py-1 border border-gray-700 text-gray-400 text-sm">
                        <badge.icon className="w-4 h-4" />
                        {badge.name}
                      </span>
                    ))}
                  </div>
                  
                  <p className="text-gray-400 font-light">{master.about}</p>
                </div>
              </div>
              
              {/* Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
                <div className="text-center p-4 bg-gray-900 border border-gray-800">
                  <div className="text-2xl font-thin text-white">{master.installations}</div>
                  <div className="text-sm text-gray-500">{t('masterDetail.stats.installations')}</div>
                </div>
                <div className="text-center p-4 bg-gray-900 border border-gray-800">
                  <div className="text-2xl font-thin text-white">{master.experience}</div>
                  <div className="text-sm text-gray-500">{t('masterDetail.stats.experience')}</div>
                </div>
                <div className="text-center p-4 bg-gray-900 border border-gray-800">
                  <div className="text-2xl font-thin text-green-400">{master.responseTime}</div>
                  <div className="text-sm text-gray-500">{t('masterDetail.stats.response')}</div>
                </div>
                <div className="text-center p-4 bg-gray-900 border border-gray-800">
                  <div className="text-2xl font-thin text-blue-400">{master.stats.satisfaction}%</div>
                  <div className="text-sm text-gray-500">{t('masterDetail.stats.satisfaction')}</div>
                </div>
              </div>
            </div>
            
            {/* Contact Card */}
            <div className="md:w-80">
              <div className="bg-gray-900 border border-gray-800 p-6">
                <h3 className="font-light mb-4 text-white">{t('masterDetail.contacts')}</h3>
                <a href={`tel:${master.phone}`} className="flex items-center gap-3 text-white font-light mb-4 hover:text-gray-300 transition-colors">
                  <Phone className="w-5 h-5 text-gray-600" />
                  {master.phone}
                </a>
                <button
                  onClick={() => setShowBooking(true)}
                  className="w-full bg-white text-black py-3 mb-3 hover:bg-gray-100 transition-colors font-medium"
                >
                  {t('masterDetail.book')}
                </button>
                <Link href="/service" className="block w-full text-center border border-gray-700 text-gray-300 py-3 hover:bg-gray-900 transition-all">
                  {t('masterDetail.allMasters')}
                </Link>
              </div>
              
              <div className="mt-4 bg-gray-900 border border-gray-800 p-6">
                <h3 className="font-light mb-3 text-white">{t('masterDetail.schedule')}</h3>
                {Object.entries(master.schedule).map(([day, time]) => (
                  <div key={day} className="flex justify-between text-sm mb-2">
                    <span className="text-gray-500">{day}:</span>
                    <span className="font-light text-gray-300">{time}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        
        {/* Tabs */}
        <div className="flex gap-2 mb-6 overflow-x-auto">
          {['about', 'services', 'reviews', 'gallery', 'location'].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-3 whitespace-nowrap transition-all ${
                activeTab === tab
                  ? 'bg-white text-black'
                  : 'border border-gray-800 text-gray-400 hover:text-white hover:border-gray-700'
              }`}
            >
              {tab === 'about' && t('masterDetail.tabs.about')}
              {tab === 'services' && t('masterDetail.tabs.services')}
              {tab === 'reviews' && `${t('masterDetail.tabs.reviews')} (${master.reviews.length})`}
              {tab === 'gallery' && t('masterDetail.tabs.gallery')}
              {tab === 'location' && t('masterDetail.tabs.location')}
            </button>
          ))}
        </div>
        
        {/* Tab Content */}
        {activeTab === 'about' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gray-950 border border-gray-800 p-6">
              <h3 className="font-light text-lg mb-4 text-white">{t('masterDetail.specialization')}</h3>
              <div className="space-y-2">
                {master.specialization.map((spec, i) => (
                  <div key={i} className="flex items-center text-gray-300">
                    <CheckCircle className="w-4 h-4 text-gray-600 mr-2" />
                    <span className="font-light">{spec}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="bg-gray-950 border border-gray-800 p-6">
              <h3 className="font-light text-lg mb-4 text-white">{t('masterDetail.workIndicators')}</h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm text-gray-500">{t('masterDetail.indicators.satisfaction')}</span>
                    <span className="text-sm font-light text-gray-300">{master.stats.satisfaction}%</span>
                  </div>
                  <div className="w-full bg-gray-900 h-2">
                    <div className="bg-gradient-to-r from-green-700 to-green-600 h-full" style={{ width: `${master.stats.satisfaction}%` }} />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm text-gray-500">{t('masterDetail.indicators.punctuality')}</span>
                    <span className="text-sm font-light text-gray-300">{master.stats.onTime}%</span>
                  </div>
                  <div className="w-full bg-gray-900 h-2">
                    <div className="bg-gradient-to-r from-blue-700 to-blue-600 h-full" style={{ width: `${master.stats.onTime}%` }} />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm text-gray-500">{t('masterDetail.indicators.repeatClients')}</span>
                    <span className="text-sm font-light text-gray-300">{master.stats.repeatClients}%</span>
                  </div>
                  <div className="w-full bg-gray-900 h-2">
                    <div className="bg-gradient-to-r from-purple-700 to-purple-600 h-full" style={{ width: `${master.stats.repeatClients}%` }} />
                  </div>
                </div>
              </div>
            </div>
            
            {master.certificates.length > 0 && (
              <div className="bg-gray-950 border border-gray-800 p-6 md:col-span-2">
                <h3 className="font-light text-lg mb-4 text-white">{t('masterDetail.certificates')}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {master.certificates.map((cert) => (
                    <div key={cert.id} className="flex items-center gap-3 p-3 bg-gray-900 border border-gray-800">
                      <Award className="w-8 h-8 text-gray-600" />
                      <div>
                        <p className="text-gray-300 font-light">{cert.name}</p>
                        <p className="text-sm text-gray-500">{cert.year}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
        
        {activeTab === 'services' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {master.services.map((service, i) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="bg-gray-950 border border-gray-800 p-6"
              >
                <h4 className="font-light text-lg mb-2 text-white">{service.name}</h4>
                <p className="text-sm text-gray-500 mb-4">{service.description}</p>
                <div className="flex justify-between items-end">
                  <div>
                    <p className="text-2xl font-thin text-white">${service.price}</p>
                    <p className="text-sm text-gray-500 flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {service.time}
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      setSelectedService(service)
                      setShowBooking(true)
                    }}
                    className="bg-white text-black px-4 py-2 hover:bg-gray-100 transition-colors"
                  >
                    {t('masterDetail.choose')}
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
        
        {activeTab === 'reviews' && (
          <div className="space-y-4">
            {master.reviews.map((review, i) => (
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
                      {review.avatar ? (
                        <img 
                          src={review.avatar} 
                          alt={review.user}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <User className="w-6 h-6 text-gray-700" />
                      )}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-light text-white">{review.user}</h4>
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
                  <span className="text-sm text-gray-500">{review.date}</span>
                </div>
                <p className="text-gray-300 mb-2 font-light">{review.text}</p>
                {review.product && (
                  <span className="text-sm text-gray-500">{t('masterDetail.installedSystem')}: {review.product}</span>
                )}
              </motion.div>
            ))}
            <Link href="/reviews" className="block w-full text-center py-3 border border-gray-700 text-gray-400 hover:text-white hover:bg-gray-900 transition-all">
              {t('masterDetail.allReviewsAboutMaster')}
            </Link>
          </div>
        )}
        
        {activeTab === 'gallery' && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {master.gallery.length > 0 ? (
              master.gallery.map((item, i) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-gray-950 border border-gray-800 aspect-square flex items-center justify-center relative group cursor-pointer"
                >
                  {item.url ? (
                    <img 
                      src={item.url} 
                      alt={item.description}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <Camera className="w-12 h-12 text-gray-700" />
                  )}
                  {item.description && (
                    <div className="absolute bottom-0 left-0 right-0 bg-black/80 p-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <p className="text-xs text-gray-300">{item.description}</p>
                    </div>
                  )}
                </motion.div>
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <Camera className="w-16 h-16 text-gray-700 mx-auto mb-4" />
                <p className="text-gray-500">{t('masterDetail.noPhotos')}</p>
              </div>
            )}
          </div>
        )}
        
        {activeTab === 'location' && (
          <div className="bg-gray-950 border border-gray-800 p-6">
            <div id="master-map" className="w-full h-[400px] bg-gray-900 mb-4"></div>
            <p className="text-gray-400 font-light">{t('masterDetail.masterWorksIn')} {master.region}</p>
          </div>
        )}
      </div>
      
      {/* Booking Modal */}
      <AnimatePresence>
        {showBooking && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50"
            onClick={() => {
              setShowBooking(false)
              setSelectedService(null)
            }}
          >
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              className="bg-gray-950 border border-gray-800 p-8 max-w-md w-full"
              onClick={e => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-thin text-white">{t('masterDetail.bookingTitle')}</h2>
                <button
                  onClick={() => {
                    setShowBooking(false)
                    setSelectedService(null)
                  }}
                  className="text-gray-500 hover:text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <div className="mb-6">
                <p className="text-gray-400 mb-2">{t('masterDetail.master')}: {master.name}</p>
                {selectedService && (
                  <p className="text-gray-400">{t('masterDetail.service')}: {selectedService.name}</p>
                )}
              </div>
              
              <form className="space-y-4">
                <input 
                  type="text" 
                  placeholder={t('masterDetail.form.name')} 
                  className="w-full px-4 py-3 bg-black border border-gray-800 text-white placeholder-gray-600 focus:border-gray-700 focus:outline-none"
                />
                <input 
                  type="tel" 
                  placeholder={t('masterDetail.form.phone')} 
                  className="w-full px-4 py-3 bg-black border border-gray-800 text-white placeholder-gray-600 focus:border-gray-700 focus:outline-none"
                />
                <input 
                  type="text" 
                  placeholder={t('masterDetail.form.car')} 
                  className="w-full px-4 py-3 bg-black border border-gray-800 text-white placeholder-gray-600 focus:border-gray-700 focus:outline-none"
                />
                {!selectedService && (
                  <select className="w-full px-4 py-3 bg-black border border-gray-800 text-white focus:border-gray-700 focus:outline-none">
                    <option value="">{t('masterDetail.form.chooseService')}</option>
                    {master.services.map((s) => (
                      <option key={s.id} value={s.id}>{s.name} - ${s.price}</option>
                    ))}
                  </select>
                )}
                <input 
                  type="date" 
                  className="w-full px-4 py-3 bg-black border border-gray-800 text-white focus:border-gray-700 focus:outline-none"
                />
                <select className="w-full px-4 py-3 bg-black border border-gray-800 text-white focus:border-gray-700 focus:outline-none">
                  <option>9:00 - 11:00</option>
                  <option>11:00 - 13:00</option>
                  <option>14:00 - 16:00</option>
                  <option>16:00 - 18:00</option>
                  <option>18:00 - 20:00</option>
                </select>
                <textarea
                  placeholder={t('masterDetail.form.comment')}
                  rows="3"
                  className="w-full px-4 py-3 bg-black border border-gray-800 text-white placeholder-gray-600 focus:border-gray-700 focus:outline-none resize-none"
                />
                <button 
                  type="submit" 
                  className="w-full bg-white text-black py-3 hover:bg-gray-100 transition-colors font-medium"
                >
                  {t('masterDetail.form.submit')}
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}