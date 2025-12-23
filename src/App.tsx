import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbxwUbQ-LZ3BQyGtWY80pF9iQFU83U5WtcHjoXuxwDt-x7RvQa8LxaK3Y14qE0-2VVW2ZQ/exec";

const getImagePath = (filename: string): string => {
  const cleanFilename = filename.startsWith('/') ? filename.slice(1) : filename;
  return `/${cleanFilename}`;
};

// Helper pour obtenir le chemin WebP
const getWebPPath = (originalPath: string): string => {
  return originalPath.replace(/\.(png|jpg|jpeg|PNG|JPG|JPEG)$/i, '.webp');
};

const NEW_IMAGE_1 = getImagePath("cover.png");
const NEW_IMAGE_2 = getImagePath("MEITU_20250501_145005910.png");
const STARTER_BG = getImagePath("star.png");
const BUILDER_BG = getImagePath("bui.png");
const SCALER_BG = getImagePath("sca.png");
const TESTIMONIAL_1 = getImagePath("Temoi/1.png");
const TESTIMONIAL_2 = getImagePath("Temoi/2 (1).png");
const TESTIMONIAL_3 = getImagePath("Temoi/3.png");
const TESTIMONIAL_4 = getImagePath("Temoi/5.png");
const TESTIMONIAL_5 = getImagePath("Temoi/6.png");
const TESTIMONIAL_6 = getImagePath("Temoi/8.png");
const TESTIMONIAL_7 = getImagePath("Temoi/9.png");
const TESTIMONIAL_8 = getImagePath("Temoi/25.png");
const TESTIMONIAL_9 = getImagePath("Temoi/27.png");

const ICON_LOUPE = getImagePath("icones/loupe.png");
const ICON_FORMULAIRE = getImagePath("icones/remplir-le-formulaire.png");
const ICON_REJOINDRE = getImagePath("icones/rejoindre.png");
const ICON_CARRIERE = getImagePath("icones/carriere.png");
const ICON_GAGNER = getImagePath("icones/gagner-de-largent.png");
const ICON_PARCOURS = getImagePath("icones/parcours-professionnel.png");
const ICON_MAIN = getImagePath("icones/main.png");
const ICON_FLUX_TRAVAIL = getImagePath("icones/flux-de-travail.png");
const ICON_ORIENTATION = getImagePath("icones/orientation.png");
const ICON_RESSOURCES_HUMAINES = getImagePath("icones/ressources-humaines.png");
const ICON_INSTANTANE = getImagePath("icones/instantane.png");

