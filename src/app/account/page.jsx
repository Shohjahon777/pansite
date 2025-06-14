'use client'

import {useState, useEffect} from 'react'
import {motion, AnimatePresence} from 'framer-motion'
import {User, Wrench, Phone, Lock, Eye, EyeOff, ArrowLeft, UserPlus} from 'lucide-react'
import {useTranslation} from '../../hooks/useTranslation'
import {authAPI, tokenManager, userManager} from '../../utils/api'
import {accountLocales} from "@/src/app/account/accountLocales";
import ClientDashboard from "@/src/app/account/components/ClientDashboard";
import MasterDashboard from "@/src/app/account/components/MasterDashboard";

export default function AccountPage() {
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [userType, setUserType] = useState('client')

    // Client auth states
    const [clientFlow, setClientFlow] = useState('login')
    const [clientStep, setClientStep] = useState('credentials')
    const [phone, setPhone] = useState('')
    const [code, setCode] = useState('')
    const [clientLogin, setClientLogin] = useState('')
    const [clientPassword, setClientPassword] = useState('')
    const [clientName, setClientName] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const [showNewPassword, setShowNewPassword] = useState(false)

    // Master login states
    const [masterLogin, setMasterLogin] = useState('')
    const [masterPassword, setMasterPassword] = useState('')
    const [showMasterPassword, setShowMasterPassword] = useState(false)

    // Common states
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState('')
    const [successMessage, setSuccessMessage] = useState('')

    const {t} = useTranslation(accountLocales)

    useEffect(() => {
        const checkAuthStatus = () => {
            if (tokenManager.isValid()) {
                const user = userManager.get()
                if (user) {
                    setIsLoggedIn(true)
                    setUserType(user.role === 'master' ? 'master' : 'client')
                }
            }
        }

        checkAuthStatus()
    }, [])

    const resetClientForm = () => {
        setError('')
        setSuccessMessage('')
        setPhone('')
        setCode('')
        setClientLogin('')
        setClientPassword('')
        setClientName('')
        setConfirmPassword('')
        setNewPassword('')
        setClientStep('credentials')
    }

    const resetMasterForm = () => {
        setError('')
        setSuccessMessage('')
        setMasterLogin('')
        setMasterPassword('')
    }

    const handleClientLogin = async (e) => {
        e.preventDefault()
        setIsLoading(true)
        setError('')

        try {
            const result = await authAPI.loginClient(clientLogin, clientPassword)
            if (result.success) {
                setIsLoggedIn(true)
                setUserType('client')
            }
        } catch (err) {
            setError(err.message || 'Invalid login credentials')
        } finally {
            setIsLoading(false)
        }
    }

    const handleClientRegistration = async (e) => {
        e.preventDefault()
        setIsLoading(true)
        setError('')

        try {
            if (clientStep === 'phone') {
                await authAPI.sendRegistrationSMS(phone)
                setClientStep('code')
                setSuccessMessage('Verification code sent to your phone')
            } else if (clientStep === 'code') {
                const result = await authAPI.verifyRegistrationSMS(phone, code)
                if (result.success) {
                    setClientStep('registration')
                    setSuccessMessage('Phone verified! Please complete registration')
                }
            } else if (clientStep === 'registration') {

                if (clientPassword !== confirmPassword) {
                    setError('Passwords do not match')
                    return
                }

                const result = await authAPI.registerClient({
                    phone,
                    name: clientName,
                    login: clientLogin,
                    password: clientPassword
                })

                if (result.success) {
                    setIsLoggedIn(true)
                    setUserType('client')
                }
            }
        } catch (err) {
            setError(err.message || 'Registration failed')
        } finally {
            setIsLoading(false)
        }
    }

    const handleForgotPassword = async (e) => {
        e.preventDefault()
        setIsLoading(true)
        setError('')

        try {
            if (clientStep === 'phone') {
                await authAPI.sendResetPasswordSMS(phone)
                setClientStep('code')
                setSuccessMessage('Reset code sent to your phone')
            } else if (clientStep === 'code') {

                const result = await authAPI.verifyResetPasswordSMS(phone, code)
                if (result.success) {
                    setClientStep('newPassword')
                    setSuccessMessage('Code verified! Enter new password')
                }
            } else if (clientStep === 'newPassword') {
                if (newPassword !== confirmPassword) {
                    setError('Passwords do not match')
                    return
                }

                const result = await authAPI.resetPassword(phone, code, newPassword)
                if (result.success) {
                    setSuccessMessage('Password reset successful! You can now login')
                    setClientFlow('login')
                    resetClientForm()
                }
            }
        } catch (err) {
            setError(err.message || 'Password reset failed')
        } finally {
            setIsLoading(false)
        }
    }

    // Master Login
    const handleMasterLogin = async (e) => {
        e.preventDefault()
        setIsLoading(true)
        setError('')

        try {
            const result = await authAPI.loginMaster(masterLogin, masterPassword)
            if (result.success) {
                setIsLoggedIn(true)
                setUserType('master')
            }
        } catch (err) {
            setError(err.message || 'Invalid login credentials')
        } finally {
            setIsLoading(false)
        }
    }

    const handleLogout = async () => {
        try {
            await authAPI.logout()
        } catch (error) {
            console.error('Logout error:', error)
        } finally {
            setIsLoggedIn(false)
            setUserType('client')
            resetClientForm()
            resetMasterForm()
        }
    }

    const switchUserType = (type) => {
        setUserType(type)
        resetClientForm()
        resetMasterForm()
        setClientFlow('login')
    }

    const switchClientFlow = (flow) => {
        setClientFlow(flow)
        resetClientForm()
        if (flow === 'register') {
            setClientStep('phone')
        } else if (flow === 'forgot') {
            setClientStep('phone')
        } else {
            setClientStep('credentials')
        }
    }

    if (isLoggedIn) {
        return userType === 'client' ?
            <ClientDashboard onLogout={handleLogout}/> :
            <MasterDashboard onLogout={handleLogout}/>
    }

    return (
        <div className="page-container min-h-screen bg-black flex items-center justify-center p-4">
            <motion.div
                initial={{opacity: 0, scale: 0.95}}
                animate={{opacity: 1, scale: 1}}
                className="bg-gray-950 border border-gray-800 p-6 sm:p-8 max-w-md w-full"
            >
                <h2 className="text-2xl sm:text-3xl font-thin text-center mb-6 sm:mb-8 text-white">
                    {clientFlow === 'register' ? 'Create Account' :
                        clientFlow === 'forgot' ? 'Reset Password' :
                            t('account.login.title')}
                </h2>

                {/* User Type Selection */}
                <div className="mb-6">
                    <label className="block text-sm font-light mb-4 text-gray-400">
                        {t('account.login.userType')}
                    </label>
                    <div className="grid grid-cols-2 gap-4">
                        <button
                            type="button"
                            onClick={() => switchUserType('client')}
                            className={`p-3 sm:p-4 border transition-all ${
                                userType === 'client'
                                    ? 'border-white bg-white text-black'
                                    : 'border-gray-800 bg-gray-950 text-gray-400 hover:border-gray-700'
                            }`}
                        >
                            <User className="w-6 h-6 sm:w-8 sm:h-8 mx-auto mb-2"/>
                            <div className="text-xs sm:text-sm font-light">{t('account.login.client')}</div>
                        </button>
                        <button
                            type="button"
                            onClick={() => switchUserType('master')}
                            className={`p-3 sm:p-4 border transition-all ${
                                userType === 'master'
                                    ? 'border-white bg-white text-black'
                                    : 'border-gray-800 bg-gray-950 text-gray-400 hover:border-gray-700'
                            }`}
                        >
                            <Wrench className="w-6 h-6 sm:w-8 sm:h-8 mx-auto mb-2"/>
                            <div className="text-xs sm:text-sm font-light">{t('account.login.master')}</div>
                        </button>
                    </div>
                </div>

                {/* Messages */}
                <AnimatePresence mode="wait">
                    {error && (
                        <motion.div
                            initial={{opacity: 0, y: -10}}
                            animate={{opacity: 1, y: 0}}
                            exit={{opacity: 0, y: -10}}
                            className="mb-4 p-3 bg-red-900/50 border border-red-800 text-red-300 text-sm rounded"
                        >
                            {error}
                        </motion.div>
                    )}
                    {successMessage && (
                        <motion.div
                            initial={{opacity: 0, y: -10}}
                            animate={{opacity: 1, y: 0}}
                            exit={{opacity: 0, y: -10}}
                            className="mb-4 p-3 bg-green-900/50 border border-green-800 text-green-300 text-sm rounded"
                        >
                            {successMessage}
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Client Forms */}
                {userType === 'client' && (
                    <div className="space-y-6">
                        {/* Client Login Form */}
                        {clientFlow === 'login' && (
                            <form onSubmit={handleClientLogin} className="space-y-4">
                                <div>
                                    <label className="block text-sm font-light mb-2 text-gray-400">
                                        Login
                                    </label>
                                    <div className="relative">
                                        <User
                                            className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-600"/>
                                        <input
                                            type="text"
                                            placeholder="Enter your login"
                                            required
                                            className="w-full pl-12 pr-4 py-3 bg-black border border-gray-800 text-white placeholder-gray-600 focus:border-gray-700 focus:outline-none transition-colors"
                                            value={clientLogin}
                                            onChange={e => setClientLogin(e.target.value)}
                                            disabled={isLoading}
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-light mb-2 text-gray-400">
                                        Password
                                    </label>
                                    <div className="relative">
                                        <Lock
                                            className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-600"/>
                                        <input
                                            type={showPassword ? "text" : "password"}
                                            placeholder="Enter your password"
                                            required
                                            className="w-full pl-12 pr-12 py-3 bg-black border border-gray-800 text-white placeholder-gray-600 focus:border-gray-700 focus:outline-none transition-colors"
                                            value={clientPassword}
                                            onChange={e => setClientPassword(e.target.value)}
                                            disabled={isLoading}
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-600 hover:text-gray-400 transition-colors"
                                            disabled={isLoading}
                                        >
                                            {showPassword ? <EyeOff className="w-5 h-5"/> : <Eye className="w-5 h-5"/>}
                                        </button>
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    disabled={isLoading || !clientLogin.trim() || !clientPassword.trim()}
                                    className="w-full bg-white text-black py-3 hover:bg-gray-100 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {isLoading ? 'Logging in...' : 'Login'}
                                </button>

                                <div className="flex flex-col sm:flex-row gap-2 text-sm">
                                    <button
                                        type="button"
                                        onClick={() => switchClientFlow('forgot')}
                                        className="text-gray-400 hover:text-white transition-colors"
                                        disabled={isLoading}
                                    >
                                        Forgot Password?
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => switchClientFlow('register')}
                                        className="text-gray-400 hover:text-white transition-colors flex items-center justify-center gap-1"
                                        disabled={isLoading}
                                    >
                                        <UserPlus className="w-4 h-4"/>
                                        Create Account
                                    </button>
                                </div>
                            </form>
                        )}

                        {/* Client Registration Form */}
                        {clientFlow === 'register' && (
                            <div>
                                <button
                                    onClick={() => switchClientFlow('login')}
                                    className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-4"
                                    disabled={isLoading}
                                >
                                    <ArrowLeft className="w-4 h-4"/>
                                    Back to Login
                                </button>

                                {clientStep === 'phone' && (
                                    <form onSubmit={handleClientRegistration} className="space-y-4">
                                        <div>
                                            <label className="block text-sm font-light mb-2 text-gray-400">
                                                Phone Number
                                            </label>
                                            <div className="relative">
                                                <Phone
                                                    className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-600"/>
                                                <input
                                                    type="tel"
                                                    placeholder="+998 XX XXX XX XX"
                                                    required
                                                    className="w-full pl-12 pr-4 py-3 bg-black border border-gray-800 text-white placeholder-gray-600 focus:border-gray-700 focus:outline-none transition-colors"
                                                    value={phone}
                                                    onChange={e => setPhone(e.target.value)}
                                                    disabled={isLoading}
                                                />
                                            </div>
                                        </div>

                                        <button
                                            type="submit"
                                            disabled={isLoading || !phone.trim()}
                                            className="w-full bg-white text-black py-3 hover:bg-gray-100 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                                        >
                                            {isLoading ? 'Sending...' : 'Send Verification Code'}
                                        </button>
                                    </form>
                                )}

                                {clientStep === 'code' && (
                                    <form onSubmit={handleClientRegistration} className="space-y-4">
                                        <div>
                                            <label className="block text-sm font-light mb-2 text-gray-400">
                                                Verification Code
                                            </label>
                                            <div className="relative">
                                                <Lock
                                                    className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-600"/>
                                                <input
                                                    type="text"
                                                    placeholder="XXXX"
                                                    required
                                                    className="w-full pl-12 pr-4 py-3 bg-black border border-gray-800 text-white text-center text-2xl tracking-widest placeholder-gray-600 focus:border-gray-700 focus:outline-none transition-colors"
                                                    value={code}
                                                    onChange={e => setCode(e.target.value)}
                                                    maxLength="4"
                                                    disabled={isLoading}
                                                />
                                            </div>
                                        </div>

                                        <p className="text-sm text-gray-500 text-center">
                                            Code sent to {phone}
                                        </p>

                                        <button
                                            type="submit"
                                            disabled={isLoading || !code.trim()}
                                            className="w-full bg-white text-black py-3 hover:bg-gray-100 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                                        >
                                            {isLoading ? 'Verifying...' : 'Verify Code'}
                                        </button>

                                        <button
                                            type="button"
                                            onClick={() => setClientStep('phone')}
                                            className="w-full text-gray-400 hover:text-white transition-colors text-sm"
                                            disabled={isLoading}
                                        >
                                            Change Phone Number
                                        </button>
                                    </form>
                                )}

                                {clientStep === 'registration' && (
                                    <form onSubmit={handleClientRegistration} className="space-y-4">
                                        <div>
                                            <label className="block text-sm font-light mb-2 text-gray-400">
                                                Full Name
                                            </label>
                                            <div className="relative">
                                                <User
                                                    className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-600"/>
                                                <input
                                                    type="text"
                                                    placeholder="Enter your full name"
                                                    required
                                                    className="w-full pl-12 pr-4 py-3 bg-black border border-gray-800 text-white placeholder-gray-600 focus:border-gray-700 focus:outline-none transition-colors"
                                                    value={clientName}
                                                    onChange={e => setClientName(e.target.value)}
                                                    disabled={isLoading}
                                                />
                                            </div>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-light mb-2 text-gray-400">
                                                Login Username
                                            </label>
                                            <div className="relative">
                                                <User
                                                    className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-600"/>
                                                <input
                                                    type="text"
                                                    placeholder="Choose a username"
                                                    required
                                                    className="w-full pl-12 pr-4 py-3 bg-black border border-gray-800 text-white placeholder-gray-600 focus:border-gray-700 focus:outline-none transition-colors"
                                                    value={clientLogin}
                                                    onChange={e => setClientLogin(e.target.value)}
                                                    disabled={isLoading}
                                                />
                                            </div>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-light mb-2 text-gray-400">
                                                Password
                                            </label>
                                            <div className="relative">
                                                <Lock
                                                    className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-600"/>
                                                <input
                                                    type={showPassword ? "text" : "password"}
                                                    placeholder="Create a password"
                                                    required
                                                    className="w-full pl-12 pr-12 py-3 bg-black border border-gray-800 text-white placeholder-gray-600 focus:border-gray-700 focus:outline-none transition-colors"
                                                    value={clientPassword}
                                                    onChange={e => setClientPassword(e.target.value)}
                                                    disabled={isLoading}
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => setShowPassword(!showPassword)}
                                                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-600 hover:text-gray-400 transition-colors"
                                                    disabled={isLoading}
                                                >
                                                    {showPassword ? <EyeOff className="w-5 h-5"/> :
                                                        <Eye className="w-5 h-5"/>}
                                                </button>
                                            </div>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-light mb-2 text-gray-400">
                                                Confirm Password
                                            </label>
                                            <div className="relative">
                                                <Lock
                                                    className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-600"/>
                                                <input
                                                    type={showConfirmPassword ? "text" : "password"}
                                                    placeholder="Confirm your password"
                                                    required
                                                    className="w-full pl-12 pr-12 py-3 bg-black border border-gray-800 text-white placeholder-gray-600 focus:border-gray-700 focus:outline-none transition-colors"
                                                    value={confirmPassword}
                                                    onChange={e => setConfirmPassword(e.target.value)}
                                                    disabled={isLoading}
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-600 hover:text-gray-400 transition-colors"
                                                    disabled={isLoading}
                                                >
                                                    {showConfirmPassword ? <EyeOff className="w-5 h-5"/> :
                                                        <Eye className="w-5 h-5"/>}
                                                </button>
                                            </div>
                                        </div>

                                        <button
                                            type="submit"
                                            disabled={isLoading || !clientName.trim() || !clientLogin.trim() || !clientPassword.trim() || !confirmPassword.trim()}
                                            className="w-full bg-white text-black py-3 hover:bg-gray-100 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                                        >
                                            {isLoading ? 'Creating Account...' : 'Create Account'}
                                        </button>
                                    </form>
                                )}
                            </div>
                        )}

                        {/* Forgot Password Form */}
                        {clientFlow === 'forgot' && (
                            <div>
                                <button
                                    onClick={() => switchClientFlow('login')}
                                    className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-4"
                                    disabled={isLoading}
                                >
                                    <ArrowLeft className="w-4 h-4"/>
                                    Back to Login
                                </button>

                                {clientStep === 'phone' && (
                                    <form onSubmit={handleForgotPassword} className="space-y-4">
                                        <div>
                                            <label className="block text-sm font-light mb-2 text-gray-400">
                                                Phone Number
                                            </label>
                                            <div className="relative">
                                                <Phone
                                                    className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-600"/>
                                                <input
                                                    type="tel"
                                                    placeholder="+998 XX XXX XX XX"
                                                    required
                                                    className="w-full pl-12 pr-4 py-3 bg-black border border-gray-800 text-white placeholder-gray-600 focus:border-gray-700 focus:outline-none transition-colors"
                                                    value={phone}
                                                    onChange={e => setPhone(e.target.value)}
                                                    disabled={isLoading}
                                                />
                                            </div>
                                        </div>

                                        <button
                                            type="submit"
                                            disabled={isLoading || !phone.trim()}
                                            className="w-full bg-white text-black py-3 hover:bg-gray-100 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                                        >
                                            {isLoading ? 'Sending...' : 'Send Reset Code'}
                                        </button>
                                    </form>
                                )}

                                {clientStep === 'code' && (
                                    <form onSubmit={handleForgotPassword} className="space-y-4">
                                        <div>
                                            <label className="block text-sm font-light mb-2 text-gray-400">
                                                Reset Code
                                            </label>
                                            <div className="relative">
                                                <Lock
                                                    className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-600"/>
                                                <input
                                                    type="text"
                                                    placeholder="XXXX"
                                                    required
                                                    className="w-full pl-12 pr-4 py-3 bg-black border border-gray-800 text-white text-center text-2xl tracking-widest placeholder-gray-600 focus:border-gray-700 focus:outline-none transition-colors"
                                                    value={code}
                                                    onChange={e => setCode(e.target.value)}
                                                    maxLength="4"
                                                    disabled={isLoading}
                                                />
                                            </div>
                                        </div>

                                        <p className="text-sm text-gray-500 text-center">
                                            Reset code sent to {phone}
                                        </p>

                                        <button
                                            type="submit"
                                            disabled={isLoading || !code.trim()}
                                            className="w-full bg-white text-black py-3 hover:bg-gray-100 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                                        >
                                            {isLoading ? 'Verifying...' : 'Verify Code'}
                                        </button>
                                    </form>
                                )}

                                {clientStep === 'newPassword' && (
                                    <form onSubmit={handleForgotPassword} className="space-y-4">
                                        <div>
                                            <label className="block text-sm font-light mb-2 text-gray-400">
                                                New Password
                                            </label>
                                            <div className="relative">
                                                <Lock
                                                    className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-600"/>
                                                <input
                                                    type={showNewPassword ? "text" : "password"}
                                                    placeholder="Enter new password"
                                                    required
                                                    className="w-full pl-12 pr-12 py-3 bg-black border border-gray-800 text-white placeholder-gray-600 focus:border-gray-700 focus:outline-none transition-colors"
                                                    value={newPassword}
                                                    onChange={e => setNewPassword(e.target.value)}
                                                    disabled={isLoading}
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => setShowNewPassword(!showNewPassword)}
                                                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-600 hover:text-gray-400 transition-colors"
                                                    disabled={isLoading}
                                                >
                                                    {showNewPassword ? <EyeOff className="w-5 h-5"/> :
                                                        <Eye className="w-5 h-5"/>}
                                                </button>
                                            </div>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-light mb-2 text-gray-400">
                                                Confirm New Password
                                            </label>
                                            <div className="relative">
                                                <Lock
                                                    className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-600"/>
                                                <input
                                                    type={showConfirmPassword ? "text" : "password"}
                                                    placeholder="Confirm new password"
                                                    required
                                                    className="w-full pl-12 pr-12 py-3 bg-black border border-gray-800 text-white placeholder-gray-600 focus:border-gray-700 focus:outline-none transition-colors"
                                                    value={confirmPassword}
                                                    onChange={e => setConfirmPassword(e.target.value)}
                                                    disabled={isLoading}
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-600 hover:text-gray-400 transition-colors"
                                                    disabled={isLoading}
                                                >
                                                    {showConfirmPassword ? <EyeOff className="w-5 h-5"/> :
                                                        <Eye className="w-5 h-5"/>}
                                                </button>
                                            </div>
                                        </div>

                                        <button
                                            type="submit"
                                            disabled={isLoading || !newPassword.trim() || !confirmPassword.trim()}
                                            className="w-full bg-white text-black py-3 hover:bg-gray-100 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                                        >
                                            {isLoading ? 'Resetting...' : 'Reset Password'}
                                        </button>
                                    </form>
                                )}
                            </div>
                        )}
                    </div>
                )}

                {/* Master Login Form */}
                {userType === 'master' && (
                    <form onSubmit={handleMasterLogin} className="space-y-4">
                        <div>
                            <label className="block text-sm font-light mb-2 text-gray-400">
                                Login
                            </label>
                            <div className="relative">
                                <User
                                    className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-600"/>
                                <input
                                    type="text"
                                    placeholder="Enter your login"
                                    required
                                    className="w-full pl-12 pr-4 py-3 bg-black border border-gray-800 text-white placeholder-gray-600 focus:border-gray-700 focus:outline-none transition-colors"
                                    value={masterLogin}
                                    onChange={e => setMasterLogin(e.target.value)}
                                    disabled={isLoading}
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-light mb-2 text-gray-400">
                                Password
                            </label>
                            <div className="relative">
                                <Lock
                                    className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-600"/>
                                <input
                                    type={showMasterPassword ? "text" : "password"}
                                    placeholder="Enter your password"
                                    required
                                    className="w-full pl-12 pr-12 py-3 bg-black border border-gray-800 text-white placeholder-gray-600 focus:border-gray-700 focus:outline-none transition-colors"
                                    value={masterPassword}
                                    onChange={e => setMasterPassword(e.target.value)}
                                    disabled={isLoading}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowMasterPassword(!showMasterPassword)}
                                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-600 hover:text-gray-400 transition-colors"
                                    disabled={isLoading}
                                >
                                    {showMasterPassword ? <EyeOff className="w-5 h-5"/> : <Eye className="w-5 h-5"/>}
                                </button>
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading || !masterLogin.trim() || !masterPassword.trim()}
                            className="w-full bg-white text-black py-3 hover:bg-gray-100 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isLoading ? 'Logging in...' : 'Login'}
                        </button>
                    </form>
                )}

                {/* Quick warranty check */}
                <div className="mt-6 sm:mt-8 pt-6 sm:pt-8 border-t border-gray-800">
                    <p className="text-center text-gray-500 mb-4 text-sm">
                        {t('account.login.orCheckWarranty')}
                    </p>
                    <button
                        onClick={() => window.location.href = '/account/warranty'}
                        className="w-full border border-gray-700 text-gray-300 py-3 hover:bg-gray-900 hover:text-white transition-all"
                        disabled={isLoading}
                    >
                        {t('account.login.checkWarranty')}
                    </button>
                </div>
            </motion.div>
        </div>
    )
}