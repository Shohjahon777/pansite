'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  Phone,
  Mail,
  MapPin,
  ArrowUp,
  Shield,
  Clock,
  ChevronRight
} from 'lucide-react'
import { useTranslation } from '../../hooks/useTranslation'
import { footerLocales } from './footerLocales'
import {useLanguageStore} from "@/src/store/language";
import {useEffect, useState} from "react";
import axios from "axios";

export default function Footer() {
  const currentYear = new Date().getFullYear()
  const [contacts, setContacts] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const { t } = useTranslation(footerLocales)
  const {currentLocale} = useLanguageStore()

  useEffect(() => {
    fetchContactInfo()
  }, [currentLocale]);

  const fetchContactInfo = async () => {
    try {
      setIsLoading(true)
      setError(null)

      const response = await axios.post('/api/get-contact', {locale: currentLocale});

      if (response.status !== 200) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      if (!response.data || !Array.isArray(response.data) || response.data.length === 0) {
        throw new Error('Invalid or empty contact data received');
      }

      setContacts(response.data);
    } catch (error) {
      console.error('Error fetching contact info:', error);
      setError(error.message)
      setContacts([])
    } finally {
      setIsLoading(false)
    }
  };

  const contactData = contacts.length > 0 ? contacts[0] : null

  const footerLinks = {
    products: [
      { href: '/products', label: t('footer.columns.products.links.allSystems') },
      { href: '/products/dx91', label: 'Pandora DX-91' },
      { href: '/advantages', label: t('footer.columns.products.links.advantages') },
    ],
    service: [
      { href: '/service', label: t('footer.columns.service.links.findMaster') },
      { href: '/service#dealers', label: t('footer.columns.service.links.dealers') },
      { href: '/service#map', label: t('footer.columns.service.links.mapInstallers') },
      { href: '/reviews', label: t('footer.columns.service.links.allReviews') },
    ],
    support: [
      { href: '/account', label: t('footer.columns.support.links.account') },
      { href: '/account/warranty', label: t('footer.columns.support.links.checkWarranty') },
      { href: '/account#requests', label: t('footer.columns.support.links.myRequests') },
      { href: '/service', label: t('footer.columns.support.links.bookInstallation') },
    ],
    company: [
      { href: '/advantages', label: t('footer.columns.company.links.about') },
      { href: '/reviews', label: t('footer.columns.company.links.reviews') },
      { href: '/#contacts', label: t('footer.columns.company.links.contacts') },
    ]
  }

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
      <footer className="bg-gray-950 text-white border-t border-gray-900">
        {/* Main Footer Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
            {/* Brand Section */}
            <div className="lg:col-span-2">
              <Link href="/" className="inline-flex items-center space-x-3 mb-6 group">
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
              <p className="text-gray-400 mb-8 max-w-sm font-light">
                {t('footer.description')}
              </p>

              <div className="space-y-4">
                {isLoading ? (
                    <div className="space-y-3">
                      <div className="h-4 bg-gray-800 rounded animate-pulse"></div>
                      <div className="h-4 bg-gray-800 rounded animate-pulse"></div>
                      <div className="h-4 bg-gray-800 rounded animate-pulse"></div>
                      <div className="h-4 bg-gray-800 rounded animate-pulse"></div>
                    </div>
                ) : error ? (
                    <div className="text-red-400 text-sm">
                      Failed to load contact information
                    </div>
                ) : contactData ? (
                    <>
                      <div className="flex items-center gap-3 text-gray-400">
                        <Clock className="w-4 h-4 text-gray-600" />
                        <span className="text-sm">{contactData.support_text}</span>
                      </div>
                      <a
                          href={`tel:${contactData.phone}`}
                          className="flex items-center gap-3 text-gray-300 hover:text-white transition-colors group"
                      >
                        <Phone className="w-4 h-4 text-gray-600 group-hover:text-gray-400 transition-colors" />
                        <span className="font-light">{contactData.phone}</span>
                      </a>
                      <a
                          href={`mailto:${contactData.email}`}
                          className="flex items-center gap-3 text-gray-300 hover:text-white transition-colors group"
                      >
                        <Mail className="w-4 h-4 text-gray-600 group-hover:text-gray-400 transition-colors" />
                        <span className="font-light">{contactData.email}</span>
                      </a>
                      <div className="flex items-start gap-3 text-gray-400">
                        <MapPin className="w-4 h-4 text-gray-600 mt-0.5" />
                        <span className="text-sm font-light">{contactData.address}</span>
                      </div>
                    </>
                ) : (
                    <div className="text-gray-500 text-sm">
                      Contact information not available
                    </div>
                )}
              </div>
            </div>

            {/* Links Columns */}
            <div>
              <h3 className="font-medium text-sm uppercase tracking-wider text-gray-300 mb-4">
                {t('footer.columns.products.title')}
              </h3>
              <ul className="space-y-3">
                {footerLinks.products.map((link) => (
                    <li key={link.href}>
                      <Link
                          href={link.href}
                          className="text-gray-500 hover:text-white transition-colors text-sm font-light flex items-center group"
                      >
                        <ChevronRight className="w-3 h-3 mr-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                        {link.label}
                      </Link>
                    </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="font-medium text-sm uppercase tracking-wider text-gray-300 mb-4">
                {t('footer.columns.service.title')}
              </h3>
              <ul className="space-y-3">
                {footerLinks.service.map((link) => (
                    <li key={link.href}>
                      <Link
                          href={link.href}
                          className="text-gray-500 hover:text-white transition-colors text-sm font-light flex items-center group"
                      >
                        <ChevronRight className="w-3 h-3 mr-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                        {link.label}
                      </Link>
                    </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="font-medium text-sm uppercase tracking-wider text-gray-300 mb-4">
                {t('footer.columns.support.title')}
              </h3>
              <ul className="space-y-3">
                {footerLinks.support.map((link) => (
                    <li key={link.href}>
                      <Link
                          href={link.href}
                          className="text-gray-500 hover:text-white transition-colors text-sm font-light flex items-center group"
                      >
                        <ChevronRight className="w-3 h-3 mr-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                        {link.label}
                      </Link>
                    </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="border-t border-gray-900 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="flex items-center gap-2 text-gray-500 text-sm">
                <Shield className="w-4 h-4" />
                <span className="font-light">
                {t('footer.copyright', { year: currentYear })}
              </span>
              </div>

              {/* Back to top button */}
              <motion.button
                  onClick={scrollToTop}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-2 text-gray-500 hover:text-white transition-colors text-sm"
              >
                <span className="font-light uppercase tracking-wider">{t('footer.backToTop')}</span>
                <div className="w-8 h-8 border border-gray-700 hover:border-gray-500 transition-colors flex items-center justify-center">
                  <ArrowUp className="w-4 h-4" />
                </div>
              </motion.button>
            </div>
          </div>
        </div>

        {/* Floating Contact Button */}
        {/* ✅ Fixed phone number source */}
        {contactData?.phone && (
            <motion.a
                href={`tel:${contactData.phone.replace(/\s/g, '')}`}
                className="fixed bottom-6 right-6 w-14 h-14 bg-white text-black flex items-center justify-center shadow-2xl hover:bg-gray-100 transition-colors z-40"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
            >
              <Phone className="w-5 h-5" />
            </motion.a>
        )}
      </footer>
  )
}