const App: React.FC = () => {
  // Form state
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    address: '',
    packChoice: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showFormModal, setShowFormModal] = useState(false);
  const [selectedTestimonial, setSelectedTestimonial] = useState<string | null>(null);
  
  
  const WHATSAPP_LINK = "https://api.whatsapp.com/send/?phone=212606212122&text&type=phone_number&app_absent=0";
  const PAYMENT_RIB = {
    bankName: "Bank Atijari",
    accountName: "VENTEF CONSULTING SARL AU",
    ribComplete: "007780 0001175000000650 95"
  };

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (successMessage || errorMessage) {
      setSuccessMessage(null);
      setErrorMessage(null);
    }
  };

  const isValidEmail = (email: string): boolean => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Capture form reference before async operations
    const form = e.currentTarget;
    
    // Clear previous messages
    setSuccessMessage(null);
    setErrorMessage(null);

    // Basic validation
    if (!formData.fullName.trim()) {
      setErrorMessage('Veuillez remplir tous les champs requis.');
      return;
    }
    if (!formData.phone.trim()) {
      setErrorMessage('Veuillez remplir tous les champs requis.');
      return;
    }
    if (!formData.email.trim() || !isValidEmail(formData.email)) {
      setErrorMessage('Veuillez entrer une adresse email valide.');
      return;
    }
    if (!formData.packChoice) {
      setErrorMessage('Veuillez sélectionner un plan.');
      return;
    }

    setIsSubmitting(true);

    try {
      // Build payload with exact field names as required
      const payload = {
        fullName: formData.fullName.trim(),
        phone: formData.phone.trim(),
        email: formData.email.trim(),
        address: formData.address.trim() || '', // Optional field
        packChoice: formData.packChoice
      };

      const iframeName = 'hidden-submit-' + Date.now();
      const iframe = document.createElement('iframe');
      iframe.name = iframeName;
      iframe.style.display = 'none';
      iframe.style.width = '0';
      iframe.style.height = '0';
      iframe.style.border = 'none';
      document.body.appendChild(iframe);
      
      const hiddenForm = document.createElement('form');
      hiddenForm.method = 'POST';
      hiddenForm.action = GOOGLE_SCRIPT_URL;
      hiddenForm.target = iframeName;
      hiddenForm.style.display = 'none';
      
      Object.entries(payload).forEach(([key, value]) => {
        const input = document.createElement('input');
        input.type = 'hidden';
        input.name = key;
        input.value = value as string;
        hiddenForm.appendChild(input);
      });
      
      document.body.appendChild(hiddenForm);
      hiddenForm.submit();
      
      setTimeout(() => {
        try {
          document.body.removeChild(hiddenForm);
          document.body.removeChild(iframe);
        } catch {
          // Elements may have been removed already
        }
      }, 3000);
      
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setErrorMessage(null);
        setFormData({
          fullName: '',
          phone: '',
          email: '',
          address: '',
        packChoice: ''
      });
      
      if (form) {
        form.reset();
      }
      
      setShowFormModal(false);
      setShowPaymentModal(true);
    } catch {
      setErrorMessage(`Une erreur est survenue lors de l'envoi. Merci de réessayer dans quelques instants.`);
      setSuccessMessage(null);
    } finally {
      setIsSubmitting(false);
    }
  };

  const openFormModal = (plan: string) => {
    setFormData(prev => ({
      ...prev,
      packChoice: plan
    }));
    setShowFormModal(true);
    setSuccessMessage(null);
    setErrorMessage(null);
  };

  const scrollToParcours = () => {
    const parcoursSection = document.getElementById('parcours-section');
    if (parcoursSection) {
      parcoursSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const scrollToPricing = () => {
    const pricingSection = document.getElementById('pricing-section');
    if (pricingSection) {
      pricingSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="min-h-screen w-full overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative min-h-screen w-full flex items-center justify-center px-4 sm:px-5 py-4 sm:py-6 md:py-8 overflow-hidden">
        {/* Gradient Blobs Background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            className="absolute top-1/4 -left-1/4 w-96 h-96 rounded-full blur-3xl opacity-15"
            style={{ background: '#E8B4A8' }}
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
            style={{ background: '#E8B4A8' }}
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
            style={{ background: '#F4F4F2' }}
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
          <motion.div
            className="absolute top-1/2 right-1/3 w-64 h-64 rounded-full blur-3xl opacity-10"
            style={{ background: '#E8B4A8' }}
            animate={{
              scale: [1, 1.15, 1],
              x: [0, -30, 0],
              y: [0, 25, 0],
            }}
            transition={{
              duration: 22,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div
            className="absolute bottom-1/3 right-1/4 w-56 h-56 rounded-full blur-3xl opacity-8"
            style={{ background: '#E8B4A8' }}
            animate={{
              scale: [1, 1.2, 1],
              x: [0, 20, 0],
              y: [0, -30, 0],
            }}
            transition={{
              duration: 19,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </div>
        <div className="max-w-screen-sm sm:max-w-screen-md md:max-w-7xl mx-auto w-full relative z-10">
          {/* Centered Content */}
          <div className="flex flex-col items-center text-center space-y-4 sm:space-y-6 md:space-y-8">
            {/* Text Content */}
            <div className="space-y-2 sm:space-y-3 md:space-y-4 w-full">
              {/* Pill Label */}
              <motion.div
                className="inline-block"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
              >
                <span className="px-3 py-1.5 sm:px-4 sm:py-2 bg-luxe-white/90 text-luxe-black text-[10px] sm:text-xs uppercase tracking-wider rounded-full border border-luxe-charcoal/40 shadow-sm font-bold">
                  Système stratégique • Décision • Exécution
                </span>
              </motion.div>

              {/* Main Headline */}
              <motion.h1
                className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl xl:text-7xl text-luxe-black leading-snug sm:leading-tight tracking-wide font-bold"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
              >
                <span className="font-bold">ELAN BUSINESS SYSTEM (EBS)</span>
              </motion.h1>

              {/* Subheadline - Mise en évidence */}
              <motion.p
                className="text-xl sm:text-2xl md:text-3xl lg:text-4xl text-luxe-black font-bold mb-4 sm:mb-5 leading-tight tracking-wide"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
              >
                <span className="text-[#95655E] drop-shadow-[0_2px_4px_rgba(255,255,255,0.5)] font-bold">
                Décide plus vite. Agis juste. Ajuste en continu.
                </span>
              </motion.p>

              {/* Supporting Paragraph */}
              <motion.div
                className="mx-auto max-w-[640px] text-center text-sm sm:text-base md:text-lg text-luxe-charcoal leading-relaxed mb-4 sm:mb-5"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" }}
              >
                <ul className="mt-4 space-y-4">
                  <li className="flex items-start justify-center gap-3">
                    <span className="mt-[2px] shrink-0 text-red-600 text-lg">
                      ❌
                    </span>
                    <p className="text-base md:text-lg leading-relaxed text-[inherit]">
                      Tu n’as pas besoin de plus d’informations.
                    </p>
                  </li>
                  <li className="flex items-start justify-center gap-3">
                    <span className="mt-[2px] shrink-0 text-green-600 text-lg">
                      ✅
                    </span>
                    <p className="text-base md:text-lg leading-relaxed text-[inherit]">
                      Tu as besoin d’un{" "}
                      <span className="font-semibold">cadre clair</span>, de{" "}
                      <span className="font-semibold">décisions assumées</span> et d’un{" "}
                      <span className="font-semibold">rythme d’exécution</span>.
                    </p>
                  </li>
                </ul>
                <p className="mt-4 text-base md:text-lg leading-relaxed text-[inherit]">
                  <span className="text-[#95655E] font-bold">
                    ELAN BUSINESS SYSTEM
                  </span>{" "}
                  est un{" "}
                  <span className="font-semibold">système d’orientation</span>, de{" "}
                  <span className="font-semibold">décision</span> et{" "}
                  <span className="font-semibold">d’exécution</span> pour entrepreneurs dans un marché{" "}
                  <span className="font-semibold">incertain</span>.
                </p>
              </motion.div>
            </div>

            {/* Video - Mobile */}
              <motion.div
              className="md:hidden w-full max-w-2xl"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.5, ease: "easeOut" }}
              >
              <div className="relative w-full aspect-video rounded-lg overflow-hidden border border-luxe-roseGold/30 shadow-md">
                <iframe
                  src="https://player.vimeo.com/video/1147278589?title=0&byline=0&portrait=0"
                  className="absolute top-0 left-0 w-full h-full"
                  frameBorder="0"
                  allow="autoplay; fullscreen; picture-in-picture"
                  allowFullScreen
                  title="Vidéo de présentation EBS"
                  loading="lazy"
                  width="640"
                  height="360"
                ></iframe>
                </div>
              </motion.div>

            {/* Video - Desktop */}
              <motion.div
              className="hidden md:flex w-full max-w-4xl"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            >
              <motion.div
                className="relative w-full aspect-video rounded-lg overflow-hidden border-2 border-luxe-roseGold/30 shadow-lg hover:border-luxe-roseGold/60 hover:shadow-xl transition-all duration-150"
                whileHover={{ scale: 1.01 }}
                    transition={{ duration: 0.3 }}
              >
                <iframe
                  src="https://player.vimeo.com/video/1147278589?title=0&byline=0&portrait=0"
                  className="absolute top-0 left-0 w-full h-full"
                  frameBorder="0"
                  allow="autoplay; fullscreen; picture-in-picture"
                  allowFullScreen
                  title="Vidéo de présentation EBS"
                  loading="lazy"
                  width="1280"
                  height="720"
                ></iframe>
              </motion.div>
              </motion.div>

            {/* CTA Buttons */}
              <motion.div
              className="flex flex-col gap-2 sm:gap-3 w-full max-w-md mx-auto"
              initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.6, ease: "easeOut" }}
              >
                <motion.button
                onClick={() => {
                  setShowFormModal(true);
                  setSuccessMessage(null);
                  setErrorMessage(null);
                }}
                className="w-full px-6 sm:px-8 py-3 h-11 bg-button-cta btn-luxe text-white text-sm sm:text-base font-semibold rounded-full hover:shadow-xl hover:shadow-luxe-roseGold/50 transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-luxe-roseGold focus:ring-offset-2 focus:ring-offset-luxe-cream flex items-center justify-center gap-2"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                >
                <img src={ICON_REJOINDRE} alt="Rejoindre" className="w-4 h-4 sm:w-5 sm:h-5 object-contain flex-shrink-0" width="20" height="20" />
                Intégrer ELAN BUSINESS SYSTEM
                </motion.button>
                <motion.button
                onClick={scrollToParcours}
                className="w-full px-6 sm:px-8 py-3 h-11 border-2 border-luxe-black text-luxe-black bg-transparent text-sm sm:text-base font-semibold rounded-full hover:bg-luxe-black hover:text-luxe-cream transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-luxe-black focus:ring-offset-2 focus:ring-offset-luxe-cream flex items-center justify-center gap-2"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Comprendre le système
                </motion.button>
              </motion.div>

            {/* Button Qui suis-je */}
            <motion.div
              className="w-full flex justify-center mt-4"
              initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.7, ease: "easeOut" }}
            >
              <motion.a
                href="https://nadialakzir.com/a-propos/"
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => {
                  e.preventDefault();
                  window.open('https://nadialakzir.com/a-propos/', '_blank', 'noopener,noreferrer');
                }}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-button-cta btn-luxe text-luxe-cream text-sm font-semibold rounded-full hover:opacity-90 hover:shadow-xl hover:shadow-luxe-roseGold/50 transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-luxe-roseGold focus:ring-offset-2 focus:ring-offset-luxe-cream"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                <img src={ICON_LOUPE} alt="Loupe" className="w-4 h-4 sm:w-5 sm:h-5 object-contain flex-shrink-0" width="20" height="20" />
                Qui suis-je ?
              </motion.a>
          </motion.div>
          </div>

        </div>
      </section>

      {/* Form Modal */}
      <AnimatePresence>
        {showFormModal && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
        initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowFormModal(false)}
          >
          <motion.div
              className="bg-card-luxe card-luxe-panel rounded-xl shadow-2xl max-w-md w-full max-h-[95vh] overflow-y-auto p-4 sm:p-6 relative backdrop-blur-sm border border-luxe-roseGold/30"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => setShowFormModal(false)}
                className="absolute top-3 right-3 text-luxe-charcoal/70 hover:text-luxe-black transition-colors z-10"
              >
                <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              {/* Modal Header */}
              <div className="text-center mb-4 sm:mb-6">
                <h2 className="text-xl sm:text-2xl md:text-3xl font-black text-luxe-black flex items-center justify-center gap-2 sm:gap-3 flex-wrap mb-2">
                  <img src={ICON_FORMULAIRE} alt="Formulaire" className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 object-contain flex-shrink-0" width="32" height="32" />
              Rejoindre ELAN BUSINESS SYSTEM (EBS)
            </h2>
                <p className="text-xs sm:text-sm text-luxe-charcoal">
                  Laisse tes informations et notre équipe te contacte pour t'orienter vers le meilleur parcours et plan.
            </p>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-3">
            {/* Full Name */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <label htmlFor="fullName" className="block text-sm font-medium text-luxe-black">
                Nom complet
              </label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                required
                className="w-full mt-1 rounded-lg bg-luxe-cream border border-luxe-roseGold/30 px-2.5 py-1.5 text-sm text-luxe-black placeholder-luxe-grey/60 focus:outline-none focus:ring-2 focus:ring-luxe-roseGold focus:border-luxe-roseGold transition-all"
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
              <label htmlFor="phone" className="block text-sm font-medium text-luxe-black">
                Numéro de téléphone
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                className="w-full mt-1 rounded-lg bg-luxe-cream border border-luxe-roseGold/30 px-2.5 py-1.5 text-sm text-luxe-black placeholder-luxe-grey/60 focus:outline-none focus:ring-2 focus:ring-luxe-roseGold focus:border-luxe-roseGold transition-all"
                placeholder="0660112233"
              />
            </motion.div>

            {/* Email */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <label htmlFor="email" className="block text-sm font-medium text-luxe-black">
                Adresse email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full mt-1 rounded-lg bg-luxe-cream border border-luxe-roseGold/30 px-2.5 py-1.5 text-sm text-luxe-black placeholder-luxe-grey/60 focus:outline-none focus:ring-2 focus:ring-luxe-roseGold focus:border-luxe-roseGold transition-all"
                placeholder="email@email.com"
              />
            </motion.div>

            {/* Address (champ supprimé de l'UI, conservé en logique interne) */}

            {/* Plan Selection */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <label htmlFor="packChoice" className="flex items-center gap-2 text-sm font-medium text-luxe-black">
                <img src={ICON_MAIN} alt="Plan" className="w-4 h-4 sm:w-5 sm:h-5 object-contain flex-shrink-0" />
                Plan choisi
              </label>
              <select
                id="packChoice"
                name="packChoice"
                value={formData.packChoice}
                onChange={handleChange}
                required
                className="w-full mt-1 rounded-lg bg-luxe-cream border-2 border-luxe-roseGold/40 px-2.5 py-1.5 text-sm font-medium text-luxe-black focus:outline-none focus:ring-2 focus:ring-luxe-roseGold focus:border-luxe-roseGold transition-all shadow-sm hover:shadow-md hover:border-luxe-roseGold/60 cursor-pointer appearance-none bg-[url('data:image/svg+xml;charset=UTF-8,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 24 24%22 fill=%22none%22 stroke=%22%234C1F1A%22 stroke-width=%222%22 stroke-linecap=%22round%22 stroke-linejoin=%22round%22%3E%3Cpath d=%22M6 9l6 6 6-6%22/%3E%3C/svg%3E')] bg-no-repeat bg-right pr-8"
                style={{
                  backgroundPosition: 'right 0.75rem center',
                  backgroundSize: '1.25em 1.25em'
                }}
              >
                <option value="" className="text-luxe-charcoal/70">Sélectionne un plan</option>
                <option
                  value="Mensuel – 455 DH / mois (au lieu de 650 DH)"
                  className="text-luxe-black bg-luxe-cream py-2"
                >
                  Mensuel – 455 DH / mois (au lieu de 650 DH)
                </option>
                <option
                  value="Semestriel – 2 450 DH (au lieu de 3 500 DH)"
                  className="text-luxe-black bg-luxe-cream py-2"
                >
                  Semestriel – 2 450 DH (au lieu de 3 500 DH)
                </option>
              </select>
            </motion.div>

            {/* Submit Button */}
            <motion.button
              type="submit"
              disabled={isSubmitting}
              className="w-full mt-3 rounded-full bg-button-cta btn-luxe py-2 text-sm font-semibold text-luxe-cream shadow-md hover:opacity-90 hover:shadow-lg hover:shadow-luxe-black/40 transition-all duration-150 disabled:opacity-60 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-luxe-black focus:ring-offset-2 focus:ring-offset-luxe-cream flex items-center justify-center gap-2"
              whileHover={isSubmitting ? {} : { scale: 1.02 }}
              whileTap={isSubmitting ? {} : { scale: 0.98 }}
            >
              {isSubmitting ? (
                <>
                  <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Envoi en cours...
                </>
              ) : (
                <>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                  Envoyer ma demande
                </>
              )}
            </motion.button>

            {/* Success Message */}
            {successMessage && (
              <motion.p
                className="mt-3 text-sm text-luxe-black font-semibold text-center"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                {successMessage}
              </motion.p>
            )}

            {/* Error Message */}
            {errorMessage && (
              <motion.p
                className="mt-3 text-sm text-luxe-black/80 text-center"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                {errorMessage}
              </motion.p>
            )}
          </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Conversion Form Section - Hidden (kept for scrollToForm compatibility) */}
      <motion.section
        id="contact-form"
        className="hidden"
      >
      </motion.section>

      {/* Payment Modal */}
      {showPaymentModal && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setShowPaymentModal(false)}
        >
          <motion.div
            className="bg-card-luxe card-luxe-panel rounded-xl shadow-2xl max-w-sm w-full max-h-[95vh] overflow-y-auto p-2.5 sm:p-3 relative backdrop-blur-sm border border-luxe-roseGold/30"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setShowPaymentModal(false)}
              className="absolute top-2 right-2 text-luxe-charcoal/70 hover:text-luxe-black transition-colors z-10"
            >
              <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Modal Content */}
            <div className="space-y-1.5 sm:space-y-2">
              {/* Header */}
              <div className="text-center">
                <motion.div
                  className="w-9 h-9 sm:w-10 sm:h-10 bg-luxe-taupe/20 rounded-full flex items-center justify-center mx-auto mb-1.5"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.1 }}
                >
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 text-luxe-black" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </motion.div>
                <h3 className="text-sm sm:text-base font-bold text-luxe-black mb-0.5">
                  Formulaire envoyé avec succès !
                </h3>
                <p className="text-[9px] sm:text-[10px] text-luxe-charcoal">
                  Merci ! Voici les informations de paiement pour finaliser votre inscription.
                </p>
              </div>

              {/* Payment Information */}
              <div className="bg-card-luxe card-luxe-panel rounded-lg p-2 sm:p-2.5 border border-luxe-roseGold/30 shadow-md">
                <h4 className="text-xs sm:text-sm font-semibold text-luxe-black mb-2 flex items-center gap-1">
                  <svg className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-luxe-black" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z" />
                    <path fillRule="evenodd" d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z" clipRule="evenodd" />
                  </svg>
                  Coordonnées bancaires (RIB)
                </h4>
                <div className="space-y-2 text-[9px] sm:text-[10px]">
                  <div className="flex flex-col gap-1">
                    <span className="text-luxe-charcoal font-medium">RIB :</span>
                    <span className="text-luxe-black font-bold font-mono text-sm sm:text-base break-all">{PAYMENT_RIB.ribComplete}</span>
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="text-luxe-charcoal font-medium">Banque :</span>
                    <span className="text-luxe-black font-semibold break-words">{PAYMENT_RIB.bankName}</span>
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="text-luxe-charcoal font-medium">Titulaire du compte :</span>
                    <span className="text-luxe-black font-semibold break-words">{PAYMENT_RIB.accountName}</span>
                  </div>
                </div>
              </div>

              {/* Payment Methods Section */}
              <div className="space-y-2 mt-2">
                <h4 className="text-xs sm:text-sm font-semibold text-luxe-black text-center mb-1.5">
                  Méthodes de paiement
                </h4>
                
                {/* QR Code Payment */}
                <div className="flex justify-center">
                  <div className="flex flex-col items-center w-24 sm:w-28">
                    <div className="w-full aspect-square bg-luxe-cream rounded-lg border border-luxe-roseGold/30 shadow-md flex items-center justify-center p-1.5 hover:border-luxe-roseGold/60 transition-all duration-150">
                      <img 
                        src={getImagePath("rib.png")} 
                        alt="QR Code RIB" 
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <p className="mt-1 text-[8px] sm:text-[9px] font-medium text-luxe-black text-center leading-tight">QR compte bancaire</p>
                  </div>
                </div>
              </div>

              {/* WhatsApp Button */}
              <motion.a
                href={WHATSAPP_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-1.5 bg-[#25D366] text-white px-2.5 py-1.5 rounded-full font-semibold text-[10px] sm:text-xs hover:bg-[#20BA5A] shadow-lg hover:shadow-xl transition-all duration-150 mt-1.5"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                </svg>
                <span>Contacter via WhatsApp</span>
              </motion.a>

              {/* Info Text */}
              <p className="text-[8px] sm:text-[9px] text-center text-luxe-charcoal/70 mt-1 pb-1 leading-tight">
                Après le paiement, contactez-nous sur WhatsApp pour confirmer votre inscription.
                </p>
              </div>
          </motion.div>
        </motion.div>
      )}

      {/* Why EBS Section */}
      <motion.section
          className="w-full py-8 sm:py-10 md:py-12 lg:py-16 px-4 sm:px-5 overflow-hidden"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
      >
        <div className="max-w-screen-sm sm:max-w-screen-md md:max-w-7xl mx-auto w-full">
          <motion.h2
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-center mb-6 sm:mb-8 text-luxe-black leading-tight"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="flex items-center justify-center gap-3 flex-wrap">
              <img src={ICON_CARRIERE} alt="Carrière" className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 object-contain flex-shrink-0" />
            Pourquoi ELAN BUSINESS SYSTEM et pas une autre formation ?
            </span>
          </motion.h2>
          
          {/* Introduction Text */}
          <div className="max-w-3xl mx-auto mb-8 sm:mb-10 md:mb-12 text-center">
            <motion.p
              className="text-sm sm:text-base md:text-lg lg:text-xl text-luxe-charcoal leading-relaxed mb-4 sm:mb-5"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Parce que la réalité est simple — et rarement dite :
            </motion.p>
          </div>

          {/* Cards Grid - 2 per row, 4 cards total */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 md:gap-8 max-w-5xl mx-auto">
              {[
                { icon: ICON_FLUX_TRAVAIL, text: "Les formations longues sont rarement terminées" },
                { icon: ICON_RESSOURCES_HUMAINES, text: "Les communautés créent peu d’actions concrètes" },
                { icon: ICON_INSTANTANE, text: "L’information seule ne produit pas de résultats" },
                { icon: ICON_ORIENTATION, text: "Le manque de clarté bloque la progression" },
              ].map((item, index) => (
                  <motion.div
                    key={index}
                className="group bg-card-luxe card-luxe-panel rounded-lg p-5 sm:p-6 md:p-8 border border-luxe-roseGold/30 shadow-md hover:shadow-xl hover:border-luxe-roseGold/60 w-full cursor-pointer flex flex-col transition-all duration-150"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                whileHover={{ translateY: -8, borderColor: "#E8B4A8", boxShadow: "0 25px 50px -12px rgba(48, 45, 44, 0.25)", scale: 1.02 }}
              >
                <div className="mb-3 flex justify-center">
                  <img src={item.icon} alt={item.text} className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 object-contain" />
                  </div>
                <p className="text-sm sm:text-base md:text-lg font-semibold text-luxe-black flex-1 text-center transition-colors duration-150 group-hover:text-luxe-charcoal">
                  {item.text}
                </p>
                  </motion.div>
              ))}
            </div>
          <div className="max-w-3xl mx-auto mt-8 sm:mt-10 md:mt-12 text-center">
            <motion.p
              className="text-sm sm:text-base md:text-lg lg:text-xl text-luxe-charcoal leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              Avec EBS, tu n’es jamais livré(e) à toi-même.
              <br />
              Tu es orienté(e), encadré(e) et accompagné(e) dans chaque décision clé.
            </motion.p>
          </div>
        </div>
      </motion.section>

      {/* Benefits Section */}
      <motion.section
          id="benefits-section"
          className="relative w-full py-8 sm:py-10 md:py-12 lg:py-16 px-4 sm:px-5 overflow-hidden"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
      >
        {/* Background */}
        <div className="absolute inset-0" />
        
        <div className="relative z-10 max-w-screen-sm sm:max-w-screen-md md:max-w-7xl mx-auto">
          <motion.h2
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-center mb-6 sm:mb-8 md:mb-10 text-luxe-black leading-tight"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="flex items-center justify-center gap-3 flex-wrap">
              <img src={ICON_GAGNER} alt="Gagner de l'argent" className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 object-contain flex-shrink-0" />
            Ce que tu obtiens avec ELAN BUSINESS SYSTEM
            </span>
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-6">
            {/* Card 1 */}
            <motion.div
              className="group bg-card-luxe card-luxe-panel rounded-xl p-4 sm:p-5 md:p-8 border border-luxe-roseGold/30 shadow-md hover:shadow-xl hover:border-luxe-roseGold/60 transition-all duration-150"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              whileHover={{ translateY: -6, borderColor: "#E8B4A8", boxShadow: "0 25px 50px -12px rgba(48, 45, 44, 0.25)", scale: 1.02 }}
            >
              <motion.h3 
                className="text-lg sm:text-xl md:text-2xl font-semibold text-luxe-black mb-4 sm:mb-6 transition-colors duration-150 group-hover:text-luxe-charcoal"
                whileHover={{ scale: 1.05 }}
              >
                Un système de décision clair
              </motion.h3>
              <ul className="space-y-1.5 sm:space-y-2 md:space-y-4">
                <li className="flex items-start gap-2 sm:gap-3">
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 text-luxe-roseGold mt-0.5 sm:mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-sm sm:text-base text-luxe-charcoal flex-1">Analyser, choisir et agir sans hésitation inutile.</span>
                </li>
              </ul>
            </motion.div>

            {/* Card 2 */}
            <motion.div
              className="group bg-card-luxe card-luxe-panel rounded-xl p-4 sm:p-5 md:p-8 border border-luxe-roseGold/30 shadow-md hover:shadow-xl hover:border-luxe-roseGold/60 transition-all duration-150"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              whileHover={{ translateY: -6, borderColor: "#E8B4A8", boxShadow: "0 25px 50px -12px rgba(48, 45, 44, 0.25)", scale: 1.02 }}
            >
              <motion.h3 
                className="text-lg sm:text-xl md:text-2xl font-semibold text-luxe-black mb-4 sm:mb-6 transition-colors duration-150 group-hover:text-luxe-charcoal"
                whileHover={{ scale: 1.05 }}
              >
                Un accompagnement stratégique réel
              </motion.h3>
              <ul className="space-y-1.5 sm:space-y-2 md:space-y-4">
                <li className="flex items-start gap-2 sm:gap-3">
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 text-luxe-roseGold mt-0.5 sm:mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-sm sm:text-base text-luxe-charcoal flex-1">Des décisions guidées, pas du contenu à consommer passivement.</span>
                </li>
              </ul>
            </motion.div>

            {/* Card 3 */}
            <motion.div
              className="group bg-card-luxe card-luxe-panel rounded-xl p-4 sm:p-5 md:p-8 border border-luxe-roseGold/30 shadow-md hover:shadow-xl hover:border-luxe-roseGold/60 transition-all duration-150"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              whileHover={{ translateY: -6, borderColor: "#E8B4A8", boxShadow: "0 25px 50px -12px rgba(48, 45, 44, 0.25)", scale: 1.02 }}
            >
              <motion.h3 
                className="text-lg sm:text-xl md:text-2xl font-semibold text-luxe-black mb-4 sm:mb-6 transition-colors duration-150 group-hover:text-luxe-charcoal"
                whileHover={{ scale: 1.05 }}
              >
                Des résultats concrets sur le terrain
              </motion.h3>
              <ul className="space-y-1.5 sm:space-y-2 md:space-y-4">
                <li className="flex items-start gap-2 sm:gap-3">
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 text-luxe-roseGold mt-0.5 sm:mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-sm sm:text-base text-luxe-charcoal flex-1">Stratégie, exécution, ajustement — en continu.</span>
                </li>
              </ul>
            </motion.div>
            </div>

          {/* Results Image */}
          <motion.div
            className="mt-6 sm:mt-8 md:mt-10"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <motion.picture className="w-full rounded-2xl mb-4">
              <source srcSet={getWebPPath(NEW_IMAGE_1)} type="image/webp" />
            <motion.img
              src={NEW_IMAGE_1}
              alt="Résultats concrets obtenus par les membres de EBS"
                className="w-full rounded-2xl object-cover"
                width="1200"
                height="675"
                loading="lazy"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            />
            </motion.picture>
          </motion.div>
          </div>
      </motion.section>

      {/* 3 Parcours Section */}
      <motion.section
          id="parcours-section"
          className="w-full py-8 sm:py-10 md:py-12 lg:py-16 px-4 sm:px-5 overflow-hidden"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
      >
        <div className="max-w-screen-sm sm:max-w-screen-md md:max-w-7xl mx-auto w-full">
          <motion.h2
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-center mb-6 sm:mb-8 md:mb-10 text-luxe-black leading-tight"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="flex items-center justify-center gap-3 flex-wrap">
              <img src={ICON_PARCOURS} alt="Parcours professionnel" className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 object-contain flex-shrink-0" />
              Le programme ELAN BUSINESS SYSTEM – 6 mois
            </span>
          </motion.h2>

          {/* Learning Image - Mobile stacked above, desktop could be side-by-side */}
          <motion.div
            className="mb-6 sm:mb-8 md:mb-10"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <motion.picture className="w-full rounded-2xl mb-4">
              <source srcSet={getWebPPath(NEW_IMAGE_2)} type="image/webp" />
            <motion.img
              src={NEW_IMAGE_2}
                alt="Parcours de l'Academy en ligne EBS"
                className="w-full rounded-2xl object-cover"
                width="1200"
                height="675"
                loading="lazy"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            />
            </motion.picture>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-6">
            {/* Starter Card */}
            <motion.div
              className="group relative rounded-xl p-4 sm:p-5 md:p-8 border border-luxe-roseGold/30 shadow-md hover:shadow-xl hover:border-luxe-roseGold/60 transition-all duration-150 overflow-hidden"
              style={{
                backgroundImage: `url(${STARTER_BG})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat'
              }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              whileHover={{ translateY: -6, borderColor: "#E8B4A8", boxShadow: "0 25px 50px -12px rgba(48, 45, 44, 0.25)", scale: 1.02 }}
            >
              {/* Overlay for readability */}
              <div className="absolute inset-0 bg-gradient-to-b from-white/60 via-white/55 to-white/65 rounded-xl"></div>
              <div className="relative z-10">
              <div className="mb-4 sm:mb-6">
                <motion.span 
                  className="px-3 py-1.5 sm:px-4 sm:py-2 bg-section-gradient text-luxe-black text-xs sm:text-sm uppercase tracking-wider rounded-full border border-luxe-roseGold/30 transition-all duration-150 group-hover:bg-button-cta group-hover:text-white group-hover:border-luxe-roseGold/60 inline-block"
                  whileHover={{ scale: 1.05 }}
                >
                  Mois 1–2
                </motion.span>
              </div>
              <motion.h3 
                className="text-lg sm:text-xl md:text-2xl font-semibold text-luxe-black mb-4 sm:mb-6 transition-colors duration-150 group-hover:text-luxe-charcoal"
                whileHover={{ scale: 1.05 }}
              >
              </motion.h3>
              <ul className="space-y-1.5 sm:space-y-2 md:space-y-4">
                <li className="flex items-start gap-2 sm:gap-3">
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 text-luxe-roseGold mt-0.5 sm:mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-sm sm:text-base text-luxe-charcoal flex-1">Clarté stratégique & posture du leader</span>
                </li>
                <li className="flex items-start gap-2 sm:gap-3">
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 text-luxe-roseGold mt-0.5 sm:mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-sm sm:text-base text-luxe-charcoal flex-1">Positionnement & client idéal</span>
                </li>
              </ul>
              </div>
            </motion.div>

            {/* Builder Card */}
            <motion.div
              className="group relative rounded-xl p-4 sm:p-5 md:p-8 border border-luxe-roseGold/30 shadow-md hover:shadow-xl hover:border-luxe-roseGold/60 transition-all duration-150 overflow-hidden"
              style={{
                backgroundImage: `url(${BUILDER_BG})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat'
              }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              whileHover={{ translateY: -6, borderColor: "#E8B4A8", boxShadow: "0 25px 50px -12px rgba(48, 45, 44, 0.25)", scale: 1.02 }}
            >
              {/* Overlay for readability */}
              <div className="absolute inset-0 bg-gradient-to-b from-white/60 via-white/55 to-white/65 rounded-xl"></div>
              <div className="relative z-10">
              <div className="mb-4 sm:mb-6">
                <motion.span 
                  className="px-3 py-1.5 sm:px-4 sm:py-2 bg-section-gradient text-luxe-black text-xs sm:text-sm uppercase tracking-wider rounded-full border border-luxe-roseGold/30 transition-all duration-150 group-hover:bg-button-cta group-hover:text-white group-hover:border-luxe-roseGold/60 inline-block"
                  whileHover={{ scale: 1.05 }}
                >
                  Mois 3–4
                </motion.span>
              </div>
              <motion.h3 
                className="text-lg sm:text-xl md:text-2xl font-semibold text-luxe-black mb-4 sm:mb-6 transition-colors duration-150 group-hover:text-luxe-charcoal"
                whileHover={{ scale: 1.05 }}
              >
              </motion.h3>
              <ul className="space-y-1.5 sm:space-y-2 md:space-y-4">
                <li className="flex items-start gap-2 sm:gap-3">
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 text-luxe-roseGold mt-0.5 sm:mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-sm sm:text-base text-luxe-charcoal flex-1">Offres & tarification intelligente</span>
                </li>
                <li className="flex items-start gap-2 sm:gap-3">
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 text-luxe-roseGold mt-0.5 sm:mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-sm sm:text-base text-luxe-charcoal flex-1">Stratégie d'acquisition client</span>
                </li>
              </ul>
              </div>
            </motion.div>

            {/* Scaler Card */}
            <motion.div
              className="group relative rounded-xl p-4 sm:p-5 md:p-8 border border-luxe-roseGold/30 shadow-md hover:shadow-xl hover:border-luxe-roseGold/60 transition-all duration-150 overflow-hidden"
              style={{
                backgroundImage: `url(${SCALER_BG})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat'
              }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.5 }}
              whileHover={{ translateY: -6, borderColor: "#E8B4A8", boxShadow: "0 25px 50px -12px rgba(48, 45, 44, 0.25)", scale: 1.02 }}
            >
              {/* Overlay for readability */}
              <div className="absolute inset-0 bg-gradient-to-b from-white/60 via-white/55 to-white/65 rounded-xl"></div>
              <div className="relative z-10">
              <div className="mb-4 sm:mb-6">
                <motion.span 
                  className="px-3 py-1.5 sm:px-4 sm:py-2 bg-section-gradient text-luxe-black text-xs sm:text-sm uppercase tracking-wider rounded-full border border-luxe-roseGold/30 transition-all duration-150 group-hover:bg-button-cta group-hover:text-white group-hover:border-luxe-roseGold/60 inline-block"
                  whileHover={{ scale: 1.05 }}
                >
                  Mois 5–6
                </motion.span>
              </div>
              <motion.h3 
                className="text-lg sm:text-xl md:text-2xl font-semibold text-luxe-black mb-4 sm:mb-6 transition-colors duration-150 group-hover:text-luxe-charcoal"
                whileHover={{ scale: 1.05 }}
              >
              </motion.h3>
              <ul className="space-y-1.5 sm:space-y-2 md:space-y-4">
                <li className="flex items-start gap-2 sm:gap-3">
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 text-luxe-roseGold mt-0.5 sm:mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-sm sm:text-base text-luxe-charcoal flex-1">Vente & closing</span>
                </li>
                <li className="flex items-start gap-2 sm:gap-3">
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 text-luxe-roseGold mt-0.5 sm:mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-sm sm:text-base text-luxe-charcoal flex-1">Optimisation & montée en puissance</span>
                </li>
              </ul>
              </div>
            </motion.div>
            </div>
          </div>
      </motion.section>

      {/* Pricing Section */}
      <motion.section
        id="pricing-section"
          className="w-full py-8 sm:py-10 md:py-12 lg:py-16 px-4 sm:px-5 overflow-hidden"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
      >
        <div className="max-w-screen-sm sm:max-w-screen-md md:max-w-7xl mx-auto w-full">
          <motion.h2
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-center mb-6 sm:mb-8 md:mb-10 text-luxe-black leading-tight"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="flex items-center justify-center gap-3 flex-wrap">
              <img src={ICON_MAIN} alt="Plans tarifaires" className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 object-contain flex-shrink-0" />
            Plans tarifaires ELAN BUSINESS SYSTEM (EBS)
            </span>
          </motion.h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4 sm:gap-6">
            {/* Semestre */}
            <motion.div
              className="group bg-card-luxe card-luxe-panel rounded-lg p-5 sm:p-6 md:p-8 border border-luxe-roseGold/30 shadow-md hover:shadow-xl hover:border-luxe-roseGold/60 w-full cursor-pointer flex flex-col transition-all duration-150"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              whileHover={{ translateY: -8, borderColor: "#E8B4A8", boxShadow: "0 25px 50px -12px rgba(48, 45, 44, 0.25)" }}
            >
              <motion.h3 
                className="text-xl sm:text-2xl font-semibold text-luxe-black mb-3 sm:mb-4 transition-colors duration-150 group-hover:text-luxe-charcoal"
                whileHover={{ scale: 1.05 }}
              >
                Plan Semestriel
              </motion.h3>
              <div className="mb-2 sm:mb-2.5">
                <span className="inline-flex items-center px-2 py-1 rounded-full bg-luxe-roseGold/10 border border-luxe-roseGold/40 text-[10px] sm:text-xs font-semibold text-luxe-black">
                  Le + avantageux
                </span>
              </div>
              <p className="text-sm sm:text-base text-luxe-charcoal mb-2 sm:mb-2.5 transition-colors duration-150 group-hover:text-luxe-black">
                💎 Engagement & vision sur 6 mois
              </p>
              <div className="mb-1 sm:mb-1.5">
                <span className="text-sm sm:text-base text-luxe-charcoal line-through">
                  3 500 DH
                </span>
              </div>
              <div className="mb-2 sm:mb-3 flex flex-wrap items-baseline gap-x-2 gap-y-1">
                <motion.span 
                  className="text-3xl sm:text-4xl font-bold text-luxe-black inline-block transition-all duration-150"
                  whileHover={{ scale: 1.1 }}
                >
                  2 450 DH
                </motion.span>
                <span className="text-sm sm:text-base text-luxe-charcoal transition-colors duration-150 group-hover:text-luxe-black">
                  / 6 mois
                </span>
                <span className="text-[10px] sm:text-xs text-red-700">
                  Promo jusqu'au 28/12/2025
                </span>
              </div>
              <p className="text-[11px] sm:text-xs text-luxe-charcoal mb-3 sm:mb-4 transition-colors duration-150 group-hover:text-luxe-black">
                ⭐ Le meilleur rapport valeur / prix
              </p>
              <ul className="text-xs sm:text-sm text-luxe-charcoal space-y-1.5 sm:space-y-2 mb-4 sm:mb-6 transition-colors duration-150 group-hover:text-luxe-black">
                <li className="flex items-start gap-2">
                  <svg className="w-3 h-3 sm:w-4 sm:h-4 text-luxe-roseGold mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  <span>Avance plus vite avec une dynamique de groupe</span>
                </li>
                <li className="flex items-start gap-2">
                  <svg className="w-3 h-3 sm:w-4 sm:h-4 text-luxe-roseGold mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                  <span>Meilleure transformation & résultats</span>
                </li>
                <li className="flex items-start gap-2">
                  <svg className="w-3 h-3 sm:w-4 sm:h-4 text-luxe-roseGold mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                  <span>Accompagnement stratégique sur 6 mois</span>
                </li>
              </ul>
              <div className="flex-1"></div>
              <motion.button
                onClick={(e) => {
                  e.stopPropagation();
                  openFormModal('Semestriel – 2 450 DH (au lieu de 3 500 DH)');
                }}
                className="w-full px-4 sm:px-6 py-3 h-11 bg-button-cta btn-luxe text-luxe-cream text-sm sm:text-base font-semibold rounded-full hover:opacity-90 hover:shadow-lg hover:shadow-luxe-black/50 transition-all duration-150 flex items-center justify-center gap-2"
                whileHover={{ scale: 1.05, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.3)" }}
                whileTap={{ scale: 0.98 }}
              >
                <svg className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Choisir ce plan</span>
              </motion.button>
            </motion.div>
            {/* Mensuel */}
            <motion.div
              className="group bg-card-luxe card-luxe-panel rounded-lg p-5 sm:p-6 md:p-8 border border-luxe-roseGold/30 shadow-md hover:shadow-xl hover:border-luxe-roseGold/60 w-full cursor-pointer flex flex-col transition-all duration-150"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.5 }}
              whileHover={{ translateY: -8, borderColor: "#E8B4A8", boxShadow: "0 25px 50px -12px rgba(48, 45, 44, 0.25)" }}
            >
              <motion.h3 
                className="text-xl sm:text-2xl font-semibold text-luxe-black mb-3 sm:mb-4 transition-colors duration-150 group-hover:text-luxe-charcoal"
                whileHover={{ scale: 1.05 }}
              >
                Plan Mensuel
              </motion.h3>
              <p className="text-sm sm:text-base text-luxe-charcoal mb-2 sm:mb-2.5 transition-colors duration-150 group-hover:text-luxe-black">
                🔄 Flexibilité mois par mois
              </p>
              <div className="mb-1 sm:mb-1.5">
                <span className="text-sm sm:text-base text-luxe-charcoal line-through">
                  650 DH / mois
                </span>
              </div>
              <div className="mb-3 sm:mb-4 flex flex-wrap items-baseline gap-x-2 gap-y-1">
                <motion.span 
                  className="text-3xl sm:text-4xl font-bold text-luxe-black inline-block transition-all duration-150"
                  whileHover={{ scale: 1.1 }}
                >
                  455 DH
                </motion.span>
                <span className="text-sm sm:text-base text-luxe-charcoal transition-colors duration-150 group-hover:text-luxe-black">
                  / mois
                </span>
                <span className="text-[10px] sm:text-xs text-red-700">
                  Promo jusqu'au 28/12/2025
                </span>
              </div>
              <p className="text-[11px] sm:text-xs text-luxe-charcoal mb-3 sm:mb-4 transition-colors duration-150 group-hover:text-luxe-black">
                Idéal pour commencer
              </p>
              <ul className="text-xs sm:text-sm text-luxe-charcoal space-y-1.5 sm:space-y-2 mb-4 sm:mb-6 transition-colors duration-150 group-hover:text-luxe-black">
                <li className="flex items-start gap-2">
                  <svg className="w-3 h-3 sm:w-4 sm:h-4 text-luxe-roseGold mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>Avance à ton rythme</span>
                </li>
                <li className="flex items-start gap-2">
                  <svg className="w-3 h-3 sm:w-4 sm:h-4 text-luxe-roseGold mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                  <span>Découverte progressive</span>
                </li>
                <li className="flex items-start gap-2">
                  <svg className="w-3 h-3 sm:w-4 sm:h-4 text-luxe-roseGold mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
                  </svg>
                  <span>Accès possible en cours de route</span>
                </li>
              </ul>
              <div className="flex-1"></div>
              <motion.button
                onClick={(e) => {
                  e.stopPropagation();
                  openFormModal('Mensuel – 455 DH/mois (au lieu de 650 DH/mois)');
                }}
                className="w-full px-4 sm:px-6 py-3 h-11 bg-button-cta btn-luxe text-luxe-cream text-sm sm:text-base font-semibold rounded-full hover:opacity-90 hover:shadow-lg hover:shadow-luxe-black/50 transition-all duration-150 flex items-center justify-center gap-2"
                whileHover={{ scale: 1.05, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.3)" }}
                whileTap={{ scale: 0.98 }}
              >
                <svg className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Choisir ce plan</span>
              </motion.button>
            </motion.div>
            </div>
          </div>
      </motion.section>

      {/* System Section */}
      <motion.section
          className="w-full py-8 sm:py-10 md:py-12 lg:py-16 px-4 sm:px-5 overflow-hidden"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
      >
        <div className="max-w-screen-sm sm:max-w-screen-md md:max-w-7xl mx-auto w-full">
          <div className="flex flex-col gap-6 md:gap-6">
            {/* Texte uniquement - image de communauté supprimée */}
            <motion.div
              className="text-center space-y-4 sm:space-y-5 w-full"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black mb-4 sm:mb-6 text-luxe-black leading-tight flex items-center justify-center gap-3">
            <svg className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 text-luxe-roseGold flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            Un cadre d'exécution structuré
          </h2>
              <p className="text-sm sm:text-base md:text-lg text-luxe-charcoal leading-relaxed mb-6 sm:mb-8 px-2">
                Tu avances dans un environnement structuré où chaque entrepreneur exécute, ajuste et progresse à partir de situations réelles. Ici, le collectif sert à clarifier les décisions, confronter les stratégies et maintenir un rythme d'action constant.
          </p>
            </motion.div>
        </div>
        </div>
      </motion.section>

      {/* Testimonials from Instagram Section */}
      <motion.section
        className="w-full py-8 sm:py-10 md:py-12 lg:py-16 px-4 sm:px-5 overflow-hidden"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
      >
        <div className="max-w-screen-sm sm:max-w-screen-md md:max-w-7xl mx-auto w-full">
          <motion.h2
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-center mb-6 sm:mb-8 md:mb-10 text-luxe-black leading-tight flex items-center justify-center gap-3"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <svg className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 text-luxe-roseGold flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
            Témoignages Instagram
          </motion.h2>

          <p className="text-center text-base sm:text-lg text-luxe-charcoal mb-8 sm:mb-10 max-w-2xl mx-auto flex items-center justify-center gap-2">
            <svg className="w-5 h-5 text-luxe-roseGold flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            Découvre les témoignages authentiques de notre communauté sur Instagram
          </p>
          
          {/* Testimonials Grid - 3 columns */}
          <div className="grid grid-cols-3 gap-3 sm:gap-4 md:gap-6">
            {[
              TESTIMONIAL_1,
              TESTIMONIAL_2,
              TESTIMONIAL_3,
              TESTIMONIAL_4,
              TESTIMONIAL_5,
              TESTIMONIAL_6,
              TESTIMONIAL_7,
              TESTIMONIAL_8,
              TESTIMONIAL_9,
            ].map((testimonialImage, index) => {
              const gradientVariants = [
                'from-luxe-black via-luxe-roseGold to-luxe-black',
                'from-luxe-roseGold via-luxe-black to-luxe-roseGold',
                'from-luxe-black via-luxe-roseGold to-luxe-black',
              ];
              const gradientClass = gradientVariants[index % 3];
              
              return (
                    <motion.div
                  key={index}
                  className="group relative bg-luxe-cream rounded-lg sm:rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border-2 border-luxe-roseGold/40 hover:border-luxe-roseGold/70 cursor-pointer aspect-square"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ translateY: -4, scale: 1.02 }}
                  onClick={() => setSelectedTestimonial(testimonialImage)}
                >
                  {/* Decorative gradient overlay */}
                  <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${gradientClass} opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10`}></div>
                  
                  {/* Testimonial Image */}
            <motion.img
                    src={testimonialImage}
                    alt={`Témoignage ${index + 1} - EBS`}
                    className="w-full h-full object-cover"
                    width="400"
                    height="400"
                    loading="lazy"
                    whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            />
                  
                  {/* Overlay hint */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <div className="bg-white/90 rounded-full p-3 shadow-lg transform scale-90 group-hover:scale-100 transition-transform duration-300">
                      <svg className="w-6 h-6 text-luxe-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                      </svg>
            </div>
          </div>
            </motion.div>
              );
            })}
        </div>
          
          <motion.div 
            className="mt-10 sm:mt-12 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <a 
              href="https://www.instagram.com/lakzirnadia/" 
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-3 px-8 py-4 bg-button-cta btn-luxe text-white font-semibold rounded-full hover:opacity-90 transition-all duration-300 shadow-xl hover:shadow-2xl hover:shadow-luxe-roseGold/50 hover:scale-105"
            >
              <svg className="w-6 h-6 group-hover:rotate-12 transition-transform duration-300" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
              <span className="text-base sm:text-lg">Voir plus sur Instagram</span>
              <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </a>
          </motion.div>
        </div>
      </motion.section>

      {/* Testimonial Modal */}
      <AnimatePresence>
        {selectedTestimonial && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
        initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedTestimonial(null)}
          >
          <motion.div
              className="relative max-w-4xl w-full max-h-[90vh]"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedTestimonial(null)}
                className="absolute -top-10 right-0 text-white hover:text-luxe-roseGold transition-colors z-10"
              >
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              
              {/* Image */}
            <motion.img
              src={selectedTestimonial}
                alt="Témoignage EBS"
                className="w-full h-auto rounded-lg shadow-2xl object-contain max-h-[90vh]"
                width="800"
                height="800"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1 }}
            />
          </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Final CTA Section */}
      <motion.section
          className="w-full py-8 sm:py-10 md:py-12 lg:py-16 px-4 sm:px-5 overflow-hidden"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
      >
        <div className="max-w-screen-sm sm:max-w-screen-md md:max-w-4xl mx-auto text-center">
          <motion.h2
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black mb-6 sm:mb-8 text-luxe-black leading-tight px-2"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="flex items-center justify-center gap-3 flex-wrap">
              <img src={ICON_REJOINDRE} alt="Rejoindre" className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 object-contain flex-shrink-0" />
            Prêt(e) à passer de l'incertitude à la clarté… puis à la croissance ?
            </span>
          </motion.h2>
          <motion.button
            onClick={() => {
              setShowFormModal(true);
              setSuccessMessage(null);
              setErrorMessage(null);
            }}
            className="w-full sm:w-auto px-6 sm:px-10 py-4 sm:py-5 h-12 sm:h-auto bg-button-cta btn-luxe text-white text-base sm:text-lg font-semibold rounded-full hover:opacity-90 hover:shadow-xl hover:shadow-luxe-roseGold/50 transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-luxe-roseGold focus:ring-offset-2 focus:ring-offset-luxe-cream flex items-center justify-center gap-2 mx-auto"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <img src={ICON_REJOINDRE} alt="Rejoindre" className="w-5 h-5 sm:w-6 sm:h-6 object-contain flex-shrink-0" />
            Je rejoins EBS maintenant
          </motion.button>
        </div>
      </motion.section>

      {/* Footer */}
        <footer className="w-full py-8 sm:py-12 px-4 sm:px-5 bg-luxe-charcoal border-t border-luxe-roseGold/30 overflow-hidden">
        <div className="max-w-screen-sm sm:max-w-screen-md md:max-w-7xl mx-auto w-full">
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-6 md:gap-8">
            <a href="#" className="text-sm sm:text-base text-luxe-cream/90 hover:text-luxe-cream transition-colors duration-150 flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Mentions légales
            </a>
            <a href="#" className="text-sm sm:text-base text-luxe-cream/90 hover:text-luxe-cream transition-colors duration-150 flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Conditions
            </a>
            <a href="#" className="text-sm sm:text-base text-luxe-cream/90 hover:text-luxe-cream transition-colors duration-150 flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              Contact
            </a>
          </div>
          <div className="mt-6 sm:mt-8 text-center text-xs sm:text-sm text-luxe-cream/70">
            © 2025 ELAN BUSINESS SYSTEM (EBS). Tous droits réservés.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;

