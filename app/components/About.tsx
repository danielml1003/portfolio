
import React from 'react';
import { motion } from 'framer-motion';
import { Code, Zap, Users, Target } from 'lucide-react';

export default function About() {
  const highlights = [
    {
      icon: Code,
      title: 'Full Stack Development',
      description: 'Experienced in both frontend and backend technologies, creating complete solutions from database to user interface.'
    },
    {
      icon: Zap,
      title: 'Performance Focused',
      description: 'Passionate about writing efficient, scalable code that delivers excellent user experiences.'
    },
    {
      icon: Users,
      title: 'Team Collaboration',
      description: 'Strong communicator who thrives in collaborative environments and enjoys mentoring junior developers.'
    },
    {
      icon: Target,
      title: 'Problem Solver',
      description: 'Analytical mindset with a knack for breaking down complex problems into manageable solutions.'
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: false, amount: 0.3 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-6">
            About Me
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            I'm a dedicated software engineer with a passion for creating innovative solutions 
            and building scalable applications. My journey in tech has been driven by curiosity 
            and a commitment to continuous learning.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* Profile Story */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: false, amount: 0.3 }}
            className="space-y-6"
          >
            <div className="prose prose-lg">
              <p className="text-gray-700 leading-relaxed">
                With a strong foundation in computer science and hands-on experience in various 
                programming languages and frameworks, I bring both technical expertise and creative 
                problem-solving skills to every project.
              </p>
              <p className="text-gray-700 leading-relaxed">
                I'm particularly interested in modern web technologies, cloud computing, and 
                building applications that make a real difference in people's lives. Whether 
                working on frontend interfaces or backend systems, I strive for clean, 
                maintainable code and excellent user experiences.
              </p>
              <p className="text-gray-700 leading-relaxed">
                Currently seeking opportunities to contribute to innovative projects and grow 
                with a team that values collaboration, continuous learning, and technical excellence.
              </p>
            </div>
          </motion.div>

          {/* Highlights Grid */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: false, amount: 0.3 }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-6"
          >
            {highlights.map((highlight, index) => (
              <motion.div
                key={highlight.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: false, amount: 0.3 }}
                className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-2xl border border-blue-100 hover:shadow-lg transition-shadow duration-300"
              >
                <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center mb-4">
                  <highlight.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-slate-900 mb-2">
                  {highlight.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {highlight.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
