'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { 
  Calendar,
  Clock,
  ArrowRight,
  Tag,
  TrendingUp,
  Award,
  Package,
  Shield,
  Newspaper,
  Sparkles,
  Eye,
  Heart,
  Share2,
  BookOpen,
  ChevronRight,
  AlertCircle,
  Zap
} from 'lucide-react'
import { useTranslation } from '../../hooks/useTranslation'
import { newsLocales } from './newsLocales'

export default function NewsPage() {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [hoveredItem, setHoveredItem] = useState(null)
  const [likedItems, setLikedItems] = useState([])
  const [viewMode, setViewMode] = useState('grid') // grid or list
  const { t } = useTranslation(newsLocales)
  
  // Animated background particles
  const FloatingParticle = ({ delay }) => (
    <motion.div
      className="absolute w-1 h-1 bg-gray-700 rounded-full"
      initial={{ 
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        opacity: 0 
      }}
      animate={{ 
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        opacity: [0, 1, 0]
      }}
      transition={{
        duration: 20,
        delay,
        repeat: Infinity,
        ease: "linear"
      }}
    />
  )
  
  const newsItems = [
    {
      id: 1,
      title: t('news.items.newModel.title'),
      excerpt: t('news.items.newModel.excerpt'),
      content: t('news.items.newModel.content'),
      category: 'product',
      date: '28.05.2025',
      readTime: '3 мин',
      views: 1234,
      likes: 89,
      image: null,
      featured: true,
      icon: Package,
      color: 'from-purple-900/20 to-pink-900/20',
      tags: ['Новинка', 'DXL-6000', 'AI']
    },
    {
      id: 2,
      title: t('news.items.training.title'),
      excerpt: t('news.items.training.excerpt'),
      content: t('news.items.training.content'),
      category: 'event',
      date: '25.05.2025',
      readTime: '2 мин',
      views: 567,
      likes: 45,
      image: null,
      icon: Award,
      color: 'from-blue-900/20 to-cyan-900/20',
      tags: ['Обучение', 'Сертификация']
    },
    {
      id: 3,
      title: t('news.items.partnership.title'),
      excerpt: t('news.items.partnership.excerpt'),
      content: t('news.items.partnership.content'),
      category: 'company',
      date: '20.05.2025',
      readTime: '4 мин',
      views: 892,
      likes: 67,
      image: null,
      icon: TrendingUp,
      color: 'from-green-900/20 to-emerald-900/20',
      tags: ['Партнерство', 'Расширение']
    },
    {
      id: 4,
      title: t('news.items.technology.title'),
      excerpt: t('news.items.technology.excerpt'),
      content: t('news.items.technology.content'),
      category: 'technology',
      date: '15.05.2025',
      readTime: '5 мин',
      views: 2103,
      likes: 156,
      image: null,
      icon: Shield,
      color: 'from-orange-900/20 to-red-900/20',
      tags: ['Обновление', 'Приложение', 'v3.0']
    },
    {
      id: 5,
      title: t('news.items.award.title'),
      excerpt: t('news.items.award.excerpt'),
      content: t('news.items.award.content'),
      category: 'company',
      date: '10.05.2025',
      readTime: '3 мин',
      views: 1567,
      likes: 203,
      image: null,
      icon: Sparkles,
      color: 'from-yellow-900/20 to-amber-900/20',
      tags: ['Награда', 'Достижение']
    }
  ]
  
  const categories = [
    { value: 'all', label: t('news.categories.all'), count: newsItems.length, icon: Newspaper },
    { value: 'product', label: t('news.categories.products'), count: 2, icon: Package },
    { value: 'event', label: t('news.categories.events'), count: 1, icon: Calendar },
    { value: 'company', label: t('news.categories.company'), count: 2, icon: TrendingUp },
    { value: 'technology', label: t('news.categories.technology'), count: 1, icon: Shield }
  ]
  
  const filteredNews = selectedCategory === 'all' 
    ? newsItems 
    : newsItems.filter(item => item.category === selectedCategory)
  
  const handleLike = (id) => {
    setLikedItems(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id)
        : [...prev, id]
    )
  }
  
  // Breaking news ticker
  const BreakingNews = () => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-gradient-to-r from-red-950/20 to-red-900/10 border-y border-red-900/30 py-3 mb-12 overflow-hidden"
    >
      <div className="flex items-center">
        <div className="flex items-center gap-2 px-6 border-r border-red-900/30">
          <Zap className="w-4 h-4 text-red-400 animate-pulse" />
          <span className="text-red-400 text-sm font-medium uppercase tracking-wider">
            {t('news.breaking')}
          </span>
        </div>
        <motion.div
          className="flex gap-12 px-6"
          animate={{ x: [-1000, 1000] }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        >
          <span className="text-gray-300 whitespace-nowrap">
            Скидка 20% на все системы только сегодня! • Новая Pandora DXL-6000 уже в продаже • 
            Бесплатная диагностика при установке • Приведи друга и получи $50
          </span>
        </motion.div>
      </div>
    </motion.div>
  )
  
  return (
    <div className="page-container min-h-screen bg-black relative overflow-hidden">
      {/* Animated background */}
      <div className="fixed inset-0 z-0">
        {[...Array(20)].map((_, i) => (
          <FloatingParticle key={i} delay={i * 0.5} />
        ))}
      </div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <motion.div
            className="inline-block mb-6"
            whileHover={{ scale: 1.05 }}
          >
            <Newspaper className="w-16 h-16 text-gray-700 mx-auto mb-4" strokeWidth={1} />
          </motion.div>
          <h1 className="text-5xl lg:text-6xl font-thin text-white mb-4">
            {t('news.title')}
          </h1>
          <p className="text-xl text-gray-500 font-light">
            {t('news.subtitle')}
          </p>
        </motion.div>
        
        <BreakingNews />
        
        {/* Categories with icons */}
        <div className="flex flex-wrap justify-center gap-3 mb-8">
          {categories.map((cat, i) => (
            <motion.button
              key={cat.value}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 }}
              onClick={() => setSelectedCategory(cat.value)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-6 py-3 border transition-all flex items-center gap-3 ${
                selectedCategory === cat.value
                  ? 'bg-white text-black border-white'
                  : 'border-gray-800 text-gray-400 hover:text-white hover:border-gray-700'
              }`}
            >
              <cat.icon className="w-4 h-4" />
              <span className="font-light">{cat.label}</span>
              <span className="text-xs opacity-60">({cat.count})</span>
            </motion.button>
          ))}
        </div>
        
        {/* View mode toggle */}
        <div className="flex justify-end mb-6">
          <div className="inline-flex border border-gray-800 p-1">
            <button
              onClick={() => setViewMode('grid')}
              className={`px-4 py-2 text-sm transition-all ${
                viewMode === 'grid' ? 'bg-white text-black' : 'text-gray-400'
              }`}
            >
              Сетка
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`px-4 py-2 text-sm transition-all ${
                viewMode === 'list' ? 'bg-white text-black' : 'text-gray-400'
              }`}
            >
              Список
            </button>
          </div>
        </div>
        
        {/* Featured News Card */}
        <AnimatePresence mode="wait">
          {selectedCategory === 'all' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="mb-12"
            >
              {newsItems.filter(item => item.featured).map(item => (
                <Link key={item.id} href={`/news/${item.id}`}>
                  <motion.div
                    className={`bg-gradient-to-br ${item.color} border border-gray-800 overflow-hidden group relative`}
                    whileHover={{ scale: 1.01 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    {/* Animated gradient background */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-br from-transparent via-white/5 to-transparent"
                      animate={{
                        x: [-300, 300],
                        opacity: [0, 1, 0]
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "linear"
                      }}
                    />
                    
                    <div className="relative p-8 lg:p-12">
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                        <div>
                          <div className="flex items-center gap-4 mb-6">
                            <motion.div
                              animate={{ rotate: 360 }}
                              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                            >
                              <Sparkles className="w-6 h-6 text-yellow-400" />
                            </motion.div>
                            <span className="text-sm text-gray-400 uppercase tracking-wider">
                              {t('news.featured')}
                            </span>
                          </div>
                          
                          <h2 className="text-4xl lg:text-5xl font-thin text-white mb-6 leading-tight">
                            {item.title}
                          </h2>
                          
                          <p className="text-xl text-gray-300 mb-8 font-light leading-relaxed">
                            {item.excerpt}
                          </p>
                          
                          <div className="flex flex-wrap gap-3 mb-8">
                            {item.tags.map(tag => (
                              <span key={tag} className="px-3 py-1 bg-white/10 backdrop-blur text-white text-sm">
                                #{tag}
                              </span>
                            ))}
                          </div>
                          
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-6 text-sm text-gray-400">
                              <span className="flex items-center gap-2">
                                <Eye className="w-4 h-4" />
                                {item.views}
                              </span>
                              <span className="flex items-center gap-2">
                                <Heart className="w-4 h-4" />
                                {item.likes}
                              </span>
                              <span className="flex items-center gap-2">
                                <Clock className="w-4 h-4" />
                                {item.readTime}
                              </span>
                            </div>
                            <motion.span 
                              className="text-white flex items-center gap-2 group-hover:gap-4 transition-all"
                              whileHover={{ x: 5 }}
                            >
                              {t('news.readMore')}
                              <ArrowRight className="w-5 h-5" />
                            </motion.span>
                          </div>
                        </div>
                        
                        <div className="hidden lg:flex justify-center">
                          <motion.div
                            className="relative"
                            animate={{ y: [0, -10, 0] }}
                            transition={{ duration: 4, repeat: Infinity }}
                          >
                            <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 blur-3xl opacity-20" />
                            <item.icon className="w-48 h-48 text-gray-700" strokeWidth={0.5} />
                          </motion.div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </Link>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* News Grid/List */}
        <AnimatePresence mode="wait">
          <motion.div
            key={viewMode}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={viewMode === 'grid' 
              ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" 
              : "space-y-4"
            }
          >
            {filteredNews.filter(item => !item.featured || selectedCategory !== 'all').map((item, i) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                onMouseEnter={() => setHoveredItem(item.id)}
                onMouseLeave={() => setHoveredItem(null)}
              >
                <Link href={`/news/${item.id}`}>
                  <motion.article 
                    className={`bg-gray-950 border border-gray-800 overflow-hidden group relative ${
                      viewMode === 'list' ? 'flex' : ''
                    }`}
                    whileHover={{ 
                      scale: viewMode === 'grid' ? 1.02 : 1,
                      borderColor: 'rgb(107 114 128)'
                    }}
                  >
                    {/* Animated background on hover */}
                    <AnimatePresence>
                      {hoveredItem === item.id && (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className={`absolute inset-0 bg-gradient-to-br ${item.color} z-0`}
                        />
                      )}
                    </AnimatePresence>
                    
                    <div className={`relative z-10 ${viewMode === 'list' ? 'flex-shrink-0 w-48' : ''}`}>
                      <div className={`${viewMode === 'list' ? 'h-full' : 'aspect-video'} bg-gray-900 border-b border-gray-800 flex items-center justify-center relative overflow-hidden`}>
                        <motion.div
                          animate={hoveredItem === item.id ? { scale: 1.1, rotate: 5 } : {}}
                        >
                          <item.icon className="w-16 h-16 text-gray-700" strokeWidth={1} />
                        </motion.div>
                        
                        {/* Category badge */}
                        <div className="absolute top-4 left-4">
                          <span className="px-3 py-1 bg-black/80 backdrop-blur text-xs text-gray-400 uppercase tracking-wider">
                            {categories.find(c => c.value === item.category)?.label}
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    <div className={`relative z-10 p-6 ${viewMode === 'list' ? 'flex-1' : ''}`}>
                      <h3 className={`${viewMode === 'list' ? 'text-2xl' : 'text-xl'} font-light text-white mb-3 group-hover:text-gray-300 transition-colors`}>
                        {item.title}
                      </h3>
                      
                      <p className="text-gray-500 mb-4 font-light line-clamp-2">
                        {item.excerpt}
                      </p>
                      
                      <div className="flex flex-wrap gap-2 mb-4">
                        {item.tags.slice(0, 2).map(tag => (
                          <span key={tag} className="text-xs text-gray-600">
                            #{tag}
                          </span>
                        ))}
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4 text-xs text-gray-600">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {item.date}
                          </span>
                          <span className="flex items-center gap-1">
                            <Eye className="w-3 h-3" />
                            {item.views}
                          </span>
                          <motion.button
                            onClick={(e) => {
                              e.preventDefault()
                              handleLike(item.id)
                            }}
                            whileTap={{ scale: 0.9 }}
                            className={`flex items-center gap-1 ${
                              likedItems.includes(item.id) ? 'text-red-400' : ''
                            }`}
                          >
                            <Heart className={`w-3 h-3 ${likedItems.includes(item.id) ? 'fill-current' : ''}`} />
                            {item.likes + (likedItems.includes(item.id) ? 1 : 0)}
                          </motion.button>
                        </div>
                        
                        <motion.div
                          className="text-gray-400 group-hover:text-white transition-colors"
                          whileHover={{ x: 5 }}
                        >
                          <ChevronRight className="w-5 h-5" />
                        </motion.div>
                      </div>
                    </div>
                  </motion.article>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
        
        {/* Load More with animation */}
        <motion.div 
          className="text-center mt-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <motion.button 
            className="relative group border border-gray-700 text-gray-400 px-12 py-4 overflow-hidden"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-gray-900 to-gray-800"
              initial={{ x: '-100%' }}
              whileHover={{ x: 0 }}
              transition={{ duration: 0.3 }}
            />
            <span className="relative z-10 font-light">{t('news.loadMore')}</span>
          </motion.button>
        </motion.div>
        
        {/* Newsletter signup with animation */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-24"
        >
          <div className="bg-gradient-to-br from-gray-900 via-gray-950 to-black border border-gray-800 p-12 relative overflow-hidden">
            <motion.div
              className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-purple-900/20 to-pink-900/20 blur-3xl"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.5, 0.3]
              }}
              transition={{
                duration: 8,
                repeat: Infinity
              }}
            />
            
            <div className="relative z-10 text-center max-w-2xl mx-auto">
              <BookOpen className="w-12 h-12 text-gray-700 mx-auto mb-6" />
              <h2 className="text-3xl font-thin text-white mb-4">
                {t('news.newsletter.title')}
              </h2>
              <p className="text-gray-400 mb-8 font-light">
                {t('news.newsletter.description')}
              </p>
              <form className="flex gap-4 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder={t('news.newsletter.placeholder')}
                  className="flex-1 px-6 py-3 bg-black/50 backdrop-blur border border-gray-800 text-white placeholder-gray-600 focus:border-gray-700 focus:outline-none"
                />
                <motion.button
                  type="submit"
                  className="bg-white text-black px-8 py-3 font-medium"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {t('news.newsletter.button')}
                </motion.button>
              </form>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}