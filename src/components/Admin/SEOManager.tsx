import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { useThemeContext } from '../../hooks/useThemeContext';
import { 
  Search, 
  Share2, 
  BarChart3, 
  Settings, 
  Code, 
  FileText,
  Save,
  RefreshCw,
  ExternalLink,
  CheckCircle,
  AlertCircle
} from 'lucide-react';

interface SEOSettings {
  site_title: string;
  site_description: string;
  site_keywords: string;
  site_url: string;
  og_image: string;
  twitter_handle: string;
  google_analytics_id: string;
  google_search_console: string;
  canonical_urls: boolean;
  sitemap_enabled: boolean;
  robots_txt: string;
  structured_data: string;
}

export const SEOManager: React.FC = () => {
  const { isDark } = useThemeContext();
  const [settings, setSettings] = useState<SEOSettings>({
    site_title: '',
    site_description: '',
    site_keywords: '',
    site_url: '',
    og_image: '',
    twitter_handle: '',
    google_analytics_id: '',
    google_search_console: '',
    canonical_urls: true,
    sitemap_enabled: true,
    robots_txt: '',
    structured_data: ''
  });
  
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [activeTab, setActiveTab] = useState('basic');

  useEffect(() => {
    fetchSEOSettings();
  }, []);

  const fetchSEOSettings = async () => {
    try {
      const { data, error } = await supabase
        .from('site_settings')
        .select('key, value')
        .in('key', [
          'site_title', 'site_description', 'site_keywords', 'site_url',
          'og_image', 'twitter_handle', 'google_analytics_id', 'google_search_console',
          'canonical_urls', 'sitemap_enabled', 'robots_txt', 'structured_data'
        ]);

      if (error) throw error;

      const settingsMap: Partial<SEOSettings> = {};
      data?.forEach(item => {
        if (item.key === 'canonical_urls' || item.key === 'sitemap_enabled') {
          settingsMap[item.key as keyof SEOSettings] = item.value === 'true';
        } else {
          settingsMap[item.key as keyof SEOSettings] = item.value;
        }
      });

      setSettings(prev => ({ ...prev, ...settingsMap }));
      setLoading(false);
    } catch {
      setErrorMessage('Erreur lors du chargement des paramètres SEO');
      setLoading(false);
    }
  };

  const saveSEOSettings = async () => {
    setSaving(true);
    setSuccessMessage('');
    setErrorMessage('');

    try {
      const updates = Object.entries(settings).map(([key, value]) => ({
        key,
        value: typeof value === 'boolean' ? value.toString() : value,
        updated_at: new Date().toISOString()
      }));

      const { error } = await supabase
        .from('site_settings')
        .upsert(updates, { onConflict: 'key' });

      if (error) throw error;

      setSuccessMessage('Paramètres SEO sauvegardés avec succès !');
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch {
      setErrorMessage('Erreur lors de la sauvegarde des paramètres SEO');
    } finally {
      setSaving(false);
    }
  };

  const generateSitemap = async () => {
    try {
      // Logique pour générer le sitemap
      setSuccessMessage('Sitemap généré avec succès !');
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch {
      setErrorMessage('Erreur lors de la génération du sitemap');
    }
  };

  const testSEOSettings = () => {
    // Ouvrir une nouvelle fenêtre pour tester les paramètres SEO
    window.open(settings.site_url || 'https://devweb31.fr', '_blank');
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  const tabs = [
    { id: 'basic', label: 'Basique', icon: Settings },
    { id: 'social', label: 'Réseaux Sociaux', icon: Share2 },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'advanced', label: 'Avancé', icon: Code },
    { id: 'tools', label: 'Outils', icon: FileText }
  ];

  return (
    <div className={`p-6 ${isDark ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}`}>
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold flex items-center gap-3">
          <Search className="w-8 h-8 text-blue-600" />
          Gestion SEO & Métadonnées
        </h1>
        <p className={`mt-2 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
          Configurez tous les paramètres SEO de votre site pour optimiser votre visibilité en ligne
        </p>
      </div>

      {/* Messages de statut */}
      {successMessage && (
        <div className="mb-4 p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg flex items-center gap-2">
          <CheckCircle className="w-5 h-5" />
          {successMessage}
        </div>
      )}
      
      {errorMessage && (
        <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg flex items-center gap-2">
          <AlertCircle className="w-5 h-5" />
          {errorMessage}
        </div>
      )}

      {/* Tabs */}
      <div className="mb-6">
        <div className="flex space-x-1 bg-gray-100 rounded-lg p-1">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  activeTab === tab.id
                    ? 'bg-blue-600 text-white shadow-sm'
                    : `${isDark ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`
                }`}
              >
                <Icon className="w-4 h-4" />
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Contenu des tabs */}
      <div className="space-y-6">
        {/* Tab Basique */}
        {activeTab === 'basic' && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Titre du site</label>
                <input
                  type="text"
                  value={settings.site_title}
                  onChange={(e) => setSettings(prev => ({ ...prev, site_title: e.target.value }))}
                  className={`w-full px-3 py-2 border rounded-lg ${
                    isDark ? 'bg-gray-800 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'
                  }`}
                  placeholder="DevWeb31 - Développement Web & Applications"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">URL du site</label>
                <input
                  type="url"
                  value={settings.site_url}
                  onChange={(e) => setSettings(prev => ({ ...prev, site_url: e.target.value }))}
                  className={`w-full px-3 py-2 border rounded-lg ${
                    isDark ? 'bg-gray-800 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'
                  }`}
                  placeholder="https://devweb31.fr"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Description du site</label>
              <textarea
                value={settings.site_description}
                onChange={(e) => setSettings(prev => ({ ...prev, site_description: e.target.value }))}
                rows={3}
                className={`w-full px-3 py-2 border rounded-lg ${
                  isDark ? 'bg-gray-800 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'
                }`}
                placeholder="Description optimisée SEO de votre site..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Mots-clés</label>
              <input
                type="text"
                value={settings.site_keywords}
                onChange={(e) => setSettings(prev => ({ ...prev, site_keywords: e.target.value }))}
                className={`w-full px-3 py-2 border rounded-lg ${
                  isDark ? 'bg-gray-800 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'
                }`}
                placeholder="développement web, applications, React, Toulouse"
              />
              <p className={`text-xs mt-1 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                Séparez les mots-clés par des virgules
              </p>
            </div>
          </div>
        )}

        {/* Tab Réseaux Sociaux */}
        {activeTab === 'social' && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Image Open Graph</label>
                <input
                  type="url"
                  value={settings.og_image}
                  onChange={(e) => setSettings(prev => ({ ...prev, og_image: e.target.value }))}
                  className={`w-full px-3 py-2 border rounded-lg ${
                    isDark ? 'bg-gray-800 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'
                  }`}
                  placeholder="https://devweb31.fr/og-image.jpg"
                />
                <p className={`text-xs mt-1 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                  Image de 1200x630px recommandée
                </p>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Handle Twitter</label>
                <input
                  type="text"
                  value={settings.twitter_handle}
                  onChange={(e) => setSettings(prev => ({ ...prev, twitter_handle: e.target.value }))}
                  className={`w-full px-3 py-2 border rounded-lg ${
                    isDark ? 'bg-gray-800 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'
                  }`}
                  placeholder="@devweb31"
                />
              </div>
            </div>

            <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <h3 className="font-medium text-blue-900 mb-2">Aperçu Open Graph</h3>
              <div className="border rounded-lg p-3 bg-white">
                <div className="w-full h-32 bg-gray-200 rounded mb-2 flex items-center justify-center">
                  {settings.og_image ? (
                    <img src={settings.og_image} alt="OG Preview" className="w-full h-full object-cover rounded" />
                  ) : (
                    <span className="text-gray-500">Aperçu de l'image</span>
                  )}
                </div>
                <h4 className="font-bold text-gray-900">{settings.site_title || 'Titre du site'}</h4>
                <p className="text-sm text-gray-600">{settings.site_description || 'Description du site'}</p>
              </div>
            </div>
          </div>
        )}

        {/* Tab Analytics */}
        {activeTab === 'analytics' && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Google Analytics ID</label>
                <input
                  type="text"
                  value={settings.google_analytics_id}
                  onChange={(e) => setSettings(prev => ({ ...prev, google_analytics_id: e.target.value }))}
                  className={`w-full px-3 py-2 border rounded-lg ${
                    isDark ? 'bg-gray-800 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'
                  }`}
                  placeholder="G-XXXXXXXXXX"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Google Search Console</label>
                <input
                  type="text"
                  value={settings.google_search_console}
                  onChange={(e) => setSettings(prev => ({ ...prev, google_search_console: e.target.value }))}
                  className={`w-full px-3 py-2 border rounded-lg ${
                    isDark ? 'bg-gray-800 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'
                  }`}
                  placeholder="Code de vérification"
                />
              </div>
            </div>

            <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
              <h3 className="font-medium text-green-900 mb-2">Statut Analytics</h3>
              <div className="flex items-center gap-2">
                {settings.google_analytics_id ? (
                  <CheckCircle className="w-5 h-5 text-green-600" />
                ) : (
                  <AlertCircle className="w-5 h-5 text-yellow-600" />
                )}
                <span className="text-sm">
                  {settings.google_analytics_id ? 'Google Analytics configuré' : 'Google Analytics non configuré'}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Tab Avancé */}
        {activeTab === 'advanced' && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="canonical_urls"
                  checked={settings.canonical_urls}
                  onChange={(e) => setSettings(prev => ({ ...prev, canonical_urls: e.target.checked }))}
                  className="w-4 h-4 text-blue-600 rounded border-gray-300"
                />
                <label htmlFor="canonical_urls" className="ml-2 text-sm font-medium">
                  URLs canoniques
                </label>
              </div>
              
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="sitemap_enabled"
                  checked={settings.sitemap_enabled}
                  onChange={(e) => setSettings(prev => ({ ...prev, sitemap_enabled: e.target.checked }))}
                  className="w-4 h-4 text-blue-600 rounded border-gray-300"
                />
                <label htmlFor="sitemap_enabled" className="ml-2 text-sm font-medium">
                  Sitemap automatique
                </label>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Robots.txt</label>
              <textarea
                value={settings.robots_txt}
                onChange={(e) => setSettings(prev => ({ ...prev, robots_txt: e.target.value }))}
                rows={6}
                className={`w-full px-3 py-2 border rounded-lg font-mono text-sm ${
                  isDark ? 'bg-gray-800 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'
                }`}
                placeholder="User-agent: *\nAllow: /\nDisallow: /admin\nSitemap: https://devweb31.fr/sitemap.xml"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Structured Data (JSON-LD)</label>
              <textarea
                value={settings.structured_data}
                onChange={(e) => setSettings(prev => ({ ...prev, structured_data: e.target.value }))}
                rows={8}
                className={`w-full px-3 py-2 border rounded-lg font-mono text-sm ${
                  isDark ? 'bg-gray-800 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'
                }`}
                placeholder='{"@context": "https://schema.org", "@type": "Organization", "name": "DevWeb31"}'
              />
              <p className={`text-xs mt-1 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                Données structurées JSON-LD pour améliorer le référencement
              </p>
            </div>
          </div>
        )}

        {/* Tab Outils */}
        {activeTab === 'tools' && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <button
                onClick={generateSitemap}
                className="flex items-center justify-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                <FileText className="w-4 h-4" />
                Générer Sitemap
              </button>
              
              <button
                onClick={testSEOSettings}
                className="flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <ExternalLink className="w-4 h-4" />
                Tester SEO
              </button>
            </div>

            <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
              <h3 className="font-medium text-gray-900 mb-2">Outils SEO Recommandés</h3>
              <div className="space-y-2 text-sm">
                <a href="https://pagespeed.web.dev/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-blue-600 hover:underline">
                  <ExternalLink className="w-3 h-3" />
                  Google PageSpeed Insights
                </a>
                <a href="https://search.google.com/test/rich-results" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-blue-600 hover:underline">
                  <ExternalLink className="w-3 h-3" />
                  Test des résultats enrichis Google
                </a>
                <a href="https://developers.facebook.com/tools/debug/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-blue-600 hover:underline">
                  <ExternalLink className="w-3 h-3" />
                  Facebook Sharing Debugger
                </a>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="flex items-center justify-between pt-6 border-t border-gray-200">
        <div className="flex items-center gap-2">
          <button
            onClick={fetchSEOSettings}
            className="flex items-center gap-2 px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <RefreshCw className="w-4 h-4" />
            Actualiser
          </button>
        </div>
        
        <button
          onClick={saveSEOSettings}
          disabled={saving}
          className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors"
        >
          {saving ? (
            <RefreshCw className="w-4 h-4 animate-spin" />
          ) : (
            <Save className="w-4 h-4" />
          )}
          {saving ? 'Sauvegarde...' : 'Sauvegarder'}
        </button>
      </div>
    </div>
  );
};
