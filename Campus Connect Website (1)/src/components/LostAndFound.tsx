import { useState } from 'react';
import { Navbar } from './Navbar';
import { Search, Plus, MapPin } from 'lucide-react';

interface LostAndFoundProps {
  currentUser: any;
  onNavigate: (page: string) => void;
  onLogout: () => void;
}

export function LostAndFound({ currentUser, onNavigate, onLogout }: LostAndFoundProps) {
  const [items, setItems] = useState([
    { id: 1, title: 'Blue Water Bottle', type: 'lost', location: 'Library - 2nd Floor', date: '2025-01-15', description: 'Blue Milton bottle with stickers', reportedBy: 'Amulya', contact: 'amulya@campus.com' },
    { id: 2, title: 'Black Calculator', type: 'found', location: 'Computer Lab A', date: '2025-01-14', description: 'Casio scientific calculator', reportedBy: 'Prajwal', contact: 'prajwal@campus.com' },
    { id: 3, title: 'Red Notebook', type: 'lost', location: 'Cafeteria', date: '2025-01-13', description: 'Physics notes inside', reportedBy: 'Ujjayani', contact: 'ujjayani@campus.com' },
  ]);
  const [showForm, setShowForm] = useState(false);
  const [filterType, setFilterType] = useState<'all' | 'lost' | 'found'>('all');
  const [newItem, setNewItem] = useState({
    title: '',
    type: 'lost',
    location: '',
    description: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const item = {
      id: items.length + 1,
      ...newItem,
      date: new Date().toISOString().split('T')[0],
      reportedBy: currentUser.name,
      contact: currentUser.email
    };
    setItems([item, ...items]);
    setNewItem({ title: '', type: 'lost', location: '', description: '' });
    setShowForm(false);
  };

  const filteredItems = filterType === 'all' 
    ? items 
    : items.filter(item => item.type === filterType);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar currentUser={currentUser} onNavigate={onNavigate} onLogout={onLogout} />
      
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl mb-2 flex items-center gap-2">
              <Search className="text-lime-500" />
              Lost & Found Portal
            </h1>
            <p className="text-gray-600">Report or find lost items on campus</p>
          </div>
          <button
            onClick={() => setShowForm(!showForm)}
            className="flex items-center gap-2 bg-lime-500 hover:bg-lime-600 text-white px-4 py-2 rounded transition"
          >
            <Plus size={20} />
            Report Item
          </button>
        </div>

        {showForm && (
          <div className="bg-white p-6 rounded-lg shadow-lg mb-8">
            <h2 className="text-2xl mb-4">Report Lost/Found Item</h2>
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block mb-2">Item Name</label>
                  <input
                    type="text"
                    value={newItem.title}
                    onChange={(e) => setNewItem({ ...newItem, title: e.target.value })}
                    className="w-full p-3 border border-gray-300 rounded"
                    required
                  />
                </div>
                <div>
                  <label className="block mb-2">Type</label>
                  <select
                    value={newItem.type}
                    onChange={(e) => setNewItem({ ...newItem, type: e.target.value })}
                    className="w-full p-3 border border-gray-300 rounded"
                  >
                    <option value="lost">Lost</option>
                    <option value="found">Found</option>
                  </select>
                </div>
              </div>
              <div className="mb-4">
                <label className="block mb-2">Location</label>
                <input
                  type="text"
                  value={newItem.location}
                  onChange={(e) => setNewItem({ ...newItem, location: e.target.value })}
                  className="w-full p-3 border border-gray-300 rounded"
                  placeholder="Where was it lost/found?"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2">Description</label>
                <textarea
                  value={newItem.description}
                  onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
                  className="w-full p-3 border border-gray-300 rounded h-24"
                  placeholder="Describe the item in detail"
                  required
                />
              </div>
              <div className="flex gap-2">
                <button type="submit" className="bg-lime-500 hover:bg-lime-600 text-white px-4 py-2 rounded transition">
                  Submit
                </button>
                <button type="button" onClick={() => setShowForm(false)} className="bg-gray-300 hover:bg-gray-400 px-4 py-2 rounded transition">
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        <div className="mb-6 flex gap-2">
          <button
            onClick={() => setFilterType('all')}
            className={`px-4 py-2 rounded transition ${
              filterType === 'all' ? 'bg-lime-500 text-white' : 'bg-white hover:bg-gray-100'
            }`}
          >
            All Items
          </button>
          <button
            onClick={() => setFilterType('lost')}
            className={`px-4 py-2 rounded transition ${
              filterType === 'lost' ? 'bg-red-500 text-white' : 'bg-white hover:bg-gray-100'
            }`}
          >
            Lost
          </button>
          <button
            onClick={() => setFilterType('found')}
            className={`px-4 py-2 rounded transition ${
              filterType === 'found' ? 'bg-green-500 text-white' : 'bg-white hover:bg-gray-100'
            }`}
          >
            Found
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map(item => (
            <div key={item.id} className="bg-white p-6 rounded-lg shadow-lg">
              <div className="flex items-start justify-between mb-3">
                <h3 className="text-xl">{item.title}</h3>
                <span className={`px-3 py-1 rounded text-sm ${
                  item.type === 'lost' 
                    ? 'bg-red-100 text-red-700' 
                    : 'bg-green-100 text-green-700'
                }`}>
                  {item.type.toUpperCase()}
                </span>
              </div>
              <div className="flex items-center gap-2 mb-2 text-gray-600">
                <MapPin size={18} />
                <span>{item.location}</span>
              </div>
              <p className="text-sm text-gray-500 mb-3">Date: {new Date(item.date).toLocaleDateString()}</p>
              <p className="text-gray-700 mb-4">{item.description}</p>
              <div className="border-t pt-3">
                <p className="text-sm text-gray-600">Reported by: {item.reportedBy}</p>
                <p className="text-sm text-gray-600">Contact: {item.contact}</p>
              </div>
              <button
                onClick={() => onNavigate('messages')}
                className="w-full mt-4 bg-lime-500 hover:bg-lime-600 text-white py-2 rounded transition"
              >
                Contact Reporter
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
