'use client'
import React, { useState } from 'react';
import { motion,AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from "lucide-react";
import { 
  Button, 
  IconButton, 
  // useTheme 
} from '@mui/material';
import { 
  Heart, 
  Share, 
  ChevronDown, 
  Plus, 
  Minus 
} from 'lucide-react';
import { MapPin, Phone, Mail } from 'lucide-react';


// Animation variants
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

export default function CampaignSection() {
  // const [darkMode, setDarkMode] = useState(false);
  const [selectedAmount, setSelectedAmount] = useState('₹1,000');
  const [donationType, setDonationType] = useState('one-time');
  const [selectedCategory, setSelectedCategory] = useState('All Perks');
  const [expanded, setExpanded] = useState<string | null>(null);
    const [cart, setCart] = useState<Record<string, number>>({});
  // Campaign data
  const raisedAmount = 840000;
  const goalAmount = 2500000;
  const percentComplete = (raisedAmount / goalAmount) * 100;
  const supporters = 242;
  const daysRemaining = 18;

  // Theme
  // const theme = useTheme();
  const palettes = {
    primary: {
      main: '#F97316', // Orange primary color from image
      light: '#FDBA74',
      dark: '#C2410C',
      contrastText: '#FFFFFF'
    },
    secondary: {
      main: '#F59E0B', // Yellow secondary color from image
      light: '#FCD34D',
      dark: '#B45309',
      contrastText: '#FFFFFF'
    }
  };

  const images = [
    {
      src: "https://cdn.pixabay.com/photo/2015/06/22/08/37/children-817365_1280.jpg",
      location: "📍 Mumbai, India",
    },
    {
      src: "https://cdn.pixabay.com/photo/2013/10/02/23/03/mountains-190055_1280.jpg",
      location: "📍 Delhi, India",
    },
    {
      src: "https://cdn.pixabay.com/photo/2023/03/28/11/52/ai-generated-7882967_1280.jpg",
      location: "📍 Bangalore, India",
    },
  ];

  const [current, setCurrent] = useState(0);

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrent((prev) => (prev - 1 + images.length) % images.length);
  };
  // Format currency
  const formatCurrency = (amount: number) => {
    return `₹${amount.toLocaleString()}`;
  };

  // Update cart
  const updateCart = (id: string, change: number) => {
    const currentAmount = cart[id] || 0;
    const newAmount = Math.max(0, currentAmount + change);
    
    setCart(prev => ({
      ...prev,
      [id]: newAmount || 0
    }));
  };

  // Calculate subtotal
// Assuming cart is Record<string, number> and perks is an array of objects with id and price

const subtotal = Object.entries(cart).reduce((total: number, [id, quantity]: [string, number]) => {
  const perk = perks.find((p: { id: string; price: string }) => p.id === id);
  if (!perk) return total;
  return total + (parseInt(perk.price.replace(/,/g, '')) * quantity);
}, 0);

// Handle accordion change
const handleAccordionChange = (panel: string | null) => {
  setExpanded(expanded === panel ? null : panel);
};

  // Perk data
  const perks = [
    {
      id: 'perk1',
      name: 'Animal Sponsorship',
      price: '2,000',
      stock: 48,
      description: `Sponsor an animal at our shelter for one month. You'll receive regular updates and photos.`,
      image: 'https://cdn.pixabay.com/photo/2020/06/24/03/31/child-5334516_1280.jpg',
      category: 'Sponsorship'
    },
    {
      id: 'perk2',
      name: 'Digital Thank You Card',
      price: '500',
      stock: 97,
      description: 'A beautiful digital thank you card featuring artwork created by our rescued animals.',
      image: 'https://cdn.pixabay.com/photo/2018/07/14/11/33/earth-3537401_1280.jpg',
      category: 'Digital'
    },
    {
      id: 'perk3',
      name: 'Shelter Visit Experience',
      price: '5,000',
      stock: 15,
      description: 'Exclusive shelter visit for you and one guest, including a guided tour and animal interaction session.',
      image: 'https://cdn.pixabay.com/photo/2021/04/24/18/07/road-6204694_1280.jpg',
      category: 'Experience'
    }
  ];

  // Filter perks based on selected category
  const filteredPerks = selectedCategory === 'All Perks' 
    ? perks 
    : perks.filter(perk => perk.category === selectedCategory);

  // Updates data
  const updates = [
    {
      id: 1,
      title: 'New Medical Equipment Arrived!',
      author: 'Priya Sharma',
      role: 'Veterinarian',
      time: '2 days ago',
      content: 'We are thrilled to announce that our new medical equipment has arrived at the shelter. This will significantly improve our ability to provide care for injured animals. Thank you to all our supporters who made this possible!'
    },
    {
      id: 2,
      title: 'Summer Adoption Drive Success',
      author: 'Rahul Patel',
      role: 'Program Director',
      time: '1 week ago',
      content: 'Our summer adoption drive was a huge success! We found forever homes for 26 animals last weekend. The community response was overwhelming and we couldn\'t be more grateful.'
    }
  ];

  // FAQ data
  const faqs = [
    {
      question: 'How is my donation used?',
      answer: 'Your donation directly supports our animal rescue operations, including medical care, food, shelter maintenance, and staff training. We ensure that at least 85% of all donations go directly to animal care.'
    },
    {
      question: `Can I visit the animals I've helped?`,
      answer: 'Absolutely! We welcome visits from our supporters. You can schedule a visit to our shelter by contacting our office, and you might even get to meet some of the animals your donation has helped.'
    },
    {
      question: 'Is my donation tax-deductible?',
      answer: 'Yes, Summer Sparks is a registered non-profit organization, and all donations are tax-deductible as allowed by law. You will receive a receipt for your donation that you can use for tax purposes.'
    }
  ];

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900 font-sans text-gray-900 dark:text-white">
      {/* Hero Banner */}
      <div className="relative bg-gradient-to-b from-amber-500/80 to-orange-600/90 overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{ backgroundImage: "url('/api/placeholder/1600/500')" }}
        ></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 relative z-10">
          <div className="max-w-3xl">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-4xl md:text-5xl font-bold text-white mb-6"
            >
              Help <span className="text-yellow-300">Summer Sparks</span> Protect Animals in Need
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xl text-white/90 mb-8"
            >
              Join our mission to rescue, rehabilitate, and rehome abandoned and injured animals across India.
            </motion.p>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-wrap gap-4"
            >
              <Button
                variant="contained"
                size="large"
                startIcon={<Heart size={20} />}
                style={{
                  backgroundColor: '#FFFFFF',
                  color: palettes.primary.main,
                  padding: '12px 24px',
                  borderRadius: '8px',
                  fontWeight: 600,
                  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
                }}
              >
                Donate Now
              </Button>
              <Button
                variant="outlined"
                size="large"
                style={{
                  borderColor: '#FFFFFF',
                  color: '#FFFFFF',
                  padding: '12px 24px',
                  borderRadius: '8px',
                  fontWeight: 600
                }}
              >
                Learn More
              </Button>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Content - Campaign Details */}
          <div className="lg:col-span-2 space-y-10">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              variants={fadeIn}
              className="space-y-8"
            >
              {/* Main Image with Floating Label */}
              <div className="relative max-w-4xl mx-auto overflow-hidden rounded-2xl shadow-xl">
      <AnimatePresence mode="wait">
        <motion.div
          key={images[current].src}
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.98 }}
          transition={{ duration: 0.6 }}
          className="relative"
        >
          <img
            src={images[current].src}
            alt="Animal shelter"
            className="w-full object-cover h-80 md:h-[500px]"
            loading="lazy"
          />
          <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full text-sm font-medium shadow-sm">
            {images[current].location}
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation Buttons */}
      <button
        onClick={prevSlide}
        className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-md transition"
      >
        <ChevronLeft className="w-5 h-5 text-gray-700" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-md transition"
      >
        <ChevronRight className="w-5 h-5 text-gray-700" />
      </button>
    </div>

              
              {/* Campaign Info Chips */}
              <div className="flex flex-wrap items-center gap-3">
                {[
                  { icon: '⏳', text: 'Created 2 years ago' },
                  { icon: '🐾', text: 'Animals, Safety & Welfare' },
                  { icon: '🏷️', text: 'Verified Non-Profit' }
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ y: -2 }}
                    className={`flex items-center px-3 py-1.5 rounded-full text-sm  bg-gray-100 text-gray-700`}
                  >
                    <span className="mr-2">{item.icon}</span>
                    {item.text}
                  </motion.div>
                ))}
              </div>
              
              {/* Campaign Description */}
              <div className="space-y-6">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Our Mission</h2>
                
                <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed">
                  At <span className="font-semibold text-orange-600">Summer Sparks</span>, we&apos;re dedicated to protecting animals in need across India. 
                  Our comprehensive program provides shelter, medical care, and rehabilitation for abandoned and injured animals, 
                  while also working to educate communities about animal welfare.
                </p>
                
                {/* Highlight Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <motion.div 
                    whileHover={{ y: -5 }}
                    className="bg-gradient-to-br from-indigo-50 to-blue-50 dark:from-indigo-900/30 dark:to-blue-900/30 p-5 rounded-xl border-l-4 border-indigo-500 dark:border-indigo-400 shadow-sm hover:shadow-md transition-all duration-300"
                  >
                    <div className="flex">
                      <span className="text-indigo-500 mr-3 text-2xl">🏥</span>
                      <div>
                        <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Medical Care</h3>
                        <p className="text-gray-600 dark:text-gray-400 text-sm">
                          Providing essential veterinary services to injured and sick animals.
                        </p>
                      </div>
                    </div>
                  </motion.div>
                  
                  <motion.div 
                    whileHover={{ y: -5 }}
                    className="bg-gradient-to-br from-yellow-50 to-amber-50 dark:from-yellow-900/30 dark:to-amber-900/30 p-5 rounded-xl border-l-4 border-yellow-500 dark:border-yellow-400 shadow-sm hover:shadow-md transition-all duration-300"
                  >
                    <div className="flex">
                      <span className="text-yellow-500 mr-3 text-2xl">🍽️</span>
                      <div>
                        <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Nutrition Program</h3>
                        <p className="text-gray-600 dark:text-gray-400 text-sm">
                          Ensuring every animal receives proper nutrition daily.
                        </p>
                      </div>
                    </div>
                  </motion.div>
                  
                  <motion.div 
                    whileHover={{ y: -5 }}
                    className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/30 dark:to-emerald-900/30 p-5 rounded-xl border-l-4 border-green-500 dark:border-green-400 shadow-sm hover:shadow-md transition-all duration-300"
                  >
                    <div className="flex">
                      <span className="text-green-500 mr-3 text-2xl">🏠</span>
                      <div>
                        <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Shelter & Rehoming</h3>
                        <p className="text-gray-600 dark:text-gray-400 text-sm">
                          Finding loving forever homes for rehabilitated animals.
                        </p>
                      </div>
                    </div>
                  </motion.div>
                </div>

                {/* Video Embed */}
                {/* <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                  viewport={{ once: true }}
                  className="relative pt-[56.25%] rounded-xl overflow-hidden shadow-lg bg-gray-200 dark:bg-gray-700"
                >
                  <div className="absolute inset-0 flex items-center justify-center">
                    <button className="bg-white/90 backdrop-blur-sm p-4 rounded-full shadow-lg hover:scale-110 transition-transform">
                      <svg className="w-8 h-8 text-orange-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                      </svg>
                    </button>
                  </div>
                </motion.div> */}

                {/* Impact Section */}
                <div className="space-y-4">
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Our Impact</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {[
                      { value: '1,200+', label: 'Animals Helped' },
                      { value: '15', label: 'Shelters Built' },
                      { value: '85%', label: 'Adoption Rate' },
                      { value: '24/7', label: 'Emergency Care' }
                    ].map((stat, index) => (
                      <motion.div
                        key={index}
                        whileHover={{ scale: 1.05 }}
                        className={`p-4 rounded-xl text-center bg-white shadow-sm hover:shadow-md transition-shadow`}
                      >
                        <p className="text-2xl font-bold text-orange-500">{stat.value}</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</p>
                      </motion.div>
                    ))}
                  </div>
                </div>

               {/* Perks Section */}
