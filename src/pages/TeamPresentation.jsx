import React from 'react';
import { motion } from 'framer-motion';
import { Github, Instagram, Linkedin } from 'lucide-react';

const TeamPresentation = () => {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  const cardVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: { duration: 0.6, ease: "easeOut" },
    },
    hover: {
      scale: 1.05,
      boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
      transition: { duration: 0.3 },
    },
  };

  const parallaxVariants = {
    hidden: { y: 100 },
    visible: {
      y: 0,
      transition: { duration: 1, ease: "easeOut" },
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white font-['Inter']">
      {/* Hero Section */}
      <motion.section
        className="relative h-screen flex items-center justify-center overflow-hidden"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Background Gradient Animation */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-gray-600/20 to-black/40"
          animate={{
            background: [
              "linear-gradient(45deg, rgba(107,114,128,0.2), rgba(0,0,0,0.4))",
              "linear-gradient(135deg, rgba(0,0,0,0.4), rgba(107,114,128,0.2))",
              "linear-gradient(45deg, rgba(107,114,128,0.2), rgba(0,0,0,0.4))",
            ],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
        />

        <div className="relative z-10 text-center px-4">
          <motion.h1
            className="text-6xl md:text-8xl font-bold mb-4 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent"
            variants={itemVariants}
          >
            MAMZ
          </motion.h1>
          <motion.h2
            className="text-2xl md:text-4xl font-light mb-2"
            variants={itemVariants}
          >
            Meet The Minds Behind MAMZ
          </motion.h2>
          <motion.p
            className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto"
            variants={itemVariants}
          >
            Dua siswa SMK Telkom Makassar yang siap mengguncang dunia digital.
            <br />
            Two students from SMK Telkom Makassar ready to shake the digital world.
          </motion.p>
        </div>

        {/* Floating Elements */}
        <motion.div
          className="absolute top-20 left-20 w-16 h-16 bg-red-500/20 rounded-full blur-xl"
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-20 right-20 w-24 h-24 bg-white/10 rounded-full blur-xl"
          animate={{ y: [0, 20, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        />
      </motion.section>

      {/* Profile Cards Section */}
      <motion.section
        className="py-20 px-4"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <div className="max-w-6xl mx-auto">
          <motion.h2
            className="text-4xl md:text-5xl font-bold text-center mb-16"
            variants={itemVariants}
          >
            Our Innovators
          </motion.h2>

          <div className="grid md:grid-cols-2 gap-12">
            {/* Imam Albashit Card */}
            <motion.div
              className="bg-gradient-to-br from-gray-900 to-red-900 p-8 rounded-2xl border border-red-500/20"
              variants={cardVariants}
              whileHover="hover"
            >
              <div className="text-center mb-6">
                <motion.div
                  className="w-24 h-24 bg-gradient-to-r from-red-500 to-red-700 rounded-full mx-auto mb-4 flex items-center justify-center text-2xl font-bold"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  IA
                </motion.div>
                <h3 className="text-2xl font-bold mb-2">Imam Albashit</h3>
                <p className="text-red-400 font-medium">Frontend Developer / Creative Designer</p>
              </div>
              <p className="text-gray-300 text-center mb-4">
                Seorang pengembang muda yang suka mengubah ide jadi tampilan yang hidup.
              </p>
              <div className="flex flex-wrap justify-center gap-2">
                {['React', 'Tailwind', 'Framer Motion', 'UI/UX'].map((skill, index) => (
                  <motion.span
                    key={skill}
                    className="px-3 py-1 bg-red-500/20 text-red-300 rounded-full text-sm"
                    whileHover={{ scale: 1.1 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </motion.div>

            {/* Indra Priyatna Darmawan Card */}
            <motion.div
              className="bg-gradient-to-br from-gray-900 to-red-900 p-8 rounded-2xl border border-red-500/20"
              variants={cardVariants}
              whileHover="hover"
            >
              <div className="text-center mb-6">
                <motion.div
                  className="w-24 h-24 bg-gradient-to-r from-red-500 to-red-700 rounded-full mx-auto mb-4 flex items-center justify-center text-2xl font-bold"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  IPD
                </motion.div>
                <h3 className="text-2xl font-bold mb-2">Indra Priyatna Darmawan</h3>
                <p className="text-red-400 font-medium">Backend Developer / Tech Builder</p>
              </div>
              <p className="text-gray-300 text-center mb-4">
                Pecinta logika dan sistem yang efisien — penggerak di balik performa MAMZ.
              </p>
              <div className="flex flex-wrap justify-center gap-2">
                {['Node.js', 'Firebase', 'Express', 'Cloud APIs'].map((skill, index) => (
                  <motion.span
                    key={skill}
                    className="px-3 py-1 bg-red-500/20 text-red-300 rounded-full text-sm"
                    whileHover={{ scale: 1.1 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Project Section */}
      <motion.section
        className="py-20 px-4 bg-black/50"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2
            className="text-4xl md:text-5xl font-bold mb-8"
            variants={itemVariants}
          >
            MAMZ — Our Vision in Motion
          </motion.h2>
          <motion.p
            className="text-xl text-gray-300 mb-12"
            variants={itemVariants}
          >
            Kami membangun MAMZ sebagai wujud kreativitas dan semangat anak muda di dunia teknologi dan fashion digital.
          </motion.p>

          {/* Mock E-commerce Preview */}
          <motion.div
            className="bg-gradient-to-r from-gray-800 to-red-900 p-8 rounded-2xl border border-red-500/30 mb-8"
            variants={itemVariants}
            whileHover={{ scale: 1.02 }}
          >
            <div className="grid md:grid-cols-3 gap-6">
              {[1, 2, 3].map((item) => (
                <motion.div
                  key={item}
                  className="bg-gray-900 p-4 rounded-lg"
                  whileHover={{ y: -5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="w-full h-32 bg-gradient-to-br from-red-500 to-red-700 rounded mb-3"></div>
                  <div className="h-4 bg-gray-700 rounded mb-2"></div>
                  <div className="h-3 bg-gray-800 rounded w-3/4"></div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.button
            className="px-8 py-4 bg-gradient-to-r from-red-600 to-red-800 rounded-full text-lg font-semibold hover:from-red-700 hover:to-red-900 transition-all duration-300 shadow-lg hover:shadow-xl"
            variants={itemVariants}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Explore Our Work
          </motion.button>
        </div>
      </motion.section>

      {/* Quotes Section */}
      <motion.section
        className="py-20 px-4"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <div className="max-w-4xl mx-auto">
          <motion.h2
            className="text-4xl md:text-5xl font-bold text-center mb-16"
            variants={itemVariants}
          >
            Words of Wisdom
          </motion.h2>

          <div className="grid md:grid-cols-2 gap-12">
            <motion.div
              className="text-center"
              variants={itemVariants}
            >
              <motion.blockquote
                className="text-2xl italic text-gray-300 mb-4"
                whileHover={{ scale: 1.02 }}
              >
                "Koding itu bukan sekadar baris perintah, tapi karya yang berbicara."
              </motion.blockquote>
              <cite className="text-red-400 font-semibold">— Imam Albashit</cite>
            </motion.div>

            <motion.div
              className="text-center"
              variants={itemVariants}
            >
              <motion.blockquote
                className="text-2xl italic text-gray-300 mb-4"
                whileHover={{ scale: 1.02 }}
              >
                "Inovasi lahir dari keberanian untuk mencoba hal baru."
              </motion.blockquote>
              <cite className="text-red-400 font-semibold">— Indra Priyatna Darmawan</cite>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Contact/Footer Section */}
      <motion.footer
        className="py-16 px-4 bg-gradient-to-t from-black to-red-900/20"
        variants={parallaxVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2
            className="text-3xl md:text-4xl font-bold mb-8"
            variants={itemVariants}
          >
            SMK TELKOM MAKASSAR
          </motion.h2>

          <motion.p
            className="text-xl text-gray-300 mb-8"
            variants={itemVariants}
          >
            Future Innovators from SMK Telkom Makassar
          </motion.p>

          {/* Social Links */}
          <motion.div
            className="flex justify-center space-x-6 mb-8"
            variants={itemVariants}
          >
            {[
              { Icon: Github, href: '#' },
              { Icon: Instagram, href: '#' },
              { Icon: Linkedin, href: '#' },
            ].map(({ Icon, href }, index) => (
              <motion.a
                key={index}
                href={href}
                className="w-12 h-12 bg-red-500/20 rounded-full flex items-center justify-center hover:bg-red-500/40 transition-colors"
                whileHover={{ scale: 1.2, rotate: 360 }}
                transition={{ duration: 0.6 }}
              >
                <Icon size={24} />
              </motion.a>
            ))}
          </motion.div>

          <motion.p
            className="text-gray-400"
            variants={itemVariants}
          >
            © 2025 MAMZ Project — Created by Imam Albashit & Indra Priyatna Darmawan
          </motion.p>
        </div>
      </motion.footer>
    </div>
  );
};

export default TeamPresentation;
