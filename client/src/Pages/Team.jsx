import React from "react";
import { motion } from "framer-motion";
import {
  Users,
  Star,
  Award,
  Target,
  Briefcase,
  Phone,
  Mail,
  Linkedin,
  Twitter,
  BookOpen,
  Gem,
  Heart,
  TrendingUp,
} from "lucide-react";

const Team = () => {
  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
  };

  const teamMembers = [
    {
      name: "Zelalem L.",
      position: "Team Member",
      image:
        "/public/team/zelalem.JPG",
      social: {
        linkedin: "#",
        twitter: "#",
      },
      achievements: "2+ years experience on web Development",
      color: "bg-blue-50",
      iconColor: "text-blue-500",
    },
    {
      name: "Bereket T.",
      position: "Team Member",
      image:
        "/public/team/beki.jpg",
      social: {
        linkedin: "#",
        twitter: "#",
      },
      achievements: "2+ year on full stack Development",
      color: "bg-green-50",
      iconColor: "text-green-500",
    },
    {
      name: "Kaleab W.",
      position: "Team member",
      image:
        "/public/team/kaleab.jpg",
      social: {
        linkedin: "#",
        twitter: "#",
      },
      achievements: "2+ year on FrontEnd Development",
      color: "bg-green-50",
      iconColor: "text-green-500",
    },
    {
      name: "Nebyu T.",
      position: "Team Member",
      image:
        "/public/team/i.JPG",
      social: {
        linkedin: "#",
        twitter: "#",
      },
      achievements: "2+ year on backend Development",
      color: "bg-purple-50",
      iconColor: "text-purple-500",
    },
  ];

  const coreValues = [
    {
      icon: Gem,
      title: "Excellence",
      description: "We strive for excellence in every aspect of our service.",
    },
    {
      icon: Heart,
      title: "Customer First",
      description: "Our customers' satisfaction is our top priority.",
    },
    {
      icon: Target,
      title: "Innovation",
      description: "Continuously improving and adapting to industry changes.",
    },
    {
      icon: TrendingUp,
      title: "Growth",
      description: "Committed to sustainable growth and development.",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 pt-8">
      {/* Hero Section */}
      <section className="pt-16 pb-4">
        <div className="container mx-auto px-4">
          <motion.div
            variants={fadeIn}
            initial="initial"
            whileInView="whileInView"
            className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 rounded-full mb-6">
              <Users className="w-5 h-5 text-green-500" />
              <span className="text-green-700 font-medium">Our Team</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Meet the <span className="text-green-500">Experts</span> Behind
              Our Success
            </h1>
            <p className="text-gray-600 text-lg leading-relaxed">
              Our dedicated team of professionals works tirelessly to ensure you
              have the best car rental experience possible.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Team Members Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="group">
                <div
                  className={`rounded-xl p-6 ${member.color} transition-all duration-300 
                             group-hover:-translate-y-2`}>
                  <div className="relative mb-6">
                    <div className="aspect-square rounded-lg bg-gray-200 overflow-hidden">
                      <img
                        src={member.image}
                        alt={member.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="absolute -bottom-4 right-4 flex gap-2">
                      {Object.entries(member.social).map(
                        ([platform, link], idx) => (
                          <motion.a
                            key={idx}
                            href={link}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            className="w-8 h-8 rounded-full bg-white shadow-sm flex items-center justify-center
                                   hover:bg-gray-50 transition-colors">
                            {platform === "linkedin" ? (
                              <Linkedin className="w-4 h-4 text-gray-600" />
                            ) : (
                              <Twitter className="w-4 h-4 text-gray-600" />
                            )}
                          </motion.a>
                        )
                      )}
                    </div>
                  </div>

                  <h3 className="text-xl font-bold mb-2">{member.name}</h3>
                  <p className={`text-sm font-medium mb-4 ${member.iconColor}`}>
                    {member.position}
                  </p>

                  <div className="mb-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Award className={`w-4 h-4 ${member.iconColor}`} />
                      <span className="text-sm font-medium">
                        {member.achievements}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Core Values Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <motion.div
            variants={fadeIn}
            initial="initial"
            whileInView="whileInView"
            className="text-center max-w-3xl mx-auto mb-12">
            <div className="flex items-center justify-center gap-2 mb-4">
              <BookOpen className="w-6 h-6 text-green-500" />
              <h2 className="text-3xl font-bold">Our Core Values</h2>
            </div>
            <p className="text-gray-600">
              These principles guide everything we do
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {coreValues.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-lg p-6 border border-gray-100 hover:border-green-200 
                         transition-all hover:-translate-y-1">
                <div className="w-12 h-12 bg-green-50 rounded-lg flex items-center justify-center mb-4">
                  <value.icon className="w-6 h-6 text-green-500" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

  
    </div>
  );
};

export default Team;
