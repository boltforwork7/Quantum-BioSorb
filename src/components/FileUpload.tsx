import { useCallback, useState } from 'react';
import { motion } from 'framer-motion';
import { Upload, FileJson } from 'lucide-react';
import { ExperimentData } from '../types';

interface FileUploadProps {
  onDataLoaded: (data: ExperimentData) => void;
}

export default function FileUpload({ onDataLoaded }: FileUploadProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFile = useCallback((file: File) => {
    if (file.type !== 'application/json') {
      setError('Please upload a JSON file');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target?.result as string);
        onDataLoaded(data);
        setError(null);
      } catch {
        setError('Invalid JSON format');
      }
    };
    reader.readAsText(file);
  }, [onDataLoaded]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  }, [handleFile]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback(() => {
    setIsDragging(false);
  }, []);

  const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  }, [handleFile]);

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-8">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-2xl"
      >
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-emerald-400 mb-4">
            Carbon-X Architect
          </h1>
          <p className="text-slate-400 text-lg">
            Quantum-Bio Research Dashboard
          </p>
        </div>

        <motion.div
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          whileHover={{ scale: 1.02 }}
          className={`relative border-2 border-dashed rounded-2xl p-16 transition-all cursor-pointer
            ${isDragging
              ? 'border-cyan-400 bg-cyan-400/10'
              : 'border-slate-700 bg-slate-800/50 hover:border-cyan-500/50'
            }
            backdrop-blur-sm`}
        >
          <input
            type="file"
            accept=".json"
            onChange={handleFileInput}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          />

          <div className="flex flex-col items-center justify-center space-y-6">
            <motion.div
              animate={{
                y: isDragging ? -10 : 0,
                rotate: isDragging ? 5 : 0
              }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              {isDragging ? (
                <FileJson className="w-20 h-20 text-cyan-400" />
              ) : (
                <Upload className="w-20 h-20 text-slate-500" />
              )}
            </motion.div>

            <div className="text-center">
              <p className="text-xl text-slate-300 mb-2">
                {isDragging ? 'Drop your JSON file here' : 'Drag & Drop JSON File'}
              </p>
              <p className="text-sm text-slate-500">
                or click to browse
              </p>
            </div>
          </div>
        </motion.div>

        {error && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-4 p-4 bg-red-500/20 border border-red-500 rounded-lg text-red-400 text-center"
          >
            {error}
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}
