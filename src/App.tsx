import React, { useState } from 'react';

// Google Apps Script endpoint - Replace TON_SCRIPT_ID with your actual script ID
const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/TON_SCRIPT_ID/exec";

const App: React.FC = () => {
  // Form state
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    address: '',
    pack: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear status when user starts typing again
    if (submitStatus !== 'idle') {
      setSubmitStatus('idle');
    }
  };

  // Validate form
  const validateForm = (): boolean => {
    if (!formData.fullName.trim()) return false;
    if (!formData.phone.trim()) return false;
    if (!formData.email.trim() || !formData.email.includes('@')) return false;
    if (!formData.address.trim()) return false;
    if (!formData.pack) return false;
    return true;
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!validateForm()) {
      setSubmitStatus('error');
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const response = await fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitStatus('success');
        // Clear form
        setFormData({
          fullName: '',
          phone: '',
          email: '',
          address: '',
          pack: ''
        });
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Scroll to form function
  const scrollToForm = () => {
    const formSection = document.getElementById('contact-form');
    if (formSection) {
      formSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="min-h-screen overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-4 sm:px-5 py-12 sm:py-16 md:py-20 bg-gradient-to-b from-[#19171b] to-[#2f2921] overflow-hidden">
        <div className="max-w-screen-sm sm:max-w-screen-md md:max-w-6xl mx-auto w-full">
          {/* Mobile Layout: Stacked */}
          <div className="flex flex-col md:grid md:grid-cols-2 gap-6 sm:gap-8 md:gap-12 items-start">
            {/* Left Column - Text Content (Centered on desktop) */}
            <div className="space-y-4 sm:space-y-6 md:space-y-8 w-full order-1 md:text-center md:flex md:flex-col md:items-center">
              {/* Pill Label */}
              <div className="inline-block">
                <span className="px-3 py-1.5 sm:px-4 sm:py-2 bg-[#2f2921] text-[#d1c7a3] text-[10px] sm:text-xs uppercase tracking-wider rounded-full">
                  Communauté Business • Formation • Coaching
                </span>
              </div>

              {/* Main Headline */}
              <h1 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl xl:text-7xl text-white leading-snug sm:leading-tight tracking-wide">
                <span className="font-semibold">ELAN</span>{' '}
                <span className="font-bold">BUSINESS COMMUNITY</span>
              </h1>

              {/* Subheadline */}
              <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-[#9e8123] font-medium">
                Business clair, actions concrètes, résultats assurés.
              </p>

              {/* Supporting Paragraph */}
              <p className="text-sm sm:text-base md:text-lg text-[#d1c7a3] leading-relaxed max-w-xl">
                Passe de l'incertitude à la clarté… et de la clarté à la croissance. Avec ELAN BUSINESS COMMUNITY, tu suis un chemin guidé, simple et structuré pour créer, développer et scaler un projet rentable, même si tu te sens perdu(e) aujourd'hui.
              </p>

              {/* Mobile: Nadia Card */}
              <div className="md:hidden w-full space-y-4">
                {/* Nadia Card */}
                <div className="bg-[#2f2921] border border-[#563a17]/60 rounded-2xl p-4 flex flex-col gap-3 shadow-lg">
                  {/* Nadia Portrait */}
                  <img 
                    src="/nadia.jpg" 
                    alt="Nadia - Fondatrice de ELAN BUSINESS COMMUNITY"
                    className="w-full rounded-xl object-cover aspect-[4/5]"
                  />
                  {/* Nadia Info */}
                  <div className="space-y-1">
                    <h3 className="text-lg font-semibold text-white">Nadia</h3>
                    <p className="text-sm text-[#9e8123]">
                      Fondatrice de ELAN BUSINESS COMMUNITY • Coach business & mindset
                    </p>
                  </div>
                </div>
              </div>

              {/* Mobile: Video Thumbnail */}
              <div className="md:hidden w-full">
                <button className="relative w-full aspect-video rounded-2xl bg-[#19171b] border border-[#9e8123]/60 overflow-hidden flex flex-col items-center justify-center group hover:border-[#9e8123] transition-all duration-300">
                  {/* Play Button Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/30 transition-colors duration-300">
                    <div className="w-16 h-16 sm:w-20 sm:h-20 bg-[#9e8123] rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:shadow-[#9e8123]/50 transition-all duration-300">
                      <svg className="w-8 h-8 sm:w-10 sm:h-10 text-white ml-1" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                      </svg>
                    </div>
                  </div>
                  {/* Caption */}
                  <div className="absolute bottom-4 left-0 right-0 px-4">
                    <p className="text-sm sm:text-base text-white font-medium text-center">
                      Regarder la vidéo de présentation (2 min)
                    </p>
                  </div>
                </button>
              </div>

              {/* Mobile: CTA Buttons (after video) */}
              <div className="md:hidden flex flex-col gap-3 sm:gap-4 pt-2 sm:pt-4">
                <button 
                  onClick={scrollToForm}
                  className="w-full px-6 sm:px-8 py-3 h-11 bg-[#9e8123] text-white text-sm sm:text-base font-semibold rounded-full hover:bg-[#7d6520] hover:shadow-lg hover:shadow-[#9e8123]/50 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#9e8123] focus:ring-offset-2 focus:ring-offset-[#19171b]"
                >
                  Rejoindre ELAN maintenant
                </button>
                <button className="w-full px-6 sm:px-8 py-3 h-11 border-2 border-[#9e8123] text-[#9e8123] text-sm sm:text-base font-semibold rounded-full hover:bg-[#9e8123] hover:text-white transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#9e8123] focus:ring-offset-2 focus:ring-offset-[#19171b]">
                  Découvrir les parcours
                </button>
              </div>
            </div>

            {/* Right Column - Desktop: Nadia Card + Video Thumbnail + Buttons */}
            <div className="hidden md:flex md:flex-col w-full space-y-4 order-2">
              {/* Nadia Card */}
              <div className="bg-[#2f2921] border border-[#563a17]/60 rounded-2xl p-4 flex flex-col gap-3 shadow-lg">
                {/* Nadia Portrait */}
                <img 
                  src="/nadia.jpg" 
                  alt="Nadia - Fondatrice de ELAN BUSINESS COMMUNITY"
                  className="w-full rounded-xl object-cover aspect-[4/5]"
                />
                {/* Nadia Info */}
                <div className="space-y-1">
                  <h3 className="text-lg font-semibold text-white">Nadia</h3>
                  <p className="text-sm text-[#9e8123]">
                    Fondatrice de ELAN BUSINESS COMMUNITY • Coach business & mindset
                  </p>
                </div>
              </div>

              {/* Video Thumbnail - Web Style */}
              <button className="relative w-full aspect-video rounded-2xl bg-gradient-to-br from-[#2f2921] to-[#19171b] border-2 border-[#9e8123]/80 overflow-hidden flex flex-col items-center justify-center group hover:border-[#9e8123] hover:shadow-2xl hover:shadow-[#9e8123]/30 transition-all duration-300">
                {/* Background Pattern Overlay */}
                <div className="absolute inset-0 bg-[#19171b]/50"></div>
                {/* Play Button Overlay */}
                <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-b from-black/30 to-black/50 group-hover:from-black/40 group-hover:to-black/60 transition-all duration-300">
                  <div className="w-24 h-24 bg-[#9e8123] rounded-full flex items-center justify-center shadow-2xl group-hover:scale-110 group-hover:shadow-[#9e8123]/60 transition-all duration-300 ring-4 ring-[#9e8123]/20 group-hover:ring-[#9e8123]/40">
                    <svg className="w-12 h-12 text-white ml-1" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                    </svg>
                  </div>
                </div>
                {/* Caption */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                  <p className="text-sm text-white font-medium text-center">
                    Regarder la vidéo de présentation (2 min)
                  </p>
                </div>
              </button>

              {/* Desktop: CTA Buttons (after video) */}
              <div className="flex flex-col gap-3 pt-2">
                <button 
                  onClick={scrollToForm}
                  className="w-full px-6 py-3 h-11 bg-[#9e8123] text-white text-sm font-semibold rounded-full hover:bg-[#7d6520] hover:shadow-lg hover:shadow-[#9e8123]/50 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#9e8123] focus:ring-offset-2 focus:ring-offset-[#19171b]"
                >
                  Rejoindre ELAN maintenant
                </button>
                <button className="w-full px-6 py-3 h-11 border-2 border-[#9e8123] text-[#9e8123] text-sm font-semibold rounded-full hover:bg-[#9e8123] hover:text-white transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#9e8123] focus:ring-offset-2 focus:ring-offset-[#19171b]">
                  Découvrir les parcours
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Conversion Form Section */}
      <section id="contact-form" className="py-12 sm:py-16 md:py-20 px-4 sm:px-5 bg-[#19171b] overflow-hidden">
        <div className="max-w-xl mx-auto space-y-6">
          <div className="text-center space-y-3">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-white">
              Rejoindre ELAN BUSINESS COMMUNITY
            </h2>
            <p className="text-sm sm:text-base text-[#d1c7a3]">
              Laisse tes informations et notre équipe te contacte pour t'orienter vers le meilleur parcours et pack.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Full Name */}
            <div>
              <label htmlFor="fullName" className="block text-sm font-medium text-gray-200">
                Nom complet
              </label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                required
                className="w-full mt-1 rounded-lg bg-[#2f2921] border border-[#563a17]/60 px-3 py-2 text-sm text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#9e8123] focus:border-transparent transition-all"
                placeholder="Nom complet"
              />
            </div>

            {/* Phone */}
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-200">
                Numéro de téléphone
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                className="w-full mt-1 rounded-lg bg-[#2f2921] border border-[#563a17]/60 px-3 py-2 text-sm text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#9e8123] focus:border-transparent transition-all"
                placeholder="0600000000"
              />
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-200">
                Adresse email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full mt-1 rounded-lg bg-[#2f2921] border border-[#563a17]/60 px-3 py-2 text-sm text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#9e8123] focus:border-transparent transition-all"
                placeholder="email@email.com"
              />
            </div>

            {/* Address */}
            <div>
              <label htmlFor="address" className="block text-sm font-medium text-gray-200">
                Adresse (Ville, Pays)
              </label>
              <input
                type="text"
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                required
                className="w-full mt-1 rounded-lg bg-[#2f2921] border border-[#563a17]/60 px-3 py-2 text-sm text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#9e8123] focus:border-transparent transition-all"
                placeholder="Casablanca, Maroc"
              />
            </div>

            {/* Pack Selection */}
            <div>
              <label htmlFor="pack" className="block text-sm font-medium text-gray-200">
                Pack choisi
              </label>
              <select
                id="pack"
                name="pack"
                value={formData.pack}
                onChange={handleChange}
                required
                className="w-full mt-1 rounded-lg bg-[#2f2921] border border-[#563a17]/60 px-3 py-2 text-sm text-gray-100 focus:outline-none focus:ring-2 focus:ring-[#9e8123] focus:border-transparent transition-all"
              >
                <option value="">Sélectionne un pack</option>
                <option value="Mensuel – 390 DH / mois">Mensuel – 390 DH / mois</option>
                <option value="Trimestre – 900 DH">Trimestre – 900 DH</option>
                <option value="Semestre – 1650 DH">Semestre – 1650 DH</option>
                <option value="Année – 3000 DH">Année – 3000 DH</option>
              </select>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full mt-4 rounded-full bg-[#9e8123] py-3 text-sm font-semibold text-white shadow-md hover:bg-[#8a6f1f] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-[#9e8123] focus:ring-offset-2 focus:ring-offset-[#19171b]"
            >
              {isSubmitting ? 'Envoi en cours...' : 'Envoyer ma demande'}
            </button>

            {/* Status Messages */}
            {submitStatus === 'success' && (
              <div className="mt-4 p-4 rounded-lg bg-green-900/30 border border-green-700/50">
                <p className="text-sm text-green-200 text-center">
                  Merci ! Tes informations ont été envoyées. Nous te contacterons très vite.
                </p>
              </div>
            )}

            {submitStatus === 'error' && (
              <div className="mt-4 p-4 rounded-lg bg-red-900/30 border border-red-700/50">
                <p className="text-sm text-red-200 text-center">
                  Une erreur est survenue. Merci de réessayer dans quelques instants.
                </p>
              </div>
            )}
          </form>
        </div>
      </section>

      {/* Why ELAN Section */}
      <section className="py-12 sm:py-16 md:py-20 lg:py-32 px-4 sm:px-5 bg-[#2f2921] overflow-hidden">
        <div className="max-w-screen-sm sm:max-w-screen-md md:max-w-7xl mx-auto">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold text-center mb-8 sm:mb-12 text-white leading-tight">
            Pourquoi choisir ELAN BUSINESS COMMUNITY ?
          </h2>
          
          <div className="flex flex-col md:grid md:grid-cols-2 gap-8 sm:gap-10 md:gap-12 items-start mt-8 sm:mt-12 md:mt-16">
            {/* Left - Text */}
            <div className="space-y-4 sm:space-y-6 w-full">
              <p className="text-sm sm:text-base md:text-lg text-[#d1c7a3] leading-relaxed">
                Arrête de perdre ton temps à chercher partout : tout ce dont tu as besoin pour lancer, développer et scaler ton business est réuni au même endroit.
              </p>
              <p className="text-sm sm:text-base md:text-lg text-[#d1c7a3] leading-relaxed">
                Avec ELAN BUSINESS COMMUNITY, tu suis une méthode claire, progressive et structurée, qui t'oriente à chaque étape pour apprendre efficacement et appliquer immédiatement, sans te disperser.
              </p>
            </div>

            {/* Right - Bullet Points */}
            <div className="space-y-4 sm:space-y-6 w-full">
              {[
                "Méthode structurée et progressive",
                "Ressources centralisées en un seul endroit",
                "Application immédiate des concepts",
                "Guidance à chaque étape"
              ].map((item, index) => (
                <div key={index} className="flex items-start gap-3 sm:gap-4">
                  <div className="flex-shrink-0 w-5 h-5 sm:w-6 sm:h-6 mt-0.5 sm:mt-1">
                    <svg className="w-5 h-5 sm:w-6 sm:h-6 text-[#9e8123]" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <p className="text-sm sm:text-base md:text-lg text-[#d1c7a3] flex-1">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-12 sm:py-16 md:py-20 lg:py-32 px-4 sm:px-5 overflow-hidden">
        <div className="max-w-screen-sm sm:max-w-screen-md md:max-w-7xl mx-auto">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold text-center mb-8 sm:mb-12 md:mb-16 text-white leading-tight">
            Ce que tu obtiens en rejoignant ELAN
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
            {/* Card 1 */}
            <div className="bg-[#2f2921] rounded-xl p-4 sm:p-5 md:p-8 border border-[#563a17]/30 shadow-lg hover:scale-105 hover:shadow-xl transition-all duration-300">
              <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-white mb-4 sm:mb-6">
                Une plateforme complète de formations
              </h3>
              <ul className="space-y-1.5 sm:space-y-2 md:space-y-4">
                <li className="flex items-start gap-2 sm:gap-3">
                  <span className="text-[#9e8123] mt-0.5 sm:mt-1 text-sm sm:text-base">•</span>
                  <span className="text-sm sm:text-base text-[#d1c7a3] flex-1">Plus de 30 cours sur le marketing, la vente et le leadership</span>
                </li>
                <li className="flex items-start gap-2 sm:gap-3">
                  <span className="text-[#9e8123] mt-0.5 sm:mt-1 text-sm sm:text-base">•</span>
                  <span className="text-sm sm:text-base text-[#d1c7a3] flex-1">Ressources & contenus pratiques, applicables immédiatement</span>
                </li>
              </ul>
            </div>

            {/* Card 2 */}
            <div className="bg-[#2f2921] rounded-xl p-4 sm:p-5 md:p-8 border border-[#563a17]/30 shadow-lg hover:scale-105 hover:shadow-xl transition-all duration-300">
              <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-white mb-4 sm:mb-6">
                Un accompagnement et suivi au quotidien
              </h3>
              <ul className="space-y-1.5 sm:space-y-2 md:space-y-4">
                <li className="flex items-start gap-2 sm:gap-3">
                  <span className="text-[#9e8123] mt-0.5 sm:mt-1 text-sm sm:text-base">•</span>
                  <span className="text-sm sm:text-base text-[#d1c7a3] flex-1">Guidance personnalisée pour ne jamais te sentir perdu</span>
                </li>
                <li className="flex items-start gap-2 sm:gap-3">
                  <span className="text-[#9e8123] mt-0.5 sm:mt-1 text-sm sm:text-base">•</span>
                  <span className="text-sm sm:text-base text-[#d1c7a3] flex-1">Support continu via la communauté et les sessions live</span>
                </li>
                <li className="flex items-start gap-2 sm:gap-3">
                  <span className="text-[#9e8123] mt-0.5 sm:mt-1 text-sm sm:text-base">•</span>
                  <span className="text-sm sm:text-base text-[#d1c7a3] flex-1">Coaching pour appliquer la méthode pas à pas</span>
                </li>
              </ul>
            </div>

            {/* Card 3 */}
            <div className="bg-[#2f2921] rounded-xl p-4 sm:p-5 md:p-8 border border-[#563a17]/30 shadow-lg hover:scale-105 hover:shadow-xl transition-all duration-300">
              <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-white mb-4 sm:mb-6">
                Des résultats concrets
              </h3>
              <ul className="space-y-1.5 sm:space-y-2 md:space-y-4">
                <li className="flex items-start gap-2 sm:gap-3">
                  <span className="text-[#9e8123] mt-0.5 sm:mt-1 text-sm sm:text-base">•</span>
                  <span className="text-sm sm:text-base text-[#d1c7a3] flex-1">Plus de ventes et de clients</span>
                </li>
                <li className="flex items-start gap-2 sm:gap-3">
                  <span className="text-[#9e8123] mt-0.5 sm:mt-1 text-sm sm:text-base">•</span>
                  <span className="text-sm sm:text-base text-[#d1c7a3] flex-1">Gain de temps : fini la dispersion</span>
                </li>
                <li className="flex items-start gap-2 sm:gap-3">
                  <span className="text-[#9e8123] mt-0.5 sm:mt-1 text-sm sm:text-base">•</span>
                  <span className="text-sm sm:text-base text-[#d1c7a3] flex-1">Motivation et growth mindset grâce à la communauté</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 3 Parcours Section */}
      <section className="py-12 sm:py-16 md:py-20 lg:py-32 px-4 sm:px-5 bg-[#2f2921] border-t-2 border-[#9e8123] overflow-hidden">
        <div className="max-w-screen-sm sm:max-w-screen-md md:max-w-7xl mx-auto">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold text-center mb-8 sm:mb-12 md:mb-16 text-white leading-tight">
            🚀 Les 3 parcours de la formation ELAN
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
            {/* Starter Card */}
            <div className="bg-[#19171b] rounded-xl p-4 sm:p-5 md:p-8 border border-[#563a17]/30 shadow-lg hover:scale-105 transition-all duration-300">
              <div className="mb-4 sm:mb-6">
                <span className="px-3 py-1.5 sm:px-4 sm:py-2 bg-[#563a17] text-[#d1c7a3] text-xs sm:text-sm uppercase tracking-wider rounded-full">
                  Starter
                </span>
              </div>
              <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-white mb-4 sm:mb-6">
                Ceux qui démarrent
              </h3>
              <ul className="space-y-1.5 sm:space-y-2 md:space-y-4">
                <li className="flex items-start gap-2 sm:gap-3">
                  <span className="text-[#9e8123] mt-0.5 sm:mt-1 text-sm sm:text-base">•</span>
                  <span className="text-sm sm:text-base text-[#d1c7a3] flex-1">Trouve et clarifie ton idée de projet</span>
                </li>
                <li className="flex items-start gap-2 sm:gap-3">
                  <span className="text-[#9e8123] mt-0.5 sm:mt-1 text-sm sm:text-base">•</span>
                  <span className="text-sm sm:text-base text-[#d1c7a3] flex-1">Bases solides pour structurer ton projet</span>
                </li>
                <li className="flex items-start gap-2 sm:gap-3">
                  <span className="text-[#9e8123] mt-0.5 sm:mt-1 text-sm sm:text-base">•</span>
                  <span className="text-sm sm:text-base text-[#d1c7a3] flex-1">Idée claire et détaillée prête à se lancer</span>
                </li>
                <li className="flex items-start gap-2 sm:gap-3">
                  <span className="text-[#9e8123] mt-0.5 sm:mt-1 text-sm sm:text-base">•</span>
                  <span className="text-sm sm:text-base text-[#d1c7a3] flex-1">Pose les fondations pour démarrer vite et en confiance</span>
                </li>
              </ul>
            </div>

            {/* Builder Card */}
            <div className="bg-[#19171b] rounded-xl p-4 sm:p-5 md:p-8 border border-[#563a17]/30 shadow-lg hover:scale-105 transition-all duration-300">
              <div className="mb-4 sm:mb-6">
                <span className="px-3 py-1.5 sm:px-4 sm:py-2 bg-[#563a17] text-[#d1c7a3] text-xs sm:text-sm uppercase tracking-wider rounded-full">
                  Builder
                </span>
              </div>
              <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-white mb-4 sm:mb-6">
                Entrepreneurs déjà lancés
              </h3>
              <ul className="space-y-1.5 sm:space-y-2 md:space-y-4">
                <li className="flex items-start gap-2 sm:gap-3">
                  <span className="text-[#9e8123] mt-0.5 sm:mt-1 text-sm sm:text-base">•</span>
                  <span className="text-sm sm:text-base text-[#d1c7a3] flex-1">Développe ta stratégie marketing et vente</span>
                </li>
                <li className="flex items-start gap-2 sm:gap-3">
                  <span className="text-[#9e8123] mt-0.5 sm:mt-1 text-sm sm:text-base">•</span>
                  <span className="text-sm sm:text-base text-[#d1c7a3] flex-1">Organisation et process business optimisés</span>
                </li>
                <li className="flex items-start gap-2 sm:gap-3">
                  <span className="text-[#9e8123] mt-0.5 sm:mt-1 text-sm sm:text-base">•</span>
                  <span className="text-sm sm:text-base text-[#d1c7a3] flex-1">Apprends à vendre efficacement tes produits/services</span>
                </li>
                <li className="flex items-start gap-2 sm:gap-3">
                  <span className="text-[#9e8123] mt-0.5 sm:mt-1 text-sm sm:text-base">•</span>
                  <span className="text-sm sm:text-base text-[#d1c7a3] flex-1">Transforme ton projet en business rentable et structuré</span>
                </li>
              </ul>
            </div>

            {/* Scaler Card */}
            <div className="bg-[#19171b] rounded-xl p-4 sm:p-5 md:p-8 border border-[#563a17]/30 shadow-lg hover:scale-105 transition-all duration-300">
              <div className="mb-4 sm:mb-6">
                <span className="px-3 py-1.5 sm:px-4 sm:py-2 bg-[#563a17] text-[#d1c7a3] text-xs sm:text-sm uppercase tracking-wider rounded-full">
                  Scaler
                </span>
              </div>
              <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-white mb-4 sm:mb-6">
                Entrepreneurs établis
              </h3>
              <ul className="space-y-1.5 sm:space-y-2 md:space-y-4">
                <li className="flex items-start gap-2 sm:gap-3">
                  <span className="text-[#9e8123] mt-0.5 sm:mt-1 text-sm sm:text-base">•</span>
                  <span className="text-sm sm:text-base text-[#d1c7a3] flex-1">Mise en place de l'écosystème complet</span>
                </li>
                <li className="flex items-start gap-2 sm:gap-3">
                  <span className="text-[#9e8123] mt-0.5 sm:mt-1 text-sm sm:text-base">•</span>
                  <span className="text-sm sm:text-base text-[#d1c7a3] flex-1">Optimisation pour scaler sans friction</span>
                </li>
                <li className="flex items-start gap-2 sm:gap-3">
                  <span className="text-[#9e8123] mt-0.5 sm:mt-1 text-sm sm:text-base">•</span>
                  <span className="text-sm sm:text-base text-[#d1c7a3] flex-1">Passe d'un business qui fonctionne à un business qui croît durablement</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-12 sm:py-16 md:py-20 lg:py-32 px-4 sm:px-5 overflow-hidden">
        <div className="max-w-screen-sm sm:max-w-screen-md md:max-w-7xl mx-auto">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold text-center mb-8 sm:mb-12 md:mb-16 text-white leading-tight">
            Plans tarifaires ELAN BUSINESS COMMUNITY
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {/* Mensuel */}
            <div 
              onClick={scrollToForm}
              className="bg-[#2f2921] rounded-xl p-5 sm:p-6 md:p-8 border border-[#563a17]/30 shadow-lg hover:scale-105 transition-all duration-300 w-full cursor-pointer">
              <h3 className="text-xl sm:text-2xl font-semibold text-white mb-3 sm:mb-4">Mensuel</h3>
              <div className="mb-4 sm:mb-6">
                <span className="text-3xl sm:text-4xl font-bold text-[#9e8123]">390 DH</span>
                <span className="text-sm sm:text-base text-[#d1c7a3]"> / mois</span>
              </div>
              <p className="text-sm sm:text-base text-[#d1c7a3] mb-6 sm:mb-8">Accès complet à la communauté et aux formations</p>
              <button 
                onClick={scrollToForm}
                className="w-full px-4 sm:px-6 py-3 h-11 bg-[#9e8123] text-white text-sm sm:text-base font-semibold rounded-full hover:bg-[#7d6520] hover:shadow-lg hover:shadow-[#9e8123]/50 transition-all duration-300">
                Choisir ce plan
              </button>
            </div>

            {/* Trimestre - Highlighted */}
            <div 
              onClick={scrollToForm}
              className="bg-[#2f2921] rounded-xl p-5 sm:p-6 md:p-8 border-2 border-[#9e8123] shadow-lg shadow-[#9e8123]/30 hover:scale-105 transition-all duration-300 relative w-full cursor-pointer">
              <div className="absolute -top-3 sm:-top-4 left-1/2 transform -translate-x-1/2">
                <span className="px-3 sm:px-4 py-1 bg-[#9e8123] text-white text-[10px] sm:text-xs uppercase rounded-full">Populaire</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-semibold text-white mb-3 sm:mb-4">Trimestre</h3>
              <div className="mb-4 sm:mb-6">
                <span className="text-3xl sm:text-4xl font-bold text-[#9e8123]">900 DH</span>
              </div>
              <p className="text-sm sm:text-base text-[#d1c7a3] mb-6 sm:mb-8">+ 30 min de coaching perso pendant Black Friday</p>
              <button 
                onClick={scrollToForm}
                className="w-full px-4 sm:px-6 py-3 h-11 bg-[#9e8123] text-white text-sm sm:text-base font-semibold rounded-full hover:bg-[#7d6520] hover:shadow-lg hover:shadow-[#9e8123]/50 transition-all duration-300">
                Choisir ce plan
              </button>
            </div>

            {/* Semestre */}
            <div 
              onClick={scrollToForm}
              className="bg-[#2f2921] rounded-xl p-5 sm:p-6 md:p-8 border border-[#563a17]/30 shadow-lg hover:scale-105 transition-all duration-300 w-full cursor-pointer">
              <h3 className="text-xl sm:text-2xl font-semibold text-white mb-3 sm:mb-4">Semestre</h3>
              <div className="mb-4 sm:mb-6">
                <span className="text-3xl sm:text-4xl font-bold text-[#9e8123]">1650 DH</span>
              </div>
              <p className="text-sm sm:text-base text-[#d1c7a3] mb-6 sm:mb-8">+ 45 min de coaching perso pendant Black Friday</p>
              <button 
                onClick={scrollToForm}
                className="w-full px-4 sm:px-6 py-3 h-11 bg-[#9e8123] text-white text-sm sm:text-base font-semibold rounded-full hover:bg-[#7d6520] hover:shadow-lg hover:shadow-[#9e8123]/50 transition-all duration-300">
                Choisir ce plan
              </button>
            </div>

            {/* Année */}
            <div 
              onClick={scrollToForm}
              className="bg-[#2f2921] rounded-xl p-5 sm:p-6 md:p-8 border border-[#563a17]/30 shadow-lg hover:scale-105 transition-all duration-300 w-full cursor-pointer">
              <h3 className="text-xl sm:text-2xl font-semibold text-white mb-3 sm:mb-4">Année</h3>
              <div className="mb-4 sm:mb-6">
                <span className="text-3xl sm:text-4xl font-bold text-[#9e8123]">3000 DH</span>
              </div>
              <p className="text-sm sm:text-base text-[#d1c7a3] mb-6 sm:mb-8">+ 1h de coaching perso pendant Black Friday</p>
              <button 
                onClick={scrollToForm}
                className="w-full px-4 sm:px-6 py-3 h-11 bg-[#9e8123] text-white text-sm sm:text-base font-semibold rounded-full hover:bg-[#7d6520] hover:shadow-lg hover:shadow-[#9e8123]/50 transition-all duration-300">
                Choisir ce plan
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Community Section */}
      <section className="py-12 sm:py-16 md:py-20 lg:py-32 px-4 sm:px-5 bg-[#2f2921] overflow-hidden">
        <div className="max-w-screen-sm sm:max-w-screen-md md:max-w-4xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold mb-6 sm:mb-8 text-white leading-tight">
            Une communauté d'entrepreneurs engagés
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-[#d1c7a3] leading-relaxed mb-8 sm:mb-12 px-2">
            Rejoins une communauté dynamique d'entrepreneurs qui partagent les mêmes objectifs que toi. Entraide, motivation, sessions live et échanges enrichissants t'attendent pour t'accompagner dans ta croissance.
          </p>

          {/* Avatar Placeholders */}
          <div className="w-full overflow-x-auto pb-2">
            <div className="flex justify-center items-center gap-3 sm:gap-4 min-w-max px-4 sm:px-0">
              {['AB', 'CD', 'EF', 'GH', 'IJ', 'KL'].map((initials, index) => (
                <div
                  key={index}
                  className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full bg-[#563a17] border-2 border-[#9e8123] flex items-center justify-center text-[#d1c7a3] font-semibold text-sm sm:text-base md:text-lg flex-shrink-0"
                >
                  {initials}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-12 sm:py-16 md:py-20 lg:py-32 px-4 sm:px-5 bg-[#19171b] border-t-2 border-[#9e8123] overflow-hidden">
        <div className="max-w-screen-sm sm:max-w-screen-md md:max-w-4xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold mb-6 sm:mb-8 text-white leading-tight px-2">
            Prêt(e) à passer de l'incertitude à la clarté… puis à la croissance ?
          </h2>
          <button 
            onClick={scrollToForm}
            className="w-full sm:w-auto px-6 sm:px-10 py-4 sm:py-5 h-12 sm:h-auto bg-[#9e8123] text-white text-base sm:text-lg font-semibold rounded-full hover:bg-[#7d6520] hover:shadow-lg hover:shadow-[#9e8123]/50 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#9e8123] focus:ring-offset-2 focus:ring-offset-[#19171b]">
            Je rejoins ELAN maintenant
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 sm:py-12 px-4 sm:px-5 bg-[#19171b] border-t border-[#563a17]/30 overflow-hidden">
        <div className="max-w-screen-sm sm:max-w-screen-md md:max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-6 md:gap-8">
            <a href="#" className="text-sm sm:text-base text-[#d1c7a3] hover:text-[#9e8123] transition-colors duration-300">
              Mentions légales
            </a>
            <a href="#" className="text-sm sm:text-base text-[#d1c7a3] hover:text-[#9e8123] transition-colors duration-300">
              Conditions
            </a>
            <a href="#" className="text-sm sm:text-base text-[#d1c7a3] hover:text-[#9e8123] transition-colors duration-300">
              Contact
            </a>
          </div>
          <div className="mt-6 sm:mt-8 text-center text-xs sm:text-sm text-[#d1c7a3]">
            © 2024 ELAN BUSINESS COMMUNITY. Tous droits réservés.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;

