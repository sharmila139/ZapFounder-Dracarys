'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Star, ShoppingCart, Eye, Heart } from 'lucide-react'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'

export default function ProductsPage() {
  const [selectedCategory, setSelectedCategory] = useState('all')

  const categories = [
    { id: 'all', name: 'All Products' },
    { id: 'ai', name: 'AI Solutions' },
    { id: 'web', name: 'Web Development' },
    { id: 'mobile', name: 'Mobile Apps' },
    { id: 'consulting', name: 'Consulting' },
  ]

  const products = [
    {
      id: 1,
      name: 'AI Chat Assistant',
      category: 'ai',
      description: 'Advanced conversational AI that understands context and provides intelligent responses.',
      price: 299,
      rating: 4.8,
      reviews: 124,
      image: '/api/placeholder/300/200',
      features: ['Natural Language Processing', 'Multi-language Support', '24/7 Availability', 'Customizable Responses']
    },
    {
      id: 2,
      name: 'Smart Analytics Dashboard',
      category: 'ai',
      description: 'Real-time data visualization and predictive analytics for business intelligence.',
      price: 499,
      rating: 4.9,
      reviews: 89,
      image: '/api/placeholder/300/200',
      features: ['Real-time Data', 'Predictive Analytics', 'Custom Reports', 'API Integration']
    },
    {
      id: 3,
      name: 'E-commerce Platform',
      category: 'web',
      description: 'Complete online store solution with payment processing and inventory management.',
      price: 799,
      rating: 4.7,
      reviews: 156,
      image: '/api/placeholder/300/200',
      features: ['Payment Processing', 'Inventory Management', 'Order Tracking', 'Mobile Responsive']
    },
    {
      id: 4,
      name: 'Mobile App Development',
      category: 'mobile',
      description: 'Cross-platform mobile applications for iOS and Android with native performance.',
      price: 1299,
      rating: 4.9,
      reviews: 67,
      image: '/api/placeholder/300/200',
      features: ['Cross-platform', 'Native Performance', 'Push Notifications', 'Offline Support']
    },
    {
      id: 5,
      name: 'Digital Transformation Consulting',
      category: 'consulting',
      description: 'Strategic guidance for modernizing your business with cutting-edge technology.',
      price: 2500,
      rating: 5.0,
      reviews: 34,
      image: '/api/placeholder/300/200',
      features: ['Strategy Planning', 'Technology Assessment', 'Implementation Support', 'Training']
    },
    {
      id: 6,
      name: 'API Integration Service',
      category: 'web',
      description: 'Seamless integration of third-party services and APIs into your existing systems.',
      price: 399,
      rating: 4.6,
      reviews: 78,
      image: '/api/placeholder/300/200',
      features: ['RESTful APIs', 'Webhook Support', 'Documentation', 'Testing Suite']
    }
  ]

  const filteredProducts = selectedCategory === 'all' 
    ? products 
    : products.filter(product => product.category === selectedCategory)

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
            <h1 className="text-5xl font-bold mb-6">Our Products & Services</h1>
            <p className="text-xl max-w-3xl mx-auto">
              Discover our comprehensive suite of AI-powered solutions and professional services 
              designed to transform your business.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-8 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-6 py-2 rounded-full font-medium transition-colors duration-200 ${
                  selectedCategory === category.id
                    ? 'bg-primary-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {filteredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className="card hover:shadow-xl transition-shadow duration-300"
              >
                {/* Product Image */}
                <div className="w-full h-48 bg-gradient-to-br from-primary-100 to-secondary-100 rounded-lg mb-4 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-secondary-600 rounded-lg mx-auto mb-2 flex items-center justify-center text-white text-2xl font-bold">
                      {product.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <p className="text-gray-600 text-sm">Product Image</p>
                  </div>
                </div>

                {/* Product Info */}
                <div className="space-y-4">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{product.name}</h3>
                    <p className="text-gray-600 text-sm mb-3">{product.description}</p>
                  </div>

                  {/* Rating */}
                  <div className="flex items-center space-x-2">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < Math.floor(product.rating)
                              ? 'text-yellow-400 fill-current'
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-gray-600">
                      {product.rating} ({product.reviews} reviews)
                    </span>
                  </div>

                  {/* Price */}
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-primary-600">
                      ${product.price}
                    </span>
                    <div className="flex space-x-2">
                      <button className="p-2 text-gray-400 hover:text-red-500 transition-colors duration-200">
                        <Heart className="w-5 h-5" />
                      </button>
                      <button className="p-2 text-gray-400 hover:text-blue-500 transition-colors duration-200">
                        <Eye className="w-5 h-5" />
                      </button>
                    </div>
                  </div>

                  {/* Features */}
                  <div className="space-y-2">
                    <h4 className="font-medium text-gray-900">Key Features:</h4>
                    <ul className="space-y-1">
                      {product.features.slice(0, 3).map((feature, i) => (
                        <li key={i} className="text-sm text-gray-600 flex items-center">
                          <div className="w-2 h-2 bg-primary-500 rounded-full mr-2"></div>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex space-x-3 pt-4">
                    <button className="flex-1 btn-primary flex items-center justify-center space-x-2">
                      <ShoppingCart className="w-4 h-4" />
                      <span>Get Started</span>
                    </button>
                    <button className="btn-outline px-4">
                      Details
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {filteredProducts.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <p className="text-gray-600 text-lg">No products found in this category.</p>
            </motion.div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Need a Custom Solution?
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              We specialize in creating tailored solutions that perfectly fit your business needs. 
              Let's discuss your requirements and build something amazing together.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="btn-primary">
                Schedule a Consultation
              </button>
              <button className="btn-outline">
                View Case Studies
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  )
} 