import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MessageCircle, Send, BookOpen, Users, Award, Calendar, FileText } from 'lucide-react';

interface Message {
  id: number;
  text: string;
  isBot: boolean;
  timestamp: Date;
}

interface FAQCategory {
  id: string;
  name: string;
  icon: React.ReactNode;
  keywords: string[];
  responses: string[];
}

const faqCategories: FAQCategory[] = [
  {
    id: 'admissions',
    name: 'Admissions',
    icon: <BookOpen className="w-4 h-4" />,
    keywords: ['admission', 'apply', 'application', 'eligibility', 'merit', 'fee', 'deadline', 'documents'],
    responses: [
      "📚 **Admissions Information**\n\n• **Application Period**: February - June annually\n• **Eligibility**: Minimum 60% in intermediate/equivalent\n• **Required Documents**: Transcripts, CNIC copy, photos\n• **Merit Lists**: Published monthly during admission period\n• **Fee Structure**: Available on university website\n\nNeed specific details? Please visit the admissions office or call 0946-123456."
    ]
  },
  {
    id: 'departments',
    name: 'Departments',
    icon: <Users className="w-4 h-4" />,
    keywords: ['department', 'faculty', 'program', 'degree', 'course', 'subject', 'major'],
    responses: [
      "🏛️ **Academic Departments**\n\n• **Computer Science** - BS, MS programs\n• **Business Administration** - BBA, MBA\n• **English Literature** - BA, MA\n• **Mathematics** - BS, MS\n• **Physics** - BS, MS\n• **Chemistry** - BS, MS\n\nEach program is 4 years (BS) or 2 years (MS/MA). For detailed curriculum, contact respective department offices."
    ]
  },
  {
    id: 'scholarships',
    name: 'Scholarships',
    icon: <Award className="w-4 h-4" />,
    keywords: ['scholarship', 'financial aid', 'grant', 'funding', 'assistance', 'merit based'],
    responses: [
      "🏆 **Scholarship Opportunities**\n\n• **Merit Scholarships**: Top 10% students get 50% fee waiver\n• **Need-Based Aid**: For students with family income <30,000/month\n• **Sports Scholarships**: For national/provincial level athletes\n• **Minority Scholarships**: Special quotas available\n\n**Application**: Submit before semester start with required documents. Contact Financial Aid office for details."
    ]
  },
  {
    id: 'rules',
    name: 'University Rules',
    icon: <FileText className="w-4 h-4" />,
    keywords: ['rules', 'policy', 'attendance', 'exam', 'grade', 'semester', 'credit hours', 'regulations'],
    responses: [
      "📋 **University Policies**\n\n• **Attendance**: Minimum 75% required per subject\n• **Grading**: A+ (90-100), A (85-89), B+ (80-84), etc.\n• **Credit Hours**: Minimum 130 for graduation\n• **Examination**: Mid-term (30%) + Final (70%)\n• **Semester Duration**: 18 weeks including exams\n\nFull academic regulations available in student handbook."
    ]
  },
  {
    id: 'events',
    name: 'Events & Activities',
    icon: <Calendar className="w-4 h-4" />,
    keywords: ['event', 'activity', 'sports', 'cultural', 'seminar', 'convocation', 'calendar', 'club'],
    responses: [
      "🎉 **Campus Events & Activities**\n\n• **Annual Sports Week**: March (Cricket, Football, Athletics)\n• **Cultural Festival**: November (Music, Drama, Art)\n• **Academic Seminars**: Monthly departmental sessions\n• **Convocation**: December for graduating students\n• **Student Clubs**: Debate, Photography, IT, Drama\n\nCheck university notice board and website for upcoming events!"
    ]
  }
];

const ChatInterface: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hello! I'm your University Assistant Chatbot. I can help you with admissions, scholarships, rules, departments, and university events. How can I assist you today?",
      isBot: true,
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const generateResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();
    
    // Find matching category based on keywords
    for (const category of faqCategories) {
      if (category.keywords.some(keyword => lowerMessage.includes(keyword))) {
        return category.responses[0];
      }
    }

    // Greeting responses
    if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('hey')) {
      return "Hello! I'm here to help you with University of Swat information. You can ask me about:\n\n📚 Admissions & Applications\n🏛️ Departments & Programs\n🏆 Scholarships & Financial Aid\n📋 University Rules & Policies\n🎉 Events & Activities\n\nWhat would you like to know?";
    }

    // Thank you responses
    if (lowerMessage.includes('thank') || lowerMessage.includes('thanks')) {
      return "You're welcome! Feel free to ask if you need any other information about University of Swat. I'm here to help! 😊";
    }

    // Fallback response
    return "I'm sorry, I don't have the exact information on that. Please contact the university help desk for further assistance.\n\n📞 **Contact Information:**\n• Phone: 0946-123456\n• Email: info@uswat.edu.pk\n• Office Hours: 8:00 AM - 4:00 PM (Mon-Fri)\n\nYou can also try asking about admissions, departments, scholarships, university rules, or campus events.";
  };

  const handleSendMessage = () => {
    if (!inputText.trim()) return;

    const userMessage: Message = {
      id: messages.length + 1,
      text: inputText,
      isBot: false,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsTyping(true);

    // Simulate typing delay
    setTimeout(() => {
      const botResponse: Message = {
        id: messages.length + 2,
        text: generateResponse(inputText),
        isBot: true,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1000);
  };

  const handleQuickAction = (category: FAQCategory) => {
    const userMessage: Message = {
      id: messages.length + 1,
      text: `Tell me about ${category.name}`,
      isBot: false,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setIsTyping(true);

    setTimeout(() => {
      const botResponse: Message = {
        id: messages.length + 2,
        text: category.responses[0],
        isBot: true,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 800);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="flex flex-col h-[600px] bg-card rounded-lg shadow-elegant border overflow-hidden">
      {/* Chat Header */}
      <div className="bg-gradient-university p-4 flex items-center gap-3">
        <div className="bg-white/20 p-2 rounded-full">
          <MessageCircle className="w-6 h-6 text-white" />
        </div>
        <div>
          <h3 className="text-white font-semibold">University Assistant</h3>
          <p className="text-white/80 text-sm">University of Swat - FAQ Chatbot</p>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="p-4 border-b bg-gradient-subtle">
        <p className="text-sm text-muted-foreground mb-2">Quick topics:</p>
        <div className="flex flex-wrap gap-2">
          {faqCategories.map((category) => (
            <Badge
              key={category.id}
              variant="outline"
              className="cursor-pointer hover:bg-primary/10 transition-colors"
              onClick={() => handleQuickAction(category)}
            >
              {category.icon}
              {category.name}
            </Badge>
          ))}
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}
          >
            <div
              className={`max-w-[80%] p-3 rounded-lg ${
                message.isBot
                  ? 'bg-secondary text-secondary-foreground'
                  : 'bg-gradient-university text-primary-foreground'
              }`}
            >
              <div className="whitespace-pre-wrap text-sm leading-relaxed">
                {message.text}
              </div>
              <div className={`text-xs mt-1 opacity-70`}>
                {message.timestamp.toLocaleTimeString([], { 
                  hour: '2-digit', 
                  minute: '2-digit' 
                })}
              </div>
            </div>
          </div>
        ))}
        
        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-secondary p-3 rounded-lg">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-4 border-t bg-card">
        <div className="flex gap-2">
          <Input
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask me about admissions, scholarships, departments..."
            className="flex-1"
            disabled={isTyping}
          />
          <Button
            onClick={handleSendMessage}
            disabled={!inputText.trim() || isTyping}
            size="icon"
            variant="default"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;