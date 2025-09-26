import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, User, Bot } from 'lucide-react';
import { useChatbot } from '../../contexts/ChatbotContext';
import Card from '../ui/Card';
import Button from '../ui/Button';
import Input from '../ui/Input';

const Chatbot: React.FC = () => {
  const { isOpen, messages, isTyping, openChat, closeChat, sendMessage } = useChatbot();
  const [inputText, setInputText] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = () => {
    if (inputText.trim()) {
      sendMessage(inputText.trim());
      setInputText('');
    }
  };

  const handleQuickReply = (text: string) => {
    sendMessage(text);
  };

  if (!isOpen) {
    return (
      <Button
        variant="primary"
        size="lg"
        className="fixed bottom-6 right-6 rounded-full shadow-xl hover:shadow-2xl z-50 w-16 h-16 p-0 transition-all duration-300 hover:scale-110"
        onClick={openChat}
        icon={<MessageCircle className="h-6 w-6" />}
      >
        <span className="sr-only">Abrir chat</span>
      </Button>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 w-96 h-[500px] z-50 animate-slide-in-right">
      <Card className="h-full flex flex-col shadow-2xl border-0 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-4 bg-gradient-to-r from-indigo-500 to-purple-600 text-white">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
              <Bot className="h-4 w-4 text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-sm text-white">Asistente CachMarket</h3>
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <p className="text-xs text-white/80">En línea</p>
              </div>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="text-white hover:bg-white/20 transition-colors"
            onClick={closeChat}
            icon={<X className="h-4 w-4" />}
          >
            <span className="sr-only">Cerrar chat</span>
          </Button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50 dark:bg-gray-900/50">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.isBot ? 'justify-start' : 'justify-end'} animate-fade-in`}
            >
              <div className={`flex items-start gap-2 max-w-[85%] ${message.isBot ? '' : 'flex-row-reverse'}`}>
                {/* Avatar */}
                {message.isBot && (
                  <div className="w-8 h-8 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <Bot className="h-4 w-4 text-white" />
                  </div>
                )}
                
                <div
                  className={`px-4 py-3 rounded-2xl shadow-sm ${
                    message.isBot
                      ? 'bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-tl-sm'
                      : 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-tr-sm'
                  }`}
                >
                  <p className="text-sm leading-relaxed">{message.text}</p>
                  
                  {/* Quick Replies */}
                  {message.quickReplies && (
                    <div className="mt-3 flex flex-wrap gap-2">
                      {message.quickReplies.map((reply, index) => (
                        <Button
                          key={index}
                          variant="ghost"
                          size="sm"
                          className="text-xs px-3 py-1.5 h-auto bg-indigo-50 hover:bg-indigo-100 dark:bg-indigo-900/30 dark:hover:bg-indigo-900/50 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-700 rounded-full transition-all duration-200 hover:scale-105"
                          onClick={() => handleQuickReply(reply)}
                        >
                          {reply}
                        </Button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}

          {/* Typing Indicator */}
          {isTyping && (
            <div className="flex justify-start animate-fade-in">
              <div className="flex items-start gap-2">
                <div className="w-8 h-8 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
                  <Bot className="h-4 w-4 text-white" />
                </div>
                <div className="bg-white dark:bg-gray-800 px-4 py-3 rounded-2xl rounded-tl-sm shadow-sm">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                    <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                    <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="p-4 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
          <div className="flex gap-3">
            <Input
              placeholder="Escribe tu mensaje..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              className="flex-1 rounded-full border-gray-300 dark:border-gray-600 focus:border-indigo-500 focus:ring-indigo-500"
            />
            <Button
              variant="primary"
              size="md"
              className="rounded-full w-10 h-10 p-0 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 shadow-lg hover:shadow-xl transition-all duration-200"
              onClick={handleSend}
              disabled={!inputText.trim()}
              icon={<Send className="h-4 w-4" />}
            >
              <span className="sr-only">Enviar</span>
            </Button>
          </div>
          
          {/* Powered by */}
          <div className="mt-2 text-center">
            <p className="text-xs text-gray-400 dark:text-gray-500">
              Powered by CachMarket AI
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Chatbot;