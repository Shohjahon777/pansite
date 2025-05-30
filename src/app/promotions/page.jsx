'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'
import Link from 'next/link'
import { 
  Gift,
  Percent,
  Timer,
  Tag,
  Zap,
  Users,
  Calendar,
  ArrowRight,
  Clock,
  CheckCircle,
  Star,
  TrendingUp,
  Copy,
  Check,
  AlertCircle,
  Sparkles,
  Trophy,
  Target,
  DollarSign
} from 'lucide-react'
import { useTranslation } from '../../hooks/useTranslation'
import { promotionsLocales } from './promotionsLocales'

export default function PromotionsPage() {
  const [selectedType, setSelectedType] = useState('all')
  const [copiedCode, setCopiedCode] = useState(null)
  const [savedPromotions, setSavedPromotions] = useState([])
  const { scrollY } = useScroll()
  const { t } = useTranslation(promotionsLocales)
  
  const backgroundY = useTransform(scrollY, [0, 500], [0, 150])
  
  // Real countdown timer
  const CountdownTimer = ({ endDate }) => {
    const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 })
    
    useEffect(() => {
      const timer = setInterval(() => {
        const end = new Date(endDate)
        const now = new Date()
        const diff = end - now
        
        if (diff > 0) {
          setTimeLeft({
            days: Math.floor(diff / (1000 * 60 * 60 * 24)),
            hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
            minutes: Math.floor((diff / 1000 / 60) % 60),
            seconds: Math.floor((diff / 1000) % 60)
          })
        }
      }, 1000)
      
      return () => clearInterval(timer)
    }, [endDate])
    
    return (
      <div className="flex gap-3">
        {Object.entries(timeLeft).map(([unit, value]) => (
          <motion.div
            key={unit}
            className="text-center"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200 }}
          >
            <motion.div 
              className="text-3xl font-thin text-white bg-gray-900 border border-gray-800 w-16 h-16 flex items-center justify-center"
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              {String(value).padStart(2, '0')}
            </motion.div>
            <div className="text-xs text-gray-500 uppercase mt-1">
              {t(`promotions.timer.${unit}`)}
            </div>
          </motion.div>
        ))}
      </div>
    )
  }
  
  const promotions = [
    {
      id: 1,
      type: 'discount',
      title: t('promotions.items.summerSale.title'),
      description: t('promotions.items.summerSale.description'),
      discount: '15%',
      validUntil: '2025-06-30',
      code: 'SUMMER2025',
      icon: Percent,
      featured: true,
      savedCount: 234,
      color: 'from-blue-900/30 via-purple-900/30 to-pink-900/30',
      conditions: [
        t('promotions.items.summerSale.conditions.0'),
        t('promotions.items.summerSale.conditions.1'),
        t('promotions.items.summerSale.conditions.2')
      ],
      benefits: ['Экономия до $100', 'Бесплатная диагностика', 'Гарантия 2 года']
    },
    {
      id: 2,
      type: 'bundle',
      title: t('promotions.items.installationBundle.title'),
      description: t('promotions.items.installationBundle.description'),
      discount: t('promotions.items.installationBundle.discount'),
      validUntil: '2025-06-15',
      icon: Gift,
      savedCount: 167,
      color: 'from-green-900/30 via-emerald-900/30 to-teal-900/30',
      conditions: [
        t('promotions.items.installationBundle.conditions.0'),
        t('promotions.items.installationBundle.conditions.1')
      ],
      benefits: ['LCD брелок в подарок', 'Стоимость $120', 'Премиум качество']
    },
    {
      id: 3,
      type: 'referral',
      title: t('promotions.items.referral.title'),
      description: t('promotions.items.referral.description'),
      discount: '$50',
      validUntil: '2025-12-31',
      icon: Users,
      savedCount: 89,
      color: 'from-orange-900/30 via-amber-900/30 to-yellow-900/30',
      conditions: [
        t('promotions.items.referral.conditions.0'),
        t('promotions.items.referral.conditions.1')
      ],
      benefits: ['Неограниченное количество', 'Накопительная скидка', 'Для друзей тоже скидка']
    },
    {
      id: 4,
      type: 'flash',
      title: t('promotions.items.flash.title'),
      description: t('promotions.items.flash.description'),
      discount: '20%',
      validUntil: '2025-06-01T23:59:59',
      icon: Zap,
      limited: true,
      savedCount: 412,
      color: 'from-red-900/30 via-pink-900/30 to-rose-900/30',
      conditions: [
        t('promotions.items.flash.conditions.0'),
        t('promotions.items.flash.conditions.1')
      ],
      benefits: ['Максимальная скидка', 'Только 50 систем', 'Первым покупателям']
    }
  ]
  
  const types = [
    { value: 'all', label: t('promotions.types.all'), icon: Tag },
    { value: 'discount', label: t('promotions.types.discount'), icon: Percent },
    { value: 'bundle', label: t('promotions.types.bundle'), icon: Gift },
    { value: 'referral', label: t('promotions.types.referral'), icon: Users },
    { value: 'flash', label: t('promotions.types.flash'), icon: Zap }
  ]
  
  const filteredPromotions = selectedType === 'all' 
    ? promotions 
    : promotions.filter(p => p.type === selectedType)
  
  const copyPromoCode = (code) => {
    navigator.clipboard.writeText(code)
    setCopiedCode(code)
    setTimeout(() => setCopiedCode(null), 2000)
  }
  
  const toggleSavePromotion = (id) => {
    setSavedPromotions(prev =>
      prev.includes(id)
        ? prev.filter(item => item !== id)
        : [...prev, id]
    )
  }
  
  // Animated promo banner
  const PromoBanner = () => (
    <motion.div
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative mb-12 overflow-hidden"
    >
      <div className="bg-gradient-to-r from-purple-950/50 via-pink-950/50 to-purple-950/50 border border-purple-900/30 p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            >
              <Trophy className="w-8 h-8 text-yellow-400" />
            </motion.div>
            <div>
              <h3 className="text-lg font-light text-white">
                {t('promotions.banner.title')}
              </h3>
              <p className="text-sm text-gray-400">
                {t('promotions.banner.subtitle')}
              </p>
            </div>
          </div>
          <motion.button
            className="bg-white text-black px-6 py-2 text-sm font-medium"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {t('promotions.banner.button')}
          </motion.button>
        </div>
      </div>
    </motion.div>
  )
  
  return (
    <div className="page-container min-h-screen bg-black relative">
      {/* Animated background gradient */}
      <motion.div
        className="fixed inset-0 z-0"
        style={{ y: backgroundY }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-purple-950/10 via-transparent to-pink-950/10" />
      </motion.div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center mb-12"
        >
          <motion.div
            className="inline-block mb-6"
            animate={{ 
              rotate: [0, 5, -5, 0],
              scale: [1, 1.1, 1]
            }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            <Gift className="w-16 h-16 text-gray-700 mx-auto" strokeWidth={1} />
          </motion.div>
          
          <h1 className="text-5xl lg:text-6xl font-thin text-white mb-4">
            {t('promotions.title')}
          </h1>
          <p className="text-xl text-gray-500 font-light">
            {t('promotions.subtitle')}
          </p>
          
          {/* Stats */}
          <div className="flex justify-center gap-8 mt-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-center"
            >
              <div className="text-3xl font-thin text-white">156</div>
              <div className="text-sm text-gray-500">{t('promotions.stats.active')}</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-center"
            >
              <div className="text-3xl font-thin text-white">$12,450</div>
              <div className="text-sm text-gray-500">{t('promotions.stats.saved')}</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-center"
            >
              <div className="text-3xl font-thin text-white">98%</div>
              <div className="text-sm text-gray-500">{t('promotions.stats.satisfaction')}</div>
            </motion.div>
          </div>
        </motion.div>
        
        <PromoBanner />
        
        {/* Filter Tabs with icons */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {types.map((type, i) => (
            <motion.button
              key={type.value}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 }}
              onClick={() => setSelectedType(type.value)}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className={`px-6 py-3 border transition-all flex items-center gap-2 ${
                selectedType === type.value
                  ? 'bg-white text-black border-white shadow-lg shadow-white/20'
                  : 'border-gray-800 text-gray-400 hover:text-white hover:border-gray-700'
              }`}
            >
              <type.icon className="w-4 h-4" />
              <span className="font-light">{type.label}</span>
            </motion.button>
          ))}
        </div>
        
        {/* Featured Promotion with 3D effect */}
        <AnimatePresence>
          {filteredPromotions.filter(p => p.featured).map(promo => (
            <motion.div
              key={promo.id}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              className="mb-16 perspective-1000"
            >
              <motion.div
                className={`bg-gradient-to-br ${promo.color} border border-gray-800 overflow-hidden relative`}
                whileHover={{ 
                  rotateX: 2,
                  rotateY: -2,
                  scale: 1.02
                }}
                style={{ transformStyle: 'preserve-3d' }}
              >
                {/* Animated sparkles */}
                {[...Array(5)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-1 h-1 bg-white rounded-full"
                    animate={{
                      x: [0, Math.random() * 200 - 100],
                      y: [0, Math.random() * 200 - 100],
                      opacity: [0, 1, 0]
                    }}
                    transition={{
                      duration: 3,
                      delay: i * 0.5,
                      repeat: Infinity
                    }}
                    style={{
                      left: `${Math.random() * 100}%`,
                      top: `${Math.random() * 100}%`
                    }}
                  />
                ))}
                
                <div className="grid grid-cols-1 lg:grid-cols-2 relative z-10">
                  <div className="p-8 lg:p-12">
                    <div className="flex items-center gap-3 mb-6">
                      <motion.div
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        <Sparkles className="w-6 h-6 text-yellow-400" />
                      </motion.div>
                      <span className="text-sm text-gray-300 uppercase tracking-wider">
                        {t('promotions.featured')}
                      </span>
                    </div>
                    
                    <h2 className="text-4xl lg:text-5xl font-thin text-white mb-6">
                      {promo.title}
                    </h2>
                    <p className="text-xl text-gray-300 mb-8 font-light">
                      {promo.description}
                    </p>
                    
                    <motion.div 
                      className="mb-8"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 200 }}
                    >
                      <div className="text-7xl font-thin text-white mb-2">{promo.discount}</div>
                      <p className="text-gray-400">{t('promotions.offText')}</p>
                    </motion.div>
                    
                    {promo.code && (
                      <div className="mb-8">
                        <p className="text-sm text-gray-400 mb-3">{t('promotions.promoCode')}</p>
                        <div className="flex items-center gap-3">
                          <motion.div 
                            className="bg-black/50 backdrop-blur border border-gray-700 px-8 py-4 flex items-center gap-4"
                            whileHover={{ scale: 1.05 }}
                          >
                            <code className="text-2xl text-white tracking-wider font-mono">
                              {promo.code}
                            </code>
                            <motion.button
                              onClick={() => copyPromoCode(promo.code)}
                              className="text-gray-400 hover:text-white transition-colors"
                              whileTap={{ scale: 0.8 }}
                            >
                              {copiedCode === promo.code ? (
                                <Check className="w-5 h-5 text-green-400" />
                              ) : (
                                <Copy className="w-5 h-5" />
                              )}
                            </motion.button>
                          </motion.div>
                        </div>
                      </div>
                    )}
                    
                    <div className="flex gap-4">
                      <Link 
                        href="/products"
                        className="inline-flex items-center gap-3 bg-white text-black px-8 py-4 hover:bg-gray-100 transition-all group"
                      >
                        <span className="font-medium">{t('promotions.usePromo')}</span>
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                      </Link>
                      <motion.button
                        onClick={() => toggleSavePromotion(promo.id)}
                        className="border border-gray-700 text-gray-300 px-8 py-4 hover:bg-gray-900 transition-all"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        {savedPromotions.includes(promo.id) ? (
                          <Star className="w-5 h-5 fill-current" />
                        ) : (
                          <Star className="w-5 h-5" />
                        )}
                      </motion.button>
                    </div>
                  </div>
                  
                  <div className="bg-black/30 backdrop-blur p-8 lg:p-12 border-l border-gray-800">
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-lg font-light text-white mb-4 flex items-center gap-2">
                          <Target className="w-5 h-5 text-gray-600" />
                          {t('promotions.benefits')}
                        </h3>
                        <div className="space-y-3">
                          {promo.benefits.map((benefit, i) => (
                            <motion.div
                              key={i}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: i * 0.1 }}
                              className="flex items-center gap-3"
                            >
                              <div className="w-8 h-8 bg-green-900/30 flex items-center justify-center">
                                <CheckCircle className="w-4 h-4 text-green-400" />
                              </div>
                              <span className="text-gray-300 font-light">{benefit}</span>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                      
                      <div>
                        <h3 className="text-lg font-light text-white mb-4 flex items-center gap-2">
                          <AlertCircle className="w-5 h-5 text-gray-600" />
                          {t('promotions.conditions')}
                        </h3>
                        <ul className="space-y-2">
                          {promo.conditions.map((condition, i) => (
                            <li key={i} className="flex items-start gap-2 text-sm text-gray-400">
                              <span className="text-gray-600 mt-1">•</span>
                              <span className="font-light">{condition}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <div className="pt-6 border-t border-gray-800">
                        <div className="flex items-center justify-between">
                          <p className="text-sm text-gray-500 flex items-center gap-2">
                            <Calendar className="w-4 h-4" />
                            {t('promotions.validUntil')}
                          </p>
                          <CountdownTimer endDate={promo.validUntil} />
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Users className="w-4 h-4" />
                        <span>{promo.savedCount} {t('promotions.peopleSaved')}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </AnimatePresence>
        
        {/* Promotions Grid with hover effects */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {filteredPromotions.filter(p => !p.featured).map((promo, i) => (
            <motion.div
              key={promo.id}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -5 }}
              className="bg-gray-950 border border-gray-800 hover:border-gray-700 transition-all relative overflow-hidden group"
            >
              {/* Animated gradient background */}
              <motion.div
                className={`absolute inset-0 bg-gradient-to-br ${promo.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
              />
              
              <div className="relative z-10 p-6">
                <div className="flex items-start justify-between mb-4">
                  <motion.div
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.5 }}
                  >
                    <promo.icon className="w-12 h-12 text-gray-700 group-hover:text-gray-600 transition-colors" strokeWidth={1} />
                  </motion.div>
                  {promo.limited && (
                    <motion.span 
                      className="bg-red-900/20 text-red-400 text-xs px-3 py-1 border border-red-900/50"
                      animate={{ scale: [1, 1.05, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      {t('promotions.limited')}
                    </motion.span>
                  )}
                </div>
                
                <h3 className="text-xl font-light text-white mb-3 group-hover:text-gray-200 transition-colors">
                  {promo.title}
                </h3>
                <p className="text-gray-500 text-sm mb-6 font-light group-hover:text-gray-400 transition-colors">
                  {promo.description}
                </p>
                
                <div className="mb-6">
                  <motion.div 
                    className="text-4xl font-thin text-white mb-2"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 200 }}
                  >
                    {promo.discount}
                  </motion.div>
                  {promo.code && (
                    <div className="flex items-center gap-2 mt-2">
                      <code className="text-sm text-gray-400 bg-gray-900 px-3 py-1 font-mono">
                        {promo.code}
                      </code>
                      <motion.button
                        onClick={() => copyPromoCode(promo.code)}
                        className="text-gray-600 hover:text-white transition-colors"
                        whileTap={{ scale: 0.8 }}
                      >
                        {copiedCode === promo.code ? (
                          <Check className="w-4 h-4 text-green-400" />
                        ) : (
                          <Copy className="w-4 h-4" />
                        )}
                      </motion.button>
                    </div>
                  )}
                </div>
                
                {promo.limited && (
                  <div className="mb-6">
                    <CountdownTimer endDate={promo.validUntil} />
                  </div>
                )}
                
                {promo.benefits && (
                  <div className="space-y-2 mb-6">
                    {promo.benefits.slice(0, 2).map((benefit, j) => (
                      <p key={j} className="text-xs text-gray-600 flex items-center gap-2">
                        <DollarSign className="w-3 h-3" />
                        <span>{benefit}</span>
                      </p>
                    ))}
                  </div>
                )}
                
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-600 flex items-center gap-1">
                    <Users className="w-3 h-3" />
                    {promo.savedCount} {t('promotions.saved')}
                  </span>
                  <Link 
                    href="/products"
                    className="text-white hover:text-gray-300 transition-colors group/arrow"
                  >
                    <motion.div
                      className="flex items-center gap-1"
                      whileHover={{ x: 5 }}
                    >
                      <span className="text-sm">{t('promotions.use')}</span>
                      <ArrowRight className="w-4 h-4" />
                    </motion.div>
                  </Link>
                </div>
                
                <motion.button
                  onClick={() => toggleSavePromotion(promo.id)}
                  className="absolute top-4 right-4 text-gray-600 hover:text-white transition-colors"
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                >
                  {savedPromotions.includes(promo.id) ? (
                    <Star className="w-5 h-5 fill-current text-yellow-400" />
                  ) : (
                    <Star className="w-5 h-5" />
                  )}
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>
        
        {/* Interactive CTA Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="relative"
        >
          <div className="bg-gradient-to-br from-gray-900 via-gray-950 to-black border border-gray-800 p-16 text-center relative overflow-hidden">
            {/* Animated background elements */}
            <motion.div
              className="absolute inset-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              {[...Array(10)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-32 h-32 bg-gradient-to-br from-purple-900/10 to-pink-900/10 rounded-full blur-3xl"
                  animate={{
                    x: [0, 100, 0],
                    y: [0, -100, 0],
                    scale: [1, 1.5, 1]
                  }}
                  transition={{
                    duration: 10 + i * 2,
                    repeat: Infinity,
                    delay: i * 0.5
                  }}
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`
                  }}
                />
              ))}
            </motion.div>
            
            <div className="relative z-10">
              <motion.div
                animate={{ 
                  rotate: [0, 360],
                  scale: [1, 1.1, 1]
                }}
                transition={{ duration: 20, repeat: Infinity }}
                className="inline-block mb-8"
              >
                <TrendingUp className="w-20 h-20 text-gray-700 mx-auto" strokeWidth={0.5} />
              </motion.div>
              
              <h2 className="text-4xl lg:text-5xl font-thin text-white mb-6">
                {t('promotions.cta.title')}
              </h2>
              <p className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto font-light">
                {t('promotions.cta.subtitle')}
              </p>
              
              <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link 
                    href="/products"
                    className="inline-flex items-center gap-3 bg-white text-black px-10 py-5 text-lg font-medium group"
                  >
                    <span>{t('promotions.cta.shopNow')}</span>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                  </Link>
                </motion.div>
                
                <motion.a
                  href="tel:+998901234567"
                  className="inline-flex items-center gap-3 border border-gray-700 text-white px-10 py-5 text-lg hover:bg-gray-900 transition-all"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span>{t('promotions.cta.callUs')}</span>
                  <span className="text-gray-500">24/7</span>
                </motion.a>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}