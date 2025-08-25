import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Bot, Users, BookOpen, BarChart3, Gamepad2, Shield } from "lucide-react";

const features = [
  {
    icon: Bot,
    title: "AI-Powered Learning Buddy",
    description: "Personalized AI companions that adapt to each child's learning style and pace, making education engaging and effective.",
    color: "text-blue-600",
  },
  {
    icon: Users,
    title: "Curriculum Alignment",
    description: "Content perfectly aligned with NCERT and state board curricula, ensuring comprehensive coverage of learning objectives.",
    color: "text-green-600",
  },
  {
    icon: BookOpen,
    title: "Interactive Learning Modules",
    description: "Engaging multimedia content with games, animations, and interactive exercises that make learning fun and memorable.",
    color: "text-purple-600",
  },
  {
    icon: BarChart3,
    title: "Progress Tracking",
    description: "Real-time insights for parents and teachers to monitor student progress and identify areas for improvement.",
    color: "text-orange-600",
  },
  {
    icon: Gamepad2,
    title: "Gamified Experience",
    description: "Achievement badges, leaderboards, and rewards that motivate students to continue learning and exploring.",
    color: "text-pink-600",
  },
  {
    icon: Shield,
    title: "Safe & Secure",
    description: "Child-safe platform with robust privacy protection and parental controls for a secure learning environment.",
    color: "text-indigo-600",
  },
];

export function FeaturesSection() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
            Powerful Features for{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-green-600">
              Every Child
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our comprehensive platform combines cutting-edge AI technology with pedagogical expertise 
            to create the perfect learning environment for Indian primary school students.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="group hover:shadow-lg transition-all duration-300 border-0 shadow-md">
              <CardHeader className="space-y-4">
                <div className={`w-12 h-12 rounded-lg bg-gray-50 flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className={`h-6 w-6 ${feature.color}`} />
                </div>
                <CardTitle className="text-xl font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                  {feature.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Feature highlight */}
        <div className="mt-20 bg-gradient-to-r from-blue-50 to-green-50 rounded-2xl p-8 lg:p-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div className="space-y-6">
              <h3 className="text-2xl sm:text-3xl font-bold text-gray-900">
                Built for Indian Classrooms
              </h3>
              <p className="text-lg text-gray-600">
                Our platform understands the unique challenges and opportunities in Indian primary education. 
                From multilingual support to culturally relevant content, we've designed every feature with 
                Indian students and educators in mind.
              </p>
              <ul className="space-y-2">
                <li className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-gray-700">Support for regional languages</span>
                </li>
                <li className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-gray-700">Culturally relevant examples and content</span>
                </li>
                <li className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-gray-700">Offline capability for low connectivity areas</span>
                </li>
                <li className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-gray-700">Affordable pricing for all schools</span>
                </li>
              </ul>
            </div>
            <div className="relative">
              <img
                src="https://images.pexels.com/photos/8471831/pexels-photo-8471831.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Indian classroom with diverse students"
                className="w-full h-auto rounded-xl shadow-lg"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}