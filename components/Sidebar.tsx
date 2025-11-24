
import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Users, BookOpen, Printer, GraduationCap, FileQuestion, LogOut, X, Database } from 'lucide-react';

interface SidebarProps {
    examinerName: string;
    onLogout: () => void;
    isOpen: boolean;
    onClose: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ examinerName, onLogout, isOpen, onClose }) => {
  const navClass = ({ isActive }: { isActive: boolean }) =>
    `flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
      isActive
        ? 'bg-emerald-600 text-white'
        : 'text-gray-600 hover:bg-emerald-50 hover:text-emerald-700'
    }`;

  return (
    <>
      {/* Mobile Backdrop Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden backdrop-blur-sm transition-opacity"
          onClick={onClose}
        />
      )}

      {/* Sidebar Container */}
      <aside 
        className={`
          fixed top-0 left-0 z-50 h-screen w-64 bg-white border-r border-gray-200 
          transform transition-transform duration-300 ease-in-out flex flex-col
          md:translate-x-0 md:static md:inset-auto md:h-screen md:flex
          ${isOpen ? 'translate-x-0 shadow-2xl' : '-translate-x-full'}
          no-print
        `}
      >
        <div className="p-6 border-b border-gray-100 flex items-center justify-between">
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center flex-shrink-0">
                <GraduationCap className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-800">Al-Ghozali</span>
            </div>
            <p className="text-xs text-gray-500 mt-1 pl-10">Sistem Ujian Lisan</p>
          </div>
          
          {/* Close Button for Mobile */}
          <button 
            onClick={onClose} 
            className="md:hidden p-1 rounded-md text-gray-500 hover:bg-gray-100"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <nav className="p-4 space-y-1 flex-1 overflow-y-auto custom-scrollbar">
          <NavLink to="/" onClick={onClose} className={navClass}>
            <LayoutDashboard className="w-5 h-5 flex-shrink-0" />
            Dashboard
          </NavLink>
          <NavLink to="/students" onClick={onClose} className={navClass}>
            <Users className="w-5 h-5 flex-shrink-0" />
            Data Santri
          </NavLink>
          <NavLink to="/questions" onClick={onClose} className={navClass}>
            <FileQuestion className="w-5 h-5 flex-shrink-0" />
            Bank Soal
          </NavLink>
          <NavLink to="/grading" onClick={onClose} className={navClass}>
            <BookOpen className="w-5 h-5 flex-shrink-0" />
            Penilaian
          </NavLink>
          <NavLink to="/export" onClick={onClose} className={navClass}>
            <Printer className="w-5 h-5 flex-shrink-0" />
            Cetak Laporan
          </NavLink>
          <div className="pt-4 mt-4 border-t border-gray-100">
             <NavLink to="/settings" onClick={onClose} className={navClass}>
                <Database className="w-5 h-5 flex-shrink-0" />
                Database Backup
            </NavLink>
          </div>
        </nav>
        
        <div className="p-6 border-t border-gray-100 bg-white">
          <div className="bg-emerald-50 p-4 rounded-lg mb-3">
            <p className="text-xs font-semibold text-emerald-800 uppercase">Status Penguji</p>
            <p className="text-sm text-emerald-600 mt-1 font-bold truncate" title={examinerName}>{examinerName}</p>
            <p className="text-xs text-emerald-500">Kelas 5C</p>
          </div>
          <button 
              onClick={onLogout}
              className="w-full flex items-center justify-center gap-2 text-sm text-gray-500 hover:text-red-600 transition-colors py-2"
          >
              <LogOut className="w-4 h-4" /> Keluar
          </button>
        </div>
      </aside>
    </>
  );
};
