import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Factory, 
  BookOpen, 
  GraduationCap, 
  Users, 
  FileText, 
  LogOut, 
  Menu, 
  X, 
  ChevronRight,
  Download,
  Play,
  Clock,
  Star,
  Heart,
  Brain,
  Wind,
  Beaker,
  FlaskConical,
  Shield,
  Truck,
  Wrench,
  Building,
  Layers,
  User,
  Home
} from 'lucide-react';

interface UserData {
  id: string;
  email: string;
  full_name: string | null;
  created_at: string;
  role: string;
}

// Resource data
const educationalMaterials = [
  {
    id: 1,
    title: 'Introduction to the Human Factory',
    description: 'Learn the basics of how your body works like a sophisticated factory.',
    type: 'Video Course',
    duration: '45 min',
    icon: Play,
    image: 'https://images.unsplash.com/photo-1559757175-5700dde675bc?w=400'
  },
  {
    id: 2,
    title: 'The Circulatory System',
    description: 'Explore how blood travels through your body like a delivery network.',
    type: 'Interactive Module',
    duration: '30 min',
    icon: Heart,
    image: 'https://images.unsplash.com/photo-1628595351029-c2bf17511435?w=400'
  },
  {
    id: 3,
    title: 'Brain: The Control Center',
    description: 'Discover how your brain controls every function in your body.',
    type: 'Video Course',
    duration: '60 min',
    icon: Brain,
    image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400'
  },
  {
    id: 4,
    title: 'Respiratory System Deep Dive',
    description: 'Understanding how your lungs process air like an industrial plant.',
    type: 'Interactive Module',
    duration: '35 min',
    icon: Wind,
    image: 'https://images.unsplash.com/photo-1530026405186-ed1f139313f8?w=400'
  },
  {
    id: 5,
    title: 'Digestive System Journey',
    description: 'Follow food through your body\'s processing plant.',
    type: 'Video Course',
    duration: '50 min',
    icon: Beaker,
    image: 'https://images.unsplash.com/photo-1576086213369-97a306d36557?w=400'
  },
  {
    id: 6,
    title: 'The Immune Defense System',
    description: 'Learn how your body protects itself from invaders.',
    type: 'Interactive Module',
    duration: '40 min',
    icon: Shield,
    image: 'https://images.unsplash.com/photo-1582719471384-894fbb16e074?w=400'
  }
];

const teacherResources = [
  {
    id: 1,
    title: 'Lesson Plan: Body Systems Overview',
    description: 'Complete 5-day lesson plan covering all major body systems.',
    type: 'PDF',
    pages: 24,
    grade: 'Grades 4-6'
  },
  {
    id: 2,
    title: 'Classroom Activities Pack',
    description: 'Hands-on activities to engage students in learning anatomy.',
    type: 'PDF + Materials List',
    pages: 36,
    grade: 'Grades 3-8'
  },
  {
    id: 3,
    title: 'Assessment Toolkit',
    description: 'Quizzes, tests, and rubrics for evaluating student learning.',
    type: 'PDF',
    pages: 18,
    grade: 'Grades 4-8'
  },
  {
    id: 4,
    title: 'Interactive Whiteboard Slides',
    description: 'Engaging presentation slides for classroom instruction.',
    type: 'PowerPoint',
    pages: 120,
    grade: 'All Grades'
  },
  {
    id: 5,
    title: 'Parent Communication Templates',
    description: 'Letters and guides to help parents support learning at home.',
    type: 'Word Doc',
    pages: 8,
    grade: 'All Grades'
  },
  {
    id: 6,
    title: 'Science Fair Project Guide',
    description: 'Ideas and instructions for human body science fair projects.',
    type: 'PDF',
    pages: 15,
    grade: 'Grades 5-8'
  }
];

