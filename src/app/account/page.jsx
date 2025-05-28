'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import ClientDashboard from './components/ClientDashboard'
import MasterDashboard from './components/MasterDashboard'
import { User, Wrench, Phone, Lock } from 'lucide-react'
import { useTranslation } from '../../hooks/useTranslation'
import { accountLocales } from './accountLocales'

export default function AccountPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [userType, setUserType] = useState('client')
  const [phone, setPhone] = useState('')
  const [code, setCode] = useState('')
  const [step, setStep] = useState('phone')
  const { t } = useTranslation(accountLocales)
  
  const handleLogin = (e) => {
    e.preventDefault()
    if (step === 'phone') {
      setStep('code')
    } else {
      setIsLoggedIn(true)
    }
  }
  
  if (isLoggedIn) {
    return userType === 'client' ? <ClientDashboard /> : <MasterDashboard />
  }
  
  return (
    <div className="page-container min-h-screen bg-black flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-gray-950 border border-gray-800 p-8 max-w-md w-full"
      >
        <h2 className="text-3xl font-thin text-center mb-8 text-white">
          {t('account.login.title')}
        </h2>
        
        {step === 'phone' ? (
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-sm font-light mb-2 text-gray-400">
                {t('account.login.phoneLabel')}
              </label>
              <div className="relative">
                <Phone className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-600" />
                <input
                  type="tel"
                  placeholder="+998 XX XXX XX XX"
                  required
                  className="w-full pl-12 pr-4 py-3 bg-black border border-gray-800 text-white placeholder-gray-600 focus:border-gray-700 focus:outline-none transition-colors"
                  value={phone}
                  onChange={e => setPhone(e.target.value)}
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-light mb-4 text-gray-400">
                {t('account.login.userType')}
              </label>
              <div className="grid grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() => setUserType('client')}
                  className={`p-4 border transition-all ${
                    userType === 'client'
                      ? 'border-white bg-white text-black'
                      : 'border-gray-800 bg-gray-950 text-gray-400 hover:border-gray-700'
                  }`}
                >
                  <User className="w-8 h-8 mx-auto mb-2" />
                  <div className="text-sm font-light">{t('account.login.client')}</div>
                </button>
                <button
                  type="button"
                  onClick={() => setUserType('master')}
                  className={`p-4 border transition-all ${
                    userType === 'master'
                      ? 'border-white bg-white text-black'
                      : 'border-gray-800 bg-gray-950 text-gray-400 hover:border-gray-700'
                  }`}
                >
                  <Wrench className="w-8 h-8 mx-auto mb-2" />
                  <div className="text-sm font-light">{t('account.login.master')}</div>
                </button>
              </div>
            </div>
            
            <button
              type="submit"
              className="w-full bg-white text-black py-3 hover:bg-gray-100 transition-colors font-medium"
            >
              {t('account.login.getCode')}
            </button>
          </form>
        ) : (
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-sm font-light mb-2 text-gray-400">
                {t('account.login.codeLabel')}
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-600" />
                <input
                  type="text"
                  placeholder="XXXX"
                  required
                  className="w-full pl-12 pr-4 py-3 bg-black border border-gray-800 text-white text-center text-2xl tracking-widest placeholder-gray-600 focus:border-gray-700 focus:outline-none transition-colors"
                  value={code}
                  onChange={e => setCode(e.target.value)}
                  maxLength="4"
                />
              </div>
            </div>
            
            <p className="text-sm text-gray-500 text-center">
              {t('account.login.codeSent')} {phone}
            </p>
            
            <button
              type="submit"
              className="w-full bg-white text-black py-3 hover:bg-gray-100 transition-colors font-medium"
            >
              {t('account.login.enter')}
            </button>
            
            <button
              type="button"
              onClick={() => setStep('phone')}
              className="w-full text-gray-400 hover:text-white transition-colors text-sm"
            >
              {t('account.login.changeNumber')}
            </button>
          </form>
        )}
        
        {/* Quick warranty check */}
        <div className="mt-8 pt-8 border-t border-gray-800">
          <p className="text-center text-gray-500 mb-4 text-sm">
            {t('account.login.orCheckWarranty')}
          </p>
          <button
            onClick={() => window.location.href = '/account/warranty'}
            className="w-full border border-gray-700 text-gray-300 py-3 hover:bg-gray-900 hover:text-white transition-all"
          >
            {t('account.login.checkWarranty')}
          </button>
        </div>
      </motion.div>
    </div>
  )
}