<div id="perks" className={`min-h-screen rounded-l text-gray-800}`}>
  <div className="container mx-auto px-4 py-8">
    
    {/* Header */}
    <div className="flex justify-between items-center mb-6">
      <h1 className="text-2xl font-bold flex items-center">
        Choose a Perk <span className="ml-2 text-yellow-400">✨</span>
      </h1>
    </div>

 {/* Category Select */}
<div className="mb-8">
  <div className="relative w-full border border-gray-300 bg-white rounded-lg shadow-sm">
    <select 
      className="appearance-none w-full px-4 py-3 rounded-lg focus:outline-none bg-white"
      value={selectedCategory}
      onChange={(e) => setSelectedCategory(e.target.value)}
      aria-label="Select perk category"
    >
      <option value="All Perks">All Perks</option>
      <option value="Digital">Digital Rewards</option>
      <option value="Sponsorship">Sponsorships</option>
    </select>
    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4">
      <ChevronDown size={20} className="text-gray-500" />
    </div>
  </div>
</div>

{/* Perks Grid */}
<div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
  {filteredPerks.map((perk) => (
    <motion.div 
      key={perk.id} 
      whileHover={{ y: -5 }}
      className="p-5 rounded-xl flex items-center bg-white shadow-sm hover:shadow-md transition-all duration-300 border border-gray-200"
    >
      <div className="flex-shrink-0 mr-5">
        <img 
          src={perk.image} 
          alt={perk.name} 
          className="w-24 h-24 object-cover rounded-lg"
          loading="lazy"
        />
      </div>
      <div className="flex-1">
        <div className="flex justify-between items-start mb-1">
          <div>
            <h3 className="font-bold text-lg text-gray-900">{perk.name}</h3>
            <p className="text-orange-500 font-semibold">₹{perk.price}</p>
          </div>
          <span className="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-700">
            {perk.stock} remaining
          </span>
        </div>
        <p className="text-sm text-gray-600 mb-2">{perk.description}</p>
        <div className="flex justify-between items-center mt-2">
          <div className="flex items-center space-x-2">
            <IconButton
              onClick={() => updateCart(perk.id, -1)} 
              className="p-1 rounded-full text-gray-500 hover:text-gray-800 border border-gray-300"
              aria-label="Decrease quantity"
              size="small"
            >
              <Minus size={16} />
            </IconButton>
            <span className="mx-1 w-8 text-center">{cart[perk.id] || 0}</span>
            <IconButton
              onClick={() => updateCart(perk.id, 1)} 
              className="p-1 rounded-full text-gray-500 hover:text-gray-800 border border-gray-300"
              aria-label="Increase quantity"
              size="small"
            >
              <Plus size={16} />
            </IconButton>
          </div>
          {cart[perk.id] ? (
            <span className="text-sm text-green-600">Added to cart</span>
          ) : (
            <button 
              onClick={() => updateCart(perk.id, 1)}
              className="text-sm text-orange-500 hover:underline"
            >
              Add to cart
            </button>
          )}
        </div>
      </div>
    </motion.div>
  ))}
