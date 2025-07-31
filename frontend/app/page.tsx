'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Send, Sparkles, Zap, Shield, Users } from 'lucide-react'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'

export default function HomePage() {
  const [aiInput, setAiInput] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleAiSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!aiInput.trim()) return

    setIsSubmitting(true)
    try {
      // This would connect to your AI agent
      console.log('Sending to AI agent:', aiInput)
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000))
      alert('Input sent to AI agent successfully!')
      setAiInput('')
    } catch (error) {
      console.error('Error sending to AI:', error)
      alert('Error sending to AI agent')
    } finally {
      setIsSubmitting(false)
    }
  }

  const features = [
    {
      icon: <Sparkles className="w-8 h-8" />,
      title: 'AI-Powered',
      description: 'Advanced artificial intelligence integration for enhanced user experience.'
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: 'Lightning Fast',
      description: 'Optimized performance with modern technologies and best practices.'
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: 'Secure',
      description: 'Enterprise-grade security with authentication and data protection.'
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: 'User-Friendly',
      description: 'Intuitive design that works seamlessly across all devices.'
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary-500 to-secondary-600 text-white">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              Welcome to{' '}
              <span className="text-yellow-300">Dracarys</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
              Experience the future of AI-powered web applications with our cutting-edge platform.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white text-primary-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors duration-200"
            >
              Get Started
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* AI Input Section */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Connect with AI
            </h2>
            <p className="text-xl text-gray-600">
              Enter your input below and let our AI agent process your request
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="card max-w-2xl mx-auto"
          >
            <form onSubmit={handleAiSubmit} className="space-y-6">
              <div>
                <label htmlFor="ai-input" className="block text-sm font-medium text-gray-700 mb-2">
                  Describe what you need
                </label>
                <textarea
                  id="ai-input"
                  value={aiInput}
                  onChange={(e) => setAiInput(e.target.value)}
                  placeholder="Tell me what you're looking for..."
                  className="input-field h-32 resize-none"
                  required
                />
              </div>
              <button
                type="submit"
                disabled={isSubmitting || !aiInput.trim()}
                className="w-full btn-primary flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    <span>Processing...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    <span>Send to AI Agent</span>
                  </>
                )}
              </button>
            </form>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Why Choose Dracarys?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our platform combines cutting-edge technology with user-friendly design to deliver exceptional experiences.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className="card text-center hover:shadow-xl transition-shadow duration-300"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-secondary-600 rounded-full flex items-center justify-center text-white mx-auto mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
} 