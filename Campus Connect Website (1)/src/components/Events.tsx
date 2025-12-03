import { useState } from 'react';
import { Navbar } from './Navbar';
import { Calendar, Clock, MapPin, Plus } from 'lucide-react';

interface EventsProps {
  currentUser: any;
  events: any[];
  setEvents: (events: any[]) => void;
  onNavigate: (page: string) => void;
  onLogout: () => void;
}

export function Events({ currentUser, events, setEvents, onNavigate, onLogout }: EventsProps) {
  const [showForm, setShowForm] = useState(false);
  const [newEvent, setNewEvent] = useState({
    name: '',
    date: '',
    time: '',
    venue: '',
    description: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const event = {
      id: events.length + 1,
      ...newEvent
    };
    setEvents([...events, event]);
    setNewEvent({ name: '', date: '', time: '', venue: '', description: '' });
    setShowForm(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar currentUser={currentUser} onNavigate={onNavigate} onLogout={onLogout} />
      
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-4xl">Club Events</h1>
          <button
            onClick={() => setShowForm(!showForm)}
            className="flex items-center gap-2 bg-pink-400 hover:bg-pink-500 text-white px-4 py-2 rounded transition"
          >
            <Plus size={20} />
            Create Event
          </button>
        </div>

        {showForm && (
          <div className="bg-white p-6 rounded-lg shadow-lg mb-8">
            <h2 className="text-2xl mb-4">Create New Event</h2>
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block mb-2">Event Name</label>
                  <input
                    type="text"
                    value={newEvent.name}
                    onChange={(e) => setNewEvent({ ...newEvent, name: e.target.value })}
                    className="w-full p-3 border border-gray-300 rounded"
                    required
                  />
                </div>
                <div>
                  <label className="block mb-2">Date</label>
                  <input
                    type="date"
                    value={newEvent.date}
                    onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
                    className="w-full p-3 border border-gray-300 rounded"
                    required
                  />
                </div>
                <div>
                  <label className="block mb-2">Time</label>
                  <input
                    type="text"
                    value={newEvent.time}
                    onChange={(e) => setNewEvent({ ...newEvent, time: e.target.value })}
                    className="w-full p-3 border border-gray-300 rounded"
                    placeholder="e.g., 10:00 AM"
                    required
                  />
                </div>
                <div>
                  <label className="block mb-2">Venue</label>
                  <input
                    type="text"
                    value={newEvent.venue}
                    onChange={(e) => setNewEvent({ ...newEvent, venue: e.target.value })}
                    className="w-full p-3 border border-gray-300 rounded"
                    required
                  />
                </div>
              </div>
              <div className="mb-4">
                <label className="block mb-2">Description</label>
                <textarea
                  value={newEvent.description}
                  onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
                  className="w-full p-3 border border-gray-300 rounded h-24"
                  required
                />
              </div>
              <div className="flex gap-2">
                <button type="submit" className="bg-pink-400 hover:bg-pink-500 text-white px-6 py-2 rounded transition">
                  Create Event
                </button>
                <button type="button" onClick={() => setShowForm(false)} className="bg-gray-300 hover:bg-gray-400 px-6 py-2 rounded transition">
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map(event => (
            <div key={event.id} className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition">
              <h3 className="text-2xl mb-4">{event.name}</h3>
              <div className="space-y-3 mb-4">
                <div className="flex items-center gap-2 text-gray-600">
                  <Calendar size={20} className="text-pink-500" />
                  <span>{new Date(event.date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Clock size={20} className="text-pink-500" />
                  <span>{event.time}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <MapPin size={20} className="text-pink-500" />
                  <span>{event.venue}</span>
                </div>
              </div>
              <p className="text-gray-600">{event.description}</p>
              <button className="mt-4 w-full bg-pink-400 hover:bg-pink-500 text-white py-2 rounded transition">
                Register
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
