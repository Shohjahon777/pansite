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
  ArrowRight
} from 'lucide-react'
import { useTranslation } from '../../hooks/useTranslation'
import { advantagesLocales } from './advantagesLocales'

export default function AdvantagesPage() {
  const { t } = useTranslation(advantagesLocales)
  
  const technologies = [
    {
      icon: Shield,
      title: t('advantages.technologies.dialogCode.title'),
      description: t('advantages.technologies.dialogCode.description'),
      details: [
        t('advantages.technologies.dialogCode.details.protection'),
        t('advantages.technologies.dialogCode.details.clone'),
        t('advantages.technologies.dialogCode.details.dynamic'),
        t('advantages.technologies.dialogCode.details.encryption')
      ]
    },
    {
      icon: Radio,
      title: t('advantages.technologies.range.title'),
      description: t('advantages.technologies.range.description'),
      details: [
        t('advantages.technologies.range.details.module'),
        t('advantages.technologies.range.details.antenna'),
        t('advantages.technologies.range.details.power'),
        t('advantages.technologies.range.details.channel')
      ]
    },
    {
      icon: Thermometer,
      title: t('advantages.technologies.climate.title'),
      description: t('advantages.technologies.climate.description'),
      details: [
        t('advantages.technologies.climate.details.engineTemp'),
        t('advantages.technologies.climate.details.schedule'),
        t('advantages.technologies.climate.details.cabinTemp'),
        t('advantages.technologies.climate.details.turbo')
      ]
    },
    {
      icon: Smartphone,
      title: t('advantages.technologies.mobile.title'),
      description: t('advantages.technologies.mobile.description'),
      details: [
        t('advantages.technologies.mobile.details.notifications'),
        t('advantages.technologies.mobile.details.history'),
        t('advantages.technologies.mobile.details.gps'),
        t('advantages.technologies.mobile.details.diagnostics')
      ]
    },
    {
      icon: ShieldCheck,
      title: t('advantages.technologies.protection.title'),
      description: t('advantages.technologies.protection.description'),
      details: [
        t('advantages.technologies.protection.details.zones'),
        t('advantages.technologies.protection.details.scanning'),
        t('advantages.technologies.protection.details.blocking'),
        t('advantages.technologies.protection.details.siren')
      ]
    },
    {
      icon: Cpu,
      title: t('advantages.technologies.integration.title'),
      description: t('advantages.technologies.integration.description'),
      details: [
        t('advantages.technologies.integration.details.can'),
        t('advantages.technologies.integration.details.warranty'),
        t('advantages.technologies.integration.details.immobilizer'),
        t('advantages.technologies.integration.details.control')
      ]
    }
  ]
  
  const comparisonData = [
    { feature: t('advantages.comparison.range'), pandora: t('advantages.comparison.pandoraRange'), others: t('advantages.comparison.othersRange') },
    { feature: t('advantages.comparison.protection'), pandora: t('advantages.comparison.dialogCode'), others: t('advantages.comparison.staticCode') },
    { feature: t('advantages.comparison.mobile'), pandora: true, others: false },
    { feature: t('advantages.comparison.autostart'), pandora: true, others: true },
    { feature: t('advantages.comparison.warranty'), pandora: t('advantages.comparison.warranty2'), others: t('advantages.comparison.warranty1') },
    { feature: t('advantages.comparison.support'), pandora: true, others: false }
  ]
  
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
        
        {/* Technologies Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {technologies.map((tech, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-gray-950 border border-gray-800 p-8 hover:border-gray-700 transition-all group"
            >
              <tech.icon className="w-12 h-12 text-gray-700 mb-6 group-hover:text-gray-500 transition-colors" strokeWidth={1} />
              <h3 className="text-xl font-light text-white mb-3">{tech.title}</h3>
              <p className="text-gray-500 mb-6 text-sm">{tech.description}</p>
              <ul className="space-y-2">
                {tech.details.map((detail, j) => (
                  <li key={j} className="flex items-start text-sm">
                    <span className="text-gray-600 mr-2 mt-1">•</span>
                    <span className="text-gray-400 font-light">{detail}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
        
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