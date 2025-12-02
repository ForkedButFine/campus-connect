import { useState } from 'react';
import { Navbar } from './Navbar';
import { Award, Edit2, Save } from 'lucide-react';

interface ProfileProps {
  currentUser: any;
  setCurrentUser: (user: any) => void;
  onNavigate: (page: string) => void;
  onLogout: () => void;
}

export function Profile({ currentUser, setCurrentUser, onNavigate, onLogout }: ProfileProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState(currentUser);

  const handleSave = () => {
    setCurrentUser(editedUser);
    setIsEditing(false);
  };

  const handleAddAchievement = () => {
    const achievement = prompt('Enter your achievement:');
    if (achievement) {
      setEditedUser({
        ...editedUser,
        achievements: [...editedUser.achievements, achievement]
      });
    }
  };

  const handleRemoveAchievement = (index: number) => {
    setEditedUser({
      ...editedUser,
      achievements: editedUser.achievements.filter((_: any, i: number) => i !== index)
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar currentUser={currentUser} onNavigate={onNavigate} onLogout={onLogout} />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg p-8">
          <div className="flex items-start justify-between mb-6">
            <h1 className="text-4xl">My Profile</h1>
            {!isEditing ? (
              <button
                onClick={() => setIsEditing(true)}
                className="flex items-center gap-2 bg-pink-400 hover:bg-pink-500 text-white px-4 py-2 rounded transition"
              >
                <Edit2 size={20} />
                Edit Profile
              </button>
            ) : (
              <button
                onClick={handleSave}
                className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded transition"
              >
                <Save size={20} />
                Save
              </button>
            )}
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 mb-2">Name</label>
            {isEditing ? (
              <input
                type="text"
                value={editedUser.name}
                onChange={(e) => setEditedUser({ ...editedUser, name: e.target.value })}
                className="w-full p-3 border border-gray-300 rounded-lg"
              />
            ) : (
              <p className="text-xl">{currentUser.name}</p>
            )}
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 mb-2">Email</label>
            <p className="text-xl">{currentUser.email}</p>
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 mb-2">Role</label>
            <p className="text-xl capitalize">{currentUser.role}</p>
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 mb-2">Bio</label>
            {isEditing ? (
              <textarea
                value={editedUser.bio}
                onChange={(e) => setEditedUser({ ...editedUser, bio: e.target.value })}
                className="w-full p-3 border border-gray-300 rounded-lg h-24"
                placeholder="Tell us about yourself..."
              />
            ) : (
              <p className="text-xl">{currentUser.bio || 'No bio added yet'}</p>
            )}
          </div>

          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl flex items-center gap-2">
                <Award className="text-yellow-500" />
                Achievements
              </h2>
              {isEditing && (
                <button
                  onClick={handleAddAchievement}
                  className="bg-pink-400 hover:bg-pink-500 text-white px-4 py-2 rounded transition"
                >
                  Add Achievement
                </button>
              )}
            </div>

            {editedUser.achievements.length > 0 ? (
              <div className="space-y-3">
                {editedUser.achievements.map((achievement: string, index: number) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                    <div className="flex items-center gap-2">
                      <Award size={20} className="text-yellow-600" />
                      <span>{achievement}</span>
                    </div>
                    {isEditing && (
                      <button
                        onClick={() => handleRemoveAchievement(index)}
                        className="text-red-500 hover:text-red-700"
                      >
                        Remove
                      </button>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500">No achievements added yet</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
