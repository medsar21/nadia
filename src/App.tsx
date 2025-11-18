import React, { useState } from 'react';
import { motion } from 'framer-motion';

// Google Apps Script endpoint - Replace TON_SCRIPT_ID with your actual script ID
const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/TON_SCRIPT_ID/exec";

// Constants for images and links
const ABOUT_URL = "/qui-suis-je"; // URL for "Qui suis-je?" page
const NADIA_HERO_IMAGE = "/nadia.jpg";
const STOCK_LEARNING_ONLINE = "/assets/stock-learning-online.jpg";
const STOCK_COMMUNITY = "/assets/stock-community.jpg";
const STOCK_RESULTS = "/assets/stock-results.jpg";
const STOCK_PRICING = "/assets/stock-pricing.jpg";

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
      <section className="relative min-h-screen flex items-center justify-center px-4 sm:px-5 py-12 sm:py-16 md:py-20 bg-gradient-to-br from-[#B8D4E0] via-[#E6E0F0] to-[#F5F5F0] overflow-hidden">
        {/* Gradient Blobs Background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            className="absolute top-1/4 -left-1/4 w-96 h-96 rounded-full blur-3xl opacity-15"
            style={{ background: '#9E9FCC' }}
            animate={{
              scale: [1, 1.2, 1],
              x: [0, 50, 0],
              y: [0, 30, 0],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div
            className="absolute top-3/4 right-1/4 w-80 h-80 rounded-full blur-3xl opacity-12"
            style={{ background: '#B8D4E0' }}
            animate={{
              scale: [1, 1.3, 1],
              x: [0, -40, 0],
              y: [0, -20, 0],
            }}
            transition={{
              duration: 25,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div
            className="absolute bottom-1/4 left-1/3 w-72 h-72 rounded-full blur-3xl opacity-12"
            style={{ background: '#E6E0F0' }}
            animate={{
              scale: [1, 1.1, 1],
              x: [0, 30, 0],
              y: [0, 40, 0],
            }}
            transition={{
              duration: 18,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </div>
        <div className="max-w-screen-sm sm:max-w-screen-md md:max-w-6xl mx-auto w-full relative z-10">
          {/* Mobile Layout: Stacked */}
          <div className="flex flex-col md:grid md:grid-cols-2 gap-6 sm:gap-8 md:gap-12 items-start">
            {/* Left Column - Text Content (Centered on desktop) */}
            <div className="space-y-4 sm:space-y-6 md:space-y-8 w-full order-1 md:text-center md:flex md:flex-col md:items-center">
              {/* Pill Label */}
              <motion.div
                className="inline-block"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
              >
                <span className="px-3 py-1.5 sm:px-4 sm:py-2 bg-white/80 text-[#6B8FA3] text-[10px] sm:text-xs uppercase tracking-wider rounded-full border border-[#9E9FCC]/30 shadow-sm">
                  Communauté Business • Formation • Coaching
                </span>
              </motion.div>

              {/* Main Headline */}
              <motion.h1
                className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl xl:text-7xl text-[#1A2B2F] leading-snug sm:leading-tight tracking-wide"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
              >
                <span className="font-semibold">ELAN BC</span>{' '}
                <span className="font-bold">BUSINESS COMMUNITY</span>
              </motion.h1>

              {/* Subheadline */}
              <motion.p
                className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-[#6B8FA3] font-medium mb-6 sm:mb-8"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
              >
                Business clair, actions concrètes, résultats assurés.
              </motion.p>

              {/* Supporting Paragraph */}
              <motion.p
                className="text-sm sm:text-base md:text-lg text-[#5B7A9A] leading-relaxed max-w-xl mb-6 sm:mb-8"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" }}
              >
                Passe de l'incertitude à la clarté… et de la clarté à la croissance. Avec ELAN BUSINESS COMMUNITY (ELAN BC), tu suis un chemin guidé, simple et structuré pour créer, développer et scaler un projet rentable, même si tu te sens perdu(e) aujourd'hui.
              </motion.p>

              {/* Qui suis-je? Link */}
              <motion.div
                className="pt-2 sm:pt-4"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.4, ease: "easeOut" }}
              >
                <p className="text-sm sm:text-base text-[#5B7A9A] mb-4 sm:mb-6">
                  Envie de savoir qui est Nadia Lakzir ?{' '}
                  <a 
                    href={ABOUT_URL}
                    className="text-[#6B8FA3] underline hover:text-[#1A2B2F] transition-colors duration-300 hover:border-b-2 hover:border-[#6B8FA3] font-medium"
                  >
                    Découvrir mon parcours
                  </a>
                </p>
              </motion.div>

              {/* Mobile: Nadia Card */}
              <motion.div
                className="md:hidden w-full space-y-4 mb-4"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.5, ease: "easeOut" }}
              >
                {/* Nadia Card */}
                <div className="bg-white border border-[#E6E0F0] rounded-2xl p-4 flex flex-col gap-3 shadow-md hover:shadow-lg hover:border-[#6B8FA3] transition-all duration-300">
                  {/* Nadia Portrait */}
                  <motion.img
                    src={NADIA_HERO_IMAGE}
                    alt="Nadia Lakzir - Fondatrice de ELAN BUSINESS COMMUNITY (ELAN BC)"
                    className="w-full rounded-xl object-cover aspect-[4/5] mb-4"
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.3 }}
                  />
                  {/* Nadia Info */}
                  <div className="space-y-1">
                    <h3 className="text-lg font-semibold text-[#1A2B2F]">Nadia Lakzir</h3>
                    <p className="text-sm text-[#5B7A9A] mb-0">
                      Fondatrice de ELAN BUSINESS COMMUNITY (ELAN BC) • Coach business & mindset
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Mobile: Video Thumbnail */}
              <motion.div
                className="md:hidden w-full mb-4"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.6, ease: "easeOut" }}
              >
                <button className="relative w-full aspect-video rounded-2xl bg-gradient-to-br from-[#E6E0F0] to-[#F5F5F0] border border-[#B8D4E0] overflow-hidden flex flex-col items-center justify-center group hover:border-[#6B8FA3] transition-all duration-300">
                  {/* Play Button Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/30 transition-colors duration-300">
                    <div className="w-16 h-16 sm:w-20 sm:h-20 bg-[#6B8FA3] rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:shadow-[#6B8FA3]/40 transition-all duration-300">
                      <svg className="w-8 h-8 sm:w-10 sm:h-10 text-white ml-1" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                      </svg>
                    </div>
                  </div>
                  {/* Caption */}
                  <div className="absolute bottom-4 left-0 right-0 px-4">
                    <p className="text-sm sm:text-base text-[#1A2B2F] font-medium text-center">
                      Regarder la vidéo de présentation (2 min)
                    </p>
                  </div>
                </button>
              </motion.div>

              {/* Mobile: CTA Buttons (after video) */}
              <motion.div
                className="md:hidden flex flex-col gap-3 sm:gap-4 pt-2 sm:pt-4"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.7, ease: "easeOut" }}
              >
                <motion.button
                  onClick={scrollToForm}
                  className="w-full px-6 sm:px-8 py-3 h-11 bg-[#6B8FA3] text-white text-sm sm:text-base font-semibold rounded-full hover:bg-[#5B7A9A] hover:shadow-lg hover:shadow-[#6B8FA3]/30 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#6B8FA3] focus:ring-offset-2 focus:ring-offset-white"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Rejoindre ELAN BC maintenant
                </motion.button>
                <motion.button
                  className="w-full px-6 sm:px-8 py-3 h-11 border-2 border-[#6B8FA3] text-[#6B8FA3] bg-transparent text-sm sm:text-base font-semibold rounded-full hover:bg-[#6B8FA3]/10 hover:text-white transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#6B8FA3] focus:ring-offset-2 focus:ring-offset-white"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Découvrir les parcours
                </motion.button>
              </motion.div>
            </div>

            {/* Right Column - Desktop: Nadia Card + Video Thumbnail + Buttons */}
            <motion.div
              className="hidden md:flex md:flex-col w-full space-y-4 order-2"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
            >
              {/* Nadia Card */}
              <motion.div
                className="bg-white border border-[#E6E0F0] rounded-2xl p-4 flex flex-col gap-3 shadow-md hover:shadow-lg"
                whileHover={{ translateY: -4, borderColor: "#6B8FA3" }}
                transition={{ duration: 0.3 }}
              >
                {/* Nadia Portrait */}
                <motion.img
                  src={NADIA_HERO_IMAGE}
                  alt="Nadia Lakzir - Fondatrice de ELAN BUSINESS COMMUNITY (ELAN BC)"
                  className="w-full rounded-xl object-cover aspect-[4/5] mb-4"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                />
                {/* Nadia Info */}
                <div className="space-y-1">
                  <h3 className="text-lg font-semibold text-[#f7f7f7]">Nadia Lakzir</h3>
                  <p className="text-sm text-[#5B7A9A] mb-0">
                    Fondatrice de ELAN BUSINESS COMMUNITY (ELAN BC) • Coach business & mindset
                  </p>
                </div>
              </motion.div>

              {/* Video Thumbnail - Web Style */}
              <motion.button
                className="relative w-full aspect-video rounded-2xl bg-gradient-to-br from-[#E6E0F0] to-[#F5F5F0] border-2 border-[#B8D4E0] overflow-hidden flex flex-col items-center justify-center group hover:border-[#6B8FA3] hover:shadow-2xl transition-all duration-300"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                {/* Background Pattern Overlay */}
                <div className="absolute inset-0 bg-white/30"></div>
                {/* Play Button Overlay */}
                <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-b from-black/30 to-black/50 group-hover:from-black/40 group-hover:to-black/60 transition-all duration-300">
                  <div className="w-24 h-24 bg-[#6B8FA3] rounded-full flex items-center justify-center shadow-2xl group-hover:scale-110 transition-all duration-300 ring-4 ring-[#6B8FA3]/20 group-hover:ring-[#6B8FA3]/40">
                    <svg className="w-12 h-12 text-white ml-1" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                    </svg>
                  </div>
                </div>
                {/* Caption */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                  <p className="text-sm text-[#f7f7f7] font-medium text-center">
                    Regarder la vidéo de présentation (2 min)
                  </p>
                </div>
              </motion.button>

              {/* Desktop: CTA Buttons (after video) */}
              <div className="flex flex-col gap-3 pt-2">
                <motion.button
                  onClick={scrollToForm}
                  className="w-full px-6 py-3 h-11 bg-[#6B8FA3] text-white text-sm font-semibold rounded-full hover:bg-[#5B7A9A] hover:shadow-lg hover:shadow-[#6B8FA3]/30 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#6B8FA3] focus:ring-offset-2 focus:ring-offset-white"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Rejoindre ELAN BC maintenant
                </motion.button>
                <motion.button
                  className="w-full px-6 py-3 h-11 border-2 border-[#6B8FA3] text-[#6B8FA3] bg-transparent text-sm font-semibold rounded-full hover:bg-[#6B8FA3]/10 hover:text-white transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#6B8FA3] focus:ring-offset-2 focus:ring-offset-white"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Découvrir les parcours
                </motion.button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Conversion Form Section */}
      <motion.section
        id="contact-form"
        className="py-12 sm:py-16 md:py-20 px-4 sm:px-5 bg-white overflow-hidden"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
      >
        <div className="max-w-xl mx-auto space-y-6">
          <motion.div
            className="text-center space-y-3"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-[#1A2B2F]">
              Rejoindre ELAN BUSINESS COMMUNITY (ELAN BC)
            </h2>
            <p className="text-sm sm:text-base text-[#5B7A9A] mb-0">
              Laisse tes informations et notre équipe te contacte pour t'orienter vers le meilleur parcours et pack.
            </p>
          </motion.div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Full Name */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <label htmlFor="fullName" className="block text-sm font-medium text-[#f7f7f7]">
                Nom complet
              </label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                required
                className="w-full mt-1 rounded-lg bg-white border border-[#E6E0F0] px-3 py-2 text-sm text-[#1A2B2F] placeholder-[#8A9BA8] focus:outline-none focus:ring-2 focus:ring-[#6B8FA3] focus:border-[#6B8FA3] transition-all"
                placeholder="Nom complet"
              />
            </motion.div>

            {/* Phone */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <label htmlFor="phone" className="block text-sm font-medium text-[#f7f7f7]">
                Numéro de téléphone
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                className="w-full mt-1 rounded-lg bg-white border border-[#E6E0F0] px-3 py-2 text-sm text-[#1A2B2F] placeholder-[#8A9BA8] focus:outline-none focus:ring-2 focus:ring-[#6B8FA3] focus:border-[#6B8FA3] transition-all"
                placeholder="0600000000"
              />
            </motion.div>

            {/* Email */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <label htmlFor="email" className="block text-sm font-medium text-[#f7f7f7]">
                Adresse email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full mt-1 rounded-lg bg-white border border-[#E6E0F0] px-3 py-2 text-sm text-[#1A2B2F] placeholder-[#8A9BA8] focus:outline-none focus:ring-2 focus:ring-[#6B8FA3] focus:border-[#6B8FA3] transition-all"
                placeholder="email@email.com"
              />
            </motion.div>

            {/* Address */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <label htmlFor="address" className="block text-sm font-medium text-[#f7f7f7]">
                Adresse (Ville, Pays)
              </label>
              <input
                type="text"
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                required
                className="w-full mt-1 rounded-lg bg-white border border-[#E6E0F0] px-3 py-2 text-sm text-[#1A2B2F] placeholder-[#8A9BA8] focus:outline-none focus:ring-2 focus:ring-[#6B8FA3] focus:border-[#6B8FA3] transition-all"
                placeholder="Casablanca, Maroc"
              />
            </motion.div>

            {/* Pack Selection */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <label htmlFor="pack" className="block text-sm font-medium text-[#f7f7f7]">
                Pack choisi
              </label>
              <select
                id="pack"
                name="pack"
                value={formData.pack}
                onChange={handleChange}
                required
                className="w-full mt-1 rounded-lg bg-white border border-[#E6E0F0] px-3 py-2 text-sm text-[#1A2B2F] focus:outline-none focus:ring-2 focus:ring-[#6B8FA3] focus:border-[#6B8FA3] transition-all"
              >
                <option value="">Sélectionne un pack</option>
                <option value="Mensuel – 390 DH / mois">Mensuel – 390 DH / mois</option>
                <option value="Trimestre – 900 DH">Trimestre – 900 DH</option>
                <option value="Semestre – 1650 DH">Semestre – 1650 DH</option>
                <option value="Année – 3000 DH">Année – 3000 DH</option>
              </select>
            </motion.div>

            {/* Submit Button */}
            <motion.button
              type="submit"
              disabled={isSubmitting}
              className="w-full mt-4 rounded-full bg-[#6B8FA3] py-3 text-sm font-semibold text-white shadow-md hover:bg-[#5B7A9A] hover:shadow-lg hover:shadow-[#6B8FA3]/30 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-[#6B8FA3] focus:ring-offset-2 focus:ring-offset-white"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {isSubmitting ? 'Envoi en cours...' : 'Envoyer ma demande'}
            </motion.button>

            {/* Status Messages */}
            {submitStatus === 'success' && (
              <motion.div
                className="mt-4 p-4 rounded-lg bg-[#B8D4E0]/30 border border-[#6B8FA3]/50"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <p className="text-sm text-[#1A2B2F] text-center">
                  Merci ! Tes informations ont été envoyées. Nous te contacterons très vite.
                </p>
              </motion.div>
            )}

            {submitStatus === 'error' && (
              <motion.div
                className="mt-4 p-4 rounded-lg bg-red-900/30 border border-red-700/50"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <p className="text-sm text-red-200 text-center">
                  Une erreur est survenue. Merci de réessayer dans quelques instants.
                </p>
              </motion.div>
            )}
          </form>
        </div>
      </motion.section>

      {/* Why ELAN BC Section */}
      <motion.section
        className="py-12 sm:py-16 md:py-20 lg:py-32 px-4 sm:px-5 bg-gradient-to-br from-[#F5F5F0] to-white overflow-hidden"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
      >
        <div className="max-w-screen-sm sm:max-w-screen-md md:max-w-7xl mx-auto">
          <motion.h2
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold text-center mb-8 sm:mb-12 text-[#1A2B2F] leading-tight"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Pourquoi choisir ELAN BUSINESS COMMUNITY (ELAN BC) ?
          </motion.h2>
          
          <div className="flex flex-col md:grid md:grid-cols-2 gap-8 sm:gap-10 md:gap-12 items-center mt-8 sm:mt-12 md:mt-16">
            {/* Left - Image (Mobile: stacked above) */}
            <motion.div
              className="w-full order-2 md:order-1"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <motion.img
                src={NADIA_HERO_IMAGE}
                alt="Nadia Lakzir accompagnant la communauté ELAN BC"
                className="w-full rounded-2xl object-cover mb-4 md:mb-0 h-auto"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              />
            </motion.div>

            {/* Right - Text & Bullet Points */}
            <motion.div
              className="space-y-4 sm:space-y-6 w-full order-1 md:order-2"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <p className="text-sm sm:text-base md:text-lg text-[#5B7A9A] leading-relaxed mb-6 sm:mb-8">
                Arrête de perdre ton temps à chercher partout : tout ce dont tu as besoin pour lancer, développer et scaler ton business est réuni au même endroit.
              </p>
              <p className="text-sm sm:text-base md:text-lg text-[#5B7A9A] leading-relaxed mb-6 sm:mb-8">
                Avec ELAN BC, tu suis une méthode claire, progressive et structurée, qui t'oriente à chaque étape pour apprendre efficacement et appliquer immédiatement, sans te disperser.
              </p>

              {/* Bullet Points */}
              <div className="space-y-4 sm:space-y-6 mt-6">
                {[
                  "Méthode structurée et progressive",
                  "Ressources centralisées en un seul endroit",
                  "Application immédiate des concepts",
                  "Guidance à chaque étape"
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    className="flex items-start gap-3 sm:gap-4"
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                  >
                    <div className="flex-shrink-0 w-5 h-5 sm:w-6 sm:h-6 mt-0.5 sm:mt-1">
                      <svg className="w-5 h-5 sm:w-6 sm:h-6 text-[#6B8FA3]" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <p className="text-sm sm:text-base md:text-lg text-[#5B7A9A] flex-1 mb-0">{item}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Benefits Section */}
      <motion.section
        className="py-12 sm:py-16 md:py-20 lg:py-32 px-4 sm:px-5 bg-white overflow-hidden"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
      >
        <div className="max-w-screen-sm sm:max-w-screen-md md:max-w-7xl mx-auto">
          <motion.h2
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold text-center mb-8 sm:mb-12 md:mb-16 text-[#1A2B2F] leading-tight"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Ce que tu obtiens en rejoignant ELAN BC
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
            {/* Card 1 */}
            <motion.div
              className="bg-white rounded-xl p-4 sm:p-5 md:p-8 border border-[#E6E0F0] shadow-md hover:shadow-lg"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              whileHover={{ translateY: -4, borderColor: "#6B8FA3", boxShadow: "0 20px 25px -5px rgba(107, 143, 163, 0.15)" }}
            >
              <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-[#1A2B2F] mb-4 sm:mb-6">
                Une plateforme complète de formations
              </h3>
              <ul className="space-y-1.5 sm:space-y-2 md:space-y-4">
                <li className="flex items-start gap-2 sm:gap-3">
                  <span className="text-[#6B8FA3] mt-0.5 sm:mt-1 text-sm sm:text-base">•</span>
                  <span className="text-sm sm:text-base text-[#5B7A9A] flex-1">Plus de 30 cours sur le marketing, la vente et le leadership</span>
                </li>
                <li className="flex items-start gap-2 sm:gap-3">
                  <span className="text-[#6B8FA3] mt-0.5 sm:mt-1 text-sm sm:text-base">•</span>
                  <span className="text-sm sm:text-base text-[#5B7A9A] flex-1">Ressources & contenus pratiques, applicables immédiatement</span>
                </li>
              </ul>
            </motion.div>

            {/* Card 2 */}
            <motion.div
              className="bg-white rounded-xl p-4 sm:p-5 md:p-8 border border-[#E6E0F0] shadow-md hover:shadow-lg"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              whileHover={{ translateY: -4, borderColor: "#6B8FA3", boxShadow: "0 20px 25px -5px rgba(107, 143, 163, 0.15)" }}
            >
              <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-[#1A2B2F] mb-4 sm:mb-6">
                Un accompagnement et suivi au quotidien
              </h3>
              <ul className="space-y-1.5 sm:space-y-2 md:space-y-4">
                <li className="flex items-start gap-2 sm:gap-3">
                  <span className="text-[#6B8FA3] mt-0.5 sm:mt-1 text-sm sm:text-base">•</span>
                  <span className="text-sm sm:text-base text-[#5B7A9A] flex-1">Guidance personnalisée pour ne jamais te sentir perdu</span>
                </li>
                <li className="flex items-start gap-2 sm:gap-3">
                  <span className="text-[#6B8FA3] mt-0.5 sm:mt-1 text-sm sm:text-base">•</span>
                  <span className="text-sm sm:text-base text-[#5B7A9A] flex-1">Support continu via la communauté et les sessions live</span>
                </li>
                <li className="flex items-start gap-2 sm:gap-3">
                  <span className="text-[#6B8FA3] mt-0.5 sm:mt-1 text-sm sm:text-base">•</span>
                  <span className="text-sm sm:text-base text-[#5B7A9A] flex-1">Coaching pour appliquer la méthode pas à pas</span>
                </li>
              </ul>
            </motion.div>

            {/* Card 3 */}
            <motion.div
              className="bg-white rounded-xl p-4 sm:p-5 md:p-8 border border-[#E6E0F0] shadow-md hover:shadow-lg"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              whileHover={{ translateY: -4, borderColor: "#6B8FA3", boxShadow: "0 20px 25px -5px rgba(107, 143, 163, 0.15)" }}
            >
              <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-[#1A2B2F] mb-4 sm:mb-6">
                Des résultats concrets
              </h3>
              <ul className="space-y-1.5 sm:space-y-2 md:space-y-4">
                <li className="flex items-start gap-2 sm:gap-3">
                  <span className="text-[#6B8FA3] mt-0.5 sm:mt-1 text-sm sm:text-base">•</span>
                  <span className="text-sm sm:text-base text-[#5B7A9A] flex-1">Plus de ventes et de clients</span>
                </li>
                <li className="flex items-start gap-2 sm:gap-3">
                  <span className="text-[#6B8FA3] mt-0.5 sm:mt-1 text-sm sm:text-base">•</span>
                  <span className="text-sm sm:text-base text-[#5B7A9A] flex-1">Gain de temps : fini la dispersion</span>
                </li>
                <li className="flex items-start gap-2 sm:gap-3">
                  <span className="text-[#6B8FA3] mt-0.5 sm:mt-1 text-sm sm:text-base">•</span>
                  <span className="text-sm sm:text-base text-[#5B7A9A] flex-1">Motivation et growth mindset grâce à la communauté</span>
                </li>
              </ul>
            </motion.div>
          </div>

          {/* Results Image */}
          <motion.div
            className="mt-8 sm:mt-12 md:mt-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <motion.img
              src={STOCK_RESULTS}
              alt="Résultats concrets obtenus par les membres de ELAN BC"
              className="w-full rounded-2xl object-cover mb-4"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            />
          </motion.div>
        </div>
      </motion.section>

      {/* 3 Parcours Section */}
      <motion.section
        className="py-12 sm:py-16 md:py-20 lg:py-32 px-4 sm:px-5 bg-gradient-to-br from-[#F5F5F0] to-white border-t-2 border-[#E6E0F0] overflow-hidden"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
      >
        <div className="max-w-screen-sm sm:max-w-screen-md md:max-w-7xl mx-auto">
          <motion.h2
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold text-center mb-8 sm:mb-12 md:mb-16 text-[#1A2B2F] leading-tight"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            🚀 Les 3 parcours de la formation ELAN BC
          </motion.h2>

          {/* Learning Image - Mobile stacked above, desktop could be side-by-side */}
          <motion.div
            className="mb-8 sm:mb-12 md:mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <motion.img
              src={STOCK_LEARNING_ONLINE}
              alt="Parcours de formation en ligne ELAN BC"
              className="w-full rounded-2xl object-cover mb-4"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            />
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
            {/* Starter Card */}
            <motion.div
              className="bg-white rounded-xl p-4 sm:p-5 md:p-8 border border-[#E6E0F0] shadow-md hover:shadow-lg"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              whileHover={{ translateY: -4, borderColor: "#6B8FA3", boxShadow: "0 20px 25px -5px rgba(107, 143, 163, 0.15)" }}
            >
              <div className="mb-4 sm:mb-6">
                <span className="px-3 py-1.5 sm:px-4 sm:py-2 bg-[#F5F5F0] text-[#6B8FA3] text-xs sm:text-sm uppercase tracking-wider rounded-full border border-[#E6E0F0]">
                  Starter
                </span>
              </div>
              <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-[#1A2B2F] mb-4 sm:mb-6">
                Ceux qui démarrent
              </h3>
              <ul className="space-y-1.5 sm:space-y-2 md:space-y-4">
                <li className="flex items-start gap-2 sm:gap-3">
                  <span className="text-[#6B8FA3] mt-0.5 sm:mt-1 text-sm sm:text-base">•</span>
                  <span className="text-sm sm:text-base text-[#5B7A9A] flex-1">Trouve et clarifie ton idée de projet</span>
                </li>
                <li className="flex items-start gap-2 sm:gap-3">
                  <span className="text-[#6B8FA3] mt-0.5 sm:mt-1 text-sm sm:text-base">•</span>
                  <span className="text-sm sm:text-base text-[#5B7A9A] flex-1">Bases solides pour structurer ton projet</span>
                </li>
                <li className="flex items-start gap-2 sm:gap-3">
                  <span className="text-[#6B8FA3] mt-0.5 sm:mt-1 text-sm sm:text-base">•</span>
                  <span className="text-sm sm:text-base text-[#5B7A9A] flex-1">Idée claire et détaillée prête à se lancer</span>
                </li>
                <li className="flex items-start gap-2 sm:gap-3">
                  <span className="text-[#6B8FA3] mt-0.5 sm:mt-1 text-sm sm:text-base">•</span>
                  <span className="text-sm sm:text-base text-[#5B7A9A] flex-1">Pose les fondations pour démarrer vite et en confiance</span>
                </li>
              </ul>
            </motion.div>

            {/* Builder Card */}
            <motion.div
              className="bg-white rounded-xl p-4 sm:p-5 md:p-8 border border-[#E6E0F0] shadow-md hover:shadow-lg"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              whileHover={{ translateY: -4, borderColor: "#6B8FA3", boxShadow: "0 20px 25px -5px rgba(107, 143, 163, 0.15)" }}
            >
              <div className="mb-4 sm:mb-6">
                <span className="px-3 py-1.5 sm:px-4 sm:py-2 bg-[#F5F5F0] text-[#6B8FA3] text-xs sm:text-sm uppercase tracking-wider rounded-full border border-[#E6E0F0]">
                  Builder
                </span>
              </div>
              <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-[#1A2B2F] mb-4 sm:mb-6">
                Entrepreneurs déjà lancés
              </h3>
              <ul className="space-y-1.5 sm:space-y-2 md:space-y-4">
                <li className="flex items-start gap-2 sm:gap-3">
                  <span className="text-[#6B8FA3] mt-0.5 sm:mt-1 text-sm sm:text-base">•</span>
                  <span className="text-sm sm:text-base text-[#5B7A9A] flex-1">Développe ta stratégie marketing et vente</span>
                </li>
                <li className="flex items-start gap-2 sm:gap-3">
                  <span className="text-[#6B8FA3] mt-0.5 sm:mt-1 text-sm sm:text-base">•</span>
                  <span className="text-sm sm:text-base text-[#5B7A9A] flex-1">Organisation et process business optimisés</span>
                </li>
                <li className="flex items-start gap-2 sm:gap-3">
                  <span className="text-[#6B8FA3] mt-0.5 sm:mt-1 text-sm sm:text-base">•</span>
                  <span className="text-sm sm:text-base text-[#5B7A9A] flex-1">Apprends à vendre efficacement tes produits/services</span>
                </li>
                <li className="flex items-start gap-2 sm:gap-3">
                  <span className="text-[#6B8FA3] mt-0.5 sm:mt-1 text-sm sm:text-base">•</span>
                  <span className="text-sm sm:text-base text-[#5B7A9A] flex-1">Transforme ton projet en business rentable et structuré</span>
                </li>
              </ul>
            </motion.div>

            {/* Scaler Card */}
            <motion.div
              className="bg-white rounded-xl p-4 sm:p-5 md:p-8 border border-[#E6E0F0] shadow-md hover:shadow-lg"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.5 }}
              whileHover={{ translateY: -4, borderColor: "#9E9FCC", boxShadow: "0 20px 25px -5px rgba(158, 159, 204, 0.15)" }}
            >
              <div className="mb-4 sm:mb-6">
                <span className="px-3 py-1.5 sm:px-4 sm:py-2 bg-[#F5F5F0] text-[#6B8FA3] text-xs sm:text-sm uppercase tracking-wider rounded-full border border-[#E6E0F0]">
                  Scaler
                </span>
              </div>
              <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-[#1A2B2F] mb-4 sm:mb-6">
                Entrepreneurs établis
              </h3>
              <ul className="space-y-1.5 sm:space-y-2 md:space-y-4">
                <li className="flex items-start gap-2 sm:gap-3">
                  <span className="text-[#6B8FA3] mt-0.5 sm:mt-1 text-sm sm:text-base">•</span>
                  <span className="text-sm sm:text-base text-[#5B7A9A] flex-1">Mise en place de l'écosystème complet</span>
                </li>
                <li className="flex items-start gap-2 sm:gap-3">
                  <span className="text-[#6B8FA3] mt-0.5 sm:mt-1 text-sm sm:text-base">•</span>
                  <span className="text-sm sm:text-base text-[#5B7A9A] flex-1">Optimisation pour scaler sans friction</span>
                </li>
                <li className="flex items-start gap-2 sm:gap-3">
                  <span className="text-[#6B8FA3] mt-0.5 sm:mt-1 text-sm sm:text-base">•</span>
                  <span className="text-sm sm:text-base text-[#5B7A9A] flex-1">Passe d'un business qui fonctionne à un business qui croît durablement</span>
                </li>
              </ul>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Pricing Section */}
      <motion.section
        className="py-12 sm:py-16 md:py-20 lg:py-32 px-4 sm:px-5 bg-white overflow-hidden"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
      >
        <div className="max-w-screen-sm sm:max-w-screen-md md:max-w-7xl mx-auto">
          <motion.h2
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold text-center mb-8 sm:mb-12 md:mb-16 text-[#1A2B2F] leading-tight"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Plans tarifaires ELAN BUSINESS COMMUNITY (ELAN BC)
          </motion.h2>

          {/* Pricing Image */}
          <motion.div
            className="mb-8 sm:mb-12 md:mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <motion.img
              src={STOCK_PRICING}
              alt="Plans tarifaires ELAN BC"
              className="w-full rounded-2xl object-cover mb-4"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            />
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {/* Mensuel */}
            <motion.div
              onClick={scrollToForm}
              className="bg-white rounded-xl p-5 sm:p-6 md:p-8 border border-[#E6E0F0] shadow-md hover:shadow-lg w-full cursor-pointer"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              whileHover={{ translateY: -4, borderColor: "#6B8FA3", boxShadow: "0 20px 25px -5px rgba(107, 143, 163, 0.15)" }}
            >
              <h3 className="text-xl sm:text-2xl font-semibold text-[#1A2B2F] mb-3 sm:mb-4">Mensuel</h3>
              <div className="mb-4 sm:mb-6">
                <span className="text-3xl sm:text-4xl font-bold text-[#6B8FA3]">390 DH</span>
                <span className="text-sm sm:text-base text-[#5B7A9A]"> / mois</span>
              </div>
              <p className="text-sm sm:text-base text-[#5B7A9A] mb-6 sm:mb-8">Accès complet à la communauté et aux formations</p>
              <motion.button
                onClick={scrollToForm}
                className="w-full px-4 sm:px-6 py-3 h-11 bg-[#6B8FA3] text-white text-sm sm:text-base font-semibold rounded-full hover:bg-[#5B7A9A] hover:shadow-lg hover:shadow-[#6B8FA3]/30 transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                Choisir ce plan
              </motion.button>
            </motion.div>

            {/* Trimestre - Highlighted */}
            <motion.div
              onClick={scrollToForm}
              className="bg-white rounded-xl p-5 sm:p-6 md:p-8 border-2 border-[#6B8FA3] shadow-lg shadow-[#6B8FA3]/20 relative w-full cursor-pointer"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              whileHover={{ translateY: -4, boxShadow: "0 20px 25px -5px rgba(107, 143, 163, 0.2)" }}
            >
              <div className="absolute -top-3 sm:-top-4 left-1/2 transform -translate-x-1/2">
                <span className="px-3 sm:px-4 py-1 bg-[#6B8FA3] text-white text-[10px] sm:text-xs uppercase rounded-full">Populaire</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-semibold text-[#1A2B2F] mb-3 sm:mb-4">Trimestre</h3>
              <div className="mb-4 sm:mb-6">
                <span className="text-3xl sm:text-4xl font-bold text-[#6B8FA3]">900 DH</span>
              </div>
              <p className="text-sm sm:text-base text-[#5B7A9A] mb-6 sm:mb-8">+ 30 min de coaching perso pendant Black Friday</p>
              <motion.button
                onClick={scrollToForm}
                className="w-full px-4 sm:px-6 py-3 h-11 bg-[#6B8FA3] text-white text-sm sm:text-base font-semibold rounded-full hover:bg-[#5B7A9A] hover:shadow-lg hover:shadow-[#6B8FA3]/30 transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                Choisir ce plan
              </motion.button>
            </motion.div>

            {/* Semestre */}
            <motion.div
              onClick={scrollToForm}
              className="bg-white rounded-xl p-5 sm:p-6 md:p-8 border border-[#E6E0F0] shadow-md hover:shadow-lg w-full cursor-pointer"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.5 }}
              whileHover={{ translateY: -4, borderColor: "#6B8FA3", boxShadow: "0 20px 25px -5px rgba(107, 143, 163, 0.15)" }}
            >
              <h3 className="text-xl sm:text-2xl font-semibold text-[#1A2B2F] mb-3 sm:mb-4">Semestre</h3>
              <div className="mb-4 sm:mb-6">
                <span className="text-3xl sm:text-4xl font-bold text-[#6B8FA3]">1650 DH</span>
              </div>
              <p className="text-sm sm:text-base text-[#5B7A9A] mb-6 sm:mb-8">+ 45 min de coaching perso pendant Black Friday</p>
              <motion.button
                onClick={scrollToForm}
                className="w-full px-4 sm:px-6 py-3 h-11 bg-[#6B8FA3] text-white text-sm sm:text-base font-semibold rounded-full hover:bg-[#5B7A9A] hover:shadow-lg hover:shadow-[#6B8FA3]/30 transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                Choisir ce plan
              </motion.button>
            </motion.div>

            {/* Année */}
            <motion.div
              onClick={scrollToForm}
              className="bg-white rounded-xl p-5 sm:p-6 md:p-8 border border-[#E6E0F0] shadow-md hover:shadow-lg w-full cursor-pointer"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.6 }}
              whileHover={{ translateY: -4, borderColor: "#6B8FA3", boxShadow: "0 20px 25px -5px rgba(107, 143, 163, 0.15)" }}
            >
              <h3 className="text-xl sm:text-2xl font-semibold text-[#1A2B2F] mb-3 sm:mb-4">Année</h3>
              <div className="mb-4 sm:mb-6">
                <span className="text-3xl sm:text-4xl font-bold text-[#6B8FA3]">3000 DH</span>
              </div>
              <p className="text-sm sm:text-base text-[#5B7A9A] mb-6 sm:mb-8">+ 1h de coaching perso pendant Black Friday</p>
              <motion.button
                onClick={scrollToForm}
                className="w-full px-4 sm:px-6 py-3 h-11 bg-[#6B8FA3] text-white text-sm sm:text-base font-semibold rounded-full hover:bg-[#5B7A9A] hover:shadow-lg hover:shadow-[#6B8FA3]/30 transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                Choisir ce plan
              </motion.button>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Community Section */}
      <motion.section
        className="py-12 sm:py-16 md:py-20 lg:py-32 px-4 sm:px-5 bg-gradient-to-br from-[#F5F5F0] to-white overflow-hidden"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
      >
        <div className="max-w-screen-sm sm:max-w-screen-md md:max-w-7xl mx-auto">
          <div className="flex flex-col md:grid md:grid-cols-2 gap-8 md:gap-8 items-center">
            {/* Left - Image (Mobile: stacked above) */}
            <motion.div
              className="w-full order-2 md:order-1"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <motion.img
                src={STOCK_COMMUNITY}
                alt="Communauté d'entrepreneurs engagés ELAN BC"
                className="w-full rounded-2xl object-cover mb-4 md:mb-0"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              />
            </motion.div>

            {/* Right - Text & Avatars */}
            <motion.div
              className="text-center md:text-left space-y-6 sm:space-y-8 w-full order-1 md:order-2"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold mb-6 sm:mb-8 text-[#1A2B2F] leading-tight">
                Une communauté d'entrepreneurs engagés
              </h2>
              <p className="text-sm sm:text-base md:text-lg text-[#5B7A9A] leading-relaxed mb-8 sm:mb-12 px-2 md:px-0">
                Rejoins une communauté dynamique d'entrepreneurs qui partagent les mêmes objectifs que toi. Entraide, motivation, sessions live et échanges enrichissants t'attendent pour t'accompagner dans ta croissance avec ELAN BC.
              </p>

              {/* Avatar Placeholders */}
              <div className="w-full overflow-x-auto pb-2">
                <div className="flex justify-center md:justify-start items-center gap-3 sm:gap-4 min-w-max px-4 sm:px-0">
                  {['AB', 'CD', 'EF', 'GH', 'IJ', 'KL'].map((initials, index) => (
                    <motion.div
                      key={index}
                      className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full bg-white border-2 border-[#B8D4E0] flex items-center justify-center text-[#5B7A9A] font-semibold text-sm sm:text-base md:text-lg flex-shrink-0"
                      initial={{ opacity: 0, scale: 0 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: 0.4 + index * 0.1 }}
                      whileHover={{ scale: 1.1, borderColor: "#6B8FA3" }}
                    >
                      {initials}
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Final CTA Section */}
      <motion.section
        className="py-12 sm:py-16 md:py-20 lg:py-32 px-4 sm:px-5 bg-white border-t-2 border-[#E6E0F0] overflow-hidden"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
      >
        <div className="max-w-screen-sm sm:max-w-screen-md md:max-w-4xl mx-auto text-center">
          <motion.h2
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold mb-6 sm:mb-8 text-[#1A2B2F] leading-tight px-2"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Prêt(e) à passer de l'incertitude à la clarté… puis à la croissance ?
          </motion.h2>
          <motion.button
            onClick={scrollToForm}
            className="w-full sm:w-auto px-6 sm:px-10 py-4 sm:py-5 h-12 sm:h-auto bg-[#6B8FA3] text-white text-base sm:text-lg font-semibold rounded-full hover:bg-[#5B7A9A] hover:shadow-lg hover:shadow-[#6B8FA3]/30 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#6B8FA3] focus:ring-offset-2 focus:ring-offset-white"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Je rejoins ELAN BC maintenant
          </motion.button>
        </div>
      </motion.section>

      {/* Footer */}
      <footer className="py-8 sm:py-12 px-4 sm:px-5 bg-[#F5F5F0] border-t border-[#E6E0F0] overflow-hidden">
        <div className="max-w-screen-sm sm:max-w-screen-md md:max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-6 md:gap-8">
            <a href="#" className="text-sm sm:text-base text-[#5B7A9A] hover:text-[#6B8FA3] transition-colors duration-300">
              Mentions légales
            </a>
            <a href="#" className="text-sm sm:text-base text-[#5B7A9A] hover:text-[#6B8FA3] transition-colors duration-300">
              Conditions
            </a>
            <a href="#" className="text-sm sm:text-base text-[#5B7A9A] hover:text-[#6B8FA3] transition-colors duration-300">
              Contact
            </a>
          </div>
          <div className="mt-6 sm:mt-8 text-center text-xs sm:text-sm text-[#5B7A9A]">
            © 2024 ELAN BUSINESS COMMUNITY (ELAN BC). Tous droits réservés.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;

