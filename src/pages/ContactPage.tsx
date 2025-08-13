import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Mail, MapPin, Phone, Send, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { SEOHead } from '../components/SEOHead';
import { useThemeContext } from '../hooks/useThemeContext';

interface ContactFormData {
  name: string;
  email: string;
  company?: string;
  phone?: string;
  subject: string;
  message: string;
}

export const ContactPage: React.FC = () => {
  const { isDark } = useThemeContext();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>();

  const onSubmit = async (data: ContactFormData) => {
    // Here you would typically send the data to your backend
    console.log('Form data:', data);

    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1000));

    setIsSubmitted(true);
    reset();

    // Reset success message after 5 seconds
    setTimeout(() => setIsSubmitted(false), 5000);
  };

  const contactInfo = [
    {
      icon: Mail,
      title: 'Email',
      value: 'contact@devweb31.fr',
      href: 'mailto:contact@devweb31.fr',
    },
    {
      icon: Phone,
      title: 'Téléphone',
      value: '+33 (0)1 23 45 67 89',
      href: 'tel:+33123456789',
    },
    {
      icon: MapPin,
      title: 'Localisation',
      value: 'Toulouse, France',
      href: '#',
    },
  ];

  return (
    <>
      <SEOHead
        title='Contact'
        description="Contactez DevWeb31 pour votre projet de développement web ou d'application mobile. Devis gratuit et accompagnement personnalisé à Toulouse."
        keywords='contact, devis, développement web, Toulouse, consultation, projet web'
        canonical='https://devweb31.fr/contact'
      />

      <div className='pt-16'>
        {/* Hero Section */}
        <section
          className={`py-20 ${isDark ? 'bg-gradient-to-br from-gray-900 to-gray-800' : 'bg-gradient-to-br from-blue-50 to-white'}`}
        >
          <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
            <div className='max-w-3xl mx-auto text-center'>
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className={`text-4xl sm:text-5xl font-bold mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}
              >
                Discutons de votre projet
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className={`text-xl leading-relaxed ${isDark ? 'text-gray-300' : 'text-gray-600'}`}
              >
                Vous avez un projet de développement web ou d'application ?
                Contactez-nous pour un devis gratuit et personnalisé. Nous vous
                répondons sous 24h.
              </motion.p>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className={`py-20 ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
          <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
            <div className='grid grid-cols-1 lg:grid-cols-2 gap-16'>
              {/* Contact Information */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                className='space-y-8'
              >
                <div>
                  <h2
                    className={`text-3xl font-bold mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}
                  >
                    Nos Coordonnées
                  </h2>
                  <p
                    className={`leading-relaxed mb-8 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}
                  >
                    N'hésitez pas à nous contacter pour discuter de votre
                    projet. Nous sommes là pour vous accompagner dans la
                    concrétisation de vos idées digitales.
                  </p>
                </div>

                <div className='space-y-6'>
                  {contactInfo.map(info => (
                    <div
                      key={info.title}
                      className='flex items-center space-x-4'
                    >
                      <div
                        className={`w-12 h-12 rounded-full flex items-center justify-center ${isDark ? 'bg-blue-900' : 'bg-blue-100'}`}
                      >
                        <info.icon
                          className={`h-6 w-6 ${isDark ? 'text-blue-400' : 'text-blue-600'}`}
                        />
                      </div>
                      <div>
                        <h3
                          className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}
                        >
                          {info.title}
                        </h3>
                        {info.href.startsWith('#') ? (
                          <p
                            className={
                              isDark ? 'text-gray-300' : 'text-gray-600'
                            }
                          >
                            {info.value}
                          </p>
                        ) : (
                          <a
                            href={info.href}
                            className='text-blue-600 hover:text-blue-700 transition-colors'
                          >
                            {info.value}
                          </a>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                <div
                  className={`p-6 rounded-2xl ${isDark ? 'bg-gray-700' : 'bg-gray-50'}`}
                >
                  <h3
                    className={`font-semibold mb-3 ${isDark ? 'text-white' : 'text-gray-900'}`}
                  >
                    Horaires d'ouverture
                  </h3>
                  <div
                    className={`space-y-2 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}
                  >
                    <p>Lundi - Vendredi : 9h00 - 18h00</p>
                    <p>Samedi : 9h00 - 12h00</p>
                    <p>Dimanche : Fermé</p>
                  </div>
                </div>
              </motion.div>

              {/* Contact Form */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                className={`p-8 rounded-2xl ${isDark ? 'bg-gray-700' : 'bg-gray-50'}`}
              >
                <h2
                  className={`text-2xl font-bold mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}
                >
                  Envoyez-nous un message
                </h2>

                {isSubmitted && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className='bg-green-50 border border-green-200 rounded-xl p-4 mb-6 flex items-center gap-3'
                  >
                    <CheckCircle className='h-6 w-6 text-green-600' />
                    <p className='text-green-800'>
                      Merci ! Votre message a été envoyé avec succès. Nous vous
                      répondrons rapidement.
                    </p>
                  </motion.div>
                )}

                <form onSubmit={handleSubmit(onSubmit)} className='space-y-6'>
                  <div className='grid grid-cols-1 sm:grid-cols-2 gap-6'>
                    <div>
                      <label
                        className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-200' : 'text-gray-700'}`}
                      >
                        Nom *
                      </label>
                      <input
                        type='text'
                        {...register('name', { required: 'Le nom est requis' })}
                        className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                          isDark
                            ? 'bg-gray-600 border-gray-500 text-white placeholder-gray-400'
                            : 'border-gray-300 text-gray-900 placeholder-gray-500'
                        }`}
                        placeholder='Votre nom'
                      />
                      {errors.name && (
                        <p className='mt-1 text-sm text-red-600'>
                          {errors.name.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <label
                        className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-200' : 'text-gray-700'}`}
                      >
                        Email *
                      </label>
                      <input
                        type='email'
                        {...register('email', {
                          required: "L'email est requis",
                          pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: 'Email invalide',
                          },
                        })}
                        className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                          isDark
                            ? 'bg-gray-600 border-gray-500 text-white placeholder-gray-400'
                            : 'border-gray-300 text-gray-900 placeholder-gray-500'
                        }`}
                        placeholder='votre@email.com'
                      />
                      {errors.email && (
                        <p className='mt-1 text-sm text-red-600'>
                          {errors.email.message}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className='grid grid-cols-1 sm:grid-cols-2 gap-6'>
                    <div>
                      <label
                        className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-200' : 'text-gray-700'}`}
                      >
                        Entreprise
                      </label>
                      <input
                        type='text'
                        {...register('company')}
                        className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                          isDark
                            ? 'bg-gray-600 border-gray-500 text-white placeholder-gray-400'
                            : 'border-gray-300 text-gray-900 placeholder-gray-500'
                        }`}
                        placeholder='Nom de votre entreprise'
                      />
                    </div>

                    <div>
                      <label
                        className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-200' : 'text-gray-700'}`}
                      >
                        Téléphone
                      </label>
                      <input
                        type='tel'
                        {...register('phone')}
                        className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                          isDark
                            ? 'bg-gray-600 border-gray-500 text-white placeholder-gray-400'
                            : 'border-gray-300 text-gray-900 placeholder-gray-500'
                        }`}
                        placeholder='Votre numéro'
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-200' : 'text-gray-700'}`}
                    >
                      Sujet *
                    </label>
                    <select
                      {...register('subject', {
                        required: 'Le sujet est requis',
                      })}
                      className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                        isDark
                          ? 'bg-gray-600 border-gray-500 text-white'
                          : 'border-gray-300 text-gray-900'
                      }`}
                    >
                      <option value=''>Sélectionnez un sujet</option>
                      <option value='website'>Site web vitrine</option>
                      <option value='ecommerce'>E-commerce</option>
                      <option value='webapp'>Application web</option>
                      <option value='mobile'>Application mobile</option>
                      <option value='maintenance'>Maintenance/Support</option>
                      <option value='other'>Autre</option>
                    </select>
                    {errors.subject && (
                      <p className='mt-1 text-sm text-red-600'>
                        {errors.subject.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-200' : 'text-gray-700'}`}
                    >
                      Message *
                    </label>
                    <textarea
                      rows={5}
                      {...register('message', {
                        required: 'Le message est requis',
                      })}
                      className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none ${
                        isDark
                          ? 'bg-gray-600 border-gray-500 text-white placeholder-gray-400'
                          : 'border-gray-300 text-gray-900 placeholder-gray-500'
                      }`}
                      placeholder='Décrivez votre projet et vos besoins...'
                    />
                    {errors.message && (
                      <p className='mt-1 text-sm text-red-600'>
                        {errors.message.message}
                      </p>
                    )}
                  </div>

                  <button
                    type='submit'
                    className='w-full bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all transform hover:scale-105 shadow-lg hover:shadow-xl'
                  >
                    <Send className='h-5 w-5' />
                    Envoyer le message
                  </button>
                </form>
              </motion.div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};
