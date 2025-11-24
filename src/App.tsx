import React, { useState } from 'react';
import { motion } from 'framer-motion';

// Google Apps Script endpoint
// GOOGLE_SCRIPT_URL points to the Apps Script Web App that writes into our Google Sheet.
// Make sure the script accepts POST, is deployed as "Anyone", and returns JSON: { status: "success" | "error", message?: string }
const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbyp4hpmEnS_r3BFVNVo1Tegjc1qUgJoSqKjkj1tCxLp4BSF4iWiNBoJKUylCeMdiAv9IQ/exec";

// Helper function to get correct image path for Vercel
// Vercel serves files from public/ at the root, so we use absolute paths
const getImagePath = (filename: string): string => {
  // Remove leading slash if present to avoid double slashes
  const cleanFilename = filename.startsWith('/') ? filename.slice(1) : filename;
  // Always use absolute path from root
  return `/${cleanFilename}`;
};

const NADIA_HERO_IMAGE = getImagePath("MEITU_20250529_1011357914.png");
const NEW_IMAGE_1 = getImagePath("cover.png"); // Results section image
const NEW_IMAGE_2 = getImagePath("MEITU_20250501_145005910.png"); // Parcours section image
const NEW_IMAGE_3 = getImagePath("A7V03753.JPG"); // Community section image

// Testimonials images from Temoi folder
const TESTIMONIAL_1 = getImagePath("Temoi/1.png");
const TESTIMONIAL_2 = getImagePath("Temoi/2 (1).png");
const TESTIMONIAL_3 = getImagePath("Temoi/3.png");
const TESTIMONIAL_4 = getImagePath("Temoi/5.png");
const TESTIMONIAL_5 = getImagePath("Temoi/6.png");
const TESTIMONIAL_6 = getImagePath("Temoi/8.png");
const TESTIMONIAL_7 = getImagePath("Temoi/9.png");
const TESTIMONIAL_8 = getImagePath("Temoi/25.png");
const TESTIMONIAL_9 = getImagePath("Temoi/27.png");

