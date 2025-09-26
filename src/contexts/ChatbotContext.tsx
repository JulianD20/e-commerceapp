import React, { createContext, useContext, useState } from 'react';

interface Message {
  id: string;
  text: string;
  isBot: boolean;
  timestamp: Date;
  quickReplies?: string[];
}

interface ChatbotContextType {
  isOpen: boolean;
  messages: Message[];
  isTyping: boolean;
  openChat: () => void;
  closeChat: () => void;
  sendMessage: (text: string) => void;
}

const ChatbotContext = createContext<ChatbotContextType | undefined>(undefined);

export const useChatbot = () => {
  const context = useContext(ChatbotContext);
  if (!context) {
    throw new Error('useChatbot must be used within a ChatbotProvider');
  }
  return context;
};

export const ChatbotProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: '¡Hola! Soy tu asistente virtual. ¿En qué puedo ayudarte hoy?',
      isBot: true,
      timestamp: new Date(),
      quickReplies: [
        'Cómo afiliar mi tienda',
        '¿Qué plan me recomiendas?',
        'Estado de mi pedido',
        'Contactar soporte'
      ]
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);

  const openChat = () => setIsOpen(true);
  const closeChat = () => setIsOpen(false);

  const sendMessage = (text: string) => {
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      text,
      isBot: false,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setIsTyping(true);

    // Simulate bot response
    setTimeout(() => {
      const botResponse = getBotResponse(text);
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const getBotResponse = (userText: string): Message => {
    const lowerText = userText.toLowerCase();
    
    if (lowerText.includes('afiliar') || lowerText.includes('tienda')) {
      return {
        id: Date.now().toString(),
        text: 'Para afiliar tu tienda necesitas: 1) Registro como vendedor, 2) Documentos de empresa, 3) Seleccionar plan de suscripción. ¿Te ayudo con el proceso?',
        isBot: true,
        timestamp: new Date(),
        quickReplies: ['Quiero afiliarme', 'Ver planes', 'Más información']
      };
    }

    if (lowerText.includes('plan') || lowerText.includes('recomienda')) {
      return {
        id: Date.now().toString(),
        text: 'Te recomiendo un plan según tu negocio: Emprende ($29/mes) para empezar, Crece ($59/mes) para expansión, Pro ($99/mes) para profesionales, Elite ($199/mes) para alto volumen.',
        isBot: true,
        timestamp: new Date(),
        quickReplies: ['Ver planes', 'Comparar planes', 'Hablar con asesor']
      };
    }

    if (lowerText.includes('pedido') || lowerText.includes('orden')) {
      return {
        id: Date.now().toString(),
        text: 'Para consultar tu pedido necesito el número de orden. Si estás registrado, puedo verificar en tu historial.',
        isBot: true,
        timestamp: new Date(),
        quickReplies: ['Mi historial', 'Tengo número de orden', 'Problemas con pedido']
      };
    }

    return {
      id: Date.now().toString(),
      text: 'Entiendo que necesitas ayuda. ¿Prefieres que te conecte con un asesor humano o puedo intentar ayudarte con algo específico?',
      isBot: true,
      timestamp: new Date(),
      quickReplies: ['Hablar con asesor', 'Más opciones', 'FAQ']
    };
  };

  return (
    <ChatbotContext.Provider value={{
      isOpen,
      messages,
      isTyping,
      openChat,
      closeChat,
      sendMessage
    }}>
      {children}
    </ChatbotContext.Provider>
  );
};