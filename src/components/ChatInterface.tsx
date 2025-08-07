import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { MessageCircle, Send } from 'lucide-react';

interface Message {
  id: number;
  text: string;
  isBot: boolean;
  timestamp: Date;
}

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

  // Call backend API to generate response from Groq
  const generateResponse = async (userMessage: string): Promise<string> => {
    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMessage })
      });
      if (response.ok && response.body) {
        // Stream response
        const reader = response.body.getReader();
        let result = '';
        let done = false;
        while (!done) {
          const { value, done: doneReading } = await reader.read();
          done = doneReading;
          if (value) {
            result += new TextDecoder().decode(value);
          }
        }
        return result.trim();
      } else if (response.ok) {
        // fallback to JSON
        const data = await response.json();
        return data.reply || 'No response.';
      } else {
        return 'Sorry, there was an error contacting the assistant.';
      }
    } catch (err) {
      return 'Sorry, there was a network error.';
    }
  };

  const handleSendMessage = async () => {
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

    // Call backend for Groq response
    const replyText = await generateResponse(inputText);
    const botResponse: Message = {
      id: messages.length + 2,
      text: replyText,
      isBot: true,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, botResponse]);
    setIsTyping(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="flex flex-col w-full max-w-none h-[750px] bg-[#23382d] bg-gradient-to-r from-[#23382d] via-[#6b2323] to-[#23382d] rounded-lg shadow-elegant border border-[#6b2323] overflow-hidden text-base">
      {/* Chat Header */}
      <div className="flex items-center justify-between p-4" style={{ background: 'linear-gradient(90deg, #23382d 0%, #6b2323 50%, #23382d 100%)' }}>
        <div className="flex items-center gap-3">
          <div className="bg-white/20 p-2 rounded-full">
            <MessageCircle className="w-7 h-7 text-white" />
          </div>
          <div className="text-center">
            <h3 className="text-white font-bold text-lg">University Assistant</h3>
            <p className="text-white/80 text-base">University of Swat – FAQ Chatbot</p>
          </div>
        </div>
        <button
          className="ml-auto px-4 py-1.5 rounded bg-[#6b2323] text-[#e0d7c6] hover:bg-[#8a2c2c] transition-colors text-base font-semibold"
          onClick={() => {
            setMessages([
              {
                id: 1,
                text: "Hello! I'm your University Assistant Chatbot. I can help you with admissions, scholarships, rules, departments, and university events. How can I assist you today?",
                isBot: true,
                timestamp: new Date()
              }
            ]);
          }}
          title="Clear Chat"
        >
          Clear Chat
        </button>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-transparent flex flex-col justify-center">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.isBot ? 'justify-start' : 'justify-end'} w-full`}
          >
            <div
              className={`max-w-[90%] p-4 rounded-xl ${
                message.isBot
                  ? 'bg-[#e0d7c6] text-[#23382d]'
                  : 'bg-[#6b2323] text-[#e0d7c6]'
              } text-lg`}
            >
              <div className="whitespace-pre-wrap leading-relaxed text-lg">

                {message.text}
              </div>
              <div className={`text-xs mt-2 opacity-70 text-right`}>
                {message.timestamp.toLocaleTimeString([], { 
                  hour: '2-digit', 
                  minute: '2-digit' 
                })}
              </div>
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="flex justify-center">
            <div className="bg-secondary p-4 rounded-xl">
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
      <div className="p-4 border-t bg-[#23382d]">
        <div className="flex gap-2">
          <Input
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask me about admissions, scholarships, departments..."
            className="flex-1 text-lg px-4 py-2"
            disabled={isTyping}
          />
          <Button
            onClick={handleSendMessage}
            disabled={!inputText.trim() || isTyping}
            size="icon"
            variant="default"
            className="text-lg px-4 py-2"
          >
            <Send className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;