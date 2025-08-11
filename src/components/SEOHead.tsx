import React from 'react'

interface SEOHeadProps {
  title: string
  description: string
  keywords?: string
  canonical?: string
}

export const SEOHead: React.FC<SEOHeadProps> = ({ 
  title, 
  description, 
  keywords,
  canonical
}) => {
  React.useEffect(() => {
    // Update title
    document.title = `${title} | DevWeb31 - Développement Web & Applications`
    
    // Update meta tags
    const updateMetaTag = (name: string, content: string) => {
      let meta = document.querySelector(`meta[name="${name}"]`)
      if (!meta) {
        meta = document.createElement('meta')
        meta.setAttribute('name', name)
        document.head.appendChild(meta)
      }
      meta.setAttribute('content', content)
    }

    const updatePropertyTag = (property: string, content: string) => {
      let meta = document.querySelector(`meta[property="${property}"]`)
      if (!meta) {
        meta = document.createElement('meta')
        meta.setAttribute('property', property)
        document.head.appendChild(meta)
      }
      meta.setAttribute('content', content)
    }

    updateMetaTag('description', description)
    if (keywords) updateMetaTag('keywords', keywords)
    
    // Open Graph tags
    updatePropertyTag('og:title', `${title} | DevWeb31`)
    updatePropertyTag('og:description', description)
    updatePropertyTag('og:type', 'website')
    
    // Twitter Card tags
    updateMetaTag('twitter:card', 'summary_large_image')
    updateMetaTag('twitter:title', `${title} | DevWeb31`)
    updateMetaTag('twitter:description', description)

    // Canonical URL
    if (canonical) {
      let link = document.querySelector('link[rel="canonical"]')
      if (!link) {
        link = document.createElement('link')
        link.setAttribute('rel', 'canonical')
        document.head.appendChild(link)
      }
      link.setAttribute('href', canonical)
    }
  }, [title, description, keywords, canonical])

  return null
}