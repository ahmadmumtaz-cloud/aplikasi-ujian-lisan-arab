import React, { useState } from 'react';
import { Student } from '../types';
import { FileText, Users, Layers, Edit, Trash2, Plus, X, Save } from 'lucide-react';

interface ExportViewProps {
  students: Student[];
  setStudents: React.Dispatch<React.SetStateAction<Student[]>>;
  currentExaminer: string;
  examDate: string;
}

export const ExportView: React.FC<ExportViewProps> = ({ students, setStudents, currentExaminer, examDate }) => {
  const [filterGroup, setFilterGroup] = useState<string>('All');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentStudent, setCurrentStudent] = useState<Partial<Student>>({});

  // Filter Logic
  const filteredStudents = students.filter(student => 
    filterGroup === 'All' ? true : student.group === filterGroup
  );

  // CRUD OPERATIONS
  const handleDelete = (id: string) => {
    if (confirm('Yakin ingin menghapus data santri ini dari laporan?')) {
        setStudents(prev => prev.filter(s => s.id !== id));
    }
  };

  const handleEdit = (student: Student) => {
    setCurrentStudent({ ...student });
    setIsModalOpen(true);
  };

  const handleAddNew = () => {
    setCurrentStudent({
        id: '',
        name: '',
        nis: '',
        class: '5C',
        group: filterGroup === 'All' ? 'A' : filterGroup as 'A'|'B'|'C',
        gender: 'L',
        examiner: currentExaminer,
        scores: { muhadatsah: 0, mutholaah: 0, nahwu: 0, shorof: 0, tarjamah: 0 },
        questionLog: { muhadatsah: [], mutholaah: [], nahwu: [], shorof: [], tarjamah: [] }
    });
    setIsModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentStudent.id) {
        // Update existing
        setStudents(prev => prev.map(s => s.id === currentStudent.id ? { ...s, ...currentStudent } as Student : s));
    } else {
        // Create new
        const newStudent = {
            ...currentStudent,
            id: Date.now().toString(),
            no: students.length + 1
        } as Student;
        setStudents(prev => [...prev, newStudent]);
    }
    setIsModalOpen(false);
  };

  const updateScore = (subject: keyof Student['scores'], value: string) => {
    if (!currentStudent.scores) return;
    const numValue = Math.min(100, Math.max(0, parseInt(value) || 0));
    setCurrentStudent({
        ...currentStudent,
        scores: {
            ...currentStudent.scores,
            [subject]: numValue
        }
    });
  };

  // Dynamic Title & Filename
  const reportTitle = filterGroup === 'All' 
    ? 'Materi : Bahasa Arab – Kelas 5C' 
    : `Materi : Bahasa Arab – Kelas 5C (Kelompok ${filterGroup})`;
  
  const fileNameSuffix = filterGroup === 'All' ? 'Semua' : `Kelompok_${filterGroup}`;

  // Format Date Function (Indonesia)
  const getFormattedDate = (dateString: string) => {
    if (!dateString) return '......................';
    const date = new Date(dateString);
    return date.toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });
  };

  const formattedDate = getFormattedDate(examDate);

  const handleExportWord = () => {
    const tableRows = filteredStudents.map((student, index) => {
        const total = (Object.values(student.scores) as number[]).reduce((a, b) => a + b, 0);
        const avg = total / 5;
        return `
            <tr>
                <td style="text-align: center;">${index + 1}</td>
                <td style="text-align: left; padding-left: 5px;">${student.name}</td>
                <td style="text-align: center;">${student.scores.muhadatsah || ''}</td>
                <td style="text-align: center;">${student.scores.mutholaah || ''}</td>
                <td style="text-align: center;">${student.scores.nahwu || ''}</td>
                <td style="text-align: center;">${student.scores.shorof || ''}</td>
                <td style="text-align: center;">${student.scores.tarjamah || ''}</td>
                <td style="text-align: center; font-weight: bold; background-color: #f9fafb;">${total > 0 ? total : ''}</td>
                <td style="text-align: center; font-weight: bold; background-color: #f9fafb;">${total > 0 ? avg.toFixed(1) : ''}</td>
            </tr>
        `;
    }).join('');

    const content = `
      <html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
      <head>
        <meta charset="utf-8">
        <title>Laporan Ujian Lisan</title>
        <style>
          /* Page Setup for Legal Portrait with 1.8cm Margin */
          @page {
            size: 21.59cm 35.56cm; /* Legal Size */
            margin: 1.8cm 1.8cm 1.8cm 1.8cm;
            mso-page-orientation: portrait;
          }
          body { font-family: 'Times New Roman', serif; font-size: 11pt; }
          .arabic { font-family: 'Traditional Arabic', 'Amiri', serif; }
          table { border-collapse: collapse; width: 100%; margin-top: 15px; }
          th, td { border: 1px solid black; padding: 4px; font-size: 11pt; }
          th { background-color: #f2f2f2; font-weight: bold; text-align: center; vertical-align: middle; }
          .header { text-align: center; margin-bottom: 20px; }
          .title-arabic { font-size: 20pt; font-weight: bold; margin: 0; }
          .subtitle-arabic { font-size: 16pt; margin: 5px 0; }
          .meta-info-container { text-align: center; margin-top: 15px; }
          .meta-info { font-weight: bold; text-transform: uppercase; border-bottom: 1px solid black; padding-bottom: 5px; display: inline-block; font-size: 12pt; }
          .footer { margin-top: 50px; text-align: right; }
          .signature-box { display: inline-block; text-align: center; width: 250px; }
        </style>
      </head>
      <body>
        <div class="header">
           <p class="arabic title-arabic" dir="rtl">دفتر النتيجة للإمتحان الشفهي</p>
           <p class="arabic subtitle-arabic" dir="rtl">معهد الغزالي العصري للتربية الإسلامية الحديثة</p>
           <div class="meta-info-container">
             <span class="meta-info">${reportTitle}</span>
           </div>
        </div>
        
        <table>
            <thead>
                <tr>
                    <th width="5%">No</th>
                    <th width="35%">NAMA PESERTA</th>
                    <th width="10%">Muhadatsah</th>
                    <th width="10%">Muttholaa'h</th>
                    <th width="10%">Nahwu</th>
                    <th width="10%">Shorof</th>
                    <th width="10%">Tarjamah</th>
                    <th width="5%">Total</th>
                    <th width="5%">Rata2</th>
                </tr>
            </thead>
            <tbody>
                ${tableRows}
            </tbody>
        </table>

        <div class="footer">
            <div class="signature-box">
                <p>Gunungsindur, ${formattedDate}</p>
                <p>Penguji:</p>
                <br><br><br><br>
                <p style="border-bottom: 1px solid black;">( ${currentExaminer || '......................'} )</p>
            </div>
        </div>
      </body>
      </html>
    `;

    const blob = new Blob(['\ufeff', content], { type: 'application/msword' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Laporan_Ujian_Lisan_5C_${fileNameSuffix}_${examDate}.doc`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <div>
            <h1 className="text-2xl font-bold text-gray-900">Cetak Laporan</h1>
            <p className="text-gray-500">Preview Layout Legal Portrait</p>
        </div>
        
        <div className="flex gap-2 w-full md:w-auto">
            <button
                onClick={handleAddNew}
                className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-emerald-600 text-white px-4 py-2.5 rounded-lg hover:bg-emerald-700 transition shadow-sm font-medium"
            >
                <Plus className="w-5 h-5" /> Tambah Data
            </button>
            <button 
                onClick={handleExportWord}
                className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-blue-700 text-white px-6 py-2.5 rounded-lg hover:bg-blue-800 transition shadow-sm font-medium"
            >
                <FileText className="w-5 h-5" /> Export ke Word
            </button>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="bg-white p-1 rounded-lg border border-gray-200 inline-flex flex-wrap gap-1 w-full md:w-auto">
        <button
            onClick={() => setFilterGroup('All')}
            className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all flex-1 md:flex-none justify-center ${
                filterGroup === 'All' 
                ? 'bg-emerald-600 text-white shadow-sm' 
                : 'bg-transparent text-gray-600 hover:bg-gray-100'
            }`}
        >
            <Users className="w-4 h-4" /> Semua Kelas
        </button>
        {['A', 'B', 'C'].map((group) => (
            <button
                key={group}
                onClick={() => setFilterGroup(group)}
                className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all flex-1 md:flex-none justify-center ${
                    filterGroup === group 
                    ? 'bg-emerald-600 text-white shadow-sm' 
                    : 'bg-transparent text-gray-600 hover:bg-gray-100'
                }`}
            >
                <Layers className="w-4 h-4" /> Kelompok {group}
            </button>
        ))}
      </div>

      {/* Preview Area Container - Styled to look like Legal Paper in Portrait */}
      <div className="w-full overflow-x-auto bg-gray-100 p-4 md:p-8 rounded-xl border border-gray-200">
        <div 
            className="mx-auto bg-white shadow-lg relative print:shadow-none print:w-full"
            style={{ 
                width: '21.59cm', 
                minHeight: '35.56cm',
                padding: '1.8cm'
            }}
        >
            {/* Header Arabic */}
            <div className="text-center mb-4 space-y-1">
                <h1 className="text-2xl font-bold font-arabic">دفتر النتيجة للإمتحان الشفهي</h1>
                <h2 className="text-xl font-arabic">معهد الغزالي العصري للتربية الإسلامية الحديثة</h2>
                <div className="flex justify-center items-center mt-3 border-b-2 border-black pb-2 w-full">
                    <h3 className="text-base font-bold uppercase tracking-wide">{reportTitle}</h3>
                </div>
            </div>

            {/* Table */}
            <table className="w-full border-collapse border border-black text-sm">
                <thead>
                    <tr className="bg-gray-100">
                        <th className="border border-black px-1 py-1.5 text-center w-8">No</th>
                        <th className="border border-black px-2 py-1.5 text-left">NAMA PESERTA</th>
                        <th className="border border-black px-1 py-1.5 text-center w-[11%]">Muhadatsah</th>
                        <th className="border border-black px-1 py-1.5 text-center w-[11%]">Muttholaa'h</th>
                        <th className="border border-black px-1 py-1.5 text-center w-[11%]">Nahwu</th>
                        <th className="border border-black px-1 py-1.5 text-center w-[11%]">Shorof</th>
                        <th className="border border-black px-1 py-1.5 text-center w-[11%]">Tarjamah</th>
                        <th className="border border-black px-1 py-1.5 text-center w-[8%] bg-gray-50">Total</th>
                        <th className="border border-black px-1 py-1.5 text-center w-[8%] bg-gray-50">Rata²</th>
                        <th className="border border-black px-1 py-1.5 text-center w-12 bg-white no-print text-gray-400">Aksi</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredStudents.length > 0 ? (
                        filteredStudents.map((student, index) => {
                            const total = (Object.values(student.scores) as number[]).reduce((a, b) => a + b, 0);
                            const avg = total / 5;
                            return (
                                <tr key={student.id} className="group hover:bg-gray-50">
                                    <td className="border border-black px-1 py-1 text-center">{index + 1}</td>
                                    <td className="border border-black px-2 py-1 font-medium truncate max-w-[150px]">{student.name}</td>
                                    <td className="border border-black px-1 py-1 text-center">{student.scores.muhadatsah || ''}</td>
                                    <td className="border border-black px-1 py-1 text-center">{student.scores.mutholaah || ''}</td>
                                    <td className="border border-black px-1 py-1 text-center">{student.scores.nahwu || ''}</td>
                                    <td className="border border-black px-1 py-1 text-center">{student.scores.shorof || ''}</td>
                                    <td className="border border-black px-1 py-1 text-center">{student.scores.tarjamah || ''}</td>
                                    <td className="border border-black px-1 py-1 text-center font-bold bg-gray-50">{total > 0 ? total : ''}</td>
                                    <td className="border border-black px-1 py-1 text-center font-bold bg-gray-50">{total > 0 ? avg.toFixed(1) : ''}</td>
                                    <td className="border border-black px-1 py-1 text-center no-print">
                                        <div className="flex justify-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <button onClick={() => handleEdit(student)} className="p-0.5 text-blue-600 hover:bg-blue-100 rounded">
                                                <Edit className="w-3 h-3" />
                                            </button>
                                            <button onClick={() => handleDelete(student.id)} className="p-0.5 text-red-600 hover:bg-red-100 rounded">
                                                <Trash2 className="w-3 h-3" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            );
                        })
                    ) : (
                        <tr>
                            <td colSpan={10} className="border border-black px-4 py-8 text-center text-gray-500 italic">
                                Tidak ada data santri untuk kategori ini.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>

            {/* Footer */}
            <div className="mt-8 flex justify-end">
                <div className="text-center w-56">
                    <p className="mb-16">Gunungsindur, {formattedDate}<br/>Penguji:</p>
                    <p className="border-b border-black inline-block min-w-[180px]"></p>
                    <p className="mt-1 font-bold">( {currentExaminer || '......................'} )</p>
                </div>
            </div>
        </div>
      </div>

      {/* EDIT MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                <div className="flex items-center justify-between p-6 border-b border-gray-100">
                    <h2 className="text-xl font-bold text-gray-900">
                        {currentStudent.id ? 'Edit Data Laporan' : 'Tambah Data Laporan'}
                    </h2>
                    <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-600">
                        <X className="w-6 h-6" />
                    </button>
                </div>
                
                <form onSubmit={handleSave} className="p-6 space-y-6">
                    {/* Identity Section */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="col-span-1 md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Nama Lengkap</label>
                            <input 
                                required type="text" className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-emerald-500 outline-none" 
                                value={currentStudent.name || ''} 
                                onChange={e => setCurrentStudent({...currentStudent, name: e.target.value})} 
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">NIS</label>
                            <input 
                                required type="text" className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-emerald-500 outline-none" 
                                value={currentStudent.nis || ''} 
                                onChange={e => setCurrentStudent({...currentStudent, nis: e.target.value})} 
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Kelompok</label>
                            <select 
                                className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-emerald-500 outline-none bg-white"
                                value={currentStudent.group}
                                onChange={e => setCurrentStudent({...currentStudent, group: e.target.value as any})}
                            >
                                <option value="A">A</option>
                                <option value="B">B</option>
                                <option value="C">C</option>
                            </select>
                        </div>
                        <div className="col-span-1 md:col-span-2">
                             <label className="block text-sm font-medium text-gray-700 mb-1">Nama Penguji</label>
                             <input 
                                type="text" className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-emerald-500 outline-none" 
                                value={currentStudent.examiner || ''} 
                                onChange={e => setCurrentStudent({...currentStudent, examiner: e.target.value})} 
                            />
                        </div>
                    </div>

                    <div className="border-t border-gray-100 pt-4">
                        <h3 className="text-sm font-bold text-gray-900 uppercase mb-4">Edit Nilai</h3>
                        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                            {['muhadatsah', 'mutholaah', 'nahwu', 'shorof', 'tarjamah'].map((subject) => (
                                <div key={subject}>
                                    <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">{subject}</label>
                                    <input 
                                        type="number" min="0" max="100"
                                        className="w-full border border-gray-300 rounded-lg p-2 text-center font-bold focus:ring-2 focus:ring-emerald-500 outline-none"
                                        value={currentStudent.scores?.[subject as keyof typeof currentStudent.scores] || 0}
                                        onChange={e => updateScore(subject as any, e.target.value)}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
                        <button type="button" onClick={() => setIsModalOpen(false)} className="px-5 py-2.5 text-gray-600 hover:bg-gray-100 rounded-lg font-medium">Batal</button>
                        <button type="submit" className="px-5 py-2.5 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 font-medium flex items-center gap-2">
                            <Save className="w-4 h-4" /> Simpan Perubahan
                        </button>
                    </div>
                </form>
            </div>
        </div>
      )}
    </div>
  );
};