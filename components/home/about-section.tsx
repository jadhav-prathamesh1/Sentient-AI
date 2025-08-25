import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight, Target, Eye, Heart } from "lucide-react";

export function AboutSection() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Image */}
          <div className="relative">
            <img
              src="https://images.pexels.com/photos/8364026/pexels-photo-8364026.jpeg?auto=compress&cs=tinysrgb&w=800"
              alt="Team working on AI education solutions"
              className="w-full h-auto rounded-2xl shadow-xl"
            />
            <div className="absolute -bottom-6 -right-6 bg-white p-6 rounded-xl shadow-lg">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">2025</div>
                <div className="text-sm text-gray-600">Founded</div>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
                Transforming Education Through{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-green-600">
                  Innovation
                </span>
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                At Sentient AI, we believe every child deserves access to personalized, engaging education. 
                Our mission is to bridge the learning gap in Indian primary schools using cutting-edge AI 
                technology that adapts to each student's unique needs.
              </p>
            </div>

            {/* Values */}
            <div className="space-y-4">
              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Target className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Mission</h3>
                  <p className="text-gray-600">To democratize quality education by making AI-powered personalized learning accessible to every Indian child.</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Eye className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Vision</h3>
                  <p className="text-gray-600">A future where AI-powered education creates equal opportunities for all students across India.</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Heart className="h-5 w-5 text-purple-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Values</h3>
                  <p className="text-gray-600">Innovation, inclusivity, and impact-driven solutions that prioritize student success and teacher empowerment.</p>
                </div>
              </div>
            </div>

            <Button asChild size="lg" className="bg-blue-600 hover:bg-blue-700">
              <Link href="/about" className="flex items-center">
                Learn More About Us
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}