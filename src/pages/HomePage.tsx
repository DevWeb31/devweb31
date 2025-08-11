import React from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, CheckCircle, Globe, Smartphone, ShoppingCart, Search, Zap, Shield } from 'lucide-react'
import { motion } from 'framer-motion'
import { SEOHead } from '../components/SEOHead'

export const HomePage: React.FC = () => {


  const services = [
    {
      icon: Globe,
      title: 'Développement Web',
      description: 'Sites web modernes, rapides et optimisés SEO pour votre présence en ligne.',
    },
    {
      icon: Smartphone,
      title: 'Applications Mobiles',
      description: 'Applications natives et progressive web apps pour iOS et Android.',
    },
    {
      icon: ShoppingCart,
      title: 'E-commerce',
      description: 'Boutiques en ligne performantes avec paiements sécurisés.',
    },
    {
      icon: Search,
      title: 'Optimisation SEO',
      description: 'Amélioration de votre visibilité sur les moteurs de recherche.',
    },
  ]

  const skills = [
    'React & Next.js',
    'Node.js & Express',
    'TypeScript',
    'Tailwind CSS',
    'Supabase & PostgreSQL',
    'API REST & GraphQL',
    'PWA & Performance',
    'SEO & Analytics',
  ]

  const projects = [
    {
      title: 'E-commerce Mode',
      description: 'Boutique en ligne avec gestion des stocks et paiements Stripe',
      tech: ['React', 'Node.js', 'PostgreSQL'],
      image: 'https://images.pexels.com/photos/230544/pexels-photo-230544.jpeg?auto=compress&cs=tinysrgb&w=800',
    },
    {
      title: 'App de Gestion',
      description: 'Application de gestion d\'entreprise avec tableau de bord',
      tech: ['Next.js', 'Supabase', 'TypeScript'],
      image: 'https://images.pexels.com/photos/265087/pexels-photo-265087.jpeg?auto=compress&cs=tinysrgb&w=800',
    },
    {
      title: 'Site Vitrine',
      description: 'Site corporate moderne avec CMS intégré',
      tech: ['React', 'Tailwind', 'Framer Motion'],
      image: 'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=800',
    },
  ]

  return (
    <>
      <SEOHead
        title="Accueil"
        description="DevWeb31 - Spécialiste en développement web et d'applications à Toulouse. Création de sites web modernes, applications mobiles et solutions e-commerce."
        keywords="développement web, application mobile, Toulouse, React, Next.js, e-commerce, SEO"
        canonical="https://devweb31.fr"
      />
      
      <div className="pt-16">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-blue-50 via-white to-green-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-20 lg:py-32">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-4xl sm:text-6xl font-bold text-gray-900 dark:text-white mb-6"
              >
                Développement Web{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-green-500">
                  Moderne
                </span>
              </motion.h1>
              
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed"
              >
                Nous créons des solutions digitales innovantes et performantes. 
                Sites web, applications mobiles et e-commerce sur mesure pour 
                faire évoluer votre entreprise dans l'ère numérique.
              </motion.p>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="flex flex-col sm:flex-row gap-4 justify-center items-center"
              >
                <Link
                  to="/contact"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-semibold flex items-center gap-2 transition-all transform hover:scale-105 shadow-lg hover:shadow-xl"
                >
                  Démarrer mon projet
                  <ArrowRight className="h-5 w-5" />
                </Link>
                
                <Link
                  to="/about"
                  className="bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-900 dark:text-white px-8 py-4 rounded-xl font-semibold border-2 border-gray-200 dark:border-gray-600 transition-all transform hover:scale-105"
                >
                  Découvrir notre expertise
                </Link>
              </motion.div>
            </div>
          </div>
          
          {/* Floating elements */}
          <div className="absolute top-20 left-10 animate-float">
            <div className="w-20 h-20 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
              <Zap className="h-10 w-10 text-blue-600 dark:text-blue-400" />
            </div>
          </div>
          
          <div className="absolute bottom-20 right-10 animate-float" style={{ animationDelay: '1s' }}>
            <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
              <Shield className="h-8 w-8 text-green-600 dark:text-green-400" />
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section id="services" className="py-20 bg-white dark:bg-gray-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                Nos Services
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                Des solutions complètes pour tous vos besoins digitaux
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {services.map((service, index) => (
                <motion.div
                  key={service.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white dark:bg-gray-800 p-8 rounded-2xl border border-gray-100 dark:border-gray-700 hover:border-blue-200 dark:hover:border-blue-600 shadow-sm hover:shadow-lg transition-all group"
                >
                  <div className="w-14 h-14 bg-blue-100 dark:bg-blue-900 rounded-xl flex items-center justify-center mb-6 group-hover:bg-blue-600 transition-colors">
                    <service.icon className="h-7 w-7 text-blue-600 dark:text-blue-400 group-hover:text-white transition-colors" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    {service.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Skills Section */}
        <section className="py-20 bg-gray-50 dark:bg-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                Technologies & Compétences
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                Maîtrise des dernières technologies pour des solutions performantes
              </p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {skills.map((skill, index) => (
                <motion.div
                  key={skill}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-200 dark:border-gray-700 text-center hover:border-blue-300 dark:hover:border-blue-600 hover:shadow-md transition-all"
                >
                  <div className="flex items-center justify-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <span className="font-medium text-gray-900 dark:text-white">{skill}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section className="py-20 bg-white dark:bg-gray-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                Projets Récents
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                Découvrez quelques-unes de nos réalisations
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {projects.map((project, index) => (
                <motion.div
                  key={project.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
                >
                  <div className="h-48 overflow-hidden">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                      {project.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-4">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {project.tech.map((tech) => (
                        <span
                          key={tech}
                          className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-sm rounded-full"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-blue-600 to-green-500">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-white"
            >
              <h2 className="text-3xl sm:text-4xl font-bold mb-6">
                Prêt à démarrer votre projet ?
              </h2>
              <p className="text-xl mb-8 text-blue-100 max-w-3xl mx-auto">
                Contactez-nous dès aujourd'hui pour discuter de vos besoins 
                et obtenir un devis personnalisé pour votre projet digital.
              </p>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 bg-white text-blue-600 px-8 py-4 rounded-xl font-semibold hover:bg-gray-100 transition-all transform hover:scale-105 shadow-lg"
              >
                Commencer maintenant
                <ArrowRight className="h-5 w-5" />
              </Link>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  )
}