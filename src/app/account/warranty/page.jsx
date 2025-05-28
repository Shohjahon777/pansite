'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Shield, CheckCircle, X, AlertCircle, Phone } from 'lucide-react'
import { useTranslation } from '../../../hooks/useTranslation'
import { warrantyLocales } from './warranty'

export default function WarrantyPage() {
  const [serialNumber, setSerialNumber] = useState('')
  const [isChecking, setIsChecking] = useState(false)
  const [result, setResult] = useState(null)
  const { t } = useTranslation(warrantyLocales)
  
  const handleCheck = (e) => {
    e.preventDefault()
    setIsChecking(true)

    setTimeout(() => {
      if (serialNumber.toUpperCase().startsWith('PD') && serialNumber.length >= 10) {
        setResult({
          isValid: true,
          model: 'Pandora DX-91',
          installDate: '15 января 2025',
          expiryDate: '15 января 2027',
          installer: 'АвтоПро Центр',
          installerPhone: '+998 71 123 45 67',
          remainingDays: 365,
          serialNumber: serialNumber.toUpperCase()
        })
      } else {
        setResult({ isValid: false })
      }
      setIsChecking(false)
    }, 1500)
  }
  
  return (
    <div className="page-container min-h-screen bg-black">
      <div className="max-w-2xl mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center mb-12"
        >
          <Shield className="w-16 h-16 text-gray-700 mx-auto mb-4" strokeWidth={1} />
          <h1 className="text-4xl font-thin text-white mb-4">
            {t('warranty.title')}
          </h1>
          <p className="text-gray-500 font-light">
            {t('warranty.subtitle')}
          </p>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gray-950 border border-gray-800 p-8"
        >
          <form onSubmit={handleCheck} className="space-y-6">
            <div>
              <label className="block text-sm font-light mb-2 text-gray-400">
                {t('warranty.serialNumber')}
              </label>
              <input
                type="text"
                placeholder={t('warranty.placeholder')}
                required
                className="w-full px-6 py-4 text-lg bg-black border border-gray-800 text-white placeholder-gray-600 focus:border-gray-700 focus:outline-none transition-colors uppercase"
                value={serialNumber}
                onChange={(e) => setSerialNumber(e.target.value)}
                disabled={isChecking}
              />
              <p className="mt-2 text-sm text-gray-600">
                {t('warranty.hint')}
              </p>
            </div>
            
            <button
              type="submit"
              disabled={isChecking}
              className={`w-full py-4 font-medium text-lg transition ${
                isChecking
                  ? 'bg-gray-800 text-gray-500'
                  : 'bg-white text-black hover:bg-gray-100'
              }`}
            >
              {isChecking ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  {t('warranty.checking')}
                </span>
              ) : t('warranty.checkButton')}
            </button>
          </form>
          
          {result && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className={`mt-8 p-6 border ${
                result.isValid
                  ? 'bg-green-950/10 border-green-900'
                  : 'bg-red-950/10 border-red-900'
              }`}
            >
              {result.isValid ? (
                <>
                  <div className="flex items-center mb-4">
                    <CheckCircle className="w-6 h-6 text-green-500 mr-3" />
                    <h3 className="text-xl font-light text-green-400">
                      {t('warranty.valid.title')}
                    </h3>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="bg-black/50 p-4 border border-gray-800">
                      <p className="text-sm text-gray-500">{t('warranty.valid.serialNumber')}</p>
                      <p className="font-light text-white text-lg">{result.serialNumber}</p>
                    </div>
                    
                    <div className="bg-black/50 p-4 border border-gray-800">
                      <p className="text-sm text-gray-500">{t('warranty.valid.model')}</p>
                      <p className="font-light text-white">{result.model}</p>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-black/50 p-4 border border-gray-800">
                        <p className="text-sm text-gray-500">{t('warranty.valid.installDate')}</p>
                        <p className="font-light text-white">{result.installDate}</p>
                      </div>
                      <div className="bg-black/50 p-4 border border-gray-800">
                        <p className="text-sm text-gray-500">{t('warranty.valid.expiryDate')}</p>
                        <p className="font-light text-white">{result.expiryDate}</p>
                      </div>
                    </div>
                    
                    <div className="bg-black/50 p-4 border border-gray-800">
                      <p className="text-sm text-gray-500">{t('warranty.valid.installer')}</p>
                      <p className="font-light text-white">{result.installer}</p>
                      <a href={`tel:${result.installerPhone}`} className="text-gray-400 text-sm hover:text-white transition-colors flex items-center gap-2 mt-1">
                        <Phone className="w-4 h-4" />
                        {result.installerPhone}
                      </a>
                    </div>
                    
                    <div className="bg-gradient-to-r from-gray-900 to-gray-950 p-4 border border-gray-800 text-center">
                      <p className="text-gray-400">
                        {t('warranty.valid.remaining')}: <span className="font-medium text-white">{result.remainingDays} {t('warranty.valid.days')}</span>
                      </p>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="flex items-center mb-4">
                    <X className="w-6 h-6 text-red-500 mr-3" />
                    <h3 className="text-xl font-light text-red-400">
                      {t('warranty.invalid.title')}
                    </h3>
                  </div>
                  <p className="text-gray-300 mb-4">
                    {t('warranty.invalid.description', { serialNumber })}
                  </p>
                  <div className="bg-black/50 p-4 border border-gray-800">
                    <p className="text-sm mb-2 text-gray-400">{t('warranty.invalid.reasons.title')}</p>
                    <ul className="text-sm text-gray-500 space-y-1">
                      <li>• {t('warranty.invalid.reasons.wrongNumber')}</li>
                      <li>• {t('warranty.invalid.reasons.notRegistered')}</li>
                      <li>• {t('warranty.invalid.reasons.expired')}</li>
                    </ul>
                  </div>
                  <div className="mt-4 text-center">
                    <p className="text-sm text-gray-400 mb-2">{t('warranty.invalid.needHelp')}</p>
                    <a href="tel:+998901234567" className="text-gray-300 font-light hover:text-white transition-colors flex items-center justify-center gap-2">
                      <Phone className="w-4 h-4" />
                      {t('warranty.invalid.callSupport')}
                    </a>
                  </div>
                </>
              )}
            </motion.div>
          )}
        </motion.div>
        
        <div className="mt-12 bg-gray-950 border border-gray-800 p-6">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-gray-600 mt-0.5" />
            <div>
              <h2 className="font-light text-lg mb-3 text-white">{t('warranty.findSerial.title')}</h2>
              <div className="space-y-2 text-gray-400 text-sm">
                <p>• {t('warranty.findSerial.onDevice')}</p>
                <p>• {t('warranty.findSerial.inWarranty')}</p>
                <p>• {t('warranty.findSerial.inDocs')}</p>
                <p>• {t('warranty.findSerial.inApp')}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}