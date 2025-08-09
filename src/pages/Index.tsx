import React from 'react';
import UniversityHeader from '@/components/UniversityHeader';
import ChatInterface from '@/components/ChatInterface';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { BookOpen, Users, Award, Calendar, FileText, Clock, Shield, Globe } from 'lucide-react';

const Index = () => {
  const features = [
    {
      icon: <Clock className="w-5 h-5" />,
      title: "24/7 Available",
      description: "Get instant answers anytime"
    },
    {
      icon: <Shield className="w-5 h-5" />,
      title: "Accurate Information",
      description: "Official university policies & data"
    },
    {
      icon: <Globe className="w-5 h-5" />,
      title: "Easy Access",
      description: "No login required, instant help"
    }
  ];

  const supportedTopics = [
    { icon: <BookOpen className="w-4 h-4" />, name: "Admissions", color: "bg-blue-100 text-blue-700" },
    { icon: <Users className="w-4 h-4" />, name: "Departments", color: "bg-green-100 text-green-700" },
    { icon: <Award className="w-4 h-4" />, name: "Scholarships", color: "bg-yellow-100 text-yellow-700" },
    { icon: <FileText className="w-4 h-4" />, name: "University Rules", color: "bg-purple-100 text-purple-700" },
    { icon: <Calendar className="w-4 h-4" />, name: "Events & Activities", color: "bg-red-100 text-red-700" }
  ];

  return (
    <div className="min-h-screen">
      <UniversityHeader />
      
      <div className="container mx-auto px-4 py-12 flex flex-col items-center justify-center min-h-[90vh]">
        <div className="w-full flex flex-col items-center justify-center">
          <div className="mb-8 text-center">
            <h2 className="text-4xl font-bold text-foreground text-white mb-3">How can I help you today?</h2>
            <p className="text-muted-foreground text-white text-xl">Ask me anything about University of Swat – from admissions to campus life.</p>
          </div>
          <div className="w-full mx-20">
            <ChatInterface />
          </div>
        </div>
      </div>

      {/* Footer with contact information */}
      <footer className="bg-[#23382d] bg-gradient-to-r from-[#23382d] via-[#6b2323] to-[#23382d] text-white py-8 mt-12 border-t-4 border-[#6b2323]">
        <div className="container mx-auto px-4 text-center space-y-4">
          <div className="flex flex-col md:flex-row md:justify-center md:gap-12 items-center space-y-2 md:space-y-0">
            <div>
              <p className="font-medium text-white">Admissions Office</p>
              <p className="text-white/80">📞 0946-730510</p>
              <p className="text-white/80">📧 admissions@uswat.edu.pk</p>
            </div>
            <div>
              <p className="font-medium text-white">Office Hours</p>
              <p className="text-white/80">Monday - Friday: 8:00 AM - 4:00 PM</p>
              <p className="text-white/80">Saturday: 8:00 AM - 12:00 PM</p>
            </div>
          </div>
          <p className="text-white/80 mt-4">
            © 2024 University of Swat. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;