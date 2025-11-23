import React from 'react';
import { motion } from 'framer-motion';
import TiltedCard from '../components/TiltedCard';
import './CareerPage.css';

const CareerPage = () => {
  const skills = [
    'HTML', 'CSS', 'React', 'Networking Basics', 'Fiber Optic', 'IoT'
  ];

  const goals = [
    {
      year: '2028',
      title: 'Complete High School',
      description:
        'Graduate from SMK Telkom Makassar with excellence in Telecommunication Engineering.'
    },
    {
      year: '2028-2034',
      title: 'Pursue Higher Education',
      description:
        'Enroll in a university program focused on Telecommunications or Software Engineering.'
    },
    {
      year: '2035+',
      title: 'Build a Career',
      description:
        'Work as a Telecom Engineer or Software Developer, innovating in network technologies and IoT solutions.'
    }
  ];

  return (
    <div className="career-page-container min-h-screen text-white overflow-hidden relative">

      {/* Hero Section */}
      <section className="hero-section flex flex-col items-center justify-center text-center py-20 px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <TiltedCard
            imageSrc="/assets/foto.jpg"
            altText="Imam Albashit"
            captionText="Imam Albashit"
            containerHeight="300px"
            containerWidth="300px"
            imageHeight="300px"
            imageWidth="300px"
            scaleOnHover={1.1}
            rotateAmplitude={14}
            showMobileWarning={false}
            showTooltip={true}
            overlayContent={
              <button
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors"
                onClick={() => console.log('Call Me')}
              >
                Call Me
              </button>
            }
            displayOverlayContent={true}
          />
        </motion.div>

        <motion.h1
          className="text-4xl md:text-5xl font-bold mt-8 mb-4 text-red-400"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          ImamSkyy
        </motion.h1>

        <motion.p
          className="text-lg md:text-xl text-gray-300 max-w-2xl leading-relaxed"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          A passionate Grade 10 student from SMK Telkom Makassar majoring in
          Telecommunication Engineering, exploring the intersection between
          technology, software, and network innovation.
        </motion.p>
      </section>

      {/* About Me Section */}
      <motion.section
        id="about"
        className="about-section py-16 px-6 md:px-20 max-w-4xl mx-auto"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <h2 className="text-3xl md:text-4xl font-semibold mb-6 text-red-400 text-center">
          About Me
        </h2>

        <div className="bg-gray-900/40 backdrop-blur-md rounded-2xl p-8 shadow-lg border border-gray-700/50">
          <p className="text-gray-300 text-lg leading-relaxed">
            Hi, I'm Imam Albashit, a dedicated student at SMK Telkom Makassar
            with a keen interest in Telecommunication Engineering. My passion
            lies in understanding how networks connect the world, from fiber
            optics to IoT devices. I'm motivated by the rapid advancements in
            technology and aspire to contribute to innovative solutions that
            bridge software and hardware. Outside of academics, I enjoy
            tinkering with code, exploring new programming languages, and
            staying updated on the latest telecom trends.
          </p>
        </div>
      </motion.section>

      {/* Skills Section */}
      <motion.section
        id="skills"
        className="skills-section py-16 px-6 md:px-20"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <h2 className="text-3xl md:text-4xl font-semibold mb-8 text-red-400 text-center">
          Skills & Tools
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6 max-w-6xl mx-auto">
          {skills.map((skill, index) => (
            <motion.div
              key={skill}
              className="bg-gray-900/40 backdrop-blur-md rounded-xl p-6 shadow-lg border border-gray-700/50 text-center hover:bg-red-900/20 transition-all duration-300 cursor-pointer"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05 }}
            >
              <h3 className="text-lg font-semibold text-white">{skill}</h3>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Future Goals Section */}
      <motion.section
        id="goals"
        className="future-goals py-16 px-6 md:px-20 max-w-4xl mx-auto"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <h2 className="text-3xl md:text-4xl font-semibold mb-8 text-red-400 text-center">
          Future Goals
        </h2>

        <div className="timeline space-y-8">
          {goals.map((goal, index) => (
            <motion.div
              key={goal.year}
              className="flex flex-col md:flex-row items-center md:items-start bg-gray-900/40 backdrop-blur-md rounded-2xl p-6 shadow-lg border border-gray-700/50"
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.2, duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="flex-shrink-0 w-16 h-16 bg-red-500 rounded-full flex items-center justify-center text-white font-bold text-lg mb-4 md:mb-0 md:mr-6">
                {goal.year.split('-')[0]}
              </div>

              <div className="text-center md:text-left">
                <h3 className="text-xl font-semibold text-white mb-2">
                  {goal.title}
                </h3>
                <p className="text-gray-300">{goal.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>
    </div>
  );
};

export default CareerPage;
