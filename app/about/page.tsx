import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Target, Eye, Heart, Award, Globe } from "lucide-react";
import { Button } from "@/components/ui/button"; 

const team = [
  {
    name: "Arjun Patel",
    role: "CEO & Co-Founder",
    bio: "Former Google AI researcher with 10+ years in EdTech. Passionate about democratizing education through technology.",
    image: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=300",
  },
  {
    name: "Priya Singh",
    role: "CTO & Co-Founder",
    bio: "AI/ML expert from IIT Delhi. Previously led engineering teams at Microsoft and Amazon, specializing in educational AI.",
    image: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=300",
  },
  {
    name: "Dr. Ravi Kumar",
    role: "Head of Education",
    bio: "Former NCERT curriculum designer with 20+ years in primary education. Ensures our content aligns with pedagogical best practices.",
    image: "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=300",
  },
  {
    name: "Anita Sharma",
    role: "Head of Product",
    bio: "UX/Product expert focused on creating intuitive learning experiences. Previously at Flipkart and Paytm.",
    image: "https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=300",
  },
];

const values = [
  {
    icon: Target,
    title: "Innovation",
    description: "We constantly push the boundaries of what's possible in educational technology, bringing cutting-edge AI solutions to Indian classrooms.",
  },
  {
    icon: Heart,
    title: "Inclusivity",
    description: "Every child deserves quality education. We design our solutions to be accessible across different socioeconomic backgrounds and learning abilities.",
  },
  {
    icon: Award,
    title: "Excellence",
    description: "We maintain the highest standards in everything we do, from product development to customer support and educational outcomes.",
  },
  {
    icon: Globe,
    title: "Impact",
    description: "Our success is measured by the positive impact we create in students' lives and the transformation we bring to Indian education.",
  },
];

export default function About() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-blue-50 via-white to-green-50 py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center space-y-8">
              <h1 className="text-4xl sm:text-5xl font-bold text-gray-900">
                About{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-green-600">
                  Sentient AI
                </span>
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                We are a passionate team of educators, technologists, and innovators on a mission to 
                revolutionize primary education in India through AI-powered personalized learning.
              </p>
            </div>
          </div>
        </section>

        {/* Mission, Vision, Values */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-20">
              <div className="text-center space-y-4">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
                  <Target className="h-8 w-8 text-blue-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">Mission</h2>
                <p className="text-gray-600 leading-relaxed">
                  To democratize quality education by making AI-powered personalized learning 
                  accessible to every Indian child, regardless of their background or location.
                </p>
              </div>

              <div className="text-center space-y-4">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                  <Eye className="h-8 w-8 text-green-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">Vision</h2>
                <p className="text-gray-600 leading-relaxed">
                  A future where AI-powered education creates equal opportunities for all students 
                  across India, bridging gaps and unlocking every child's potential.
                </p>
              </div>

              <div className="text-center space-y-4">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto">
                  <Heart className="h-8 w-8 text-purple-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">Purpose</h2>
                <p className="text-gray-600 leading-relaxed">
                  To empower teachers, engage students, and support parents in creating 
                  meaningful educational experiences that last a lifetime.
                </p>
              </div>
            </div>

            {/* Our Story */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <h2 className="text-3xl font-bold text-gray-900">Our Story</h2>
                <div className="space-y-4 text-gray-600 leading-relaxed">
                  <p>
                    Sentient AI was born from a simple observation: every child learns differently, 
                    yet our education system treats them all the same. Founded in 2025 by a team 
                    of AI researchers and education experts, we set out to change this.
                  </p>
                  <p>
                    Having witnessed the challenges in Indian primary education firsthand - from 
                    overcrowded classrooms to resource constraints - we realized that AI could be 
                    the great equalizer. Our platform doesn't replace teachers; it empowers them 
                    with tools to provide personalized attention to every student.
                  </p>
                  <p>
                    Today, we're proud to serve over 500 schools across India, reaching more than 
                    10,000 students and helping them achieve learning outcomes that were previously 
                    thought impossible.
                  </p>
                </div>
              </div>
              <div className="relative">
                <img
                  src="https://images.pexels.com/photos/8364026/pexels-photo-8364026.jpeg?auto=compress&cs=tinysrgb&w=800"
                  alt="Our team working on AI education solutions"
                  className="w-full h-auto rounded-2xl shadow-xl"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center space-y-4 mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">Our Values</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                These core values guide everything we do and every decision we make.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value, index) => (
                <Card key={index} className="text-center hover:shadow-lg transition-all duration-300">
                  <CardHeader className="space-y-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto">
                      <value.icon className="h-6 w-6 text-blue-600" />
                    </div>
                    <CardTitle className="text-xl font-semibold">
                      {value.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 leading-relaxed">
                      {value.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Team */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center space-y-4 mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">Meet Our Team</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                A diverse group of experts passionate about transforming education through technology.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {team.map((member, index) => (
                <Card key={index} className="text-center hover:shadow-lg transition-all duration-300">
                  <CardHeader className="space-y-4">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-24 h-24 rounded-full mx-auto object-cover"
                    />
                    <div>
                      <CardTitle className="text-xl font-semibold">
                        {member.name}
                      </CardTitle>
                      <p className="text-blue-600 font-medium">{member.role}</p>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {member.bio}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-blue-600 to-green-600">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="space-y-8 text-white">
              <h2 className="text-3xl sm:text-4xl font-bold">
                Join Us in Transforming Education
              </h2>
              <p className="text-xl opacity-90 max-w-2xl mx-auto">
                Whether you're an educator, parent, or student, we invite you to be part 
                of the AI education revolution.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg" variant="secondary" className="bg-white text-blue-600 hover:bg-gray-100">
                  <a href="/contact">Get Started</a>
                </Button>
                <Button asChild size="lg" variant="outline" className="border-white text-blue-600 hover:bg-gray-100">
                  <a href="/blog">Learn More</a>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}