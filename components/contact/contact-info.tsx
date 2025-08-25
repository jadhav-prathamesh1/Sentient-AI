import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, Phone, MapPin, Clock, Users, Headphones } from "lucide-react";

const contactMethods = [
  {
    icon: Mail,
    title: "Email Us",
    content: "hello@sentientai.com",
    description: "Send us an email anytime",
    color: "text-blue-600",
    bg: "bg-blue-100",
  },
  {
    icon: Phone,
    title: "Call Us",
    content: "+91 98765 43210",
    description: "Mon-Fri 9AM-6PM IST",
    color: "text-green-600",
    bg: "bg-green-100",
  },
  {
    icon: MapPin,
    title: "Visit Us",
    content: "Bangalore, Karnataka",
    description: "Schedule a meeting",
    color: "text-purple-600",
    bg: "bg-purple-100",
  },
];

const supportOptions = [
  {
    icon: Users,
    title: "For Schools & Districts",
    description: "Bulk implementation support, training, and ongoing assistance for educational institutions.",
  },
  {
    icon: Headphones,
    title: "For Parents & Teachers",
    description: "Individual support, tutorials, and guidance for getting the most out of our platform.",
  },
  {
    icon: Clock,
    title: "Quick Response",
    description: "We typically respond to all inquiries within 24 hours during business days.",
  },
];

export function ContactInfo() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Get in Touch</h2>
        <p className="text-gray-600 leading-relaxed">
          Whether you're a school looking to transform your curriculum, a parent seeking better 
          learning solutions, or an educator interested in AI-powered tools, we're here to help.
        </p>
      </div>

      {/* Contact Methods */}
      <div className="grid grid-cols-1 gap-6">
        {contactMethods.map((method, index) => (
          <Card key={index} className="hover:shadow-lg transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-start space-x-4">
                <div className={`w-12 h-12 ${method.bg} rounded-lg flex items-center justify-center`}>
                  <method.icon className={`h-6 w-6 ${method.color}`} />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">{method.title}</h3>
                  <p className={`font-medium ${method.color} mb-1`}>{method.content}</p>
                  <p className="text-sm text-gray-600">{method.description}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Support Information */}
      <div className="space-y-6">
        <h3 className="text-xl font-semibold text-gray-900">How We Can Help</h3>
        {supportOptions.map((option, index) => (
          <div key={index} className="flex items-start space-x-4">
            <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
              <option.icon className="h-5 w-5 text-gray-600" />
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-1">{option.title}</h4>
              <p className="text-gray-600 text-sm leading-relaxed">{option.description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Office Hours */}
      <Card className="bg-gradient-to-r from-blue-50 to-green-50">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Clock className="h-5 w-5 text-blue-600" />
            <span>Office Hours</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="flex justify-between">
            <span className="text-gray-600">Monday - Friday</span>
            <span className="font-medium">9:00 AM - 6:00 PM IST</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Saturday</span>
            <span className="font-medium">10:00 AM - 2:00 PM IST</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Sunday</span>
            <span className="font-medium">Closed</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}