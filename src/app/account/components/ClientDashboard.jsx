'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  FileText, 
  Shield, 
  User, 
  LogOut,
  Calendar,
  CheckCircle,
  Clock,
  X
} from 'lucide-react'
import { useTranslation } from '../../../hooks/useTranslation'
import { accountLocales } from '../accountLocales'

export default function ClientDashboard() {
  const [activeTab, setActiveTab] = useState('requests')
  const { t } = useTranslation(accountLocales)
  
  const requests = [
    {
      id: 1,
      product: 'Pandora DX-91',
      status: 'processing',
      date: '23.05.2025',
      master: null
    },
    {
      id: 2,
      product: 'Pandora DX-4GS',
      status: 'accepted',
      date: '21.05.2025',
      master: 'Алексей К.'
    },
    {
      id: 3,
      product: 'Pandora DXL-5000',
      status: 'completed',
      date: '15.05.2025',
      master: 'Сергей М.',
      canReview: true
    }
  ]
  
  const [serialNumber, setSerialNumber] = useState('')
  const [warrantyResult, setWarrantyResult] = useState(null)
  
  const checkWarranty = (e) => {
    e.preventDefault()
    setWarrantyResult({
      isValid: serialNumber.length >= 6,
      model: 'Pandora DX-91',
      installDate: '15.01.2025',
      expiryDate: '15.01.2027',
      installer: 'АвтоПро Центр'
    })
  }
  
  const getStatusIcon = (status) => {
    switch(status) {
      case 'processing': return <Clock className="w-4 h-4" />
      case 'accepted': return <Calendar className="w-4 h-4" />
      case 'completed': return <CheckCircle className="w-4 h-4" />
      default: return null
    }
  }
  
  const getStatusColor = (status) => {
    switch(status) {
      case 'processing': return 'text-yellow-500 border-yellow-900'
      case 'accepted': return 'text-blue-500 border-blue-900'
      case 'completed': return 'text-green-500 border-green-900'
      default: return 'text-gray-500 border-gray-800'
    }
  }
  
  return (
    <div className="page-container min-h-screen  bg-black">
      <div className="max-w-6xl mx-auto px-4 py-20">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-thin text-white">{t('account.client.title')}</h1>
          <button className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
            <LogOut className="w-4 h-4" />
            <span className="text-sm">{t('account.logout')}</span>
          </button>
        </div>
        
        <div className="flex gap-4 mb-8">
          <button
            onClick={() => setActiveTab('requests')}
            className={`flex items-center gap-2 px-6 py-3 transition-all ${
              activeTab === 'requests'
                ? 'bg-white text-black'
                : 'border border-gray-800 text-gray-400 hover:text-white hover:border-gray-700'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span className="font-light">{t('account.client.tabs.requests')}</span>
          </button>
          <button
            onClick={() => setActiveTab('warranty')}
            className={`flex items-center gap-2 px-6 py-3 transition-all ${
              activeTab === 'warranty'
                ? 'bg-white text-black'
                : 'border border-gray-800 text-gray-400 hover:text-white hover:border-gray-700'
            }`}
          >
            <Shield className="w-4 h-4" />
            <span className="font-light">{t('account.client.tabs.warranty')}</span>
          </button>
          <button
            onClick={() => setActiveTab('profile')}
            className={`flex items-center gap-2 px-6 py-3 transition-all ${
              activeTab === 'profile'
                ? 'bg-white text-black'
                : 'border border-gray-800 text-gray-400 hover:text-white hover:border-gray-700'
            }`}
          >
            <User className="w-4 h-4" />
            <span className="font-light">{t('account.client.tabs.profile')}</span>
          </button>
        </div>
        
        {activeTab === 'requests' && (
          <div className="space-y-4">
            {requests.map((request, i) => (
              <motion.div
                key={request.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="bg-gray-950 border border-gray-800 p-6"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-light text-lg text-white mb-2">{request.product}</h3>
                    <p className="text-gray-500 text-sm">
                      {t('account.client.requestDate')}: {request.date}
                    </p>
                    {request.master && (
                      <p className="text-gray-500 text-sm">
                        {t('account.client.master')}: {request.master}
                      </p>
                    )}
                  </div>
                  <span className={`flex items-center gap-2 px-3 py-1 border text-sm ${getStatusColor(request.status)}`}>
                    {getStatusIcon(request.status)}
                    {t(`account.client.status.${request.status}`)}
                  </span>
                </div>
                
                <div className="mt-4 flex gap-2">
                  {request.status === 'processing' && (
                    <button className="text-red-500 hover:text-red-400 transition-colors text-sm">
                      {t('account.client.cancelRequest')}
                    </button>
                  )}
                  {request.canReview && (
                    <button className="text-gray-400 hover:text-white transition-colors text-sm">
                      {t('account.client.leaveReview')}
                    </button>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        )}
        
        {activeTab === 'warranty' && (
          <div className="bg-gray-950 border border-gray-800 p-8 max-w-2xl">
            <h2 className="text-2xl font-thin mb-6 text-white">{t('account.client.warranty.title')}</h2>
            <form onSubmit={checkWarranty} className="space-y-4">
              <input
                type="text"
                placeholder={t('account.client.warranty.placeholder')}
                required
                className="w-full px-4 py-3 bg-black border border-gray-800 text-white placeholder-gray-600 focus:border-gray-700 focus:outline-none transition-colors"
                value={serialNumber}
                onChange={e => setSerialNumber(e.target.value)}
              />
              <button
                type="submit"
                className="w-full bg-white text-black py-3 hover:bg-gray-100 transition-colors font-medium"
              >
                {t('account.client.warranty.check')}
              </button>
            </form>
            
            {warrantyResult && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`mt-6 p-6 border ${
                  warrantyResult.isValid
                    ? 'bg-green-950/20 border-green-900'
                    : 'bg-red-950/20 border-red-900'
                }`}
              >
                {warrantyResult.isValid ? (
                  <>
                    <h3 className="font-light text-green-400 mb-3 flex items-center gap-2">
                      <CheckCircle className="w-5 h-5" />
                      {t('account.client.warranty.active')}
                    </h3>
                    <div className="space-y-2 text-sm">
                      <p className="text-gray-300">
                        <span className="text-gray-500">{t('account.client.warranty.model')}:</span> {warrantyResult.model}
                      </p>
                      <p className="text-gray-300">
                        <span className="text-gray-500">{t('account.client.warranty.installed')}:</span> {warrantyResult.installDate}
                      </p>
                      <p className="text-gray-300">
                        <span className="text-gray-500">{t('account.client.warranty.expires')}:</span> {warrantyResult.expiryDate}
                      </p>
                      <p className="text-gray-300">
                        <span className="text-gray-500">{t('account.client.warranty.installer')}:</span> {warrantyResult.installer}
                      </p>
                    </div>
                  </>
                ) : (
                  <p className="text-red-400 flex items-center gap-2">
                    <X className="w-5 h-5" />
                    {t('account.client.warranty.notFound')}
                  </p>
                )}
              </motion.div>
            )}
          </div>
        )}
        
        {activeTab === 'profile' && (
          <div className="bg-gray-950 border border-gray-800 p-8 max-w-2xl">
            <h2 className="text-2xl font-thin mb-6 text-white">{t('account.client.profile.title')}</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-light mb-2 text-gray-400">
                  {t('account.client.profile.phone')}
                </label>
                <input 
                  type="tel" 
                  value="+998 90 123 45 67" 
                  className="w-full px-4 py-3 bg-black border border-gray-800 text-gray-500" 
                  disabled 
                />
              </div>
              <div>
                <label className="block text-sm font-light mb-2 text-gray-400">
                  {t('account.client.profile.name')}
                </label>
                <input 
                  type="text" 
                  placeholder={t('account.client.profile.namePlaceholder')}
                  className="w-full px-4 py-3 bg-black border border-gray-800 text-white placeholder-gray-600 focus:border-gray-700 focus:outline-none" 
                />
              </div>
              <div>
                <label className="block text-sm font-light mb-2 text-gray-400">
                  {t('account.client.profile.email')}
                </label>
                <input 
                  type="email" 
                  placeholder="email@example.com" 
                  className="w-full px-4 py-3 bg-black border border-gray-800 text-white placeholder-gray-600 focus:border-gray-700 focus:outline-none" 
                />
              </div>
              <button className="bg-white text-black px-8 py-3 hover:bg-gray-100 transition-colors font-medium">
                {t('account.client.profile.save')}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}