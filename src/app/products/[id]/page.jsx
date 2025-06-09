'use client'

import {useEffect, useState} from 'react'
import {motion} from 'framer-motion'
import Link from 'next/link'
import {useParams} from 'next/navigation'
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
import {useTranslation} from '../../../hooks/useTranslation'
import {productDetailLocales} from './productDetail'
import axios from "axios";
import {useLanguageStore} from "@/src/store/language";

export default function ProductDetailPage() {
    const params = useParams()
    const [activeTab, setActiveTab] = useState('features')
    const [products, setProducts] = useState([])
    const [currentProduct, setCurrentProduct] = useState(null)
    const [loading, setLoading] = useState(true)
    const [selectedImageIndex, setSelectedImageIndex] = useState(0)
    const {t} = useTranslation(productDetailLocales)
    const {currentLocale} = useLanguageStore()


    const getProductIcon = (name, category) => {
        if (name === undefined) return Zap

        const lowerName = name.toLowerCase()

        if (lowerName.includes('dx 9') || lowerName.includes('dx9')) {
            return Shield
        } else if (lowerName.includes('vx 4g') || lowerName.includes('4g')) {
            return Smartphone
        } else if (lowerName.includes('dxl') || lowerName.includes('ux')) {
            return Cpu
        } else if (lowerName.includes('dx 40') || lowerName.includes('dx40')) {
            return Car
        } else {
            return Zap
        }
    }

    // Function to process API product data into component format
    const processProductData = (apiProduct) => {
        const basePrice = parseInt(apiProduct.price) || 250000
        const usdPrice = Math.round(basePrice / 12500)

        // Process technical specifications
        const technicalSpecs = {}
        if (apiProduct.tech_specifications_name && apiProduct.tech_specifications_value) {
            apiProduct.tech_specifications_name.forEach((name, index) => {
                if (apiProduct.tech_specifications_value[index]) {
                    technicalSpecs[name] = apiProduct.tech_specifications_value[index]
                }
            })
        }

        // Process box contents
        const boxContents = []
        if (apiProduct.features && apiProduct.features.length > 0) {
            const featuresArray = Array.isArray(apiProduct.features)
                ? apiProduct.features
                : [apiProduct.features]

            featuresArray.forEach(feature => {
                if (typeof feature === 'string' && feature.includes(',')) {
                    boxContents.push(...feature.split(',').map(f => f.trim()))
                } else {
                    boxContents.push(feature)
                }
            })
        }

        // Process main features
        const mainFeatures = Array.isArray(apiProduct.detail_info)
            ? apiProduct.detail_info
            : (apiProduct.detail_info ? [apiProduct.detail_info] : [])

        // Process compatibility
        const compatibility = Array.isArray(apiProduct.compatibility)
            ? apiProduct.compatibility
            : (apiProduct.compatibility ? [apiProduct.compatibility] : [])

        // Process description
        const description = Array.isArray(apiProduct.description)
            ? apiProduct.description.join(' ')
            : (apiProduct.description || `${apiProduct.name} - высококачественный продукт для вашего автомобиля`)

        // Process images - handle both single image and multiple images
        const images = []
        if (apiProduct.img) {
            if (Array.isArray(apiProduct.img)) {
                // Multiple images
                apiProduct.img.forEach(img => {
                    if (img) {
                        images.push(img)
                    }
                })
            } else {
                // Single image
                images.push(apiProduct.img)
            }
        }

        return {
            id: apiProduct.id,
            name: apiProduct.name,
            price: usdPrice,
            rating: 4.5 + (Math.random() * 0.4), // Generate rating between 4.5-4.9
            reviewsCount: Math.floor(Math.random() * 200) + 50,
            description: description,
            icon: getProductIcon(apiProduct.name, apiProduct.category),
            images: images,
            cardLabel: apiProduct.card_label || null,
            features: {
                main: mainFeatures,
                technical: technicalSpecs
            },
            compatibility: compatibility,
            boxContents: boxContents,
            category: apiProduct.category,
            phone: apiProduct.phone,
        }
    }

    // Fetch products from API
    const fetchProducts = async () => {
        try {
            setLoading(true)
            const response = await axios.post('/api/get-products', {locale: currentLocale})
            if (response.status !== 200) {
                throw new Error(`HTTP error! status: ${response.status}`)
            }
            setProducts(response.data)
        } catch (error) {
            console.error('Error fetching products:', error)
        } finally {
            setLoading(false)
        }
    }

    // Effect to fetch products when locale changes
    useEffect(() => {
        fetchProducts()
    }, [currentLocale])

    // Effect to set current product when products are loaded or params change
    useEffect(() => {
        if (products.length > 0 && params.id) {
            const product = products.find(p => p.id === params.id)
            if (product) {
                setCurrentProduct(processProductData(product))
            }
        }
    }, [products, params.id])

    // Loading state
    if (loading) {
        return (
            <div className="page-container min-h-screen bg-black flex items-center justify-center">
                <div className="text-white">Loading...</div>
            </div>
        )
    }

    // Product not found state
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
                    <Link href="/"
                          className="hover:text-white transition-colors">{t('productDetail.breadcrumbs.home')}</Link>
                    <span>/</span>
                    <Link href="/products"
                          className="hover:text-white transition-colors">{t('productDetail.breadcrumbs.products')}</Link>
                    <span>/</span>
                    <span className="text-gray-300">{currentProduct.name}</span>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Product Image */}
                    <motion.div
                        initial={{opacity: 0, x: -20}}
                        animate={{opacity: 1, x: 0}}
                    >
                        <div className="bg-gradient-to-br from-gray-900 to-gray-950 border border-gray-800 p-16 flex items-center justify-center relative">
                            {/* Card Label */}
                            {currentProduct.cardLabel && (
                                <div className="absolute top-4 left-4 bg-red-600 text-white px-3 py-1 text-sm font-medium">
                                    {currentProduct.cardLabel}
                                </div>
                            )}

                            {/* Main Product Image */}
                            {currentProduct.images && currentProduct.images.length > 0 ? (
                                <img
                                    src={`${currentProduct.images}`}
                                    alt={currentProduct.name}
                                    className="w-48 h-48 object-contain"
                                    onError={(e) => {
                                        e.target.style.display = 'none'
                                        e.target.nextSibling.style.display = 'block'
                                    }}
                                />
                            ) : null}

                            {/* Fallback Icon */}
                            <Icon
                                className="w-48 h-48 text-gray-700"
                                strokeWidth={0.5}
                                style={{display: (currentProduct.images && currentProduct.images.length > 0) ? 'none' : 'block'}}
                            />
                        </div>

                        {currentProduct.images && currentProduct.images.length > 1 && (
                            <div className="flex gap-4 mt-4 flex-wrap">
                                {currentProduct.images.map((image, index) => (
                                    <div
                                        key={index}
                                        className={`bg-gray-950 border cursor-pointer transition-all ${
                                            selectedImageIndex === index ? 'border-white' : 'border-gray-800 hover:border-gray-600'
                                        } p-4 flex items-center justify-center`}
                                        onClick={() => setSelectedImageIndex(index)}
                                    >
                                        <img
                                            src={`${image}`}
                                            alt={`${currentProduct.name} ${index + 1}`}
                                            className="w-12 h-12 object-contain"
                                            onError={(e) => {
                                                e.target.style.display = 'none'
                                                e.target.nextSibling.style.display = 'block'
                                            }}
                                        />
                                        <Icon className="w-12 h-12 text-gray-700" strokeWidth={1}
                                              style={{display: 'none'}}/>
                                    </div>
                                ))}
                            </div>
                        )}
                    </motion.div>

                    {/* Product Info */}
                    <motion.div
                        initial={{opacity: 0, x: 20}}
                        animate={{opacity: 1, x: 0}}
                    >
                        <h1 className="text-4xl font-thin text-white mb-4">{currentProduct.name}</h1>
                        <div className="flex items-center space-x-4 mb-6">
                            <div className="flex text-white">
                                {[...Array(5)].map((_, i) => (
                                    <Star key={i}
                                          className={`w-5 h-5 ${i < Math.floor(currentProduct.rating) ? 'fill-current' : ''}`}/>
                                ))}
                            </div>
                            <span className="text-gray-400">
                                {currentProduct.rating.toFixed(1)} ({currentProduct.reviewsCount} {t('productDetail.reviews')})
                            </span>
                        </div>

                        <p className="text-gray-400 mb-8 font-light">{currentProduct.description}</p>

                        <div className="bg-gray-950 border border-gray-800 p-6 mb-6">
                            <div className="text-4xl font-thin text-white mb-2">${currentProduct.price}</div>
                            <button className="w-full bg-white text-black py-3 mb-2 hover:bg-gray-100 transition-colors font-medium flex items-center justify-center gap-2">
                                <ShoppingCart className="w-5 h-5"/>
                                {t('productDetail.orderInstallation')}
                            </button>
                            <Link href="/service"
                                  className="block w-full text-center border border-gray-700 text-gray-300 py-3 hover:bg-gray-900 transition-all flex items-center justify-center gap-2">
                                <MapPin className="w-5 h-5"/>
                                {t('productDetail.findMaster')}
                            </Link>
                        </div>

                        {/* In the Box Section */}
                        {currentProduct.boxContents.length > 0 && (
                            <div className="bg-gray-950 border border-gray-800 p-6">
                                <h3 className="font-light mb-3 text-white">{t('productDetail.inBox')}:</h3>
                                <ul className="space-y-2 text-sm text-gray-400">
                                    {currentProduct.boxContents.map((item, index) => (
                                        <li key={index}>• {item}</li>
                                    ))}
                                </ul>
                            </div>
                        )}
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
                                {/*{tab === 'reviews' && t('productDetail.tabs.reviews')}*/}
                            </button>
                        ))}
                    </div>

                    <div className="py-8">
                        {activeTab === 'features' && (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                {/* Main Features */}
                                {currentProduct.features.main.length > 0 && (
                                    <div>
                                        <h3 className="font-light text-lg mb-4 text-white">{t('productDetail.mainFeatures')}</h3>
                                        <ul className="space-y-3">
                                            {currentProduct.features.main.map((feature, i) => (
                                                <li key={i} className="flex items-start text-gray-300">
                                                    <Check className="w-5 h-5 text-gray-600 mr-2 mt-0.5"/>
                                                    <span className="font-light">{feature}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}

                                {/* Technical Specifications */}
                                {Object.keys(currentProduct.features.technical).length > 0 && (
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
                                )}
                            </div>
                        )}

                        {activeTab === 'compatibility' && (
                            <div>
                                <h3 className="font-light text-lg mb-4 text-white">{t('productDetail.supportedCars')}</h3>
                                {currentProduct.compatibility.length > 0 ? (
                                    <ul className="space-y-2">
                                        {currentProduct.compatibility.map((item, i) => (
                                            <li key={i} className="flex items-center text-gray-300">
                                                <Check className="w-5 h-5 text-green-500 mr-2"/>
                                                <span className="font-light">{item}</span>
                                            </li>
                                        ))}
                                    </ul>
                                ) : (
                                    <p className="text-gray-400">{t('productDetail.noCompatibilityInfo')}</p>
                                )}
                                <div className="mt-6 p-4 bg-blue-950/20 border border-blue-900">
                                    <p className="text-sm text-gray-300">
                                        {t('productDetail.notFoundCar')}
                                    </p>
                                    <a href={`tel:${currentProduct.phone}`}
                                       className="text-blue-400 font-light hover:text-blue-300">
                                        {currentProduct.phone}
                                    </a>
                                </div>
                            </div>
                        )}

                        {/*{activeTab === 'reviews' && (*/}
                        {/*    <div>*/}
                        {/*        <p className="text-gray-400">Reviews section coming soon...</p>*/}
                        {/*    </div>*/}
                        {/*)}*/}
                    </div>
                </div>
            </div>
        </div>
    )
}