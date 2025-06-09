'use client'

import {useState, useEffect, useRef} from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { 
  Users, 
  Building2, 
  Map, 
  Star, 
  Clock, 
  Phone,
  X,
  Filter,
  MapPin,
  Award,
  Calendar,
  User
} from 'lucide-react'
import { useTranslation } from '../../hooks/useTranslation'
import { serviceLocales } from './service'
import {useLanguageStore} from "@/src/store/language";
import axios from "axios";

export default function ServicePage() {
  const [activeTab, setActiveTab] = useState('masters')
  const [selectedRegion, setSelectedRegion] = useState('all')
  const [selectedMaster, setSelectedMaster] = useState(null)
  const [showBooking, setShowBooking] = useState(false)
  const [dealers, setDealers] = useState([])
  const [masters, setMasters] = useState([])
  const [regions, setRegions] = useState([])
  const [points, setPoints] = useState([])
  const mapRef = useRef(null)
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const [mapLoaded, setMapLoaded] = useState(false);
  const { t } = useTranslation(serviceLocales)
  const {currentLocale} = useLanguageStore()




  // {
  //   "name": "G'iyosiddin To'xtamurodov",
  //     "phone": "939692207",
  //     "experience": "5",
  //     "specialization": "Установка",
  //     "region_name": "Toshkent shahar",
  //     "responsetime": "30",
  //     "img": "/b/core/m$load_image?sha=",
  //     "id": "13",
  //     "schedule": [
  //   "Пн,Вт,Ср,Чт,Пт,Сб: 09:00-18:00",
  //   "Вс: 10:00-22:00"
  // ]
  // },


  // const masters = [
  //   {
  //     id: 'aleksey-kirillov',
  //     name: 'Алексей Кириллов',
  //     avatar: null, // З
  //     rating: 4.8,
  //     reviewsCount: 156,
  //     installations: 483,
  //     region: 'Ташкент',
  //     experience: '8 лет',
  //     specialization: ['Премиум системы', 'GSM модули'],
  //     responseTime: '30 мин',
  //     badges: ['top', 'fast'],
  //     schedule: ['Пн-Пт: 9:00-19:00', 'Сб: 10:00-17:00'],
  //     phone: '+998 90 123 45 67'
  //   },
  //   {
  //     id: 'sergey-mihaylov',
  //     name: 'Сергей Михайлов',
  //     avatar: null, // Здесь будет URL фото
  //     rating: 4.9,
  //     reviewsCount: 142,
  //     installations: 392,
  //     region: 'Ташкент',
  //     experience: '6 лет',
  //     specialization: ['Все типы систем'],
  //     responseTime: '15 мин',
  //     badges: ['certified'],
  //     schedule: ['Пн-Сб: 8:00-20:00'],
  //     phone: '+998 90 987 65 43'
  //   }
  // ]

  useEffect(() => {
     fetchDealers()
     fetchMasters()
     fetchRegions()
     fetchCoords()
  }, [currentLocale]);

  const fetchDealers = async () => {
    try {
      const response = await axios.post('/api/get-dealers', { locale: currentLocale, filial_id: 3630393 });
      if (response.status !== 200) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      setDealers(response.data);
      console.log()
    } catch (error) {
      console.error('Error fetching dealers:', error);
    }
  };


  const fetchMasters = async () => {
    try {
      const response = await axios.post('/api/get-masters', { locale: currentLocale, filial_id: 3630393 });
      if (response.status !== 200) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      setMasters(response.data);
    } catch (error) {
      console.error('Error fetching masters:', error);
    }
  };

  const fetchRegions = async () => {
    try {
      const response = await axios.post('/api/get-regions', { locale: currentLocale});
      if (response.status !== 200) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      setRegions(response.data);
    } catch (error) {
      console.error('Error fetching regions:', error);
    }
  };
  
  // const dealers = [
  //   {
  //     id: 1,
  //     name: 'АвтоПро Центр',
  //     rating: 4.8,
  //     reviewsCount: 234,
  //     address: 'Ташкент, ул. Амира Темура, 12',
  //     phone: '+998 71 123 45 67',
  //     workHours: 'Пн-Сб: 9:00-19:00',
  //     services: ['Установка', 'Гарантийное обслуживание', 'Диагностика']
  //   }
  // ]
  
  const filteredMasters = selectedRegion === 'all' 
    ? masters 
    : masters.filter(m => m.region === selectedRegion)

  const fetchCoords = async () => {
    try {
      const response = await axios.post('/api/get-dealer-coords', { locale: currentLocale });
      if (response.status !== 200) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      setPoints(response.data);
    } catch (error) {
      console.error('Error fetching dealer coordinates:', error);
    }
  }

  const transformDealerData = (dealers) => {
    if (!dealers || !Array.isArray(dealers)) {
      return [];
    }

    return dealers
        .map(dealer => {
          if (!dealer.coords || !Array.isArray(dealer.coords) || dealer.coords.length === 0) {
            return null;
          }

          const coordString = dealer.coords[0]?.trim();
          if (!coordString) return null;

          const [latStr, lngStr] = coordString.split(',');
          const lat = parseFloat(latStr?.trim());
          const lng = parseFloat(lngStr?.trim());

          if (isNaN(lat) || isNaN(lng)) return null;
          if (lat < -90 || lat > 90 || lng < -180 || lng > 180) return null;

          return {
            coords: [lat, lng],
            name: dealer.name,
            type: dealer.type
          };
        })
        .filter(Boolean);
  };

  useEffect(() => {
    if (points && points.length > 0 && currentLocale) {
      setIsDataLoaded(true);
    }
  }, [points, currentLocale]);

  const initializeMap = () => {
    if (!window.ymaps || !isDataLoaded) {
      console.error('Yandex Maps API not loaded or data not ready');
      return;
    }

    window.ymaps.ready(() => {
      const mapContainer = document.getElementById('service-map');
      console.clear()

      const transformedPoints = transformDealerData(points);
      console.log('Transformed points:', transformedPoints);

      if (!mapContainer) {
        console.error('Map container not found');
        return;
      }

      if (mapRef.current) {
        mapRef.current.destroy();
      }

      const map = new window.ymaps.Map('service-map', {
        center: [41.311081, 69.240562],
        zoom: 12,
        controls: ['zoomControl', 'fullscreenControl']
      });

      mapRef.current = map;

      // Only add points if they exist
      if (transformedPoints.length > 0) {
        transformedPoints.forEach(point => {
          const placemark = new window.ymaps.Placemark(
              point.coords,
              {
                hintContent: point.name,
                balloonContent: `<strong>${point.name}</strong><br/>${point.type === 'dealer' ? 'Дилерский центр' : 'Сертифицированный мастер'}`
              },
              {
                preset: point.type === 'dealer' ? 'islands#darkBlueIcon' : 'islands#redIcon'
              }
          );
          map.geoObjects.add(placemark);
        });
      }
    });
  };
  
  // Инициализация карты
  useEffect(() => {
    if (activeTab === 'map') {
      if (isDataLoaded) {
        const loadYandexMaps = () => {
          if (window.ymaps) {
            initializeMap();
            return;
          }

          if (document.querySelector('script[src*="api-maps.yandex.ru"]')) {
            const checkReady = () => {
              if (window.ymaps) {
                initializeMap();
              } else {
                setTimeout(checkReady, 100);
              }
            };
            checkReady();
            return;
          }

          const script = document.createElement('script');
          script.src = 'https://api-maps.yandex.ru/2.1/?apikey=YOUR_API_KEY&lang=ru_RU';
          script.async = true;
          script.onload = () => {
            setMapLoaded(true);
            initializeMap();
          };
          script.onerror = (error) => {
            console.error('Failed to load Yandex Maps API:', error);
          };
          document.head.appendChild(script);
        };

        loadYandexMaps();
      }

      // Cleanup function
      return () => {
        if (mapRef.current) {
          try {
            mapRef.current.destroy();
          } catch (error) {
            console.error('Error destroying map:', error);
          }
        }
      };
    }
  }, [activeTab, isDataLoaded])

  useEffect(() => {
    if (mapRef.current && window.ymaps && points.length > 0 && isDataLoaded) {
      mapRef.current.geoObjects.removeAll();

      const transformedPoints = transformDealerData(points);
      transformedPoints.forEach(point => {
        const placemark = new window.ymaps.Placemark(
            point.coords,
            {
              hintContent: point.name,
              balloonContent: `<strong>${point.name}</strong><br/>${point.type === 'dealer' ? 'Дилерский центр' : 'Сертифицированный мастер'}`
            },
            {
              preset: point.type === 'dealer' ? 'islands#darkBlueIcon' : 'islands#redIcon'
            }
        );
        mapRef.current.geoObjects.add(placemark);
      });
    }
  }, [points, isDataLoaded]);
  
  return (
    <div className="page-container min-h-screen bg-black">
      <div className="max-w-7xl mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl font-thin text-white mb-4">
            {t('service.title')}
          </h1>
          <p className="text-xl text-gray-500 font-light">
            {t('service.subtitle')}
          </p>
        </motion.div>
        
        {/* Tabs */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex border border-gray-800 p-1">
            {[
              { value: 'masters', label: t('service.tabs.masters'), icon: Users },
              { value: 'dealers', label: t('service.tabs.dealers'), icon: Building2 },
              { value: 'map', label: t('service.tabs.map'), icon: Map }
            ].map(tab => (
              <button
                key={tab.value}
                onClick={() => setActiveTab(tab.value)}
                className={`px-6 py-3 transition-all flex items-center gap-2 ${
                  activeTab === tab.value
                    ? 'bg-white text-black'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                <tab.icon className="w-4 h-4" />
                <span className="font-light text-sm">{tab.label}</span>
              </button>
            ))}
          </div>
        </div>
        
        {/* Region Filter */}
          {activeTab !== 'map' && (
              <div className="flex justify-center mb-8">
                  <select
                      value={selectedRegion}
                      onChange={e => setSelectedRegion(e.target.value)}
                      className="px-6 py-2 bg-gray-950 border border-gray-800 text-gray-300 focus:border-gray-700 focus:outline-none"
                  >
                      {regions.map(region => (
                          <option key={region.region_id} value={region.region_id}>
                              {region.region_name}
                          </option>
                      ))}
                  </select>
              </div>
          )}


          {/* Masters List */}
        {activeTab === 'masters' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredMasters.map((master, i) => (
              <motion.div
                key={master.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="bg-gray-950 border border-gray-800 hover:border-gray-700 transition-all"
              >
                <div className="p-6">
                  {/* Header with photo */}
                  <div className="flex gap-4 mb-4">
                    {/* Photo placeholder */}
                    <div className="w-16 h-16 bg-gray-900 border border-gray-800 flex items-center justify-center flex-shrink-0">
                      {master.avatar ? (
                        <img 
                          src={`${master.avatar}`}
                          alt={master.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <User className="w-8 h-8 text-gray-700" />
                      )}
                    </div>
                    
                    <div className="flex-1">
                      <Link href={`/service/${master.id}`}>
                        <h3 className="font-light text-xl text-white hover:text-gray-300 transition-colors">
                          {master.name}
                        </h3>
                      </Link>
                      <p className="text-gray-500 text-sm">{master.region}</p>
                      <div className="flex items-center gap-1 text-white mt-1">
                        <Star className="w-4 h-4 fill-current" />
                        <span className="font-light text-sm">{master.rating}</span>
                        <span className="text-xs text-gray-500">({master.reviewsCount})</span>
                      </div>
                    </div>
                  </div>
                  
                  {/*<div className="flex flex-wrap gap-2 mb-4">*/}
                  {/*  {master.badges.includes('top') && (*/}
                  {/*    <span className="text-xs px-3 py-1 border border-gray-700 text-gray-400">*/}
                  {/*      {t('service.badges.topMaster')}*/}
                  {/*    </span>*/}
                  {/*  )}*/}
                  {/*  {master.badges.includes('fast') && (*/}
                  {/*    <span className="text-xs px-3 py-1 border border-gray-700 text-gray-400">*/}
                  {/*      {t('service.badges.fastInstall')}*/}
                  {/*    </span>*/}
                  {/*  )}*/}
                  {/*  {master.badges.includes('certified') && (*/}
                  {/*    <span className="text-xs px-3 py-1 border border-gray-700 text-gray-400">*/}
                  {/*      {t('service.badges.certified')}*/}
                  {/*    </span>*/}
                  {/*  )}*/}
                  {/*</div>*/}
                  
                  <div className="space-y-3 mb-6 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-500">{t('service.experience')}:</span>
                      <span className="text-gray-300">{master.experience}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">{t('service.installations')}:</span>
                      <span className="text-gray-300">{master.installations}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">{t('service.response')}:</span>
                      <span className="text-gray-300">{master.responseTime}</span>
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <p className="text-xs text-gray-500 mb-2">{t('service.specialization')}:</p>
                    <div className="flex flex-wrap gap-1">
                      {master.specialization.map(spec => (
                          <span className="text-xs px-2 py-1 bg-gray-900 text-gray-400">
                          {spec}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <button
                      onClick={() => {
                        setSelectedMaster(master)
                        setShowBooking(true)
                      }}
                      className="w-full bg-white text-black py-2 hover:bg-gray-100 transition-colors text-sm font-medium"
                    >
                      {t('service.book')}
                    </button>
                    <Link
                      href={`/service/${master.id}`}
                      className="block w-full text-center border border-gray-700 text-gray-300 py-2 hover:bg-gray-900 hover:text-white transition-all text-sm"
                    >
                      {t('service.details')}
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
        
        {/* Dealers List */}
        {activeTab === 'dealers' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {dealers.map((dealer, i) => (
              <motion.div
                key={dealer.dealer_id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="bg-gray-950 border border-gray-800 p-6"
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="font-light text-xl text-white">{dealer.name}</h3>
                    <p className="text-gray-500 text-sm">{dealer.address}</p>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-1 text-white">
                      <Star className="w-4 h-4 fill-current" />
                      <span>{dealer.rating}</span>
                    </div>
                    <p className="text-xs text-gray-500">{dealer.reviewsCount} отзывов</p>
                  </div>
                </div>
                
                <div className="space-y-2 mb-6 text-sm">
                  <div className="flex items-center gap-2 text-gray-400">
                    <Phone className="w-4 h-4" />
                    <span>{dealer.phone}</span>
                  </div>
                  {/*<div className="flex items-center gap-2 text-gray-400">*/}
                  {/*  <Clock className="w-4 h-4" />*/}
                  {/*  <span>{dealer.workHours}</span>*/}
                  {/*</div>*/}
                  <div className="flex items-center gap-2 text-gray-400">
                    <MapPin className="w-4 h-4" />
                    <span className="text-xs">{dealer.address}</span>
                  </div>
                </div>
                
                {/*<div className="mb-6">*/}
                {/*  <p className="text-sm text-gray-500 mb-2">{t('service.services')}:</p>*/}
                {/*  <div className="flex flex-wrap gap-1">*/}
                {/*    {dealer.services.map((service, j) => (*/}
                {/*      <span key={j} className="text-xs px-2 py-1 bg-gray-900 text-gray-400">*/}
                {/*        {service}*/}
                {/*      </span>*/}
                {/*    ))}*/}
                {/*  </div>*/}
                {/*</div>*/}
                
                <div className="flex gap-2">
                  <button className="flex-1 bg-white text-black py-2 hover:bg-gray-100 transition-colors text-sm font-medium">
                    {t('service.book')}
                  </button>
                  <a href={`tel:${dealer.phone}`} className="px-4 py-2 border border-gray-700 text-gray-300 hover:bg-gray-900 transition-all">
                    <Phone className="w-4 h-4" />
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        )}
        
        {/* Map */}
        {activeTab === 'map' && (
          <div className="bg-gray-950 border border-gray-800 overflow-hidden">
            <div id="service-map" className="w-full h-[600px] bg-gray-900 flex items-center justify-center">
            </div>
          </div>
        )}
      </div>
      
      {/* Booking Modal */}
      <AnimatePresence>
        {showBooking && selectedMaster && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50"
            onClick={() => setShowBooking(false)}
          >
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              className="bg-gray-950 border border-gray-800 p-8 max-w-md w-full"
              onClick={e => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-light text-white">{t('service.bookingTitle')}</h2>
                <button
                  onClick={() => setShowBooking(false)}
                  className="text-gray-500 hover:text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <p className="text-gray-400 mb-6">{t('service.master')}: {selectedMaster.name}</p>
              
              <form className="space-y-4">
                <input 
                  type="text" 
                  placeholder={t('service.form.name')} 
                  className="w-full px-4 py-3 bg-black border border-gray-800 text-white placeholder-gray-600 focus:border-gray-700 focus:outline-none"
                />
                <input 
                  type="tel" 
                  placeholder={t('service.form.phone')} 
                  className="w-full px-4 py-3 bg-black border border-gray-800 text-white placeholder-gray-600 focus:border-gray-700 focus:outline-none"
                />
                <input 
                  type="date" 
                  className="w-full px-4 py-3 bg-black border border-gray-800 text-white focus:border-gray-700 focus:outline-none"
                />
                <select className="w-full px-4 py-3 bg-black border border-gray-800 text-white focus:border-gray-700 focus:outline-none">
                  <option>9:00 - 11:00</option>
                  <option>11:00 - 13:00</option>
                  <option>14:00 - 16:00</option>
                  <option>16:00 - 18:00</option>
                </select>
                <button 
                  type="submit" 
                  className="w-full bg-white text-black py-3 hover:bg-gray-100 transition-colors font-medium"
                >
                  {t('service.form.submit')}
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}