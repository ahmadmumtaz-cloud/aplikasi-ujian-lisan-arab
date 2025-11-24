import React from 'react';
import { LayoutDashboard, Users, BookOpen, Printer, GraduationCap, FileQuestion, LogOut, X, Database, Sparkles } from 'lucide-react';

interface SidebarProps {
    examinerName: string;
    onLogout: () => void;
    isOpen: boolean;
    onClose: () => void;
    currentPath: string;
}

export const Sidebar: React.FC<SidebarProps> = ({ examinerName, onLogout, isOpen, onClose, currentPath }) => {
  const getNavClass = (isActive: boolean) =>
    `group flex items-center justify-between px-4 py-3.5 mx-3 mb-2 text-sm font-medium rounded-xl transition-all duration-300 relative overflow-hidden ${
      isActive
        ? 'bg-gradient-to-r from-amber-400 to-amber-500 text-emerald-950 shadow-lg shadow-amber-500/20 translate-x-1'
        : 'text-emerald-100/60 hover:bg-white/5 hover:text-white'
    }`;

  const NavItem = ({ to, icon: Icon, label }: { to: string, icon: any, label: string }) => {
      const isActive = currentPath === to;
      return (
        <a href={`#${to}`} onClick={onClose} className={getNavClass(isActive)}>
            <div className="flex items-center gap-3">
                <Icon className="w-5 h-5" />
                <span>{label}</span>
            </div>
        </a>
      );
  };

  return (
    <>
      {/* Mobile Backdrop Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-emerald-950/80 z-40 md:hidden backdrop-blur-sm transition-opacity"
          onClick={onClose}
        />
      )}

      {/* Sidebar Container */}
      <aside 
        className={`
          fixed top-0 left-0 z-50 h-screen w-[280px] 
          bg-gradient-to-b from-emerald-900 via-emerald-950 to-black
          border-r border-white/5
          transform transition-transform duration-300 ease-in-out flex flex-col
          md:translate-x-0 md:static md:inset-auto md:h-screen md:flex
          ${isOpen ? 'translate-x-0 shadow-2xl' : '-translate-x-full'}
          no-print
        `}
      >
        {/* Background Decorations */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-amber-500/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 pointer-events-none"></div>

        {/* Header Section */}
        <div className="p-8 pb-8 relative z-10 text-center border-b border-white/5">
            <div className="inline-flex relative mb-4">
                <div className="absolute inset-0 bg-amber-400 blur-lg opacity-20 rounded-full animate-pulse"></div>
                <div className="w-16 h-16 bg-gradient-to-tr from-emerald-400 to-teal-300 rounded-2xl flex items-center justify-center shadow-xl shadow-emerald-500/20 ring-4 ring-emerald-900/50 relative z-10">
                    <GraduationCap className="w-9 h-9 text-emerald-950" />
                </div>
            </div>
            <div>
                <h1 className="text-2xl font-bold text-white tracking-tight font-arabic">الغزالي</h1>
                <div className="flex items-center justify-center gap-2 mt-1">
                    <div className="h-[1px] w-4 bg-amber-500/50"></div>
                    <p className="text-[10px] text-amber-400 font-bold uppercase tracking-[0.2em]">Islamic School</p>
                    <div className="h-[1px] w-4 bg-amber-500/50"></div>
                </div>
            </div>
            {/* Close Button for Mobile */}
            <button 
                onClick={onClose} 
                className="absolute top-4 right-4 md:hidden p-1 rounded-full text-emerald-300 hover:bg-white/10 transition-colors"
            >
                <X className="w-6 h-6" />
            </button>
        </div>

        {/* Navigation */}
        <nav className="px-2 py-6 space-y-1 flex-1 overflow-y-auto custom-scrollbar relative z-10">
          <p className="px-6 text-[10px] font-bold text-emerald-500 uppercase tracking-widest mb-3">Menu Utama</p>
          
          <NavItem to="/" icon={LayoutDashboard} label="Dashboard" />
          <NavItem to="/students" icon={Users} label="Data Santri" />
          <NavItem to="/questions" icon={FileQuestion} label="Bank Soal" />
          <NavItem to="/grading" icon={BookOpen} label="Penilaian Ujian" />

          <p className="px-6 text-[10px] font-bold text-emerald-500 uppercase tracking-widest mb-3 mt-8">Laporan & Sistem</p>
          
          <NavItem to="/export" icon={Printer} label="Cetak Laporan" />
          <NavItem to="/settings" icon={Database} label="Database Backup" />
        </nav>
        
        {/* User Profile */}
        <div className="p-4 relative z-10 bg-emerald-950/50">
            <div className="bg-emerald-900/40 backdrop-blur-md rounded-xl p-4 border border-white/5">
                <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-amber-400 to-orange-500 flex items-center justify-center text-white font-bold text-sm shadow-lg border-2 border-emerald-900">
                        {examinerName.charAt(0)}
                    </div>
                    <div className="overflow-hidden">
                        <p className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider mb-0.5 flex items-center gap-1">
                            <Sparkles className="w-3 h-3" /> Penguji
                        </p>
                        <p className="text-sm text-white font-medium truncate leading-tight" title={examinerName}>{examinerName}</p>
                    </div>
                </div>
                <button 
                    onClick={onLogout}
                    className="w-full flex items-center justify-center gap-2 px-3 py-2 bg-red-500/10 hover:bg-red-500/20 text-red-200 text-xs font-medium rounded-lg transition-all border border-red-500/20 hover:border-red-500/40 group"
                >
                    <LogOut className="w-3.5 h-3.5