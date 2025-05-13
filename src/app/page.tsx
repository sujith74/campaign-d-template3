"use client";

import React, { useState} from 'react';
import { motion } from 'framer-motion';
import { 
  Button, 

  Typography, 

  IconButton,
 
  Accordion,
  AccordionSummary,
  AccordionDetails,
 
} from '@mui/material';
import { 
  ChevronDown, 

  Heart, 
  Share, 
  Users, 

  Plus, 
  Minus,
  Clock,
  
} from 'lucide-react';

// Define theme palettes
const palettes = {
  primary: {
    light: '#f5d0fe',
    main: '#d8b4fe',
    dark: '#c084fc',
    contrastText: '#fff'
  },
  secondary: {
    light: '#eab308',
    main: '#ca8a04',
    dark: '#a16207',
    contrastText: '#fff'
  }
};

export default function CampaignPage() {

  
type Cart = Record<number, number>;

  // const [darkMode, setDarkMode] = useState(false);
  const [selectedAmount, setSelectedAmount] = useState('₹500');
  // const [customAmount, setCustomAmount] = useState('');
  const [donationType, setDonationType] = useState('one-time');
  // const [cart, setCart] = useState({});
  const [selectedCategory, setSelectedCategory] = useState('All Perks');
  
  const [cart, setCart] = useState<Cart>({});
  // const [perks, setPerks] = useState<Perk[]>([]);
  const [expanded, setExpanded] = useState<string | false>(false);
  

  // Progress values
  const raisedAmount = 165780;
  const goalAmount = 500000;
  const percentComplete = Math.min(100, (raisedAmount / goalAmount) * 100);
  const daysRemaining = 56;
  const supporters = 48;

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  // Sample perks data
  const perks = [
    {
      id: 1,
      name: "Supporter Pack",
      description: "Your name on our website + exclusive digital thank you card",
      price: 500,
      stock: 50,
      image: "https://cdn.pixabay.com/photo/2016/11/14/05/21/children-1822688_1280.jpg",
      category: "Digital"
    },
    {
      id: 2,
      name: "Animal Friend",
      description: "Adopt a rescued animal + certificate + monthly updates",
      price: 2000,
      stock: 25,
      image: "https://cdn.pixabay.com/photo/2025/03/29/11/20/bee-9500879_1280.jpg",
      category: "Sponsorship"
    }
  ];

  // Updates data
  const updates = [
    {
      id: 1,
      title: "First vaccination drive completed!",
      time: "2 weeks ago",
      author: "Team Sparks",
      role: "Campaign Organizer",
      content: "We're thrilled to announce that our first vaccination drive was a huge success! We were able to vaccinate over 100 animals in rural areas around Mumbai. Thank you to all our supporters who made this possible."
    }
  ];

  // Filter perks based on selected category
   const filteredPerks = selectedCategory === 'All Perks' 
    ? perks 
    : perks.filter(perk => perk.category === selectedCategory);

  // Calculate subtotal
  const subtotal = Object.keys(cart).reduce((sum, id) => {
    const perk = perks.find(p => p.id === parseInt(id));
    return sum + (perk ? perk.price * cart[+id] : 0); // +id to convert string to number
  }, 0);

  // Update cart
  const updateCart = (id: number, change: number) => {
    setCart((prevCart) => {
      const newCart = { ...prevCart };
      const currentAmount = newCart[id] || 0;
      const newAmount = currentAmount + change;
  
      if (newAmount <= 0) {
        delete newCart[id];
      } else {
        newCart[id] = newAmount;
      }
  
      return newCart;
    });
  };

  // FAQ accordion
  const handleAccordionChange =
  (panel: string) => (_event: React.SyntheticEvent, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : false);
  };
  // Constants for animation
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className={`min-h-screen bg-gray-50 text-gray-900`}>
      {/* Header */}
      <motion.header 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className={`sticky top-0 z-50 bg-white shadow-sm`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div className="h-8 w-8 rounded-full bg-yellow-500 flex items-center justify-center text-white font-bold">A</div>
            <span className="font-medium text-lg">Joyful Minds</span>
          </div>
          
          <nav className="hidden md:flex space-x-8">
            <a href="#" className="hover:text-yellow-500 transition-colors font-medium">Home</a>
            <a href="#" className="hover:text-yellow-500 transition-colors font-medium">Discover</a>
            <a href="#" className="hover:text-yellow-500 transition-colors font-medium">About Us</a>
          </nav>
          
          <Button
            variant="contained"
            style={{
              backgroundColor: palettes.secondary.main,
              color: palettes.secondary.contrastText,
              borderRadius: '9999px',
              textTransform: 'none',
              padding: '8px 16px',
              fontWeight: 600
            }}
          >
            Start a Campaign
          </Button>
        </div>
      </motion.header>
      
      {/* Hero Section */}
      <motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ duration: 0.8 }}
  className="bg-yellow-500 text-white py-10 sm:py-12"
