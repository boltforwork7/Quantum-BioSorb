import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  AlertTriangle,
  Zap,
  Info,
  Clock,
  Thermometer,
  Gauge,
  Box,
} from 'lucide-react';
import { ExperimentData, StepDetail } from '../types';
import { getStepById, getStepImage } from '../utils/stepGenerator';

interface StepDetailPageProps {
  data: ExperimentData;
  steps: StepDetail[];
}

const statusConfig = {
  pending: { bg: 'bg-slate-600', text: 'text-slate-300', label: 'Pending' },
  in_progress: {
    bg: 'bg-cyan-600',
    text: 'text-cyan-300',
    label: 'In Progress',
  },
  completed: {
    bg: 'bg-emerald-600',
    text: 'text-emerald-300',
    label: 'Completed',
  },
  critical: { bg: 'bg-red-600', text: 'text-red-300', label: 'Critical Phase' },
};

const parameterIcons: Record<string, React.ReactNode> = {
  Temperature: <Thermometer className="w-5 h-5" />,
  Duration: <Clock className="w-5 h-5" />,
  'Stirring Speed': <Gauge className="w-5 h-5" />,
  default: <Box className="w-5 h-5" />,
};

export default function StepDetailPage({ data, steps }: StepDetailPageProps) {
  const navigate = useNavigate();
  const { stepId } = useParams<{ stepId: string }>();
  const step = getStepById(steps, parseInt(stepId || '1'));

  if (!step) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="text-center">
          <p className="text-slate-400 text-lg mb-4">Step not found</p>
          <button
            onClick={() => navigate('/dashboard')}
            className="px-6 py-2 bg-cyan-600 hover:bg-cyan-500 text-white rounded-lg"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  const statusStyle = statusConfig[step.status];
  const imageUrl = getStepImage(step.id);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-slate-900 pb-16"
    >
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative overflow-hidden bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 border-b border-cyan-500/20 p-6"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 via-emerald-500/5 to-cyan-500/5 animate-pulse" />

        <div className="relative max-w-7xl mx-auto flex items-center justify-between">
          <motion.button
            onClick={() => navigate('/dashboard')}
            whileHover={{ scale: 1.05, x: -5 }}
            className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-slate-800/70 hover:bg-slate-700 transition-colors border border-slate-700/50"
          >
            <ArrowLeft className="w-5 h-5 text-cyan-400" />
            <span className="text-slate-300">Back to Dashboard</span>
          </motion.button>

          <div>
            <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-emerald-400 mb-2">
              Step {step.id}: {step.title}
            </h1>
            <div className="flex items-center space-x-4">
              <span className={`px-4 py-2 rounded-lg ${statusStyle.bg} ${statusStyle.text} font-semibold text-sm`}>
                {statusStyle.label}
              </span>
              <span className="text-slate-400">Experiment {data.experiment_id}</span>
            </div>
          </div>
        </div>
      </motion.div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Main Visual - Image Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="relative mb-8 rounded-2xl overflow-hidden border border-slate-700/50 shadow-2xl group"
        >
          <div className="aspect-video relative bg-gradient-to-br from-slate-800 to-slate-900">
            <img
              src={imageUrl}
              alt={`Step ${step.id}: ${step.title}`}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent" />
            <div className="absolute bottom-4 left-4 text-slate-300">
              <p className="text-sm text-slate-400">Lab Evidence</p>
              <p className="text-lg font-semibold">{step.title} Stage</p>
            </div>
          </div>
        </motion.div>

        {/* Scientific Explanation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="bg-slate-800/40 backdrop-blur-lg border border-slate-700/50 rounded-2xl p-8 mb-8 shadow-2xl"
        >
          <div className="flex items-start space-x-4">
            <div className="p-3 bg-cyan-500/20 rounded-lg mt-1">
              <Info className="w-6 h-6 text-cyan-400" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white mb-4">The Science</h2>
              <p className="text-slate-300 leading-relaxed text-lg">
                {step.scientific_explanation}
              </p>
            </div>
          </div>
        </motion.div>

        {/* Parameters Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="mb-8"
        >
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center space-x-3">
            <Zap className="w-7 h-7 text-cyan-400" />
            <span>Process Parameters</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {step.parameters.map((param, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + index * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="bg-gradient-to-br from-slate-800/60 to-slate-900/60 border border-cyan-500/20 rounded-2xl p-8 hover:border-cyan-500/40 transition-all shadow-lg"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="p-2 bg-cyan-500/10 rounded-lg">
                    {parameterIcons[param.label] || parameterIcons.default}
                  </div>
                </div>
                <p className="text-slate-400 text-sm font-medium mb-2">
                  {param.label}
                </p>
                <div className="flex items-baseline space-x-2">
                  <span className="text-4xl font-bold font-mono text-white">
                    {param.value}
                  </span>
                  {param.unit && (
                    <span className="text-lg text-slate-400 font-mono">
                      {param.unit}
                    </span>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Safety Warning */}
        {step.safety_warning && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="bg-red-900/30 border-l-4 border-red-500 rounded-lg p-6 mb-8 flex items-start space-x-4"
          >
            <div className="p-2 bg-red-500/20 rounded-lg mt-1">
              <AlertTriangle className="w-6 h-6 text-red-400" />
            </div>
            <div>
              <h3 className="font-semibold text-red-400 mb-1">Safety Protocol</h3>
              <p className="text-red-300/90 leading-relaxed">
                {step.safety_warning}
              </p>
            </div>
          </motion.div>
        )}

        {/* Navigation Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.5 }}
          className="flex justify-between items-center"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            disabled={step.id === 1}
            onClick={() => navigate(`/protocol/${step.id - 1}`)}
            className="px-6 py-3 bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-600 text-white rounded-lg font-semibold transition-all"
          >
            Previous Step
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/dashboard')}
            className="px-6 py-3 bg-gradient-to-r from-cyan-600 to-emerald-600 hover:from-cyan-500 hover:to-emerald-500 text-white rounded-lg font-semibold transition-all"
          >
            Return to Dashboard
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            disabled={step.id === 6}
            onClick={() => navigate(`/protocol/${step.id + 1}`)}
            className="px-6 py-3 bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-600 text-white rounded-lg font-semibold transition-all"
          >
            Next Step
          </motion.button>
        </motion.div>
      </div>
    </motion.div>
  );
}
