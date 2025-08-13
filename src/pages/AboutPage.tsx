import React from 'react'
import { CheckCircle, Award, Users, Clock } from 'lucide-react'
import { motion } from 'framer-motion'
import { SEOHead } from '../components/SEOHead'
import { useThemeContext } from '../hooks/useThemeContext'

export const AboutPage: React.FC = () => {
  const { isDark } = useThemeContext()
  
  const stats = [
    { icon: Users, value: '50+', label: 'Clients satisfaits' },
    { icon: Award, value: '100+', label: 'Projets réalisés' },
    { icon: Clock, value: '5+', label: 'Années d\'expérience' },
    { icon: CheckCircle, value: '99%', label: 'Taux de satisfaction' },
  ]

  const expertise = [
    {
      category: 'Frontend',
      skills: ['React & Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'Vue.js']
    },
    {
      category: 'Backend',
      skills: ['Node.js & Express', 'Python & Django', 'PostgreSQL', 'MongoDB', 'API REST']
    },
    {
      category: 'Mobile',
      skills: ['React Native', 'Progressive Web Apps', 'Expo', 'App Store Deployment']
    },
    {
      category: 'DevOps',
      skills: ['Docker', 'CI/CD', 'AWS & Vercel', 'Monitoring', 'Performance']
    }
  ]

  return (
    <>
      <SEOHead
        title="À propos"
        description="Découvrez DevWeb31, votre partenaire pour le développement web et d'applications. Expertise technique, accompagnement personnalisé et solutions sur mesure."
        keywords="développement web, expertise, React, Node.js, applications mobiles, Toulouse"
        canonical="https://devweb31.fr/about"
      />
      
      <div className="pt-16">
        {/* Hero Section */}
        <section className={`py-20 ${isDark ? 'bg-gradient-to-br from-gray-900 to-gray-800' : 'bg-gradient-to-br from-blue-50 to-white'}`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className={`text-4xl sm:text-5xl font-bold mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}
              >
                Votre partenaire digital de confiance
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className={`text-xl leading-relaxed ${isDark ? 'text-gray-300' : 'text-gray-600'}`}
              >
                Chez DevWeb31, nous combinons passion pour la technologie et 
                expertise technique pour créer des solutions digitales qui 
                transforment votre entreprise et engagent vos utilisateurs.
              </motion.p>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className={`py-16 ${isDark ? 'bg-gray-800 border-y border-gray-700' : 'bg-white border-y border-gray-100'}`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className="text-center"
                >
                  <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${isDark ? 'bg-blue-900' : 'bg-blue-100'}`}>
                    <stat.icon className={`h-8 w-8 ${isDark ? 'text-blue-400' : 'text-blue-600'}`} />
                  </div>
                  <div className={`text-3xl font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    {stat.value}
                  </div>
                  <div className={isDark ? 'text-gray-300' : 'text-gray-600'}>
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* About Content */}
        <section className={`py-20 ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
              >
                <h2 className={`text-3xl font-bold mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  Notre Mission
                </h2>
                <div className={`space-y-6 leading-relaxed ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                  <p>
                    Fondé sur l'innovation et l'excellence technique, DevWeb31 
                    accompagne les entreprises dans leur transformation digitale. 
                    Nous créons des solutions sur mesure qui répondent précisément 
                    aux besoins de nos clients.
                  </p>
                  <p>
                    Notre approche combine les dernières technologies avec une 
                    méthodologie éprouvée pour livrer des projets performants, 
                    évolutifs et maintenables. Nous privilégions la qualité, 
                    la sécurité et l'expérience utilisateur dans chaque réalisation.
                  </p>
                  <p>
                    Basés à Toulouse, nous intervenons partout en France et 
                    accompagnons des entreprises de toutes tailles, des startups 
                    aux grands groupes, dans la réalisation de leurs ambitions digitales.
                  </p>
                </div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                className={`p-8 rounded-2xl shadow-lg ${isDark ? 'bg-gray-800' : 'bg-white'}`}
              >
                <h3 className={`text-2xl font-bold mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  Nos Valeurs
                </h3>
                <div className="space-y-4">
                  {[
                    'Excellence technique et innovation continue',
                    'Accompagnement personnalisé et écoute client',
                    'Transparence et communication régulière',
                    'Respect des délais et budgets convenus',
                    'Solutions évolutives et maintenables',
                    'Formation et transfert de compétences'
                  ].map((value, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <CheckCircle className="h-6 w-6 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className={isDark ? 'text-gray-300' : 'text-gray-700'}>{value}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Expertise Section */}
        <section className={`py-20 ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className={`text-3xl sm:text-4xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                Notre Expertise Technique
              </h2>
              <p className={`text-xl max-w-3xl mx-auto ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                Maîtrise complète des technologies modernes pour créer 
                des solutions robustes et performantes
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {expertise.map((category, index) => (
                <motion.div
                  key={category.category}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`p-6 rounded-2xl ${isDark ? 'bg-gray-700' : 'bg-gray-50'}`}
                >
                  <h3 className={`text-lg font-semibold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    {category.category}
                  </h3>
                  <ul className="space-y-2">
                    {category.skills.map((skill) => (
                      <li key={skill} className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                        • {skill}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Process Section */}
        <section className="py-20 bg-gradient-to-r from-blue-600 to-green-500">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center text-white">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                className="text-3xl sm:text-4xl font-bold mb-6"
              >
                Notre Méthode de Travail
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-xl text-blue-100 max-w-3xl mx-auto mb-12"
              >
                Une approche structurée pour garantir le succès de votre projet
              </motion.p>
              
              <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                {[
                  {
                    step: '01',
                    title: 'Analyse',
                    description: 'Compréhension approfondie de vos besoins et objectifs'
                  },
                  {
                    step: '02',
                    title: 'Conception',
                    description: 'Design UX/UI et architecture technique optimisés'
                  },
                  {
                    step: '03',
                    title: 'Développement',
                    description: 'Réalisation agile avec tests et validation continue'
                  },
                  {
                    step: '04',
                    title: 'Livraison',
                    description: 'Déploiement, formation et maintenance'
                  }
                ].map((phase, index) => (
                  <motion.div
                    key={phase.step}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="text-center"
                  >
                    <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-2xl font-bold">{phase.step}</span>
                    </div>
                    <h3 className="text-xl font-semibold mb-2">{phase.title}</h3>
                    <p className="text-blue-100 text-sm">{phase.description}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}