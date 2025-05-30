'use client'

import { useState, useEffect } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import Link from 'next/link'
import { useParams, useRouter } from 'next/navigation'
import { 
  Calendar,
  Clock,
  ArrowLeft,
  Eye,
  Heart,
  Share2,
  BookOpen,
  ChevronRight,
  Tag,
  MessageCircle,
  User,
  Send,
  Bookmark,
  Facebook,
  Twitter,
  Copy,
  Check,
  Quote,
  TrendingUp,
  Award,
  Sparkles,
  ExternalLink,
  Play,
  Image as ImageIcon,
  Volume2,
  VolumeX,
  ChevronUp
} from 'lucide-react'
import { useTranslation } from '../../../hooks/useTranslation'
import { newsDetailLocales } from './newsDetailLocales'

export default function NewsDetailPage() {
  const params = useParams()
  const router = useRouter()
  const [liked, setLiked] = useState(false)
  const [bookmarked, setBookmarked] = useState(false)
  const [comments, setComments] = useState([
    {
      id: 1,
      author: 'Алексей Петров',
      avatar: null,
      date: '27.05.2025',
      text: 'Очень интересная новинка! Жду когда появится в продаже.',
      likes: 12,
      replies: [
        {
          id: 2,
          author: 'Pandora Support',
          avatar: null,
          date: '27.05.2025',
          text: 'Спасибо за интерес! Предзаказ откроется 1 июня.',
          likes: 8,
          isOfficial: true
        }
      ]
    }
  ])
  const [newComment, setNewComment] = useState('')
  const [showShareMenu, setShowShareMenu] = useState(false)
  const [copied, setCopied] = useState(false)
  const [readProgress, setReadProgress] = useState(0)
  const [audioPlaying, setAudioPlaying] = useState(false)
  const { scrollY } = useScroll()
  const { t } = useTranslation(newsDetailLocales)
  
  const headerOpacity = useTransform(scrollY, [0, 300], [1, 0])
  const headerScale = useTransform(scrollY, [0, 300], [1, 0.8])
  
  // Отслеживание прогресса чтения
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight
      const progress = (window.scrollY / totalHeight) * 100
      setReadProgress(progress)
    }
    
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])
  
  // Имитация загрузки данных новости
  const newsItem = {
    id: params.id,
    title: 'Представлена новая модель Pandora DXL-6000',
    subtitle: 'Революция в мире автомобильной безопасности с использованием искусственного интеллекта',
    heroImage: null,
    content: [
      {
        type: 'lead',
        content: 'Компания Pandora представила революционную систему безопасности DXL-6000, которая впервые использует технологии искусственного интеллекта для защиты автомобиля. Это не просто эволюция — это новый взгляд на автомобильную безопасность.'
      },
      {
        type: 'quote',
        content: 'DXL-6000 — это не просто сигнализация, это интеллектуальный помощник, который думает за вас',
        author: 'Дмитрий Иванов, CEO Pandora'
      },
      {
        type: 'heading',
        content: 'Искусственный интеллект на страже вашего автомобиля'
      },
      {
        type: 'paragraph',
        content: 'Система DXL-6000 способна самостоятельно анализировать потенциальные угрозы и адаптировать уровень защиты в зависимости от ситуации. Используя нейронные сети и машинное обучение, система постоянно совершенствуется, изучая паттерны поведения и выявляя аномалии.'
      },
      {
        type: 'gallery',
        images: [
          { url: null, caption: 'Центральный блок DXL-6000' },
          { url: null, caption: 'Мобильное приложение' },
          { url: null, caption: 'Установка системы' }
        ]
      },
      {
        type: 'features',
        title: 'Ключевые преимущества',
        items: [
          {
            icon: TrendingUp,
            title: 'Предиктивная защита',
            description: 'AI предсказывает угрозы до их возникновения'
          },
          {
            icon: Award,
            title: 'Адаптивный алгоритм',
            description: 'Система учится и совершенствуется'
          },
          {
            icon: Sparkles,
            title: 'Умная интеграция',
            description: 'Связь с городскими системами безопасности'
          }
        ]
      },
      {
        type: 'specs',
        title: 'Технические характеристики',
        items: [
          { label: 'Процессор', value: '8-ядерный ARM Cortex-A73' },
          { label: 'Память', value: '4GB RAM, 32GB встроенной' },
          { label: 'Связь', value: '5G, Wi-Fi 6, Bluetooth 5.2' },
          { label: 'Дальность', value: 'до 5000 метров' },
          { label: 'Автономность', value: '90 дней в режиме ожидания' }
        ]
      },
      {
        type: 'video',
        url: 'https://example.com/video.mp4',
        title: 'Обзор Pandora DXL-6000'
      },
      {
        type: 'cta',
        title: 'Хотите быть первыми?',
        description: 'Оставьте заявку на предзаказ и получите скидку 10%',
        button: 'Оформить предзаказ'
      }
    ],
    category: 'product',
    date: '28.05.2025',
    readTime: '8 мин',
    views: 3456,
    likes: 234,
    author: {
      name: 'Редакция Pandora',
      role: 'Официальный канал',
      avatar: null
    },
    tags: ['Новинка', 'DXL-6000', 'AI', 'Инновации', 'Безопасность'],
    relatedArticles: [
      { 
        id: 2, 
        title: 'Сравнение DXL-6000 с предыдущими моделями', 
        excerpt: 'Детальный анализ преимуществ новой системы',
        readTime: '5 мин',
        views: 1234 
      },
      { 
        id: 3, 
        title: 'Первые отзывы экспертов о DXL-6000', 
        excerpt: 'Что говорят профессионалы об инновационной системе',
        readTime: '6 мин',
        views: 2341 
      },
      { 
        id: 4, 
        title: 'Где купить DXL-6000 в Узбекистане', 
        excerpt: 'Список официальных дилеров и условия предзаказа',
        readTime: '3 мин',
        views: 4567 
      }
    ]
  }
  
  const shareArticle = (platform) => {
    const url = window.location.href
    const title = newsItem.title
    
    switch(platform) {
      case 'facebook':
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`)
        break
      case 'twitter':
        window.open(`https://twitter.com/intent/tweet?url=${url}&text=${title}`)
        break
      case 'copy':
        navigator.clipboard.writeText(url)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
        break
    }
  }
  
  const handleComment = (e) => {
    e.preventDefault()
    if (newComment.trim()) {
      setComments([...comments, {
        id: Date.now(),
        text: newComment,
        author: 'Гость',
        date: new Date().toLocaleDateString('ru-RU'),
        likes: 0,
        replies: []
      }])
      setNewComment('')
    }
  }
  
  const renderContent = (block) => {
    switch(block.type) {
      case 'lead':
        return (
          <p className="text-xl lg:text-2xl text-gray-300 font-light leading-relaxed mb-8">
            {block.content}
          </p>
        )
        
      case 'quote':
        return (
          <motion.blockquote
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative my-12 pl-12 pr-8 py-8 border-l-4 border-gray-700"
          >
            <Quote className="absolute left-0 top-0 w-8 h-8 text-gray-700 -translate-x-1/2 -translate-y-1/2 bg-black" />
            <p className="text-2xl lg:text-3xl font-light text-white mb-4 italic">
              {block.content}
            </p>
            <cite className="text-gray-500 not-italic">— {block.author}</cite>
          </motion.blockquote>
        )
        
      case 'heading':
        return (
          <h2 className="text-3xl lg:text-4xl font-thin text-white mt-16 mb-8">
            {block.content}
          </h2>
        )
        
      case 'paragraph':
        return (
          <p className="text-lg text-gray-400 font-light leading-relaxed mb-6">
            {block.content}
          </p>
        )
        
      case 'gallery':
        return (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-12">
            {block.images.map((img, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-gray-950 border border-gray-800 aspect-video relative group cursor-pointer overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <ImageIcon className="w-12 h-12 text-gray-700 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                {img.caption && (
                  <p className="absolute bottom-0 left-0 right-0 p-4 text-white text-sm opacity-0 group-hover:opacity-100 transition-opacity">
                    {img.caption}
                  </p>
                )}
              </motion.div>
            ))}
          </div>
        )
        
      case 'features':
        return (
          <div className="my-16">
            <h3 className="text-2xl font-light text-white mb-8">{block.title}</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {block.items.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-gray-950 border border-gray-800 p-6 hover:border-gray-700 transition-all group"
                >
                  <item.icon className="w-10 h-10 text-gray-700 mb-4 group-hover:text-gray-600 transition-colors" />
                  <h4 className="text-lg font-light text-white mb-2">{item.title}</h4>
                  <p className="text-sm text-gray-500">{item.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        )
        
      case 'specs':
        return (
          <div className="my-16 bg-gray-950 border border-gray-800 p-8">
            <h3 className="text-2xl font-light text-white mb-8">{block.title}</h3>
            <div className="space-y-4">
              {block.items.map((spec, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className="flex justify-between items-center py-3 border-b border-gray-800 last:border-0"
                >
                  <span className="text-gray-500">{spec.label}</span>
                  <span className="text-white font-light">{spec.value}</span>
                </motion.div>
              ))}
            </div>
          </div>
        )
        
      case 'video':
        return (
          <div className="my-16 bg-gray-950 border border-gray-800 aspect-video relative group cursor-pointer">
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div
                whileHover={{ scale: 1.1 }}
                className="w-20 h-20 bg-white/10 backdrop-blur-sm flex items-center justify-center rounded-full"
              >
                <Play className="w-8 h-8 text-white ml-1" />
              </motion.div>
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black to-transparent">
              <p className="text-white font-light">{block.title}</p>
            </div>
          </div>
        )
        
      case 'cta':
        return (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="my-16 bg-gradient-to-br from-gray-900 to-gray-950 border border-gray-800 p-12 text-center"
          >
            <h3 className="text-3xl font-light text-white mb-4">{block.title}</h3>
            <p className="text-lg text-gray-400 mb-8">{block.description}</p>
            <Link href="/products" className="inline-block bg-white text-black px-8 py-4 hover:bg-gray-100 transition-colors">
              {block.button}
            </Link>
          </motion.div>
        )
        
      default:
        return null
    }
  }
  
  return (
    <div className="page-container min-h-screen bg-black">
      {/* Progress bar */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-gray-900 z-50">
        <motion.div
          className="h-full bg-gradient-to-r from-purple-500 to-pink-500"
          style={{ width: `${readProgress}%` }}
        />
      </div>
      
      {/* Hero section */}
      <motion.div
        className="relative h-[70vh] mb-12 overflow-hidden"
        style={{ opacity: headerOpacity, scale: headerScale }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/50 to-black" />
        <div className="absolute inset-0 bg-gradient-to-br from-purple-950/30 to-pink-950/30" />
        
        {/* Animated background pattern */}
        <div className="absolute inset-0">
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-96 h-96 bg-gradient-to-br from-purple-900/20 to-pink-900/20 rounded-full blur-3xl"
              animate={{
                x: [0, 100, 0],
                y: [0, -100, 0],
              }}
              transition={{
                duration: 20 + i * 5,
                repeat: Infinity,
                ease: "linear"
              }}
              style={{
                left: `${i * 25}%`,
                top: `${i * 20}%`
              }}
            />
          ))}
        </div>
        
        <div className="relative h-full flex items-center">
          <div className="max-w-7xl mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <Link href="/news" className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-8 group">
                <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                {t('newsDetail.back')}
              </Link>
              
              <div className="flex items-center gap-4 mb-6">
                <span className="px-4 py-2 bg-gradient-to-r from-purple-900/50 to-pink-900/50 border border-purple-800/50 text-white text-sm uppercase tracking-wider">
                  {newsItem.category}
                </span>
                <span className="text-gray-400 text-sm flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  {newsItem.date}
                </span>
              </div>
              
              <h1 className="text-5xl lg:text-7xl font-thin text-white mb-6 leading-tight">
                {newsItem.title}
              </h1>
              
              <p className="text-xl lg:text-2xl text-gray-300 font-light mb-8 max-w-3xl">
                {newsItem.subtitle}
              </p>
              
              <div className="flex items-center gap-8">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gray-900 rounded-full flex items-center justify-center">
                    <User className="w-6 h-6 text-gray-700" />
                  </div>
                  <div>
                    <p className="text-white font-light">{newsItem.author.name}</p>
                    <p className="text-sm text-gray-500">{newsItem.author.role}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-6 text-sm text-gray-400">
                  <span className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    {newsItem.readTime}
                  </span>
                  <span className="flex items-center gap-2">
                    <Eye className="w-4 h-4" />
                    {newsItem.views}
                  </span>
                  <motion.button
                    onClick={() => setLiked(!liked)}
                    className={`flex items-center gap-2 ${liked ? 'text-red-400' : ''}`}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Heart className={`w-4 h-4 ${liked ? 'fill-current' : ''}`} />
                    {newsItem.likes + (liked ? 1 : 0)}
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>
      
      <div className="max-w-7xl mx-auto px-4 pb-20">
        {/* Floating actions bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="sticky top-20 z-40 mb-12 bg-black/90 backdrop-blur-md border border-gray-800 p-4"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <motion.button
                onClick={() => setLiked(!liked)}
                className={`flex items-center gap-2 px-4 py-2 border transition-all ${
                  liked 
                    ? 'bg-red-900/20 border-red-800 text-red-400' 
                    : 'border-gray-800 text-gray-400 hover:text-white hover:border-gray-700'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Heart className={`w-4 h-4 ${liked ? 'fill-current' : ''}`} />
                <span className="text-sm">{newsItem.likes + (liked ? 1 : 0)}</span>
              </motion.button>
              
              <motion.button
                onClick={() => setBookmarked(!bookmarked)}
                className={`flex items-center gap-2 px-4 py-2 border transition-all ${
                  bookmarked 
                    ? 'bg-yellow-900/20 border-yellow-800 text-yellow-400' 
                    : 'border-gray-800 text-gray-400 hover:text-white hover:border-gray-700'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Bookmark className={`w-4 h-4 ${bookmarked ? 'fill-current' : ''}`} />
              </motion.button>
              
              <div className="relative">
                <motion.button
                  onClick={() => setShowShareMenu(!showShareMenu)}
                  className="flex items-center gap-2 px-4 py-2 border border-gray-800 text-gray-400 hover:text-white hover:border-gray-700 transition-all"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Share2 className="w-4 h-4" />
                  <span className="text-sm">{t('newsDetail.share')}</span>
                </motion.button>
                
                {showShareMenu && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="absolute top-full mt-2 left-0 bg-gray-900 border border-gray-800 p-2 min-w-[200px]"
                  >
                    <button
                      onClick={() => shareArticle('facebook')}
                      className="w-full flex items-center gap-3 px-4 py-2 text-gray-400 hover:text-white hover:bg-gray-800 transition-all"
                    >
                      <Facebook className="w-4 h-4" />
                      Facebook
                    </button>
                    <button
                      onClick={() => shareArticle('twitter')}
                      className="w-full flex items-center gap-3 px-4 py-2 text-gray-400 hover:text-white hover:bg-gray-800 transition-all"
                    >
                      <Twitter className="w-4 h-4" />
                      Twitter
                    </button>
                    <button
                      onClick={() => shareArticle('copy')}
                      className="w-full flex items-center gap-3 px-4 py-2 text-gray-400 hover:text-white hover:bg-gray-800 transition-all"
                    >
                      {copied ? (
                        <>
                          <Check className="w-4 h-4 text-green-400" />
                          <span className="text-green-400">Скопировано!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-4 h-4" />
                          Копировать ссылку
                        </>
                      )}
                    </button>
                  </motion.div>
                )}
              </div>
              
              <motion.button
                onClick={() => setAudioPlaying(!audioPlaying)}
                className="flex items-center gap-2 px-4 py-2 border border-gray-800 text-gray-400 hover:text-white hover:border-gray-700 transition-all"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {audioPlaying ? (
                  <VolumeX className="w-4 h-4" />
                ) : (
                  <Volume2 className="w-4 h-4" />
                )}
                <span className="text-sm">Озвучка</span>
              </motion.button>
            </div>
            
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <BookOpen className="w-4 h-4" />
              <span>{readProgress.toFixed(0)}% прочитано</span>
            </div>
          </div>
        </motion.div>
        
        {/* Article content */}
        <article>
          {newsItem.content.map((block, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              {renderContent(block)}
            </motion.div>
          ))}
        </article>
        
        {/* Tags */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="flex flex-wrap gap-2 mt-16 mb-12"
        >
          {newsItem.tags.map(tag => (
            <Link
              key={tag}
              href={`/news?tag=${tag}`}
              className="px-4 py-2 bg-gray-950 border border-gray-800 text-gray-400 hover:text-white hover:border-gray-700 transition-all group"
            >
              <span className="flex items-center gap-2">
                <Tag className="w-3 h-3 opacity-60 group-hover:opacity-100" />
                {tag}
              </span>
            </Link>
          ))}
        </motion.div>
        
        {/* Author card */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="bg-gradient-to-br from-gray-900 to-gray-950 border border-gray-800 p-8 mb-16"
        >
          <div className="flex items-center gap-6">
            <div className="w-20 h-20 bg-gray-800 rounded-full flex items-center justify-center">
              <User className="w-10 h-10 text-gray-700" />
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-light text-white mb-2">{newsItem.author.name}</h3>
              <p className="text-gray-500 mb-4">{newsItem.author.role}</p>
              <p className="text-gray-400 font-light">
                Официальный канал новостей Pandora Uzbekistan. Следите за обновлениями и будьте в курсе всех новинок.
              </p>
            </div>
            <button className="bg-white text-black px-6 py-2 hover:bg-gray-100 transition-colors">
              Подписаться
            </button>
          </div>
        </motion.div>
        
        {/* Related articles */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h3 className="text-3xl font-light text-white mb-8">{t('newsDetail.related')}</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {newsItem.relatedArticles.map((article, i) => (
              <motion.div
                key={article.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Link
                  href={`/news/${article.id}`}
                  className="block bg-gray-950 border border-gray-800 p-6 hover:border-gray-700 transition-all group h-full"
                >
                  <h4 className="text-lg font-light text-gray-300 group-hover:text-white transition-colors mb-3">
                    {article.title}
                  </h4>
                  <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                    {article.excerpt}
                  </p>
                  <div className="flex items-center justify-between text-xs text-gray-600">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {article.readTime}
                    </span>
                    <span className="flex items-center gap-1">
                      <Eye className="w-3 h-3" />
                      {article.views}
                    </span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>
        
        {/* Comments section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="border-t border-gray-800 pt-12"
        >
          <h3 className="text-3xl font-light text-white mb-8 flex items-center gap-3">
            <MessageCircle className="w-8 h-8 text-gray-700" />
            {t('newsDetail.comments')} ({comments.length})
          </h3>
          
          <form onSubmit={handleComment} className="mb-12">
            <div className="bg-gray-950 border border-gray-800 p-6">
              <textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder={t('newsDetail.commentPlaceholder')}
                rows="4"
                className="w-full bg-transparent text-white placeholder-gray-600 resize-none focus:outline-none mb-4"
              />
              <div className="flex justify-between items-center">
                <p className="text-sm text-gray-600">
                  Будьте вежливы и уважительны к другим участникам
                </p>
                <button
                  type="submit"
                  className="bg-white text-black px-6 py-2 hover:bg-gray-100 transition-colors flex items-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  Отправить
                </button>
              </div>
            </div>
          </form>
          
          <div className="space-y-6">
            {comments.map((comment) => (
              <motion.div
                key={comment.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-gray-950 border border-gray-800"
              >
                <div className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-gray-900 rounded-full flex items-center justify-center flex-shrink-0">
                      <User className="w-6 h-6 text-gray-700" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <h4 className="font-light text-white">{comment.author}</h4>
                        {comment.isOfficial && (
                          <span className="px-2 py-1 bg-blue-900/20 text-blue-400 text-xs border border-blue-900/50">
                            Official
                          </span>
                        )}
                        <span className="text-sm text-gray-600">{comment.date}</span>
                      </div>
                      <p className="text-gray-400 font-light mb-4">{comment.text}</p>
                      <div className="flex items-center gap-4">
                        <button className="text-sm text-gray-600 hover:text-white transition-colors flex items-center gap-2">
                          <Heart className="w-4 h-4" />
                          {comment.likes}
                        </button>
                        <button className="text-sm text-gray-600 hover:text-white transition-colors">
                          Ответить
                        </button>
                      </div>
                    </div>
                  </div>
                  
                  {comment.replies && comment.replies.length > 0 && (
                    <div className="ml-16 mt-6 space-y-4">
                      {comment.replies.map((reply) => (
                        <div key={reply.id} className="flex items-start gap-4">
                          <div className="w-10 h-10 bg-gray-900 rounded-full flex items-center justify-center flex-shrink-0">
                            <User className="w-5 h-5 text-gray-700" />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <h4 className="font-light text-white text-sm">{reply.author}</h4>
                              {reply.isOfficial && (
                                <span className="px-2 py-0.5 bg-blue-900/20 text-blue-400 text-xs border border-blue-900/50">
                                  Official
                                </span>
                              )}
                              <span className="text-xs text-gray-600">{reply.date}</span>
                            </div>
                            <p className="text-gray-400 font-light text-sm">{reply.text}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
      
      {/* Scroll to top button */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: readProgress > 50 ? 1 : 0 }}
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="fixed bottom-8 right-8 w-12 h-12 bg-white text-black flex items-center justify-center hover:bg-gray-100 transition-colors z-40"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <ChevronUp className="w-5 h-5" />
      </motion.button>
    </div>
  )
}