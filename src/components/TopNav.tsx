import { motion } from 'framer-motion';
import { Sparkles, Hash } from 'lucide-react';

interface TopNavProps {
  aiScore: number;
  experimentId?: string;
}

export default function TopNav({ aiScore, experimentId }: TopNavProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="relative overflow-hidden bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 border-b border-cyan-500/20 p-6"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 via-emerald-500/5 to-cyan-500/5 animate-pulse" />

      <div className="relative max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Sparkles className="w-8 h-8 text-cyan-400" />
          <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-emerald-400">
            Carbon-X Architect
          </h1>
        </div>

        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.3, type: 'spring', stiffness: 200 }}
          className="flex items-center space-x-8"
        >
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-emerald-500 rounded-full blur-xl opacity-50 animate-pulse" />
            <div className="relative bg-slate-900 border-2 border-cyan-400 rounded-full px-8 py-4 shadow-2xl">
              <div className="text-center">
                <div className="text-xs text-cyan-400 font-semibold tracking-wider mb-1">
                  AI QUANTUM SCORE
                </div>
                <div className="text-4xl font-bold font-mono text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-emerald-300 to-cyan-300 animate-pulse">
                  {aiScore.toLocaleString()}
                </div>
              </div>
            </div>
          </div>

          {experimentId && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
              className="flex items-center space-x-2 bg-slate-800/70 backdrop-blur-sm border border-emerald-500/30 rounded-lg px-4 py-2"
            >
              <Hash className="w-4 h-4 text-emerald-400" />
              <span className="text-sm text-slate-400">EXP:</span>
              <span className="font-mono text-emerald-400 font-semibold">
                {experimentId}
              </span>
            </motion.div>
          )}
        </motion.div>
      </div>
    </motion.div>
  );
}
