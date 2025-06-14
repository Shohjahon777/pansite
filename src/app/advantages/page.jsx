'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import {
  Shield,
  Radio,
  Thermometer,
  Smartphone,
  ShieldCheck,
  Cpu,
  Check,
  X,
  ArrowRight,
  Loader2
} from 'lucide-react'
import { useTranslation } from '../../hooks/useTranslation'
import { advantagesLocales } from './advantagesLocales'
import { useEffect, useState, useCallback } from "react";
import { useLanguageStore } from "@/src/store/language";
import axios from "axios";

// Icon mapping object
const iconMap = {
  'Shield': Shield,
  'Radio': Radio,
  'Thermometer': Thermometer,
  'Smartphone': Smartphone,
  'ShieldCheck': ShieldCheck,
  'Cpu': Cpu
};

export default function AdvantagesPage() {
  const { t } = useTranslation(advantagesLocales)
  const [technologies, setTechnologies] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [retryCount, setRetryCount] = useState(0)

  const { currentLocale } = useLanguageStore()

  const fetchTechnologies = useCallback(async () => {
    setLoading(true)
    setError(null)

    try {
      const response = await axios.post('/api/get-advantages',
          { locale: currentLocale },
          {
            timeout: 10000,
            headers: {
              'Content-Type': 'application/json',
            }
          }
      )

      if (response.status !== 200) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const processedData = response.data.map(tech => ({
        ...tech,
        icon: iconMap[tech.icon] || Shield
      }))

      setTechnologies(processedData)
      setRetryCount(0)
    } catch (error) {
      console.error('Error fetching technologies:', error)


      let errorMessage = 'Failed to load technologies'
      if (error.code === 'ECONNABORTED') {
        errorMessage = 'Request timeout - please try again'
      } else if (error.response?.status >= 500) {
        errorMessage = 'Server error - please try again later'
      } else if (error.response?.status >= 400) {
        errorMessage = 'Bad request - please refresh the page'
      } else if (!navigator.onLine) {
        errorMessage = 'No internet connection'
      }

      setError(errorMessage)
    } finally {
      setLoading(false)
    }
  }, [currentLocale])

  const handleRetry = useCallback(() => {
    if (retryCount < 3) {
      setRetryCount(prev => prev + 1)
      fetchTechnologies()
    }
  }, [fetchTechnologies, retryCount])

  useEffect(() => {
    fetchTechnologies()
  }, [fetchTechnologies])

  useEffect(() => {
    if (error && retryCount < 3) {
      const timeoutId = setTimeout(() => {
        handleRetry()
      }, Math.pow(2, retryCount) * 1000) // 1s, 2s, 4s delays

      return () => clearTimeout(timeoutId)
    }
  }, [error, retryCount, handleRetry])

  const comparisonData = [
    { feature: t('advantages.comparison.range'), pandora: t('advantages.comparison.pandoraRange'), others: t('advantages.comparison.othersRange') },
    { feature: t('advantages.comparison.protection'), pandora: t('advantages.comparison.dialogCode'), others: t('advantages.comparison.staticCode') },
    { feature: t('advantages.comparison.mobile'), pandora: true, others: false },
    { feature: t('advantages.comparison.autostart'), pandora: true, others: true },
    { feature: t('advantages.comparison.warranty'), pandora: t('advantages.comparison.warranty2'), others: t('advantages.comparison.warranty1') },
    { feature: t('advantages.comparison.support'), pandora: true, others: false }
  ]

  // Loading state
  if (loading) {
    return (
        <div className="page-container min-h-screen bg-black">
          <div className="max-w-7xl mx-auto px-4 py-16">
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center mb-16"
            >
              <h1 className="text-5xl font-thin text-white mb-4">
                {t('advantages.title')}
              </h1>
              <p className="text-xl text-gray-500 font-light">
                {t('advantages.subtitle')}
              </p>
            </motion.div>

            <div className="flex justify-center items-center py-20">
              <div className="text-center">
                <Loader2 className="w-8 h-8 text-gray-500 animate-spin mx-auto mb-4" />
                <p className="text-gray-500">Loading technologies...</p>
              </div>
            </div>
          </div>
        </div>
    )
  }

  // Error state
  if (error && technologies.length === 0) {
    return (
        <div className="page-container min-h-screen bg-black">
          <div className="max-w-7xl mx-auto px-4 py-16">
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center mb-16"
            >
              <h1 className="text-5xl font-thin text-white mb-4">
                {t('advantages.title')}
              </h1>
              <p className="text-xl text-gray-500 font-light">
                {t('advantages.subtitle')}
              </p>
            </motion.div>

            <div className="flex justify-center items-center py-20">
              <div className="text-center bg-gray-950 border border-gray-800 p-8 rounded">
                <X className="w-12 h-12 text-red-500 mx-auto mb-4" />
                <h3 className="text-xl text-white mb-2">Failed to Load</h3>
                <p className="text-gray-400 mb-4">{error}</p>
                {retryCount < 3 && (
                    <button
                        onClick={handleRetry}
                        className="bg-white text-black px-6 py-2 rounded hover:bg-gray-100 transition-colors"
                        disabled={loading}
                    >
                      {loading ? 'Retrying...' : 'Try Again'}
                    </button>
                )}
              </div>
            </div>
          </div>
        </div>
    )
  }

  return (
      <div className="page-container min-h-screen bg-black">
        <div className="max-w-7xl mx-auto px-4 py-16">
          <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center mb-16"
          >
            <h1 className="text-5xl font-thin text-white mb-4">
              {t('advantages.title')}
            </h1>
            <p className="text-xl text-gray-500 font-light">
              {t('advantages.subtitle')}
            </p>
          </motion.div>

          {/* Error banner for partial failures */}
          {error && technologies.length > 0 && (
              <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-yellow-900/20 border border-yellow-800 p-4 rounded mb-8"
              >
                <p className="text-yellow-400 text-sm text-center">
                  Some data might be outdated. {retryCount < 3 && (
                    <button
                        onClick={handleRetry}
                        className="underline hover:no-underline ml-2"
                    >
                      Refresh
                    </button>
                )}
                </p>
              </motion.div>
          )}

          {/* Technologies Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
            {technologies.map((tech, i) => {
              const IconComponent = tech.icon
              return (
                  <motion.div
                      key={tech.title || i}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="bg-gray-950 border border-gray-800 p-8 hover:border-gray-700 transition-all group"
                  >
                    <IconComponent
                        className="w-12 h-12 text-gray-700 mb-6 group-hover:text-gray-500 transition-colors"
                        strokeWidth={1}
                    />
                    <h3 className="text-xl font-light text-white mb-3">{tech.title}</h3>
                    <p className="text-gray-500 mb-6 text-sm">{tech.description}</p>
                    <ul className="space-y-2">
                      {tech.details?.map((detail, j) => (
                          <li key={j} className="flex items-start text-sm">
                            <span className="text-gray-600 mr-2 mt-1">•</span>
                            <span className="text-gray-400 font-light">{detail}</span>
                          </li>
                      )) || (
                          <li className="text-gray-500 text-sm italic">No details available</li>
                      )}
                    </ul>
                  </motion.div>
              )
            })}
          </div>

          {/* Show placeholder if no technologies loaded */}
          {technologies.length === 0 && !loading && !error && (
              <div className="text-center py-20">
                <p className="text-gray-500">No technologies available at the moment.</p>
              </div>
          )}

          {/* Comparison Section */}
          <motion.section
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="mb-20"
          >
            <h2 className="text-3xl font-thin text-center text-white mb-12">
              {t('advantages.comparisonTitle')}
            </h2>
            <div className="bg-gray-950 border border-gray-800 overflow-hidden">
              <table className="w-full">
                <thead className="bg-gray-900">
                <tr>
                  <th className="px-6 py-4 text-left font-light text-gray-400">
                    {t('advantages.comparison.feature')}
                  </th>
                  <th className="px-6 py-4 text-center font-light text-white">
                    Pandora
                  </th>
                  <th className="px-6 py-4 text-center font-light text-gray-400">
                    {t('advantages.comparison.others')}
                  </th>
                </tr>
                </thead>
                <tbody>
                {comparisonData.map((row, i) => (
                    <tr key={i} className={i % 2 === 0 ? 'bg-gray-950' : 'bg-gray-900/50'}>
                      <td className="px-6 py-4 text-gray-300 font-light">{row.feature}</td>
                      <td className="px-6 py-4 text-center">
                        {typeof row.pandora === 'boolean' ? (
                            row.pandora ? (
                                <Check className="w-5 h-5 text-green-500 mx-auto" />
                            ) : (
                                <X className="w-5 h-5 text-red-500 mx-auto" />
                            )
                        ) : (
                            <span className="text-white font-light">{row.pandora}</span>
                        )}
                      </td>
                      <td className="px-6 py-4 text-center">
                        {typeof row.others === 'boolean' ? (
                            row.others ? (
                                <Check className="w-5 h-5 text-green-500 mx-auto" />
                            ) : (
                                <X className="w-5 h-5 text-red-500 mx-auto" />
                            )
                        ) : (
                            <span className="text-gray-500 font-light">{row.others}</span>
                        )}
                      </td>
                    </tr>
                ))}
                </tbody>
              </table>
            </div>
          </motion.section>

          {/* CTA Section */}
          <motion.section
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="text-center"
          >
            <div className="bg-gradient-to-b from-gray-900 to-gray-950 border border-gray-800 p-12">
              <h2 className="text-3xl font-thin text-white mb-4">
                {t('advantages.cta.title')}
              </h2>
              <p className="text-xl text-gray-400 mb-8 font-light">
                {t('advantages.cta.subtitle')}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                    href="/products"
                    className="inline-flex items-center justify-center gap-2 bg-white text-black px-8 py-3 hover:bg-gray-100 transition-colors group"
                >
                  <span className="font-medium">{t('advantages.cta.chooseSystem')}</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                    href="/service"
                    className="inline-flex items-center justify-center gap-2 border border-gray-700 text-white px-8 py-3 hover:bg-gray-900 transition-all"
                >
                  <span className="font-medium">{t('advantages.cta.findMaster')}</span>
                </Link>
              </div>
            </div>
          </motion.section>
        </div>
      </div>
  )
}