
import { useState, useEffect, useRef } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'sonner';
import { Send, Paperclip, X, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { automationService } from '@/services/supabase';
import { useRealTimeManager } from '@/hooks/useRealTimeManager';
import { cn } from '@/lib/utils';

interface Message {
  id: string;
  content: string;
  user_id: string;
  created_at: string;
  attachments?: { url: string; name: string }[];
}

interface SupportTicket {
  id: string;
  status: 'open' | 'closed' | 'pending';
  messages?: Message[];
}

interface SupportChatProps {
  automationId: string;
  userId: string;
  onClose?: () => void;
}

export function SupportChat({ automationId, userId, onClose }: SupportChatProps) {
  const [message, setMessage] = useState('');
  const [isMinimized, setIsMinimized] = useState(false);
  const [attachments, setAttachments] = useState<File[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const queryClient = useQueryClient();

  // Mock support ticket for now since getSupportTicket doesn't exist
  const ticket: SupportTicket = {
    id: `ticket-${automationId}-${userId}`,
    status: 'open',
    messages: []
  };

  // Real-time updates for messages
  useRealTimeManager({
    channel: 'support-messages',
    filter: `ticket_id=eq.${ticket?.id}`,
    onUpdate: (payload) => {
      queryClient.setQueryData(
        ['support-messages', ticket?.id],
        (old: Message[] = []) => [...old, payload.new]
      );
    },
  });

  // Send message mutation - simplified since sendSupportMessage doesn't exist
  const { mutate: sendMessage, isPending: isSending } = useMutation({
    mutationFn: async () => {
      // Mock implementation
      return Promise.resolve({ success: true });
    },
    onSuccess: () => {
      setMessage('');
      setAttachments([]);
      scrollToBottom();
    },
    onError: () => {
      toast('Failed to send message. Please try again.');
    },
  });

  // Handle file selection
  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    setAttachments((prev) => [...prev, ...files]);
  };

  // Scroll to bottom of messages
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [ticket?.messages]);

  if (!ticket) {
    return (
      <div className="fixed bottom-4 right-4 z-50">
        <Card className="w-96 shadow-lg">
          <div className="p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold">Support Chat</h3>
              <Button
                variant="ghost"
                size="icon"
                onClick={onClose}
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
            <p className="text-sm text-gray-600">
              Loading support chat...
            </p>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 100, opacity: 0 }}
      className="fixed bottom-4 right-4 z-50"
    >
      <Card className={cn(
        'w-96 shadow-lg transition-all duration-300',
        isMinimized ? 'h-16' : 'h-[600px]'
      )}>
        <div className="p-4 border-b">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <h3 className="font-semibold">Support Chat</h3>
              <Badge variant={ticket.status === 'open' ? 'default' : 'secondary'}>
                {ticket.status}
              </Badge>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsMinimized(!isMinimized)}
              >
                {isMinimized ? '↑' : '↓'}
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={onClose}
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>

        <AnimatePresence>
          {!isMinimized && (
            <motion.div
              initial={{ height: 0 }}
              animate={{ height: 'auto' }}
              exit={{ height: 0 }}
              className="flex flex-col h-[calc(100%-4rem)]"
            >
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {ticket.messages?.map((msg, index) => (
                  <motion.div
                    key={msg.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className={cn(
                      'flex',
                      msg.user_id === userId ? 'justify-end' : 'justify-start'
                    )}
                  >
                    <div
                      className={cn(
                        'max-w-[80%] rounded-lg p-3',
                        msg.user_id === userId
                          ? 'bg-yellow-600 text-white'
                          : 'bg-gray-100'
                      )}
                    >
                      <p className="text-sm">{msg.content}</p>
                      {msg.attachments?.map((attachment, i) => (
                        <a
                          key={i}
                          href={attachment.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block mt-2 text-sm underline"
                        >
                          {attachment.name}
                        </a>
                      ))}
                      <span className="text-xs opacity-75 mt-1 block">
                        {new Date(msg.created_at).toLocaleTimeString()}
                      </span>
                    </div>
                  </motion.div>
                ))}
                <div ref={messagesEndRef} />
              </div>

              <div className="p-4 border-t">
                {attachments.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-2">
                    {attachments.map((file, index) => (
                      <Badge
                        key={index}
                        variant="secondary"
                        className="flex items-center gap-1"
                      >
                        {file.name}
                        <button
                          onClick={() => {
                            setAttachments((prev) =>
                              prev.filter((_, i) => i !== index)
                            );
                          }}
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </Badge>
                    ))}
                  </div>
                )}

                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <Paperclip className="w-4 h-4" />
                  </Button>
                  <input
                    ref={fileInputRef}
                    type="file"
                    multiple
                    className="hidden"
                    onChange={handleFileSelect}
                  />
                  <Textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Type your message..."
                    className="flex-1"
                    rows={1}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        if (message.trim() || attachments.length > 0) {
                          sendMessage();
                        }
                      }
                    }}
                  />
                  <Button
                    onClick={() => sendMessage()}
                    disabled={isSending || (!message.trim() && attachments.length === 0)}
                  >
                    {isSending ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <Send className="w-4 h-4" />
                    )}
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </Card>
    </motion.div>
  );
}