</div>

    {/* Cart Summary */}
    {Object.keys(cart).length > 0 && (
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className={`p-6 rounded-xl  bg-white shadow-lg border border-gray-200`}
      >
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Your Contribution</h3>
        
        <div className="space-y-3 mb-4">
          {filteredPerks
            .filter(perk => cart[perk.id])
            .map(perk => (
              <div key={perk.id} className="flex justify-between items-center">
                <div>
                  <span className="font-medium text-gray-900 dark:text-white">{perk.name}</span>
                  <span className="text-gray-500 dark:text-gray-400 text-sm ml-2">x{cart[perk.id]}</span>
                </div>
                <span className="font-medium">₹{parseInt(perk.price.replace(/,/g, '')) * cart[perk.id]}</span>
              </div>
            ))}
        </div>
        
        <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
          <div className="flex justify-between items-center font-semibold text-lg">
            <span>Total</span>
            <span>₹{subtotal}</span>
          </div>
        </div>
        
        <motion.div 
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="mt-6"
        >
          <Button
            variant="contained"
            fullWidth
            startIcon={<Heart size={20} />}
            style={{
              background: `linear-gradient(135deg, ${palettes.secondary.main}, ${palettes.primary.main})`,
              color: palettes.secondary.contrastText,
              padding: '12px',
              borderRadius: '12px',
              fontSize: '1rem',
              fontWeight: 600,
              boxShadow: '0 4px 6px rgba(245, 158, 11, 0.3)'
            }}
          >
            Proceed to Donate
          </Button>
        </motion.div>
      </motion.div>
    )}
  </div>
