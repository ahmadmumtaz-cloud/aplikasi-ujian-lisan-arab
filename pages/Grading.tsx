
import React, { useState } from 'react';
import { Student, SUBJECTS, Score } from '../types';
import { QUESTION_BANK } from '../constants';
import { Search, CheckSquare, Save, Filter, AlertCircle, CheckCircle2, AlertTriangle, Calculator } from 'lucide-react';

interface GradingProps {
  students: Student[];
  setStudents: React.Dispatch<React.SetStateAction<Student[]>>;
  examinerName: string;
}

export const Grading: React.FC<GradingProps> = ({ students, setStudents, examinerName }) => {
  const [activeSubject, setActiveSubject] = useState<keyof Score>('muhadatsah');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterGroup, setFilterGroup] = useState<string>('All');

  const activeQuestions = QUESTION_BANK[activeSubject];
  const MIN_QUESTIONS = 10; // Target minimal soal per siswa

  // Handle Score Update
  const handleScoreChange = (studentId: string, value: string) => {
    const numValue = Math.min(100, Math.max(0, Number(value) || 0));
    setStudents(prev => prev.map(s => 
      s.id === studentId 
        ? { 
            ...s, 
            scores: { ...s.scores, [activeSubject]: numValue },
            examiner: examinerName // Auto update examiner when grading
          } 
        : s
    ));
  };

  // Handle Checklist Toggle
  const toggleQuestionLog = (studentId: string, questionIndex: number) => {
    setStudents(prev => prev.map(s => {
      if (s.id === studentId) {
        const currentLogs = s.questionLog[activeSubject] || [];
        const newLogs = currentLogs.includes(questionIndex)
            ? currentLogs.filter(idx => idx !== questionIndex)
            : [...currentLogs, questionIndex].sort((a, b) => a - b);
        
        return {
            ...s,
            questionLog: {
                ...s.questionLog,
                [activeSubject]: newLogs
            },
            examiner: examinerName // Auto update examiner when checking questions
        };
      }
      return s;
    }));
  };

  // Filter Logic
  const filteredStudents = students.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          student.nis.includes(searchTerm);
    const matchesGroup = filterGroup === 'All' || student.group === filterGroup;
    return matchesSearch && matchesGroup;
  });

  return (
    <div className="space-y-6 pb-20">
      {/* Header & Controls */}
      <div className="flex flex-col xl:flex-row justify-between items-start xl:items-center gap-4">
        <div>
            <h1 className="text-2xl font-bold text-gray-900">Lembar Penilaian & Ceklis</h1>
            <p className="text-gray-500 text-sm">
                Penguji Aktif: <span className="font-bold text-emerald-600">{examinerName}</span>
            </p>
        </div>
        
        <div className="w-full xl:w-auto flex flex-col sm:flex-row gap-3 bg-white p-3 rounded-lg border border-gray-200 shadow-sm">
             <div className="relative w-full sm:w-auto">
                <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Cari Santri..."
                  className="pl-9 pr-4 py-2 text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-emerald-500 w-full sm:w-64"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>
            <div className="relative w-full sm:w-auto">
                <Filter className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
                <select 
                    className="pl-9 pr-4 py-2 text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-emerald-500 bg-white w-full sm:w-auto"
                    value={filterGroup}
                    onChange={(e) => setFilterGroup(e.target.value)}
                >
                    <option value="All">Semua Kelompok</option>
                    <option value="A">Kelompok A</option>
                    <option value="B">Kelompok B</option>
                    <option value="C">Kelompok C</option>
                </select>
            </div>
        </div>
      </div>

      {/* Subject Tabs */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="flex overflow-x-auto border-b border-gray-200 scrollbar-hide">
            {SUBJECTS.map(subject => (
                <button
                    key={subject.key}
                    onClick={() => setActiveSubject(subject.key)}
                    className={`flex-shrink-0 px-6 py-4 text-sm font-bold uppercase tracking-wider transition-all border-b-2 whitespace-nowrap ${
                        activeSubject === subject.key 
                        ? 'border-emerald-500 text-emerald-600 bg-emerald-50' 
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                    }`}
                >
                    {subject.label}
                </button>
            ))}
        </div>

        {/* Main Table */}
        <div className="overflow-x-auto w-full">
            <table className="w-full min-w-[1000px] lg:min-w-[1200px]">
                <thead>
                    <tr className="bg-gray-50 text-left">
                        <th className="px-4 py-3 text-xs font-bold text-gray-500 uppercase w-12 text-center border-r border-gray-200">No</th>
                        <th className="px-4 py-3 text-xs font-bold text-gray-500 uppercase w-64 border-r border-gray-200">Nama Santri</th>
                        <th className="px-4 py-3 text-xs font-bold text-gray-500 uppercase w-32 border-r border-gray-200">Penguji</th>
                        <th className="px-4 py-3 text-xs font-bold text-gray-500 uppercase border-r border-gray-200">
                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                                <span>Ceklis Nomor Soal (Total: {activeQuestions.length})</span>
                                <span className="text-[10px] normal-case bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full border border-amber-200 w-fit">
                                    Target: 10 Soal/Siswa
                                </span>
                            </div>
                        </th>
                        <th className="px-4 py-3 text-xs font-bold text-gray-500 uppercase w-24 text-center border-r border-gray-200">
                            Nilai <br/> <span className="text-[10px]">{SUBJECTS.find(s => s.key === activeSubject)?.label}</span>
                        </th>
                        <th className="px-4 py-3 text-xs font-bold text-gray-700 uppercase w-20 text-center border-r border-gray-200 bg-gray-100">
                            Total
                        </th>
                        <th className="px-4 py-3 text-xs font-bold text-gray-700 uppercase w-20 text-center bg-gray-100">
                            Rata²
                        </th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                    {filteredStudents.length > 0 ? (
                        filteredStudents.map((student, index) => {
                            const logs = student.questionLog[activeSubject] || [];
                            const score = student.scores[activeSubject];
                            const hasScore = score > 0;
                            const isTargetMet = logs.length >= MIN_QUESTIONS;
                            
                            // Perhitungan Otomatis
                            const totalAllScores = (Object.values(student.scores) as number[]).reduce((a, b) => a + b, 0);
                            const averageScore = totalAllScores / 5;
                            
                            // Progress bar calculation based on 10 questions
                            const progressPercent = Math.min(100, (logs.length / MIN_QUESTIONS) * 100);

                            return (
                                <tr key={student.id} className={`hover:bg-gray-50 transition-colors ${hasScore && isTargetMet ? 'bg-emerald-50/30' : ''}`}>
                                    <td className="px-4 py-4 text-sm text-center text-gray-500 border-r border-gray-200 font-mono">
                                        {student.no}
                                    </td>
                                    <td className="px-4 py-4 border-r border-gray-200">
                                        <p className="font-semibold text-gray-900">{student.name}</p>
                                        <div className="flex items-center gap-2 mt-1">
                                            <span className="text-xs text-gray-500 font-mono bg-gray-100 px-1.5 py-0.5 rounded">{student.nis}</span>
                                            <span className={`text-[10px] px-1.5 py-0.5 rounded font-medium border ${
                                                student.group === 'A' ? 'bg-blue-50 text-blue-600 border-blue-100' :
                                                student.group === 'B' ? 'bg-purple-50 text-purple-600 border-purple-100' :
                                                'bg-amber-50 text-amber-600 border-amber-100'
                                            }`}>
                                                Kel. {student.group}
                                            </span>
                                        </div>
                                    </td>
                                    <td className="px-4 py-4 border-r border-gray-200 text-sm text-gray-600">
                                        <span className={student.examiner === examinerName ? 'font-bold text-emerald-700' : ''}>
                                            {student.examiner}
                                        </span>
                                    </td>
                                    <td className="px-4 py-3 border-r border-gray-200">
                                        {/* Questions Grid */}
                                        <div className="flex flex-wrap gap-1.5 max-h-32 overflow-y-auto pr-2 custom-scrollbar">
                                            {activeQuestions.map((_, qIdx) => {
                                                const isChecked = logs.includes(qIdx);
                                                return (
                                                    <button
                                                        key={qIdx}
                                                        onClick={() => toggleQuestionLog(student.id, qIdx)}
                                                        className={`
                                                            w-7 h-7 flex items-center justify-center text-[10px] font-bold rounded border transition-all
                                                            ${isChecked 
                                                                ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm' 
                                                                : 'bg-white text-gray-400 border-gray-200 hover:border-emerald-400 hover:text-emerald-500'
                                                            }
                                                        `}
                                                        title={`Soal No. ${qIdx + 1}`}
                                                    >
                                                        {qIdx + 1}
                                                    </button>
                                                );
                                            })}
                                        </div>
                                        
                                        {/* Progress Bar Target 10 */}
                                        <div className="mt-2 flex items-center gap-3">
                                            <div className="h-2 flex-1 bg-gray-100 rounded-full overflow-hidden border border-gray-200">
                                                <div 
                                                    className={`h-full transition-all duration-500 ${isTargetMet ? 'bg-emerald-500' : 'bg-amber-500'}`}
                                                    style={{ width: `${progressPercent}%` }} 
                                                />
                                            </div>
                                            <div className={`flex items-center gap-1 min-w-[60px] justify-end ${isTargetMet ? 'text-emerald-700' : 'text-amber-600'}`}>
                                                {isTargetMet ? <CheckCircle2 className="w-3 h-3" /> : <AlertTriangle className="w-3 h-3" />}
                                                <span className="text-xs font-bold">{logs.length}/{MIN_QUESTIONS}</span>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-4 py-3 text-center border-r border-gray-200 bg-white">
                                        <input
                                            type="number"
                                            min="0"
                                            max="100"
                                            value={score || ''}
                                            onChange={(e) => handleScoreChange(student.id, e.target.value)}
                                            className={`
                                                w-20 text-center font-bold text-lg py-1 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-colors
                                                ${hasScore ? 'border-emerald-500 text-emerald-700 bg-white' : 'border-gray-200 bg-gray-50'}
                                            `}
                                            placeholder="0"
                                        />
                                    </td>
                                    {/* Kolom Total Otomatis */}
                                    <td className="px-4 py-3 text-center font-bold text-gray-700 border-r border-gray-200 bg-gray-50">
                                        {totalAllScores > 0 ? totalAllScores : '-'}
                                    </td>
                                    {/* Kolom Rata-rata Otomatis */}
                                    <td className="px-4 py-3 text-center font-bold text-gray-700 bg-gray-50">
                                        {totalAllScores > 0 ? averageScore.toFixed(1) : '-'}
                                    </td>
                                </tr>
                            );
                        })
                    ) : (
                        <tr>
                            <td colSpan={7} className="p-8 text-center text-gray-400">
                                <AlertCircle className="w-12 h-12 mx-auto mb-2 text-gray-300" />
                                <p>Tidak ada data santri yang sesuai filter.</p>
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
      </div>
      
      {/* Legend / Helper */}
      <div className="bg-emerald-50 border border-emerald-100 rounded-lg p-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-start gap-3">
            <CheckSquare className="w-5 h-5 text-emerald-600 mt-0.5 flex-shrink-0" />
            <div className="text-sm text-emerald-900">
                <p className="font-bold">Panduan Pengisian:</p>
                <ul className="list-disc list-inside mt-1 space-y-0.5 text-emerald-800">
                    <li>Klik nomor soal untuk menandai. <b>Minimal 10 soal</b> per santri.</li>
                    <li>Isi nilai (0-100) pada kolom Nilai. <b>Total & Rata-rata</b> akan terhitung otomatis.</li>
                </ul>
            </div>
        </div>
        <div className="flex items-center gap-2 text-sm text-emerald-700 font-medium whitespace-nowrap">
            <Calculator className="w-4 h-4" />
            Auto-Calculate Active
        </div>
      </div>
    </div>
  );
};
