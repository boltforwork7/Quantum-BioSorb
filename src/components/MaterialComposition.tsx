import { motion } from 'framer-motion';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { ExperimentData } from '../types';
import { Atom, FlaskConical, Target } from 'lucide-react';

interface MaterialCompositionProps {
  data: ExperimentData;
}

const COLORS = {
  Biochar: '#10b981',
  Starch: '#f59e0b',
  Gelatin: '#ec4899',
  Glycerol: '#3b82f6',
};

export default function MaterialComposition({ data }: MaterialCompositionProps) {
  const chartData = Object.entries(data.components_grams).map(([name, value]) => ({
    name,
    value,
    fill: COLORS[name as keyof typeof COLORS],
  }));

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
      className="bg-slate-800/40 backdrop-blur-lg border border-slate-700/50 rounded-2xl p-8 shadow-2xl mb-8"
    >
      <div className="flex items-center space-x-3 mb-6">
        <Atom className="w-6 h-6 text-cyan-400" />
        <h2 className="text-2xl font-bold text-white">
          Material Composition
        </h2>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="flex items-center justify-center">
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                innerRadius={80}
                outerRadius={120}
                paddingAngle={2}
                dataKey="value"
                animationBegin={0}
                animationDuration={1000}
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: 'rgba(15, 23, 42, 0.85)',
                  backdropFilter: 'blur(8px)',
                  border: '1px solid rgba(59, 130, 246, 0.3)',
                  borderRadius: '0.75rem',
                  color: '#fff',
                  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3), inset 0 1px 1px rgba(255, 255, 255, 0.1)',
                  padding: '0.75rem 1rem',
                }}
                formatter={(value: number) => [`${value.toFixed(2)}g`, 'Mass']}
                labelStyle={{
                  color: '#60a5fa',
                  fontWeight: 600,
                  fontSize: '0.875rem',
                }}
                itemStyle={{
                  color: '#e2e8f0',
                  fontSize: '0.875rem',
                }}
              />
              <Legend
                verticalAlign="bottom"
                height={36}
                iconType="circle"
                formatter={(value) => (
                  <span className="text-slate-300 text-sm">{value}</span>
                )}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="space-y-4">
          <div className="bg-slate-900/50 border border-emerald-500/30 rounded-xl p-6">
            <div className="flex items-center space-x-2 mb-4">
              <FlaskConical className="w-5 h-5 text-emerald-400" />
              <h3 className="text-sm font-semibold text-emerald-400 tracking-wide">
                INPUT COMPOSITION
              </h3>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-slate-400">Input Type:</span>
                <span className="font-mono text-white font-semibold">
                  {data.experiment_meta.input_type}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-400">Input Mass:</span>
                <span className="font-mono text-cyan-400 font-semibold">
                  {data.experiment_meta.input_mass_g}g
                </span>
              </div>
            </div>
          </div>

          <div className="bg-slate-900/50 border border-cyan-500/30 rounded-xl p-6">
            <div className="flex items-center space-x-2 mb-4">
              <Target className="w-5 h-5 text-cyan-400" />
              <h3 className="text-sm font-semibold text-cyan-400 tracking-wide">
                OUTPUT METRICS
              </h3>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-slate-400">Total Yield Mass:</span>
                <span className="font-mono text-white font-semibold">
                  {data.experiment_meta.resulting_total_mass_g}g
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-400">Biochar Concentration:</span>
                <span className="font-mono text-cyan-400 font-semibold">
                  {data.experiment_meta.biochar_concentration_percent.toFixed(1)}%
                </span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 pt-2">
            {Object.entries(data.components_grams).map(([name, value]) => (
              <div
                key={name}
                className="bg-slate-900/30 rounded-lg p-3 border border-slate-700/50"
              >
                <div className="flex items-center space-x-2 mb-1">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: COLORS[name as keyof typeof COLORS] }}
                  />
                  <span className="text-xs text-slate-400">{name}</span>
                </div>
                <span className="font-mono text-white font-semibold">
                  {value.toFixed(2)}g
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
