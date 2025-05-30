'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { usePathname } from 'next/navigation'
import { 
  Menu, 
  X, 
  ChevronDown, 
  Globe,
  Phone,
  Shield,
  Package,
  Wrench,
  Star,
  Gift,
  Newspaper,
  User,
  Search,
  Grid3x3,
  ArrowRight
} from 'lucide-react'
import { useTranslation } from '../../hooks/useTranslation'
import { navbarLocales } from './navbarLocales'
import { useLanguageStore } from '../../store/language'

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isLangOpen, setIsLangOpen] = useState(false)
  const [showMegaMenu, setShowMegaMenu] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const pathname = usePathname()
  const { t } = useTranslation(navbarLocales)
  const { currentLocale, setLocale } = useLanguageStore()
  
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 0)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const handleClickOutside = () => {
      setIsLangOpen(false)
      setShowMegaMenu(false)
    }
    if (isLangOpen || showMegaMenu) {
      document.addEventListener('click', handleClickOutside)
      return () => document.removeEventListener('click', handleClickOutside)
    }
  }, [isLangOpen, showMegaMenu])
  
  const mainNavItems = [
    { href: '/', label: t('nav.home') },
    { href: '/products', label: t('nav.products'), icon: Package },
    { href: '/service', label: t('nav.installation'), icon: Wrench },
    { href: '/advantages', label: t('nav.advantages'), icon: Star },
  ]
  
  const megaMenuItems = {
    left: [
      { 
        title: t('nav.megaMenu.products.title'),
        items: [
          { href: '/products', label: t('nav.megaMenu.products.all'), icon: Package },
          { href: '/products?category=standard', label: t('nav.megaMenu.products.standard') },
          { href: '/products?category=gsm', label: t('nav.megaMenu.products.gsm') },
          { href: '/products?category=premium', label: t('nav.megaMenu.products.premium') },
        ]
      },
      {
        title: t('nav.megaMenu.services.title'),
        items: [
          { href: '/service', label: t('nav.megaMenu.services.installation'), icon: Wrench },
          { href: '/service#masters', label: t('nav.megaMenu.services.masters') },
          { href: '/service#dealers', label: t('nav.megaMenu.services.dealers') },
          { href: '/service#map', label: t('nav.megaMenu.services.map') },
        ]
      }
    ],
    right: [
      {
        title: t('nav.megaMenu.info.title'),
        items: [
          { href: '/news', label: t('nav.news'), icon: Newspaper },
          { href: '/promotions', label: t('nav.promotions'), icon: Gift },
          { href: '/reviews', label: t('nav.reviews'), icon: Star },
          { href: '/advantages', label: t('nav.advantages') },
        ]
      },
      {
        title: t('nav.megaMenu.support.title'),
        items: [
          { href: '/account', label: t('nav.account'), icon: User },
          { href: '/account/warranty', label: t('nav.checkWarranty') },
          { href: '/support', label: t('nav.megaMenu.support.help') },
          { href: '/contacts', label: t('nav.megaMenu.support.contacts') },
        ]
      }
    ]
  }
  
  // Search functionality
  const handleSearch = (e) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      // Implement search logic
      console.log('Search:', searchQuery)
      setSearchOpen(false)
      setSearchQuery('')
    }
  }
  
  return (
    <>
      {/* Main Header */}
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed w-full z-[100] transition-all duration-500 ${
          isScrolled 
            ? 'bg-gray-950/95 backdrop-blur-md shadow-2xl' 
            : 'bg-gray-900/80 backdrop-blur-sm'
        }`}
      >
        {/* Top bar - now hidden on scroll */}
        <AnimatePresence>
          {!isScrolled && (
            <motion.div
              initial={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="border-b border-gray-800/50 overflow-hidden"
            >
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-10 text-xs">
                  <div className="flex items-center gap-6 text-gray-400">
                    <a href="tel:+998901234567" className="flex items-center gap-1 hover:text-white transition-colors">
                      <Phone className="w-3 h-3" />
                      <span className="hidden sm:inline">+998 90 123 45 67</span>
                    </a>
                    <span className="hidden md:block">{t('nav.support24')}</span>
                  </div>
                  <div className="flex items-center gap-6 text-gray-400">
                    <Link href="/promotions" className="hover:text-white transition-colors">
                      {t('nav.currentPromotions')}
                    </Link>
                    <span className="hidden sm:flex items-center gap-1">
                      <Shield className="w-3 h-3" />
                      {t('nav.officialDealer')}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main Navigation */}
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-3 group">
              <motion.div 
                className="relative w-10 h-10"
                whileHover={{ scale: 1.1 }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-gray-600 to-gray-800 rounded-sm rotate-45 group-hover:rotate-90 transition-transform duration-500" />
                <div className="relative flex items-center justify-center h-full">
                  <span className="text-white font-bold text-lg">P</span>
                </div>
              </motion.div>
              <div className="hidden sm:block">
                <span className="text-white font-light text-xl tracking-wider">
                  PANDORA
                </span>
                <span className="block text-[9px] text-gray-500 tracking-[0.2em] uppercase">
                  Security Systems
                </span>
              </div>
            </Link>
            
            {/* Desktop menu */}
            <div className="hidden lg:flex items-center space-x-1">
              {/* Main nav items */}
              {mainNavItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="relative group px-4 py-2"
                >
                  <span className={`text-sm font-light transition-all duration-300 flex items-center gap-2 ${
                    pathname === item.href
                      ? 'text-white'
                      : 'text-gray-400 hover:text-white'
                  }`}>
                    {item.icon && <item.icon className="w-4 h-4 opacity-70" />}
                    {item.label}
                  </span>
                  {pathname === item.href && (
                    <motion.div
                      layoutId="navbar-indicator"
                      className="absolute bottom-0 left-4 right-4 h-[2px] bg-gradient-to-r from-transparent via-white to-transparent"
                    />
                  )}
                </Link>
              ))}
              
              {/* More button with mega menu */}
              <div className="relative">
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    setShowMegaMenu(!showMegaMenu)
                  }}
                  className="px-4 py-2 text-sm font-light text-gray-400 hover:text-white transition-colors flex items-center gap-2"
                >
                  <Grid3x3 className="w-4 h-4 opacity-70" />
                  {t('nav.more')}
                  <ChevronDown className={`w-3 h-3 transition-transform ${showMegaMenu ? 'rotate-180' : ''}`} />
                </button>
              </div>
            </div>
            
            {/* Right side actions */}
            <div className="flex items-center gap-4">
              {/* Search button */}
              <motion.button
                onClick={() => setSearchOpen(true)}
                className="hidden md:flex p-2 text-gray-400 hover:text-white transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Search className="w-5 h-5" />
              </motion.button>
              
              {/* Language Selector */}
              <div className="relative hidden md:block">
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    setIsLangOpen(!isLangOpen)
                  }}
                  className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors"
                >
                  <Globe className="w-4 h-4" />
                  <span className="font-light">{currentLocale.toUpperCase()}</span>
                  <ChevronDown className={`w-3 h-3 transition-transform ${isLangOpen ? 'rotate-180' : ''}`} />
                </button>
                
                <AnimatePresence>
                  {isLangOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute top-full right-0 mt-2 bg-gray-900 border border-gray-800 shadow-2xl overflow-hidden"
                    >
                      <button
                        onClick={() => {
                          setLocale('ru')
                          setIsLangOpen(false)
                        }}
                        className={`w-full px-6 py-3 text-left text-sm hover:bg-gray-800 transition-colors ${
                          currentLocale === 'ru' ? 'text-white bg-gray-800' : 'text-gray-400'
                        }`}
                      >
                        {t('nav.language.ru')}
                      </button>
                      <button
                        onClick={() => {
                          setLocale('uz')
                          setIsLangOpen(false)
                        }}
                        className={`w-full px-6 py-3 text-left text-sm hover:bg-gray-800 transition-colors ${
                          currentLocale === 'uz' ? 'text-white bg-gray-800' : 'text-gray-400'
                        }`}
                      >
                        {t('nav.language.uz')}
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              
              {/* CTA Button */}
              <Link
                href="/account/warranty"
                className="hidden md:block relative group overflow-hidden"
              >
                <div className="relative bg-white text-gray-900 px-5 py-2 text-sm font-medium transition-all duration-300 group-hover:text-white">
                  <span className="relative z-10">{t('nav.checkWarranty')}</span>
                  <div className="absolute inset-0 bg-gray-800 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                </div>
              </Link>
              
              {/* Mobile menu button */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="lg:hidden p-2 text-gray-400 hover:text-white transition-colors"
              >
                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </nav>
        
        {/* Mega Menu */}
        <AnimatePresence>
          {showMegaMenu && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="absolute top-full left-0 right-0 bg-gray-950 border-t border-gray-800 shadow-2xl"
            >
              <div className="max-w-7xl mx-auto px-4 py-8">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
                  {[...megaMenuItems.left, ...megaMenuItems.right].map((section, i) => (
                    <div key={i}>
                      <h3 className="text-sm font-medium text-white mb-4 uppercase tracking-wider">
                        {section.title}
                      </h3>
                      <ul className="space-y-2">
                        {section.items.map((item, j) => (
                          <li key={j}>
                            <Link
                              href={item.href}
                              onClick={() => setShowMegaMenu(false)}
                              className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors group"
                            >
                              {item.icon && <item.icon className="w-4 h-4 opacity-60 group-hover:opacity-100" />}
                              <span className="text-sm font-light">{item.label}</span>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
                
                {/* Promo section in mega menu */}
                <div className="mt-8 pt-8 border-t border-gray-800">
                  <div className="bg-gradient-to-r from-purple-900/20 to-pink-900/20 border border-purple-900/30 p-6 flex items-center justify-between">
                    <div>
                      <h4 className="text-white font-light mb-1">{t('nav.megaMenu.promo.title')}</h4>
                      <p className="text-sm text-gray-400">{t('nav.megaMenu.promo.subtitle')}</p>
                    </div>
                    <Link 
                      href="/promotions"
                      onClick={() => setShowMegaMenu(false)}
                      className="bg-white text-black px-4 py-2 text-sm hover:bg-gray-100 transition-colors flex items-center gap-2 group"
                    >
                      <span>{t('nav.megaMenu.promo.button')}</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      {/* Search Modal */}
      <AnimatePresence>
        {searchOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 backdrop-blur-md z-[200] flex items-center justify-center p-4"
            onClick={() => setSearchOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="w-full max-w-2xl"
              onClick={e => e.stopPropagation()}
            >
              <form onSubmit={handleSearch} className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={t('nav.searchPlaceholder')}
                  className="w-full px-6 py-4 pr-12 bg-gray-950 border border-gray-800 text-white text-xl placeholder-gray-600 focus:border-gray-700 focus:outline-none"
                  autoFocus
                />
                <button
                  type="submit"
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                >
                  <Search className="w-6 h-6" />
                </button>
              </form>
              
              {/* Quick links */}
              <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
                {['DX-91', 'DX-4GS', 'DXL-5000', 'Установка'].map((term) => (
                  <button
                    key={term}
                    onClick={() => {
                      setSearchQuery(term)
                      handleSearch({ preventDefault: () => {} })
                    }}
                    className="px-4 py-2 bg-gray-900 border border-gray-800 text-gray-400 hover:text-white hover:border-gray-700 transition-all text-sm"
                  >
                    {term}
                  </button>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMenuOpen(false)}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[90] lg:hidden"
            />
            
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.3 }}
              className="fixed right-0 top-0 h-full w-full max-w-sm bg-gray-900 shadow-2xl z-[95] lg:hidden overflow-y-auto"
            >
              <div className="flex justify-between items-center p-6 border-b border-gray-800">
                <span className="text-white text-lg font-light">{t('nav.menu')}</span>
                <button
                  onClick={() => setIsMenuOpen(false)}
                  className="p-2 text-gray-400 hover:text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <div className="py-6">
                {/* Mobile navigation sections */}
                {[...megaMenuItems.left, ...megaMenuItems.right].map((section, sectionIndex) => (
                  <div key={sectionIndex} className="mb-8">
                    <h3 className="px-6 text-xs font-medium text-gray-500 uppercase tracking-wider mb-4">
                      {section.title}
                    </h3>
                    {section.items.map((item, index) => (
                      <motion.div
                        key={item.href}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                      >
                        <Link
                          href={item.href}
                          onClick={() => setIsMenuOpen(false)}
                          className="flex items-center gap-3 px-6 py-3 text-gray-400 hover:text-white hover:bg-gray-800 transition-all"
                        >
                          {item.icon && <item.icon className="w-5 h-5 opacity-70" />}
                          <span className="font-light">{item.label}</span>
                        </Link>
                      </motion.div>
                    ))}
                  </div>
                ))}
                
                <div className="px-6 space-y-4">
                  {/* Language selector for mobile */}
                  <div className="flex gap-2">
                    <button
                      onClick={() => setLocale('ru')}
                      className={`flex-1 py-3 text-sm font-light border transition-colors ${
                        currentLocale === 'ru'
                          ? 'bg-white text-gray-900 border-white'
                          : 'text-gray-400 border-gray-700 hover:text-white hover:border-gray-600'
                      }`}
                    >
                      Русский
                    </button>
                    <button
                      onClick={() => setLocale('uz')}
                      className={`flex-1 py-3 text-sm font-light border transition-colors ${
                        currentLocale === 'uz'
                          ? 'bg-white text-gray-900 border-white'
                          : 'text-gray-400 border-gray-700 hover:text-white hover:border-gray-600'
                      }`}
                    >
                      O'zbek
                    </button>
                  </div>
                  
                  <Link
                    href="/account/warranty"
                    onClick={() => setIsMenuOpen(false)}
                    className="block w-full bg-white text-gray-900 py-3 text-center font-medium hover:bg-gray-100 transition-colors"
                  >
                    {t('nav.checkWarranty')}
                  </Link>
                  
                  <a
                    href="tel:+998901234567"
                    className="flex items-center justify-center gap-2 py-3 text-gray-400 hover:text-white transition-colors"
                  >
                    <Phone className="w-4 h-4" />
                    <span>+998 90 123 45 67</span>
                  </a>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}