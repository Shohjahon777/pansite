'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'

export default function Footer() {
  const currentYear = new Date().getFullYear()
  
  const footerLinks = {
    products: [
      { href: '/products', label: 'Все системы' },
      { href: '/products/dx91', label: 'Pandora DX-91' },
      { href: '/products/dx4gs', label: 'Pandora DX-4GS' },
      { href: '/products/dxl5000', label: 'Pandora DXL-5000' },
      { href: '/advantages', label: 'Преимущества' },
    ],
    service: [
      { href: '/service', label: 'Найти мастера' },
      { href: '/service#dealers', label: 'Дилерские центры' },
      { href: '/service#map', label: 'Карта установщиков' },
      { href: '/reviews', label: 'Все отзывы' },
    ],
    support: [
      { href: '/account', label: 'Личный кабинет' },
      { href: '/account/warranty', label: 'Проверка гарантии' },
      { href: '/account#requests', label: 'Мои заявки' },
      { href: '/service', label: 'Записаться на установку' },
    ],
    company: [
      { href: '/advantages', label: 'О технологиях' },
      { href: '/reviews', label: 'Отзывы клиентов' },
      { href: '/#contacts', label: 'Контакты' },
    ]
  }
  
  const socialLinks = [
    { icon: '📱', href: 'https://t.me/pandorauz', label: 'Telegram' },
    { icon: '📷', href: '#', label: 'Instagram' },
    { icon: '💬', href: '#', label: 'WhatsApp' },
  ]
  
  return (
    <footer className="bg-gray-950 text-white border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 mb-12">
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-pink-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">P</span>
              </div>
              <span className="font-bold text-xl">Pandora</span>
            </Link>
            <p className="text-gray-400 mb-6">
              Официальный дистрибьютор охранных систем Pandora в Узбекистане
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-gray-700 transition"
                >
                  <span className="text-xl">{social.icon}</span>
                </motion.a>
              ))}
            </div>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-4">Продукты</h3>
            <ul className="space-y-2">
              {footerLinks.products.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-gray-400 hover:text-purple-400 transition">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-4">Услуги</h3>
            <ul className="space-y-2">
              {footerLinks.service.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-gray-400 hover:text-purple-400 transition">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-4">Поддержка</h3>
            <ul className="space-y-2">
              {footerLinks.support.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-gray-400 hover:text-purple-400 transition">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 mb-4 md:mb-0">
              © {currentYear} Pandora Uzbekistan. Все права защищены.
            </p>
            <div className="flex items-center space-x-6">
              <a href="tel:+998901234567" className="text-gray-400 hover:text-purple-400 transition">
                📞 +998 90 123 45 67
              </a>
              <a href="mailto:info@pandora.uz" className="text-gray-400 hover:text-purple-400 transition">
                ✉️ info@pandora.uz
              </a>
            </div>
          </div>
        </div>
      </div>
      
      {/* Floating action buttons */}
      <div className="fixed bottom-6 right-6 flex flex-col space-y-3 z-50">
        <motion.a
          href="https://t.me/pandorauz"
          target="_blank"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="w-14 h-14 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition"
        >
          <span className="text-2xl">💬</span>
        </motion.a>
        <motion.button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="w-14 h-14 bg-gray-800 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition"
        >
          <span className="text-2xl">⬆️</span>
        </motion.button>
      </div>
    </footer>
  )
}