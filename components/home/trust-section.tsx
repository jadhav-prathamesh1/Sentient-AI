"use client";
import { Card, CardContent } from "@/components/ui/card";
import { Star, Quote } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";


const testimonials = [
  {
    name: "Dr. Priya Sharma",
    role: "Principal, Delhi Public School",
    content: "Sentient AI has transformed how our students learn. The personalized approach has improved engagement by 90% and learning outcomes significantly.",
    rating: 5,
    image: "https://images.pexels.com/photos/5212345/pexels-photo-5212345.jpeg?auto=compress&cs=tinysrgb&w=150",
  },
  {
    name: "Rajesh Kumar",
    role: "Parent, Mumbai",
    content: "My daughter now loves studying! The AI buddy makes learning so engaging and fun. Her grades have improved remarkably in just 3 months.",
    rating: 5,
    image: "https://images.pexels.com/photos/5384445/pexels-photo-5384445.jpeg?auto=compress&cs=tinysrgb&w=150",
  },
  {
    name: "Ms. Lakshmi Iyer",
    role: "Grade 3 Teacher, Chennai",
    content: "The platform provides incredible insights into each student's progress. I can now provide targeted support exactly where each child needs it most.",
    rating: 5,
    image: "https://images.pexels.com/photos/5212317/pexels-photo-5212317.jpeg?auto=compress&cs=tinysrgb&w=150",
  },
];

const partnerships = [
  { name: "NCERT", logo: "🎓" },
  { name: "EdTech India", logo: "🚀" },
  { name: "Indian Education Board", logo: "📚" },
  { name: "AI Research Institute", logo: "🤖" },
];

export function TrustSection() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Testimonials */}
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
            Trusted by{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-green-600">
              Educators & Parents
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            See how Sentient AI is making a real difference in classrooms and homes across India.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="hover:shadow-xl transition-all duration-300 border-0 shadow-lg">
              <CardContent className="p-6 space-y-4">
                <div className="flex items-center space-x-1">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                
                <div className="relative">
                  <Quote className="h-8 w-8 text-blue-100 absolute -top-2 -left-2" />
                  <p className="text-gray-700 italic leading-relaxed pl-6">
                    "{testimonial.content}"
                  </p>
                </div>

                <div className="flex items-center space-x-3 pt-4 border-t border-gray-100">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                    <p className="text-sm text-gray-600">{testimonial.role}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Educational Partnerships */}
        <div className="text-center space-y-8">
          <h3 className="text-2xl font-bold text-gray-900">
            Proud Partners in Education
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center">
            {partnerships.map((partner, index) => (
              <div key={index} className="flex flex-col items-center space-y-2 p-4 rounded-lg hover:bg-gray-50 transition-colors">
                <div className="text-3xl">{partner.logo}</div>
                <span className="text-sm font-medium text-gray-700">{partner.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-20 bg-gradient-to-r from-blue-600 to-green-600 rounded-2xl p-8 lg:p-12 text-center text-white">
          <h3 className="text-2xl sm:text-3xl font-bold mb-4">
            Ready to Transform Your Classroom?
          </h3>
          <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
            Join thousands of educators and parents who are already seeing amazing results with Sentient AI.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" variant="secondary" className="bg-white text-blue-600 hover:bg-gray-100">
              <Link href="/contact">Get Started Free</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="bg-white text-blue-600 hover:bg-gray-100">
              <Link href="/blog">Learn More</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}