
import React, { useState } from 'react';
import { Student } from '../types';
import { Plus, Search, Filter, Edit, Trash2 } from 'lucide-react';

interface StudentListProps {
  students: Student[];
  setStudents: React.Dispatch<React.SetStateAction<Student[]>>;
  currentExaminer: string;
}

export const StudentList: React.FC<StudentListProps> = ({ students, setStudents, currentExaminer }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterGroup, setFilterGroup] = useState<string>('All');
  const [showModal, setShowModal] = useState(false);
  const [editingStudent, setEditingStudent] = useState<Partial<Student> | null>(null);

  // Filter Logic
  const filteredStudents = students.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          student.nis.includes(searchTerm);
    const matchesGroup = filterGroup === 'All' || student.group === filterGroup;
    return matchesSearch && matchesGroup;
  });

  const handleDelete = (id: string) => {
    if (confirm('Yakin ingin menghapus data santri ini?')) {
      setStudents(prev => prev.filter(s => s.id !== id));
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingStudent?.id) {
        // Edit
        setStudents(prev => prev.map(s => s.id === editingStudent.id ? { ...s, ...editingStudent } as Student : s));
    } else {
        // Create
        const newStudent: Student = {
            ...editingStudent,
            id: Date.now().toString(),
            no: students.length + 1,
            scores: { muhadatsah: 0, mutholaah: 0, nahwu: 0, shorof: 0, tarjamah: 0 },
            questionLog: { muhadatsah: [], mutholaah: [], nahwu: [], shorof: [], tarjamah: [] }
        } as Student;
        setStudents(prev => [...prev, newStudent]);
    }
    setShowModal(false);
    setEditingStudent(null);
  };

  const openModal = (student?: Student) => {
      if (student) {
          setEditingStudent(student);
      } else {
          // Default data for NEW student, AUTO-FILL EXAMINER
          setEditingStudent({
            name: '', 
            nis: '', 
            class: '5C', 
            group: 'A', 
            gender: 'L', 
            examiner: currentExaminer // Auto-fill here
          });
      }
      setShowModal(true);
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <h1 className="text-2xl font-bold text-gray-900">Data Santri</h1>
        <button 
            onClick={() => openModal()}
            className="bg-emerald-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-emerald-700 transition"
        >
          <Plus className="w-4 h-4" /> Tambah Santri
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4 bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Cari nama atau NIS..."
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="relative w-full md:w-48">
            <Filter className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
            <select 
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white"
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

      {/* Table */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase">No</th>
                <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase">NIS</th>
                <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Nama Lengkap</th>
                <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Kelompok</th>
                <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Penguji</th>
                <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredStudents.length > 0 ? (
                filteredStudents.map((student, index) => (
                  <tr key={student.id} className="hover:bg-gray-50 transition">
                    <td className="px-6 py-4 text-sm text-gray-600">{index + 1}</td>
                    <td className="px-6 py-4 text-sm text-gray-600 font-mono">{student.nis}</td>
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">{student.name}</td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                        ${student.group === 'A' ? 'bg-blue-100 text-blue-800' : 
                          student.group === 'B' ? 'bg-purple-100 text-purple-800' : 
                          'bg-amber-100 text-amber-800'}`}>
                        Kelompok {student.group}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">{student.examiner}</td>
                    <td className="px-6 py-4 text-sm">
                        <div className="flex gap-2">
                            <button onClick={() => openModal(student)} className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-md transition">
                                <Edit className="w-4 h-4" />
                            </button>
                            <button onClick={() => handleDelete(student.id)} className="p-1.5 text-red-600 hover:bg-red-50 rounded-md transition">
                                <Trash2 className="w-4 h-4" />
                            </button>
                        </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-gray-400">
                    Tidak ada data santri ditemukan
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Simple Modal */}
      {showModal && editingStudent && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
              <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-6">
                  <h2 className="text-xl font-bold mb-4">{editingStudent.id ? 'Edit Santri' : 'Tambah Santri'}</h2>
                  <form onSubmit={handleSave} className="space-y-4">
                      <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Nama Lengkap</label>
                          <input required type="text" className="w-full border rounded-lg p-2" 
                              value={editingStudent.name} 
                              onChange={e => setEditingStudent({...editingStudent, name: e.target.value})} 
                          />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">NIS</label>
                            <input required type="text" className="w-full border rounded-lg p-2" 
                                value={editingStudent.nis} 
                                onChange={e => setEditingStudent({...editingStudent, nis: e.target.value})} 
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Kelas</label>
                            <input required type="text" className="w-full border rounded-lg p-2" 
                                value={editingStudent.class} 
                                onChange={e => setEditingStudent({...editingStudent, class: e.target.value})} 
                            />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Kelompok</label>
                            <select className="w-full border rounded-lg p-2"
                                value={editingStudent.group}
                                onChange={e => setEditingStudent({...editingStudent, group: e.target.value as any})}
                            >
                                <option value="A">A</option>
                                <option value="B">B</option>
                                <option value="C">C</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
                            <select className="w-full border rounded-lg p-2"
                                value={editingStudent.gender}
                                onChange={e => setEditingStudent({...editingStudent, gender: e.target.value as any})}
                            >
                                <option value="L">L</option>
                                <option value="P">P</option>
                            </select>
                        </div>
                      </div>
                      <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Nama Penguji</label>
                          <input required type="text" className="w-full border rounded-lg p-2 bg-gray-50" 
                              value={editingStudent.examiner} 
                              onChange={e => setEditingStudent({...editingStudent, examiner: e.target.value})} 
                          />
                          <p className="text-xs text-gray-500 mt-1">*Otomatis terisi sesuai login, bisa diubah manual.</p>
                      </div>
                      <div className="flex justify-end gap-3 mt-6">
                          <button type="button" onClick={() => setShowModal(false)} className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg">Batal</button>
                          <button type="submit" className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700">Simpan</button>
                      </div>
                  </form>
              </div>
          </div>
      )}
    </div>
  );
};
