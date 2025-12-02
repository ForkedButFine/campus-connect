import { useState } from 'react';
import { ShoppingCart, Search } from 'lucide-react';

const stationaryItems = [
  { id: 1, name: 'Ballpoint pens (blue/black)', price: 10, category: 'Writing' },
  { id: 2, name: 'Ballpoint pens (red/green)', price: 10, category: 'Writing' },
  { id: 3, name: 'Mechanical pencils', price: 25, category: 'Writing' },
  { id: 4, name: 'HB pencils', price: 5, category: 'Writing' },
  { id: 5, name: 'Erasers', price: 5, category: 'Writing' },
  { id: 6, name: 'Pencil sharpeners', price: 8, category: 'Writing' },
  { id: 7, name: 'Notebooks (A4/A5)', price: 40, category: 'Paper' },
  { id: 8, name: 'Sticky notes', price: 30, category: 'Paper' },
  { id: 9, name: 'Index cards', price: 20, category: 'Paper' },
  { id: 10, name: 'Binders', price: 60, category: 'Organization' },
  { id: 11, name: 'Paper clips', price: 15, category: 'Organization' },
  { id: 12, name: 'Highlighters', price: 35, category: 'Writing' },
  { id: 13, name: 'Rulers (6 inch/12 inch)', price: 20, category: 'Geometry' },
  { id: 14, name: 'Geometry box', price: 80, category: 'Geometry' },
  { id: 15, name: 'Scissors (small/big)', price: 30, category: 'Cutting' },
  { id: 16, name: 'Glue sticks', price: 25, category: 'Adhesive' },
  { id: 17, name: 'Colored pencils', price: 50, category: 'Art' },
  { id: 18, name: 'Poster paints', price: 70, category: 'Art' },
  { id: 19, name: 'Paint brushes (sizes 2, 4, 8)', price: 45, category: 'Art' },
  { id: 20, name: 'Chart paper (various colors)', price: 35, category: 'Paper' },
  { id: 21, name: 'Crepe paper', price: 25, category: 'Paper' },
  { id: 22, name: 'Glazed paper', price: 30, category: 'Paper' },
  { id: 23, name: 'Scientific calculator', price: 450, category: 'Electronics' },
  { id: 24, name: 'Pencil case', price: 100, category: 'Organization' },
  { id: 25, name: 'File folders', price: 40, category: 'Organization' },
  { id: 26, name: 'Board markers', price: 50, category: 'Writing' },
  { id: 27, name: 'Masking tape', price: 35, category: 'Adhesive' },
  { id: 28, name: 'Permanent markers', price: 40, category: 'Writing' },
  { id: 29, name: 'Sketch pens', price: 60, category: 'Art' },
  { id: 30, name: 'A4 sheets (ream)', price: 250, category: 'Paper' },
  { id: 31, name: 'Sticky tape (Scotch tape)', price: 30, category: 'Adhesive' },
  { id: 32, name: 'Plastic folder (A4 size)', price: 25, category: 'Organization' },
  { id: 33, name: 'Gum bottle (adhesive)', price: 20, category: 'Adhesive' },
  { id: 34, name: 'Fountain pen', price: 150, category: 'Writing' },
  { id: 35, name: 'Correction fluid/pen', price: 30, category: 'Writing' },
  { id: 36, name: 'Sharp tip compass', price: 60, category: 'Geometry' },
  { id: 37, name: 'Protractor', price: 15, category: 'Geometry' },
  { id: 38, name: 'Set squares', price: 25, category: 'Geometry' },
  { id: 39, name: 'School diary/planner', price: 120, category: 'Organization' },
  { id: 40, name: 'Wax crayons', price: 45, category: 'Art' },
  { id: 41, name: 'Staples and stapler', price: 80, category: 'Organization' },
  { id: 42, name: 'Thumb tacks/push pins', price: 20, category: 'Organization' },
  { id: 43, name: 'Envelope', price: 10, category: 'Paper' },
  { id: 44, name: 'Paper cutter', price: 150, category: 'Cutting' },
  { id: 45, name: 'Drawing files', price: 50, category: 'Organization' },
  { id: 46, name: 'Index dividers', price: 35, category: 'Organization' },
  { id: 47, name: 'Cloth bag or school bag', price: 500, category: 'Accessories' },
  { id: 48, name: 'Water bottle', price: 200, category: 'Accessories' },
  { id: 49, name: 'Calculator cover/protector', price: 50, category: 'Accessories' },
  { id: 50, name: 'Letter opener', price: 40, category: 'Organization' },
];

export function StationaryShop() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [cart, setCart] = useState<any[]>([]);

  const categories = ['All', ...Array.from(new Set(stationaryItems.map(item => item.category)))];

  const filteredItems = stationaryItems.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const addToCart = (item: any) => {
    setCart([...cart, item]);
  };

  return (
    <div className="mt-8 bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-3xl mb-6">🎒 Student Stationary Shop</h2>
      
      <div className="flex gap-4 mb-6">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-3 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search for stationary items..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg"
          />
        </div>
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg"
        >
          {categories.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>

      {cart.length > 0 && (
        <div className="mb-4 p-4 bg-green-50 rounded-lg flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShoppingCart size={20} className="text-green-600" />
            <span>{cart.length} item(s) in cart</span>
          </div>
          <button onClick={() => setCart([])} className="text-red-500 hover:underline">Clear Cart</button>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {filteredItems.map(item => (
          <div key={item.id} className="border border-gray-200 p-4 rounded-lg hover:shadow-md transition">
            <div className="flex items-start justify-between mb-2">
              <h3 className="flex-1">{item.name}</h3>
              <span className="text-pink-600 ml-2">₹{item.price}</span>
            </div>
            <p className="text-sm text-gray-500 mb-3">{item.category}</p>
            <button
              onClick={() => addToCart(item)}
              className="w-full bg-pink-400 hover:bg-pink-500 text-white py-2 rounded transition"
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