</div>
{/* Updates Section */}
<section className="space-y-8">
  <header className="flex items-center justify-between">
    <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
      Updates <span className="text-base font-medium text-gray-500 dark:text-gray-400">({updates.length})</span>
    </h2>
  </header>

  <div className="grid gap-6">
    {updates.map((update) => (
      <motion.article
        key={update.id}
        whileHover={{ y: -2 }}
        className={`p-6 rounded-2xl transition-shadow border shadow-sm hover:shadow-md bg-white border-gray-200
        `}
      >
        <div className="flex gap-4">
          <div className="h-10 w-10 flex-shrink-0 rounded-full bg-gradient-to-r from-orange-400 to-orange-600 flex items-center justify-center text-white font-bold">
            {update.author.charAt(0)}
          </div>

          <div className="flex-1 space-y-2">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{update.title}</h3>
              <span className="text-sm text-gray-500 dark:text-gray-400">{update.time}</span>
            </div>

            <p className="text-sm text-gray-500 dark:text-gray-400">
              Posted by <span className="text-orange-500 dark:text-orange-400">{update.author}</span> ({update.role})
            </p>

            <p className="text-gray-700 dark:text-gray-300 text-[15px] leading-relaxed">
              {update.content}
            </p>

            <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
              <button className="text-orange-500 dark:text-orange-400 hover:underline text-sm font-medium">
                Read full update
              </button>
            </div>
          </div>
        </div>
      </motion.article>
    ))}
  </div>
