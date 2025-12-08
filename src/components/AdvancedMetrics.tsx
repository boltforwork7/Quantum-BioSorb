import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Cpu, TrendingDown, Activity, Target } from 'lucide-react';
import { ExperimentData } from '../types';

interface AdvancedMetricsProps {
  data: ExperimentData;
}

export default function AdvancedMetrics({ data }: AdvancedMetricsProps) {
  const [isOpen, setIsOpen] = useState(false);

  const isSpontaneous = data.prediction_metrics.Gibbs_Energy < 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.8 }}
      className="bg-slate-800/40 backdrop-blur-lg border border-slate-700/50 rounded-2xl overflow-hidden shadow-2xl"
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-8 py-6 flex items-center justify-between hover:bg-slate-700/30 transition-all group"
      >
        <div className="flex items-center space-x-3">
          <Cpu className="w-6 h-6 text-purple-400" />
          <h2 className="text-2xl font-bold text-white">
            Advanced Thermodynamics Engine
          </h2>
          <span className="px-3 py-1 bg-purple-500/20 border border-purple-500/30 rounded-full text-xs text-purple-300 font-semibold">
            THE NERD SECTION
          </span>
        </div>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <ChevronDown className="w-6 h-6 text-slate-400 group-hover:text-cyan-400 transition-colors" />
        </motion.div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="px-8 pb-8 pt-4">
              <div className="grid md:grid-cols-3 gap-6">
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.1 }}
                  className="bg-gradient-to-br from-slate-900 to-slate-800 border border-slate-700 rounded-xl p-6"
                >
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="p-2 bg-gradient-to-br from-green-500 to-emerald-500 rounded-lg">
                      <TrendingDown className="w-5 h-5 text-white" />
                    </div>
                    <h3 className="text-sm font-semibold text-slate-400 tracking-wide">
                      GIBBS FREE ENERGY
                    </h3>
                  </div>
                  <div className="space-y-3">
                    <div className="font-mono text-3xl font-bold text-white">
                      {data.prediction_metrics.Gibbs_Energy.toLocaleString()}
                      <span className="text-lg text-slate-400 ml-2">J/mol</span>
                    </div>
                    {isSpontaneous && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.3, type: 'spring' }}
                        className="inline-flex items-center space-x-2 px-3 py-1 bg-green-500/20 border border-green-500/30 rounded-full"
                      >
                        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                        <span className="text-sm font-semibold text-green-400">
                          Spontaneous Reaction
                        </span>
                      </motion.div>
                    )}
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2 }}
                  className="bg-gradient-to-br from-slate-900 to-slate-800 border border-slate-700 rounded-xl p-6"
                >
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="p-2 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-lg">
                      <Activity className="w-5 h-5 text-white" />
                    </div>
                    <h3 className="text-sm font-semibold text-slate-400 tracking-wide">
                      SHANNON ENTROPY
                    </h3>
                  </div>
                  <div className="space-y-2">
                    <div className="font-mono text-3xl font-bold text-white">
                      {data.prediction_metrics.Shannon_Entropy.toFixed(2)}
                    </div>
                    <p className="text-xs text-slate-400">
                      System disorder measurement
                    </p>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3 }}
                  className="bg-gradient-to-br from-slate-900 to-slate-800 border border-amber-700/50 rounded-xl p-6"
                >
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="p-2 bg-gradient-to-br from-amber-500 to-orange-500 rounded-lg">
                      <Target className="w-5 h-5 text-white" />
                    </div>
                    <h3 className="text-sm font-semibold text-slate-400 tracking-wide">
                      ACTIVATION GOAL
                    </h3>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm text-slate-300 leading-relaxed">
                      {data.biochar_prep.activation_goal.split(/(\d+\s*m2\/g)/g).map((part, i) => {
                        if (part.match(/\d+\s*m2\/g/)) {
                          return (
                            <span key={i} className="font-mono font-bold text-amber-400">
                              {part}
                            </span>
                          );
                        }
                        return part;
                      })}
                    </p>
                  </div>
                </motion.div>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="mt-6 p-4 bg-slate-900/50 border border-cyan-500/20 rounded-lg"
              >
                <p className="text-sm text-slate-400 leading-relaxed">
                  <span className="font-semibold text-cyan-400">Thermodynamic Analysis:</span>{' '}
                  The negative Gibbs energy indicates a thermodynamically favorable process.
                  Combined with optimized surface area and entropy metrics, this configuration
                  demonstrates strong potential for efficient CO₂ adsorption.
                </p>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
