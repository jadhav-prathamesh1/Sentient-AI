"use client";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Send } from "lucide-react";

export function ContactForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState("");
  const formRef = useRef<HTMLFormElement>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    organization: "",
    organizationType: "",
    message: "",
  });
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setResult("Sending...");
    setIsLoading(true);

    try {
      const formData = new FormData(e.target as HTMLFormElement);
      formData.append("access_key", process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY || "e1d07b6f-e527-402b-b47f-df49c93eb618");

      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData
      });

      const data = await response.json();

      if (data.success) {
        setResult("Message sent successfully!");
        toast({
          title: "Message sent!",
          description: "We'll get back to you within 24 hours.",
        });
        
        if (formRef.current) {
          formRef.current.reset();
        }
        
        setFormData({
          name: "",
          email: "",
          organization: "",
          organizationType: "",
          message: "",
        });
      } else {
        console.log("Error", data);
        setResult(data.message || "Failed to send message");
        toast({
          title: "Error",
          description: data.message || "Failed to send message. Please try again.",
          variant: "destructive",
        });
      }
    } catch (error) {
      setResult("Failed to send message");
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8">
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Send us a message</h2>
          <p className="text-gray-600 mt-2">
            Fill out the form below and we'll get back to you within 24 hours.
          </p>
        </div>

        <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name *</Label>
              <Input
                id="name"
                name="name"
                type="text"
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                placeholder="Your full name"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email Address *</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                placeholder="your.email@example.com"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="organization">Organization</Label>
            <Input
              id="organization"
              name="organization"
              type="text"
              value={formData.organization}
              onChange={(e) => handleInputChange("organization", e.target.value)}
              placeholder="School or organization name"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="organizationType">Organization Type</Label>
            <Select 
              name="organizationType"
              value={formData.organizationType} 
              onValueChange={(value) => handleInputChange("organizationType", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select organization type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="school">Primary School</SelectItem>
                <SelectItem value="district">School District</SelectItem>
                <SelectItem value="parent">Parent/Guardian</SelectItem>
                <SelectItem value="teacher">Individual Teacher</SelectItem>
                <SelectItem value="ngo">Educational NGO</SelectItem>
                <SelectItem value="government">Government Organization</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="message">Message *</Label>
            <Textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={(e) => handleInputChange("message", e.target.value)}
              placeholder="Tell us about your needs, questions, or how we can help..."
              className="min-h-[120px]"
              required
            />
          </div>

          <Button 
            type="submit" 
            disabled={isLoading} 
            className="w-full bg-blue-600 hover:bg-blue-700"
            size="lg"
          >
            {isLoading ? (
              <Loader2 className="h-4 w-4 animate-spin mr-2" />
            ) : (
              <Send className="h-4 w-4 mr-2" />
            )}
            {isLoading ? "Sending..." : "Send Message"}
          </Button>

          {result && (
            <div className={`text-center text-sm ${
              result.includes("successfully") ? "text-green-600" : "text-red-600"
            }`}>
              {result}
            </div>
          )}

          <p className="text-sm text-gray-500 text-center">
            By submitting this form, you agree to our{" "}
            <a href="/privacy" className="text-blue-600 hover:underline">
              Privacy Policy
            </a>
            .
          </p>
        </form>
      </div>
    </div>
  );
}