
import React, { useState } from 'react';
import { SUBJECTS, QuestionDetail } from '../types';
import { QUESTION_BANK, MUTHOLAAH_MATERIALS } from '../constants';
import { Book, ChevronRight, CheckSquare, MessageCircle, Globe, ChevronDown, ChevronUp, BookOpen } from 'lucide-react';

export const QuestionBank: React.FC = () => {
  const [activeTab, setActiveTab] = useState(SUBJECTS[0].key);
  const [openMaterialIndex, setOpenMaterialIndex] = useState<number | null>(null);
  
  const activeQuestions = QUESTION_BANK[activeTab];

  const toggleMaterial = (index: number) => {
    setOpenMaterialIndex(openMaterialIndex === index ? null : index);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between">
        <div>
            <h1 className="text-2xl font-bold text-gray-900">Bank Soal</h1>
            <p className="text-gray-500">Daftar pertanyaan ujian lisan per materi</p>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden min-h-[600px] flex flex-col">
        {/* Tabs */}
        <div className="flex border-b border-gray-100 overflow-x-auto scrollbar-hide">
            {SUBJECTS.map(subject => (
                <button
                    key={subject.key}
                    onClick={() => {
                        setActiveTab(subject.key);
                        setOpenMaterialIndex(null);
                    }}
                    className={`px-6 py-4 text-sm font-medium whitespace-nowrap transition-colors border-b-2 ${
                        activeTab === subject.key 
                        ? 'border-emerald-600 text-emerald-600 bg-emerald-50/50' 
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                    }`}
                >
                    {subject.label}
                </button>
            ))}
        </div>

        {/* Content */}
        <div className="p-4 md:p-8 flex-1 flex flex-col">
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-emerald-100 rounded-lg text-emerald-600">
                        <Book className="w-6 h-6" />
                    </div>
                    <div>
                        <h2 className="text-lg font-bold text-gray-900">
                            Soal {SUBJECTS.find(s => s.key === activeTab)?.label}
                        </h2>
                        <p className="text-sm text-gray-500">
                            {SUBJECTS.find(s => s.key === activeTab)?.description}
                        </p>
                    </div>
                </div>
                <div className="flex items-center gap-2 bg-emerald-50 px-4 py-2 rounded-full w-fit">
                    <CheckSquare className="w-4 h-4 text-emerald-600" />
                    <span className="text-sm font-bold text-emerald-800">{activeQuestions.length} Soal Tersedia</span>
                </div>
            </div>

            {/* MUTHOLAAH READING MATERIALS SECTION */}
            {activeTab === 'mutholaah' && (
                <div className="mb-8 space-y-4">
                    <h3 className="font-bold text-gray-800 flex items-center gap-2">
                        <BookOpen className="w-5 h-5 text-emerald-600" /> Materi Bacaan (Nosh)
                    </h3>
                    <div className="grid grid-cols-1 gap-3">
                        {MUTHOLAAH_MATERIALS.map((material, idx) => (
                            <div key={idx} className="border border-gray-200 rounded-lg overflow-hidden bg-gray-50">
                                <button 
                                    onClick={() => toggleMaterial(idx)}
                                    className="w-full flex items-center justify-between p-4 bg-white hover:bg-gray-50 transition text-left"
                                >
                                    <div>
                                        <span className="text-sm font-bold text-emerald-700">{material.title}</span>
                                        <p className="font-arabic text-lg font-bold text-gray-800 mt-1">{material.titleArabic}</p>
                                    </div>
                                    {openMaterialIndex === idx ? (
                                        <ChevronUp className="w-5 h-5 text-gray-400" />
                                    ) : (
                                        <ChevronDown className="w-5 h-5 text-gray-400" />
                                    )}
                                </button>
                                {openMaterialIndex === idx && (
                                    <div className="p-4 md:p-6 bg-white border-t border-gray-200">
                                        <p className="font-arabic text-lg md:text-xl leading-loose text-gray-800 text-justify dir-rtl" style={{ direction: 'rtl' }}>
                                            {material.content}
                                        </p>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* QUESTIONS LIST */}
            <div className="flex-1 overflow-y-auto max-h-[600px] pr-2">
                <div className="grid grid-cols-1 gap-4">
                    {activeQuestions.map((item, index) => {
                        const isDetail = typeof item !== 'string';
                        const questionText = isDetail ? (item as QuestionDetail).question : (item as string);
                        const translation = isDetail ? (item as QuestionDetail).translation : null;
                        const answer = isDetail ? (item as QuestionDetail).answer : null;

                        return (
                            <div key={index} className="flex gap-4 p-4 md:p-5 border border-gray-100 rounded-xl bg-gray-50 hover:bg-white hover:border-emerald-200 hover:shadow-md transition-all group">
                                <div className="flex-shrink-0">
                                    <div className="w-8 h-8 bg-white border border-gray-200 group-hover:border-emerald-300 rounded-full flex items-center justify-center font-bold text-gray-500 group-hover:text-emerald-600 text-sm shadow-sm transition-colors">
                                        {index + 1}
                                    </div>
                                </div>
                                <div className="flex-1 space-y-3 min-w-0">
                                    {/* Question */}
                                    <div className="relative">
                                        <p className="text-gray-900 font-bold text-xl font-arabic leading-loose dir-rtl break-words" style={{ direction: 'rtl', textAlign: 'right' }}>
                                            {questionText}
                                        </p>
                                        {translation && (
                                            <p className="text-gray-500 text-sm mt-1 italic flex items-center gap-1 justify-end flex-wrap">
                                                {translation} <Globe className="w-3 h-3 flex-shrink-0" />
                                            </p>
                                        )}
                                    </div>

                                    {/* Answer Box */}
                                    {answer && (
                                        <div className="mt-3 bg-emerald-50/80 border border-emerald-100 rounded-lg p-3">
                                            <div className="flex items-start gap-2">
                                                <MessageCircle className="w-4 h-4 text-emerald-600 mt-1 flex-shrink-0" />
                                                <div className="flex-1 text-right">
                                                    <span className="text-xs font-bold text-emerald-700 uppercase mb-1 block text-left">Jawaban:</span>
                                                    <p className="text-emerald-900 font-medium font-arabic text-lg dir-rtl break-words" style={{ direction: 'rtl' }}>
                                                        {answer}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};
