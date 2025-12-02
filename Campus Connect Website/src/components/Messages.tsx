import { useState } from 'react';
import { Navbar } from './Navbar';
import { Send, Trash2 } from 'lucide-react';

interface MessagesProps {
  currentUser: any;
  users: any[];
  setUsers: (users: any[]) => void;
  messages: any[];
  setMessages: (messages: any[]) => void;
  onNavigate: (page: string) => void;
  onLogout: () => void;
}

export function Messages({ currentUser, users, setUsers, messages, setMessages, onNavigate, onLogout }: MessagesProps) {
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [messageText, setMessageText] = useState('');

  const otherUsers = users.filter(u => u.id !== currentUser.id);

  const getConversation = (userId: number) => {
    return messages.filter(m => 
      (m.from === currentUser.id && m.to === userId) || 
      (m.from === userId && m.to === currentUser.id)
    ).sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime());
  };

  const handleSendMessage = () => {
    if (messageText.trim() && selectedUser) {
      const newMessage = {
        id: messages.length + 1,
        from: currentUser.id,
        to: selectedUser.id,
        text: messageText,
        timestamp: new Date().toISOString()
      };
      setMessages([...messages, newMessage]);
      setMessageText('');
    }
  };

  const handleDeleteUser = (userId: number) => {
    if (currentUser.role === 'teacher') {
      // Teachers can delete student profiles from messages
      const studentUser = users.find(u => u.id === userId);
      if (studentUser && studentUser.role === 'student') {
        if (confirm(`Are you sure you want to remove ${studentUser.name} from messages?`)) {
          // Remove all messages with this user
          setMessages(messages.filter(m => m.from !== userId && m.to !== userId));
          // If this user is selected, deselect
          if (selectedUser?.id === userId) {
            setSelectedUser(null);
          }
        }
      }
    }
  };

  const conversation = selectedUser ? getConversation(selectedUser.id) : [];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar currentUser={currentUser} onNavigate={onNavigate} onLogout={onLogout} />
      
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-3 gap-6" style={{ height: '70vh' }}>
          <div className="bg-white rounded-lg shadow-lg p-4 overflow-y-auto">
            <h2 className="text-2xl mb-4">Messages</h2>
            {otherUsers.map(user => (
              <div
                key={user.id}
                className={`p-3 mb-2 rounded-lg cursor-pointer transition flex items-center justify-between ${
                  selectedUser?.id === user.id ? 'bg-pink-100' : 'hover:bg-gray-100'
                }`}
              >
                <div onClick={() => setSelectedUser(user)} className="flex-1">
                  <h3>{user.name}</h3>
                  <p className="text-sm text-gray-500">{user.role}</p>
                </div>
                {currentUser.role === 'teacher' && user.role === 'student' && (
                  <button
                    onClick={() => handleDeleteUser(user.id)}
                    className="text-red-500 hover:text-red-700 ml-2"
                    title="Remove from messages"
                  >
                    <Trash2 size={18} />
                  </button>
                )}
              </div>
            ))}
          </div>

          <div className="col-span-2 bg-white rounded-lg shadow-lg flex flex-col">
            {selectedUser ? (
              <>
                <div className="bg-gradient-to-r from-pink-400 to-purple-500 text-white p-4 rounded-t-lg">
                  <h2 className="text-2xl">{selectedUser.name}</h2>
                  <p className="text-sm opacity-90">{selectedUser.role}</p>
                </div>

                <div className="flex-1 p-4 overflow-y-auto">
                  {conversation.map(message => (
                    <div
                      key={message.id}
                      className={`mb-4 flex ${message.from === currentUser.id ? 'justify-end' : 'justify-start'}`}
                    >
                      <div className={`max-w-md p-3 rounded-lg ${
                        message.from === currentUser.id ? 'bg-pink-400 text-white' : 'bg-gray-200'
                      }`}>
                        <p>{message.text}</p>
                        <p className="text-xs mt-1 opacity-75">
                          {new Date(message.timestamp).toLocaleTimeString()}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="p-4 border-t">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={messageText}
                      onChange={(e) => setMessageText(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                      placeholder="Type a message..."
                      className="flex-1 p-3 border border-gray-300 rounded-lg"
                    />
                    <button
                      onClick={handleSendMessage}
                      className="bg-pink-400 hover:bg-pink-500 text-white px-6 py-3 rounded-lg transition flex items-center gap-2"
                    >
                      <Send size={20} />
                      Send
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center text-gray-500">
                <p>Select a user to start messaging</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
