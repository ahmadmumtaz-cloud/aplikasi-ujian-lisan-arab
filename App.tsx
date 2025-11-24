
import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Sidebar } from './components/Sidebar';
import { Dashboard } from './pages/Dashboard';
import { StudentList } from './pages/StudentList';
import { Grading } from './pages/Grading';
import { ExportView } from './pages/ExportView';
import { QuestionBank } from './pages/QuestionBank';
import { BackupRestore } from './pages/BackupRestore';
import { INITIAL_STUDENTS } from './constants';
import { Student } from './types';
import { GraduationCap, ArrowRight, Calendar, Menu } from 'lucide-react';

function App() {
  // Central State Management
  // Load from localStorage to persist data across refreshes
  // Key updated to force refresh with new data containing scores
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

  // Check local storage for auth details on load
  useEffect(() => {
    const savedName = localStorage.getItem('examinerName');
    const savedDate = localStorage.getItem('examDate');
    
    if (savedName) {
        setExaminerName(savedName);
        if (savedDate) setExamDate(savedDate);
        setIsLoggedIn(true);
    } else {
        // Set default date to today for the login form
        setTempDate(new Date().toISOString().split('T')[0]);
    }
  }, []);

  // Persist students data whenever it changes
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
    // We keep the date in localStorage as convenience
  };

  if (!isLoggedIn) {
      return (
          <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
              <div className="max-w-md w-full bg-white rounded-2xl shadow-xl overflow-hidden">
                  <div className="bg-emerald-600 p-8 text-center">
                      <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4 backdrop-blur-sm">
                          <GraduationCap className="w-10 h-10 text-white" />
                      </div>
                      <h1 className="text-2xl font-bold text-white mb-2">Sistem Ujian Lisan</h1>
                      <p className="text-emerald-100">Al-Ghozali Modern Islamic Boarding School</p>
                  </div>
                  <div className="p-8">
                      <form onSubmit={handleLogin} className="space-y-6">
                          <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                  Masukkan Nama Penguji
                              </label>
                              <input 
                                  type="text" 
                                  required
                                  placeholder="Contoh: Ust. Abdullah"
                                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all outline-none"
                                  value={tempName}
                                  onChange={(e) => setTempName(e.target.value)}
                              />
                          </div>
                          <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                  Tanggal Ujian
                              </label>
                              <div className="relative">
                                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Calendar className="h-5 w-5 text-gray-400" />
                                  </div>
                                  <input 
                                      type="date" 
                                      required
                                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all outline-none"
                                      value={tempDate}
                                      onChange={(e) => setTempDate(e.target.value)}
                                  />
                              </div>
                          </div>
                          <button 
                              type="submit" 
                              className="w-full bg-emerald-600 text-white py-3 rounded-lg font-bold hover:bg-emerald-700 transition flex items-center justify-center gap-2 group"
                          >
                              Masuk Aplikasi <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                          </button>
                      </form>
                      <p className="mt-6 text-center text-xs text-gray-400">
                          &copy; 2025 IT Division - PM Al Ghozali
                      </p>
                  </div>
              </div>
          </div>
      );
  }

  return (
    <HashRouter>
      <div className="flex min-h-screen bg-gray-50">
        
        <Sidebar 
            examinerName={examinerName} 
            onLogout={handleLogout}
            isOpen={isSidebarOpen}
            onClose={() => setIsSidebarOpen(false)}
        />
        
        {/* Main Content Area */}
        <div className="flex-1 flex flex-col min-w-0 md:ml-64 transition-all duration-300">
            
            {/* Mobile Header */}
            <div className="md:hidden bg-white border-b border-gray-200 p-4 sticky top-0 z-30 flex items-center gap-3 shadow-sm">
                <button 
                    onClick={() => setIsSidebarOpen(true)}
                    className="p-2 -ml-2 text-gray-600 hover:bg-gray-100 rounded-lg"
                >
                    <Menu className="w-6 h-6" />
                </button>
                <div className="flex items-center gap-2">
                    <div className="w-7 h-7 bg-emerald-600 rounded-md flex items-center justify-center">
                        <GraduationCap className="w-4 h-4 text-white" />
                    </div>
                    <span className="font-bold text-gray-800">Al-Ghozali</span>
                </div>
            </div>

            <main className="flex-1 p-4 md:p-8 overflow-y-auto">
                <Routes>
                    <Route path="/" element={<Dashboard students={students} />} />
                    <Route path="/students" element={<StudentList students={students} setStudents={setStudents} currentExaminer={examinerName} />} />
                    <Route path="/questions" element={<QuestionBank />} />
                    <Route path="/grading" element={<Grading students={students} setStudents={setStudents} examinerName={examinerName} />} />
                    <Route path="/export" element={<ExportView students={students} setStudents={setStudents} currentExaminer={examinerName} examDate={examDate} />} />
                    <Route path="/settings" element={<BackupRestore students={students} setStudents={setStudents} />} />
                    <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
            </main>
        </div>
      </div>
    </HashRouter>
  );
}

export default App;
