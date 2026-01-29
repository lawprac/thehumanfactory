import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Menu, X, ChevronDown, Mail, MapPin, Phone, ArrowRight, Play, Zap, Heart, Brain, Wind, Beaker, Factory, Shield, Truck, Wrench, Building, Layers, FlaskConical, Trophy, Target, CheckCircle, XCircle, RotateCcw, Clock, Award, Star, Users, LogIn, LogOut, User, Eye, EyeOff } from 'lucide-react';
import { supabase } from '@/lib/supabase';

// Image URLs
const IMAGES = {
  hero: 'https://d64gsuwffb70l.cloudfront.net/6965407388340c2f764b939c_1768243677783_dd0d0b64.png',
  heart: 'https://d64gsuwffb70l.cloudfront.net/6965407388340c2f764b939c_1768243697305_d4e41f1b.png',
  lungs: 'https://d64gsuwffb70l.cloudfront.net/6965407388340c2f764b939c_1768243714447_08fb7661.jpg',
  brain: 'https://d64gsuwffb70l.cloudfront.net/6965407388340c2f764b939c_1768243739098_3fadaf42.png',
  stomach: 'https://d64gsuwffb70l.cloudfront.net/6965407388340c2f764b939c_1768243755207_c9360bcf.jpg',
  kidneys: 'https://d64gsuwffb70l.cloudfront.net/6965407388340c2f764b939c_1768243770811_72dbbb5d.jpg',
  liver: 'https://d64gsuwffb70l.cloudfront.net/6965407388340c2f764b939c_1768243801813_a0a68626.png',
  muscles: 'https://d64gsuwffb70l.cloudfront.net/6965407388340c2f764b939c_1768243818051_04a1f1b4.jpg',
  skeleton: 'https://d64gsuwffb70l.cloudfront.net/6965407388340c2f764b939c_1768243845119_4dd05489.png',
  bloodVessels: 'https://d64gsuwffb70l.cloudfront.net/6965407388340c2f764b939c_1768243864714_142b3e20.jpg',
  skin: 'https://d64gsuwffb70l.cloudfront.net/6965407388340c2f764b939c_1768243881374_19d9b994.jpg',
  intestines: 'https://d64gsuwffb70l.cloudfront.net/6965407388340c2f764b939c_1768243899414_bdefb5f5.jpg'
};

// Factory departments data
const factoryDepartments = [{
  id: 'heart',
  name: 'The Pump Station',
  organ: 'Heart',
  image: IMAGES.heart,
  icon: Heart,
  factoryRole: 'Central Power Plant',
  description: 'Like a powerful pump that never stops, your heart beats about 100,000 times per day, pushing blood through 60,000 miles of blood vessels.',
  funFact: 'Your heart pumps about 2,000 gallons of blood every day!',
  color: 'from-red-500 to-rose-600'
}, {
  id: 'brain',
  name: 'Control Center',
  organ: 'Brain',
  image: IMAGES.brain,
  icon: Brain,
  factoryRole: 'Main Computer & Command Hub',
  description: 'The brain is the factory\'s supercomputer, processing millions of signals per second and coordinating all operations throughout the body.',
  funFact: 'Your brain generates enough electricity to power a small light bulb!',
  color: 'from-purple-500 to-indigo-600'
}, {
  id: 'lungs',
  name: 'Air Processing Plant',
  organ: 'Lungs',
  image: IMAGES.lungs,
  icon: Wind,
  factoryRole: 'Oxygen Supply & CO2 Removal',
  description: 'Your lungs work like a sophisticated air filtration system, taking in fresh oxygen and expelling carbon dioxide waste 20,000 times daily.',
  funFact: 'If you spread out your lungs flat, they would cover a tennis court!',
  color: 'from-sky-500 to-blue-600'
}, {
  id: 'stomach',
  name: 'Processing Plant',
  organ: 'Stomach',
  image: IMAGES.stomach,
  icon: Beaker,
  factoryRole: 'Raw Material Processing',
  description: 'The stomach is a chemical processing facility that breaks down food using powerful acids strong enough to dissolve metal!',
  funFact: 'Your stomach produces a new lining every 3-4 days to protect itself from its own acid.',
  color: 'from-amber-500 to-orange-600'
}, {
  id: 'liver',
  name: 'Chemical Factory',
  organ: 'Liver',
  image: IMAGES.liver,
  icon: FlaskConical,
  factoryRole: 'Chemical Processing & Detox',
  description: 'Your liver performs over 500 different functions, including filtering toxins, producing bile, and storing energy reserves.',
  funFact: 'The liver is the only organ that can completely regenerate itself!',
  color: 'from-emerald-500 to-teal-600'
}, {
  id: 'kidneys',
  name: 'Waste Treatment',
  organ: 'Kidneys',
  image: IMAGES.kidneys,
  icon: Factory,
  factoryRole: 'Filtration & Waste Removal',
  description: 'These bean-shaped filters process about 200 quarts of blood daily, removing waste and excess fluids to keep the factory clean.',
  funFact: 'Your kidneys filter all your blood about 40 times every day!',
  color: 'from-rose-500 to-pink-600'
}, {
  id: 'muscles',
  name: 'Motor Department',
  organ: 'Muscles',
  image: IMAGES.muscles,
  icon: Wrench,
  factoryRole: 'Movement & Power Systems',
  description: 'Over 600 muscles work as the factory\'s motors and machinery, enabling every movement from blinking to running.',
  funFact: 'It takes 17 muscles to smile but 43 muscles to frown!',
  color: 'from-red-600 to-rose-700'
}, {
  id: 'skeleton',
  name: 'Framework Division',
  organ: 'Skeleton',
  image: IMAGES.skeleton,
  icon: Building,
  factoryRole: 'Structural Support System',
  description: 'The 206 bones in your body form the factory\'s steel framework, providing structure, protection, and support for all operations.',
  funFact: 'Babies are born with about 270 bones, but many fuse together as they grow!',
  color: 'from-slate-500 to-gray-600'
}, {
  id: 'blood',
  name: 'Transport Network',
  organ: 'Blood Vessels',
  image: IMAGES.bloodVessels,
  icon: Truck,
  factoryRole: 'Pipeline & Delivery System',
  description: 'A vast network of arteries, veins, and capillaries transport oxygen, nutrients, and waste throughout the entire factory.',
  funFact: 'If laid end to end, your blood vessels would circle Earth twice!',
  color: 'from-red-500 to-crimson-600'
}, {
  id: 'skin',
  name: 'Protective Shell',
  organ: 'Skin',
  image: IMAGES.skin,
  icon: Shield,
  factoryRole: 'Security & Environmental Control',
  description: 'Your skin is the factory\'s outer wall and security system, protecting against invaders and regulating temperature.',
  funFact: 'Skin is your largest organ, weighing about 8 pounds!',
  color: 'from-amber-400 to-yellow-500'
}, {
  id: 'intestines',
  name: 'Assembly Line',
  organ: 'Intestines',
  image: IMAGES.intestines,
  icon: Layers,
  factoryRole: 'Nutrient Extraction & Assembly',
  description: 'The intestines are a 25-foot conveyor belt system that extracts nutrients from food and prepares waste for disposal.',
  funFact: 'Your small intestine has the surface area of a tennis court!',
  color: 'from-orange-500 to-amber-600'
}];

