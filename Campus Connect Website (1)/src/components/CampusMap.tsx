import { useState } from 'react';
import { Navbar } from './Navbar';
import { MapPin, Navigation, Building } from 'lucide-react';

interface CampusMapProps {
  currentUser: any;
  onNavigate: (page: string) => void;
  onLogout: () => void;
}

const locations = [
  { id: 1, name: 'Main Auditorium', category: 'Event Venues', coordinates: { x: 20, y: 30 }, description: 'Large auditorium for events and seminars' },
  { id: 2, name: 'Computer Lab A', category: 'Labs', coordinates: { x: 40, y: 20 }, description: 'Advanced computer lab with 50 systems' },
  { id: 3, name: 'Library', category: 'Departments', coordinates: { x: 60, y: 40 }, description: 'Central library with extensive collection' },
  { id: 4, name: 'Physics Lab', category: 'Labs', coordinates: { x: 30, y: 60 }, description: 'Well-equipped physics laboratory' },
  { id: 5, name: 'Cafeteria', category: 'Amenities', coordinates: { x: 70, y: 70 }, description: 'Main campus cafeteria' },
  { id: 6, name: 'Sports Complex', category: 'Event Venues', coordinates: { x: 80, y: 30 }, description: 'Indoor and outdoor sports facilities' },
  { id: 7, name: 'Chemistry Lab', category: 'Labs', coordinates: { x: 50, y: 80 }, description: 'Advanced chemistry laboratory' },
  { id: 8, name: 'Admin Block', category: 'Departments', coordinates: { x: 10, y: 50 }, description: 'Administrative offices' },
];

const categories = ['All', 'Labs', 'Departments', 'Event Venues', 'Amenities'];

export function CampusMap({ currentUser, onNavigate, onLogout }: CampusMapProps) {
  const [selectedLocation, setSelectedLocation] = useState<any>(null);
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredLocations = selectedCategory === 'All'
    ? locations
    : locations.filter(loc => loc.category === selectedCategory);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar currentUser={currentUser} onNavigate={onNavigate} onLogout={onLogout} />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl mb-2 flex items-center gap-2">
            <Navigation className="text-rose-500" />
            Interactive Campus Map
          </h1>
          <p className="text-gray-600">Find your way around campus easily</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <div className="relative bg-gradient-to-br from-green-100 to-blue-100 rounded-lg" style={{ height: '600px' }}>
                <div className="absolute inset-0 p-4">
                  {/* Campus Map Visualization */}
                  {filteredLocations.map(location => (
                    <div
                      key={location.id}
                      className="absolute cursor-pointer transform -translate-x-1/2 -translate-y-1/2 hover:scale-110 transition"
                      style={{
                        left: `${location.coordinates.x}%`,
                        top: `${location.coordinates.y}%`
                      }}
                      onClick={() => setSelectedLocation(location)}
                    >
                      <div className={`p-3 rounded-full ${
                        selectedLocation?.id === location.id
                          ? 'bg-rose-500 text-white'
                          : 'bg-white text-rose-500'
                      } shadow-lg`}>
                        <MapPin size={24} />
                      </div>
                      <div className="text-center mt-2 bg-white px-2 py-1 rounded text-sm shadow">
                        {location.name}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div>
            <div className="bg-white p-6 rounded-lg shadow-lg mb-6">
              <h2 className="text-2xl mb-4">Categories</h2>
              <div className="space-y-2">
                {categories.map(cat => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`w-full text-left px-4 py-2 rounded transition ${
                      selectedCategory === cat
                        ? 'bg-rose-500 text-white'
                        : 'bg-gray-100 hover:bg-gray-200'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {selectedLocation && (
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <h2 className="text-2xl mb-2 flex items-center gap-2">
                  <Building className="text-rose-500" />
                  {selectedLocation.name}
                </h2>
                <span className="inline-block bg-rose-100 text-rose-700 px-3 py-1 rounded text-sm mb-4">
                  {selectedLocation.category}
                </span>
                <p className="text-gray-700 mb-4">{selectedLocation.description}</p>
                <button className="w-full bg-rose-500 hover:bg-rose-600 text-white py-2 rounded transition">
                  Get Directions
                </button>
              </div>
            )}

            {!selectedLocation && (
              <div className="bg-white p-6 rounded-lg shadow-lg text-center text-gray-500">
                <MapPin size={48} className="mx-auto mb-3 text-gray-400" />
                <p>Click on a location pin to view details</p>
              </div>
            )}
          </div>
        </div>

        <div className="mt-8 bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
          <p className="text-blue-700">
            💡 Tip: Click on any location marker on the map to see detailed information and get directions.
          </p>
        </div>
      </div>
    </div>
  );
}
