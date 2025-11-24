
import React from 'react';
import { Users, BookCheck, ClipboardList, TrendingUp } from 'lucide-react';
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
  
  // Calculate average per subject for chart
  const subjects = ['muhadatsah', 'mutholaah', 'nahwu', 'shorof', 'tarjamah'];
  const chartData = subjects.map(sub => {
    const totalScore = students.reduce((acc, curr) => acc + (curr.scores[sub as keyof typeof curr.scores] || 0), 0);
    // Avoid division by zero, assume un-graded students shouldn't drag down average significantly for visualization unless we want strict true average
    // Here we calculate average only based on graded students to show performance
    const count = gradedStudents || 1; 
    return {
      name: sub.charAt(0).toUpperCase() + sub.slice(1),
      avg: Math.round(totalScore / count),
    };
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard Ikhtisar</h1>
        <p className="text-gray-500">Overview Ujian Lisan Kelas 5C</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Total Santri" value={totalStudents} icon={Users} color="blue" />
        <StatCard title="Sudah Dinilai" value={gradedStudents} icon={BookCheck} color="emerald" />
        <StatCard title="Belum Dinilai" value={pendingStudents} icon={ClipboardList} color="amber" />
        <StatCard title="Progress" value={`${Math.round((gradedStudents/totalStudents) * 100)}%`} icon={TrendingUp} color="purple" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
          <h3 className="font-semibold text-gray-800 mb-6">Rata-rata Nilai per Materi</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis fontSize={12} tickLine={false} axisLine={false} domain={[0, 100]} />
                <Tooltip 
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                />
                <Bar dataKey="avg" fill="#059669" radius={[4, 4, 0, 0]} barSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
          <h3 className="font-semibold text-gray-800 mb-4">Informasi Kelompok Ujian</h3>
          <div className="space-y-4">
             {['A', 'B', 'C'].map(group => {
                 const count = students.filter(s => s.group === group).length;
                 const graded = students.filter(s => s.group === group && (Object.values(s.scores) as number[]).reduce((a, b) => a+b, 0) > 0).length;
                 return (
                    <div key={group} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
                                {group}
                            </div>
                            <div>
                                <p className="font-medium text-gray-900">Kelompok {group}</p>
                                <p className="text-sm text-gray-500">{count} Santri</p>
                            </div>
                        </div>
                        <div className="text-right">
                            <p className="text-sm font-medium text-gray-900">{graded}/{count} Selesai</p>
                            <div className="w-24 h-2 bg-gray-200 rounded-full mt-1 overflow-hidden">
                                <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${(graded/count)*100}%`}}></div>
                            </div>
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
