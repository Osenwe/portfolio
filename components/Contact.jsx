import { assets } from '@/assets/assets'
import Image from 'next/image'
import React, { useState } from 'react'
import { motion } from "motion/react"

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  
  const [status, setStatus] = useState({
    submitted: false,
    submitting: false,
    info: { error: false, msg: null }
  });

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    setStatus({ submitting: true, submitted: false, info: { error: false, msg: null } });

    try {
      // Replace with your actual Django API endpoint
      const response = await fetch("http://localhost:8000/api/contact/submit/", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (response.status === 201) {
        // Success (201 Created)
        setFormData({ name: '', email: '', message: '' });
        setStatus({
          submitted: true,
          submitting: false,
          info: { error: false, msg: data.message || 'Thank you for your message! I will get back to you soon.' }
        });
      } else {
        // Error from backend
        setStatus({
          submitted: true,
          submitting: false,
          info: { error: true, msg: data.errors ? Object.values(data.errors).flat().join(', ') : 'Something went wrong. Please try again.' }
        });
      }
    } catch (error) {
      // Network or other error
      console.error('Error submitting form:', error);
      setStatus({
        submitted: true,
        submitting: false,
        info: { error: true, msg: 'An error occurred. Please try again later.' }
      });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }} 
      whileInView={{ opacity: 1 }} 
      transition={{ duration: 1 }} 
      id='contact' className='w-full px-[12%] py-10 scroll-mt-20 bg-[url("/footer-bg-color.png")] bg-no-repeat bg-center bg-[length:90%_auto] dark:bg-none'>

      <motion.h4 
        initial={{ y: -20, opacity: 0 }} 
        whileInView={{ y: 0, opacity: 1 }} 
        transition={{ delay: 0.3, duration: 0.5 }}
        className='text-center mb-2 text-lg font-Ovo'>
        Connect with me
      </motion.h4>

      <motion.h2
        initial={{ y: -20, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        className='text-center text-5xl font-Ovo'>
        Get in touch
      </motion.h2>

      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.7, duration: 0.5 }}
        className='text-center max-w-2xl mx-auto mt-5 mb-12 font-Ovo'>
        I'd love to hear from you! If you have any questions, comments, or feedback, please use the form below.
      </motion.p>

      <motion.form
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.9, duration: 0.5 }}
        onSubmit={onSubmit} 
        className='max-w-2xl mx-auto'>
        <div className='grid grid-cols-auto gap-6 mt-10 mb-8'>

          <motion.input
            initial={{ x: -50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ delay: 1.1, duration: 0.6 }}
            type="text" 
            placeholder='Enter your name' 
            required
            name='name'
            value={formData.name}
            onChange={handleChange}
            className='flex-1 p-3 outline-none border-[0.5px] border-gray-400 rounded-md bg-white dark:bg-darkHover/30 dark:border-white/90'
          />

          <motion.input
            initial={{ x: 50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.6 }}
            type="email" 
            placeholder='Enter your email' 
            required
            name='email'
            value={formData.email}
            onChange={handleChange}
            className='flex-1 p-3 outline-none border-[0.5px] border-gray-400 rounded-md bg-white dark:bg-darkHover/30 dark:border-white/90'
          />

        </div>
        <motion.textarea 
          initial={{ y: 100, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.3, duration: 0.6 }}
          rows='6' 
          placeholder='Enter your message' 
          required
          name='message'
          value={formData.message}
          onChange={handleChange}
          className='w-full p-4 outline-none border-[0.5px] border-gray-400 rounded-md bg-white mb-6 dark:bg-darkHover/30 dark:border-white/90'
        ></motion.textarea>

        <motion.button
          whileHover={{ scale: 1.05 }} 
          transition={{ duration: 0.3 }}
          type='submit'
          disabled={status.submitting}
          className='py-3 px-8 w-max flex items-center justify-between gap-2 bg-black/80 text-white rounded-full mx-auto hover:bg-black duration-500 dark:bg-transparent dark:border-[0.5px] dark:hover:bg-darkHover disabled:opacity-70 disabled:cursor-not-allowed'
        >
          {status.submitting ? 'Sending...' : 'Submit now'} 
          <Image src={assets.right_arrow_white} alt='' className='w-4'/>
        </motion.button>

        {status.submitted && (
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }} 
            className={`mt-4 text-center ${status.info.error ? 'text-red-500' : 'text-green-500'}`}
          >
            {status.info.msg}
          </motion.p>
        )}
      </motion.form>
    </motion.div>
  )
}

export default Contact