// Quiz questions
const quizQuestions = [{
  id: 1,
  department: 'heart',
  question: 'Which organ is known as "The Pump Station" in the Human Factory?',
  options: ['Brain', 'Heart', 'Lungs', 'Liver'],
  correctAnswer: 1,
  explanation: 'The heart is called The Pump Station because it pumps blood throughout your body, just like a powerful pump in a factory!'
}, {
  id: 2,
  department: 'brain',
  question: 'What factory role does the Brain serve?',
  options: ['Power Generator', 'Waste Treatment', 'Control Center', 'Processing Plant'],
  correctAnswer: 2,
  explanation: 'The brain is the Control Center - it\'s like the factory\'s main computer, coordinating all operations!'
}, {
  id: 3,
  department: 'lungs',
  question: 'How many times do your lungs breathe in a day?',
  options: ['5,000 times', '10,000 times', '20,000 times', '50,000 times'],
  correctAnswer: 2,
  explanation: 'Your lungs, the Air Processing Plant, breathe about 20,000 times daily to supply oxygen and remove CO2!'
}, {
  id: 4,
  department: 'stomach',
  question: 'What makes the stomach\'s acid so special?',
  options: ['It\'s blue colored', 'It can dissolve metal', 'It smells like roses', 'It\'s cold'],
  correctAnswer: 1,
  explanation: 'The stomach\'s acid is so powerful it can dissolve metal! That\'s why it\'s called the Processing Plant.'
}, {
  id: 5,
  department: 'liver',
  question: 'What unique ability does the liver have?',
  options: ['It can glow in the dark', 'It can completely regenerate itself', 'It can change color', 'It can move around'],
  correctAnswer: 1,
  explanation: 'The liver, our Chemical Factory, is the only organ that can completely regenerate itself!'
}, {
  id: 6,
  department: 'kidneys',
  question: 'How many times do your kidneys filter all your blood each day?',
  options: ['5 times', '10 times', '25 times', '40 times'],
  correctAnswer: 3,
  explanation: 'Your kidneys, the Waste Treatment facility, filter all your blood about 40 times every day!'
}, {
  id: 7,
  department: 'muscles',
  question: 'How many muscles does it take to smile?',
  options: ['5 muscles', '17 muscles', '43 muscles', '100 muscles'],
  correctAnswer: 1,
  explanation: 'It takes 17 muscles to smile but 43 to frown - so keep smiling! The Motor Department is always working.'
}, {
  id: 8,
  department: 'skeleton',
  question: 'How many bones does an adult human have?',
  options: ['150 bones', '206 bones', '270 bones', '350 bones'],
  correctAnswer: 1,
  explanation: 'Adults have 206 bones forming the Framework Division. Babies start with about 270 that fuse together!'
}, {
  id: 9,
  department: 'blood',
  question: 'If laid end to end, how far would your blood vessels stretch?',
  options: ['Around your city', 'Across your country', 'Around Earth once', 'Around Earth twice'],
  correctAnswer: 3,
  explanation: 'Your Transport Network of blood vessels would circle Earth twice if laid end to end - about 60,000 miles!'
}, {
  id: 10,
  department: 'skin',
  question: 'How much does your skin weigh?',
  options: ['About 2 pounds', 'About 5 pounds', 'About 8 pounds', 'About 15 pounds'],
  correctAnswer: 2,
  explanation: 'Your skin, the Protective Shell, weighs about 8 pounds and is your largest organ!'
}, {
  id: 11,
  department: 'intestines',
  question: 'How long is the small intestine?',
  options: ['5 feet', '10 feet', '25 feet', '50 feet'],
  correctAnswer: 2,
  explanation: 'The intestines, our Assembly Line, are about 25 feet long - a massive conveyor belt for nutrients!'
}, {
  id: 12,
  department: 'heart',
  question: 'How many gallons of blood does your heart pump daily?',
  options: ['500 gallons', '1,000 gallons', '2,000 gallons', '5,000 gallons'],
  correctAnswer: 2,
  explanation: 'The Pump Station pumps about 2,000 gallons of blood every single day - that\'s a lot of pumping!'
}];

// Statistics data
const factoryStats = [{
  value: '37.2',
  unit: 'Trillion',
  label: 'Cells Working Together',
  icon: Zap
}, {
  value: '100,000',
  unit: '',
  label: 'Heartbeats Per Day',
  icon: Heart
}, {
  value: '60,000',
  unit: 'Miles',
  label: 'Of Blood Vessels',
  icon: Truck
}, {
  value: '86',
  unit: 'Billion',
  label: 'Neurons in Your Brain',
  icon: Brain
}];

interface QuizScore {
  id: string;
  player_name: string;
  score: number;
  total_questions: number;
  percentage: number;
  weak_departments: string[];
  created_at: string;
}

interface UserData {
  id: string;
  email: string;
  full_name: string | null;
  created_at: string;
  role: string;
}

