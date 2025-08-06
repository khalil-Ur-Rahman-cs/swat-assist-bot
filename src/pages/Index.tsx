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
    <div className="min-h-screen bg-gradient-subtle">
      <UniversityHeader />
      
      <div className="container mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Chat Interface */}
          <div className="lg:col-span-2">
            <div className="mb-6">
              <h2 className="text-3xl font-bold text-foreground mb-2">
                How can I help you today?
              </h2>
              <p className="text-muted-foreground text-lg">
                Ask me anything about University of Swat - from admissions to campus life.
              </p>
            </div>
            <ChatInterface />
          </div>

          {/* Sidebar Information */}
          <div className="space-y-6">
            {/* Features */}
            <Card className="p-6 shadow-soft">
              <h3 className="text-xl font-semibold mb-4 text-foreground">Why Use Our Chatbot?</h3>
              <div className="space-y-4">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="bg-gradient-university p-2 rounded-lg text-white flex-shrink-0">
                      {feature.icon}
                    </div>
                    <div>
                      <h4 className="font-medium text-foreground">{feature.title}</h4>
                      <p className="text-sm text-muted-foreground">{feature.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Topics */}
            <Card className="p-6 shadow-soft">
              <h3 className="text-xl font-semibold mb-4 text-foreground">I can help with:</h3>
              <div className="space-y-3">
                {supportedTopics.map((topic, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${topic.color}`}>
                      {topic.icon}
                    </div>
                    <span className="font-medium text-foreground">{topic.name}</span>
                  </div>
                ))}
              </div>
            </Card>

            {/* Contact Information */}
            <Card className="p-6 shadow-soft">
              <h3 className="text-xl font-semibold mb-4 text-foreground">Need More Help?</h3>
              <div className="space-y-3 text-sm">
                <div>
                  <p className="font-medium text-foreground">Admissions Office</p>
                  <p className="text-muted-foreground">📞 0946-123456</p>
                  <p className="text-muted-foreground">📧 admissions@uswat.edu.pk</p>
                </div>
                <div>
                  <p className="font-medium text-foreground">Office Hours</p>
                  <p className="text-muted-foreground">Monday - Friday: 8:00 AM - 4:00 PM</p>
                  <p className="text-muted-foreground">Saturday: 8:00 AM - 12:00 PM</p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-university-blue text-white py-8 mt-12">
        <div className="container mx-auto px-4 text-center">
          <p className="text-white/80">
            © 2024 University of Swat. All rights reserved. | 
            <span className="ml-2">Powered by AI Assistant Technology</span>
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;