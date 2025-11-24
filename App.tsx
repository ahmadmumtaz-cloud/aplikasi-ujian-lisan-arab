import React, { useState, useEffect } from 'react';
import { Sidebar } from './components/Sidebar';
import { Dashboard } from './pages/Dashboard';
import { StudentList } from './pages/StudentList';
import { Grading } from './pages/Grading';
import { ExportView } from './pages/ExportView';
import { QuestionBank } from './pages/QuestionBank';
import { BackupRestore } from './pages/BackupRestore';
import { INITIAL_STUDENTS } from './constants';
import { Student } from './types';
import { GraduationCap, Calendar, Menu, Bell } from 'lucide-react';

function App() {
  // Central State Management
  const [students, setStudents] = useState<Student[]>(() => {
    const saved = localStorage.getItem('alghozali_students_5c_updated');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (error) {
        console.error('Error parsing local storage:', error);
        return INITIAL_STUDENTS;
      }
    }
    return INITIAL_STUDENTS;
  });
  
  // Auth & Config State
  const [examinerName, setExaminerName] = useState<string>('');
  const [examDate, setExamDate] = useState<string>(''); // Format YYYY-MM-DD
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  
  // Mobile Sidebar State
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
  // Temp state for login form
  const [tempName, setTempName] = useState('');
  const [tempDate, setTempDate] = useState('');

  // Router State
  const [currentPath, setCurrentPath] = useState(window.location.hash.replace(/^#/, '') || '/');

  // Listen to hash changes
  useEffect(() => {
    const handleHashChange = () => {
      setCurrentPath(window.location.hash.replace(/^#/, '') || '/');
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Check local storage for auth details on load
  useEffect(() => {
    const savedName = localStorage.getItem('examinerName');
    const savedDate = localStorage.getItem('examDate');
    
    if (savedName) {
        setExaminerName(savedName);
        if (savedDate) setExamDate(savedDate);
        setIsLoggedIn(true);
    } else {
        setTempDate(new Date().toISOString().split('T')[0]);
    }
  }, []);

  // Persist students data
  useEffect(() => {
    localStorage.setItem('alghozali_students_5c_updated', JSON.stringify(students));
  }, [students]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (tempName.trim()) {
        const name = tempName.trim();
        setExaminerName(name);
        setExamDate(tempDate);
        setIsLoggedIn(true);
        localStorage.setItem('examinerName', name);
        localStorage.setItem('examDate', tempDate);
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setExaminerName('');
    setTempName('');
    localStorage.removeItem('examinerName');
  };

  // Helper for Header Title
  const TopHeader = () => {
    const getTitle = () => {
        switch(currentPath) {
            case '/': return 'Dashboard Ikhtisar';
            case '/students': return 'Manajemen Santri';
            case '/questions': return 'Bank Soal Digital';
            case '/grading': return 'Penilaian Ujian Lisan';
            case '/export': return 'Pusat Laporan';
            case '/settings': return 'Pengaturan & Backup';
            default: return 'Sistem Ujian';
        }
    };

    return (
        <header className="glass-header px-8 py-4 flex items-center justify-between no-print">
            <div className="flex items-center gap-4">
                <button 
                    onClick={() => setIsSidebarOpen(true)}
                    className="md:hidden p-2 text-emerald-700 hover:bg-emerald-50 rounded-lg transition-colors"
                >
                    <Menu className="w-6 h-6" />
                </button>
                <div>
                    <h2 className="text-xl font-bold text-gray-800 tracking-tight">{getTitle()}</h2>
                    <p className="text-xs text-gray-500 font-medium hidden md:block">
                        Tahun Ajaran 2024/2025 • Semester Genap
                    </p>
                </div>
            </div>
            <div className="flex items-center gap-6">
                <div className="hidden md:flex items-center gap-2 bg-emerald-50 px-3 py-1.5 rounded-full border border-emerald-100">
                    <Calendar className="w-4 h-4 text-emerald-600" />
                    <span className="text-sm font-semibold text-emerald-800">{new Date(examDate).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric'})}</span>
                </div>
                <div className="relative cursor-pointer hover:bg-gray-100 p-2 rounded-full transition-colors">
                    <Bell className="w-5 h-5 text-gray-500" />
                    <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
                </div>
            </div>
        </header>
    );
  };

  const renderContent = () => {
    switch(currentPath) {
        case '/': return <Dashboard students={students} />;
        case '/students': return <StudentList students={students} setStudents={setStudents} currentExaminer={examinerName} />;
        case '/questions': return <QuestionBank />;
        case '/grading': return <Grading students={students} setStudents={setStudents} examinerName={examinerName} />;
        case '/export': return <ExportView students={students} setStudents={setStudents} currentExaminer={examinerName} examDate={examDate} />;
        case '/settings': return <BackupRestore students={students} setStudents={setStudents} />;
        default: return <Dashboard students={students} />;
    }
  };

  if (!isLoggedIn) {
      return (
          <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-center p-4 relative overflow-hidden">
              {/* Login Background */}
              <div className="absolute inset-0 overflow-hidden">
                  <div className="absolute -top-[20%] -left-[10%] w-[700px] h-[700px] bg-emerald-500/20 rounded-full blur-[120px] mix-blend-screen"></div>
                  <div className="absolute bottom-[0%] right-[0%] w-[600px] h-[600px] bg-amber-500/10 rounded-full blur-[100px] mix-blend-screen"></div>
              </div>

              <div className="max-w-md w-full bg-white/5 backdrop-blur-2xl rounded-3xl shadow-2xl overflow-hidden relative z-10 border border-white/10 ring-1 ring-white/10">
                  <div className="p-10 text-center relative">
                      <div className="w-24 h-24 bg-gradient-to-tr from-emerald-400 to-teal-500 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-2xl shadow-emerald-500/30 rotate-3">
                          <GraduationCap className="w-12 h-12 text-white" />
                      </div>
                      <h1 className="text-3xl font-bold text-white mb-2 tracking-tight">Sistem Ujian Lisan</h1>
                      <p className="text-emerald-100/60 font-medium">PM Al-Ghozali Modern School</p>
                  </div>
                  <div className="p-8 bg-white rounded-t-3xl shadow-inner">
                      <form onSubmit={handleLogin} className="space-y-5">
                          <div>
                              <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Nama Penguji</label>
                              <input 
                                  type="text" 
                                  required
                                  placeholder="Masukkan nama lengkap..."
                                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 transition-all outline-none bg-gray-50 font-medium text-gray-800"
                                  value={tempName}
                                  onChange={(e) => setTempName(e.target.value)}
                              />
                          </div>
                          <div>
                              <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Tanggal Pelaksanaan</label>
                              <input 
                                  type="date" 
                                  required
                                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 transition-all outline-none bg-gray-50 font-medium text-gray-800"
                                  value={tempDate}
                                  onChange={(e) => setTempDate(e.target.value)}
                              />
                          </div>
                          <button 
                              type="submit" 
                              className="w-full bg-emerald-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-emerald-700 hover:shadow-lg hover:shadow-emerald-500/30 hover:-translate-y-0.5 transition-all duration-200"
                          >
                              Masuk Aplikasi
                          </button>
                      </form>
                  </div>
              </div>
              <p className="mt-8 text-white/20 text-xs font-medium">Designed for Excellence © 2025</p>
          </div>
      );
  }

  return (
      <div className="flex min-h-screen bg-mesh bg-grid-pattern text-slate-800 font-sans selection:bg-emerald-200 selection:text-emerald-900">
        
        <Sidebar 
            examinerName={examinerName} 
            onLogout={handleLogout}
            isOpen={isSidebarOpen}
            onClose={() => setIsSidebarOpen(false)}
            currentPath={currentPath}
        />
        
        {/* Main Content Wrapper */}
        <div className="flex-1 flex flex-col min-w-0 md:ml-[280px] transition-all duration-300 relative">
            <TopHeader />
            <main className="flex-1 p-4 md:p-8 overflow-y-auto max-w-[1600px] mx-auto w-full custom-scrollbar">
                {renderContent()}
            </main>
        </div>
      </div>
  );
}

export default App;