const AppLayout: React.FC = () => {
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedDepartment, setSelectedDepartment] = useState<string | null>(null);
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  // Auth state
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'signin' | 'signup'>('signin');
  const [authEmail, setAuthEmail] = useState('');
  const [authPassword, setAuthPassword] = useState('');
  const [authName, setAuthName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [authLoading, setAuthLoading] = useState(false);
  const [authError, setAuthError] = useState('');
  const [authSuccess, setAuthSuccess] = useState('');
  const [currentUser, setCurrentUser] = useState<UserData | null>(null);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  // Quiz state
  const [quizActive, setQuizActive] = useState(false);
  const [quizComplete, setQuizComplete] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState<{
    questionId: number;
    correct: boolean;
    department: string;
  }[]>([]);
  const [playerName, setPlayerName] = useState('');
  const [showNameInput, setShowNameInput] = useState(false);
  const [leaderboard, setLeaderboard] = useState<QuizScore[]>([]);
  const [loadingLeaderboard, setLoadingLeaderboard] = useState(false);
  const [scoreSaved, setScoreSaved] = useState(false);

  // Load user from localStorage on mount
  useEffect(() => {
    const savedUser = localStorage.getItem('humanFactoryUser');
    if (savedUser) {
      try {
        setCurrentUser(JSON.parse(savedUser));
      } catch (e) {
        localStorage.removeItem('humanFactoryUser');
      }
    }
  }, []);

  // Auth functions
  // Auth functions - use direct Supabase client instead of edge function
  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthLoading(true);
    setAuthError('');
    setAuthSuccess('');

    try {
      const normalizedEmail = authEmail.toLowerCase().trim();
      
      if (authMode === 'signup') {
        // Check if user exists
        const { data: existingUsers } = await supabase
          .from('users')
          .select('id')
          .eq('email', normalizedEmail)
          .limit(1);

        if (existingUsers && existingUsers.length > 0) {
          setAuthError('An account with this email already exists');
          setAuthLoading(false);
          return;
        }

        // Create simple hash for password (for demo purposes)
        const encoder = new TextEncoder();
        const data = encoder.encode(authPassword + 'salt123');
        const hashBuffer = await crypto.subtle.digest('SHA-256', data);
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        const password_hash = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');

        // Insert new user
        const { data: newUser, error: insertError } = await supabase
          .from('users')
          .insert({
            email: normalizedEmail,
            password_hash,
            full_name: authName || null,
            is_active: true,
            role: 'member'
          })
          .select('id, email, full_name, created_at, role')
          .single();

        if (insertError) {
          if (insertError.code === '23505') {
            setAuthError('An account with this email already exists');
          } else {
            setAuthError('Failed to create account. Please try again.');
          }
          setAuthLoading(false);
          return;
        }

        setAuthSuccess('Account created successfully!');
        setCurrentUser(newUser);
        localStorage.setItem('humanFactoryUser', JSON.stringify(newUser));
        
        setTimeout(() => {
          setAuthModalOpen(false);
          resetAuthForm();
          navigate('/members');
        }, 1000);

      } else {
        // Sign in
        const { data: users, error: findError } = await supabase
          .from('users')
          .select('id, email, password_hash, full_name, created_at, role, is_active')
          .eq('email', normalizedEmail)
          .limit(1);

        if (findError || !users || users.length === 0) {
          setAuthError('Invalid email or password');
          setAuthLoading(false);
          return;
        }

        const user = users[0];

        if (!user.is_active) {
          setAuthError('This account has been deactivated');
          setAuthLoading(false);
          return;
        }

        // Verify password
        const encoder = new TextEncoder();
        const data = encoder.encode(authPassword + 'salt123');
        const hashBuffer = await crypto.subtle.digest('SHA-256', data);
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        const password_hash = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');

        if (user.password_hash !== password_hash) {
          setAuthError('Invalid email or password');
          setAuthLoading(false);
          return;
        }

        // Update last login
        await supabase
          .from('users')
          .update({ last_login: new Date().toISOString() })
          .eq('id', user.id);

        const { password_hash: _, ...safeUser } = user;
        
        setAuthSuccess('Signed in successfully!');
        setCurrentUser(safeUser);
        localStorage.setItem('humanFactoryUser', JSON.stringify(safeUser));
        
        setTimeout(() => {
          setAuthModalOpen(false);
          resetAuthForm();
          navigate('/members');
        }, 1000);
      }
    } catch (err: any) {
      console.error('Auth error:', err);
      setAuthError('An error occurred. Please try again.');
    } finally {
      setAuthLoading(false);
    }
  };



  const handleSignOut = () => {
    setCurrentUser(null);
    localStorage.removeItem('humanFactoryUser');
    setUserMenuOpen(false);
  };

  const resetAuthForm = () => {
    setAuthEmail('');
    setAuthPassword('');
    setAuthName('');
    setAuthError('');
    setAuthSuccess('');
    setShowPassword(false);
  };

  const openAuthModal = (mode: 'signin' | 'signup') => {
    setAuthMode(mode);
    resetAuthForm();
    setAuthModalOpen(true);
  };



  // Fetch leaderboard
  const fetchLeaderboard = async () => {
    setLoadingLeaderboard(true);
    try {
      const {
        data,
        error
      } = await supabase.from('quiz_scores').select('*').order('percentage', {
        ascending: false
      }).limit(10);
      if (error) throw error;
      setLeaderboard(data || []);
    } catch (err) {
      console.error('Error fetching leaderboard:', err);
    } finally {
      setLoadingLeaderboard(false);
    }
  };
  useEffect(() => {
    fetchLeaderboard();
  }, []);
  const scrollToSection = (sectionId: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth'
      });
    }
  };
  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 3000);
    }
  };
  const openDepartmentModal = (id: string) => {
    setSelectedDepartment(id);
  };
  const closeDepartmentModal = () => {
    setSelectedDepartment(null);
  };

  // Quiz functions
  const startQuiz = () => {
    setQuizActive(true);
    setQuizComplete(false);
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowExplanation(false);
    setScore(0);
    setAnswers([]);
    setScoreSaved(false);
    setShowNameInput(false);
  };
  const handleAnswerSelect = (answerIndex: number) => {
    if (showExplanation) return;
    setSelectedAnswer(answerIndex);
  };
  const submitAnswer = () => {
    if (selectedAnswer === null) return;
    const question = quizQuestions[currentQuestion];
    const isCorrect = selectedAnswer === question.correctAnswer;
    if (isCorrect) {
      setScore(prev => prev + 1);
    }
    setAnswers(prev => [...prev, {
      questionId: question.id,
      correct: isCorrect,
      department: question.department
    }]);
    setShowExplanation(true);
  };
  const nextQuestion = () => {
    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
    } else {
      setQuizComplete(true);
      setShowNameInput(true);
    }
  };
  const saveScore = async () => {
    if (!playerName.trim()) return;
    const percentage = score / quizQuestions.length * 100;

    // Find weak departments
    const departmentScores: Record<string, {
      correct: number;
      total: number;
    }> = {};
    answers.forEach(answer => {
      if (!departmentScores[answer.department]) {
        departmentScores[answer.department] = {
          correct: 0,
          total: 0
        };
      }
      departmentScores[answer.department].total++;
      if (answer.correct) {
        departmentScores[answer.department].correct++;
      }
    });
    const weakDepartments = Object.entries(departmentScores).filter(([_, stats]) => stats.correct / stats.total < 0.5).map(([dept]) => dept);
    try {
      const {
        error
      } = await supabase.from('quiz_scores').insert({
        player_name: playerName.trim(),
        score,
        total_questions: quizQuestions.length,
        percentage,
        weak_departments: weakDepartments
      });
      if (error) throw error;
      setScoreSaved(true);
      setShowNameInput(false);
      fetchLeaderboard();
    } catch (err) {
      console.error('Error saving score:', err);
    }
  };
  const getWeakDepartments = () => {
    const departmentScores: Record<string, {
      correct: number;
      total: number;
    }> = {};
    answers.forEach(answer => {
      if (!departmentScores[answer.department]) {
        departmentScores[answer.department] = {
          correct: 0,
          total: 0
        };
      }
      departmentScores[answer.department].total++;
      if (answer.correct) {
        departmentScores[answer.department].correct++;
      }
    });
    return Object.entries(departmentScores).filter(([_, stats]) => stats.correct / stats.total < 1).map(([dept, stats]) => ({
      department: factoryDepartments.find(d => d.id === dept),
      score: stats.correct,
      total: stats.total
    }));
  };
  const selectedDept = factoryDepartments.find(d => d.id === selectedDepartment);
  return <div className="min-h-screen bg-slate-50">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-600 rounded-lg flex items-center justify-center">
                <Factory className="w-6 h-6 text-white" />
              </div>
              <div>
                <span className="text-xl font-bold text-slate-800">The Human</span>
                <span className="text-xl font-bold text-orange-500">Factory</span>
              </div>
            </div>

            <div className="hidden md:flex items-center gap-8">
              {['Home', 'Departments', 'Quiz', 'Facts', 'About'].map(item => <button key={item} onClick={() => scrollToSection(item.toLowerCase())} className="text-slate-600 hover:text-orange-500 font-medium transition-colors">
                  {item}
                </button>)}
              
              {/* Sign In / Sign Up Button or User Menu */}
              {currentUser ? (
                <div className="relative">
                  <button 
                    onClick={() => setUserMenuOpen(!userMenuOpen)}
                    className="flex items-center gap-2 bg-gradient-to-r from-orange-500 to-red-600 text-white px-4 py-2.5 rounded-full font-semibold hover:shadow-lg hover:shadow-orange-500/30 transition-all"
                  >
                    <User className="w-4 h-4" />
                    <span className="max-w-24 truncate">{currentUser.full_name || currentUser.email.split('@')[0]}</span>
                    <ChevronDown className={`w-4 h-4 transition-transform ${userMenuOpen ? 'rotate-180' : ''}`} />
                  </button>
                  
                  {userMenuOpen && (
                    <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-slate-100 py-2 z-50">
                      <div className="px-4 py-2 border-b border-slate-100">
                        <p className="font-medium text-slate-800 truncate">{currentUser.full_name || 'User'}</p>
                        <p className="text-sm text-slate-500 truncate">{currentUser.email}</p>
                      </div>
                      <button 
                        onClick={() => navigate('/members')}
                        className="w-full flex items-center gap-2 px-4 py-2 text-left text-slate-700 hover:bg-slate-50 transition-colors"
                      >
                        <User className="w-4 h-4" />
                        Members Area
                      </button>
                      <button 
                        onClick={handleSignOut}
                        className="w-full flex items-center gap-2 px-4 py-2 text-left text-red-600 hover:bg-red-50 transition-colors"
                      >
                        <LogOut className="w-4 h-4" />
                        Sign Out
                      </button>
                    </div>
                  )}

                </div>
              ) : (
                <button 
                  onClick={() => openAuthModal('signin')} 
                  className="flex items-center gap-2 bg-gradient-to-r from-orange-500 to-red-600 text-white px-6 py-2.5 rounded-full font-semibold hover:shadow-lg hover:shadow-orange-500/30 transition-all"
                >
                  <LogIn className="w-4 h-4" />
                  Sign In / Sign Up
                </button>
              )}
            </div>

            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden p-2 text-slate-600">
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {mobileMenuOpen && <div className="md:hidden bg-white border-t">
            <div className="px-4 py-4 space-y-3">
              {['Home', 'Departments', 'Quiz', 'Facts', 'About'].map(item => <button key={item} onClick={() => scrollToSection(item.toLowerCase())} className="block w-full text-left text-slate-600 hover:text-orange-500 font-medium py-2">
                  {item}
                </button>)}
              
              {currentUser ? (
                <div className="pt-2 border-t border-slate-100">
                  <div className="flex items-center gap-3 py-2">
                    <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-600 rounded-full flex items-center justify-center">
                      <User className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="font-medium text-slate-800">{currentUser.full_name || 'User'}</p>
                      <p className="text-sm text-slate-500">{currentUser.email}</p>
                    </div>
                  </div>
                  <button 
                    onClick={handleSignOut}
                    className="w-full flex items-center justify-center gap-2 bg-red-500 text-white px-6 py-3 rounded-full font-semibold mt-2"
                  >
                    <LogOut className="w-4 h-4" />
                    Sign Out
                  </button>
                </div>
              ) : (
                <button 
                  onClick={() => {
                    setMobileMenuOpen(false);
                    openAuthModal('signin');
                  }} 
                  className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-orange-500 to-red-600 text-white px-6 py-3 rounded-full font-semibold"
                >
                  <LogIn className="w-4 h-4" />
                  Sign In / Sign Up
                </button>
              )}
            </div>
          </div>}
      </nav>


      {/* Hero Section */}
      <section id="home" className="relative min-h-screen flex items-center pt-20">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
          <div className="absolute inset-0 opacity-20" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }} />
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left">
              <div className="inline-flex items-center gap-2 bg-orange-500/20 text-orange-400 px-4 py-2 rounded-full text-sm font-medium mb-6">
                <Factory className="w-4 h-4" />
                Explore the Most Amazing Machine Ever Built
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
                Welcome to
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-500">
                  The Human Factory
                </span>
              </h1>
              <p className="text-lg md:text-xl text-slate-300 mb-8 max-w-xl mx-auto lg:mx-0">
                Discover how your body works like the world's most sophisticated factory. 
                From the pump station (heart) to the control center (brain), every organ 
                plays a vital role in keeping you running 24/7.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <button onClick={() => scrollToSection('departments')} className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-orange-500 to-red-600 text-white px-8 py-4 rounded-full font-semibold text-lg hover:shadow-xl hover:shadow-orange-500/30 transition-all transform hover:-translate-y-1">
                  Explore Departments
                  <ArrowRight className="w-5 h-5" />
                </button>
                <button onClick={() => scrollToSection('quiz')} className="inline-flex items-center justify-center gap-2 bg-white/10 backdrop-blur text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-white/20 transition-all border border-white/20">
                  <Play className="w-5 h-5" />
                  Take the Quiz
                </button>
              </div>
            </div>
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-orange-500 to-red-600 rounded-3xl blur-2xl opacity-30 animate-pulse" />
              <img src={IMAGES.hero} alt="Human body as a factory" className="relative rounded-2xl shadow-2xl w-full" />
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <ChevronDown className="w-8 h-8 text-white/50" />
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {factoryStats.map((stat, index) => <div key={index} className="text-center p-6 rounded-2xl bg-gradient-to-br from-slate-50 to-slate-100 hover:shadow-lg transition-shadow">
                <div className="inline-flex items-center justify-center w-14 h-14 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl mb-4">
                  <stat.icon className="w-7 h-7 text-white" />
                </div>
                <div className="text-3xl md:text-4xl font-bold text-slate-800">
                  {stat.value}
                  <span className="text-orange-500 text-xl ml-1">{stat.unit}</span>
                </div>
                <p className="text-slate-600 mt-2">{stat.label}</p>
              </div>)}
          </div>
        </div>
      </section>

      {/* Factory Departments Section */}
      <section id="departments" className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="inline-block text-orange-500 font-semibold text-sm uppercase tracking-wider mb-3">
              Explore Your Body
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-800 mb-4">
              Factory Departments
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Every organ in your body is like a specialized department in a factory, 
              each with its own crucial role to play.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {factoryDepartments.map(dept => <div key={dept.id} onClick={() => openDepartmentModal(dept.id)} className="group cursor-pointer bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                <div className="relative h-48 overflow-hidden">
                  <div className={`absolute inset-0 bg-gradient-to-br ${dept.color} opacity-80`} />
                  <img src={dept.image} alt={dept.organ} className="w-full h-full object-cover mix-blend-overlay" />
                  <div className="absolute top-4 right-4 w-12 h-12 bg-white/20 backdrop-blur rounded-xl flex items-center justify-center">
                    <dept.icon className="w-6 h-6 text-white" />
                  </div>
                </div>
                <div className="p-5">
                  <span className="text-xs font-semibold text-orange-500 uppercase tracking-wider">
                    {dept.factoryRole}
                  </span>
                  <h3 className="text-xl font-bold text-slate-800 mt-1 group-hover:text-orange-500 transition-colors">
                    {dept.name}
                  </h3>
                  <p className="text-slate-600 text-sm mt-2 line-clamp-2">
                    {dept.description}
                  </p>
                  <div className="mt-4 flex items-center text-orange-500 font-medium text-sm">
                    Learn More
                    <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>)}
          </div>
        </div>
      </section>

      {/* Quiz Section */}
      <section id="quiz" className="py-20 bg-gradient-to-br from-purple-900 via-indigo-900 to-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="inline-flex items-center gap-2 text-purple-300 font-semibold text-sm uppercase tracking-wider mb-3">
              <Target className="w-4 h-4" />
              Test Your Knowledge
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
              Factory Inspector Quiz
            </h2>
            <p className="text-lg text-purple-200 max-w-2xl mx-auto">
              Think you know how the Human Factory works? Take our quiz and see if you can become a certified Factory Inspector!
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Quiz Area */}
            <div className="lg:col-span-2">
              <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-6 md:p-8 border border-white/20">
                {!quizActive && !quizComplete ?
              // Quiz Start Screen
              <div className="text-center py-12">
                    <div className="w-24 h-24 bg-gradient-to-br from-orange-500 to-red-600 rounded-3xl flex items-center justify-center mx-auto mb-6">
                      <Trophy className="w-12 h-12 text-white" />
                    </div>
                    <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
                      Ready to Test Your Knowledge?
                    </h3>
                    <p className="text-purple-200 mb-8 max-w-md mx-auto" data-mixed-content="true" data-mixed-content="true" data-mixed-content="true" data-mixed-content="true">
                      Answer {quizQuestions.length} questions about the Human Factory. 
                      Learn which departments you know best and which need more study!
                    </p>
                    <div className="flex flex-wrap justify-center gap-4 mb-8">
                      <div className="bg-white/10 px-4 py-2 rounded-full text-purple-200" data-mixed-content="true" data-mixed-content="true" data-mixed-content="true" data-mixed-content="true">
                        <Clock className="w-4 h-4 inline mr-2" />
                        {quizQuestions.length} Questions
                      </div>
                      <div className="bg-white/10 px-4 py-2 rounded-full text-purple-200">
                        <Award className="w-4 h-4 inline mr-2" />
                        Earn Your Badge
                      </div>
                    </div>
                    <button onClick={startQuiz} className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-500 to-red-600 text-white px-10 py-4 rounded-full font-bold text-lg hover:shadow-xl hover:shadow-orange-500/30 transition-all transform hover:-translate-y-1">
                      Start Quiz
                      <ArrowRight className="w-5 h-5" />
                    </button>
                  </div> : quizActive && !quizComplete ?
              // Quiz Questions
              <div>
                    {/* Progress Bar */}
                    <div className="mb-8">
                      <div className="flex justify-between text-sm text-purple-200 mb-2">
                        <span data-mixed-content="true" data-mixed-content="true" data-mixed-content="true" data-mixed-content="true">Question {currentQuestion + 1} of {quizQuestions.length}</span>
                        <span data-mixed-content="true" data-mixed-content="true" data-mixed-content="true" data-mixed-content="true">Score: {score}/{currentQuestion + (showExplanation ? 1 : 0)}</span>
                      </div>
                      <div className="h-3 bg-white/20 rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-orange-500 to-red-600 transition-all duration-500" style={{
                      width: `${(currentQuestion + (showExplanation ? 1 : 0)) / quizQuestions.length * 100}%`
                    }} />
                      </div>
                    </div>

                    {/* Question */}
                    <div className="mb-8">
                      <h3 className="text-xl md:text-2xl font-bold text-white mb-6">
                        {quizQuestions[currentQuestion].question}
                      </h3>
                      
                      <div className="space-y-3">
                        {quizQuestions[currentQuestion].options.map((option, index) => {
                      const isSelected = selectedAnswer === index;
                      const isCorrect = index === quizQuestions[currentQuestion].correctAnswer;
                      const showResult = showExplanation;
                      let bgClass = 'bg-white/10 hover:bg-white/20 border-white/20';
                      if (showResult) {
                        if (isCorrect) {
                          bgClass = 'bg-green-500/30 border-green-500';
                        } else if (isSelected && !isCorrect) {
                          bgClass = 'bg-red-500/30 border-red-500';
                        }
                      } else if (isSelected) {
                        bgClass = 'bg-orange-500/30 border-orange-500';
                      }
                      return <button key={index} onClick={() => handleAnswerSelect(index)} disabled={showExplanation} className={`w-full text-left p-4 rounded-xl border-2 transition-all ${bgClass} ${!showExplanation ? 'cursor-pointer' : 'cursor-default'}`}>
                              <div className="flex items-center gap-3">
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${isSelected || showResult && isCorrect ? 'bg-white text-slate-800' : 'bg-white/20 text-white'}`}>
                                  {String.fromCharCode(65 + index)}
                                </div>
                                <span className="text-white font-medium">{option}</span>
                                {showResult && isCorrect && <CheckCircle className="w-5 h-5 text-green-400 ml-auto" />}
                                {showResult && isSelected && !isCorrect && <XCircle className="w-5 h-5 text-red-400 ml-auto" />}
                              </div>
                            </button>;
                    })}
                      </div>
                    </div>

                    {/* Explanation */}
                    {showExplanation && <div className={`p-4 rounded-xl mb-6 ${selectedAnswer === quizQuestions[currentQuestion].correctAnswer ? 'bg-green-500/20 border border-green-500/50' : 'bg-orange-500/20 border border-orange-500/50'}`}>
                        <p className="text-white">
                          <strong>{selectedAnswer === quizQuestions[currentQuestion].correctAnswer ? 'Correct!' : 'Not quite!'}</strong>{' '}
                          {quizQuestions[currentQuestion].explanation}
                        </p>
                      </div>}

                    {/* Action Buttons */}
                    <div className="flex justify-end gap-4">
                      {!showExplanation ? <button onClick={submitAnswer} disabled={selectedAnswer === null} className={`inline-flex items-center gap-2 px-8 py-3 rounded-full font-semibold transition-all ${selectedAnswer !== null ? 'bg-gradient-to-r from-orange-500 to-red-600 text-white hover:shadow-lg' : 'bg-white/20 text-white/50 cursor-not-allowed'}`}>
                          Submit Answer
                        </button> : <button onClick={nextQuestion} className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-500 to-red-600 text-white px-8 py-3 rounded-full font-semibold hover:shadow-lg transition-all">
                          {currentQuestion < quizQuestions.length - 1 ? 'Next Question' : 'See Results'}
                          <ArrowRight className="w-5 h-5" />
                        </button>}
                    </div>
                  </div> :
              // Quiz Results
              <div className="text-center py-8">
                    <div className={`w-24 h-24 rounded-3xl flex items-center justify-center mx-auto mb-6 ${score >= quizQuestions.length * 0.8 ? 'bg-gradient-to-br from-yellow-400 to-orange-500' : score >= quizQuestions.length * 0.5 ? 'bg-gradient-to-br from-blue-400 to-indigo-500' : 'bg-gradient-to-br from-slate-400 to-slate-500'}`}>
                      <Trophy className="w-12 h-12 text-white" />
                    </div>
                    
                    <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">
                      {score >= quizQuestions.length * 0.8 ? 'Factory Expert!' : score >= quizQuestions.length * 0.5 ? 'Good Progress!' : 'Keep Learning!'}
                    </h3>
                    
                    <p className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-500 mb-4" data-mixed-content="true" data-mixed-content="true" data-mixed-content="true" data-mixed-content="true">
                      {score} / {quizQuestions.length}
                    </p>
                    
                    <p className="text-purple-200 mb-6" data-mixed-content="true" data-mixed-content="true" data-mixed-content="true" data-mixed-content="true">
                      You scored {Math.round(score / quizQuestions.length * 100)}% on the Factory Inspector Quiz!
                    </p>

                    {/* Name Input for Leaderboard */}
                    {showNameInput && !scoreSaved && <div className="bg-white/10 rounded-xl p-6 mb-6 max-w-md mx-auto">
                        <h4 className="text-white font-bold mb-3">Save Your Score to the Leaderboard!</h4>
                        <div className="flex gap-3">
                          <input type="text" value={playerName} onChange={e => setPlayerName(e.target.value)} placeholder="Enter your name" className="flex-1 px-4 py-3 rounded-lg bg-white/20 text-white placeholder-white/50 border border-white/30 focus:outline-none focus:border-orange-500" maxLength={50} />
                          <button onClick={saveScore} disabled={!playerName.trim()} className="px-6 py-3 bg-gradient-to-r from-orange-500 to-red-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all disabled:opacity-50">
                            Save
                          </button>
                        </div>
                      </div>}

                    {scoreSaved && <div className="bg-green-500/20 border border-green-500/50 rounded-xl p-4 mb-6 max-w-md mx-auto">
                        <CheckCircle className="w-6 h-6 text-green-400 inline mr-2" />
                        <span className="text-green-300">Score saved to leaderboard!</span>
                      </div>}

                    {/* Departments to Study */}
                    {getWeakDepartments().length > 0 && <div className="bg-white/10 rounded-xl p-6 mb-8 text-left max-w-lg mx-auto">
                        <h4 className="text-white font-bold mb-4 flex items-center gap-2">
                          <Target className="w-5 h-5 text-orange-400" />
                          Departments to Study More:
                        </h4>
                        <div className="space-y-3">
                          {getWeakDepartments().map(({
                      department,
                      score: deptScore,
                      total
                    }) => department && <div key={department.id} className="flex items-center gap-3">
                              <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${department.color} flex items-center justify-center`}>
                                <department.icon className="w-5 h-5 text-white" />
                              </div>
                              <div className="flex-1">
                                <p className="text-white font-medium">{department.name}</p>
                                <p className="text-purple-300 text-sm" data-mixed-content="true" data-mixed-content="true" data-mixed-content="true" data-mixed-content="true">{deptScore}/{total} correct</p>
                              </div>
                              <button onClick={() => {
                        setQuizActive(false);
                        setQuizComplete(false);
                        openDepartmentModal(department.id);
                      }} className="text-orange-400 hover:text-orange-300 text-sm font-medium">
                                Review
                              </button>
                            </div>)}
                        </div>
                      </div>}

                    <button onClick={startQuiz} className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-500 to-red-600 text-white px-8 py-4 rounded-full font-bold hover:shadow-xl transition-all">
                      <RotateCcw className="w-5 h-5" />
                      Try Again
                    </button>
                  </div>}
              </div>
            </div>

            {/* Leaderboard */}
            <div className="lg:col-span-1">
              <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-6 border border-white/20 sticky top-24">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-xl flex items-center justify-center">
                    <Trophy className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white">Leaderboard</h3>
                </div>

                {loadingLeaderboard ? <div className="text-center py-8">
                    <div className="animate-spin w-8 h-8 border-2 border-white/30 border-t-orange-500 rounded-full mx-auto" />
                  </div> : leaderboard.length === 0 ? <div className="text-center py-8">
                    <Users className="w-12 h-12 text-white/30 mx-auto mb-3" />
                    <p className="text-purple-200">No scores yet. Be the first!</p>
                  </div> : <div className="space-y-3">
                    {leaderboard.map((entry, index) => <div key={entry.id} className={`flex items-center gap-3 p-3 rounded-xl ${index === 0 ? 'bg-yellow-500/20 border border-yellow-500/50' : index === 1 ? 'bg-slate-300/20 border border-slate-300/50' : index === 2 ? 'bg-orange-700/20 border border-orange-700/50' : 'bg-white/5'}`}>
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${index === 0 ? 'bg-yellow-500 text-yellow-900' : index === 1 ? 'bg-slate-300 text-slate-700' : index === 2 ? 'bg-orange-700 text-orange-100' : 'bg-white/20 text-white'}`}>
                          {index + 1}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-white font-medium truncate">{entry.player_name}</p>
                          <p className="text-purple-300 text-xs" data-mixed-content="true" data-mixed-content="true" data-mixed-content="true" data-mixed-content="true">{entry.score}/{entry.total_questions} correct</p>
                        </div>
                        <div className="text-right">
                          <p className="text-orange-400 font-bold" data-mixed-content="true" data-mixed-content="true" data-mixed-content="true" data-mixed-content="true">{Math.round(entry.percentage)}%</p>
                          {index < 3 && <Star className={`w-4 h-4 ${index === 0 ? 'text-yellow-400' : index === 1 ? 'text-slate-300' : 'text-orange-600'}`} />}
                        </div>
                      </div>)}
                  </div>}

                <button onClick={fetchLeaderboard} className="w-full mt-4 py-2 text-purple-300 hover:text-white text-sm font-medium transition-colors">
                  <RotateCcw className="w-4 h-4 inline mr-2" />
                  Refresh
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Facts Section */}
      <section id="facts" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-block text-orange-500 font-semibold text-sm uppercase tracking-wider mb-3">
                Amazing Facts
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-6">
                Your Body is More Amazing Than Any Factory
              </h2>
              <div className="space-y-4">
                {['Your body produces 25 million new cells every second', 'The human brain can store 2.5 petabytes of information', 'Your nose can detect over 1 trillion different scents', 'Nerve impulses travel at speeds of up to 250 mph', 'Your body has enough iron to make a 3-inch nail', 'The acid in your stomach can dissolve razor blades'].map((fact, index) => <div key={index} className="flex items-start gap-3 p-4 bg-slate-50 rounded-xl hover:bg-orange-50 transition-colors">
                    <div className="w-6 h-6 bg-gradient-to-br from-orange-500 to-red-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <p className="text-slate-700">{fact}</p>
                  </div>)}
              </div>
            </div>
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-orange-500 to-red-600 rounded-3xl blur-2xl opacity-20" />
              <div className="relative grid grid-cols-2 gap-4">
                <img src={IMAGES.brain} alt="Brain" className="rounded-2xl shadow-lg" />
                <img src={IMAGES.heart} alt="Heart" className="rounded-2xl shadow-lg mt-8" />
                <img src={IMAGES.lungs} alt="Lungs" className="rounded-2xl shadow-lg -mt-4" />
                <img src={IMAGES.liver} alt="Liver" className="rounded-2xl shadow-lg mt-4" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <span className="inline-block text-orange-500 font-semibold text-sm uppercase tracking-wider mb-3">
              About Us
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-6">
              Making Anatomy Fun & Accessible
            </h2>
            <p className="text-lg text-slate-600 mb-8">
              The Human Factory was created to help people of all ages understand how their bodies work 
              through the familiar concept of a factory. By comparing organs to factory departments, 
              we make complex biological processes easy to understand and remember.
            </p>
            <p className="text-lg text-slate-600 mb-8">
              Whether you're a student, teacher, parent, or just curious about how your body works, 
              The Human Factory provides engaging, accurate, and memorable content that brings 
              human anatomy to life.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <div className="bg-white px-6 py-4 rounded-xl shadow-sm">
                <div className="text-3xl font-bold text-orange-500">50K+</div>
                <div className="text-slate-600">Monthly Visitors</div>
              </div>
              <div className="bg-white px-6 py-4 rounded-xl shadow-sm">
                <div className="text-3xl font-bold text-orange-500">100+</div>
                <div className="text-slate-600">Educational Resources</div>
              </div>
              <div className="bg-white px-6 py-4 rounded-xl shadow-sm">
                <div className="text-3xl font-bold text-orange-500">12</div>
                <div className="text-slate-600">Body Systems Covered</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact / Newsletter Section */}
      <section id="contact" className="py-20 bg-gradient-to-br from-orange-500 to-red-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Sign Up To Hear Dr. Rick Explain The Human Factory</h2>
            <p className="text-lg text-white/90 mb-8">Dr. Rick will show you how the human factory works and what you need to   do to your "factory" for optimal health. Sign up today to learn more. </p>
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Enter your email" className="flex-1 px-6 py-4 rounded-full text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-4 focus:ring-white/30" required />
              <button type="submit" className="bg-slate-900 text-white px-8 py-4 rounded-full font-semibold hover:bg-slate-800 transition-colors">Sign Up</button>
              <input type="hidden" name="list" value="12345678" />
            </form>

            {subscribed && <div className="mt-4 text-white font-medium animate-pulse">
                Thanks for subscribing! Check your inbox soon.
              </div>}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-600 rounded-lg flex items-center justify-center">
                  <Factory className="w-6 h-6 text-white" />
                </div>
                <div>
                  <span className="text-xl font-bold">The Human</span>
                  <span className="text-xl font-bold text-orange-500">Factory</span>
                </div>
              </div>
              <p className="text-slate-400 mb-4">
                Making human anatomy fun and accessible through the factory analogy.
              </p>
              <div className="flex gap-4">
                {['facebook', 'twitter', 'instagram', 'youtube'].map(social => <a key={social} href={`https://${social}.com/thehumanfactory`} target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-slate-800 rounded-lg flex items-center justify-center hover:bg-orange-500 transition-colors">
                    <span className="sr-only">{social}</span>
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C6.477 2 2 6.477 2 12c0 5.523 4.477 10 10 10s10-4.477 10-10c0-5.523-4.477-10-10-10z" />
                    </svg>
                  </a>)}
              </div>
            </div>

            <div>
              <h4 className="font-bold text-lg mb-4">Quick Links</h4>
              <ul className="space-y-3">
                {['Home', 'Departments', 'Quiz', 'Facts', 'About'].map(link => <li key={link}>
                    <button onClick={() => scrollToSection(link.toLowerCase())} className="text-slate-400 hover:text-orange-500 transition-colors">
                      {link}
                    </button>
                  </li>)}
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-lg mb-4">Resources</h4>
              <ul className="space-y-3">
                {['Educational Materials', 'Teacher Resources', 'Student Guides', 'Printable Diagrams', 'Video Library'].map(link => <li key={link}>
                    <a href="#" className="text-slate-400 hover:text-orange-500 transition-colors">
                      {link}
                    </a>
                  </li>)}
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-lg mb-4">Contact Us</h4>
              <ul className="space-y-3">
                <li className="flex items-center gap-3 text-slate-400">
                  <Mail className="w-5 h-5 text-orange-500" />
                  info@thehumanfactory.org
                </li>
                <li className="flex items-center gap-3 text-slate-400"><Phone className="w-5 h-5 text-orange-500" />(920) 737-9310</li>
                <li className="flex items-start gap-3 text-slate-400 text-left"><MapPin className="w-5 h-5 text-orange-500 flex-shrink-0" /><br />1203 W Mason Street 
Green Bay, WI 54303</li>
              </ul>
            </div>
          </div>

          <div className="border-t border-slate-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-slate-400 text-sm">
              © 2026 The Human Factory. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm">
              <a href="#" className="text-slate-400 hover:text-orange-500 transition-colors">Privacy Policy</a>
              <a href="#" className="text-slate-400 hover:text-orange-500 transition-colors">Terms of Service</a>
              <a href="#" className="text-slate-400 hover:text-orange-500 transition-colors">Cookie Policy</a>
            </div>
          </div>
        </div>
      </footer>

      {/* Department Modal */}
      {selectedDept && <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={closeDepartmentModal} />
          <div className="relative bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
            <button onClick={closeDepartmentModal} className="absolute top-4 right-4 w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center hover:bg-slate-200 transition-colors z-10">
              <X className="w-5 h-5 text-slate-600" />
            </button>
            
            <div className={`relative h-64 bg-gradient-to-br ${selectedDept.color}`}>
              <img src={selectedDept.image} alt={selectedDept.organ} className="w-full h-full object-cover mix-blend-overlay" />
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/60 to-transparent">
                <span className="text-white/80 text-sm font-medium uppercase tracking-wider">
                  {selectedDept.factoryRole}
                </span>
                <h3 className="text-3xl font-bold text-white">{selectedDept.name}</h3>
                <p className="text-white/90" data-mixed-content="true" data-mixed-content="true" data-mixed-content="true" data-mixed-content="true">The {selectedDept.organ}</p>
              </div>
            </div>
            
            <div className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className={`w-12 h-12 bg-gradient-to-br ${selectedDept.color} rounded-xl flex items-center justify-center`}>
                  <selectedDept.icon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-800">Factory Role</h4>
                  <p className="text-slate-600">{selectedDept.factoryRole}</p>
                </div>
              </div>
              
              <p className="text-slate-700 text-lg mb-6">{selectedDept.description}</p>
              
              <div className="bg-orange-50 rounded-xl p-4 border border-orange-100">
                <h4 className="font-bold text-orange-600 mb-2">Fun Fact!</h4>
                <p className="text-slate-700">{selectedDept.funFact}</p>
              </div>
              
              <button onClick={closeDepartmentModal} className="mt-6 w-full bg-gradient-to-r from-orange-500 to-red-600 text-white py-3 rounded-xl font-semibold hover:shadow-lg transition-shadow">
                Close
              </button>
            </div>
          </div>
        </div>}

      {/* Auth Modal */}
      {authModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setAuthModalOpen(false)} />
          <div className="relative bg-white rounded-3xl max-w-md w-full shadow-2xl overflow-hidden">
            {/* Modal Header */}
            <div className="relative bg-gradient-to-r from-orange-500 to-red-600 p-6 text-center">
              <button 
                onClick={() => setAuthModalOpen(false)} 
                className="absolute top-4 right-4 w-8 h-8 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
              >
                <X className="w-4 h-4 text-white" />
              </button>
              <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                {authMode === 'signin' ? <LogIn className="w-8 h-8 text-white" /> : <User className="w-8 h-8 text-white" />}
              </div>
              <h3 className="text-2xl font-bold text-white">
                {authMode === 'signin' ? 'Welcome Back!' : 'Create Account'}
              </h3>
              <p className="text-white/80 mt-1">
                {authMode === 'signin' ? 'Sign in to continue your journey' : 'Join The Human Factory today'}
              </p>
            </div>

            {/* Modal Body */}
            <div className="p-6">
              {/* Auth Mode Toggle */}
              <div className="flex bg-slate-100 rounded-xl p-1 mb-6">
                <button
                  onClick={() => setAuthMode('signin')}
                  className={`flex-1 py-2.5 rounded-lg font-medium transition-all ${
                    authMode === 'signin' 
                      ? 'bg-white text-slate-800 shadow-sm' 
                      : 'text-slate-500 hover:text-slate-700'
                  }`}
                >
                  Sign In
                </button>
                <button
                  onClick={() => setAuthMode('signup')}
                  className={`flex-1 py-2.5 rounded-lg font-medium transition-all ${
                    authMode === 'signup' 
                      ? 'bg-white text-slate-800 shadow-sm' 
                      : 'text-slate-500 hover:text-slate-700'
                  }`}
                >
                  Sign Up
                </button>
              </div>

              {/* Error Message */}
              {authError && (
                <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl flex items-center gap-2 text-red-600">
                  <XCircle className="w-5 h-5 flex-shrink-0" />
                  <span className="text-sm">{authError}</span>
                </div>
              )}

              {/* Success Message */}
              {authSuccess && (
                <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-xl flex items-center gap-2 text-green-600">
                  <CheckCircle className="w-5 h-5 flex-shrink-0" />
                  <span className="text-sm">{authSuccess}</span>
                </div>
              )}

              {/* Auth Form */}
              <form onSubmit={handleAuth} className="space-y-4">
                {authMode === 'signup' && (
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1.5">Full Name</label>
                    <input
                      type="text"
                      value={authName}
                      onChange={(e) => setAuthName(e.target.value)}
                      placeholder="Enter your full name"
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all"
                    />
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Email Address</label>
                  <input
                    type="email"
                    value={authEmail}
                    onChange={(e) => setAuthEmail(e.target.value)}
                    placeholder="Enter your email"
                    required
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Password</label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={authPassword}
                      onChange={(e) => setAuthPassword(e.target.value)}
                      placeholder="Enter your password"
                      required
                      minLength={6}
                      className="w-full px-4 py-3 pr-12 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-slate-600"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                  {authMode === 'signup' && (
                    <p className="text-xs text-slate-500 mt-1">Password must be at least 6 characters</p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={authLoading}
                  className="w-full bg-gradient-to-r from-orange-500 to-red-600 text-white py-3.5 rounded-xl font-semibold hover:shadow-lg hover:shadow-orange-500/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {authLoading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      {authMode === 'signin' ? <LogIn className="w-5 h-5" /> : <User className="w-5 h-5" />}
                      {authMode === 'signin' ? 'Sign In' : 'Create Account'}
                    </>
                  )}
                </button>
              </form>

              <p className="text-center text-sm text-slate-500 mt-6">
                {authMode === 'signin' ? (
                  <>
                    Don't have an account?{' '}
                    <button onClick={() => setAuthMode('signup')} className="text-orange-500 font-medium hover:underline">
                      Sign up
                    </button>
                  </>
                ) : (
                  <>
                    Already have an account?{' '}
                    <button onClick={() => setAuthMode('signin')} className="text-orange-500 font-medium hover:underline">
                      Sign in
                    </button>
                  </>
                )}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>;
};
export default AppLayout;
