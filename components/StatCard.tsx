
import React from 'react';
import { LucideIcon } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  color: 'emerald' | 'blue' | 'amber' | 'purple';
}

export const StatCard: React.FC<StatCardProps> = ({ title, value, icon: Icon, color }) => {
  const styles = {
    emerald: { 
        gradient: 'from-emerald-500 to-teal-400', 
        bg: 'bg-emerald-50',
        text: 'text-emerald-600',
        border: 'border-emerald-200',
        glow: 'shadow-emerald-500/20'
    },
    blue: { 
        gradient: 'from-blue-500 to-cyan-400', 
        bg: 'bg-blue-50',
        text: 'text-blue-600',
        border: 'border-blue-200',
        glow: 'shadow-blue-500/20'
    },
    amber: { 
        gradient: 'from-amber-400 to-orange-400', 
        bg: 'bg-amber-50',
        text: 'text-amber-600',
        border: 'border-amber-200',
        glow: 'shadow-amber-500/20'
    },
    purple: { 
        gradient: 'from-purple-500 to-violet-400', 
        bg: 'bg-purple-50',
        text: 'text-purple-600',
        border: 'border-purple-200',
        glow: 'shadow-purple-500/20'
    },
  };

  const style = styles[color];

  return (
    <div className={`glass-card p-6 relative overflow-hidden group hover:-translate-y-1 hover:shadow-2xl transition-all duration-300 border-t-4 ${style.border.replace('border-', 'border-t-')}`}>
      <div className="relative z-10 flex justify-between items-start">
        <div>
          <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">{title}</p>
          <h3 className="text-4xl font-black text-gray-800 tracking-tight">{value}</h3>
        </div>
        
        <div className={`
            w-14 h-14 rounded-2xl bg-gradient-to-br ${style.gradient} 
            flex items-center justify-center text-white shadow-lg ${style.glow}
            group-hover:scale-110 group-hover:rotate-3 transition-all duration-300
        `}>
          <Icon className="w-7 h-7" />
        </div>
      </div>
      
      {/* Decorative Background Icon */}
      <Icon className={`absolute -right-4 -bottom-4 w-32 h-32 ${style.text} opacity-[0.07] group-hover:opacity-[0.12] transition-opacity rotate-12`} />
    </div>
  );
};
