import React from 'react';
import { GraduationCap, Info, HelpCircle } from 'lucide-react';
import { Popover, PopoverTrigger, PopoverContent } from './ui/popover';
import universityLogo from '@/assets/university-logo.png';


const UniversityHeader: React.FC = () => {
  return (
    <div className="bg-[#23382d] bg-gradient-to-r from-[#23382d] via-[#6b2323] to-[#23382d] text-white border-b-4 border-[#6b2323] shadow-lg">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between flex-wrap gap-6">
          {/* Logo and Title */}
          <div className="flex items-center gap-4">
            <div className="w-20 h-20 bg-[#23382d] border-4 border-[#6b2323] rounded-full flex items-center justify-center shadow-md">
              <img 
                src={universityLogo} 
                alt="University of Swat Logo" 
                className="w-16 h-16 object-contain rounded-full"
              />
            </div>
            <div>
              <h1 className="text-3xl font-extrabold tracking-tight text-[#f5f5f5] drop-shadow-md">UNIVERSITY OF SWAT</h1>
              <p className="text-[#e0d7c6] text-lg font-medium">Excellence in Education Since 2009</p>
            </div>
          </div>

          {/* Header Icons with Dropdowns */}
          <div className="flex items-center gap-4">
            {/* Why Use Our Chatbot Dropdown */}
            <Popover>
              <PopoverTrigger asChild>
                <button className="p-2 rounded-full bg-[#6b2323] hover:bg-[#8a2c2c] transition-colors" title="Why Use Our Chatbot?">
                  <Info className="w-6 h-6 text-[#e0d7c6]" />
                </button>
              </PopoverTrigger>
              <PopoverContent className="w-64 bg-white text-[#23382d] shadow-lg border border-[#6b2323]">
                <h3 className="text-lg font-semibold mb-2 text-[#6b2323]">Why Use Our Chatbot?</h3>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="inline-block p-1 bg-[#23382d]/10 rounded-full"><GraduationCap className="w-4 h-4 text-[#23382d]" /></span>
                    <span className="font-medium">24/7 Available</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="inline-block p-1 bg-[#23382d]/10 rounded-full"><Info className="w-4 h-4 text-[#23382d]" /></span>
                    <span className="font-medium">Accurate Information</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="inline-block p-1 bg-[#23382d]/10 rounded-full"><HelpCircle className="w-4 h-4 text-[#23382d]" /></span>
                    <span className="font-medium">Easy Access</span>
                  </li>
                </ul>
              </PopoverContent>
            </Popover>

            {/* I Can Help With Dropdown */}
            <Popover>
              <PopoverTrigger asChild>
                <button className="p-2 rounded-full bg-[#6b2323] hover:bg-[#8a2c2c] transition-colors" title="I can help with">
                  <HelpCircle className="w-6 h-6 text-[#e0d7c6]" />
                </button>
              </PopoverTrigger>
              <PopoverContent className="w-64 bg-white text-[#23382d] shadow-lg border border-[#6b2323]">
                <h3 className="text-lg font-semibold mb-2 text-[#6b2323]">I can help with:</h3>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2"><span className="inline-block p-1 bg-blue-100 rounded"><GraduationCap className="w-4 h-4 text-blue-700" /></span> <span>Admissions</span></li>
                  <li className="flex items-center gap-2"><span className="inline-block p-1 bg-green-100 rounded"><Info className="w-4 h-4 text-green-700" /></span> <span>Departments</span></li>
                  <li className="flex items-center gap-2"><span className="inline-block p-1 bg-yellow-100 rounded"><HelpCircle className="w-4 h-4 text-yellow-700" /></span> <span>Scholarships</span></li>
                  <li className="flex items-center gap-2"><span className="inline-block p-1 bg-purple-100 rounded"><Info className="w-4 h-4 text-purple-700" /></span> <span>University Rules</span></li>
                  <li className="flex items-center gap-2"><span className="inline-block p-1 bg-red-100 rounded"><HelpCircle className="w-4 h-4 text-red-700" /></span> <span>Events & Activities</span></li>
                </ul>
              </PopoverContent>
            </Popover>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UniversityHeader;