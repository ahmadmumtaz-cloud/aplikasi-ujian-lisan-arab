
import React from 'react';
import { Users, BookCheck, ClipboardList, TrendingUp, Trophy } from 'lucide-react';
import { StatCard } from '../components/StatCard';
import { Student } from '../types';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface DashboardProps {
  students: Student[];
}

export const Dashboard: React.FC<DashboardProps> = ({ students }) => {
  const totalStudents = students.length;
  const gradedStudents = students.filter(s => {
      const total = (Object.values(s.scores) as number[]).reduce((a, b) => a + b, 0);
      return total > 0;
  }).length;
  
  const pendingStudents = totalStudents - gradedStudents;
  
  const subjects = ['muhadatsah', 'mutholaah', 'nahwu', 'shorof', 'tarjamah'];
  const chartData = subjects.map(sub => {
    const totalScore = students.reduce((acc, curr) => acc + (curr.scores[sub as keyof typeof curr.scores] || 0), 0);
    const count = gradedStudents || 1; 
    return {
      name: sub.charAt(0).toUpperCase() + sub.slice(1),
      avg: Math.round(totalScore / count),
    };
  });

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
            <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Dashboard Ikhtisar</h1>
            <p className="text-gray-500 mt-1">Pantau perkembangan ujian lisan kelas 5C secara real-time.</p>
        </div>
        <div className="px-4 py-2 bg-white rounded-full border border-gray-200 shadow-sm text-sm font-medium text-emerald-800 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            Status: Sistem Online
        </div>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Total Santri" value={totalStudents} icon={Users} color="blue" />
        <StatCard title="Sudah Dinilai" value={gradedStudents} icon={BookCheck} color="emerald" />
        <StatCard title="Belum Dinilai" value={pendingStudents} icon={ClipboardList} color="amber" />
        <StatCard title="Progress Total" value={`${Math.round((gradedStudents/totalStudents) * 100)}%`} icon={TrendingUp} color="purple" />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Chart Section */}
        <div className="lg:col-span-2 glass-panel p-8">
          <div className="flex items-center justify-between mb-8">
            <div>
                <h3 className="text-lg font-bold text-gray-800">Rata-rata Nilai per Materi</h3>
                <p className="text-sm text-gray-500">Analisis penguasaan materi santri</p>
            </div>
            <div className="p-2 bg-gray-50 rounded-lg">
                <Trophy className="w-5 h-5 text-amber-500" />
            </div>
          </div>
          
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} margin={{ top: 20, right: 30, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorAvg" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0.1}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis 
                    dataKey="name" 
                    fontSize={12} 
                    tickLine={false} 
                    axisLine={false} 
                    tick={{fill: '#64748b', fontWeight: 500}}
                    dy={10}
                />
                <YAxis 
                    fontSize={12} 
                    tickLine={false} 
                    axisLine={false} 
                    tick={{fill: '#64748b'}} 
                    domain={[0, 100]} 
                />
                <Tooltip 
                  cursor={{fill: '#f8fafc'}}
                  contentStyle={{ 
                    borderRadius: '12px', 
                    border: 'none', 
                    boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)',
                    backgroundColor: 'rgba(255, 255, 255, 0.95)',
                    padding: '12px'
                  }}
                  itemStyle={{ color: '#047857', fontWeight: 'bold' }}
                />
                <Bar 
                    dataKey="avg" 
                    fill="url(#colorAvg)" 
                    radius={[6, 6, 0, 0]} 
                    barSize={50} 
                    animationDuration={1500}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Progress Section */}
        <div className="glass-panel p-8 flex flex-col h-full">
          <h3 className="text-lg font-bold text-gray-800 mb-2">Progres Kelompok</h3>
          <p className="text-sm text-gray-500 mb-6">Status penyelesaian ujian per grup</p>
          
          <div className="space-y-5 flex-1">
             {['A', 'B', 'C'].map((group, idx) => {
                 const count = students.filter(s => s.group === group).length;
                 const graded = students.filter(s => s.group === group && (Object.values(s.scores) as number[]).reduce((a, b) => a+b, 0) > 0).length;
                 const percent = Math.round((graded/count) * 100);
                 
                 const colors = [
                    'from-blue-500 to-cyan-500',
                    'from-purple-500 to-violet-500',
                    'from-amber-500 to-orange-500'
                 ];

                 return (
                    <div key={group} className="bg-white/50 border border-white rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow">
                        <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center gap-3">
                                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${colors[idx]} text-white flex items-center justify-center font-bold text-lg shadow-md`}>
                                    {group}
                                </div>
                                <div>
                                    <p className="font-bold text-gray-800">Kelompok {group}</p>
                                    <p className="text-xs text-gray-500 font-medium">{graded} dari {count} selesai</p>
                                </div>
                            </div>
                            <span className="text-lg font-bold text-gray-700">{percent}%</span>
                        </div>
                        <div className="w-full h-2.5 bg-gray-100 rounded-full overflow-hidden">
                            <div 
                                className={`h-full bg-gradient-to-r ${colors[idx]} rounded-full transition-all duration-1000 ease-out`} 
                                style={{ width: `${percent}%`}}
                            ></div>
                        </div>
                    </div>
                 );
             })}
          </div>
        </div>
      </div>
    </div>
  );
};
