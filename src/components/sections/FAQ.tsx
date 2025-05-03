'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FaChevronDown, FaQuestion, FaRegLightbulb } from 'react-icons/fa';
import DecorativeElements from '../animation/DecorativeElements';

interface FAQItem {
  question: string;
  answer: string;
  category?: string;
}

interface FAQProps {
  faqs: FAQItem[];
}

const FAQ: React.FC<FAQProps> = ({ faqs }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // Filter out undefined categories and get unique values
  const categories = Array.from(
    new Set(
      faqs
        .map(faq => faq.category)
        .filter((category): category is string => category !== undefined)
    )
  );

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const filteredFaqs = selectedCategory
    ? faqs.filter(faq => faq.category === selectedCategory)
    : faqs;

  return (
    <section ref={ref} className="py-12 sm:py-16 md:py-24 px-4 sm:px-6 bg-gradient-to-b from-cream-bg to-white dark:from-navy-800 dark:to-navy-900 relative overflow-hidden">
      <DecorativeElements type="hearts" count={4} />
      
      <div className="container mx-auto max-w-5xl relative z-10">
        <motion.div
          className="text-center mb-8 sm:mb-12 md:mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center justify-center mb-4 sm:mb-6">
            <FaQuestion className="text-3xl sm:text-4xl md:text-5xl text-gold" />
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl playfair text-navy-900 dark:text-white mb-2 sm:mb-4">
            Frequently Asked Questions
          </h2>
          <div className="w-20 sm:w-24 md:w-32 h-0.5 sm:h-1 mx-auto bg-gradient-to-r from-transparent via-gold/50 to-transparent mb-4 sm:mb-6" />
          <p className="text-sm sm:text-base md:text-lg text-navy-600 dark:text-navy-200 max-w-xs sm:max-w-sm md:max-w-2xl mx-auto">
            Find answers to common questions about our wedding celebration
          </p>
        </motion.div>

        {categories.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-wrap justify-center gap-2 sm:gap-3 md:gap-4 mb-6 sm:mb-8 md:mb-12 overflow-x-auto pb-2 -mx-4 px-4 custom-scrollbar"
          >
            <button
              onClick={() => setSelectedCategory(null)}
              className={`px-4 sm:px-6 py-2 sm:py-3 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 whitespace-nowrap ${
                selectedCategory === null
                  ? 'bg-gold text-white shadow-lg'
                  : 'bg-white/80 dark:bg-navy-800/80 text-navy-600 dark:text-navy-200 hover:bg-gold/10'
              }`}
            >
              All Questions
            </button>
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 sm:px-6 py-2 sm:py-3 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 whitespace-nowrap ${
                  selectedCategory === category
                    ? 'bg-gold text-white shadow-lg'
                    : 'bg-white/80 dark:bg-navy-800/80 text-navy-600 dark:text-navy-200 hover:bg-gold/10'
                }`}
              >
                {category}
              </button>
            ))}
          </motion.div>
        )}

        <div className="grid grid-cols-1 gap-3 sm:gap-4 md:gap-6">
          {filteredFaqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white/80 dark:bg-navy-800/80 backdrop-blur-sm rounded-xl sm:rounded-2xl shadow-md sm:shadow-lg overflow-hidden border border-gold/10 hover:border-gold/30 transition-all duration-300"
            >
              <button
                className="w-full p-4 sm:p-6 text-left flex items-start gap-3 sm:gap-4 focus:outline-none group"
                onClick={() => toggleFAQ(index)}
              >
                <div className="flex-shrink-0 mt-0.5 sm:mt-1">
                  <FaRegLightbulb className={`text-lg sm:text-xl transition-colors duration-300 ${
                    openIndex === index ? 'text-gold' : 'text-navy-400 dark:text-navy-300'
                  }`} />
                </div>
                <div className="flex-grow min-w-0">
                  <h3 className={`text-base sm:text-lg md:text-xl playfair transition-colors duration-300 ${
                    openIndex === index 
                      ? 'text-gold' 
                      : 'text-navy-900 dark:text-white group-hover:text-gold'
                  }`}>
                    {faq.question}
                  </h3>
                  <AnimatePresence>
                    {openIndex === index && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="mt-3 sm:mt-4 text-navy-600 dark:text-navy-200 prose dark:prose-invert"
                      >
                        <p className="text-sm sm:text-base leading-relaxed">{faq.answer}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
                <div className="flex-shrink-0 mt-0.5 sm:mt-1">
                  <motion.div
                    animate={{ rotate: openIndex === index ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <FaChevronDown className={`text-base sm:text-lg transition-colors duration-300 ${
                      openIndex === index ? 'text-gold' : 'text-navy-400 dark:text-navy-300'
                    }`} />
                  </motion.div>
                </div>
              </button>
            </motion.div>
          ))}
        </div>

        {filteredFaqs.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-8 sm:py-12 text-navy-600 dark:text-navy-200"
          >
            <p className="text-sm sm:text-base">No questions found in this category.</p>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default FAQ; 