const studentGuides = [
  {
    id: 1,
    title: 'My Body Factory Workbook',
    description: 'Fun activities and exercises to learn about your body.',
    ageGroup: 'Ages 6-8',
    icon: BookOpen
  },
  {
    id: 2,
    title: 'Explorer\'s Guide to Human Anatomy',
    description: 'Detailed guide with illustrations and fun facts.',
    ageGroup: 'Ages 9-12',
    icon: GraduationCap
  },
  {
    id: 3,
    title: 'Body Systems Study Cards',
    description: 'Flashcards for memorizing key facts about each system.',
    ageGroup: 'Ages 8-14',
    icon: Layers
  },
  {
    id: 4,
    title: 'Interactive Body Map',
    description: 'Digital tool to explore organs and their functions.',
    ageGroup: 'All Ages',
    icon: Building
  },
  {
    id: 5,
    title: 'Health & Wellness Journal',
    description: 'Track your health habits and learn about nutrition.',
    ageGroup: 'Ages 10-14',
    icon: Heart
  },
  {
    id: 6,
    title: 'Quiz Prep Guide',
    description: 'Study guide to ace the Factory Inspector Quiz.',
    ageGroup: 'All Ages',
    icon: Star
  }
];

const printableDiagrams = [
  {
    id: 1,
    title: 'Complete Human Body Diagram',
    description: 'Full-body diagram showing all major organs.',
    size: 'A3 / Letter',
    format: 'PDF'
  },
  {
    id: 2,
    title: 'Circulatory System Map',
    description: 'Detailed diagram of heart and blood vessels.',
    size: 'A4 / Letter',
    format: 'PDF'
  },
  {
    id: 3,
    title: 'Brain Anatomy Poster',
    description: 'Labeled diagram of brain regions and functions.',
    size: 'A3 / Tabloid',
    format: 'PDF'
  },
  {
    id: 4,
    title: 'Digestive System Chart',
    description: 'Step-by-step journey through the digestive tract.',
    size: 'A4 / Letter',
    format: 'PDF'
  },
  {
    id: 5,
    title: 'Skeletal System Poster',
    description: 'All 206 bones labeled and organized.',
    size: 'A2 / Poster',
    format: 'PDF'
  },
  {
    id: 6,
    title: 'Muscular System Diagram',
    description: 'Major muscle groups illustrated and labeled.',
    size: 'A3 / Tabloid',
    format: 'PDF'
  },
  {
    id: 7,
    title: 'Respiratory System Illustration',
    description: 'Lungs, airways, and breathing mechanics.',
    size: 'A4 / Letter',
    format: 'PDF'
  },
  {
    id: 8,
    title: 'Nervous System Overview',
    description: 'Brain, spinal cord, and nerve pathways.',
    size: 'A3 / Tabloid',
    format: 'PDF'
  }
];

const menuItems = [
  { id: 'educational', label: 'Educational Materials', icon: BookOpen },
  { id: 'teacher', label: 'Teacher Resources', icon: GraduationCap },
  { id: 'student', label: 'Student Guides', icon: Users },
  { id: 'diagrams', label: 'Printable Diagrams', icon: FileText }
];

