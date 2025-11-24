import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Users, BookOpen, PenTool, ClipboardList, FileText, LogOut, X } from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
  onLogout: () => void;
  currentExaminer: string;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, toggleSidebar, onLogout, currentExaminer }) => {
  const menuItems = [
    { path: '/', icon: <LayoutDashboard size={20} />, label: 'Dashboard' },
    { path: '/students', icon: <Users size={20} />, label: 'Data Santri' },
    { path: '/questions', icon: <BookOpen size={20} />, label: 'Bank Soal' },
    { path: '/grading', icon: <PenTool size={20} />, label: 'Penilaian' },
    { path: '/scoresheet', icon: <ClipboardList size={20} />, label: 'Lembar Penilaian' },
    { path: '/reports', icon: <FileText size={20} />, label: 'Cetak Laporan' },
  ];

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={toggleSidebar}
        />
      )}

      {/* Sidebar Container */}
      <aside 
        className={`fixed md:static inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200 transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="p-6 border-b border-gray-100 flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">G</span>
              </div>
              <span className="font-bold text-lg text-gray-800">Al-Ghozali</span>
            </div>
            <button 
              onClick={toggleSidebar} 
              className="md:hidden text-gray-500 hover:text-gray-700 transition-colors"
            >
              <X size={24} />
            </button>
          </div>

          {/* Navigation Menu */}
          <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
            {menuItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    isActive
                      ? 'bg-blue-600 text-white shadow-sm'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-blue-600'
                  }`
                }
                onClick={() => {
                  // Tutup sidebar otomatis di mobile saat menu diklik
                  if (window.innerWidth < 768) {
                    toggleSidebar();
                  }
                }}
              >
                {item.icon}
                <span className="font-medium">{item.label}</span>
              </NavLink>
            ))}
          </nav>

          {/* Footer / User Profile */}
          <div className="p-4 border-t border-gray-100 bg-white">
            <div className="bg-gray-50 rounded-lg p-4 mb-3 border border-gray-100">
              <p className="text-xs font-semibold text-blue-600 uppercase tracking-wider mb-1">
                Penguji Aktif
              </p>
              <p className="font-bold text-gray-800 truncate text-sm" title={currentExaminer}>
                {currentExaminer || 'Tamu'}
              </p>
            </div>
            
            <button
              onClick={onLogout}
              className="w-full flex items-center justify-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 hover:text-red-700 rounded-lg transition-colors font-medium text-sm border border-transparent hover:border-red-100"
            >
              <LogOut size={18} />
              <span>Keluar Sistem</span>
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;