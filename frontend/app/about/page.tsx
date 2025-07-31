'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Users, Target, Award, Globe } from 'lucide-react'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'

export default function AboutPage() {
  const stats = [
    { icon: <Users className="w-8 h-8" />, number: '10K+', label: 'Happy Users' },
    { icon: <Target className="w-8 h-8" />, number: '99%', label: 'Success Rate' },
    { icon: <Award className="w-8 h-8" />, number: '50+', label: 'Awards Won' },
    { icon: <Globe className="w-8 h-8" />, number: '25+', label: 'Countries' },
  ]

  const team = [
    {
      name: 'John Doe',
      role: 'CEO & Founder',
      image: '/api/placeholder/150/150',
      bio: 'Visionary leader with 15+ years in tech industry.'
    },
    {
      name: 'Jane Smith',
      role: 'CTO',
      image: '/api/placeholder/150/150',
      bio: 'Expert in AI and machine learning technologies.'
    },
    {
      name: 'Mike Johnson',
      role: 'Lead Developer',
      image: '/api/placeholder/150/150',
      bio: 'Full-stack developer passionate about clean code.'
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-500 to-secondary-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-5xl font-bold mb-6">About Dracarys</h1>
            <p className="text-xl max-w-3xl mx-auto">
              We're on a mission to revolutionize the way people interact with AI technology, 
              making it accessible, powerful, and user-friendly for everyone.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Our Mission</h2>
              <p className="text-lg text-gray-600 mb-6">
                At Dracarys, we believe that artificial intelligence should be accessible to everyone. 
                Our platform combines cutting-edge AI technology with intuitive design to create 
                powerful tools that enhance productivity and creativity.
              </p>
              <p className="text-lg text-gray-600">
                We're committed to building a future where AI works seamlessly with human intelligence, 
                empowering individuals and organizations to achieve more than ever before.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="bg-gradient-to-br from-primary-100 to-secondary-100 rounded-2xl p-8"
            >
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Values</h3>
              <ul className="space-y-4">
                <li className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-primary-500 rounded-full flex-shrink-0 mt-1"></div>
                  <span className="text-gray-700">Innovation at the core of everything we do</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-primary-500 rounded-full flex-shrink-0 mt-1"></div>
                  <span className="text-gray-700">User experience as our top priority</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-primary-500 rounded-full flex-shrink-0 mt-1"></div>
                  <span className="text-gray-700">Security and privacy by design</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-primary-500 rounded-full flex-shrink-0 mt-1"></div>
                  <span className="text-gray-700">Continuous learning and improvement</span>
                </li>
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Impact</h2>
            <p className="text-xl text-gray-600">
              Numbers that tell our story of growth and success
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-secondary-600 rounded-full flex items-center justify-center text-white mx-auto mb-4">
                  {stat.icon}
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">{stat.number}</div>
                <div className="text-gray-600">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Meet Our Team</h2>
            <p className="text-xl text-gray-600">
              The passionate individuals behind Dracarys
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className="card text-center"
              >
                <div className="w-24 h-24 bg-gradient-to-br from-primary-500 to-secondary-600 rounded-full mx-auto mb-4 flex items-center justify-center text-white text-2xl font-bold">
                  {member.name.split(' ').map(n => n[0]).join('')}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{member.name}</h3>
                <p className="text-primary-600 font-medium mb-3">{member.role}</p>
                <p className="text-gray-600">{member.bio}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
} 