>
  <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2, duration: 0.5 }}
      className="mb-4"
    >
      <div className="bg-yellow-600/50 text-white inline-block px-3 py-1 rounded-full text-xs sm:text-sm mb-3">
        Animal Safety
      </div>
      <h1 className="text-3xl md:text-4xl font-bold leading-tight mb-3">
        Summer Sparks: Empowering India
      </h1>
      <p className="text-base md:text-lg mb-6 max-w-2xl">
        Join us in igniting Summer Sparks to empower India and protect animal safety with a fundraising goal of ₹500,000 this summer!
      </p>

      <div className="flex flex-wrap gap-3">
        <Button
          variant="contained"
          style={{
            backgroundColor: 'white',
            color: palettes.secondary.main,
            borderRadius: '9999px',
            textTransform: 'none',
            padding: '8px 20px',
            fontWeight: 600,
            fontSize: '0.875rem'
          }}
        >
          Donate Now
        </Button>

        <Button
          variant="outlined"
          style={{
            borderColor: 'white',
            color: 'white',
            borderRadius: '9999px',
            textTransform: 'none',
            padding: '8px 20px',
            fontWeight: 600,
            fontSize: '0.875rem'
          }}
        >
          Learn More
        </Button>
      </div>
    </motion.div>
  </div>
</motion.div>

{/* Campaign Progress */}
<div className="bg-white dark:bg-gray-800 shadow-sm">
  <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
    <div className="flex flex-wrap items-center justify-between">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="mb-4 md:mb-0"
      >
        <h2 className="text-2xl font-bold text-yellow-600">{formatCurrency(raisedAmount)}</h2>
        <p className="text-sm text-gray-500 dark:text-gray-400">raised of {formatCurrency(goalAmount)}</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        className="mb-4 md:mb-0 text-center"
      >
        <h2 className="text-2xl font-bold">{supporters}</h2>
        <p className="text-sm text-gray-500 dark:text-gray-400">supporters</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        className="mb-4 md:mb-0 text-center"
      >
        <h2 className="text-2xl font-bold">{daysRemaining}</h2>
        <p className="text-sm text-gray-500 dark:text-gray-400">days remaining</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.6, duration: 0.5 }}
        className="flex space-x-2"
      >
        <Button
          variant="outlined"
          startIcon={<Share size={16} />}
          style={{
            borderColor: palettes.primary.main,
            color: palettes.primary.main,
            borderRadius: '9999px',
            textTransform: 'none',
            fontSize: '0.875rem'
          }}
        >
          Share
        </Button>

        <Button
          variant="outlined"
          style={{
            borderColor: palettes.secondary.main,
            color: palettes.secondary.main,
            borderRadius: '9999px',
            textTransform: 'none',
            fontSize: '0.875rem'
          }}
        >
          Follow
        </Button>
      </motion.div>
    </div>

    <motion.div
      initial={{ scaleX: 0 }}
      animate={{ scaleX: 1 }}
      transition={{ delay: 0.7, duration: 0.8 }}
      className="mt-5 w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden"
    >
      <div
        className="h-full bg-yellow-500 rounded-full"
        style={{ width: `${percentComplete}%` }}
      ></div>
    </motion.div>
  </div>