const MembersPage: React.FC = () => {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState<UserData | null>(null);
  const [activeSection, setActiveSection] = useState('educational');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const savedUser = localStorage.getItem('humanFactoryUser');
    if (savedUser) {
      try {
        setCurrentUser(JSON.parse(savedUser));
      } catch (e) {
        localStorage.removeItem('humanFactoryUser');
        navigate('/');
      }
    } else {
      navigate('/');
    }
  }, [navigate]);

  const handleSignOut = () => {
    localStorage.removeItem('humanFactoryUser');
    navigate('/');
  };

  if (!currentUser) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-2 border-orange-500 border-t-transparent rounded-full" />
      </div>
    );
  }

  const renderContent = () => {
    switch (activeSection) {
      case 'educational':
        return (
          <div>
            <div className="mb-8">
              <h2 className="text-2xl md:text-3xl font-bold text-slate-800 mb-2">Educational Materials</h2>
              <p className="text-slate-600">Explore our comprehensive collection of learning resources about the human body.</p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {educationalMaterials.map((material) => (
                <div key={material.id} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group">
                  <div className="relative h-40 overflow-hidden">
                    <img 
                      src={material.image} 
                      alt={material.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                      <span className="bg-orange-500 text-white text-xs font-semibold px-3 py-1 rounded-full">
                        {material.type}
                      </span>
                      <span className="text-white text-sm flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {material.duration}
                      </span>
                    </div>
                  </div>
                  <div className="p-5">
                    <h3 className="font-bold text-lg text-slate-800 mb-2 group-hover:text-orange-500 transition-colors">
                      {material.title}
                    </h3>
                    <p className="text-slate-600 text-sm mb-4">{material.description}</p>
                    <button className="w-full bg-gradient-to-r from-orange-500 to-red-600 text-white py-2.5 rounded-xl font-semibold hover:shadow-lg hover:shadow-orange-500/30 transition-all flex items-center justify-center gap-2">
                      <Play className="w-4 h-4" />
                      Start Learning
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'teacher':
        return (
          <div>
            <div className="mb-8">
              <h2 className="text-2xl md:text-3xl font-bold text-slate-800 mb-2">Teacher Resources</h2>
              <p className="text-slate-600">Everything you need to bring The Human Factory to your classroom.</p>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              {teacherResources.map((resource) => (
                <div key={resource.id} className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all border border-slate-100">
                  <div className="flex items-start gap-4">
                    <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-xl flex items-center justify-center flex-shrink-0">
                      <FileText className="w-7 h-7 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-lg text-slate-800 mb-1">{resource.title}</h3>
                      <p className="text-slate-600 text-sm mb-3">{resource.description}</p>
                      <div className="flex flex-wrap gap-2 mb-4">
                        <span className="bg-purple-100 text-purple-700 text-xs font-medium px-2.5 py-1 rounded-full">
                          {resource.type}
                        </span>
                        <span className="bg-slate-100 text-slate-600 text-xs font-medium px-2.5 py-1 rounded-full">
                          {resource.pages} pages
                        </span>
                        <span className="bg-green-100 text-green-700 text-xs font-medium px-2.5 py-1 rounded-full">
                          {resource.grade}
                        </span>
                      </div>
                      <button className="flex items-center gap-2 text-purple-600 font-semibold hover:text-purple-700 transition-colors">
                        <Download className="w-4 h-4" />
                        Download Resource
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'student':
        return (
          <div>
            <div className="mb-8">
              <h2 className="text-2xl md:text-3xl font-bold text-slate-800 mb-2">Student Guides</h2>
              <p className="text-slate-600">Fun and engaging materials designed just for students.</p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {studentGuides.map((guide) => (
                <div key={guide.id} className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all border border-slate-100 group">
                  <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <guide.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="font-bold text-lg text-slate-800 mb-2">{guide.title}</h3>
                  <p className="text-slate-600 text-sm mb-3">{guide.description}</p>
                  <span className="inline-block bg-emerald-100 text-emerald-700 text-xs font-medium px-3 py-1 rounded-full mb-4">
                    {guide.ageGroup}
                  </span>
                  <button className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 text-white py-2.5 rounded-xl font-semibold hover:shadow-lg hover:shadow-emerald-500/30 transition-all">
                    Access Guide
                  </button>
                </div>
              ))}
            </div>
          </div>
        );

      case 'diagrams':
        return (
          <div>
            <div className="mb-8">
              <h2 className="text-2xl md:text-3xl font-bold text-slate-800 mb-2">Printable Diagrams</h2>
              <p className="text-slate-600">High-quality diagrams ready to print for classroom or home use.</p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              {printableDiagrams.map((diagram) => (
                <div key={diagram.id} className="bg-white rounded-xl p-5 shadow-sm hover:shadow-lg transition-all border border-slate-100 group">
                  <div className="w-full h-32 bg-gradient-to-br from-slate-100 to-slate-200 rounded-lg flex items-center justify-center mb-4 group-hover:from-orange-50 group-hover:to-red-50 transition-colors">
                    <FileText className="w-12 h-12 text-slate-400 group-hover:text-orange-500 transition-colors" />
                  </div>
                  <h3 className="font-bold text-slate-800 mb-1 text-sm">{diagram.title}</h3>
                  <p className="text-slate-500 text-xs mb-3 line-clamp-2">{diagram.description}</p>
                  <div className="flex items-center justify-between text-xs text-slate-500 mb-3">
                    <span>{diagram.size}</span>
                    <span className="bg-slate-100 px-2 py-0.5 rounded">{diagram.format}</span>
                  </div>
                  <button className="w-full flex items-center justify-center gap-1.5 bg-slate-800 text-white py-2 rounded-lg font-medium hover:bg-slate-700 transition-colors text-sm">
                    <Download className="w-4 h-4" />
                    Download
                  </button>
                </div>
              ))}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Top Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm">
        <div className="flex items-center justify-between h-16 px-4 lg:px-8">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden p-2 text-slate-600 hover:bg-slate-100 rounded-lg"
            >
              {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-600 rounded-lg flex items-center justify-center">
                <Factory className="w-6 h-6 text-white" />
              </div>
              <div className="hidden sm:block">
                <span className="text-xl font-bold text-slate-800">The Human</span>
                <span className="text-xl font-bold text-orange-500">Factory</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button 
              onClick={() => navigate('/')}
              className="flex items-center gap-2 text-slate-600 hover:text-orange-500 font-medium transition-colors"
            >
              <Home className="w-5 h-5" />
              <span className="hidden sm:inline">Home</span>
            </button>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-600 rounded-full flex items-center justify-center">
                <User className="w-5 h-5 text-white" />
              </div>
              <div className="hidden md:block text-right">
                <p className="font-medium text-slate-800 text-sm">{currentUser.full_name || 'Member'}</p>
                <p className="text-xs text-slate-500">{currentUser.email}</p>
              </div>
            </div>
            <button 
              onClick={handleSignOut}
              className="flex items-center gap-2 text-red-600 hover:bg-red-50 px-3 py-2 rounded-lg font-medium transition-colors"
            >
              <LogOut className="w-5 h-5" />
              <span className="hidden sm:inline">Sign Out</span>
            </button>
          </div>
        </div>
      </nav>

      {/* Sidebar */}
      <aside className={`fixed top-16 left-0 bottom-0 w-72 bg-white border-r border-slate-200 z-40 transform transition-transform duration-300 lg:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="p-6">
          <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-4">Resources</h3>
          <nav className="space-y-2">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setActiveSection(item.id);
                  setSidebarOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all ${
                  activeSection === item.id
                    ? 'bg-gradient-to-r from-orange-500 to-red-600 text-white shadow-lg shadow-orange-500/30'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                <item.icon className="w-5 h-5" />
                {item.label}
                <ChevronRight className={`w-4 h-4 ml-auto transition-transform ${activeSection === item.id ? 'rotate-90' : ''}`} />
              </button>
            ))}
          </nav>
        </div>

        {/* Sidebar Footer */}
        <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-slate-200 bg-slate-50">
          <div className="bg-gradient-to-br from-orange-500 to-red-600 rounded-xl p-4 text-white">
            <h4 className="font-bold mb-1">Need Help?</h4>
            <p className="text-sm text-white/80 mb-3">Contact our support team for assistance.</p>
            <button className="w-full bg-white text-orange-600 py-2 rounded-lg font-semibold text-sm hover:bg-orange-50 transition-colors">
              Get Support
            </button>
          </div>
        </div>
      </aside>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <main className="lg:ml-72 pt-16 min-h-screen">
        <div className="p-6 lg:p-10">
          {/* Welcome Banner */}
          <div className="bg-gradient-to-r from-orange-500 to-red-600 rounded-2xl p-6 md:p-8 mb-8 text-white">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h1 className="text-2xl md:text-3xl font-bold mb-2">
                  Welcome back, {currentUser.full_name?.split(' ')[0] || 'Member'}!
                </h1>
                <p className="text-white/80">
                  Access all your educational resources and continue learning about the amazing Human Factory.
                </p>
              </div>
              <div className="flex gap-3">
                <button 
                  onClick={() => navigate('/')}
                  className="bg-white/20 hover:bg-white/30 text-white px-5 py-2.5 rounded-xl font-semibold transition-colors"
                >
                  Take Quiz
                </button>
                <button className="bg-white text-orange-600 px-5 py-2.5 rounded-xl font-semibold hover:bg-orange-50 transition-colors">
                  Explore All
                </button>
              </div>
            </div>
          </div>

          {/* Dynamic Content */}
          {renderContent()}
        </div>
      </main>
    </div>
  );
};

export default MembersPage;
