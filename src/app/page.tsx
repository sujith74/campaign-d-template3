'use client';
import React, { useState, useEffect, ChangeEvent } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Share, Users, Heart, MinusCircle,PlusCircle, ChevronDown, ChevronUp, ArrowUp, Mail, MapPin, Phone,  } from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import AccessTimeIcon from '@mui/icons-material/AccessTime';

import { MenuItem,  Box, Paper, ListItemText, ListItemIcon } from '@mui/material';

import { ExpandMore, Check } from '@mui/icons-material';



export default function JoyfulMindsPage() {

  interface Cart {
    [key: string]: number; // or number if id is numeric
  }

  interface Perk {
    id: number;
    name: string;
    description: string;
    image: string;
    price: number;
    stock: number;
  }
  

  const [showScrollTop, setShowScrollTop] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [cart, setCart] = useState<Cart>({});
  const [subtotal, setSubtotal] = useState(0);
  const [open, setOpen] = useState(false);
  const [hoveredItem, setHoveredItem] =  useState<string | null>(null);
  const { scrollY } = useScroll();
  const [currency, setCurrency] = useState('INR');



  const currencies = ['USD', 'INR', 'EUR', 'GBP'];

  const handleChange = (event: ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    setCurrency(event.target.value);
  };

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Custom input for MUI Select to allow styling with Tailwind
// const CustomSelect = styled(Select)(({ theme }) => ({
//   '& .MuiSelect-select': {
//     display: 'flex',
//     alignItems: 'center',
//     padding: '8px 12px',
//     fontWeight: 500,
//   },
//   '& .MuiOutlinedInput-notchedOutline': {
//     border: 0,
//   },
//   '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
//     border: 0,
//   },
// }));

// const donors = [
//   { name: "Good Soul", time: "a month ago", amount: "INR 1" },
//   { name: "Good Soul", time: "6 months ago", amount: "INR 1" },
//   { name: "Aditya Saste", time: "6 months ago", amount: "INR 1" },
//   { name: "SHARAN INGALESHWAR", time: "9 months ago", amount: "INR 1 / Month", subscribed: true },
//   { name: "SHARAN INGALESHWAR", time: "10 months ago", amount: "INR 1" },
//   { name: "Aditya Saste", time: "10 months ago", amount: "INR 1" },
//   { name: "kiran kumar", time: "a year ago", amount: "INR 55000", on: "Chet Jain" },
// ];


  // Categories for the dropdown
  const categories = [
    'All',
    'Books',
    'Accessories',
    'Donations',
    'Other'
  ];

  // Available perks
  const perks = [
    {
      id: 1,
      name: 'Book- The 7 Habits of Highly Effective People',
      description: 'The 7 Habits of Highly Effective People, first edition',
      price: 1000,
      image: 'https://crowdera-platform.s3.ap-south-1.amazonaws.com/gocrowdera/campaign-assets/dbf91ad2-53da-46b2-b104-9de8a428d7e7_thumbnail_OIP (18).jpeg',
      category: 'Books',
      stock: 9
    },
    {
      id: 2,
      name: 'Backpack- Student Urban Design',
      description: 'The Basil Urban Dry Backpack is a comfortable and stylish choice',
      price: 3000,
      image: 'https://crowdera-platform.s3.ap-south-1.amazonaws.com/gocrowdera/campaign-assets/72857a90-6bbe-40c7-a20d-a4b4f4214f1d_thumbnail_OIP (19).jpeg',
      category: 'Accessories',
      stock: 9
    },
    {
      id: 3,
      name: 'JaipurFoot Gratitude Box',
      description: 'Expressing Gratitude for Generous Supporters',
      price: 5000,
      image: 'https://crowdera-platform.s3.ap-south-1.amazonaws.com/assets/reward-1.png',
      category: 'Donations',
      stock: 1000
    }
  ];

  // Filter perks based on selected category
  const filteredPerks: Perk[]  = selectedCategory === 'All' 
    ? perks 
    : perks.filter(perk => perk.category === selectedCategory);

  // Update cart and subtotal
  const updateCart = (id: number, change: number) => {
    // const perk = perks.find(p => p.id === id);
    const currentQuantity = cart[id] || 0;
    const newQuantity = Math.max(0, currentQuantity + change);
    
    const newCart = { ...cart };
    if (newQuantity === 0) {
      delete newCart[id];
    } else {
      newCart[id] = newQuantity;
    }
    
    setCart(newCart);
  };

  // Calculate subtotal whenever cart changes
  useEffect(() => {
    let total = 0;
    Object.entries(cart).forEach(([id, quantity]) => {
      const perk = perks.find(p => p.id === parseInt(id));
      if (perk) {
        total += perk.price * quantity;
      }
    });
    setSubtotal(total);
  }, [cart]);

  // Format price in Indian Rupees
  const formatPrice = (price: number): string => {
    return `₹${price.toLocaleString('en-IN')}`;
  };

  // // Toggle dark mode
  // const toggleDarkMode = () => {
  //   setDarkMode(!darkMode);
  // };


  const updates = [
    {
      id: 1,
      title: "New campaign update",
      time: "a minute ago",
      author: "Swapnil Kumbhar",
      role: "(Organizer)",
      content: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.",
    }
  ];

  const palettes = {
    primary: {
      light: "#4C9F38",
      main: "#4C9F38",
      dark: "#4C9F38",
      contrastText: "#fff"
    },
    secondary: {
      light: "#eecd5e",
      main: "#E9BD29",
      dark: "#d5a916",
      contrastText: "#000"
    }
  };

  // Animation values
  const headerOpacity = useTransform(scrollY, [0, 100], [1, 0.9]);
  const headerScale = useTransform(scrollY, [0, 100], [1, 0.98]);

  return (
    <div className={`font-sans ${darkMode ? 'dark bg-gray-900' : 'bg-gray-50'} min-h-screen transition-colors duration-300`}>
      {/* Navigation */}
      <motion.nav 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="bg-white dark:bg-gray-800 shadow-sm sticky top-0  z-50 border-b border-gray-100 dark:border-gray-700"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex justify-between items-center">
          <div className="flex items-center">
            <img 
              src="https://cdn.pixabay.com/photo/2022/08/21/03/48/smile-7400381_1280.jpg" 
              alt="Joyful Minds Logo" 
              className="mr-2 h-10 w-10 rounded-full object-cover"
            />
            <span className="font-bold text-indigo-600 dark:text-indigo-400 text-xl">Joyful Minds</span>
          </div>
          <div className="hidden md:flex space-x-6">
  {['HOME', 'ABOUT US', 'OUR INITIATIVES', 'LOG IN', 'PERKS', 'CONTACT US'].map((item) => {
    const href =
      item === 'PERKS' ? '#perks' :
      item === 'HOME' ? '/' :
      item === 'ABOUT US' ? '#about' :
      item === 'OUR INITIATIVES' ? '#initiatives' :
      item === 'LOG IN' ? '#login' :
      item === 'CONTACT US' ? '#contact' :
      '#';

    return (
      <a 
        key={item}
        href={href}
        className="text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors duration-200 font-medium text-sm"
      >
        {item}
      </a>
    );
  })}
</div>



          {/* Currency */}
          <Box className="relative w-32">
      {/* Custom styled select component */}
      <Box
        className={`rounded-xl border-2 bg-white/80 backdrop-blur-sm dark:bg-gray-800/80
          ${open ? 'border-blue-400 dark:border-blue-500' : 'border-gray-200 dark:border-gray-600'}
          transition-all duration-200 shadow-sm hover:shadow-md cursor-pointer`}
        onClick={() => setOpen(!open)}
      >
        <Box className="flex items-center justify-between px-3 py-2">
          <span className="text-sm font-medium text-gray-800 dark:text-gray-100 ">
            {currency}
          </span>
          <motion.div animate={{ rotate: open ? 180 : 0 }}>
            <ExpandMore className="text-gray-500 dark:text-gray-400 " />
          </motion.div>
        </Box>
      </Box>

      {/* Floating label */}
      <motion.span 
        className={`absolute -top-2 left-2 px-1 text-xs font-medium rounded
          ${open ? 'text-blue-500 dark:text-blue-400 bg-white dark:bg-gray-800' : 
            'text-gray-500 dark:text-gray-400 bg-white/80 dark:bg-gray-800/80'}`}
        transition={{ duration: 0.2 }}
      >
        Currency
      </motion.span>

      {/* Custom dropdown menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute z-10 w-full mt-1"
          >
            <Paper className="shadow-xl rounded-lg overflow-hidden dark:bg-gray-800">
              {currencies.map((option: string) => (
                <MenuItem
                  key={option}
                  value={option}
                  selected={currency === option}
                  onClick={() => {
                    handleChange({ target: { value: option } }as React.ChangeEvent<HTMLInputElement>);
                    setOpen(false);
                  }}
                  onMouseEnter={() => setHoveredItem(option)}
                  onMouseLeave={() => setHoveredItem(null)}
                  className={`px-3 py-2 transition-all duration-100 ${
                    currency === option
                      ? 'bg-blue-50/50 dark:bg-blue-900/30 '
                      : 'hover:bg-gray-100/50 dark:hover:bg-gray-700'
                  }`}
                >
                  <ListItemText
                    primary={option}
                    primaryTypographyProps={{
                      className: `text-sm ${
                        currency === option
                          ? 'text-blue-600 dark:text-blue-300 font-medium'
                          : 'text-gray-700 dark:text-gray-800 '
                      }`
                    }}
                  />
                  {currency === option && (
                    <ListItemIcon className="min-w-0 ml-2">
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                      >
                        <Check className="text-blue-500 dark:text-blue-400 text-lg" />
                      </motion.div>
                    </ListItemIcon>
                  )}
                  {hoveredItem === option && currency !== option && (
                    <motion.div
                      className="absolute left-0 top-0 h-full w-1 bg-blue-400 rounded-r"
                      initial={{ scaleY: 0 }}
                      animate={{ scaleY: 1 }}
                      exit={{ scaleY: 0 }}
                      transition={{ duration: 0.2 }}
                    />
                  )}
                </MenuItem>
              ))}
            </Paper>
          </motion.div>
        )}
      </AnimatePresence>
    </Box>


          
          <div className="flex items-center space-x-4">
            <button 
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:cursor-pointer"
            >
              {darkMode ? '☀️' : '🌙'}
            </button>
            <button
  style={{
    background: palettes.secondary.main,
    color: palettes.secondary.contrastText,
  }}
  onMouseEnter={e => {
    e.currentTarget.style.background = ` ${palettes.secondary.dark}`;
  }}
  onMouseLeave={e => {
    e.currentTarget.style.background = `${palettes.secondary.main}`;
  }}
  className="hidden md:block font-semibold py-2 px-4 rounded-lg shadow-sm transition-all duration-200 hover:shadow-md"
>
  DONATE NOW
</button>

            <button className="md:hidden text-gray-500 dark:text-gray-400">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Campaign Banner */}
      <motion.div
        style={{ opacity: headerOpacity, scale: headerScale }}
        className="relative bg-gradient-to-r from-indigo-50 to-blue-50 dark:from-indigo-900 dark:to-blue-900 py-3"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div 
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="flex items-center justify-center text-sm text-indigo-800 dark:text-indigo-200 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm py-2 px-4 rounded-full inline-flex mx-auto border border-indigo-100 dark:border-indigo-800 shadow-sm"
          >
            <span
  style={{
    backgroundColor: palettes.secondary.dark,
    color: palettes.secondary.contrastText,
  }}
  className="px-3 py-1 rounded-full text-xs font-semibold mr-2 shadow-sm"
>
  THIS CAMPAIGN SUPPORTS A FUNDRAISING INITIATIVE BY DIGITAL MINDS
</span>

          </motion.div>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Content - Campaign Details */}
          <div className="lg:col-span-2 space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-8"
            >
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white leading-tight">
                Joyful Minds Mumbai Volunteers Group
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
                  src="https://cdn.pixabay.com/photo/2020/10/05/20/03/boys-5630669_1280.jpg" 
                  alt="Children in blue uniforms with volunteer" 
                  className="w-full object-cover h-96 md:h-[500px]"
                />
              </motion.div>
              
              {/* Campaign Info */}
              <div className="flex flex-wrap items-center text-gray-500 dark:text-gray-400 text-sm gap-4">
                <div className="flex items-center bg-gray-50 dark:bg-gray-800 px-3 py-1.5 rounded-full border border-gray-200 dark:border-gray-700">
                  <span className="bg-blue-100 dark:bg-blue-900 p-1 rounded-full mr-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-blue-500 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </span>
                  Created 2 years ago
                </div>
                <div className="flex items-center bg-gray-50 dark:bg-gray-800 px-3 py-1.5 rounded-full border border-gray-200 dark:border-gray-700">
                  <span className="bg-purple-100 dark:bg-purple-900 p-1 rounded-full mr-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-purple-500 dark:text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </span>
                  Children, Women & Elderly
                </div>
              </div>
              
              {/* Campaign Description */}
              <div className="space-y-8">
                <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed">
                  Help bring joy to the lives of children, women & the elderly! Join our fundraiser campaign in Mumbai, India. 
                  Our goal is to raise ₹100000. #JoyfulMindsMumbai
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
                      At Joyful Minds, we are driven by an unwavering commitment to enhancing the health and well-being of 
                      children everywhere. We firmly believe that each and every child deserves not just a life, but a vibrant, healthy, 
                      and fulfilling life. We understand that healthy children are not only happier, but are also better poised to learn, 
                      grow, and make meaningful contributions to society.
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
                      Shockingly, in a world brimming with opportunities, there are still 1 billion children who face the harsh 
                      reality of lacking basic necessities like housing, clean water, sanitation facilities, and regular meals due to the 
                      scourge of poverty. These children deserve more than just our sympathy - they deserve our actions.
                    </p>
                  </div>
                </motion.div>


                {/* Perk */}
                <div id="perks" className={`min-h-screen rounded-lg ${darkMode ? 'bg-gray-900 text-white' : 'text-gray-800'}`}>
  <div className="container mx-auto px-4 py-8">
    <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6 gap-4">
      <h1 className="text-2xl font-bold flex items-center">
        Choose a perk <span className="ml-2 text-yellow-400">✨</span>
      </h1>

      <div className={`relative w-full md:w-60 border rounded-lg ${darkMode ? 'border-gray-700 bg-gray-800' : 'border-gray-300 bg-white'}`}>
        <select 
          className={`appearance-none w-full px-4 py-2 rounded-lg focus:outline-none ${darkMode ? 'bg-gray-800' : 'bg-white'}`}
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          aria-label="Select perk category"
        >
          {categories.map((category) => (
            <option key={category} value={category}>{category}</option>
          ))}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3">
          <ChevronDown size={20} className={darkMode ? 'text-gray-400' : 'text-gray-500'} />
        </div>
      </div>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
      {filteredPerks.map((perk) => (
        <div 
          key={perk.id} 
          className={`p-5 rounded-lg flex flex-col sm:flex-row sm:items-center ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-sm`}
        >
          <div className="flex-shrink-0 sm:mr-6 mb-4 sm:mb-0 flex flex-col items-center">
            <img 
              src={perk.image} 
              alt={perk.name} 
              className="w-20 h-20 object-cover rounded mb-2"
              width={64}
              height={64}
            />
            <div className="font-bold text-sm text-center">{formatPrice(perk.price)}</div>
          </div>

          <div className="flex flex-col w-full">
            <h3 className="font-bold mb-1">{perk.name}</h3>
            <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'} mb-2`}>
              {perk.description}
            </p>

            <div className="flex justify-between items-center mt-auto">
              <p className={`text-xs ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                Only {perk.stock} remaining.
              </p>
              <div className="flex items-center">
                <button 
                  onClick={() => updateCart(perk.id, -1)} 
                  className={`p-1 rounded-full ${darkMode ? 'text-gray-400 hover:text-white' : 'text-gray-500 hover:text-gray-800'}`}
                  aria-label="Decrease quantity"
                >
                  <MinusCircle size={16} />
                </button>
                <span className="mx-2 text-xs text-gray-500">{cart[perk.id] || 0}</span>
                <button 
                  onClick={() => updateCart(perk.id, 1)} 
                  className={`p-1 rounded-full ${darkMode ? 'text-gray-400 hover:text-white' : 'text-gray-500 hover:text-gray-800'}`}
                  aria-label="Increase quantity"
                >
                  <PlusCircle size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Subtotal and Donate Button */}
      <div className={`p-5 rounded-lg flex flex-col items-center justify-between ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-sm`}>
        <div className='text-center mb-4'>
          <p className="text-sm font-medium leading-relaxed">
            Subtotal ({Object.keys(cart).length} items):
          </p>
          <p className="text-2xl font-bold leading-relaxed">
            {formatPrice(subtotal)}
          </p>
        </div>

        <button
          className={`w-full sm:w-80 px-6 py-3 rounded-lg flex justify-center items-center text-center transition duration-200 ${
            Object.keys(cart).length > 0
              ? ''
              : `${darkMode ? 'bg-gray-700 text-gray-500' : 'bg-gray-200 text-gray-400'} cursor-not-allowed`
          }`}
          style={
            Object.keys(cart).length > 0
              ? {
                  backgroundColor: palettes.secondary.main,
                  color: palettes.secondary.contrastText,
                }
              : {}
          }
          onMouseEnter={(e) => {
            if (Object.keys(cart).length > 0) {
              e.currentTarget.style.backgroundColor = palettes.secondary.dark;
            }
          }}
          onMouseLeave={(e) => {
            if (Object.keys(cart).length > 0) {
              e.currentTarget.style.backgroundColor = palettes.secondary.main;
            }
          }}
          disabled={Object.keys(cart).length === 0}
          aria-label="Donate now"
        >
          <Heart size={20} className="mr-2" />
          DONATE NOW
        </button>
      </div>
    </div>
  </div>
</div>


         {/* Updates */}
                <div className="container mx-auto px-4 py-8 max-w-5xl">
  <div className="bg-white dark:bg-gray-900 rounded-lg shadow-sm p-6 ">
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
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-1">
              {update.title}
            </h3>
            <div className="flex items-center text-gray-500 dark:text-gray-400 text-sm mb-4">
              <AccessTimeIcon className="h-4 w-4 mr-1" />
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
              <a
                href="#"
                className="text-white font-semibold hover:underline"
              >
                Read More
              </a>
            </div>
          </motion.div>
        </div>
      ))}
    </div>
  </div>
</div>





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
                      Every child deserves a shot at a healthy life. We conduct regular vaccination drives, 
                      providing life-saving protection against life threatening diseases to over 44,000 underprivileged children.
                    </p>
                  </div>
                </motion.div>
              </div>

              {/* Comments Section */}
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.5 }}
                viewport={{ once: true }}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-100 dark:border-gray-700"
              >
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Comments</h3>
                  <div className="flex items-center space-x-2">
                    <p className="text-gray-500 dark:text-gray-400 text-sm">0 comments</p>
                    <div className="h-4 border-l border-gray-200 dark:border-gray-700"></div>
                    <div className="flex items-center text-sm">
                      <span className="text-gray-500 dark:text-gray-400">Sort by:</span>
                      <button className="flex items-center ml-2 text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                        Oldest <ChevronDown className="h-4 w-4 ml-1" />
                      </button>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-start mb-4">
                  <div className="h-10 w-10 rounded-full bg-gradient-to-r from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-600 mr-4"></div>
                  <textarea 
                    className="flex-1 border border-gray-200 dark:border-gray-700 rounded-lg p-3 resize-none focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-300"
                    placeholder="Add a comment..."
                    rows={3}
                  ></textarea>
                </div>
                
                <div className="text-gray-400 dark:text-gray-500 text-sm">Facebook Comments Plugin</div>
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
                
                <Accordion type="single" collapsible className="space-y-4">
                  <AccordionItem value="item-1" className="border-b border-gray-100 dark:border-gray-700 pb-4">
                    <AccordionTrigger className="text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 text-left font-medium flex justify-between items-center w-full">
                      Can I support more than one mission on the Crowdera platform?
                      <ChevronDown className="h-5 w-5 text-gray-400 dark:text-gray-500 transition-transform duration-200" />
                    </AccordionTrigger>
                    <AccordionContent className="text-gray-600 dark:text-gray-400 pt-2">
                      Yes, you can support multiple missions on the Crowdera platform. There&apos;s no limit to the number of causes you can donate to.
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="item-2" className="border-b border-gray-100 dark:border-gray-700 pb-4">
                    <AccordionTrigger className="text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 text-left font-medium flex justify-between items-center w-full">
                      Can I establish contact with the beneficiary I support?
                      <ChevronDown className="h-5 w-5 text-gray-400 dark:text-gray-500 transition-transform duration-200" />
                    </AccordionTrigger>
                    <AccordionContent className="text-gray-600 dark:text-gray-400 pt-2">
                      Yes, you can establish contact with the beneficiaries. The platform facilitates connection between donors and beneficiaries.
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="item-3" className="border-b-0 pb-0">
                    <AccordionTrigger className="text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 text-left font-medium flex justify-between items-center w-full">
                      Why should I donate through Crowdera instead of donating directly?
                      <ChevronDown className="h-5 w-5 text-gray-400 dark:text-gray-500 transition-transform duration-200" />
                    </AccordionTrigger>
                    <AccordionContent className="text-gray-600 dark:text-gray-400 pt-2">
                      Crowdera provides transparency, security, and ease of donation. It also helps organizations reach a wider audience and track their fundraising progress.
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </motion.div>
            </motion.div>
          </div>
          
          {/* Right Sidebar - Donation Card & Info */}
          <div className="lg:col-span-1 space-y-6">
            {/* Donation Card */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 border border-gray-100 dark:border-gray-700 sticky absolute inset-x-0 top-0 z-[9999]"
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-3xl font-bold text-gray-900 dark:text-white">₹ 2,32,609</h3>
                  <p className="text-gray-500 dark:text-gray-400 text-sm">Raised out of ₹ 100000</p>
                </div>
                <div className="flex items-center bg-gradient-to-r from-orange-100 to-orange-50 dark:from-orange-900/50 dark:to-orange-800/50 text-orange-800 dark:text-orange-200 px-3 py-1 rounded-full text-xs font-semibold border border-orange-200 dark:border-orange-700">
                  <span>TAX BENEFITS</span>
                </div>
              </div>
              
              {/* Progress Bar */}
              <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full mb-6 overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: '100%' }}
                  transition={{ duration: 1, delay: 0.3 }}
                  className="h-full bg-gradient-to-r from-green-400 to-green-500 dark:from-green-500 dark:to-green-600 rounded-full"
                />
              </div>
              
              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="text-center">
                  <h4 className="text-2xl font-bold text-gray-900 dark:text-white">4</h4>
                  <p className="text-gray-500 dark:text-gray-400 text-sm">Contributions</p>
                </div>
                <div className="text-center">
                  <h4 className="text-2xl font-bold text-gray-900 dark:text-white">3</h4>
                  <p className="text-gray-500 dark:text-gray-400 text-sm">Shares</p>
                </div>
                <div className="text-center">
                  <h4 className="text-2xl font-bold text-gray-900 dark:text-white">232%</h4>
                  <p className="text-gray-500 dark:text-gray-400 text-sm">Funded</p>
                </div>
              </div>
              
              {/* Buttons */}
              <button
  style={{
    background: palettes.secondary.main,
    color: palettes.secondary.contrastText,
    border: `1px solid ${palettes.secondary.light}`,
  }}
  onMouseEnter={(e) => {
    e.currentTarget.style.background = palettes.secondary.dark;
  }}
  onMouseLeave={(e) => {
    e.currentTarget.style.background = palettes.secondary.main;
  }}
  className="w-full hover:from-[${palettes.secondary.main}] hover:to-[${palettes.secondary.dark}] 
    font-semibold py-3 px-4 rounded-lg shadow-md transition-all duration-200 hover:shadow-lg mb-4 flex justify-center items-center"
>
  <Heart className="h-5 w-5 mr-2" /> DONATE NOW
</button>


              
              <div className="grid grid-cols-2 gap-4">
              <button
  style={{
    background: `linear-gradient(to right, ${palettes.primary.light}, ${palettes.primary.main})`,
    color: palettes.primary.contrastText,
    border: `1px solid ${palettes.primary.light}`,
  }}
  className="dark:bg-gradient-to-r dark:from-[${palettes.primary.dark}] dark:to-[${palettes.primary.main}] 
    hover:from-[${palettes.primary.main}] hover:to-[${palettes.primary.dark}] 
    dark:hover:from-[${palettes.primary.dark}] dark:hover:to-[${palettes.primary.light}] 
    font-semibold py-3 px-4 rounded-lg shadow-sm transition-all duration-200 hover:shadow-md flex justify-center items-center"
>
  <Share className="h-5 w-5 mr-2" /> SHARE
</button>


<button
  style={{
    backgroundColor: palettes.secondary.main,
    color: palettes.secondary.contrastText,
    border: `1px solid ${palettes.secondary.main}`,
  }}
  onMouseEnter={(e) => {
    e.currentTarget.style.background = palettes.secondary.dark;
  }}
  onMouseLeave={(e) => {
    e.currentTarget.style.background = palettes.secondary.main;
  }}
  className="font-semibold py-3 px-4 rounded-lg shadow-sm transition-all duration-200 hover:shadow-md flex justify-center items-center"
>
  <Users className="h-5 w-5 mr-2" /> JOIN TEAM
</button>

              </div>
            </motion.div>
            
            {/* Recent Donors */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-100 dark:border-gray-700"
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Recent Donations</h3>
                <div className="bg-blue-50 dark:bg-blue-900/50 text-blue-800 dark:text-blue-200 px-3 py-1 rounded-full text-xs font-medium border border-blue-200 dark:border-blue-700">
                  3 people have just donated
                </div>
              </div>
              
              <div className="space-y-4">
                {[
                  { name: "Swapnil Kumbhar", time: "a year ago", amount: "₹₹₹ 25000" },
                  { name: "Anand Ahuja", time: "a year ago", amount: "₹₹₹ 2599" },
                  { name: "Aakash Sagar", time: "a year ago", amount: "₹₹₹ 5000" }
                ].map((donor, index) => (
                  <motion.div 
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 * index }}
                    className="flex items-center group"
                  >
                    <div className="h-10 w-10 rounded-full bg-gradient-to-r from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-600 mr-3 flex-shrink-0 group-hover:from-gray-300 group-hover:to-gray-400 dark:group-hover:from-gray-600 dark:group-hover:to-gray-500 transition"></div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-gray-900 dark:text-white truncate">{donor.name}</h4>
                      <p className="text-gray-500 dark:text-gray-400 text-sm truncate">{donor.time} — {donor.amount}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
              
              <div className="mt-4 text-center">
                <button className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 text-sm font-medium transition-colors duration-200">
                  SEE ALL
                </button>
                
              </div>
            </motion.div>
            
            {/* Organizer Info */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-100 dark:border-gray-700"
            >
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Organizer</h3>
              
              <div className="flex items-center">
                <div className="h-12 w-12 rounded-full bg-gradient-to-r from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-600 mr-3 flex-shrink-0"></div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium text-gray-900 dark:text-white truncate">Team Crowdera</h4>
                  <div className="flex items-center">
                    <span className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 px-2 py-0.5 rounded text-xs mr-2 font-medium">Verified</span>
                    <p className="text-gray-500 dark:text-gray-400 text-sm truncate">Raised ₹ 2,32,609 from 4 donations</p>
                  </div>
                </div>
                <a href="#" className="text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors duration-200 ml-2">
                  <Mail className="h-5 w-5" />
                </a>
              </div>
            </motion.div>
            
            {/* Beneficiary Info */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-100 dark:border-gray-700"
            >
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Beneficiary</h3>
              
              <div className="flex items-center">
                <div className="h-12 w-12 rounded-full bg-gradient-to-r from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-600 mr-3 flex-shrink-0"></div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium text-gray-900 dark:text-white truncate">Joyful Minds</h4>
                  <p className="text-gray-500 dark:text-gray-400 text-sm">Type: NON-PROFIT</p>
                </div>
              </div>
            </motion.div>
            
            {/* Team Fundraisers */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-100 dark:border-gray-700"
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Team Fundraisers (5)</h3>
                <div className="flex space-x-1">
                  <button className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 p-1 rounded-full transition-colors duration-200">
                    <ChevronUp className="h-5 w-5" />
                  </button>
                  <button className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 p-1 rounded-full transition-colors duration-200">
                    <ChevronDown className="h-5 w-5" />
                  </button>
                </div>
              </div>
              
              <div className="space-y-4">
                {[
                  { name: "Team Crowdera", raised: "₹2,32,609", goal: "₹1,00,000" },
                  { name: "Chiraniv", raised: "₹0", goal: "₹10,000" },
                  { name: "Aniket Charlewar", raised: "₹0", goal: "₹10,000" }
                ].map((team, index) => (
                  <motion.div 
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 * index }}
                    className="flex items-center group"
                  >
                    <div className="h-10 w-10 rounded-full bg-gradient-to-r from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-600 mr-3 flex-shrink-0 group-hover:from-gray-300 group-hover:to-gray-400 dark:group-hover:from-gray-600 dark:group-hover:to-gray-500 transition"></div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-gray-900 dark:text-white truncate">{team.name}</h4>
                      <p className="text-gray-500 dark:text-gray-400 text-sm truncate">Raised {team.raised} out of {team.goal} goal.</p>
                    </div>
                  </motion.div>
                ))}
              </div>
              
              <div className="mt-4 text-center">
                <button className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 text-sm font-medium transition-colors duration-200">
                  SEE ALL
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
      
      {/* Scroll to top button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            onClick={scrollToTop}
            className="fixed bottom-6 right-6 bg-white dark:bg-gray-800 p-3 rounded-full shadow-lg border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 hover:shadow-xl transition-all duration-200 z-40"
          >
            <ArrowUp className="h-5 w-5" />
          </motion.button>
        )}
      </AnimatePresence>
      
     {/* Footer */}
<motion.footer 
  initial={{ opacity: 0 }}
  whileInView={{ opacity: 1 }}
  transition={{ duration: 0.5 }}
  viewport={{ once: true }}
  className="bg-gray-900 text-white pt-16 pb-8"
>
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">

      {/* Logo + Contact Info */}
      <div>
        <div className="flex items-center mb-4">
          <img 
            src="https://cdn.pixabay.com/photo/2022/08/21/03/48/smile-7400381_1280.jpg" 
            alt="Joyful Minds Logo" 
            className="mr-2 h-10 w-10 rounded-full object-cover"
          />
          <span className="font-bold text-xl">Joyful Minds</span>
        </div>
        <div className="flex items-start mb-3">
          <MapPin className="h-5 w-5 mr-2 text-indigo-300 mt-1 flex-shrink-0" />
          <p className="text-gray-300">206 Sankalp Nagar, Wathoda Nagpur 440008</p>
        </div>
        <div className="flex items-center mb-3">
          <Phone className="h-5 w-5 mr-2 text-indigo-300 flex-shrink-0" />
          <p className="text-gray-300">9175764210</p>
        </div>
        <div className="flex items-center mb-4">
          <Mail className="h-5 w-5 mr-2 text-indigo-300 flex-shrink-0" />
          <p className="text-gray-300">joyfulminds@gmail.com</p>
        </div>
        <div className="flex space-x-4 mt-4">
          {/* Social Icons */}
          {[
            { path: "M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z", color: "text-blue-400 hover:text-blue-300" }, // Facebook
            { path: "M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.189-1.452.232-2.224.084.626 1.956 2.444 3.377 4.6 3.418-2.068 1.622-4.678 2.348-7.29 2.038 2.179 1.397 4.768 2.21 7.557 2.21 9.054 0 14.002-7.496 14.002-13.986 0-.213-.005-.425-.014-.636z", color: "text-sky-400 hover:text-sky-300" }, // Twitter
          ].map((item, index) => (
            <svg 
              key={index}
              fill="currentColor" 
              viewBox="0 0 24 24" 
              className={`h-6 w-6 ${item.color} cursor-pointer`}
            >
              <path d={item.path} />
            </svg>
          ))}
        </div>
      </div>

      {/* Navigation Links */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
        <ul className="space-y-2 text-gray-300">
          <li><a href="#" className="hover:text-indigo-400">Home</a></li>
          <li><a href="#" className="hover:text-indigo-400">About Us</a></li>
          <li><a href="#" className="hover:text-indigo-400">Programs</a></li>
          <li><a href="#" className="hover:text-indigo-400">Contact</a></li>
        </ul>
      </div>

      {/* Resources */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Resources</h3>
        <ul className="space-y-2 text-gray-300">
          <li><a href="#" className="hover:text-indigo-400">Blog</a></li>
          <li><a href="#" className="hover:text-indigo-400">FAQs</a></li>
          <li><a href="#" className="hover:text-indigo-400">Privacy Policy</a></li>
          <li><a href="#" className="hover:text-indigo-400">Terms of Use</a></li>
        </ul>
      </div>

      {/* Newsletter */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Newsletter</h3>
        <p className="text-gray-400 mb-4">Stay updated with our latest news and offers.</p>
        <form className="flex flex-col sm:flex-row items-center">
          <input 
            type="email" 
            placeholder="Your email" 
            className="w-full px-4 py-2 mb-2 sm:mb-0 sm:mr-2 rounded-md bg-gray-800 text-white placeholder-gray-500 focus:outline-none"
          />
          <button 
            type="submit" 
            className="px-4 py-2 bg-indigo-500 hover:bg-indigo-600 rounded-md text-white font-medium"
          >
            Subscribe
          </button>
        </form>
      </div>
    </div>

    <div className="border-t border-gray-700 pt-6 text-center text-sm text-gray-400">
      © {new Date().getFullYear()} Joyful Minds. All rights reserved.
    </div>
  </div>
</motion.footer>
          </div>
  )
}