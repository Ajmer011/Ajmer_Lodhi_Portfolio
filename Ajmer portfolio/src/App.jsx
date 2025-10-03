import React, { useState, useEffect, useRef } from 'react';
import img from './images/ajmer.jpg';
import axios from "axios";
//project images
import womenimage from './images/women-safety.jpg';
import aichatbot from './images/aichatbot.jpg';
import portfolio from './images/portfolio.jpg';
import ecommerce from './images/ecommerce.jpg';
import studyhelper from './images/studyhelper.jpg';
//gallary
import bike from './images/bike.jpg';
import car from './images/car.jpg';
import carin from './images/carin.jpg';
import hudie from './images/hudie.jpg';
import office from './images/office.jpg';
import reading from './images/reading.jpg';
//certificate
import aibuilder from './certificates/aibuilder.jpg';
import amcat from './certificates/amcat.jpg';
import ccna from './certificates/ccna.jpg';
import digitalskill from './certificates/digitalskill.jpg';
import introductiontocs from './certificates/introductiontocs.jpg';
import linuxudamy from './certificates/linuxudamy.jpg';
import mastercpp from './certificates/mastercpp.jpg';
import nptel from './certificates/nptel.jpg';
import pythonessential1 from './certificates/pythonessential1.jpg';
import pythonessential2 from './certificates/pythonessential2.jpg';
import Resume from './certificates/Ajmer_resume.pdf';

// Inline CSS with enhanced dark theme
const styles = `
  :root {
    --primary-bg: #0a;
    --secondary-bg: #1e293b;
    --accent-color: #f43f5e;
    --text-color: #f1f5f9;
    --secondary-text: #94a3b8;
    --gradient: linear-gradient(135deg, #3b82f6, #f43f5e);
    --glass-bg: rgba(30, 41, 59, 0.7);
    --glass-border: 1px solid rgba(255, 255, 255, 0.1);
  }
  body {
    background-color: var(--primary-bg);
    color: var(--text-color);
    font-family: 'Inter', sans-serif;
    scroll-behavior: smooth;
  }
  .parallax {
    background-attachment: fixed;
    background-size: cover;
    position: relative;
    background: var(--gradient);
    overflow: hidden;
  }
  .particle {
    position: absolute;
    width: 8px;
    height: 8px;
    background: var(--accent-color);
    border-radius: 50%;
    opacity: 0.5;
    animation: float 15s infinite ease-in-out;
    box-shadow: 0 0 10px rgba(244, 63, 94, 0.4);
  }
  @keyframes float {
    0% { transform: translateY(0) scale(1); opacity: 0.5; }
    50% { transform: translateY(-120vh) scale(1.2); opacity: 0.2; }
    100% { transform: translateY(0) scale(1); opacity: 0.5; }
  }
  .animate-cursor {
    border-right: 2px solid var(--accent-color);
    animation: blink 0.7s step-end infinite;
  }
  @keyframes blink {
    50% { border-color: transparent; }
  }
  .animate-fadeIn {
    animation: fadeIn 1.5s ease-in-out;
  }
  @keyframes fadeIn {
    0% { opacity: 0; transform: translateY(20px); }
    100% { opacity: 1; transform: translateY(0); }
  }
  .animate-spinIn {
    animation: spinIn 0.8s ease-in-out;
  }
  @keyframes spinIn {
    0% { transform: scale(0) rotate(360deg); opacity: 0; }
    100% { transform: scale(1) rotate(0deg); opacity: 1; }
  }
  .progress-ring__circle {
    transform: rotate(-90deg);
    transform-origin: 50% 50%;
  }
  .glass {
    background: var(--glass-bg);
    backdrop-filter: blur(10px);
    border: var(--glass-border);
  }
  .hover-glow:hover {
    box-shadow: 0 0 20px rgba(244, 63, 94, 0.3);
    transform: translateY(-3px);
  }
  .navbar-link {
    position: relative;
    transition: all 0.3s ease;
  }
  .navbar-link::after {
    content: '';
    position: absolute;
    bottom: -2px;
    left: 0;
    width: 0;
    height: 2px;
    background: var(--accent-color);
    transition: width 0.3s ease;
  }
  .navbar-link:hover::after {
    width: 100%;
  }
  .section-title {
    position: relative;
    display: inline-block;
    padding-bottom: 12px;
    font-family: 'Space Mono', monospace;
  }
  .section-title::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 50%;
    width: 80px;
    height: 4px;
    background: var(--accent-color);
    transform: translateX(-50%);
    border-radius: 2px;
  }
  input, textarea {
    background: var(--glass-bg);
    color: var(--text-color);
    border: var(--glass-border);
    transition: all 0.3s ease;
  }
  input:focus, textarea:focus {
    border-color: var(--accent-color);
    box-shadow: 0 0 8px rgba(244, 63, 94, 0.3);
    outline: none;
  }
  .gradient-text {
    background: var(--gradient);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
`;

