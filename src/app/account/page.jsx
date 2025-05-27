'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import ClientDashboard from './components/ClientDashboard'
import MasterDashboard from './components/MasterDashboard'

export default function AccountPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [userType, setUserType] = useState('client')
  const [phone, setPhone] = useState('')
  const [code, setCode] = useState('')
  const [step, setStep] = useState('phone')
  
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
    <div className="page-container min-h-screen bg-gradient-to-br from-black to-gray-900 flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-gray-900 rounded-3xl shadow-2xl p-8 max-w-md w-full border border-gray-800"
      >
        <h2 className="text-3xl font-bold text-center mb-8 text-white">Вход в кабинет</h2>
        
        {step === 'phone' ? (
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-400">Номер телефона</label>
              <input
                type="tel"
                placeholder="+998 XX XXX XX XX"
                required
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl focus:ring-2 focus:ring-purple-600 text-white placeholder-gray-500"
                value={phone}
                onChange={e => setPhone(e.target.value)}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-400">Вы:</label>
              <div className="grid grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() => setUserType('client')}
                  className={`p-4 rounded-xl border-2 transition ${
                    userType === 'client'
                      ? 'border-purple-600 bg-purple-900/20'
                      : 'border-gray-700 bg-gray-800'
                  }`}
                >
                  <div className="text-2xl mb-1">👤</div>
                  <div className="text-gray-300">Клиент</div>
                </button>
                <button
                  type="button"
                  onClick={() => setUserType('master')}
                  className={`p-4 rounded-xl border-2 transition ${
                    userType === 'master'
                      ? 'border-purple-600 bg-purple-900/20'
                      : 'border-gray-700 bg-gray-800'
                  }`}
                >
                  <div className="text-2xl mb-1">👨‍🔧</div>
                  <div className="text-gray-300">Мастер</div>
                </button>
              </div>
            </div>
            
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 rounded-xl"
            >
              Получить код
            </button>
          </form>
        ) : (
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-400">Код из SMS</label>
              <input
                type="text"
                placeholder="XXXX"
                required
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-center text-2xl tracking-widest text-white placeholder-gray-500"
                value={code}
                onChange={e => setCode(e.target.value)}
                maxLength="4"
              />
            </div>
            
            <p className="text-sm text-gray-400 text-center">
              Код отправлен на номер {phone}
            </p>
            
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 rounded-xl"
            >
              Войти
            </button>
            
            <button
              type="button"
              onClick={() => setStep('phone')}
              className="w-full text-purple-400 hover:text-purple-300"
            >
              Изменить номер
            </button>
          </form>
        )}
        
        {/* Быстрая проверка гарантии */}
        <div className="mt-8 pt-8 border-t border-gray-800">
          <p className="text-center text-gray-400 mb-4">Или проверьте гарантию без входа</p>
          <button
            onClick={() => window.location.href = '/account/warranty'}
            className="w-full border-2 border-purple-600 text-purple-400 py-3 rounded-xl hover:bg-purple-900/20"
          >
            Проверить гарантию
          </button>
        </div>
      </motion.div>
    </div>
  )
}