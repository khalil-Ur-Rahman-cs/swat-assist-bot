import React from 'react';
import { GraduationCap, MapPin, Phone, Mail } from 'lucide-react';
import universityLogo from '@/assets/university-logo.png';

const UniversityHeader: React.FC = () => {
  return (
    <div className="bg-gradient-university text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between flex-wrap gap-6">
          {/* Logo and Title */}
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
              <img 
                src={universityLogo} 
                alt="University of Swat Logo" 
                className="w-12 h-12 object-contain"
              />
            </div>
            <div>
              <h1 className="text-3xl font-bold tracking-tight">University of Swat</h1>
              <p className="text-white/80 text-lg">Excellence in Education Since 1990</p>
            </div>
          </div>

          {/* Contact Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-white/80" />
              <span>Swat, Khyber Pakhtunkhwa, Pakistan</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-white/80" />
              <span>+92-946-123456</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-white/80" />
              <span>info@uswat.edu.pk</span>
            </div>
            <div className="flex items-center gap-2">
              <GraduationCap className="w-4 h-4 text-white/80" />
              <span>Serving 5000+ Students</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UniversityHeader;