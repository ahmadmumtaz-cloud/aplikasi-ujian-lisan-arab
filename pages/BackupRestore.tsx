
import React, { useRef } from 'react';
import { Student } from '../types';
import { Download, Upload, Database, AlertTriangle, RefreshCw, CheckCircle2 } from 'lucide-react';
import { INITIAL_STUDENTS } from '../constants';

interface BackupRestoreProps {
  students: Student[];
  setStudents: React.Dispatch<React.SetStateAction<Student[]>>;
}

export const BackupRestore: React.FC<BackupRestoreProps> = ({ students, setStudents }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  // 1. Export Data (Backup)
  const handleBackup = () => {
    const dataStr = JSON.stringify(students, null, 2);
    const blob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    
    const date = new Date().toISOString().split('T')[0];
    const link = document.createElement('a');
    link.href = url;
    link.download = `backup_ujian_lisan_5c_${date}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  // 2. Import Data (Restore)
  const handleRestore = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const content = e.target?.result as string;
        const parsedData = JSON.parse(content);

        // Simple validation check
        if (!Array.isArray(parsedData) || parsedData.length === 0 || !parsedData[0].id) {
            alert("File tidak valid! Pastikan format file adalah JSON backup dari aplikasi ini.");
            return;
        }

        if (confirm(`Apakah Anda yakin ingin me-restore database? Data saat ini akan ditimpa dengan data dari file (Total: ${parsedData.length} santri).`)) {
            setStudents(parsedData);
            alert("Database berhasil dipulihkan!");
        }
      } catch (error) {
        console.error("Error parsing backup file:", error);
        alert("Gagal membaca file backup. File mungkin rusak.");
      }
      
      // Reset input
      if (fileInputRef.current) fileInputRef.current.value = "";
    };
    reader.readAsText(file);
  };

  // 3. Reset Data (Factory Reset)
  const handleReset = () => {
    if (confirm("PERINGATAN: Ini akan menghapus SEMUA nilai dan mengembalikan data ke daftar awal siswa. Tindakan ini tidak bisa dibatalkan. Lanjutkan?")) {
        setStudents(INITIAL_STUDENTS);
        alert("Data telah direset ke kondisi awal.");
    }
  };

  const totalGraded = students.filter(s => (Object.values(s.scores) as number[]).reduce((a, b) => a + b, 0) > 0).length;

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between">
        <div>
            <h1 className="text-2xl font-bold text-gray-900">Database & Backup</h1>
            <p className="text-gray-500">Kelola penyimpanan data aplikasi secara manual</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Backup Card */}
        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-blue-100 text-blue-600 rounded-lg">
                    <Download className="w-6 h-6" />
                </div>
                <div>
                    <h3 className="font-bold text-gray-900">Backup Data</h3>
                    <p className="text-sm text-gray-500">Simpan data nilai ke file komputer</p>
                </div>
            </div>
            <p className="text-sm text-gray-600 mb-6">
                Unduh seluruh data nilai dan log soal santri saat ini ke dalam format file JSON. File ini bisa digunakan untuk memulihkan data di kemudian hari atau di komputer lain.
            </p>
            <div className="bg-gray-50 p-4 rounded-lg mb-6 border border-gray-200">
                <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-600">Total Santri:</span>
                    <span className="font-bold">{students.length}</span>
                </div>
                <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Sudah Dinilai:</span>
                    <span className="font-bold text-emerald-600">{totalGraded}</span>
                </div>
            </div>
            <button 
                onClick={handleBackup}
                className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
            >
                <Download className="w-4 h-4" /> Download Backup (.json)
            </button>
        </div>

        {/* Restore Card */}
        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-emerald-100 text-emerald-600 rounded-lg">
                    <Upload className="w-6 h-6" />
                </div>
                <div>
                    <h3 className="font-bold text-gray-900">Restore Data</h3>
                    <p className="text-sm text-gray-500">Pulihkan data dari file backup</p>
                </div>
            </div>
            <p className="text-sm text-gray-600 mb-6">
                Kembalikan data nilai yang hilang atau pindahkan data dari komputer lain dengan mengunggah file backup (.json) yang sebelumnya telah diunduh.
            </p>
            <div className="bg-amber-50 p-4 rounded-lg mb-6 border border-amber-100 flex gap-3 items-start">
                <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                <p className="text-xs text-amber-800">
                    <strong>Perhatian:</strong> Mengunggah file akan menimpa seluruh data yang ada saat ini. Pastikan Anda memilih file yang benar.
                </p>
            </div>
            
            <input 
                type="file" 
                ref={fileInputRef}
                accept=".json"
                onChange={handleRestore}
                className="hidden" 
            />
            
            <button 
                onClick={() => fileInputRef.current?.click()}
                className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
            >
                <Upload className="w-4 h-4" /> Upload File Backup
            </button>
        </div>

        {/* Reset Card */}
        <div className="md:col-span-2 bg-white p-6 rounded-xl border border-red-100 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-red-100 text-red-600 rounded-lg">
                    <RefreshCw className="w-6 h-6" />
                </div>
                <div>
                    <h3 className="font-bold text-gray-900">Reset Aplikasi</h3>
                    <p className="text-sm text-gray-500">Kembali ke pengaturan awal</p>
                </div>
            </div>
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                <p className="text-sm text-gray-600">
                    Fitur ini akan menghapus semua nilai yang sudah dimasukkan dan mengembalikan daftar santri ke kondisi default (kosong/awal). Gunakan ini jika ingin memulai ujian baru dari nol.
                </p>
                <button 
                    onClick={handleReset}
                    className="w-full md:w-auto px-6 py-2.5 border border-red-200 text-red-600 hover:bg-red-50 rounded-lg font-medium transition-colors flex items-center justify-center gap-2 whitespace-nowrap"
                >
                    <RefreshCw className="w-4 h-4" /> Reset Semua Data
                </button>
            </div>
        </div>

      </div>
    </div>
  );
};