</section>



                {/* FAQ Section */}
                <div className="max-w-3xl mx-auto space-y-8 px-4 sm:px-6 lg:px-0">
  <h2 className="text-3xl font-semibold tracking-tight text-gray-900 dark:text-white">
    Frequently Asked Questions
  </h2>

  <div className="space-y-4">
  {faqs.map((faq, index) => {
  const isOpen = expanded === `panel${index}`;
  return (
    <motion.div
      key={index}
      whileHover={{ y: -2 }}
      className="rounded-2xl transition-colors duration-300 border bg-white border-gray-200 shadow-sm"
    >
      <button
        onClick={() => handleAccordionChange(`panel${index}`)}
        className="w-full flex items-center justify-between px-6 py-5 text-left group"
      >
        <span className="text-base font-medium text-gray-900">
          {faq.question}
        </span>
        <ChevronDown
          size={20}
          className={`transform transition-transform duration-200 ${isOpen ? 'rotate-180' : ''} text-gray-500`}
        />
      </button>

      <motion.div
        initial={{ height: 0, opacity: 0 }}
        animate={isOpen ? { height: "auto", opacity: 1 } : { height: 0, opacity: 0 }}
        transition={{ duration: 0.25, ease: "easeInOut" }}
        className={`px-6 ${isOpen ? 'pb-5' : ''} overflow-hidden`}
      >
        <p className="text-sm text-gray-600 leading-relaxed">
          {faq.answer}
        </p>
      </motion.div>
    </motion.div>
  );
})}

  </div>
</div>

              </div>
            </motion.div>
          </div>
          
          {/* Right Sidebar */}
