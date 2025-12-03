import { useState } from 'react';
import { Navbar } from './Navbar';
import { ShoppingBag, Plus, MessageCircle, AlertTriangle } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface MarketplaceProps {
  currentUser: any;
  onNavigate: (page: string) => void;
  onLogout: () => void;
}

export function Marketplace({ currentUser, onNavigate, onLogout }: MarketplaceProps) {
  const [items, setItems] = useState([
    { id: 1, title: 'Data Structures Textbook', price: 300, condition: 'Good', category: 'Books', seller: 'Amulya', image: '', description: 'Used for one semester, excellent condition', sold: false },
    { id: 2, title: 'Scientific Calculator', price: 500, condition: 'Like New', category: 'Electronics', seller: 'Prajwal', image: '', description: 'Casio fx-991EX, barely used', sold: false },
    { id: 3, title: 'Engineering Notes - Sem 3', price: 150, condition: 'Good', category: 'Notes', seller: 'Ujjayani', image: '', description: 'Complete handwritten notes', sold: false },
    { id: 4, title: 'Arduino Starter Kit', price: 800, condition: 'Good', category: 'Project Supplies', seller: 'Aakash_', image: '', description: 'Perfect for electronics projects', sold: false },
  ]);
  const [showForm, setShowForm] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [newItem, setNewItem] = useState({
    title: '',
    price: '',
    condition: 'Good',
    category: 'Books',
    description: '',
    image: ''
  });

  const categories = ['All', 'Books', 'Electronics', 'Notes', 'Accessories', 'Project Supplies'];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const item = {
      id: items.length + 1,
      ...newItem,
      price: parseInt(newItem.price),
      seller: currentUser.name,
      sold: false
    };
    setItems([item, ...items]);
    setNewItem({ title: '', price: '', condition: 'Good', category: 'Books', description: '', image: '' });
    setShowForm(false);
  };

  const handleMarkSold = (id: number) => {
    setItems(items.map(item => 
      item.id === id ? { ...item, sold: true } : item
    ));
  };

  const filteredItems = selectedCategory === 'All' 
    ? items 
    : items.filter(item => item.category === selectedCategory);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar currentUser={currentUser} onNavigate={onNavigate} onLogout={onLogout} />
      
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl mb-2 flex items-center gap-2">
              <ShoppingBag className="text-orange-500" />
              Student Marketplace
            </h1>
            <p className="text-gray-600">Buy and sell second-hand items with fellow students</p>
          </div>
          <button
            onClick={() => setShowForm(!showForm)}
            className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded transition"
          >
            <Plus size={20} />
            Sell Item
          </button>
        </div>

        {showForm && (
          <div className="bg-white p-6 rounded-lg shadow-lg mb-8">
            <h2 className="text-2xl mb-4">List Your Item</h2>
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block mb-2">Item Title</label>
                  <input
                    type="text"
                    value={newItem.title}
                    onChange={(e) => setNewItem({ ...newItem, title: e.target.value })}
                    className="w-full p-3 border border-gray-300 rounded"
                    required
                  />
                </div>
                <div>
                  <label className="block mb-2">Price (₹)</label>
                  <input
                    type="number"
                    value={newItem.price}
                    onChange={(e) => setNewItem({ ...newItem, price: e.target.value })}
                    className="w-full p-3 border border-gray-300 rounded"
                    required
                  />
                </div>
                <div>
                  <label className="block mb-2">Category</label>
                  <select
                    value={newItem.category}
                    onChange={(e) => setNewItem({ ...newItem, category: e.target.value })}
                    className="w-full p-3 border border-gray-300 rounded"
                  >
                    {categories.filter(c => c !== 'All').map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block mb-2">Condition</label>
                  <select
                    value={newItem.condition}
                    onChange={(e) => setNewItem({ ...newItem, condition: e.target.value })}
                    className="w-full p-3 border border-gray-300 rounded"
                  >
                    <option>New</option>
                    <option>Like New</option>
                    <option>Good</option>
                    <option>Fair</option>
                  </select>
                </div>
              </div>
              <div className="mb-4">
                <label className="block mb-2">Image URL (optional)</label>
                <input
                  type="text"
                  value={newItem.image}
                  onChange={(e) => setNewItem({ ...newItem, image: e.target.value })}
                  className="w-full p-3 border border-gray-300 rounded"
                  placeholder="https://example.com/image.jpg"
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2">Description</label>
                <textarea
                  value={newItem.description}
                  onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
                  className="w-full p-3 border border-gray-300 rounded h-24"
                  required
                />
              </div>
              <div className="flex gap-2">
                <button type="submit" className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded transition">
                  List Item
                </button>
                <button type="button" onClick={() => setShowForm(false)} className="bg-gray-300 hover:bg-gray-400 px-4 py-2 rounded transition">
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        <div className="mb-6 flex gap-2 overflow-x-auto pb-2">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded whitespace-nowrap transition ${
                selectedCategory === cat
                  ? 'bg-orange-500 text-white'
                  : 'bg-white hover:bg-gray-100'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map(item => (
            <div key={item.id} className={`bg-white p-6 rounded-lg shadow-lg ${item.sold ? 'opacity-60' : ''}`}>
              {item.sold && (
                <div className="bg-red-500 text-white px-3 py-1 rounded mb-3 inline-block">
                  SOLD
                </div>
              )}
              {item.image && (
                <ImageWithFallback 
                  src={item.image} 
                  alt={item.title}
                  className="w-full h-48 object-cover rounded mb-4"
                />
              )}
              <h3 className="text-xl mb-2">{item.title}</h3>
              <p className="text-2xl text-orange-600 mb-2">₹{item.price}</p>
              <div className="flex gap-2 mb-3">
                <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded text-sm">{item.category}</span>
                <span className="bg-green-100 text-green-700 px-3 py-1 rounded text-sm">{item.condition}</span>
              </div>
              <p className="text-gray-600 mb-3">{item.description}</p>
              <p className="text-sm text-gray-500 mb-4">Seller: {item.seller}</p>
              <div className="flex gap-2">
                {!item.sold && (
                  <>
                    <button
                      onClick={() => onNavigate('messages')}
                      className="flex-1 bg-orange-500 hover:bg-orange-600 text-white py-2 rounded transition flex items-center justify-center gap-2"
                    >
                      <MessageCircle size={18} />
                      Contact
                    </button>
                    {item.seller === currentUser.name && (
                      <button
                        onClick={() => handleMarkSold(item.id)}
                        className="bg-gray-300 hover:bg-gray-400 px-4 py-2 rounded transition"
                      >
                        Mark Sold
                      </button>
                    )}
                  </>
                )}
                <button className="text-red-500 hover:text-red-700 px-3" title="Report listing">
                  <AlertTriangle size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
