import { Navbar } from './Navbar';
import { Award, BookOpen } from 'lucide-react';

interface TeacherProfilesProps {
  currentUser: any;
  onNavigate: (page: string) => void;
  onLogout: () => void;
}

const teachers = [
  {
    id: 1,
    name: 'Rajash Gopal',
    subject: 'Physics',
    achievements: ['Ph.D. in Quantum Physics', 'Published 20+ research papers', 'Best Teacher Award 2023'],
    bio: 'Passionate about making physics accessible and exciting for all students.'
  },
  {
    id: 2,
    name: 'T Sruthi',
    subject: 'Soft Skills',
    achievements: ['MBA in HR', 'Corporate Trainer with 10+ years experience', 'TEDx Speaker'],
    bio: 'Helping students develop essential communication and interpersonal skills.'
  },
  {
    id: 3,
    name: 'Anaswara',
    subject: 'IDT Design',
    achievements: ['Design Thinking Certified', 'Innovation Award Winner', 'Published Design Case Studies'],
    bio: 'Fostering creative problem-solving through design thinking methodologies.'
  },
  {
    id: 4,
    name: 'Kishor',
    subject: 'Mathematics',
    achievements: ['M.Sc. Mathematics', 'Gold Medalist', 'Math Olympiad Coach'],
    bio: 'Making complex mathematical concepts simple and intuitive.'
  },
  {
    id: 5,
    name: 'B Rajender Prasad',
    subject: 'CADE',
    achievements: ['Expert in AutoCAD & SolidWorks', 'Industry Experience: 15 years', 'NPTEL Course Coordinator'],
    bio: 'Bridging the gap between theoretical knowledge and practical application.'
  },
  {
    id: 6,
    name: 'Shilpa Shree',
    subject: 'C Programming',
    achievements: ['Coding Competition Judge', 'Open Source Contributor', 'Published Programming Textbook'],
    bio: 'Building strong programming foundations for future software engineers.'
  },
  {
    id: 7,
    name: 'Dr. Shiva Kumar',
    subject: 'Python',
    achievements: ['Ph.D. in Computer Science', 'Python Certified Expert', 'AI/ML Researcher'],
    bio: 'Exploring the power of Python in data science and artificial intelligence.'
  },
  {
    id: 8,
    name: 'Sachin',
    subject: 'ECE (Electronics)',
    achievements: ['M.Tech in VLSI Design', 'Patent Holder', 'IEEE Member'],
    bio: 'Empowering students with cutting-edge electronics and circuit design knowledge.'
  },
  {
    id: 9,
    name: 'Sagar',
    subject: 'Mathematics Lab',
    achievements: ['MATLAB Expert', 'Research Publications in Applied Math', 'Best Lab Coordinator'],
    bio: 'Making mathematics tangible through hands-on experimentation.'
  },
  {
    id: 10,
    name: 'Ayappa',
    subject: 'Chemistry',
    achievements: ['Ph.D. in Organic Chemistry', 'Research Grant Recipient', 'Science Fair Organizer'],
    bio: 'Inspiring curiosity about the molecular world around us.'
  }
];

export function TeacherProfiles({ currentUser, onNavigate, onLogout }: TeacherProfilesProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar currentUser={currentUser} onNavigate={onNavigate} onLogout={onLogout} />
      
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl mb-8">Our Faculty</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {teachers.map(teacher => (
            <div key={teacher.id} className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition">
              <div className="mb-4">
                <h2 className="text-2xl mb-2">{teacher.name}</h2>
                <div className="flex items-center gap-2 text-pink-600">
                  <BookOpen size={20} />
                  <span>{teacher.subject}</span>
                </div>
              </div>

              <p className="text-gray-600 mb-4 italic">{teacher.bio}</p>

              <div>
                <h3 className="flex items-center gap-2 mb-3">
                  <Award size={20} className="text-yellow-500" />
                  Achievements
                </h3>
                <ul className="space-y-2">
                  {teacher.achievements.map((achievement, index) => (
                    <li key={index} className="text-sm text-gray-700 pl-4 border-l-2 border-pink-200">
                      {achievement}
                    </li>
                  ))}
                </ul>
              </div>

              <button className="mt-6 w-full bg-pink-400 hover:bg-pink-500 text-white py-2 rounded transition">
                Contact Professor
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