// Icons from icones folder
const ICON_LOUPE = getImagePath("icones/loupe.png");
const ICON_FORMULAIRE = getImagePath("icones/remplir-le-formulaire.png");
const ICON_REJOINDRE = getImagePath("icones/rejoindre.png");
const ICON_CARRIERE = getImagePath("icones/carriere.png");
const ICON_GAGNER = getImagePath("icones/gagner-de-largent.png");
const ICON_PARCOURS = getImagePath("icones/parcours-professionnel.png");
const ICON_MAIN = getImagePath("icones/main.png");

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

  
  // WhatsApp link
  const WHATSAPP_LINK = "https://api.whatsapp.com/send/?phone=212606212122&text&type=phone_number&app_absent=0";
  
  // Payment RIB information (à compléter avec vos vraies informations)
  const PAYMENT_RIB = {
    bankName: "Nom de la banque",
    accountName: "Nom du compte",
    accountNumber: "XXXX XXXX XXXX XXXX",
    iban: "MAXXXXXXXXXXXXXX",
    swift: "XXXXXXXXXX"
  };

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear messages when user starts typing again
    if (successMessage || errorMessage) {
      setSuccessMessage(null);
      setErrorMessage(null);
    }
  };

  // Basic email validation pattern
  const isValidEmail = (email: string): boolean => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  };

  // Handle form submission
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

      console.log('Sending payload to Google Apps Script:', payload);

      // Use hidden iframe form submission (works reliably with Google Apps Script)
      // This approach bypasses CORS issues completely
      const iframeName = 'hidden-submit-' + Date.now();
      const iframe = document.createElement('iframe');
      iframe.name = iframeName;
      iframe.style.display = 'none';
      iframe.style.width = '0';
      iframe.style.height = '0';
      iframe.style.border = 'none';
      document.body.appendChild(iframe);
      
      // Create a form element that will submit to the iframe
      const hiddenForm = document.createElement('form');
      hiddenForm.method = 'POST';
      hiddenForm.action = GOOGLE_SCRIPT_URL;
      hiddenForm.target = iframeName;
      hiddenForm.style.display = 'none';
      
      // Add form fields
      Object.entries(payload).forEach(([key, value]) => {
        const input = document.createElement('input');
        input.type = 'hidden';
        input.name = key;
        input.value = value as string;
        hiddenForm.appendChild(input);
      });
      
      // Add form to body and submit
      document.body.appendChild(hiddenForm);
      hiddenForm.submit();
      
      console.log('Form submitted via hidden iframe to Google Apps Script');
      
      // Wait for submission and then clean up
      setTimeout(() => {
        try {
          document.body.removeChild(hiddenForm);
          document.body.removeChild(iframe);
        } catch (e) {
          console.log('Cleanup error (expected):', e);
        }
      }, 3000);
      
      // Wait a bit for the submission to complete
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Assume success (we can't read response with this approach but it works)
      setErrorMessage(null);
      
      // Reset form state
        setFormData({
          fullName: '',
          phone: '',
          email: '',
          address: '',
        packChoice: ''
      });
      
      // Reset form HTML element if available
      if (form) {
        form.reset();
      }
      
      // Show payment modal instead of success message
      setShowPaymentModal(true);
    } catch (error) {
      // Network failure or other error
      console.error('Network or fetch error:', error);
      const errorDetails = error instanceof Error ? error.message : 'Unknown error';
      console.error('Error details:', errorDetails);
      setErrorMessage(`Une erreur est survenue lors de l'envoi. Merci de réessayer dans quelques instants. (${errorDetails})`);
      setSuccessMessage(null);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Scroll to form function
  const scrollToBenefits = () => {
    const element = document.getElementById('benefits-section');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const scrollToForm = () => {
    const formSection = document.getElementById('contact-form');
    if (formSection) {
      formSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="min-h-screen w-full overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative min-h-screen w-full flex items-center justify-center px-4 sm:px-5 py-4 sm:py-6 md:py-8 bg-hero-gradient overflow-hidden">
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
            style={{ background: '#151313' }}
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
            style={{ background: '#302D2C' }}
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
          {/* Desktop: 2 columns for text and Nadia, then video at bottom */}
          <div className="flex flex-col md:grid md:grid-cols-2 gap-3 sm:gap-4 md:gap-4 lg:gap-6 items-start mb-4 md:mb-6">
            {/* Left Column - Text Content */}
            <div className="space-y-2 sm:space-y-3 md:space-y-4 w-full order-1 h-full">
              {/* Pill Label */}
              <motion.div
                className="inline-block"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
              >
                <span className="px-3 py-1.5 sm:px-4 sm:py-2 bg-luxe-white/90 text-luxe-black text-[10px] sm:text-xs uppercase tracking-wider rounded-full border border-luxe-charcoal/40 shadow-sm">
                  Communauté Business • Academy • Coaching
                </span>
              </motion.div>

              {/* Main Headline */}
              <motion.h1
                className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl xl:text-7xl text-luxe-cream leading-snug sm:leading-tight tracking-wide"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
              >
                <span className="font-semibold">ELAN BC</span>{' '}
                <span className="font-bold">BUSINESS COMMUNITY</span>
              </motion.h1>

              {/* Subheadline - Mise en évidence */}
              <motion.p
                className="text-xl sm:text-2xl md:text-3xl lg:text-4xl text-luxe-cream font-bold mb-4 sm:mb-5 leading-tight tracking-wide"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
              >
                <span className="bg-gradient-to-r from-luxe-cream to-luxe-roseGold bg-clip-text text-transparent">
                Business clair, actions concrètes, résultats assurés.
                </span>
              </motion.p>

              {/* Supporting Paragraph */}
              <motion.p
                className="text-sm sm:text-base md:text-lg text-luxe-cream/90 leading-relaxed max-w-xl mb-4 sm:mb-5"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" }}
              >
                <span className="font-bold text-luxe-cream">Passe de l'incertitude à la clarté… et de la clarté à la croissance.</span>
                <br />
                <span className="text-luxe-cream/90">Avec ELAN BUSINESS, un chemin guidé pour créer et développer ton projet rentable.</span>
                <br />
                <a
                  href="#benefits-section"
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToBenefits();
                  }}
                  className="inline-flex items-center gap-2 text-luxe-cream font-semibold underline hover:text-luxe-roseGold transition-colors duration-150 hover:border-b-2 hover:border-luxe-roseGold cursor-pointer"
                >
                  <img src={ICON_LOUPE} alt="Loupe" className="w-4 h-4 sm:w-5 sm:h-5 object-contain" />
                    Découvrir mon parcours
                  </a>
              </motion.p>

              {/* Mobile: Nadia Card */}
              <motion.div
                className="md:hidden w-full space-y-4 mb-4"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.5, ease: "easeOut" }}
              >
                {/* Nadia Card */}
                <div className="bg-card-luxe card-luxe-panel border border-luxe-roseGold/30 rounded-lg p-3 flex flex-col gap-2 shadow-md hover:shadow-xl hover:border-luxe-roseGold/60 transition-all duration-150">
                  {/* Nadia Portrait */}
                  <motion.img
                    src={NADIA_HERO_IMAGE}
                    alt="Nadia Lakzir - Coach Business : Mindset -Marketing -Vente"
                    className="w-full rounded-lg object-contain object-center aspect-square mb-3 bg-luxe-cream"
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.3 }}
                  />
                  {/* Nadia Info */}
                  <div className="space-y-1">
                    <h3 className="text-2xl sm:text-3xl font-bold text-luxe-black">Nadia</h3>
                    <p className="text-sm text-luxe-charcoal mb-0">
                      Coach Business : Mindset -Marketing -Vente
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Mobile: Video */}
              <motion.div
                className="md:hidden w-full mb-3"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.6, ease: "easeOut" }}
              >
                <div className="relative w-full aspect-video rounded-lg overflow-hidden border border-luxe-roseGold/30 shadow-md">
                  <iframe
                    src="https://player.vimeo.com/video/1139166666?title=0&byline=0&portrait=0"
                    className="absolute top-0 left-0 w-full h-full"
                    frameBorder="0"
                    allow="autoplay; fullscreen; picture-in-picture"
                    allowFullScreen
                    title="Vidéo de présentation ELAN BC"
                  ></iframe>
                    </div>
              </motion.div>

              {/* Mobile: CTA Buttons (after video) */}
              <motion.div
                className="md:hidden flex flex-col gap-2 sm:gap-3 pt-2 sm:pt-3"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.7, ease: "easeOut" }}
              >
                <motion.button
                  onClick={scrollToForm}
                  className="w-full px-6 sm:px-8 py-3 h-11 bg-button-cta btn-luxe text-white text-sm sm:text-base font-semibold rounded-full hover:shadow-xl hover:shadow-luxe-roseGold/50 transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-luxe-roseGold focus:ring-offset-2 focus:ring-offset-luxe-cream flex items-center justify-center gap-2"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <img src={ICON_REJOINDRE} alt="Rejoindre" className="w-4 h-4 sm:w-5 sm:h-5 object-contain flex-shrink-0" />
                  Rejoindre ELAN maintenant
                </motion.button>
                <motion.button
                  className="w-full px-6 sm:px-8 py-3 h-11 border-2 border-luxe-black text-luxe-black bg-transparent text-sm sm:text-base font-semibold rounded-full hover:bg-luxe-black hover:text-luxe-cream transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-luxe-black focus:ring-offset-2 focus:ring-offset-luxe-cream"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Découvrir les parcours
                </motion.button>
              </motion.div>
            </div>

            {/* Right Column - Desktop: Nadia Card */}
            <motion.div
              className="hidden md:flex md:flex-col w-full order-2 h-full"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
            >
              {/* Nadia Card */}
              <motion.div
                className="bg-card-luxe card-luxe-panel border border-luxe-roseGold/30 rounded-lg p-3 flex flex-col gap-2 shadow-md hover:shadow-xl hover:border-luxe-roseGold/60 h-full transition-all duration-150"
                whileHover={{ translateY: -4, borderColor: "#E8B4A8" }}
                transition={{ duration: 0.3 }}
              >
                {/* Nadia Portrait */}
                <motion.img
                  src={NADIA_HERO_IMAGE}
                  alt="Nadia Lakzir - Fondatrice de ELAN BUSINESS COMMUNITY (ELAN BC)"
                  className="w-full rounded-lg object-contain object-center aspect-square mb-3 bg-section-gradient"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                />
                {/* Nadia Info */}
                <div className="space-y-1">
                  <h3 className="text-lg font-semibold text-luxe-black">Nadia Lakzir</h3>
                  <p className="text-sm text-luxe-charcoal mb-0">
                    Coach Business : Mindset -Marketing -Vente
                  </p>
                </div>
              </motion.div>
            </motion.div>
              </div>

          {/* Desktop: Video + CTA at bottom center */}
          <motion.div
            className="hidden md:flex md:flex-col w-full max-w-2xl mx-auto items-center justify-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
          >
              {/* Video - Web Style */}
            <motion.div
              className="relative w-full aspect-video rounded-lg overflow-hidden border-2 border-luxe-roseGold/30 shadow-lg hover:border-luxe-roseGold/60 hover:shadow-xl transition-all duration-150"
              whileHover={{ scale: 1.01 }}
              transition={{ duration: 0.3 }}
            >
              <iframe
                src="https://player.vimeo.com/video/1139166666?title=0&byline=0&portrait=0"
                className="absolute top-0 left-0 w-full h-full"
                frameBorder="0"
                allow="autoplay; fullscreen; picture-in-picture"
                allowFullScreen
                title="Vidéo de présentation ELAN BC"
              ></iframe>
            </motion.div>

            {/* Desktop: CTA Buttons (Centered under video) */}
            <div className="flex flex-col gap-3 w-full pt-4">
              <motion.button
                  onClick={scrollToForm}
                  className="w-full px-6 py-3 h-11 bg-button-cta btn-luxe text-white text-sm font-semibold rounded-full hover:opacity-90 hover:shadow-xl hover:shadow-luxe-roseGold/50 transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-luxe-roseGold focus:ring-offset-2 focus:ring-offset-luxe-cream flex items-center justify-center gap-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                <img src={ICON_REJOINDRE} alt="Rejoindre" className="w-4 h-4 sm:w-5 sm:h-5 object-contain flex-shrink-0" />
                Rejoindre ELAN BC maintenant
              </motion.button>
              <motion.button
                  className="w-full px-6 py-3 h-11 border-2 border-luxe-black text-luxe-black bg-transparent text-sm font-semibold rounded-full hover:bg-button-cta hover:text-luxe-cream transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-luxe-black focus:ring-offset-2 focus:ring-offset-luxe-cream"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                  Découvrir les parcours
              </motion.button>
              </div>
          </motion.div>
        </div>
      </section>

      {/* Conversion Form Section */}
      <motion.section
        id="contact-form"
          className="w-full py-8 sm:py-10 md:py-12 px-4 sm:px-5 bg-section-gradient overflow-hidden"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
      >
        <div className="max-w-xl mx-auto space-y-4">
          <motion.div
            className="text-center space-y-3"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-luxe-black flex items-center justify-center gap-3 flex-wrap">
              <img src={ICON_FORMULAIRE} alt="Formulaire" className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 object-contain flex-shrink-0" />
              Rejoindre ELAN BUSINESS COMMUNITY (ELAN BC)
            </h2>
            <p className="text-sm sm:text-base text-luxe-charcoal mb-0">
              Laisse tes informations et notre équipe te contacte pour t'orienter vers le meilleur parcours et plan.
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
                className="w-full mt-1 rounded-lg bg-luxe-cream border border-luxe-roseGold/30 px-3 py-2 text-sm text-luxe-black placeholder-luxe-grey/60 focus:outline-none focus:ring-2 focus:ring-luxe-roseGold focus:border-luxe-roseGold transition-all"
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
                className="w-full mt-1 rounded-lg bg-luxe-cream border border-luxe-roseGold/30 px-3 py-2 text-sm text-luxe-black placeholder-luxe-grey/60 focus:outline-none focus:ring-2 focus:ring-luxe-roseGold focus:border-luxe-roseGold transition-all"
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
                className="w-full mt-1 rounded-lg bg-luxe-cream border border-luxe-roseGold/30 px-3 py-2 text-sm text-luxe-black placeholder-luxe-grey/60 focus:outline-none focus:ring-2 focus:ring-luxe-roseGold focus:border-luxe-roseGold transition-all"
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
              <label htmlFor="address" className="block text-sm font-medium text-luxe-black">
                Adresse (Ville, Pays)
              </label>
              <input
                type="text"
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                className="w-full mt-1 rounded-lg bg-luxe-cream border border-luxe-roseGold/30 px-3 py-2 text-sm text-luxe-black placeholder-luxe-grey/60 focus:outline-none focus:ring-2 focus:ring-luxe-roseGold focus:border-luxe-roseGold transition-all"
                placeholder="Casablanca, Maroc"
              />
            </motion.div>

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
                className="w-full mt-1 rounded-lg bg-luxe-cream border border-luxe-roseGold/30 px-3 py-2 text-sm text-luxe-black focus:outline-none focus:ring-2 focus:ring-luxe-roseGold focus:border-luxe-roseGold transition-all"
              >
                <option value="">Sélectionne un plan</option>
                <option value="Mensuel – 390 DH / mois">Mensuel – 390 DH / mois</option>
                <option value="Trimestre – 885 DH">Trimestre – 885 DH</option>
                <option value="Semestre – 1650 DH">Semestre – 1650 DH</option>
                <option value="Année – 3000 DH">Année – 3000 DH</option>
              </select>
            </motion.div>

            {/* Submit Button */}
            <motion.button
              type="submit"
              disabled={isSubmitting}
              className="w-full mt-4 rounded-full bg-button-cta btn-luxe py-3 text-sm font-semibold text-luxe-cream shadow-md hover:opacity-90 hover:shadow-lg hover:shadow-luxe-black/40 transition-all duration-150 disabled:opacity-60 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-luxe-black focus:ring-offset-2 focus:ring-offset-luxe-cream"
              whileHover={isSubmitting ? {} : { scale: 1.02 }}
              whileTap={isSubmitting ? {} : { scale: 0.98 }}
            >
              {isSubmitting ? 'Envoi en cours...' : 'Envoyer ma demande'}
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
        </div>
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
            className="bg-card-luxe card-luxe-panel rounded-2xl shadow-2xl max-w-md w-full p-6 sm:p-8 relative backdrop-blur-sm border border-luxe-roseGold/30"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setShowPaymentModal(false)}
              className="absolute top-4 right-4 text-luxe-charcoal/70 hover:text-luxe-black transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Modal Content */}
            <div className="space-y-6">
              {/* Header */}
              <div className="text-center">
                <motion.div
                  className="w-16 h-16 bg-luxe-taupe/20 rounded-full flex items-center justify-center mx-auto mb-4"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.1 }}
                >
                  <svg className="w-8 h-8 text-luxe-black" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </motion.div>
                <h3 className="text-2xl font-bold text-luxe-black mb-2">
                  Formulaire envoyé avec succès !
                </h3>
                <p className="text-sm text-luxe-charcoal">
                  Merci ! Voici les informations de paiement pour finaliser votre inscription.
                </p>
              </div>

              {/* Payment Information */}
              <div className="bg-card-luxe card-luxe-panel rounded-xl p-5 border border-luxe-roseGold/30 shadow-md">
                <h4 className="text-lg font-semibold text-luxe-black mb-4 flex items-center gap-2">
                  <svg className="w-5 h-5 text-luxe-black" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z" />
                    <path fillRule="evenodd" d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z" clipRule="evenodd" />
                  </svg>
                  Coordonnées bancaires (RIB)
                </h4>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between items-center">
                    <span className="text-luxe-charcoal font-medium">Banque :</span>
                    <span className="text-luxe-black font-semibold">{PAYMENT_RIB.bankName}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-luxe-charcoal font-medium">Titulaire :</span>
                    <span className="text-luxe-black font-semibold">{PAYMENT_RIB.accountName}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-luxe-charcoal font-medium">Numéro de compte :</span>
                    <span className="text-luxe-black font-semibold font-mono">{PAYMENT_RIB.accountNumber}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-luxe-charcoal font-medium">IBAN :</span>
                    <span className="text-luxe-black font-semibold font-mono text-xs">{PAYMENT_RIB.iban}</span>
                  </div>
                  {PAYMENT_RIB.swift && (
                    <div className="flex justify-between items-center">
                      <span className="text-luxe-charcoal font-medium">SWIFT :</span>
                      <span className="text-luxe-black font-semibold font-mono">{PAYMENT_RIB.swift}</span>
              </div>
            )}
                </div>
              </div>

              {/* WhatsApp Button */}
              <motion.a
                href={WHATSAPP_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-3 bg-[#25D366] text-white px-6 py-4 rounded-full font-semibold text-base hover:bg-[#20BA5A] shadow-lg hover:shadow-xl transition-all duration-150"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                </svg>
                <span>Contacter via WhatsApp</span>
              </motion.a>

              {/* Info Text */}
              <p className="text-xs text-center text-luxe-charcoal/70">
                Après le paiement, contactez-nous sur WhatsApp pour confirmer votre inscription.
                </p>
              </div>
          </motion.div>
        </motion.div>
      )}

      {/* Why ELAN BC Section */}
      <motion.section
          className="w-full py-8 sm:py-10 md:py-12 lg:py-16 px-4 sm:px-5 bg-section-gradient overflow-hidden"
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
            Pourquoi choisir ELAN BUSINESS COMMUNITY (ELAN BC) ?
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
              ⏰ Arrête de <span className="font-bold text-luxe-black">perdre ton temps</span> à chercher partout. Tout ce dont tu as besoin pour <span className="font-bold text-luxe-black">lancer</span>, <span className="font-bold text-luxe-black">développer</span> et <span className="font-bold text-luxe-black">scaler</span> ton business est réuni ici.
            </motion.p>
            <motion.p
              className="text-sm sm:text-base md:text-lg lg:text-xl text-luxe-charcoal leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              🎯 Avec ELAN BC, une méthode claire et structurée qui t'oriente à chaque étape. Apprends efficacement et applique immédiatement.
            </motion.p>
          </div>

          {/* Cards Grid - 2 per row, 4 cards total */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 md:gap-8 max-w-5xl mx-auto">
            {[
              { icon: "✅", text: "Méthode structurée et progressive" },
              { icon: "📚", text: "Ressources centralisées en un seul endroit" },
              { icon: "⚡", text: "Application immédiate des concepts" },
              { icon: "🎯", text: "Guidance à chaque étape" }
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
                <div className="mb-3">
                  <div className="inline-flex items-center justify-center text-2xl sm:text-3xl">
                    {item.icon}
                  </div>
                </div>
                <p className="text-sm sm:text-base md:text-lg font-semibold text-luxe-black flex-1 transition-colors duration-150 group-hover:text-luxe-charcoal">
                  {item.text}
                </p>
                  </motion.div>
              ))}
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
        <div className="absolute inset-0 bg-section-gradient" />
        
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
            Ce que tu obtiens en rejoignant ELAN BC
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
                Une plateforme complète d'Academy
              </motion.h3>
              <ul className="space-y-1.5 sm:space-y-2 md:space-y-4">
                <li className="flex items-start gap-2 sm:gap-3">
                  <span className="text-luxe-black mt-0.5 sm:mt-1 text-sm sm:text-base">•</span>
                  <span className="text-sm sm:text-base text-luxe-charcoal flex-1">Plus de 30 cours sur le marketing, la vente et le leadership</span>
                </li>
                <li className="flex items-start gap-2 sm:gap-3">
                  <span className="text-luxe-black mt-0.5 sm:mt-1 text-sm sm:text-base">•</span>
                  <span className="text-sm sm:text-base text-luxe-charcoal flex-1">Ressources & contenus pratiques, applicables immédiatement</span>
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
                Un accompagnement et suivi au quotidien
              </motion.h3>
              <ul className="space-y-1.5 sm:space-y-2 md:space-y-4">
                <li className="flex items-start gap-2 sm:gap-3">
                  <span className="text-luxe-black mt-0.5 sm:mt-1 text-sm sm:text-base">•</span>
                  <span className="text-sm sm:text-base text-luxe-charcoal flex-1">Guidance personnalisée pour ne jamais te sentir perdu</span>
                </li>
                <li className="flex items-start gap-2 sm:gap-3">
                  <span className="text-luxe-black mt-0.5 sm:mt-1 text-sm sm:text-base">•</span>
                  <span className="text-sm sm:text-base text-luxe-charcoal flex-1">Support continu via la communauté et les sessions live</span>
                </li>
                <li className="flex items-start gap-2 sm:gap-3">
                  <span className="text-luxe-black mt-0.5 sm:mt-1 text-sm sm:text-base">•</span>
                  <span className="text-sm sm:text-base text-luxe-charcoal flex-1">Coaching pour appliquer la méthode pas à pas</span>
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
                Des résultats concrets
              </motion.h3>
              <ul className="space-y-1.5 sm:space-y-2 md:space-y-4">
                <li className="flex items-start gap-2 sm:gap-3">
                  <span className="text-luxe-black mt-0.5 sm:mt-1 text-sm sm:text-base">•</span>
                  <span className="text-sm sm:text-base text-luxe-charcoal flex-1">Plus de ventes et de clients</span>
                </li>
                <li className="flex items-start gap-2 sm:gap-3">
                  <span className="text-luxe-black mt-0.5 sm:mt-1 text-sm sm:text-base">•</span>
                  <span className="text-sm sm:text-base text-luxe-charcoal flex-1">Gain de temps : fini la dispersion</span>
                </li>
                <li className="flex items-start gap-2 sm:gap-3">
                  <span className="text-luxe-black mt-0.5 sm:mt-1 text-sm sm:text-base">•</span>
                  <span className="text-sm sm:text-base text-luxe-charcoal flex-1">Motivation et growth mindset grâce à la communauté</span>
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
            <motion.img
              src={NEW_IMAGE_1}
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
          className="w-full py-8 sm:py-10 md:py-12 lg:py-16 px-4 sm:px-5 bg-section-gradient border-t border-luxe-roseGold/20 overflow-hidden"
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
              Les 3 parcours de l'Academy ELAN BC
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
            <motion.img
              src={NEW_IMAGE_2}
              alt="Parcours de l'Academy en ligne ELAN BC"
              className="w-full rounded-2xl object-cover mb-4"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            />
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-6">
            {/* Starter Card */}
            <motion.div
              className="group bg-card-luxe card-luxe-panel rounded-xl p-4 sm:p-5 md:p-8 border border-luxe-roseGold/30 shadow-md hover:shadow-xl hover:border-luxe-roseGold/60 transition-all duration-150"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              whileHover={{ translateY: -6, borderColor: "#E8B4A8", boxShadow: "0 25px 50px -12px rgba(48, 45, 44, 0.25)", scale: 1.02 }}
            >
              <div className="mb-4 sm:mb-6">
                <motion.span 
                  className="px-3 py-1.5 sm:px-4 sm:py-2 bg-section-gradient text-luxe-black text-xs sm:text-sm uppercase tracking-wider rounded-full border border-luxe-roseGold/30 transition-all duration-150 group-hover:bg-button-cta group-hover:text-white group-hover:border-luxe-roseGold/60 inline-block"
                  whileHover={{ scale: 1.05 }}
                >
                  Starter
                </motion.span>
              </div>
              <motion.h3 
                className="text-lg sm:text-xl md:text-2xl font-semibold text-luxe-black mb-4 sm:mb-6 transition-colors duration-150 group-hover:text-luxe-charcoal"
                whileHover={{ scale: 1.05 }}
              >
                Ceux qui démarrent
              </motion.h3>
              <ul className="space-y-1.5 sm:space-y-2 md:space-y-4">
                <li className="flex items-start gap-2 sm:gap-3">
                  <span className="text-luxe-black mt-0.5 sm:mt-1 text-sm sm:text-base">•</span>
                  <span className="text-sm sm:text-base text-luxe-charcoal flex-1">Trouve et clarifie ton idée de projet</span>
                </li>
                <li className="flex items-start gap-2 sm:gap-3">
                  <span className="text-luxe-black mt-0.5 sm:mt-1 text-sm sm:text-base">•</span>
                  <span className="text-sm sm:text-base text-luxe-charcoal flex-1">Bases solides pour structurer ton projet</span>
                </li>
                <li className="flex items-start gap-2 sm:gap-3">
                  <span className="text-luxe-black mt-0.5 sm:mt-1 text-sm sm:text-base">•</span>
                  <span className="text-sm sm:text-base text-luxe-charcoal flex-1">Idée claire et détaillée prête à se lancer</span>
                </li>
                <li className="flex items-start gap-2 sm:gap-3">
                  <span className="text-luxe-black mt-0.5 sm:mt-1 text-sm sm:text-base">•</span>
                  <span className="text-sm sm:text-base text-luxe-charcoal flex-1">Pose les fondations pour démarrer vite et en confiance</span>
                </li>
              </ul>
            </motion.div>

            {/* Builder Card */}
            <motion.div
              className="group bg-card-luxe card-luxe-panel rounded-xl p-4 sm:p-5 md:p-8 border border-luxe-roseGold/30 shadow-md hover:shadow-xl hover:border-luxe-roseGold/60 transition-all duration-150"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              whileHover={{ translateY: -6, borderColor: "#E8B4A8", boxShadow: "0 25px 50px -12px rgba(48, 45, 44, 0.25)", scale: 1.02 }}
            >
              <div className="mb-4 sm:mb-6">
                <motion.span 
                  className="px-3 py-1.5 sm:px-4 sm:py-2 bg-section-gradient text-luxe-black text-xs sm:text-sm uppercase tracking-wider rounded-full border border-luxe-roseGold/30 transition-all duration-150 group-hover:bg-button-cta group-hover:text-white group-hover:border-luxe-roseGold/60 inline-block"
                  whileHover={{ scale: 1.05 }}
                >
                  Builder
                </motion.span>
              </div>
              <motion.h3 
                className="text-lg sm:text-xl md:text-2xl font-semibold text-luxe-black mb-4 sm:mb-6 transition-colors duration-150 group-hover:text-luxe-charcoal"
                whileHover={{ scale: 1.05 }}
              >
                Entrepreneurs déjà lancés
              </motion.h3>
              <ul className="space-y-1.5 sm:space-y-2 md:space-y-4">
                <li className="flex items-start gap-2 sm:gap-3">
                  <span className="text-luxe-black mt-0.5 sm:mt-1 text-sm sm:text-base">•</span>
                  <span className="text-sm sm:text-base text-luxe-charcoal flex-1">Développe ta stratégie marketing et vente</span>
                </li>
                <li className="flex items-start gap-2 sm:gap-3">
                  <span className="text-luxe-black mt-0.5 sm:mt-1 text-sm sm:text-base">•</span>
                  <span className="text-sm sm:text-base text-luxe-charcoal flex-1">Organisation et process business optimisés</span>
                </li>
                <li className="flex items-start gap-2 sm:gap-3">
                  <span className="text-luxe-black mt-0.5 sm:mt-1 text-sm sm:text-base">•</span>
                  <span className="text-sm sm:text-base text-luxe-charcoal flex-1">Apprends à vendre efficacement tes produits/services</span>
                </li>
                <li className="flex items-start gap-2 sm:gap-3">
                  <span className="text-luxe-black mt-0.5 sm:mt-1 text-sm sm:text-base">•</span>
                  <span className="text-sm sm:text-base text-luxe-charcoal flex-1">Transforme ton projet en business rentable et structuré</span>
                </li>
              </ul>
            </motion.div>

            {/* Scaler Card */}
            <motion.div
              className="group bg-card-luxe card-luxe-panel rounded-xl p-4 sm:p-5 md:p-8 border border-luxe-roseGold/30 shadow-md hover:shadow-xl hover:border-luxe-roseGold/60 transition-all duration-150"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.5 }}
              whileHover={{ translateY: -6, borderColor: "#E8B4A8", boxShadow: "0 25px 50px -12px rgba(48, 45, 44, 0.25)", scale: 1.02 }}
            >
              <div className="mb-4 sm:mb-6">
                <motion.span 
                  className="px-3 py-1.5 sm:px-4 sm:py-2 bg-section-gradient text-luxe-black text-xs sm:text-sm uppercase tracking-wider rounded-full border border-luxe-roseGold/30 transition-all duration-150 group-hover:bg-button-cta group-hover:text-white group-hover:border-luxe-roseGold/60 inline-block"
                  whileHover={{ scale: 1.05 }}
                >
                  Scaler
                </motion.span>
              </div>
              <motion.h3 
                className="text-lg sm:text-xl md:text-2xl font-semibold text-luxe-black mb-4 sm:mb-6 transition-colors duration-150 group-hover:text-luxe-charcoal"
                whileHover={{ scale: 1.05 }}
              >
                Entrepreneurs établis
              </motion.h3>
              <ul className="space-y-1.5 sm:space-y-2 md:space-y-4">
                <li className="flex items-start gap-2 sm:gap-3">
                  <span className="text-luxe-black mt-0.5 sm:mt-1 text-sm sm:text-base">•</span>
                  <span className="text-sm sm:text-base text-luxe-charcoal flex-1">Mise en place de l'écosystème complet</span>
                </li>
                <li className="flex items-start gap-2 sm:gap-3">
                  <span className="text-luxe-black mt-0.5 sm:mt-1 text-sm sm:text-base">•</span>
                  <span className="text-sm sm:text-base text-luxe-charcoal flex-1">Optimisation pour scaler sans friction</span>
                </li>
                <li className="flex items-start gap-2 sm:gap-3">
                  <span className="text-luxe-black mt-0.5 sm:mt-1 text-sm sm:text-base">•</span>
                  <span className="text-sm sm:text-base text-luxe-charcoal flex-1">Passe d'un business qui fonctionne à un business qui croît durablement</span>
                </li>
              </ul>
            </motion.div>
            </div>
          </div>
      </motion.section>

      {/* Pricing Section */}
      <motion.section
          className="w-full py-8 sm:py-10 md:py-12 lg:py-16 px-4 sm:px-5 bg-section-gradient overflow-hidden"
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
            Plans tarifaires ELAN BUSINESS COMMUNITY (ELAN BC)
            </span>
          </motion.h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {/* Mensuel */}
            <motion.div
              onClick={scrollToForm}
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
                Mensuel
              </motion.h3>
              <div className="mb-4 sm:mb-6">
                <motion.span 
                  className="text-3xl sm:text-4xl font-bold text-luxe-black inline-block transition-all duration-150"
                  whileHover={{ scale: 1.1 }}
                >
                  390 DH
                </motion.span>
                <span className="text-sm sm:text-base text-luxe-charcoal transition-colors duration-150 group-hover:text-luxe-black"> / mois</span>
              </div>
              <div className="flex-1"></div>
              <motion.button
                onClick={scrollToForm}
                className="w-full px-4 sm:px-6 py-3 h-11 bg-button-cta btn-luxe text-luxe-cream text-sm sm:text-base font-semibold rounded-full hover:opacity-90 hover:shadow-lg hover:shadow-luxe-black/50 transition-all duration-150"
                whileHover={{ scale: 1.05, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.3)" }}
                whileTap={{ scale: 0.98 }}
              >
                Choisir ce plan
              </motion.button>
            </motion.div>

            {/* Trimestre - Highlighted */}
            <motion.div
              onClick={scrollToForm}
              className="group bg-card-luxe card-luxe-panel rounded-lg p-5 sm:p-6 md:p-8 border-2 border-luxe-roseGold/40 shadow-lg shadow-luxe-roseGold/20 relative w-full cursor-pointer flex flex-col transition-all duration-150 hover:border-luxe-roseGold/70"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              whileHover={{ translateY: -8, boxShadow: "0 25px 50px -12px rgba(232, 180, 168, 0.3)", scale: 1.02 }}
            >
              <motion.div 
                className="absolute -top-3 sm:-top-4 left-1/2 transform -translate-x-1/2"
                whileHover={{ scale: 1.1 }}
              >
                <span className="px-3 sm:px-4 py-1 bg-button-cta btn-luxe text-luxe-cream text-[10px] sm:text-xs uppercase rounded-full transition-all duration-150 group-hover:opacity-90 group-hover:shadow-lg">Populaire</span>
              </motion.div>
              <motion.h3 
                className="text-xl sm:text-2xl font-semibold text-luxe-black mb-3 sm:mb-4 transition-colors duration-150 group-hover:text-luxe-charcoal"
                whileHover={{ scale: 1.05 }}
              >
                Trimestre
              </motion.h3>
              <div className="mb-4 sm:mb-6">
                <motion.span 
                  className="text-3xl sm:text-4xl font-bold text-luxe-black inline-block transition-all duration-150"
                  whileHover={{ scale: 1.1 }}
                >
                  885 DH
                </motion.span>
                <span className="text-sm sm:text-base font-semibold text-luxe-black ml-2">live</span>
                <div className="mt-2 text-sm sm:text-base text-luxe-charcoal transition-colors duration-150 group-hover:text-luxe-black">
                  <span className="font-semibold">295 DH</span> / mois
              </div>
                </div>
              <p className="text-sm sm:text-base text-luxe-charcoal mb-3 sm:mb-4 min-h-[3rem] transition-colors duration-150 group-hover:text-luxe-black">Accès aux 2 workshops : Vente 360° et préparer son année 2026</p>
              <div className="flex-1"></div>
              <motion.button
                onClick={scrollToForm}
                className="w-full px-4 sm:px-6 py-3 h-11 bg-button-cta btn-luxe text-luxe-cream text-sm sm:text-base font-semibold rounded-full hover:opacity-90 hover:shadow-lg hover:shadow-luxe-black/50 transition-all duration-150"
                whileHover={{ scale: 1.05, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.3)" }}
                whileTap={{ scale: 0.98 }}
              >
                Choisir ce plan
              </motion.button>
            </motion.div>

            {/* Semestre */}
            <motion.div
              onClick={scrollToForm}
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
                Semestre
              </motion.h3>
              <div className="mb-4 sm:mb-6">
                <motion.span 
                  className="text-3xl sm:text-4xl font-bold text-luxe-black inline-block transition-all duration-150"
                  whileHover={{ scale: 1.1 }}
                >
                  1650 DH
                </motion.span>
                <span className="text-sm sm:text-base font-semibold text-luxe-black ml-2">live</span>
                <div className="mt-2 text-sm sm:text-base text-luxe-charcoal transition-colors duration-150 group-hover:text-luxe-black">
                  <span className="font-semibold">275 DH</span> / mois
              </div>
                </div>
              <p className="text-sm sm:text-base text-luxe-charcoal mb-3 sm:mb-4 min-h-[3rem] transition-colors duration-150 group-hover:text-luxe-black">Accès aux 2 workshops : Vente 360° et préparer son année 2026</p>
              <div className="flex-1"></div>
              <motion.button
                onClick={scrollToForm}
                className="w-full px-4 sm:px-6 py-3 h-11 bg-button-cta btn-luxe text-luxe-cream text-sm sm:text-base font-semibold rounded-full hover:opacity-90 hover:shadow-lg hover:shadow-luxe-black/50 transition-all duration-150"
                whileHover={{ scale: 1.05, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.3)" }}
                whileTap={{ scale: 0.98 }}
              >
                Choisir ce plan
              </motion.button>
            </motion.div>

            {/* Année */}
            <motion.div
              onClick={scrollToForm}
              className="group bg-card-luxe card-luxe-panel rounded-lg p-5 sm:p-6 md:p-8 border border-luxe-roseGold/30 shadow-md hover:shadow-xl hover:border-luxe-roseGold/60 w-full cursor-pointer flex flex-col transition-all duration-150"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.6 }}
              whileHover={{ translateY: -8, borderColor: "#E8B4A8", boxShadow: "0 25px 50px -12px rgba(48, 45, 44, 0.25)" }}
            >
              <motion.h3 
                className="text-xl sm:text-2xl font-semibold text-luxe-black mb-3 sm:mb-4 transition-colors duration-150 group-hover:text-luxe-charcoal"
                whileHover={{ scale: 1.05 }}
              >
                Année
              </motion.h3>
              <div className="mb-4 sm:mb-6">
                <motion.span 
                  className="text-3xl sm:text-4xl font-bold text-luxe-black inline-block transition-all duration-150"
                  whileHover={{ scale: 1.1 }}
                >
                  3000 DH
                </motion.span>
                <div className="mt-2 text-sm sm:text-base text-luxe-charcoal transition-colors duration-150 group-hover:text-luxe-black">
                  <span className="font-semibold">250 DH</span> / mois
              </div>
                </div>
              <p className="text-sm sm:text-base text-luxe-charcoal mb-3 sm:mb-4 min-h-[3rem] transition-colors duration-150 group-hover:text-luxe-black">Accès complet à la communauté et à l'Academy</p>
              <p className="text-sm sm:text-base text-luxe-black font-semibold mb-3 sm:mb-4 transition-colors duration-150 group-hover:text-luxe-charcoal">45 min de coaching individuel (Pour diagnostic de ton projet)</p>
              <div className="flex-1"></div>
              <motion.button
                onClick={scrollToForm}
                className="w-full px-4 sm:px-6 py-3 h-11 bg-button-cta btn-luxe text-luxe-cream text-sm sm:text-base font-semibold rounded-full hover:opacity-90 hover:shadow-lg hover:shadow-luxe-black/50 transition-all duration-150"
                whileHover={{ scale: 1.05, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.3)" }}
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
          className="w-full py-8 sm:py-10 md:py-12 lg:py-16 px-4 sm:px-5 bg-section-gradient overflow-hidden"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
      >
        <div className="max-w-screen-sm sm:max-w-screen-md md:max-w-7xl mx-auto w-full">
          <div className="flex flex-col gap-6 md:gap-6">
            {/* Image - Horizontal on top */}
            <motion.div
              className="w-full"
              initial={{ opacity: 0, y: -30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <motion.img
                src={NEW_IMAGE_3}
                alt="Communauté d'entrepreneurs ELAN BC en atelier"
                className="w-full rounded-lg object-cover object-center aspect-video"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              />
            </motion.div>

            {/* Text & Avatars - Below image */}
            <motion.div
              className="text-center md:text-left space-y-4 sm:space-y-5 w-full"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black mb-4 sm:mb-6 text-luxe-black leading-tight flex items-center justify-center md:justify-start gap-3">
            <span role="img" aria-label="communauté" className="text-2xl sm:text-3xl">👥</span>
            Une communauté d'entrepreneurs engagés
          </h2>
              <p className="text-sm sm:text-base md:text-lg text-luxe-charcoal leading-relaxed mb-6 sm:mb-8 px-2 md:px-0">
                Rejoins une communauté dynamique d'entrepreneurs. Entraide, motivation, sessions live et échanges enrichissants pour t'accompagner dans ta croissance avec ELAN BC.
          </p>

          {/* Avatar Placeholders */}
          <div className="w-full overflow-x-auto pb-2 -mx-4 sm:mx-0 px-4 sm:px-0">
                <div className="flex justify-center md:justify-start items-center gap-3 sm:gap-4 min-w-max">
              {['AB', 'CD', 'EF', 'GH', 'IJ', 'KL'].map((initials, index) => (
                    <motion.div
                  key={index}
                      className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full bg-luxe-cream border-2 border-luxe-roseGold/30 flex items-center justify-center text-luxe-charcoal font-semibold text-sm sm:text-base md:text-lg flex-shrink-0"
                      initial={{ opacity: 0, scale: 0 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: 0.4 + index * 0.1 }}
                      whileHover={{ scale: 1.1, borderColor: "#E8B4A8" }}
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

      {/* Testimonials from Instagram Section */}
      <motion.section
        className="w-full py-8 sm:py-10 md:py-12 lg:py-16 px-4 sm:px-5 bg-section-gradient overflow-hidden"
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
            💬 Témoignages Instagram
          </motion.h2>

          <p className="text-center text-base sm:text-lg text-luxe-charcoal mb-8 sm:mb-10 max-w-2xl mx-auto">
            ✨ Découvre les témoignages authentiques de notre communauté sur Instagram
          </p>
          
          {/* Auto-scrolling Carousel */}
          <div className="relative w-full overflow-hidden">
            <div className="flex gap-6 sm:gap-8 md:gap-10 animate-scroll">
              {/* First set of testimonials */}
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
                    key={`first-${index}`}
                    className="group relative bg-card-luxe card-luxe-panel rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 border-2 border-transparent hover:border-luxe-roseGold/40 flex-shrink-0 w-[280px] sm:w-[320px] md:w-[380px]"
                    whileHover={{ translateY: -8, scale: 1.02 }}
                  >
                    {/* Decorative gradient overlay */}
                    <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${gradientClass} opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10`}></div>
                    
                    {/* Testimonial Image */}
            <motion.img
                      src={testimonialImage}
                      alt={`Témoignage ${index + 1} - ELAN BC`}
                      className="w-full h-auto object-cover rounded-2xl"
                      whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            />
          </motion.div>
                );
              })}
              
              {/* Duplicate set for seamless loop */}
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
                    key={`second-${index}`}
                    className="group relative bg-card-luxe card-luxe-panel rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 border-2 border-transparent hover:border-luxe-roseGold/40 flex-shrink-0 w-[280px] sm:w-[320px] md:w-[380px]"
                    whileHover={{ translateY: -8, scale: 1.02 }}
                  >
                    {/* Decorative gradient overlay */}
                    <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${gradientClass} opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10`}></div>
                    
                    {/* Testimonial Image */}
                    <motion.img
                      src={testimonialImage}
                      alt={`Témoignage ${index + 1} - ELAN BC`}
                      className="w-full h-auto object-cover rounded-2xl"
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.3 }}
                    />
                  </motion.div>
                );
              })}
            </div>
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

      {/* Final CTA Section */}
      <motion.section
          className="w-full py-8 sm:py-10 md:py-12 lg:py-16 px-4 sm:px-5 bg-section-gradient border-t border-luxe-roseGold/20 overflow-hidden"
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
            onClick={scrollToForm}
            className="w-full sm:w-auto px-6 sm:px-10 py-4 sm:py-5 h-12 sm:h-auto bg-button-cta btn-luxe text-white text-base sm:text-lg font-semibold rounded-full hover:opacity-90 hover:shadow-xl hover:shadow-luxe-roseGold/50 transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-luxe-roseGold focus:ring-offset-2 focus:ring-offset-luxe-cream flex items-center justify-center gap-2 mx-auto"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <img src={ICON_REJOINDRE} alt="Rejoindre" className="w-5 h-5 sm:w-6 sm:h-6 object-contain flex-shrink-0" />
            Je rejoins ELAN BC maintenant
          </motion.button>
        </div>
      </motion.section>

      {/* Footer */}
        <footer className="w-full py-8 sm:py-12 px-4 sm:px-5 bg-luxe-charcoal border-t border-luxe-roseGold/30 overflow-hidden">
        <div className="max-w-screen-sm sm:max-w-screen-md md:max-w-7xl mx-auto w-full">
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-6 md:gap-8">
            <a href="#" className="text-sm sm:text-base text-luxe-cream/90 hover:text-luxe-cream transition-colors duration-150">
              Mentions légales
            </a>
            <a href="#" className="text-sm sm:text-base text-luxe-cream/90 hover:text-luxe-cream transition-colors duration-150">
              Conditions
            </a>
            <a href="#" className="text-sm sm:text-base text-luxe-cream/90 hover:text-luxe-cream transition-colors duration-150">
              Contact
            </a>
          </div>
          <div className="mt-6 sm:mt-8 text-center text-xs sm:text-sm text-luxe-cream/70">
            © 2024 ELAN BUSINESS COMMUNITY (ELAN BC). Tous droits réservés.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;