<div className="space-y-6">
  {/* Donation Card */}
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    viewport={{ once: true }}
    className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 border border-gray-200 dark:border-gray-700 "
  >
    <div className="space-y-6">
      {/* Progress */}
      <div>
        <div className="flex justify-between items-center mb-1">
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Raised</span>
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{percentComplete.toFixed(0)}%</span>
        </div>
        <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
          <div 
            className="h-full rounded-full bg-gradient-to-r from-yellow-400 to-yellow-600"
            style={{ width: `${percentComplete}%` }}
          ></div>
        </div>
        <div className="flex justify-between mt-2">
          <span className="text-xs text-gray-500 dark:text-gray-400">{formatCurrency(raisedAmount)}</span>
          <span className="text-xs text-gray-500 dark:text-gray-400">{formatCurrency(goalAmount)}</span>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 text-center border-b border-gray-200 dark:border-gray-700 pb-5">
        {[
          { value: supporters, label: "Supporters" },
          { value: daysRemaining, label: "Days Left" },
          { value: "33%", label: "Funded" }
        ].map((stat, index) => (
          <div key={index}>
            <p className="text-lg font-bold text-gray-900 dark:text-white">{stat.value}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Amount Selection */}
      <div>
        <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">Select Amount</h3>
        <div className="grid grid-cols-3 gap-2">
          {[500, 1000, 2000, 5000, 10000, 20000].map((amount) => (
            <motion.button
              key={amount}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedAmount(`₹${amount.toLocaleString()}`)}
              className={`text-sm px-2 py-2 rounded-lg transition-all border ${
                selectedAmount === `₹${amount.toLocaleString()}`
                  ? "font-bold text-white shadow"
                  : "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
              }`}
              style={{
                backgroundColor:
                  selectedAmount === `₹${amount.toLocaleString()}` ? palettes.primary.main : undefined,
                borderColor:
                  selectedAmount === `₹${amount.toLocaleString()}` ? palettes.primary.main : "transparent",
              }}
            >
              ₹{amount.toLocaleString()}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Custom Amount Input */}
      <div>
        <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Custom Amount</h3>
        <div className="flex items-center border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 bg-white dark:bg-gray-900">
          <span className="text-gray-500 text-sm mr-2">₹</span>
          <input
            type="text"
            placeholder="500"
            className="w-full bg-transparent focus:outline-none text-sm text-gray-900 dark:text-white"
          />
        </div>
      </div>

      {/* Donation Type Toggle */}
      <div className="flex rounded-md overflow-hidden border border-gray-300 dark:border-gray-600">
        {["one-time", "monthly"].map((type, idx) => (
          <button
            key={type}
            onClick={() => setDonationType(type)}
            className={`flex-1 py-2 text-sm font-medium transition-all duration-200 ${
              donationType === type
                ? "text-white"
                : "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300"
            } ${idx === 0 ? "rounded-l-md" : "rounded-r-md"}`}
            style={{
              backgroundColor: donationType === type ? palettes.primary.main : undefined,
            }}
          >
            {type === "one-time" ? "One-time" : "Monthly"}
          </button>
        ))}
      </div>

      {/* Donate Button */}
      <motion.button
        whileTap={{ scale: 0.96 }}
        whileHover={{ scale: 1.02 }}
        className="w-full flex items-center justify-center gap-2 py-3 text-white text-sm font-bold rounded-lg shadow-lg transition duration-200"
        style={{
          backgroundColor: palettes.secondary.main,
        }}
      >
        <Heart className="h-4 w-4" /> Donate Now
      </motion.button>

      {/* Share and Follow Buttons */}
      <div className="grid grid-cols-2 gap-3">
        <button className="flex items-center justify-center gap-2 py-2 text-sm rounded-md bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-600 dark:text-gray-300">
          <Share className="h-4 w-4" />
          Share
        </button>
        <button className="flex items-center justify-center gap-2 py-2 text-sm rounded-md bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-600 dark:text-gray-300">
          <Heart className="h-4 w-4" />
          Follow
        </button>
      </div>
    </div>
  </motion.div>
  <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Recent Supporters</h3>
        
        <div className="space-y-4">
          {[
            { name: "Swapnil Kumbhar", time: "2 days ago", amount: "₹25,000" },
            { name: "Anand Ahuja", time: "3 days ago", amount: "₹2,599" },
            { name: "Aakash Sagar", time: "5 days ago", amount: "₹5,000" },
            { name: "Rahul Mehta", time: "1 week ago", amount: "₹10,000" },
          ].map((donor, index) => (
            <div 
              key={index}
              className="flex items-center group"
            >
              <div className="h-10 w-10 rounded-full bg-gradient-to-r from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-600 mr-3 flex-shrink-0 group-hover:from-gray-300 group-hover:to-gray-400 dark:group-hover:from-gray-600 dark:group-hover:to-gray-500 transition"></div>
              <div className="flex-1 min-w-0">
                <h4 className="font-medium text-gray-900 dark:text-white truncate">{donor.name}</h4>
                <p className="text-gray-500 dark:text-gray-400 text-sm truncate">{donor.time} — {donor.amount}</p>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-4 text-center">
          <button className="text-orange-500 dark:text-yellow-400 hover:text-orange-800 dark:hover:text-yellow-300 text-sm font-medium transition-colors duration-200">
            See all
          </button>
        </div>
      </div>
      
      {/* Organizer Info */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">About this campaign</h3>
        
        <div className="space-y-3 text-sm text-gray-600 dark:text-gray-400">
          <p>
            Join us in igniting Summer Sparks to empower India and protect animal safety with a fundraising goal of ₹5,00,000 this summer!
          </p>
          <p>
            All donations are tax-deductible and will go directly to supporting our mission to provide shelter, medical care, and rehabilitation for abandoned and injured animals across India.
          </p>
        </div>
        
        <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
          <div className="flex items-center">
            <div className="h-12 w-12 rounded-full bg-gradient-to-r from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-600 mr-3 flex-shrink-0"></div>
            <div className="flex-1 min-w-0">
              <h4 className="font-medium text-gray-900 dark:text-white truncate">Abundance Team</h4>
              <div className="flex items-center">
                <span className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 px-2 py-0.5 rounded text-xs mr-2 font-medium">Verified</span>
                <p className="text-gray-500 dark:text-gray-400 text-xs truncate">Campaign Organizer</p>
              </div>
            </div>
          </div>
        </div>
      </div>
</div>
        </div>
      </div>

      <motion.footer
  initial={{ opacity: 0 }}
  whileInView={{ opacity: 1 }}
  transition={{ duration: 0.6 }}
  viewport={{ once: true }}
  className={`mt-16 rounded-2xl shadow-md border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900`}
>
  <div className="max-w-7xl mx-auto px-6 py-12 space-y-12">
    {/* Grid Layout */}
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
      
      {/* Brand + Contact Info */}
      <div className="space-y-4">
        <div className="flex items-center space-x-3">
          <img
            src="https://cdn.pixabay.com/photo/2022/08/21/03/48/smile-7400381_1280.jpg"
            alt="Joyful Minds Logo"
            className="h-10 w-10 rounded-full object-cover"
          />
          <span className="text-xl font-bold text-gray-900 dark:text-white">Joyful Minds</span>
        </div>

        <div className="text-sm text-gray-600 dark:text-gray-300 space-y-2">
          <div className="flex items-start">
            <MapPin className="h-5 w-5 mr-2 text-indigo-400 flex-shrink-0 mt-0.5" />
            206 Sankalp Nagar, Wathoda Nagpur 440008
          </div>
          <div className="flex items-center">
            <Phone className="h-5 w-5 mr-2 text-indigo-400 flex-shrink-0" />
            9175764210
          </div>
          <div className="flex items-center">
            <Mail className="h-5 w-5 mr-2 text-indigo-400 flex-shrink-0" />
            joyfulminds@gmail.com
          </div>
        </div>

        {/* Social Icons */}
        <div className="flex space-x-4 pt-2">
          {[
            { path: "M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z", color: "text-blue-500 hover:text-blue-400" },
            { path: "M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.189-1.452.232-2.224.084.626 1.956 2.444 3.377 4.6 3.418-2.068 1.622-4.678 2.348-7.29 2.038 2.179 1.397 4.768 2.21 7.557 2.21 9.054 0 14.002-7.496 14.002-13.986 0-.213-.005-.425-.014-.636z", color: "text-sky-500 hover:text-sky-400" },
          ].map((item, index) => (
            <svg
              key={index}
              fill="currentColor"
              viewBox="0 0 24 24"
              className={`h-6 w-6 ${item.color} cursor-pointer transition duration-300`}
            >
              <path d={item.path} />
            </svg>
          ))}
        </div>
      </div>

      {/* Quick Links */}
      <div>
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Quick Links</h3>
        <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
          {["Home", "About Us", "Programs", "Contact"].map((link, i) => (
            <li key={i}><a href="#" className="hover:text-indigo-500">{link}</a></li>
          ))}
        </ul>
      </div>

      {/* Resources */}
      <div>
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Resources</h3>
        <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
          {["Blog", "FAQs", "Privacy Policy", "Terms of Use"].map((link, i) => (
            <li key={i}><a href="#" className="hover:text-indigo-500">{link}</a></li>
          ))}
        </ul>
      </div>

      {/* Newsletter */}
      <div>
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Newsletter</h3>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
          Stay updated with our latest news and offers.
        </p>
        <form className="flex flex-col sm:flex-row items-center">
          <input
            type="email"
            placeholder="Your email"
            className="w-full px-4 py-2 mb-2 sm:mb-0 sm:mr-2 rounded-md bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-indigo-500 hover:bg-indigo-600 text-white rounded-md font-medium transition"
          >
            Subscribe
          </button>
        </form>
      </div>


    </div>

    {/* Bottom Bar */}
    <div className="pt-6 border-t border-gray-200 dark:border-gray-700 text-sm text-center text-gray-500 dark:text-gray-400">
      © {new Date().getFullYear()} Joyful Minds. All rights reserved.
    </div>
  </div>
</motion.footer>

    </main>
  );
}