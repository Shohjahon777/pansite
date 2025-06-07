'use client'

import Link from 'next/link'
import {motion, useScroll, useTransform} from 'framer-motion'
import {useState, useEffect, useRef} from 'react'
import {
    Shield,
    Smartphone,
    Thermometer,
    Battery,
    Bell,
    Award,
    Package,
    Search,
    CheckCircle,
    ChevronLeft,
    ChevronRight,
    MapPin,
    ArrowRight,
    Zap,
    Lock,
    Cpu
} from 'lucide-react'
import {useTranslation} from '../hooks/useTranslation'
import {homeLocales} from './home'
import {useLanguageStore} from "@/src/store/language";
import axios from "axios";

export default function HomePage() {
    const [currentSlide, setCurrentSlide] = useState(0)
    const [slides, setSlides] = useState([])
    const [stats, setStats] = useState([])
    const [points, setPoints] = useState([])
    const [mapLoaded, setMapLoaded] = useState(false)
    const mapRef = useRef(null)
    const {scrollY} = useScroll()
    const {t} = useTranslation(homeLocales)
    const {currentLocale} = useLanguageStore()

    const y = useTransform(scrollY, [0, 300], [0, 50])
    const opacity = useTransform(scrollY, [0, 300], [1, 0.8])

    useEffect(() => {
        fetchSliders()
        fetchStats()
        fetchCoords()
    }, [currentLocale]);

    const fetchSliders = async () => {
        try {
            const response = await axios.post('/api/get-hero-slide', {locale: currentLocale});
            if (response.status !== 200) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            setSlides(response.data);
        } catch (error) {
            console.error('Error fetching hero section:', error);
        }
    };

    const fetchStats = async () => {
        try {
            const response = await axios.post('/api/get-static-info', {locale: currentLocale});
            if (response.status !== 200) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            setStats(response.data);
        } catch (error) {
            console.error('Error fetching stats:', error);
        }
    };

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

    // Transform dealer data function - improved version
    const transformDealerData = (dealers) => {
        if (!dealers || !Array.isArray(dealers)) {
            // console.warn('Invalid dealers data:', dealers);
            return [];
        }

        return dealers
            .map(dealer => {
                if (!dealer.coords || !dealer.coords[0] || dealer.coords[0].trim() === '') {
                    // console.warn('Empty coordinates for dealer:', dealer.name);
                    return null;
                }

                const coordString = dealer.coords[0].trim();
                const [lat, lng] = coordString.split(',').map(coord => parseFloat(coord.trim()));

                if (isNaN(lat) || isNaN(lng)) {
                    // console.warn('Invalid coordinates for dealer:', dealer.name, 'coords:', coordString);
                    return null;
                }

                if (lat < -90 || lat > 90 || lng < -180 || lng > 180) {
                    // console.warn('Coordinates out of range for dealer:', dealer.name, 'lat:', lat, 'lng:', lng);
                    return null;
                }

                return {
                    coords: [lat, lng],
                    name: dealer.name,
                    type: dealer.type
                };
            })
            .filter(Boolean);
    };

    // Initialize Yandex Map
    const initializeMap = () => {
        if (!window.ymaps || !points.length) return;

        window.ymaps.ready(() => {
            const mapContainer = document.getElementById('map');
            if (!mapContainer) {
                console.error('Map container not found');
                return;
            }

            if (mapRef.current) {
                mapRef.current.destroy();
            }

            const transformedPoints = transformDealerData(points);

            if (transformedPoints.length === 0) {
                // console.warn('No valid coordinates found for map initialization');
                const map = new window.ymaps.Map('map', {
                    center: [41.311081, 69.240562],
                    zoom: 12,
                    controls: ['zoomControl', 'fullscreenControl']
                });
                mapRef.current = map;
                return;
            }

            // Calculate map center based on available points
            let centerLat = 41.311081; // Default Tashkent
            let centerLng = 69.240562;

            if (transformedPoints.length > 0) {
                centerLat = transformedPoints.reduce((sum, point) => sum + point.coords[0], 0) / transformedPoints.length;
                centerLng = transformedPoints.reduce((sum, point) => sum + point.coords[1], 0) / transformedPoints.length;
            }

            const map = new window.ymaps.Map('map', {
                center: [centerLat, centerLng],
                zoom: transformedPoints.length > 1 ? 11 : 13,
                controls: ['zoomControl', 'fullscreenControl']
            });

            // Add placemarks
            transformedPoints.forEach((point, index) => {
                try {
                    const placemark = new window.ymaps.Placemark(
                        point.coords,
                        {
                            hintContent: point.name,
                            balloonContent: `<strong>${point.name}</strong><br/>${point.type === 'dealer' ? 'Дилерский центр' : 'Сертифицированный мастер'}`
                        },
                        {
                            preset: point.type === 'dealer' ? 'islands#darkBlueIcon' : 'islands#blueIcon'
                        }
                    );
                    map.geoObjects.add(placemark);
                } catch (error) {
                    console.error('Error adding placemark for point:', point, error);
                }
            });

            // Fit map bounds to show all points
            if (transformedPoints.length > 1) {
                try {
                    const bounds = transformedPoints.map(point => point.coords);
                    map.setBounds(bounds, {
                        checkZoomRange: true,
                        zoomMargin: 50
                    });
                } catch (error) {
                    console.error('Error setting map bounds:', error);
                }
            }

            mapRef.current = map;
        });
    };

    // Load Yandex Maps API and initialize map
    useEffect(() => {
        if (points.length === 0) return;

        const loadYandexMaps = () => {
            // Check if API is already loaded
            if (window.ymaps) {
                initializeMap();
                return;
            }

            // Check if script is already being loaded
            if (document.querySelector('script[src*="api-maps.yandex.ru"]')) {
                return;
            }

            const script = document.createElement('script');
            script.src = 'https://api-maps.yandex.ru/2.1/?apikey=7689fb06-62e6-4db3-aa3d-be9373d43a89&lang=ru_RU';
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
    }, [points]);

    // Auto-slide effect
    useEffect(() => {
        if (slides.length === 0) return;

        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % slides.length)
        }, 5000)
        return () => clearInterval(timer)
    }, [slides.length])

    const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length)
    const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)

    const advantages = [
        {icon: Shield, title: t('advantages.items.dialogCode.title'), desc: t('advantages.items.dialogCode.desc')},
        {icon: Smartphone, title: t('advantages.items.control.title'), desc: t('advantages.items.control.desc')},
        {icon: Thermometer, title: t('advantages.items.autostart.title'), desc: t('advantages.items.autostart.desc')},
        {icon: Battery, title: t('advantages.items.battery.title'), desc: t('advantages.items.battery.desc')},
        {icon: Bell, title: t('advantages.items.notifications.title'), desc: t('advantages.items.notifications.desc')},
        {icon: Award, title: t('advantages.items.warranty.title'), desc: t('advantages.items.warranty.desc')}
    ]

    const quickActions = [
        {
            icon: Package,
            title: t('quickActions.catalog.title'),
            desc: t('quickActions.catalog.desc'),
            href: '/products'
        },
        {
            icon: Search,
            title: t('quickActions.findMaster.title'),
            desc: t('quickActions.findMaster.desc'),
            href: '/service'
        },
        {
            icon: CheckCircle,
            title: t('quickActions.checkWarranty.title'),
            desc: t('quickActions.checkWarranty.desc'),
            href: '/account'
        }
    ]

    if (!slides || slides.length === 0) {
        return (
            <section className="relative min-h-screen overflow-hidden flex items-center justify-center">
                <div className="text-white">Loading...</div>
            </section>
        );
    }

    const validCurrentSlide = currentSlide >= 0 && currentSlide < slides.length ? currentSlide : 0;
    const currentSlideData = slides[validCurrentSlide];

    return (
        <div className="bg-black">
            {/* Hero Section */}
            <section className="relative min-h-screen overflow-hidden">
                <motion.div style={{y, opacity}} className="absolute inset-0">
                    {currentSlideData && (
                        <div
                            className={`absolute inset-0 bg-gradient-to-br ${currentSlideData.gradient} transition-all duration-1000`}/>
                    )}
                    <div
                        className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,transparent_0%,rgba(0,0,0,0.4)_100%)]"/>
                    <div
                        className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(59,130,246,0.03)_0%,transparent_50%)]"/>
                </motion.div>

                <div className="relative z-10 min-h-screen flex items-center">
                    <div className="max-w-7xl mx-auto px-4 w-full">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                            <motion.div
                                key={currentSlide}
                                initial={{opacity: 0, x: -30}}
                                animate={{opacity: 1, x: 0}}
                                transition={{duration: 0.7}}
                            >
                                <h1 className="text-5xl lg:text-7xl font-thin text-white mb-6 leading-tight">
                                    {currentSlideData.title}
                                </h1>
                                <p className="text-2xl lg:text-3xl text-gray-300 font-light mb-4">
                                    {currentSlideData.subtitle}
                                </p>
                                <p className="text-lg text-gray-400 mb-8 font-light">
                                    {currentSlideData.description}
                                </p>
                                <div className="text-3xl text-white mb-10 font-light">
                                    {currentSlideData.price}
                                </div>
                                <Link
                                    href="/products"
                                    className="inline-flex items-center gap-3 bg-white text-black px-8 py-4 hover:bg-gray-100 transition-all group"
                                >
                                    <span className="font-medium">{t('hero.cta')}</span>
                                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform"/>
                                </Link>
                            </motion.div>

                            <motion.div
                                key={`icon-${currentSlide}`}
                                initial={{opacity: 0, scale: 0.8}}
                                animate={{opacity: 1, scale: 1}}
                                transition={{duration: 0.7}}
                                className="hidden lg:flex justify-center items-center"
                            >
                                <div className="relative">
                                    <div className="absolute inset-0 bg-white/5 blur-3xl"/>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </div>

                {/* Navigation */}
                <button
                    onClick={prevSlide}
                    className="absolute left-8 top-1/2 -translate-y-1/2 w-12 h-12 border border-white/20 text-white/60 hover:bg-white/10 hover:text-white transition-all flex items-center justify-center"
                >
                    <ChevronLeft className="w-5 h-5"/>
                </button>
                <button
                    onClick={nextSlide}
                    className="absolute right-8 top-1/2 -translate-y-1/2 w-12 h-12 border border-white/20 text-white/60 hover:bg-white/10 hover:text-white transition-all flex items-center justify-center"
                >
                    <ChevronRight className="w-5 h-5"/>
                </button>

                {/* Indicators */}
                <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex gap-3">
                    {slides.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrentSlide(index)}
                            className={`h-1 transition-all duration-500 ${currentSlide === index
                                ? 'bg-white w-12'
                                : 'bg-white/30 w-6 hover:bg-white/50'
                            }`}
                        />
                    ))}
                </div>
            </section>

            {/* Stats Section */}
            {stats.length > 0 && (
                <section className="py-20 bg-gradient-to-b from-gray-950 to-gray-950/95 relative border-t border-gray-900">
                    <div
                        className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(59,130,246,0.05)_0%,transparent_40%)]"/>
                    <div className="max-w-7xl mx-auto px-4 relative">
                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
                            {stats.map((stat, i) => (
                                <motion.div
                                    key={i}
                                    initial={{opacity: 0, y: 20}}
                                    whileInView={{opacity: 1, y: 0}}
                                    transition={{delay: i * 0.1}}
                                    className="text-center"
                                >
                                    <div className="text-4xl lg:text-5xl font-thin text-white mb-2">
                                        {stat.value}
                                    </div>
                                    <div className="text-sm text-gray-500 uppercase tracking-wider">
                                        {stat.label}
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* Advantages */}
            <section className="py-24 bg-black relative">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-950/[0.02] to-transparent"/>
                <div className="max-w-7xl mx-auto px-4 relative">
                    <motion.div
                        initial={{opacity: 0}}
                        whileInView={{opacity: 1}}
                        className="text-center mb-16"
                    >
                        <h2 className="text-4xl lg:text-5xl font-thin text-white mb-4">
                            {t('advantages.title')}
                        </h2>
                        <p className="text-xl text-gray-500 font-light">
                            {t('advantages.subtitle')}
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {advantages.map((item, i) => (
                            <motion.div
                                key={i}
                                initial={{opacity: 0, y: 30}}
                                whileInView={{opacity: 1, y: 0}}
                                transition={{delay: i * 0.1}}
                                className="group"
                            >
                                <div
                                    className="bg-gray-950 border border-gray-900 p-8 hover:border-gray-800 transition-all">
                                    <item.icon
                                        className="w-12 h-12 text-gray-600 mb-6 group-hover:text-white transition-colors"
                                        strokeWidth={1}/>
                                    <h3 className="text-xl font-light text-white mb-3">
                                        {item.title}
                                    </h3>
                                    <p className="text-gray-500 font-light">
                                        {item.desc}
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Quick Actions */}
            <section className="py-24 bg-gradient-to-br from-gray-950 via-gray-950/95 to-black relative">
                <div
                    className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(59,130,246,0.04)_0%,transparent_50%)]"/>
                <div className="max-w-7xl mx-auto px-4 relative">
                    <h2 className="text-3xl lg:text-4xl font-thin text-center text-white mb-16">
                        {t('quickActions.title')}
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {quickActions.map((action, i) => (
                            <motion.div
                                key={i}
                                initial={{opacity: 0, scale: 0.95}}
                                whileInView={{opacity: 1, scale: 1}}
                                transition={{delay: i * 0.1}}
                            >
                                <Link href={action.href} className="block group">
                                    <div
                                        className="bg-gradient-to-b from-gray-900 to-black border border-gray-800 p-10 hover:border-gray-700 transition-all">
                                        <action.icon
                                            className="w-16 h-16 text-gray-600 mb-6 group-hover:text-white transition-colors"
                                            strokeWidth={1}/>
                                        <h3 className="text-2xl font-light text-white mb-3">
                                            {action.title}
                                        </h3>
                                        <p className="text-gray-500 mb-6">
                                            {action.desc}
                                        </p>
                                        <div
                                            className="flex items-center text-gray-400 group-hover:text-white transition-colors">
                                            <span className="text-sm uppercase tracking-wider">{t('hero.cta')}</span>
                                            <ArrowRight
                                                className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform"/>
                                        </div>
                                    </div>
                                </Link>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Map Section */}
            <section className="py-24 bg-black relative border-t border-gray-900">
                <div className="absolute inset-0 bg-gradient-to-t from-blue-950/[0.03] to-transparent"/>
                <div className="max-w-7xl mx-auto px-4 relative">
                    <div className="text-center mb-12">
                        <h2 className="text-4xl lg:text-5xl font-thin text-white mb-4">
                            {t('map.title')}
                        </h2>
                        <p className="text-xl text-gray-500">
                            {t('map.subtitle')}
                        </p>
                    </div>

                    <div className="relative">
                        <div className="bg-gray-950 border border-gray-800 overflow-hidden">
                            <div id="map" className="w-full h-[600px] bg-gray-900 flex items-center justify-center">
                                {!mapLoaded && points.length > 0 && (
                                    <div className="text-gray-400">Загрузка карты...</div>
                                )}
                                {points.length === 0 && (
                                    <div className="text-gray-400">Нет доступных точек для отображения</div>
                                )}
                            </div>
                        </div>

                        <motion.div
                            initial={{opacity: 0, y: 20}}
                            whileInView={{opacity: 1, y: 0}}
                            className="absolute bottom-8 left-8 bg-black/95 backdrop-blur-md border border-gray-800 p-8 max-w-sm"
                        >
                            <h3 className="text-xl font-light text-white mb-4">
                                {t('map.subtitle')}
                            </h3>
                            <div className="space-y-3 mb-6">
                                <div className="flex items-center gap-3 text-gray-400">
                                    <MapPin className="w-4 h-4"/>
                                    <span>{transformDealerData(points).length}+ {t('map.info.dealers')}</span>
                                </div>
                                <div className="flex items-center gap-3 text-gray-400">
                                    <CheckCircle className="w-4 h-4"/>
                                    <span>{t('map.info.installation')}</span>
                                </div>
                            </div>
                            <Link
                                href="/service"
                                className="inline-flex items-center text-white hover:text-gray-300 transition-colors group"
                            >
                                <span className="text-sm uppercase tracking-wider">{t('map.showAll')}</span>
                                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform"/>
                            </Link>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-24 bg-gradient-to-t from-gray-950 via-black to-black relative">
                <div
                    className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(59,130,246,0.05)_0%,transparent_60%)]"/>
                <motion.div
                    initial={{opacity: 0, scale: 0.95}}
                    whileInView={{opacity: 1, scale: 1}}
                    className="max-w-4xl mx-auto px-4 text-center relative"
                >
                    <Cpu className="w-20 h-20 text-gray-700 mx-auto mb-8" strokeWidth={1}/>
                    <h2 className="text-4xl lg:text-5xl font-thin text-white mb-6">
                        Готовы к максимальной защите?
                    </h2>
                    <p className="text-xl text-gray-400 mb-10 font-light">
                        Выберите систему и получите профессиональную установку уже сегодня
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link href="/products"
                              className="bg-white text-black px-8 py-4 hover:bg-gray-100 transition-colors">
                            <span className="font-medium">Выбрать систему</span>
                        </Link>
                        <Link href="/service"
                              className="border border-gray-700 text-white px-8 py-4 hover:bg-gray-900 transition-colors">
                            <span className="font-medium">Найти мастера</span>
                        </Link>
                    </div>
                </motion.div>
            </section>
        </div>
    )
}