'use client'

import Link from 'next/link'
import {useParams, useRouter} from 'next/navigation'
import {
    ChevronLeft,
    ChevronRight,
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
import {masterDetailLocales} from './masterDetail'
import {useLanguageStore} from "@/src/store/language";
import axios from "axios";
import {cleanHtmlContent} from '@/src/utils/cleanHtml'
import {useTranslation} from "@/src/hooks/useTranslation";
import {useState, useEffect} from "react";
import {AnimatePresence, motion} from "framer-motion";

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
    const [certifications, setCertifications] = useState([])
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const {t} = useTranslation(masterDetailLocales)
    const {currentLocale} = useLanguageStore()

    const openModal = (index) => {
        setCurrentImageIndex(index);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const nextImage = () => {
        if (!master?.certificates?.length) return;
        setCurrentImageIndex((prev) =>
            prev === master.certificates.length - 1 ? 0 : prev + 1
        );
    };

    const prevImage = () => {
        if (!master?.certificates?.length) return;
        setCurrentImageIndex((prev) =>
            prev === 0 ? master.certificates.length - 1 : prev - 1
        );
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Escape') closeModal();
        if (e.key === 'ArrowRight') nextImage();
        if (e.key === 'ArrowLeft') prevImage();
    };

    useEffect(() => {
        if (isModalOpen) {
            document.addEventListener('keydown', handleKeyDown);
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
            document.body.style.overflow = 'unset';
        };
    }, [isModalOpen, master?.certificates?.length]);

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

    const fetchCertifications = async () => {
        try {
            const response = await axios.post('/api/get-certifications', {locale: currentLocale, id: params.id});
            if (response.status !== 200) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            setCertifications(response.data);
        } catch (error) {
            console.error('Error fetching certifications:', error);
        }
    };

    useEffect(() => {
        if (currentLocale) {
            fetchRegions();
        }
    }, [currentLocale]);

    useEffect(() => {
        if (params.id) {
            fetchCertifications();
        }
    }, [params.id]);

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
            rating: 4.5,
            reviewsCount: 0,
            installations: 100,
            region: getRegionName(masterData.region),
            experience: masterData.experience || 'Не указан',
            specialization: masterData.specialization ?
                masterData.specialization.split(',').map(s => s.trim()) :
                ['Установка сигнализаций', 'Настройка систем'],
            responseTime: masterData.responsetime || '1 час',
            badges: [
                {id: 'certified', name: t('masterDetail.badges.certified'), icon: Shield}
            ],
            schedule: parseSchedule(masterData.schedule),
            phone: masterData.phone ? `+998 ${masterData.phone}` : 'Не указан',
            about: cleanHtmlContent(masterData.description) || 'Профессиональный установщик автосигнализаций с большим опытом работы.',
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
            gallery: [],
            stats: {
                satisfaction: 95,
                onTime: 90,
                warranty: 100,
                repeatClients: 80
            },
            reviews: [],
            certificates: certifications || []
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
        if (params.id && currentLocale && regions.length > 0) {
            fetchMaster();
        }
    }, [params.id, currentLocale, regions, certifications]);

    // Yandex Maps initialization
    useEffect(() => {
        if (activeTab === 'location' && master && typeof window !== 'undefined') {
            const script = document.createElement('script')
            script.src = 'https://api-maps.yandex.ru/2.1/?apikey=YOUR_API_KEY&lang=ru_RU'
            script.async = true
            script.onload = () => {
                if (window.ymaps) {
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
                <div className="text-white">Loading...</div>
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

    if (!master) return null;


    return (
        <div className="page-container min-h-screen bg-black">
            <div className="max-w-7xl mx-auto px-4 py-20">
                {/* Breadcrumbs */}
                <div className="flex items-center space-x-2 text-sm text-gray-500 mb-6">
                    <Link href="/"
                          className="hover:text-white transition-colors">{t('masterDetail.breadcrumbs.home')}</Link>
                    <span>/</span>
                    <Link href="/service"
                          className="hover:text-white transition-colors">{t('masterDetail.breadcrumbs.masters')}</Link>
                    <span>/</span>
                    <span className="text-gray-300">{master.name}</span>
                </div>

                {/* Main Info */}
                <div className="bg-gray-950 border border-gray-800 p-8 mb-8">
                    <div className="flex flex-col md:flex-row gap-8">
                        <div className="flex-1">
                            <div className="flex items-start gap-6">
                                {/* Avatar */}
                                <div
                                    className="w-32 h-32 bg-gray-900 border border-gray-800 flex items-center justify-center flex-shrink-0">
                                    {master.avatar ? (
                                        <img
                                            src={`${master.avatar}`}
                                            alt={master.name}
                                            className="w-full h-full object-cover"
                                        />
                                    ) : (
                                        <User className="w-16 h-16 text-gray-700"/>
                                    )}
                                </div>

                                <div className="flex-1">
                                    <h1 className="text-3xl font-thin text-white mb-2">{master.name}</h1>
                                    <div className="flex items-center gap-4 mb-4">
                                        <div className="flex items-center gap-1">
                                            <Star className="w-5 h-5 fill-white text-white"/>
                                            <span className="font-light text-white text-lg">{master.rating}</span>
                                            <span
                                                className="text-gray-500">({master.reviewsCount} {t('masterDetail.reviews')})</span>
                                        </div>
                                        <span className="text-gray-600">•</span>
                                        <span className="text-gray-400">{master.region}</span>
                                    </div>

                                    <div className="flex flex-wrap gap-2 mb-6">
                                        {master.badges.map((badge) => (
                                            <span key={badge.id}
                                                  className="flex items-center gap-2 px-3 py-1 border border-gray-700 text-gray-400 text-sm">
                        <badge.icon className="w-4 h-4"/>
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
                                <a href={`tel:${master.phone}`}
                                   className="flex items-center gap-3 text-white font-light mb-4 hover:text-gray-300 transition-colors">
                                    <Phone className="w-5 h-5 text-gray-600"/>
                                    {master.phone}
                                </a>
                                <button
                                    onClick={() => setShowBooking(true)}
                                    className="w-full bg-white text-black py-3 mb-3 hover:bg-gray-100 transition-colors font-medium"
                                >
                                    {t('masterDetail.book')}
                                </button>
                                <Link href="/service"
                                      className="block w-full text-center border border-gray-700 text-gray-300 py-3 hover:bg-gray-900 transition-all">
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
                    {['about', 'reviews', 'gallery', 'location'].map(tab => (
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
                            {/*{tab === 'services' && t('masterDetail.tabs.services')}*/}
                            {tab === 'reviews' && `${t('masterDetail.tabs.reviews')} (${master.reviews.length})`}
                            {tab === 'gallery' && t('masterDetail.tabs.gallery')}
                            {tab === 'location' && t('masterDetail.tabs.location')}
                        </button>
                    ))}
                </div>

                {activeTab === 'about' && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="bg-gray-950 border border-gray-800 p-6">
                            <h3 className="font-light text-lg mb-4 text-white">{t('masterDetail.specialization')}</h3>
                            <div className="space-y-2">
                                {master.specialization.map((spec, i) => (
                                    <div key={i} className="flex items-center text-gray-300">
                                        <CheckCircle className="w-4 h-4 text-gray-600 mr-2"/>
                                        <span className="font-light">{spec}</span>
                                    </div>
                                ))}
                            </div>
                        </div>


                        {master.certificates && master.certificates.length > 0 && (
                            <div className="bg-gray-950 border border-gray-800 p-4 sm:p-6 lg:col-span-2">
                                <div className="flex items-center gap-2 mb-6">
                                    <Award className="w-6 h-6 text-blue-400"/>
                                    <h3 className="font-light text-lg text-white">Certificates</h3>
                                    <span className="bg-gray-800 text-gray-300 px-2 py-1 rounded-full text-xs">
                                        {master.certificates.length}
                                    </span>
                                </div>

                                <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4">
                                    {master.certificates.map((cert, index) => (
                                        <div
                                            key={cert.sert_id || index}
                                            className="group relative aspect-[3/4] bg-gray-900 border border-gray-800 rounded-lg overflow-hidden cursor-pointer transition-all duration-200 hover:border-blue-500 hover:shadow-lg hover:shadow-blue-500/20"
                                            onClick={() => openModal(index)}
                                        >
                                            <img
                                                src={`https://crm.carsale.uz/b/core/m$load_image?sha=${cert.certificates}`}
                                                alt={`Certificate ${index + 1}`}
                                                className="w-full h-full object-cover transition-transform duration-200 group-hover:scale-105"
                                                loading="lazy"
                                                onError={(e) => {
                                                    e.target.style.display = 'none';
                                                    e.target.nextSibling.style.display = 'flex';
                                                }}
                                            />

                                            {/* Fallback for broken images */}
                                            <div className="absolute inset-0 bg-gray-800 items-center justify-center hidden">
                                                <Camera className="w-8 h-8 text-gray-600"/>
                                            </div>

                                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
                                                <div className="bg-white/90 text-gray-900 px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium">
                                                    View Certificate
                                                </div>
                                            </div>

                                            <div className="absolute top-2 right-2 bg-black/60 text-white px-1.5 sm:px-2 py-0.5 sm:py-1 rounded text-xs">
                                                {index + 1}/{master.certificates.length}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                )}

                {isModalOpen && (
                    <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
                        {/* Close button */}
                        <button
                            onClick={closeModal}
                            className="absolute top-4 right-4 z-10 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors duration-200"
                        >
                            <X className="w-6 h-6" />
                        </button>

                        {/* Navigation buttons */}
                        {master.certificates.length > 1 && (
                            <>
                                <button
                                    onClick={prevImage}
                                    className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-colors duration-200"
                                >
                                    <ChevronLeft className="w-6 h-6" />
                                </button>

                                <button
                                    onClick={nextImage}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-colors duration-200"
                                >
                                    <ChevronRight className="w-6 h-6" />
                                </button>
                            </>
                        )}

                        {/* Main image */}
                        <div className="relative max-w-4xl max-h-[90vh] w-full">
                            <img
                                src={`https://crm.carsale.uz/b/core/m$load_image?sha=${master.certificates[currentImageIndex].certificates}`}
                                alt={`Certificate ${currentImageIndex + 1}`}
                                className="w-full h-screen object-contain rounded-lg"
                            />

                            {/* Image info */}
                            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/70 text-white px-4 py-2 rounded-full">
              <span className="text-sm">
                {currentImageIndex + 1} of {master.certificates.length}
              </span>
                            </div>
                        </div>

                        {/* Thumbnail strip */}
                        {master.certificates.length > 1 && (
                            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 bg-black/50 p-2 rounded-lg max-w-xs overflow-x-auto">
                                {master.certificates.map((cert, index) => (
                                    <button
                                        key={cert.id}
                                        onClick={() => setCurrentImageIndex(index)}
                                        className={`flex-shrink-0 w-12 h-12 rounded border-2 overflow-hidden transition-all duration-200 ${
                                            index === currentImageIndex
                                                ? 'border-blue-400 opacity-100'
                                                : 'border-gray-600 opacity-60 hover:opacity-80'
                                        }`}
                                    >
                                        <img
                                            src={`https://crm.carsale.uz/b/core/m$load_image?sha=${cert.certificates}`}
                                            alt={`Thumbnail ${index + 1}`}
                                            className="w-full h-full object-cover"
                                        />
                                    </button>
                                ))}
                            </div>
                        )}

                        {/* Click outside to close */}
                        <div
                            className="absolute inset-0 -z-10"
                            onClick={closeModal}
                        ></div>
                    </div>
                )}

            {activeTab === 'reviews' && (
                <div className="space-y-4">
                    {master.reviews.map((review, i) => (
                        <motion.div
                            key={review.id}
                            initial={{opacity: 0, y: 20}}
                            animate={{opacity: 1, y: 0}}
                            transition={{delay: i * 0.1}}
                            className="bg-gray-950 border border-gray-800 p-6"
                        >
                            <div className="flex justify-between items-start mb-4">
                                <div className="flex items-start gap-4">
                                    <div
                                        className="w-12 h-12 bg-gray-900 border border-gray-800 flex items-center justify-center flex-shrink-0">
                                        {review.avatar ? (
                                            <img
                                                src={review.avatar}
                                                alt={review.user}
                                                className="w-full h-full object-cover"
                                            />
                                        ) : (
                                            <User className="w-6 h-6 text-gray-700"/>
                                        )}
                                    </div>
                                    <div>
                                        <div className="flex items-center gap-2">
                                            <h4 className="font-light text-white">{review.user}</h4>
                                            {review.verified && (
                                                <CheckCircle className="w-4 h-4 text-green-500"/>
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
                                <span
                                    className="text-sm text-gray-500">{t('masterDetail.installedSystem')}: {review.product}</span>
                            )}
                        </motion.div>
                    ))}
                    <Link href="/reviews"
                          className="block w-full text-center py-3 border border-gray-700 text-gray-400 hover:text-white hover:bg-gray-900 transition-all">
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
                                initial={{opacity: 0, scale: 0.9}}
                                animate={{opacity: 1, scale: 1}}
                                transition={{delay: i * 0.1}}
                                className="bg-gray-950 border border-gray-800 aspect-square flex items-center justify-center relative group cursor-pointer"
                            >
                                {item.url ? (
                                    <img
                                        src={item.url}
                                        alt={item.description}
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <Camera className="w-12 h-12 text-gray-700"/>
                                )}
                                {item.description && (
                                    <div
                                        className="absolute bottom-0 left-0 right-0 bg-black/80 p-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <p className="text-xs text-gray-300">{item.description}</p>
                                    </div>
                                )}
                            </motion.div>
                        ))
                    ) : (
                        <div className="col-span-full text-center py-12">
                            <Camera className="w-16 h-16 text-gray-700 mx-auto mb-4"/>
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

{/* Booking Modal */
}
    <AnimatePresence>
        {showBooking && (
            <motion.div
                initial={{opacity: 0}}
                animate={{opacity: 1}}
                exit={{opacity: 0}}
                className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50"
                onClick={() => {
                    setShowBooking(false)
                    setSelectedService(null)
                }}
            >
                <motion.div
                    initial={{scale: 0.95}}
                    animate={{scale: 1}}
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
                            <X className="w-5 h-5"/>
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
                            <select
                                className="w-full px-4 py-3 bg-black border border-gray-800 text-white focus:border-gray-700 focus:outline-none">
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
                        <select
                            className="w-full px-4 py-3 bg-black border border-gray-800 text-white focus:border-gray-700 focus:outline-none">
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