</div>

      
      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Content - Campaign Details */}
          <div className="lg:col-span-2 space-y-8">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              variants={fadeIn}
              className="space-y-8"
            >
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white leading-tight">
                Summer Sparks: Empowering India
              </h1>
              
              {/* Main Image */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.98 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <img 
                  src="https://cdn.pixabay.com/photo/2019/06/14/15/34/friendship-4273865_1280.jpg" 
                  alt="Campaign main image" 
                  className="w-full object-cover h-96 md:h-[500px]"
                />
              </motion.div>
              
              {/* Campaign Info */}
              <div className="flex flex-wrap items-center text-gray-500 dark:text-gray-400 text-sm gap-4">
                <div className="flex items-center bg-gray-50 dark:bg-gray-800 px-3 py-1.5 rounded-full border border-gray-200 dark:border-gray-700">
                  <span className="bg-blue-100 dark:bg-blue-900 p-1 rounded-full mr-2">
                    <Clock className="h-4 w-4 text-blue-500 dark:text-blue-400" />
                  </span>
                  Created 2 years ago
                </div>
                <div className="flex items-center bg-gray-50 dark:bg-gray-800 px-3 py-1.5 rounded-full border border-gray-200 dark:border-gray-700">
                  <span className="bg-purple-100 dark:bg-purple-900 p-1 rounded-full mr-2">
                    <Users className="h-4 w-4 text-purple-500 dark:text-purple-400" />
                  </span>
                  Animals, Safety & Welfare
                </div>
              </div>
              
              {/* Campaign Description */}
              <div className="space-y-8">
                <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed">
                  Help protect animals in need across India! Join our Summer Sparks campaign to make a difference.
                  Our goal is to raise ₹500,000 this summer. #SummerSparksIndia
                </p>
                
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                  viewport={{ once: true }}
                  className="bg-gradient-to-r from-indigo-50 to-blue-50 dark:from-indigo-900/50 dark:to-blue-900/50 p-6 rounded-xl border-l-4 border-indigo-500 dark:border-indigo-400 shadow-sm hover:shadow-md transition-shadow duration-300"
                >
                  <div className="flex">
                    <span className="text-yellow-500 mr-3 text-2xl">✨</span>
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                      At Summer Sparks, we are driven by an unwavering commitment to enhancing the safety and well-being of 
                      animals across India. We firmly believe that every animal deserves protection and care. We understand that 
                      healthy animals contribute to healthier ecosystems and communities.
                    </p>
                  </div>
                </motion.div>
                
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                  viewport={{ once: true }}
                  className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/50 dark:to-indigo-900/50 p-6 rounded-xl border-l-4 border-blue-500 dark:border-blue-400 shadow-sm hover:shadow-md transition-shadow duration-300"
                >
                  <div className="flex">
                    <span className="text-blue-500 mr-3 text-2xl">🌐</span>
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                      In many parts of India, animals face challenges including lack of proper veterinary care, malnutrition, and unsafe living conditions. 
                      With your support, we can provide necessary care, food, and protection to these animals in need, creating a better environment for all.
                    </p>
                  </div>
                </motion.div>

                {/* Perks Section */}
                <div id="perks" className={`rounded-lg  text-gray-800`}>
                  <div className="container mx-auto py-8">
                    <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6 gap-4">
                      <h2 className="text-2xl font-bold flex items-center">
                        Choose a perk <span className="ml-2 text-yellow-400">✨</span>
                      </h2>

                      <div className={`relative w-full md:w-60 border rounded-lg border-gray-300 bg-white`}>
                        <select 
                          className={`appearance-none w-full px-4 py-2 rounded-lg focus:outline-none bg-white `}
                          value={selectedCategory}
                          onChange={(e) => setSelectedCategory(e.target.value)}
                          aria-label="Select perk category"
                        >
                          <option value="All Perks">All Perks</option>
                          <option value="Digital">Digital</option>
                          <option value="Sponsorship">Sponsorship</option>
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3">
                          <ChevronDown size={20} className='text-gray-500' />
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                      {filteredPerks.map((perk) => (
                        <motion.div 
                          key={perk.id} 
                          initial={{ opacity: 0, y: 10 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.5 }}
                          viewport={{ once: true }}
                          className={`p-5 rounded-lg flex flex-col sm:flex-row sm:items-center bg-white shadow-sm hover:shadow-md transition-all duration-300`}
                        >
                          <div className="flex-shrink-0 sm:mr-6 mb-4 sm:mb-0 flex flex-col items-center">
                            <img 
                              src={perk.image} 
                              alt={perk.name} 
                              className="w-20 h-20 object-cover rounded mb-2"
                              width={64}
                              height={64}
                            />
                            <div className="font-bold text-sm text-center">₹{perk.price}</div>
                          </div>

                          <div className="flex flex-col w-full">
                            <h3 className="font-bold mb-1">{perk.name}</h3>
                            <p className={`text-sm text-gray-600 mb-2`}>
                              {perk.description}
                            </p>

                            <div className="flex justify-between items-center mt-auto">
                              <p className={`text-xs text-gray-400`}>
                                Only {perk.stock} remaining.
                              </p>
                              <div className="flex items-center">
                                <IconButton
                                  onClick={() => updateCart(perk.id, -1)} 
                                  className={`p-1 rounded-full text-gray-500 hover:text-gray-800`}
                                  aria-label="Decrease quantity"
                                  size="small"
                                >
                                  <Minus size={16} />
                                </IconButton>
                                <span className="mx-2 text-xs text-gray-500">{cart[perk.id] || 0}</span>
                                <IconButton
                                  onClick={() => updateCart(perk.id, 1)} 
                                  className={`p-1 rounded-full text-gray-500 hover:text-gray-800`}
                                  aria-label="Increase quantity"
                                  size="small"
                                >
                                  <Plus size={16} />
                                </IconButton>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>

                    {/* Subtotal and Donate Button */}
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5 }}
                      viewport={{ once: true }}
                      className={`p-5 rounded-lg flex flex-col items-center justify-between bg-white shadow-sm`}
                    >
                      <div className='text-center mb-4'>
                        <p className="text-sm font-medium leading-relaxed">
                          Subtotal ({Object.keys(cart).length} items):
                        </p>
                        <p className="text-2xl font-bold leading-relaxed">
                          ₹{subtotal}
                        </p>
                      </div>

                      <Button
                        variant="contained"
                        disabled={Object.keys(cart).length === 0}
                        startIcon={<Heart size={20} />}
                        style={{
                          backgroundColor: Object.keys(cart).length > 0 ? palettes.secondary.main : '',
                          color: palettes.secondary.contrastText,
                          width: '100%',
                          maxWidth: '20rem',
                          padding: '10px',
                          borderRadius: '8px',
                        }}
                      >
                        DONATE NOW
                      </Button>
                    </motion.div>
                  </div>
                </div>

                {/* Updates */}
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true }}
                  className="container mx-auto py-8 max-w-5xl"
                >
                  <div className="bg-white dark:bg-gray-900 rounded-lg shadow-sm p-6">
                    <h2 className="text-2xl font-bold text-gray-800 dark:text-white leading-relaxed">
                      Updates ({updates.length})
                    </h2>

                    <div className="border-t border-gray-200 dark:border-gray-700">
                      {updates.map((update) => (
                        <div key={update.id} className="relative pl-8 pt-8">
                          {/* Timeline elements */}
                          <div className="absolute left-0 top-8 h-full w-px bg-green-500"></div>
                          <div className="absolute left-0 top-8 w-2 h-2 rounded-full bg-green-500 -translate-x-1/2"></div>

                          <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            viewport={{ once: true }}
                            className="mb-8"
                          >
                            <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-1">
                              {update.title}
                            </h3>
                            <div className="flex items-center text-gray-500 dark:text-gray-400 text-sm mb-4">
                              <Clock className="h-4 w-4 mr-1" />
                              <span className="mr-2">{update.time}</span>
                              <span className="mr-2">by</span>
                              <span className="text-indigo-600 dark:text-indigo-400 font-medium mr-1">
                                {update.author}
                              </span>
                              <span>{update.role}</span>
                            </div>

                            <div className="text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                              <p>{update.content}</p>
                            </div>

                            <div className="w-full h-32 bg-gradient-to-b from-gray-200 to-gray-300 dark:from-gray-800 dark:to-gray-700 rounded-lg mb-4 flex items-center justify-center">
                              <Button
                                variant="contained"
                                style={{
                                  backgroundColor: 'white',
                                  color:  palettes.secondary.main,
                                  borderRadius: '8px',
                                }}
                              >
                                Read More
                              </Button>
                            </div>
                          </motion.div>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>

                {/* Our Initiatives */}
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.5 }}
                  viewport={{ once: true }}
                  className="space-y-6"
                >
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center">
                    <span className="text-pink-500 mr-3 text-2xl">💕</span> Our Initiatives:
                  </h2>
                  
                  <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-100 dark:border-gray-700 hover:shadow-md transition-shadow duration-300">
                    <h3 className="font-semibold text-gray-900 dark:text-white text-lg mb-3">Vaccination Drives:</h3>
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                      Every animal deserves protection against diseases. We conduct regular vaccination drives 
                      providing life-saving protection to stray and abandoned animals across India.
                    </p>
                  </div>
                </motion.div>

                {/* FAQ Section */}
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, duration: 0.5 }}
                  viewport={{ once: true }}
                  className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-100 dark:border-gray-700"
                >
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">FAQ&apos;s</h3>
                  
                  <div className="space-y-4">
                    <Accordion 
                      expanded={expanded === 'panel1'} 
                      onChange={handleAccordionChange('panel1')}
                      sx={{ 
                        backgroundColor: 'white',
                        color: 'inherit',
                        borderBottom: '1px solid rgb(243 244 246)',
                        boxShadow: 'none',
                        '&:before': {
                          display: 'none',
                        },
                      }}
                    >
                      <AccordionSummary
                        expandIcon={<ChevronDown className="text-gray-400" />}
                        aria-controls="panel1-content"
                        id="panel1-header"
                      >
                        <Typography className="text-gray-700 dark:text-gray-300 font-medium">
                          Can I support more than one mission?
                        </Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                        <Typography className="text-gray-600 dark:text-gray-400">
                          Yes, you can support multiple missions on our platform. There&apos;s no limit to the number of causes you can donate to.
                        </Typography>
                      </AccordionDetails>
                    </Accordion>
                    
                    </div>
                    </motion.div>
                    </div>
                    </motion.div>
                    </div>
                    <div className="lg:col-span-1 space-y-6">
      {/* Donation Card */}
      <motion.div
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, ease: "easeOut" }}
    className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl p-6 border border-gray-200 dark:border-gray- max-w-sm mx-auto"
  >
    <div className="space-y-6">
      {/* Raised Amount */}
      <div>
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white">₹1,65,780</h3>
        <p className="text-sm text-gray-500 dark:text-gray-400">raised of ₹5,00,000</p>
      </div>

      {/* Progress Bar */}
      <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
        <motion.div
          className="h-full rounded-full"
          style={{ backgroundColor: palettes.primary.main }}
          initial={{ width: 0 }}
          animate={{ width: "33%" }}
          transition={{ duration: 0.6 }}
        />
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 text-center text-sm border-b border-gray-200 dark:border-gray-700 pb-4">
        {[
          { label: "supporters", value: "48" },
          { label: "days left", value: "56" },
          { label: "funded", value: "33%" },
        ].map(({ label, value }) => (
          <div key={label}>
            <h4 className="text-base font-semibold text-gray-900 dark:text-white">{value}</h4>
            <p className="text-[11px] text-gray-500 dark:text-gray-400">{label}</p>
          </div>
        ))}
      </div>

      {/* Amount Options */}
      <div>
        <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Select Amount</p>
        <div className="grid grid-cols-3 gap-3">
          {["₹500", "₹1,000", "₹2,000", "₹5,000", "₹10,000", "₹20,000"].map((amount) => (
            <button
              key={amount}
              onClick={() => setSelectedAmount(amount)}
              className={`text-sm px-3 py-1.5 rounded-lg transition-all duration-200 border ${
                selectedAmount === amount
                  ? "font-bold text-white shadow-md"
                  : "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
              }`}
              style={{
                backgroundColor: selectedAmount === amount ? palettes.primary.main : undefined,
                borderColor: selectedAmount === amount ? palettes.primary.main : "transparent",
              }}
            >
              {amount}
            </button>
          ))}
        </div>
      </div>

      {/* Custom Amount Input */}
      <div>
        <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Custom Amount</p>
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
        <button className="flex items-center justify-center gap-2 py-2 text-sm rounded-md bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600 transition">
          <Share className="h-4 w-4" /> Share
        </button>
        <button
          className="flex items-center justify-center gap-2 py-2 text-sm rounded-md border border-gray-300 dark:border-gray-600 text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition"
          style={{ backgroundColor: "#f9f9f9" }}
        >
          <Users className="h-4 w-4" /> Follow
        </button>
      </div>
    </div>
  </motion.div>


      {/* Recent Donors - Updated to match the image design */}
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
          <button className="text-yellow-600 dark:text-yellow-400 hover:text-yellow-800 dark:hover:text-yellow-300 text-sm font-medium transition-colors duration-200">
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
                      
                      </div>
  )
}
                    
                   
                      