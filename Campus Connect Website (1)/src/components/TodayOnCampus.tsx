import { Calendar, TrendingUp, AlertCircle } from 'lucide-react';

interface TodayOnCampusProps {
  onNavigate: (page: string) => void;
}

export function TodayOnCampus({ onNavigate }: TodayOnCampusProps) {
  const today = new Date();
  const upcomingEvents = [
    { title: 'Physics Lab Submission', type: 'deadline', date: 'Today, 5:00 PM' },
    { title: 'Tech Fest Registration', type: 'event', date: 'Tomorrow, 10:00 AM' },
  ];

  const trendingPosts = [
    { title: 'New AI Study Assistant Launch', likes: 45 },
    { title: 'Campus Wifi Upgrade Complete', likes: 38 },
  ];

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl mb-4">📅 Today on Campus</h2>
      
      <div className="mb-6">
        <h3 className="flex items-center gap-2 mb-3">
          <AlertCircle size={18} className="text-red-500" />
          Upcoming Deadlines
        </h3>
        {upcomingEvents.filter(e => e.type === 'deadline').map((event, index) => (
          <div key={index} className="p-3 bg-red-50 rounded mb-2">
            <p className="text-sm">{event.title}</p>
            <p className="text-xs text-gray-600">{event.date}</p>
          </div>
        ))}
      </div>

      <div className="mb-6">
        <h3 className="flex items-center gap-2 mb-3">
          <Calendar size={18} className="text-blue-500" />
          Today's Events
        </h3>
        {upcomingEvents.filter(e => e.type === 'event').map((event, index) => (
          <div key={index} className="p-3 bg-blue-50 rounded mb-2">
            <p className="text-sm">{event.title}</p>
            <p className="text-xs text-gray-600">{event.date}</p>
          </div>
        ))}
      </div>

      <div>
        <h3 className="flex items-center gap-2 mb-3">
          <TrendingUp size={18} className="text-green-500" />
          Trending Posts
        </h3>
        {trendingPosts.map((post, index) => (
          <div key={index} className="p-3 bg-green-50 rounded mb-2 cursor-pointer hover:bg-green-100 transition" onClick={() => onNavigate('posts')}>
            <p className="text-sm">{post.title}</p>
            <p className="text-xs text-gray-600">{post.likes} likes</p>
          </div>
        ))}
      </div>

      <button 
        onClick={() => onNavigate('events')}
        className="w-full mt-4 bg-pink-400 hover:bg-pink-500 text-white py-2 rounded transition"
      >
        View All Events
      </button>
    </div>
  );
}
