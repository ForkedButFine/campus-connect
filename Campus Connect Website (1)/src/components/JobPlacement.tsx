import { useState } from 'react';
import { Navbar } from './Navbar';
import { Briefcase, MapPin, DollarSign, Clock, CheckCircle } from 'lucide-react';

interface JobPlacementProps {
  currentUser: any;
  onNavigate: (page: string) => void;
  onLogout: () => void;
}

const companies = [
  {
    id: 1,
    name: 'Google',
    role: 'Software Engineer',
    location: 'Bangalore, India',
    salary: '₹15-20 LPA',
    type: 'Full-time',
    description: 'Join Google to work on cutting-edge technology that impacts billions of users worldwide.'
  },
  {
    id: 2,
    name: 'Microsoft',
    role: 'Cloud Solutions Architect',
    location: 'Hyderabad, India',
    salary: '₹18-25 LPA',
    type: 'Full-time',
    description: 'Help enterprises transform their business with Azure cloud solutions.'
  },
  {
    id: 3,
    name: 'Amazon',
    role: 'Software Development Engineer',
    location: 'Mumbai, India',
    salary: '₹16-22 LPA',
    type: 'Full-time',
    description: 'Build innovative solutions for millions of customers at Amazon.'
  },
  {
    id: 4,
    name: 'Infosys',
    role: 'Systems Engineer',
    location: 'Pune, India',
    salary: '₹4-6 LPA',
    type: 'Full-time',
    description: 'Start your career with one of India\'s leading IT services companies.'
  },
  {
    id: 5,
    name: 'TCS',
    role: 'Assistant Systems Engineer',
    location: 'Chennai, India',
    salary: '₹3.5-5 LPA',
    type: 'Full-time',
    description: 'Join TCS and work on diverse projects across multiple domains.'
  },
  {
    id: 6,
    name: 'Wipro',
    role: 'Project Engineer',
    location: 'Bangalore, India',
    salary: '₹3.8-5.5 LPA',
    type: 'Full-time',
    description: 'Be part of digital transformation projects for global clients.'
  },
  {
    id: 7,
    name: 'Flipkart',
    role: 'Software Development Engineer',
    location: 'Bangalore, India',
    salary: '₹12-18 LPA',
    type: 'Full-time',
    description: 'Work on e-commerce solutions that serve millions of Indian customers.'
  },
  {
    id: 8,
    name: 'Accenture',
    role: 'Application Development Associate',
    location: 'Delhi NCR, India',
    salary: '₹4.5-6.5 LPA',
    type: 'Full-time',
    description: 'Develop innovative applications for Fortune 500 companies.'
  },
  {
    id: 9,
    name: 'IBM',
    role: 'Application Developer',
    location: 'Bangalore, India',
    salary: '₹5-8 LPA',
    type: 'Full-time',
    description: 'Create next-generation applications powered by AI and cloud technology.'
  },
  {
    id: 10,
    name: 'Cognizant',
    role: 'Programmer Analyst',
    location: 'Hyderabad, India',
    salary: '₹4-6 LPA',
    type: 'Full-time',
    description: 'Work on exciting projects in digital transformation and consulting.'
  }
];

export function JobPlacement({ currentUser, onNavigate, onLogout }: JobPlacementProps) {
  const [appliedJobs, setAppliedJobs] = useState<number[]>([]);
  const [showSuccess, setShowSuccess] = useState<number | null>(null);

  const handleApply = (jobId: number) => {
    setAppliedJobs([...appliedJobs, jobId]);
    setShowSuccess(jobId);
    setTimeout(() => setShowSuccess(null), 3000);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar currentUser={currentUser} onNavigate={onNavigate} onLogout={onLogout} />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl mb-4">Job Placement Cell</h1>
          <p className="text-gray-600">Explore career opportunities from top companies</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {companies.map(company => (
            <div key={company.id} className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h2 className="text-2xl mb-2">{company.name}</h2>
                  <h3 className="text-xl text-pink-600 mb-3">{company.role}</h3>
                </div>
                <Briefcase className="text-pink-500" size={32} />
              </div>

              <p className="text-gray-700 mb-4">{company.description}</p>

              <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2 text-gray-600">
                  <MapPin size={18} className="text-pink-500" />
                  <span>{company.location}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <DollarSign size={18} className="text-pink-500" />
                  <span>{company.salary}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Clock size={18} className="text-pink-500" />
                  <span>{company.type}</span>
                </div>
              </div>

              {showSuccess === company.id && (
                <div className="mb-4 p-3 bg-green-50 text-green-700 rounded-lg flex items-center gap-2">
                  <CheckCircle size={20} />
                  <span>Application submitted successfully!</span>
                </div>
              )}

              <button
                onClick={() => handleApply(company.id)}
                disabled={appliedJobs.includes(company.id)}
                className={`w-full py-3 rounded-lg transition ${
                  appliedJobs.includes(company.id)
                    ? 'bg-gray-300 text-gray-600 cursor-not-allowed'
                    : 'bg-pink-400 hover:bg-pink-500 text-white'
                }`}
              >
                {appliedJobs.includes(company.id) ? 'Already Applied' : 'Apply Now'}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
