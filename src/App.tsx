import { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import FileUpload from './components/FileUpload';
import TopNav from './components/TopNav';
import HeroCards from './components/HeroCards';
import MaterialComposition from './components/MaterialComposition';
import ManufacturingTimeline from './components/ManufacturingTimeline';
import AdvancedMetrics from './components/AdvancedMetrics';
import StepDetailPage from './pages/StepDetailPage';
import { ExperimentData } from './types';
import { generateStepsFromData } from './utils/stepGenerator';

function Dashboard({ data, onLoadNew }: { data: ExperimentData; onLoadNew: () => void }) {
  return (
    <div className="min-h-screen bg-slate-900">
      <TopNav aiScore={data.ai_score} experimentId={data.experiment_id} />

      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="max-w-7xl mx-auto px-6 py-8"
        >
          <HeroCards data={data} />
          <MaterialComposition data={data} />
          <ManufacturingTimeline data={data} />
          <AdvancedMetrics data={data} />

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="mt-8 text-center"
          >
            <button
              onClick={onLoadNew}
              className="px-6 py-3 bg-gradient-to-r from-cyan-600 to-emerald-600 hover:from-cyan-500 hover:to-emerald-500 text-white font-semibold rounded-xl shadow-lg transition-all transform hover:scale-105"
            >
              Load Different Dataset
            </button>
          </motion.div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

function App() {
  const [data, setData] = useState<ExperimentData | null>(null);

  if (!data) {
    return <FileUpload onDataLoaded={setData} />;
  }

  const steps = generateStepsFromData(data);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/dashboard" element={<Dashboard data={data} onLoadNew={() => setData(null)} />} />
        <Route path="/protocol/:stepId" element={<StepDetailPage data={data} steps={steps} />} />
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