// Main App component
function App() {
  // State management
  const [isOpen, setIsOpen] = useState(false);
  const [theme, setTheme] = useState('dark');
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [formErrors, setFormErrors] = useState({});
  const [projectFilter, setProjectFilter] = useState('All');
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [openBlogIndex, setOpenBlogIndex] = useState(null);
  const typedTextRef = useRef(null);
  const [selectedCert, setSelectedCert] = useState(null);

  // Apply theme
  useEffect(() => {
    document.documentElement.className = theme;
  }, [theme]);

  // Handle scroll for scroll-to-top button
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Typing animation for hero section
  useEffect(() => {
    const words = ['Developer', 'Innovator', 'Problem Solver', 'Tech Enthusiast', 'Creative Thinker', 'Full-Stack Wizard'];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    const typingSpeed = 80;
    const deletingSpeed = 40;
    const pauseTime = 1200;
    const type = () => {
      const currentWord = words[wordIndex];
      if (isDeleting) {
        typedTextRef.current.textContent = currentWord.substring(0, charIndex - 1);
        charIndex--;
        if (charIndex === 0) {
          isDeleting = false;
          wordIndex = (wordIndex + 1) % words.length;
          setTimeout(type, typingSpeed);
        } else {
          setTimeout(type, deletingSpeed);
        }
      } else {
        typedTextRef.current.textContent = currentWord.substring(0, charIndex + 1);
        charIndex++;
        if (charIndex === currentWord.length) {
          isDeleting = true;
          setTimeout(type, pauseTime);
        } else {
          setTimeout(type, typingSpeed);
        }
      }
    };
    type();
  }, []);

  // Data (unchanged from original)
  const navItems = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Services', href: '#services' },
    { name: 'Projects', href: '#projects' },
    { name: 'Skills', href: '#skills' },
    { name: 'Certifications', href: '#certifications' },
    { name: 'Blog', href: '#blog' },
    { name: 'Gallery', href: '#gallery' },
    { name: 'Testimonials', href: '#testimonials' },
    { name: 'Contact', href: '#contact' },
  ];

  const services = [
    { title: 'Web Development', description: 'Building responsive and scalable web applications using MERN stack.', icon: '🌐' },
    { title: 'UI/UX Design', description: 'Creating intuitive and visually appealing user interfaces.', icon: '🎨' },
    { title: 'AI Integration', description: 'Incorporating AI features like chatbots and machine learning models.', icon: '🤖' },
    { title: 'Open Source Contribution', description: 'Contributing to and maintaining open-source projects.', icon: '📂' },
  ];

  const projects = [
    {
      title: 'Study-Helper Collaborative Platform',
      description: 'A collaborative platform for students to prepare for exams, with progress tracking for teachers and parents, built with MERN Stack.',
      image: studyhelper,
      link: 'https://github.com/Ajmer011/study',
      category: 'MERN',
    },
    {
      title: 'Women-safety-Analysis',
      description: 'Designed a user-friendly Jetpack Compose UI with real-time location tracking, SOS alerts, and seamless API integration using MERN Stack, OpenCV, and YOLO-based location tracking.',
      image: womenimage,
      link: 'https://github.com/learnerbi2/Women-Safety-App.git',
      category: 'MERN',
    },
    {
      title: 'Portfolio Website',
      description: 'A modern, responsive portfolio showcasing skills and projects, built with React and Tailwind CSS.',
      image: portfolio,
      link: '#',
      category: 'React',
    },
    {
      title: 'AI Chatbot',
      description: 'An intelligent chatbot using NLP, built with React and Node.js.',
      image: aichatbot,
      link: 'https://github.com/Ajmer011/AI-chatbot',
      category: 'AI',
    },
    {
      title: 'E-commerce Dashboard',
      description: 'A dashboard for managing e-commerce operations with real-time analytics, built with React and Firebase.',
      image: ecommerce,
      link: '#',
      category: 'React',
    },
  ];

  const skills = [
    { name: 'C++', level: 90 },
    { name: 'Java', level: 85 },
    { name: 'JavaScript', level: 88 },
    { name: 'React', level: 90 },
    { name: 'Node.js', level: 85 },
    { name: 'Express.js', level: 80 },
    { name: 'MongoDB', level: 80 },
    { name: 'SQL', level: 75 },
    { name: 'Data Structures & Algorithms', level: 85 },
    { name: 'OOP', level: 90 },
    { name: 'AI/ML Basics', level: 70 },
  ];

  const certifications = [
    {
      name: "Database Management System",
      issuer: "NPTEL (IIT kharagpur)",
      date: "Mar 2025",
      src: nptel
    },
    {
      name: "AI-Builder",
      issuer: "Udemy",
      date: "Jan 2025",
      src: aibuilder
    },
    {
      name: "AMCAT",
      issuer: "NPTEL",
      date: "Feb 2025",
      src: amcat
    },
    {
      name: "Cybersecurity Essentials",
      issuer: "edX",
      date: "Mar 2025",
      src: ccna
    },
    {
      name: "Digital Skills",
      issuer: "edX",
      date: "Mar 2025",
      src: digitalskill
    },
    {
      name: "Introduction to Cyber Security",
      issuer: "Cisco",
      date: "Mar 2025",
      src: introductiontocs
    },
    {
      name: "Linux for Beginners",
      issuer: "Udamy",
      date: "Mar 2025",
      src: linuxudamy
    },
    {
      name: "Mastering C++",
      issuer: "Udamy",
      date: "Mar 2025",
      src: mastercpp
    },
    {
      name: "Python Essential",
      issuer: "Udamy",
      date: "Mar 2025",
      src: pythonessential1
    },
    {
      name: "Pythonessential",
      issuer: "Udamy",
      date: "Mar 2025",
      src: pythonessential1
    },
  ];

  const blogPosts = [
    {
      title: 'The Future of MERN Stack in 2025',
      excerpt: 'Exploring the latest trends and updates in the MERN ecosystem for building modern web applications.',
      content: 'Full blog content here... Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      date: 'September 15, 2025',
    },
    {
      title: 'Building Real-time Applications with React and WebSockets',
      excerpt: 'A guide to implementing real-time features in your React apps using WebSockets.',
      content: 'Full blog content here... Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.',
      date: 'August 20, 2025',
    },
    {
      title: 'My Journey in Open Source Contributions',
      excerpt: 'Sharing experiences and tips for getting started with open source projects.',
      content: 'Full blog content here... Duis aute irure dolor in reprehenderit in voluptate velit esse.',
      date: 'July 5, 2025',
    },
  ];

  const galleryPhotos = [bike, car, carin, hudie, office, reading];

  const testimonials = [
    {
      name: 'Dr. Khusboo Bharadwaj',
      role: 'Professor, SISTec',
      quote:
        'Ajmer is an exceptional student with a strong grasp of core concepts. His curiosity and eagerness to explore beyond the syllabus always stand out in class.',
    },
    {
      name: 'Rahul Sharma',
      role: 'Project Mentor (Women-Safety-Analysis)',
      quote:
        'Working with Ajmer was an excellent experience. He took ownership of the project, came up with practical solutions, and made sure we achieved our goals on time.',
    },
    {
      name: 'Prof. Rohit Bansal',
      role: 'Professor, SISTec',
      quote:
        'Ajmer is a great team player. In group activities, he always brings innovative ideas and helps others understand complex topics with ease.',
    },
    {
      name: 'Priya Verma',
      role: 'Hackathon Teammate',
      quote:
        'I collaborated with Ajmer during a national-level hackathon. He has a sharp problem-solving mindset and an ability to stay calm under pressure, which really inspired our whole team.',
    },
    {
      name: 'Sarah Lee',
      role: 'Industry Expert (Workshop)',
      quote:
        'Ajmer’s passion for learning new technologies and his confidence in implementing them is impressive. He quickly adapts and brings value to discussions.',
    },
  ];

  // Form handling
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setFormErrors({ ...formErrors, [e.target.name]: '' });
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.name.trim()) errors.name = 'Name is required';
    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Email is invalid';
    }
    if (!formData.message.trim()) errors.message = 'Message is required';
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Use formData state for sending data
    const data = { ...formData };
    try {
      const response = await axios.post("http://localhost:5000/api/contact", data);
      alert(response.data.message);
    } catch (error) {
      console.error(error);
      alert("Error sending message!");
    }
  };

  const handleDownloadResume = () => {
    alert('Resume download initiated! (Placeholder)');
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const openModal = (photo) => {
    setSelectedPhoto(photo);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedPhoto(null);
  };

  const toggleBlogPost = (index) => {
    setOpenBlogIndex(openBlogIndex === index ? null : index);
  };

  const filteredProjects = projectFilter === 'All' ? projects : projects.filter((p) => p.category === projectFilter);

  return (
    <div className="min-h-screen">
      {/* Inline styles */}
      <style>{styles}</style>
      {/* Navbar */}
      <nav className="fixed w-full z-30 top-0 backdrop-blur-lg bg-white/10 shadow-xl glass border-b border-white/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            {/* Logo */}
            <span className="text-2xl font-bold tracking-tight gradient-text animate-fadeIn hover:scale-110 transition-transform duration-300 cursor-pointer drop-shadow-lg">
              Ajmer Lodhi
            </span>
            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-6">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="relative px-3 py-2 text-sm font-medium text-text-color hover:text-accent-color transition-colors duration-300
                    before:absolute before:bottom-0 before:left-0 before:h-0.5 before:w-0 before:bg-accent-color before:transition-all before:duration-300 hover:before:w-full
                    after:absolute after:top-0 after:left-0 after:h-full after:w-full after:rounded-md after:scale-95 after:bg-accent-color/5 after:opacity-0 hover:after:scale-100 hover:after:opacity-100 after:transition-all after:duration-300"
                >
                  {item.name}
                </a>
              ))}
              {/* Theme Selector */}
              <select
                value={theme}
                onChange={(e) => setTheme(e.target.value)}
                className="glass text-text-color p-2 rounded-md hover-glow border border-white/20 backdrop-blur-sm transition duration-300 shadow-inner hover:shadow-accent-color/20"
              >
                <option value="dark">Dark</option>
                <option value="vibrant">Vibrant</option>
              </select>
            </div>
            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-text-color hover:text-accent-color hover:bg-accent-color/20 focus:outline-none transition duration-300 shadow-sm hover:shadow-lg"
              >
                <svg
                  className={`${isOpen ? 'hidden' : 'block'} h-6 w-6`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
                <svg
                  className={`${isOpen ? 'block' : 'hidden'} h-6 w-6`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
        </div>
        {/* Mobile Menu */}
        <div className={`${isOpen ? 'block' : 'hidden'} md:hidden glass backdrop-blur-lg border-t border-white/20`}>
          <div className="px-4 pt-4 pb-3 space-y-2">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className="block px-3 py-2 text-base font-medium text-text-color hover:text-accent-color hover:bg-accent-color/10 rounded-md transition duration-300 shadow-sm hover:shadow-lg"
              >
                {item.name}
              </a>
            ))}
            <select
              value={theme}
              onChange={(e) => {
                setTheme(e.target.value);
                setIsOpen(false);
              }}
              className="block w-full glass text-text-color p-2 rounded-md hover-glow mt-2 border border-white/20 backdrop-blur-sm transition duration-300 shadow-inner hover:shadow-accent-color/20"
            >
              <option value="dark">Dark</option>
              <option value="vibrant">Vibrant</option>
            </select>
          </div>
        </div>
      </nav>
      {/* Home Section */}
      <section
        id="home"
        className="relative min-h-screen flex items-center justify-center text-center overflow-hidden
                   bg-gradient-to-b from-black via-gray-900 to-black text-white"
      >
        {/* 3D Floating Orbs */}
        <div className="absolute -top-20 -left-32 w-[28rem] h-[28rem] bg-cyan-500/30 rounded-full blur-3xl animate-pulse
                        mix-blend-screen transform-gpu rotate-45"></div>
        <div className="absolute bottom-0 right-0 w-[28rem] h-[28rem] bg-purple-500/30 rounded-full blur-3xl animate-pulse
                        mix-blend-screen transform-gpu -rotate-45"></div>
        {/* Content */}
        <div className="relative z-10 px-6 animate-fadeInUp">
          {/* Name with 3D Glow */}
          <h1
            className="text-5xl md:text-7xl font-extrabold mb-6
                       bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600
                       bg-clip-text text-transparent drop-shadow-[0_0_25px_rgba(56,189,248,0.6)]
                       transform hover:scale-105 transition-transform duration-500"
          >
            Ajmer Lodhi
          </h1>
          {/* Typing text */}
          <p className="text-lg md:text-2xl mb-6 font-medium text-gray-300">
            Computer Science & Engineering Student |{" "}
            <span
              ref={typedTextRef}
              className="text-cyan-400 font-bold animate-cursor drop-shadow-[0_0_15px_rgba(56,189,248,0.7)]"
            ></span>
          </p>
          {/* About */}
          <p className="text-base md:text-lg mb-10 max-w-2xl mx-auto text-gray-400 leading-relaxed">
            🚀 A passionate developer focused on building{" "}
            <span className="text-cyan-400 font-semibold drop-shadow-[0_0_10px_rgba(56,189,248,0.6)]">
              scalable MERN apps
            </span>{" "}
            and exploring{" "}
            <span className="text-purple-400 font-semibold drop-shadow-[0_0_10px_rgba(192,132,252,0.6)]">
              modern technologies
            </span>
            .
          </p>
          {/* Buttons with 3D hover */}
          <div className="flex justify-center space-x-4">
            <a
              href="#contact"
              className="px-6 py-3 rounded-xl font-medium text-lg
                         bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500
                         text-white shadow-[0_0_20px_rgba(56,189,248,0.6)]
                         transition duration-300 transform hover:-translate-y-1 hover:scale-105"
            >
              ✨ Get in Touch
            </a>
            <a
              href={Resume}
              download="Ajmer_resume.pdf"
              className="px-6 py-3 rounded-xl font-medium text-lg
                         border border-cyan-400 text-cyan-400
                         hover:bg-gradient-to-r hover:from-cyan-500 hover:to-purple-500 hover:text-white
                         shadow-[0_0_15px_rgba(56,189,248,0.4)]
                         transition duration-300"
            >
              Download Resume
            </a>
          </div>
          {/* Social Icons with 3D hover */}
          <div className="flex justify-center space-x-8 mt-12">
            {["github", "linkedin", "twitter"].map((platform, i) => (
              <a
                key={i}
                href="#"
                className="text-gray-400 hover:text-cyan-400 text-3xl transition-all transform hover:-translate-y-2 hover:scale-125
                           drop-shadow-[0_0_12px_rgba(56,189,248,0.6)]"
              >
                <i className={`fab fa-${platform}`}></i>
              </a>
            ))}
          </div>
        </div>
        {/* Animations */}
        <style jsx>{`
          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(40px) scale(0.95);
            }
            to {
              opacity: 1;
              transform: translateY(0) scale(1);
            }
          }
          .animate-fadeInUp {
            animation: fadeInUp 1.5s ease-out forwards;
          }
          .animate-cursor::after {
            content: "|";
            animation: blink 1s infinite;
          }
          @keyframes blink {
            0%, 50%, 100% { opacity: 1; }
            25%, 75% { opacity: 0; }
          }
        `}</style>
      </section>
      {/* About Section */}
      <section
        id="about"
        className="relative py-24 bg-gradient-to-b from-gray-950 via-black to-gray-950 overflow-hidden"
      >
        {/* Decorative Background Gradient Blobs */}
        <div className="absolute top-10 left-10 w-72 h-72 bg-cyan-500/20 rounded-full blur-[100px] animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-72 h-72 bg-purple-600/20 rounded-full blur-[100px] animate-pulse"></div>
        <div className="absolute top-1/2 left-1/2 w-[600px] h-[600px] -translate-x-1/2 -translate-y-1/2
                        bg-gradient-to-r from-cyan-500/10 via-purple-600/10 to-blue-500/10 rounded-full blur-[200px] opacity-70 animate-spin-slow"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Section Title */}
          <h2
            className="text-5xl font-extrabold text-center mb-20 bg-clip-text text-transparent
                       bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 drop-shadow-xl animate-fade-in"
          >
            About Me
          </h2>
          <div className="flex flex-col md:flex-row items-center gap-12">
            {/* Profile Image */}
            <div className="md:w-1/3 flex justify-center">
              <div className="relative group">
                <img
                  src={img}
                  alt="Ajmer Lodhi"
                  className="rounded-full shadow-[0_0_30px_rgba(0,200,255,0.5)] w-64 h-64 object-cover
                             transform group-hover:scale-110 transition duration-700 ease-out"
                />
                <div
                  className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600
                             opacity-0 group-hover:opacity-40 transition duration-700 blur-2xl"
                ></div>
              </div>
            </div>
            {/* Info Card */}
            <div
              className="md:w-2/3 glass p-10 rounded-3xl shadow-2xl
                         bg-white/5 backdrop-blur-lg border border-gray-800
                         hover:shadow-[0_0_60px_rgba(0,200,255,0.4)] transition duration-700"
            >
              {/* Profile Summary */}
              <h3 className="text-3xl font-semibold mb-6 text-cyan-400 border-b border-gray-700 pb-2">
                Profile Summary
              </h3>
              <p className="text-lg text-gray-300 leading-relaxed mb-5">
                I’m{" "}
                <span className="text-cyan-400 font-semibold">Ajmer Lodhi</span>, a{" "}
                <span className="text-blue-400">CSE student at SISTec, Bhopal</span>.
                Passionate about building innovative{" "}
                <span className="text-purple-400 font-semibold">MERN stack</span>{" "}
                applications 🚀 and solving real-world problems with clean, scalable,
                and user-centric solutions.
              </p>
              <p className="text-lg text-gray-300 leading-relaxed mb-8">
                I’m a quick learner, collaborative team player, and curious explorer
                of emerging technologies. My mission is to build impactful solutions
                that elevate{" "}
                <span className="text-cyan-400 font-semibold">user experiences</span>{" "}
                and shape the future of digital products.
              </p>
              {/* Education Timeline */}
              <h3 className="text-3xl font-semibold mb-6 text-cyan-400 border-b border-gray-700 pb-2">
                Education Timeline
              </h3>
              <div className="relative border-l-4 border-cyan-500 ml-4 space-y-10">
                {[
                  {
                    title: "Bachelor of Technology (2022–2026)",
                    desc: "Sagar Institute of Science, Technology & Engineering, Bhopal | CGPA: 7.56",
                  },
                  {
                    title: "Senior Secondary (2022)",
                    desc: "NMC English Hr. Sec. School, Banda, MP | 81.30%",
                  },
                  {
                    title: "High School (2020)",
                    desc: "NMC English Hr. Sec. School, Banda, MP | 95.30%",
                  },
                ].map((item, idx) => (
                  <div key={idx} className="pl-6 relative animate-slide-up">
                    <span className="absolute w-5 h-5 bg-cyan-500 rounded-full -left-[11px] top-1
                                     shadow-[0_0_15px_rgba(0,200,255,0.9)] animate-pulse"></span>
                    <h4 className="text-xl font-semibold text-white">{item.title}</h4>
                    <p className="text-gray-400">{item.desc}</p>
                  </div>
                ))}
              </div>
              {/* Co-Curricular Activities */}
              <h3 className="text-3xl font-semibold mt-12 mb-6 text-cyan-400 border-b border-gray-700 pb-2">
                Co-Curricular Activities
              </h3>
              <ul className="text-lg text-gray-300 list-disc list-inside space-y-2">
                <li>Cultural Coordinator, Student Activity Council, SISTec</li>
                <li>Member, Institution Innovation Council (SISTec-R)</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
      {/* Services Section */}
      <section id="services" className="py-24 bg-gradient-to-b from-gray-950 via-black to-gray-950 relative overflow-hidden">
        {/* Decorative Blobs */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-cyan-500/20 rounded-full blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-72 h-72 bg-purple-600/20 rounded-full blur-[120px] animate-pulse"></div>
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          {/* Section Title */}
          <h2 className="text-5xl font-extrabold text-center mb-16 bg-clip-text text-transparent
                         bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 drop-shadow-xl">
            My Services
          </h2>
          {/* Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
            {services.map((service, index) => (
              <div
                key={index}
                className="group relative glass p-8 rounded-2xl shadow-xl border border-gray-800
                           hover:shadow-[0_0_40px_rgba(0,200,255,0.3)] transition duration-700 transform
                           hover:-translate-y-3 hover:scale-105"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                {/* Icon */}
                <div className="text-6xl mb-6 text-cyan-400 drop-shadow-lg group-hover:scale-110 transition duration-500">
                  {service.icon}
                </div>
                {/* Title */}
                <h3 className="text-2xl font-semibold mb-3 text-white group-hover:text-cyan-300 transition">
                  {service.title}
                </h3>
                {/* Description */}
                <p className="text-gray-400 group-hover:text-gray-300 leading-relaxed">
                  {service.description}
                </p>
                {/* Glow effect */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-cyan-500/10 to-purple-600/10
                                opacity-0 group-hover:opacity-30 transition duration-700"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* Projects Section */}
      <section id="projects" className="relative py-24 bg-gradient-to-b from-gray-950 via-black to-gray-950 overflow-hidden">
        {/* Decorative Background */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-cyan-500/20 rounded-full blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-72 h-72 bg-purple-600/20 rounded-full blur-[120px] animate-pulse"></div>
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          {/* Section Title */}
          <h2 className="text-5xl font-extrabold text-center mb-16 bg-clip-text text-transparent
                         bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 drop-shadow-xl">
            My Projects
          </h2>
          {/* Filter Buttons */}
          <div className="flex justify-center mb-12 flex-wrap gap-4">
            {['All', 'MERN', 'React', 'AI'].map((category) => (
              <button
                key={category}
                onClick={() => setProjectFilter(category)}
                className={`px-6 py-2 rounded-full font-semibold transition duration-500 shadow-lg border
                  ${projectFilter === category
                    ? 'bg-gradient-to-r from-cyan-500 to-purple-600 text-white shadow-[0_0_20px_rgba(0,200,255,0.5)] scale-105'
                    : 'bg-gray-900/60 text-gray-400 hover:text-cyan-300 hover:border-cyan-500 hover:shadow-[0_0_15px_rgba(0,200,255,0.4)]'}`}
              >
                {category}
              </button>
            ))}
          </div>
          {/* Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {filteredProjects.map((project, index) => (
              <div
                key={index}
                className="group relative glass rounded-2xl shadow-xl overflow-hidden transform
                           hover:-translate-y-3 hover:scale-105 transition duration-700"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                {/* Project Image with Gradient Overlay */}
                <div className="relative">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-52 object-cover transition duration-500 group-hover:opacity-80"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent
                                  opacity-0 group-hover:opacity-100 transition duration-500"></div>
                </div>
                {/* Project Info */}
                <div className="p-6 relative z-10">
                  <h3 className="text-2xl font-semibold mb-3 text-white group-hover:text-cyan-300 transition">
                    {project.title}
                  </h3>
                  <p className="text-gray-400 mb-6 leading-relaxed">{project.description}</p>
                  {/* View Project Link */}
                  <a
                    href={project.link}
                    target="_blank"
                    className="inline-block px-5 py-2 rounded-lg font-semibold text-white
                               bg-gradient-to-r from-cyan-500 to-blue-600 shadow-md hover:shadow-lg
                               hover:scale-105 transition duration-500"
                  >
                    🚀 View Project
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* Skills Section */}
      <section
        id="skills"
        className="relative py-24 bg-gradient-to-b from-gray-950 via-black to-gray-950 overflow-hidden"
      >
        {/* Decorative Background Blobs */}
        <div className="absolute top-32 left-10 w-72 h-72 bg-cyan-500/20 rounded-full blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-32 right-10 w-72 h-72 bg-purple-600/20 rounded-full blur-[120px] animate-pulse"></div>
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          {/* Section Title */}
          <h2 className="text-5xl font-extrabold text-center mb-16 bg-clip-text text-transparent
                         bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 drop-shadow-xl">
            Key Technical Skills
          </h2>
          {/* Skills Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-10">
            {skills.map((skill, index) => (
              <div
                key={index}
                className="text-center group transform hover:scale-110 transition duration-700 hover:rotate-1"
                style={{ animationDelay: `${index * 0.15}s` }}
              >
                {/* Circular Progress Bar */}
                <div className="relative w-28 h-28 mx-auto mb-4">
                  <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                    {/* Background Circle */}
                    <circle
                      className="text-gray-800 stroke-current"
                      strokeWidth="10"
                      cx="50"
                      cy="50"
                      r="45"
                      fill="transparent"
                    />
                    {/* Progress Circle */}
                    <circle
                      className="text-cyan-400 stroke-current"
                      strokeWidth="10"
                      strokeLinecap="round"
                      cx="50"
                      cy="50"
                      r="45"
                      fill="transparent"
                      strokeDasharray={2 * Math.PI * 45}
                      strokeDashoffset={2 * Math.PI * 45 * (1 - skill.level / 100)}
                      style={{
                        filter: "drop-shadow(0 0 8px rgba(0,200,255,0.8))",
                        transition: "stroke-dashoffset 1s ease-in-out",
                      }}
                    />
                  </svg>
                  {/* Percentage in Center */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-xl font-bold text-white drop-shadow-md">
                      {skill.level}%
                    </span>
                  </div>
                </div>
                <p className="text-gray-300 font-medium group-hover:text-cyan-300 transition">
                  {skill.name}
                </p>
              </div>
            ))}
          </div>
          {/* Interpersonal Skills */}
          <h3 className="text-3xl font-semibold mt-16 mb-8 text-white border-b border-gray-700 pb-2 text-center">
            Interpersonal Skills
          </h3>
          <ul className="flex flex-wrap gap-5 justify-center text-gray-300">
            {["Optimism", "Quick Learner", "Team Player", "Problem Solving", "Leadership"].map(
              (softSkill, i) => (
                <li
                  key={i}
                  className="glass px-6 py-3 rounded-full flex items-center gap-2
                             shadow-md hover:shadow-[0_0_20px_rgba(0,200,255,0.5)]
                             hover:scale-110 transition duration-500 cursor-pointer"
                >
                  <span className="w-3 h-3 rounded-full bg-cyan-400 animate-pulse"></span>
                  {softSkill}
                </li>
              )
            )}
          </ul>
        </div>
      </section>
      {/* Certifications Section */}
      <section id="certifications" className="py-20 bg-gradient-to-b from-black via-gray-900 to-black text-white relative overflow-hidden">
        {/* Background glow effects */}
        <div className="absolute inset-0 -z-10">
          <div className="w-96 h-96 bg-purple-500/30 rounded-full blur-3xl absolute top-10 left-10 animate-pulse"></div>
          <div className="w-96 h-96 bg-blue-500/30 rounded-full blur-3xl absolute bottom-10 right-10 animate-pulse"></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <h2 className="text-4xl md:text-5xl font-extrabold text-center mb-16">
            <span className="bg-gradient-to-r from-purple-400 via-blue-400 to-pink-400 bg-clip-text text-transparent animate-gradient-x">
              Certifications & Trainings
            </span>
          </h2>
          <div className="space-y-8">
            {certifications.map((cert, index) => (
              <div
                key={index}
                className="group glass relative rounded-2xl p-6 md:p-8 transition-all duration-500 hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(168,85,247,0.5)] border border-white/10 bg-white/5 backdrop-blur-lg flex flex-col md:flex-row md:justify-between md:items-center"
              >
                <div className="relative z-10">
                  <h3 className="text-2xl font-bold group-hover:text-purple-400 transition">{cert.name}</h3>
                  <p className="text-gray-400 mt-1">{cert.issuer} | {cert.date}</p>
                </div>
                {cert.src && (
                  <button
                    onClick={() => openModal(cert.src)}
                    className="relative mt-6 md:mt-0 px-6 py-2 font-semibold rounded-lg overflow-hidden bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-lg transition-all duration-300 transform hover:scale-110 hover:shadow-[0_0_25px_rgba(147,51,234,0.8)]"
                  >
                    <span className="relative z-10">View Certificate</span>
                    <span className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></span>
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
        {/* Modal */}
        {isModalOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-95 flex items-center justify-center z-50 p-6 backdrop-blur-md animate-fadeIn"
            onClick={closeModal}
          >
            <div
              className="relative max-w-5xl w-full animate-zoomIn"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={selectedCert}
                alt="Certificate"
                className="w-full max-h-screen rounded-2xl shadow-2xl"
              />
              <button
                className="absolute top-4 right-4 text-4xl text-white hover:text-purple-400 transition duration-300"
                onClick={closeModal}
              >
                &times;
              </button>
            </div>
          </div>
        )}
      </section>
      {/* Blog Section */}
      <section id="blog" className="py-24 bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-5xl font-extrabold text-center mb-16 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 animate-gradient-x">
            My Blog
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
            {blogPosts.map((post, index) => (
              <div
                key={index}
                className="relative bg-gradient-to-r from-gray-800 to-gray-900 glass p-8 rounded-2xl shadow-xl transform transition-all duration-500 hover:scale-105 hover:shadow-2xl group"
              >
                <h3 className="text-2xl font-bold mb-3 text-white group-hover:text-blue-400 transition-colors duration-300">
                  {post.title}
                </h3>
                <p className="text-gray-300 mb-2 line-clamp-3">{post.excerpt}</p>
                <p className="text-sm text-gray-400 mb-4">{post.date}</p>
                <button
                  onClick={() => toggleBlogPost(index)}
                  className="inline-block text-blue-400 font-semibold hover:text-purple-400 hover:underline transition duration-300"
                >
                  {openBlogIndex === index ? 'Hide' : 'Read More'}
                </button>
                {openBlogIndex === index && (
                  <p className="mt-4 text-gray-300 animate-fadeIn">{post.content}</p>
                )}
                {/* Decorative glow effect */}
                <span className="absolute -inset-0.5 bg-gradient-to-r from-blue-400 to-purple-500 rounded-2xl blur opacity-30 group-hover:opacity-50 transition duration-500"></span>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* Gallery Section */}
      <section id="gallery" className="py-20 bg-gradient-to-b from-black via-gray-900 to-black text-white relative overflow-hidden">
        {/* Background glow effects */}
        <div className="absolute inset-0 -z-10">
          <div className="w-96 h-96 bg-purple-500/30 rounded-full blur-3xl absolute top-10 left-10 animate-pulse"></div>
          <div className="w-96 h-96 bg-blue-500/30 rounded-full blur-3xl absolute bottom-10 right-10 animate-pulse"></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <h2 className="text-4xl md:text-5xl font-extrabold text-center mb-16">
            <span className="bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400 bg-clip-text text-transparent animate-gradient-x">
              Photo Gallery
            </span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {galleryPhotos.map((photo, index) => (
              <div
                key={index}
                className="relative group cursor-pointer overflow-hidden rounded-2xl shadow-lg border border-white/10 bg-white/5 backdrop-blur-md hover:shadow-[0_0_30px_rgba(168,85,247,0.5)] transform hover:scale-[1.03] transition-all duration-500"
                onClick={() => openModal(photo)}
              >
                <img
                  src={photo}
                  alt={`Gallery Photo ${index + 1}`}
                  className="w-full h-72 object-cover rounded-2xl group-hover:scale-110 transition-transform duration-700 ease-in-out"
                />
                {/* Overlay with glow text */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition duration-500 flex items-end justify-center rounded-2xl p-4">
                  <p className="text-lg font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400 animate-pulse">
                    Photo {index + 1}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* Modal */}
        {isModalOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-95 flex items-center justify-center z-50 p-6 backdrop-blur-md animate-fadeIn"
            onClick={closeModal}
          >
            <div
              className="relative max-w-5xl w-full animate-zoomIn"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={selectedPhoto}
                alt="Enlarged Photo"
                className="w-full max-h-screen rounded-2xl shadow-2xl"
              />
              <button
                className="absolute top-4 right-4 text-4xl text-white hover:text-purple-400 transition duration-300"
                onClick={closeModal}
              >
                &times;
              </button>
            </div>
          </div>
        )}
      </section>
      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 bg-gray-900">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center mb-12 text-white section-title gradient-text">
            Testimonials
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-gray-800/70 backdrop-blur-md p-6 rounded-xl shadow-xl transform transition duration-500 hover:scale-105 hover:shadow-indigo-500/50"
              >
                <div className="mb-4">
                  <h3 className="text-lg font-semibold text-white">{testimonial.name || 'Anonymous'}</h3>
                  <p className="text-indigo-300 text-sm">{testimonial.role}</p>
                </div>
                <p className="text-gray-300 italic text-sm">"{testimonial.quote}"</p>
                <div className="mt-4">
                  <span className="text-yellow-400">★ ★ ★ ★ ★</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* Contact Section */}
      <section id="contact" className="py-24 bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-5xl font-extrabold text-center mb-16 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 animate-gradient-x">
            Contact Me
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {/* Contact Info Card */}
            <div className="relative p-8 rounded-2xl shadow-xl transform transition-all duration-500 hover:scale-105 hover:shadow-2xl glass bg-gradient-to-r from-gray-800 to-gray-900">
              {/* Glow Background */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-500 rounded-2xl blur opacity-20 pointer-events-none"></div>
              <div className="relative z-10">
                <h3 className="text-2xl font-bold mb-6 text-white">
                  Get in Touch
                </h3>
                <p className="text-gray-300 mb-3 flex items-center">
                  <strong className="mr-2">Phone:</strong> +91 9516991004
                </p>
                <p className="text-gray-300 mb-3 flex items-center">
                  <strong className="mr-2">Email:</strong> thakurajmer0111@gmail.com
                </p>
                <p className="text-gray-300 mb-3 flex items-center">
                  <strong className="mr-2">LinkedIn:</strong>
                  <a href="https://linkedin.com/in/ajmer-lodhi" className="text-blue-400 hover:text-purple-400 hover:underline flex items-center ml-1 transition duration-300">
                    Ajmer Lodhi
                    <svg className="w-4 h-4 ml-1" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M16.338 16.338H13.67V12.16c0-1-.025-2.277-1.387-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248H8.014v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.778 3.203 4.092v4.711zM5.005 7.575a1.548 1.548 0 11-.003-3.096 1.548 1.548 0 01.003 3.096zm1.337 8.763H3.666V7.748h2.676v8.59zM17.668 3H2.328c-.734 0-1.328.596-1.328 1.33v14.34c0 .734.594 1.33 1.328 1.33h15.34c.734 0 1.33-.596 1.33-1.33V4.33c0-.734-.596-1.33-1.33-1.33z"/>
                    </svg>
                  </a>
                </p>
                <p className="text-gray-300 flex items-center">
                  <strong className="mr-2">GitHub:</strong>
                  <a href="https://github.com/Ajmer011" className="text-blue-400 hover:text-purple-400 hover:underline flex items-center ml-1 transition duration-300">
                    Ajmer011
                    <svg className="w-4 h-4 ml-1" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.255-.446-1.273.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A15.019 15.019 0 0020 10.017C20 4.484 15.522 0 10 0z"/>
                    </svg>
                  </a>
                </p>
              </div>
            </div>
            {/* Contact Form */}
            <form onSubmit={handleSubmit} className="relative max-w-lg w-full p-8 rounded-2xl shadow-xl transform transition-all duration-500 hover:scale-105 hover:shadow-2xl glass bg-gradient-to-r from-gray-800 to-gray-900">
              {/* Glow Background */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-500 rounded-2xl blur opacity-20 pointer-events-none"></div>
              <div className="relative z-10">
                <div className="mb-4">
                  <label htmlFor="name" className="block text-sm font-medium text-white">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={`mt-2 block w-full rounded-md shadow-sm focus:ring-blue-400 transition duration-300 px-3 py-2 ${
                      formErrors.name ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : 'glass'
                    }`}
                    required
                  />
                  {formErrors.name && <p className="text-red-500 text-sm mt-1">{formErrors.name}</p>}
                </div>
                <div className="mb-4">
                  <label htmlFor="email" className="block text-sm font-medium text-white">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`mt-2 block w-full rounded-md shadow-sm focus:ring-blue-400 transition duration-300 px-3 py-2 ${
                      formErrors.email ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : 'glass'
                    }`}
                    required
                  />
                  {formErrors.email && <p className="text-red-500 text-sm mt-1">{formErrors.email}</p>}
                </div>
                <div className="mb-4">
                  <label htmlFor="message" className="block text-sm font-medium text-white">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows="4"
                    className={`mt-2 block w-full rounded-md shadow-sm focus:ring-blue-400 transition duration-300 px-3 py-2 ${
                      formErrors.message ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : 'glass'
                    }`}
                    required
                  ></textarea>
                  {formErrors.message && <p className="text-red-500 text-sm mt-1">{formErrors.message}</p>}
                </div>
                <button
                  type="submit"
                  className="w-full bg-blue-400 text-white px-4 py-2 rounded-md hover:bg-purple-400 hover:scale-105 transition duration-300 transform hover-glow"
                >
                  Send Message
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
      {/* Footer Section */}
      <footer className="relative bg-gradient-to-t from-gray-900 via-gray-800 to-gray-900 py-12 glass">
        {/* Glow Background */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-500 rounded-t-3xl blur opacity-20 pointer-events-none"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center space-y-6">
          {/* Copyright */}
          <p className="text-center text-white text-sm md:text-base">
            © 2025 <span className="font-semibold">Ajmer Lodhi</span>. All rights reserved.
          </p>
          {/* Social Icons */}
          <div className="flex space-x-6">
            <a href="https://github.com/Ajmer011" className="text-white hover:text-blue-400 transform hover:scale-125 transition duration-300">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12c0 4.42 2.87 8.17 6.84 9.5.5.09.66-.22.66-.49v-1.7c-2.78.61-3.36-1.34-3.36-1.34-.46-1.16-1.12-1.47-1.12-1.47-.91-.62.07-.61.07-.61 1 .07 1.53 1.03 1.53 1.03.89 1.52 2.34 1.08 2.91.83.09-.65.35-1.08.63-1.33-2.22-.25-4.55-1.11-4.55-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.02A9.58 9.58 0 0112 6.8c.85.004 1.71.11 2.52.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.38.2 2.4.1 2.65.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.69-4.57 4.94.36.31.68.92.68 1.85v2.75c0 .27.16.58.67.49A10.01 10.01 0 0022 12c0-5.52-4.48-10-10-10z" />
              </svg>
            </a>
            <a href="https://linkedin.com/in/ajmer-lodhi" className="text-white hover:text-purple-400 transform hover:scale-125 transition duration-300">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 3a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h14zm-1.53 14.47V13.3c0-2.24-.9-3.78-2.81-3.78-1.15 0-2.11.64-2.47 1.38v-1.17H9.47V17.47h2.73v-4.54c0-1.2.23-2.36 1.72-2.36 1.48 0 1.48 1.36 1.48 2.43v4.47h2.73zM6.73 17.47h2.73V9.47H6.73v8zM8.1 7.67c.95 0 1.72-.77 1.72-1.72S9.05 4.23 8.1 4.23s-1.72.77-1.72 1.72.77 1.72 1.72 1.72z" />
              </svg>
            </a>
          </div>
          {/* Hobbies */}
          <p className="text-center text-gray-300 flex flex-wrap justify-center gap-4 items-center text-sm md:text-base">
            <span className="flex items-center gap-1">
              <svg className="w-5 h-5 text-accent-color" fill="currentColor" viewBox="0 0 20 20">
                <path d="M5 4a1 1 0 00-2 0v7.268a2 2 0 000 3.464V16a1 1 0 102 0v-1.268a2 2 0 000-3.464V4zM11 4a1 1 0 10-2 0v1.268a2 2 0 000 3.464V16a1 1 0 102 0V8.732a2 2 0 000-3.464V4zM16 3a1 1 0 011 1v7.268a2 2 0 010 3.464V16a1 1 0 11-2 0v-1.268a2 2 0 010-3.464V4a1 1 0 011-1z" />
              </svg>
              Exploring emerging technologies
            </span>
            <span className="flex items-center gap-1">
              <svg className="w-5 h-5 text-accent-color" fill="currentColor" viewBox="0 0 20 20">
                <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
              </svg>
              Following tech blogs and conferences
            </span>
            <span className="flex items-center gap-1">
              <svg className="w-5 h-5 text-accent-color" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
              </svg>
              Contributing to open-source projects
            </span>
          </p>
        </div>
      </footer>
      {/* Scroll to Top Button */}
      <button
        onClick={scrollToTop}
        className={`fixed bottom-8 right-8 p-3 bg-accent-color text-text-color rounded-full shadow-lg hover:bg-accent-color/90 transition duration-300 transform ${
          showScrollTop ? 'opacity-100 scale-100 rotate-0' : 'opacity-0 scale-0 rotate-180'
        } hover-glow`}
        title="Scroll to Top"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
        </svg>
      </button>
    </div>
  );
}

export default App;