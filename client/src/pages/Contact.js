import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Mail, MapPin, Phone, Send, CheckCircle, Linkedin, Github } from 'lucide-react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import './Contact.css';

const Contact = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm();

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      // Formspree endpoint
      const formspreeEndpoint = 'https://formspree.io/f/manboprd';
      
      const response = await fetch(formspreeEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        toast.success('Message sent successfully!');
        setIsSubmitted(true);
        reset();
      } else {
        throw new Error('Failed to send message');
      }
    } catch (error) {
      console.error('Error sending message:', error);
      toast.error('Failed to send message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: <Mail size={24} />,
      title: 'Email',
      value: 'lihini0511@gmail.com',
      link: 'mailto:lihini0511@gmail.com'
    },
    {
      icon: <Phone size={24} />,
      title: 'WhatsApp',
      value: '+94 71 387 3172',
      link: 'https://wa.me/94713873172'
    },
    {
      icon: <Linkedin size={24} />,
      title: 'LinkedIn',
      value: 'lihini-athukorala',
      link: 'http://www.linkedin.com/in/lihini-athukorala-759803347'
    },
    {
      icon: <Github size={24} />,
      title: 'GitHub',
      value: 'LihiniAthukorala',
      link: 'https://github.com/LihiniAthukorala'
    },
    {
      icon: <MapPin size={24} />,
      title: 'Location',
      value: 'Sri Lanka',
      link: null
    }
  ];

  if (isSubmitted) {
    return (
      <div className="contact-page">
        <div className="container">
          <motion.div
            className="success-message"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <CheckCircle size={64} className="success-icon" />
            <h2>Message Sent Successfully!</h2>
            <p>Thank you for reaching out. I'll get back to you as soon as possible.</p>
            <button 
              className="btn btn-primary"
              onClick={() => setIsSubmitted(false)}
            >
              Send Another Message
            </button>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="contact-page">
      <div className="container">
        {/* Header */}
        <motion.div
          className="page-header"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1>Get In Touch</h1>
          <p>Have a question or want to work together? Feel free to reach out!</p>
        </motion.div>

        <div className="contact-content">
          {/* Contact Information */}
          <motion.div
            className="contact-info"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="info-card card">
              <h2>Contact Information</h2>
              <p>Feel free to reach out through any of these channels:</p>
              
              <div className="info-list">
                {contactInfo.map((info, index) => (
                  <div key={index} className="info-item">
                    <div className="info-icon">
                      {info.icon}
                    </div>
                    <div className="info-details">
                      <h3>{info.title}</h3>
                      {info.link ? (
                        <a href={info.link} className="info-link">
                          {info.value}
                        </a>
                      ) : (
                        <span>{info.value}</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div className="availability">
                <h3>Availability</h3>
                <p>I'm currently available for freelance work and full-time opportunities.</p>
                <div className="status">
                  <span className="status-dot"></span>
                  <span>Open to new opportunities</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            ref={ref}
            className="contact-form"
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="form-card card">
              <h2>Send Me a Message</h2>
              <p>I'd love to hear from you. Send me a message and I'll respond as soon as possible.</p>

              <form onSubmit={handleSubmit(onSubmit)} className="form">
                <div className="form-group">
                  <label htmlFor="name">Name *</label>
                  <input
                    type="text"
                    id="name"
                    {...register('name', { required: 'Name is required' })}
                    className={errors.name ? 'error' : ''}
                    placeholder="Your name"
                  />
                  {errors.name && <span className="error-message">{errors.name.message}</span>}
                </div>

                <div className="form-group">
                  <label htmlFor="email">Email *</label>
                  <input
                    type="email"
                    id="email"
                    {...register('email', { 
                      required: 'Email is required',
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: 'Invalid email address'
                      }
                    })}
                    className={errors.email ? 'error' : ''}
                    placeholder="your.email@example.com"
                  />
                  {errors.email && <span className="error-message">{errors.email.message}</span>}
                </div>

                <div className="form-group">
                  <label htmlFor="subject">Subject *</label>
                  <input
                    type="text"
                    id="subject"
                    {...register('subject', { required: 'Subject is required' })}
                    className={errors.subject ? 'error' : ''}
                    placeholder="What's this about?"
                  />
                  {errors.subject && <span className="error-message">{errors.subject.message}</span>}
                </div>

                <div className="form-group">
                  <label htmlFor="message">Message *</label>
                  <textarea
                    id="message"
                    rows="6"
                    {...register('message', { 
                      required: 'Message is required',
                      minLength: {
                        value: 10,
                        message: 'Message must be at least 10 characters'
                      }
                    })}
                    className={errors.message ? 'error' : ''}
                    placeholder="Tell me about your project or question..."
                  ></textarea>
                  {errors.message && <span className="error-message">{errors.message.message}</span>}
                </div>

                <button 
                  type="submit" 
                  className="btn btn-primary submit-btn"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <div className="spinner"></div>
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send size={20} />
                      Send Message
                    </>
                  )}
                </button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Contact; 