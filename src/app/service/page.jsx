'use client'

import {useState, useEffect, useRef} from 'react'
import {motion, AnimatePresence} from 'framer-motion'
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
    User,
    Search,
    ChevronLeft,
    ChevronRight
} from 'lucide-react'
import {useTranslation} from '../../hooks/useTranslation'
import {serviceLocales} from './service'
import {useLanguageStore} from "@/src/store/language";
import axios from "axios";
import {useAuthGuard} from "@/src/hooks/useAuthGuard";
// import {NotClient} from "@/src/components/NotClient";
// import {NotAuthenticated} from "@/src/components/NotAuthenticated";
import {useRouter} from "next/navigation";
import {useAuthModal} from "@/src/hooks/useAuthModal";
import {useAuth} from "@/src/hooks/useAuth";
import {AuthModal} from "@/src/components/AuthModal";

export default function ServicePage() {
    const [activeTab, setActiveTab] = useState('masters')
    const [selectedRegion, setSelectedRegion] = useState('all')
    const [selectedMaster, setSelectedMaster] = useState('')
    const [showBooking, setShowBooking] = useState(false)
    const [dealers, setDealers] = useState([])
    const [masters, setMasters] = useState([])
    const [regions, setRegions] = useState([])
    const [points, setPoints] = useState([])
    const [products, setProducts] = useState([])
    const mapRef = useRef(null)
    const [isDataLoaded, setIsDataLoaded] = useState(false);
    const [mapLoaded, setMapLoaded] = useState(false);
    const {t} = useTranslation(serviceLocales)
    const {currentLocale} = useLanguageStore()
    const router = useRouter()
    const {isAuthenticated, isClient} = useAuth()


    const [modelQuery, setModelQuery] = useState('');
    const [showModelDropdown, setShowModelDropdown] = useState(false);
    const [selectedModel, setSelectedModel] = useState('');
    const modelInputRef = useRef(null);


    const [selectedDate, setSelectedDate] = useState('');
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [currentMonth, setCurrentMonth] = useState(new Date());
    const dateInputRef = useRef(null);

    const {
        isOpen,
        type,
        config,
        hideAuthModal,
        showNotAuthenticated,
        showNotClient
    } = useAuthModal();




    const filteredModels = products.filter(model =>
        model.name.toLowerCase().includes(modelQuery.toLowerCase())
    );


    const handleAuthButton = (master) => {


        if (!isAuthenticated) {
            showNotAuthenticated({
                message: "You need to be logged in to access this feature"
            });
            return;
        }

        if (!isClient) {
            showNotClient({
                message: "Only clients book a meeting with master!!!",
            });
            return;
        }


        setSelectedMaster(master);
        setShowBooking(true);
    };


    const handleModelSelect = (model) => {
        setSelectedModel(model.id);
        setModelQuery(model.name);
        setShowModelDropdown(false);
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (modelInputRef.current && !modelInputRef.current.contains(event.target)) {
                setShowModelDropdown(false);
            }
            if (dateInputRef.current && !dateInputRef.current.contains(event.target)) {
                setShowDatePicker(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const generateTimeSlots = () => {
        const slots = [];
        for (let hour = 9; hour <= 17; hour++) {
            const time = `${hour.toString().padStart(2, '0')}:00`;
            slots.push(time);
        }
        return slots;
    };

    const timeSlots = generateTimeSlots();


    const formatDisplayDate = (date) => {
        return date.toLocaleDateString('ru-RU', {
            weekday: 'short',
            day: 'numeric',
            month: 'short',
            year: 'numeric'
        });
    };

    const getDaysInMonth = (date) => {
        const year = date.getFullYear();
        const month = date.getMonth();
        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);
        const daysInMonth = lastDay.getDate();
        const startingDayOfWeek = firstDay.getDay();

        const days = [];

        for (let i = 0; i < startingDayOfWeek; i++) {
            days.push(null);
        }

        for (let day = 1; day <= daysInMonth; day++) {
            days.push(new Date(year, month, day));
        }

        return days;
    };


    const isDateDisabled = (date) => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        return date < today;
    };

    const isDateSelected = (date) => {
        if (!selectedDate || !date) return false;
        const selected = new Date(selectedDate);
        return date.toDateString() === selected.toDateString();
    };

    const handleDateSelect = (date) => {
        if (isDateDisabled(date)) return;
        setSelectedDate(date.toISOString().split('T')[0]);
        setShowDatePicker(false);
    };

    const navigateMonth = (direction) => {
        setCurrentMonth(prev => {
            const newMonth = new Date(prev);
            newMonth.setMonth(prev.getMonth() + direction);
            return newMonth;
        });
    };

    const monthNames = [
        t('service.months.january'), t('service.months.february'), t('service.months.march'), t('service.months.april'),
        t('service.months.may'), t('service.months.june'), t('service.months.july'), t('service.months.august'),
        t('service.months.september'), t('service.months.october'), t('service.months.november'), t('service.months.december')
    ];

    const dayNames = [t('service.weekDays.sun'), t('service.weekDays.mon'), t('service.weekDays.tue'), t('service.weekDays.wed'), t('service.weekDays.thu'), t('service.weekDays.fri'), t('service.weekDays.sat'),];

    const handleSubmit = () => {
        console.log('Form submitted');
    }

    useEffect(() => {
        fetchDealers()
        fetchMasters()
        fetchRegions()
        fetchCoords()
        fetchProducts()
    }, [currentLocale]);

    const fetchDealers = async () => {
        try {
            const response = await axios.post('/api/get-dealers', {locale: currentLocale, filial_id: 3630393});
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
            const response = await axios.post('/api/get-masters', {locale: currentLocale, filial_id: 3630393});
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
            const response = await axios.post('/api/get-regions', {locale: currentLocale});
            if (response.status !== 200) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            setRegions(response.data);
        } catch (error) {
            console.error('Error fetching regions:', error);
        }
    };

    const filteredMasters = selectedRegion === 'all'
        ? masters
        : masters.filter(m => m.region === selectedRegion)

    const fetchCoords = async () => {
        try {
            const response = await axios.post('/api/get-dealer-coords', {locale: currentLocale});
            if (response.status !== 200) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            setPoints(response.data);
        } catch (error) {
            console.error('Error fetching dealer coordinates:', error);
        }
    }

    const fetchProducts = async () => {
        try {
            const response = await axios.post('/api/get-products', {locale: currentLocale});

            if (response.status !== 200) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            setProducts(response.data);
        } catch (error) {
            console.error('Error fetching products:', error);
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
                    initial={{opacity: 0}}
                    animate={{opacity: 1}}
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
                            {value: 'masters', label: t('service.tabs.masters'), icon: Users},
                            {value: 'dealers', label: t('service.tabs.dealers'), icon: Building2},
                            {value: 'map', label: t('service.tabs.map'), icon: Map}
                        ].map(tab => (
                            <button
                                key={tab.value}
                                onClick={() => setActiveTab(tab.value)}
                                className={`px-6 py-3 transition-all flex items-center gap-2 ${activeTab === tab.value
                                    ? 'bg-white text-black'
                                    : 'text-gray-400 hover:text-white'
                                }`}
                            >
                                <tab.icon className="w-4 h-4"/>
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
                                initial={{opacity: 0, y: 20}}
                                animate={{opacity: 1, y: 0}}
                                transition={{delay: i * 0.1}}
                                className="bg-gray-950 border border-gray-800 hover:border-gray-700 transition-all"
                            >
                                <div className="p-6">
                                    <div className="flex gap-4 mb-4">
                                        <div
                                            className="w-16 h-16 bg-gray-900 border border-gray-800 flex items-center justify-center flex-shrink-0">
                                            {master.avatar ? (
                                                <img
                                                    src={`${master.avatar}`}
                                                    alt={master.name}
                                                    className="w-full h-full object-cover"
                                                />
                                            ) : (
                                                <User className="w-8 h-8 text-gray-700"/>
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
                                                <Star className="w-4 h-4 fill-current"/>
                                                <span className="font-light text-sm">{master.rating}</span>
                                                <span className="text-xs text-gray-500">({master.reviewsCount})</span>
                                            </div>
                                        </div>
                                    </div>


                                    <div className="mb-4">
                                        <p className="text-xs text-gray-500 mb-2">{t('service.specialization')}:</p>
                                        <div className="flex flex-wrap gap-1">
                                            {master.specialization.map((spec, index) => (
                                                <span key={index} className="text-xs px-2 py-1 bg-gray-900 text-gray-400">
                          {spec}
                        </span>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <button
                                            onClick={() => handleAuthButton(master)}
                                            className="w-full bg-white text-black py-2 hover:bg-gray-100 transition-colors text-sm font-medium cursor-pointer"
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
                                initial={{opacity: 0, y: 20}}
                                animate={{opacity: 1, y: 0}}
                                transition={{delay: i * 0.1}}
                                className="bg-gray-950 border border-gray-800 p-6"
                            >
                                <div className="flex justify-between items-start mb-4">
                                    <div>
                                        <h3 className="font-light text-xl text-white">{dealer.name}</h3>
                                        <p className="text-gray-500 text-sm">{dealer.address}</p>
                                    </div>
                                    <div className="text-right">
                                        <div className="flex items-center gap-1 text-white">
                                            <Star className="w-4 h-4 fill-current"/>
                                            <span>{dealer.rating}</span>
                                        </div>
                                        <p className="text-xs text-gray-500">{dealer.reviewsCount} отзывов</p>
                                    </div>
                                </div>

                                <div className="space-y-2 mb-6 text-sm">
                                    <div className="flex items-center gap-2 text-gray-400">
                                        <Phone className="w-4 h-4"/>
                                        <span>{dealer.phone}</span>
                                    </div>
                                    {/*<div className="flex items-center gap-2 text-gray-400">*/}
                                    {/*  <Clock className="w-4 h-4" />*/}
                                    {/*  <span>{dealer.workHours}</span>*/}
                                    {/*</div>*/}
                                    <div className="flex items-center gap-2 text-gray-400">
                                        <MapPin className="w-4 h-4"/>
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
                                    <button
                                        className="flex-1 bg-white text-black py-2 hover:bg-gray-100 transition-colors text-sm font-medium">
                                        {t('service.book')}
                                    </button>
                                    <a href={`tel:${dealer.phone}`}
                                       className="px-4 py-2 border border-gray-700 text-gray-300 hover:bg-gray-900 transition-all">
                                        <Phone className="w-4 h-4"/>
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

            <AuthModal
                isOpen={isOpen}
                onClose={hideAuthModal}
                type={type}
                config={config}
            />

            <AnimatePresence>
                {showBooking && selectedMaster && (
                    <motion.div
                        initial={{opacity: 0}}
                        animate={{opacity: 1}}
                        exit={{opacity: 0}}
                        className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50"
                        onClick={() => setShowBooking(false)}
                    >
                        <motion.div
                            initial={{scale: 0.95}}
                            animate={{scale: 1}}
                            className="bg-gray-950 border border-gray-800 p-8 max-w-md w-full max-h-[90vh] overflow-y-auto"
                            onClick={e => e.stopPropagation()}
                        >
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-2xl font-light text-white">{t('service.bookingTitle')}</h2>
                                <button
                                    onClick={() => setShowBooking(false)}
                                    className="text-gray-500 hover:text-white transition-colors"
                                >
                                    <X className="w-5 h-5"/>
                                </button>
                            </div>

                            <p className="text-gray-400 mb-6">{t('service.master')}: {selectedMaster.name}</p>

                            <div className="space-y-4">
                                <input
                                    type="text"
                                    placeholder={t('service.form.name')}
                                    className="w-full px-4 py-3 bg-black border border-gray-800 text-white placeholder-gray-600 focus:border-gray-700 focus:outline-none transition-colors"
                                    required
                                />

                                <input
                                    type="tel"
                                    placeholder={t('service.form.phone')}
                                    className="w-full px-4 py-3 bg-black border border-gray-800 text-white placeholder-gray-600 focus:border-gray-700 focus:outline-none transition-colors"
                                    required
                                />

                                {/* Enhanced Model Selection */}
                                <div className="relative" ref={modelInputRef}>
                                    <div className="relative">
                                        <input
                                            type="text"
                                            placeholder={t('service.form.model')}
                                            className="w-full px-4 py-3 pr-10 bg-black border border-gray-800 text-white placeholder-gray-600 focus:border-gray-700 focus:outline-none transition-colors"
                                            value={modelQuery}
                                            onChange={(e) => {
                                                setModelQuery(e.target.value);
                                                setShowModelDropdown(true);
                                            }}
                                            onFocus={() => setShowModelDropdown(true)}
                                            autoComplete="off"
                                        />
                                        <Search
                                            className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500"/>
                                    </div>

                                    {/* Dropdown */}
                                    <AnimatePresence>
                                        {showModelDropdown && filteredModels.length > 0 && (
                                            <motion.div
                                                initial={{opacity: 0, y: -10}}
                                                animate={{opacity: 1, y: 0}}
                                                exit={{opacity: 0, y: -10}}
                                                className="absolute top-full left-0 right-0 mt-1 bg-black border border-gray-800 max-h-48 overflow-y-auto z-10"
                                            >
                                                {filteredModels.map((model) => (
                                                    <button
                                                        key={model.id}
                                                        type="button"
                                                        className="w-full px-4 py-3 text-left text-white hover:bg-gray-800 transition-colors border-b border-gray-800 last:border-b-0"
                                                        onClick={() => handleModelSelect(model)}
                                                    >
                                                        {model.name}
                                                    </button>
                                                ))}
                                            </motion.div>
                                        )}
                                    </AnimatePresence>

                                    {showModelDropdown && modelQuery && products.length === 0 && (
                                        <motion.div
                                            initial={{opacity: 0, y: -10}}
                                            animate={{opacity: 1, y: 0}}
                                            className="absolute top-full left-0 right-0 mt-1 bg-black border border-gray-800 px-4 py-3 text-gray-500"
                                        >
                                            {t('service.form.noModel')}
                                        </motion.div>
                                    )}
                                </div>

                                <div className="relative" ref={dateInputRef}>
                                    <div className="relative">
                                        <input
                                            type="text"
                                            placeholder="Select date"
                                            className="w-full px-4 py-3 pr-10 bg-black border border-gray-800 text-white placeholder-gray-600 focus:border-gray-700 focus:outline-none transition-colors cursor-pointer"
                                            value={selectedDate ? formatDisplayDate(new Date(selectedDate)) : ''}
                                            onClick={() => setShowDatePicker(true)}
                                            readOnly
                                            required
                                        />
                                        <Calendar
                                            className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500"/>
                                    </div>

                                    <AnimatePresence>
                                        {showDatePicker && (
                                            <motion.div
                                                initial={{opacity: 0, y: -10}}
                                                animate={{opacity: 1, y: 0}}
                                                exit={{opacity: 0, y: -10}}
                                                className="absolute top-full left-0 right-0 mt-1 bg-black border border-gray-800 p-4 z-20"
                                            >
                                                <div className="flex justify-between items-center mb-4">
                                                    <button
                                                        type="button"
                                                        onClick={() => navigateMonth(-1)}
                                                        className="p-1 hover:bg-gray-800 rounded transition-colors"
                                                    >
                                                        <ChevronLeft className="w-5 h-5 text-gray-400"/>
                                                    </button>
                                                    <h3 className="text-white font-medium">
                                                        {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
                                                    </h3>
                                                    <button
                                                        type="button"
                                                        onClick={() => navigateMonth(1)}
                                                        className="p-1 hover:bg-gray-800 rounded transition-colors"
                                                    >
                                                        <ChevronRight className="w-5 h-5 text-gray-400"/>
                                                    </button>
                                                </div>

                                                <div className="grid grid-cols-7 gap-1 mb-2">
                                                    {dayNames.map(day => (
                                                        <div key={day}
                                                             className="text-center text-xs text-gray-500 py-2">
                                                            {day}
                                                        </div>
                                                    ))}
                                                </div>

                                                <div className="grid grid-cols-7 gap-1">
                                                    {getDaysInMonth(currentMonth).map((date, index) => (
                                                        <button
                                                            key={index}
                                                            type="button"
                                                            className={`
                              h-8 text-sm rounded transition-colors
                              ${!date ? 'invisible' : ''}
                              ${date && isDateDisabled(date)
                                                                ? 'text-gray-600 cursor-not-allowed'
                                                                : 'text-white hover:bg-gray-800'}
                              ${date && isDateSelected(date)
                                                                ? 'bg-white text-black'
                                                                : ''}
                            `}
                                                            onClick={() => date && handleDateSelect(date)}
                                                            disabled={date && isDateDisabled(date)}
                                                        >
                                                            {date ? date.getDate() : ''}
                                                        </button>
                                                    ))}
                                                </div>

                                                {/* Quick Select Options */}
                                                <div className="flex gap-2 mt-4 pt-4 border-t border-gray-800">
                                                    <button
                                                        type="button"
                                                        onClick={() => handleDateSelect(new Date())}
                                                        className="text-xs px-3 py-1 bg-gray-800 text-white rounded hover:bg-gray-700 transition-colors"
                                                    >
                                                        {t('service.today')}
                                                    </button>
                                                    <button
                                                        type="button"
                                                        onClick={() => {
                                                            const tomorrow = new Date();
                                                            tomorrow.setDate(tomorrow.getDate() + 1);
                                                            handleDateSelect(tomorrow);
                                                        }}
                                                        className="text-xs px-3 py-1 bg-gray-800 text-white rounded hover:bg-gray-700 transition-colors"
                                                    >
                                                        {t('service.tomorrow')}
                                                    </button>
                                                    <button
                                                        type="button"
                                                        onClick={() => {
                                                            const nextWeek = new Date();
                                                            nextWeek.setDate(nextWeek.getDate() + 7);
                                                            handleDateSelect(nextWeek);
                                                        }}
                                                        className="text-xs px-3 py-1 bg-gray-800 text-white rounded hover:bg-gray-700 transition-colors"
                                                    >
                                                        {t('service.nextWeek')}
                                                    </button>
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>

                                <select
                                    className="w-full px-4 py-3 bg-black border border-gray-800 text-white focus:border-gray-700 focus:outline-none transition-colors appearance-none"
                                    required
                                >
                                    <option value="">{t('service.selectTime')}</option>
                                    {timeSlots.map((time, index) => (
                                        <option key={index} value={time}>
                                            {time}
                                        </option>
                                    ))}
                                </select>

                                <button
                                    type="button"
                                    className="w-full bg-white text-black py-3 hover:bg-gray-100 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                                    disabled={!selectedModel}
                                    onClick={handleSubmit}
                                >
                                    {t('service.booking')}
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

        </div>
    )
}