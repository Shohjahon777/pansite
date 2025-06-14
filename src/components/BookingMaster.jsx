// import {useState, useRef, useEffect} from 'react'
// import {motion, AnimatePresence} from 'framer-motion'
// import {useRouter} from 'next/router'
// import {
//     X,
//     Calendar,
//     Clock,
//     Search,
//     ChevronLeft,
//     ChevronRight,
//     User,
//     Star,
//     Award,
//     MapPin
// } from 'lucide-react'
// import Button from './Button'
// import Input from './Input'
//
// export default function BookingModal({isOpen, onClose, master}) {
//     const router = useRouter()
//     const [formData, setFormData] = useState({
//         name: '',
//         phone: '',
//         model: '',
//         date: '',
//         time: '',
//         notes: ''
//     })
//
//     const [modelQuery, setModelQuery] = useState('')
//     const [showModelDropdown, setShowModelDropdown] = useState(false)
//     const [showDatePicker, setShowDatePicker] = useState(false)
//     const [currentMonth, setCurrentMonth] = useState(new Date())
//     const [isSubmitting, setIsSubmitting] = useState(false)
//
//     const modelInputRef = useRef(null)
//     const dateInputRef = useRef(null)
//
//     // Check authentication
//     useEffect(() => {
//         if (isOpen) {
//             const authToken = localStorage.getItem('authToken')
//             if (!authToken) {
//                 alert('Please log in to book a service')
//                 onClose()
//                 router.push('/account')
//                 return
//             }
//         }
//     }, [isOpen, router, onClose])
//
//     const carModels = [
//         'Toyota Camry', 'Honda Civic', 'BMW 3 Series', 'Mercedes-Benz C-Class',
//         'Audi A4', 'Volkswagen Jetta', 'Nissan Altima', 'Hyundai Elantra',
//         'Ford Focus', 'Chevrolet Malibu', 'Mazda3', 'Subaru Impreza',
//         'Lexus ES', 'Acura TLX', 'Infiniti Q50', 'Genesis G70',
//         'Volvo S60', 'Cadillac CT4', 'Lincoln MKZ', 'Jaguar XE'
//     ]
//
//     const filteredModels = carModels.filter(model =>
//         model.toLowerCase().includes(modelQuery.toLowerCase())
//     )
//
//     const timeSlots = [
//         '09:00', '10:00', '11:00', '12:00', '13:00',
//         '14:00', '15:00', '16:00', '17:00', '18:00'
//     ]
//
//     const monthNames = [
//         'January', 'February', 'March', 'April', 'May', 'June',
//         'July', 'August', 'September', 'October', 'November', 'December'
//     ]
//
//     const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
//
//     const handleModelSelect = (model) => {
//         setFormData(prev => ({...prev, model}))
//         setModelQuery(model)
//         setShowModelDropdown(false)
//     }
//
//     const formatDisplayDate = (date) => {
//         return date.toLocaleDateString('en-US', {
//             weekday: 'short',
//             day: 'numeric',
//             month: 'short',
//             year: 'numeric'
//         })
//     }
//
//     const getDaysInMonth = (date) => {
//         const year = date.getFullYear()
//         const month = date.getMonth()
//         const firstDay = new Date(year, month, 1)
//         const lastDay = new Date(year, month + 1, 0)
//         const daysInMonth = lastDay.getDate()
//         const startingDayOfWeek = firstDay.getDay()
//
//         const days = []
//         for (let i = 0; i < startingDayOfWeek; i++) {
//             days.push(null)
//         }
//         for (let day = 1; day <= daysInMonth; day++) {
//             days.push(new Date(year, month, day))
//         }
//         return days
//     }
//
//     const isDateDisabled = (date) => {
//         const today = new Date()
//         today.setHours(0, 0, 0, 0)
//         return date < today
//     }
//
//     // const isDateSelected = (date) => {
//         if (!formData.date || !date) return false
//         const selected = new Date(formData.date)
//         return date.toDateString() === selected.toDateString()
//     }
//
//     const handleDateSelect = (date) => {
//         if (isDateDisabled(date)) return
//         setFormData(prev => ({...prev, date: date.toISOString().split('T')[0]}))
//         setShowDatePicker(false)
//     }
//
//     const navigateMonth = (direction) => {
//         setCurrentMonth(prev => {
//             const newMonth = new Date(prev)
//             newMonth.setMonth(prev.getMonth() + direction)
//             return newMonth
//         })
//     }
//
//     const handleSubmit = async (e) => {
//         e.preventDefault()
//         if (!master) return
//
//         setIsSubmitting(true)
//
//         try {
//             // Simulate API call
//             await new Promise(resolve => setTimeout(resolve, 2000))
//
//             alert('Booking request sent successfully!')
//             onClose()
//             setFormData({
//                 name: '',
//                 phone: '',
//                 model: '',
//                 date: '',
//                 time: '',
//                 notes: ''
//             })
//         } catch (error) {
//             alert('Failed to send booking request. Please try again.')
//         } finally {
//             setIsSubmitting(false)
//         }
//     }
//
//     // Click outside handlers
//     useEffect(() => {
//         const handleClickOutside = (event) => {
//             if (modelInputRef.current && !modelInputRef.current.contains(event.target)) {
//                 setShowModelDropdown(false)
//             }
//             if (dateInputRef.current && !dateInputRef.current.contains(event.target)) {
//                 setShowDatePicker(false)
//             }
//         }
//
//         document.addEventListener('mousedown', handleClickOutside)
//         return () => document.removeEventListener('mousedown', handleClickOutside)
//     }, [])
//
//     if (!master) return null
//
//     return (
//         <AnimatePresence>
//             {isOpen && (
//                 <motion.div
//                     initial={{opacity: 0}}
//                     animate={{opacity: 1}}
//                     exit={{opacity: 0}}
//                     className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50"
//                     onClick={onClose}
//                 >
//                     <motion.div
//                         initial={{scale: 0.95, opacity: 0}}
//                         animate={{scale: 1, opacity: 1}}
//                         exit={{scale: 0.95, opacity: 0}}
//                         className="bg-gray-800 border border-gray-700 rounded-lg p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
//                         onClick={e => e.stopPropagation()}
//                     >
//                         {/* Header */}
//                         <div className="flex justify-between items-start mb-6">
//                             <div className="flex gap-4">
//                                 <div className="w-16 h-16 bg-gray-700 rounded-lg flex items-center justify-center">
//                                     {master.avatar ? (
//                                         <img
//                                             src={master.avatar}
//                                             alt={master.name}
//                                             className="w-full h-full object-cover rounded-lg"
//                                         />
//                                     ) : (
//                                         <User className="w-8 h-8 text-gray-400"/>
//                                     )}
//                                 </div>
//                                 <div>
//                                     <h2 className="text-2xl font-semibold text-white mb-1">
//                                         Book Service
//                                     </h2>
//                                     <p className="text-gray-400 text-sm mb-2">
//                                         with {master.name}
//                                     </p>
//                                     <div className="flex items-center gap-4 text-sm text-gray-400">
//                                         <div className="flex items-center gap-1">
//                                             <Star className="w-4 h-4 text-yellow-500 fill-current"/>
//                                             <span>{master.rating}</span>
//                                             <span>({master.reviewsCount})</span>
//                                         </div>
//                                         <div className="flex items-center gap-1">
//                                             <Award className="w-4 h-4"/>
//                                             <span>{master.installations} installs</span>
//                                         </div>
//                                         <div className="flex items-center gap-1">
//                                             <MapPin className="w-4 h-4"/>
//                                             <span>{master.region}</span>
//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>
//                             <Button
//                                 variant="ghost"
//                                 size="sm"
//                                 onClick={onClose}
//                                 className="text-gray-400 hover:text-white"
//                             >
//                                 <X className="w-5 h-5"/>
//                             </Button>
//                         </div>
//
//                         {/* Form */}
//                         <form onSubmit={handleSubmit} className="space-y-4">
//                             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                                 <div>
//                                     <label className="block text-sm font-medium text-white mb-2">
//                                         Full Name *
//                                     </label>
//                                     <Input
//                                         type="text"
//                                         placeholder="Your full name"
//                                         value={formData.name}
//                                         onChange={(e) => setFormData(prev => ({...prev, name: e.target.value}))}
//                                         required
//                                     />
//                                 </div>
//
//                                 <div>
//                                     <label className="block text-sm font-medium text-white mb-2">
//                                         Phone Number *
//                                     </label>
//                                     <Input
//                                         type="tel"
//                                         placeholder="+998 90 123 45 67"
//                                         value={formData.phone}
//                                         onChange={(e) => setFormData(prev => ({...prev, phone: e.target.value}))}
//                                         required
//                                     />
//                                 </div>
//                             </div>
//
//                             {/* Enhanced Model Selection */}
//                             <div>
//                                 <label className="block text-sm font-medium text-white mb-2">
//                                     Car Model *
//                                 </label>
//                                 <div className="relative" ref={modelInputRef}>
//                                     <div className="relative">
//                                         <Input
//                                             type="text"
//                                             placeholder="Search for your car model"
//                                             value={modelQuery}
//                                             onChange={(e) => {
//                                                 setModelQuery(e.target.value)
//                                                 setShowModelDropdown(true)
//                                             }}
//                                             onFocus={() => setShowModelDropdown(true)}
//                                             required
//                                         />
//                                         <Search
//                                             className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400"/>
//                                     </div>
//
//                                     <AnimatePresence>
//                                         {showModelDropdown && filteredModels.length > 0 && (
//                                             <motion.div
//                                                 initial={{opacity: 0, y: -10}}
//                                                 animate={{opacity: 1, y: 0}}
//                                                 exit={{opacity: 0, y: -10}}
//                                                 className="absolute top-full left-0 right-0 mt-1 bg-gray-800 border border-gray-600 rounded-md shadow-lg max-h-48 overflow-y-auto z-10"
//                                             >
//                                                 {filteredModels.map((model, index) => (
//                                                     <button
//                                                         key={index}
//                                                         type="button"
//                                                         className="w-full px-4 py-3 text-left text-white hover:bg-gray-700 transition-colors border-b border-gray-600 last:border-b-0"
//                                                         onClick={() => handleModelSelect(model)}
//                                                     >
//                                                         {model}
//                                                     </button>
//                                                 ))}
//                                             </motion.div>
//                                         )}
//                                     </AnimatePresence>
//                                 </div>
//                             </div>
//
//                             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                                 {/* Enhanced Date Selection */}
//                                 <div>
//                                     <label className="block text-sm font-medium text-white mb-2">
//                                         Preferred Date *
//                                     </label>
//                                     <div className="relative" ref={dateInputRef}>
//                                         <Input
//                                             type="text"
//                                             placeholder="Select date"
//                                             value={formData.date ? formatDisplayDate(new Date(formData.date)) : ''}
//                                             onClick={() => setShowDatePicker(true)}
//                                             readOnly
//                                             required
//                                             className="cursor-pointer"
//                                         />
//                                         <Calendar
//                                             className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400"/>
//
//                                         <AnimatePresence>
//                                             {showDatePicker && (
//                                                 <motion.div
//                                                     initial={{opacity: 0, y: -10}}
//                                                     animate={{opacity: 1, y: 0}}
//                                                     exit={{opacity: 0, y: -10}}
//                                                     className="absolute top-full left-0 right-0 mt-1 bg-gray-800 border border-gray-600 rounded-md shadow-lg p-4 z-20"
//                                                 >
//                                                     <div className="flex justify-between items-center mb-4">
//                                                         <Button
//                                                             type="button"
//                                                             variant="ghost"
//                                                             size="sm"
//                                                             onClick={() => navigateMonth(-1)}
//                                                         >
//                                                             <ChevronLeft className="w-4 h-4"/>
//                                                         </Button>
//                                                         <h3 className="font-medium text-white">
//                                                             {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
//                                                         </h3>
//                                                         <Button
//                                                             type="button"
//                                                             variant="ghost"
//                                                             size="sm"
//                                                             onClick={() => navigateMonth(1)}
//                                                         >
//                                                             <ChevronRight className="w-4 h-4"/>
//                                                         </Button>
//                                                     </div>
//
//                                                     <div className="grid grid-cols-7 gap-1 mb-2">
//                                                         {dayNames.map(day => (
//                                                             <div key={day}
//                                                                  className="text-center text-xs text-gray-400 py-2">
//                                                                 {day}
//                                                             </div>
//                                                         ))}
//                                                     </div>
//
//                                                     <div className="grid grid-cols-7 gap-1">
//                                                         {getDaysInMonth(currentMonth).map((date, index) => (
//                                                             <Button
//                                                                 key={index}
//                                                                 type="button"
//                                                                 variant={date && isDateSelected(date) ? "default" : "ghost"}
//                                                                 size="sm"
//                                                                 className={`h-8 p-0 text-sm ${!date ? 'invisible' : ''} ${
//                                                                     date && isDateDisabled(date) ? 'opacity-50 cursor-not-allowed' : ''
//                                                                 }`}
//                                                                 onClick={() => date && handleDateSelect(date)}
//                                                                 disabled={date && isDateDisabled(date)}
//                                                             >
//                                                                 {date ? date.getDate() : ''}
//                                                             </Button>
//                                                         ))}
//                                                     </div>
//                                                 </motion.div>
//                                             )}
//                                         </AnimatePresence>
//                                     </div>
//                                 </div>
//
//                                 {/* Time Selection */}
//                                 <div>
//                                     <label className="block text-sm font-medium text-white mb-2">
//                                         Preferred Time *
//                                     </label>
//                                     <select
//                                         className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                                         value={formData.time}
//                                         onChange={(e) => setFormData(prev => ({...prev, time: e.target.value}))}
//                                         required
//                                     >
//                                         <option value="">Select time</option>
//                                         {timeSlots.map((time) => (
//                                             <option key={time} value={time}>
//                                                 {time}
//                                             </option>
//                                         ))}
//                                     </select>
//                                 </div>
//                             </div>
//
//                             {/* Additional Notes */}
//                             <div>
//                                 <label className="block text-sm font-medium text-white mb-2">
//                                     Additional Notes
//                                 </label>
//                                 <textarea
//                                     className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
//                                     rows={3}
//                                     placeholder="Any specific requirements or notes..."
//                                     value={formData.notes}
//                                     onChange={(e) => setFormData(prev => ({...prev, notes: e.target.value}))}
//                                 />
//                             </div>
//
//                             {/* Master's Schedule Info */}
//                             <div className="bg-gray-800/50 rounded-lg p-4">
//                                 <div className="flex items-center gap-2 mb-2">
//                                     <Clock className="w-4 h-4 text-gray-400"/>
//                                     <span className="font-medium text-sm text-white">Master's Schedule</span>
//                                 </div>
//                                 <div className="text-xs text-gray-400 space-y-1">
//                                     {master.schedule.map((schedule, index) => (
//                                         <div key={index}>{schedule}</div>
//                                     ))}
//                                 </div>
//                                 <div className="mt-2 text-xs text-gray-400">
//                                     Response time: <span className="font-medium">{master.responseTime}</span>
//                                 </div>
//                             </div>
//
//                             {/* Submit Button */}
//                             <div className="flex gap-3 pt-4">
//                                 <Button
//                                     type="button"
//                                     variant="outline"
//                                     className="flex-1"
//                                     onClick={onClose}
//                                     disabled={isSubmitting}
//                                 >
//                                     Cancel
//                                 </Button>
//                                 <Button
//                                     type="submit"
//                                     className="flex-1"
//                                     disabled={isSubmitting || !formData.name || !formData.phone || !formData.model || !formData.date || !formData.time}
//                                 >
//                                     {isSubmitting ? (
//                                         <div className="flex items-center gap-2">
//                                             <div
//                                                 className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin"/>
//                                             Booking...
//                                         </div>
//                                     ) : (
//                                         'Book Service'
//                                     )}
//                                 </Button>
//                             </div>
//                         </form>
//                     </motion.div>
//                 </motion.div>
//             )}
//         </AnimatePresence>
//     )
// }