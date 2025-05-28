'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { usePathname } from 'next/navigation'
import { Menu, X, ChevronDown, Globe,Phone,Shield } from 'lucide-react'
import { useTranslation } from '../../hooks/useTranslation'
import { navbarLocales } from './navbarLocales'
import { useLanguageStore } from '../../store/language'

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isLangOpen, setIsLangOpen] = useState(false)
  const pathname = usePathname()
  const { t } = useTranslation(navbarLocales)
  const { currentLocale, setLocale } = useLanguageStore()
  
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 0)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const handleClickOutside = () => setIsLangOpen(false)
    if (isLangOpen) {
      document.addEventListener('click', handleClickOutside)
      return () => document.removeEventListener('click', handleClickOutside)
    }
  }, [isLangOpen])
  
  const navItems = [
    { href: '/', label: t('nav.home') },
    { href: '/products', label: t('nav.products') },
    { href: '/service', label: t('nav.installation') },
    { href: '/advantages', label: t('nav.advantages') },
    { href: '/reviews', label: t('nav.reviews') },
    { href: '/account', label: t('nav.account') },
  ]
  
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
        {/* Top bar with contact info */}
        <div className={`border-b border-gray-800/50 transition-all duration-300 ${
          isScrolled ? 'h-0 overflow-hidden' : 'h-auto'
        }`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-10 text-xs">
              <div className="flex items-center gap-6 text-gray-400">
                <a href="tel:+998901234567" className="flex items-center gap-1 hover:text-white transition-colors">
                  <Phone className="w-3 h-3" />
                  <span>+998 90 123 45 67</span>
                </a>
                <span className="hidden sm:block">24/7 поддержка</span>
              </div>
              <div className="flex items-center gap-2 text-gray-400">
                <Shield className="w-3 h-3" />
                <span className="hidden sm:block">Официальный дилер</span>
              </div>
            </div>
          </div>
        </div>

        {/* Main Navigation */}
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-3 group">
              <div className="relative w-12 h-12">
                <div className="absolute inset-0 bg-gradient-to-br from-gray-600 to-gray-800 rounded-sm rotate-45 group-hover:rotate-90 transition-transform duration-500" />
                <div className="relative flex items-center justify-center h-full">
                  <span className="text-white font-bold text-xl">P</span>
                </div>
              </div>
              <div>
                <span className="text-white font-light text-2xl tracking-wider">
                  PANDORA
                </span>
                <span className="block text-[10px] text-gray-500 tracking-[0.3em] uppercase">
                  Security Systems
                </span>
              </div>
            </Link>
            
            {/* Desktop menu */}
            <div className="hidden lg:flex items-center space-x-10">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="relative group"
                >
                  <span className={`text-sm font-light tracking-wide transition-all duration-300 ${
                    pathname === item.href
                      ? 'text-white'
                      : 'text-gray-400 hover:text-white'
                  }`}>
                    {item.label}
                  </span>
                  {pathname === item.href && (
                    <motion.div
                      layoutId="navbar-indicator"
                      className="absolute -bottom-6 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white to-transparent"
                    />
                  )}
                  <div className="absolute -bottom-6 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-gray-600 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </Link>
              ))}
              
              {/* Language Selector */}
              <div className="relative">
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    setIsLangOpen(!isLangOpen)
                  }}
                  className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors px-3 py-1.5 border border-gray-700 hover:border-gray-600"
                >
                  <Globe className="w-3.5 h-3.5" />
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
                        className={`w-full px-6 py-3 text-left text-sm hover:bg-gray-800 transition-colors flex items-center justify-between ${
                          currentLocale === 'ru' ? 'text-white bg-gray-800' : 'text-gray-400'
                        }`}
                      >
                        <span>{t('nav.language.ru')}</span>
                      </button>
                      <button
                        onClick={() => {
                          setLocale('uz')
                          setIsLangOpen(false)
                        }}
                        className={`w-full px-6 py-3 text-left text-sm hover:bg-gray-800 transition-colors flex items-center justify-between ${
                          currentLocale === 'uz' ? 'text-white bg-gray-800' : 'text-gray-400'
                        }`}
                      >
                        <span>{t('nav.language.uz')}</span>
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              
              {/* CTA Button */}
              <Link
                href="/account/warranty"
                className="relative group overflow-hidden"
              >
                <div className="relative bg-white text-gray-900 px-6 py-2.5 text-sm font-medium transition-all duration-300 group-hover:text-white">
                  <span className="relative z-10">{t('nav.checkWarranty')}</span>
                  <div className="absolute inset-0 bg-gray-800 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                </div>
              </Link>
            </div>
            
            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 text-gray-400 hover:text-white transition-colors"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </nav>
      </motion.header>

      {/* Mobile menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMenuOpen(false)}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[90] lg:hidden"
            />
            
            {/* Menu Panel */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.3 }}
              className="fixed right-0 top-0 h-full w-full max-w-sm bg-gray-900 shadow-2xl z-[95] lg:hidden"
            >
              <div className="flex justify-between items-center p-6 border-b border-gray-800">
                <span className="text-white text-lg font-light">Меню</span>
                <button
                  onClick={() => setIsMenuOpen(false)}
                  className="p-2 text-gray-400 hover:text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <div className="py-6">
                {navItems.map((item, index) => (
                  <motion.div
                    key={item.href}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Link
                      href={item.href}
                      onClick={() => setIsMenuOpen(false)}
                      className={`block px-6 py-3 text-lg font-light transition-colors relative group ${
                        pathname === item.href
                          ? 'text-white bg-gray-800'
                          : 'text-gray-400 hover:text-white hover:bg-gray-800/50'
                      }`}
                    >
                      <span>{item.label}</span>
                      {pathname === item.href && (
                        <div className="absolute left-0 top-0 bottom-0 w-1 bg-white" />
                      )}
                    </Link>
                  </motion.div>
                ))}
                
                <div className="px-6 mt-8 space-y-4">
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