import { motion } from 'framer-motion';
import { Zap, Layers, Droplets, Scale, Info } from 'lucide-react';
import { ExperimentData } from '../types';
import { useState } from 'react';

interface HeroCardsProps {
  data: ExperimentData;
}

interface CardData {
  title: string;
  value: string;
  unit: string;
  icon: React.ReactNode;
  color: string;
  tooltip?: string;
}

export default function HeroCards({ data }: HeroCardsProps) {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  const cards: CardData[] = [
    {
      title: 'Adsorption Efficiency',
      value: (data.experiment_meta.efficiency_g_per_g * 100).toFixed(2),
      unit: '%',
      icon: <Zap className="w-8 h-8" />,
      color: 'from-cyan-500 to-blue-500',
    },
    {
      title: 'Surface Area',
      value: data.prediction_metrics.Virtual_Surface_Area_m2g.toLocaleString(),
      unit: 'm²/g',
      icon: <Layers className="w-8 h-8" />,
      color: 'from-emerald-500 to-green-500',
      tooltip: 'Active pore surface availability',
    },
    {
      title: 'Total Capacity',
      value: data.experiment_meta.predicted_batch_uptake_g.toFixed(2),
      unit: 'g CO₂',
      icon: <Droplets className="w-8 h-8" />,
      color: 'from-purple-500 to-pink-500',
    },
    {
      title: 'Biochar Load',
      value: data.experiment_meta.biochar_concentration_percent.toFixed(1),
      unit: '%',
      icon: <Scale className="w-8 h-8" />,
      color: 'from-amber-500 to-orange-500',
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.2, staggerChildren: 0.1 }}
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
    >
      {cards.map((card, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 + index * 0.1 }}
          whileHover={{ scale: 1.05, y: -5 }}
          onHoverStart={() => setHoveredCard(index)}
          onHoverEnd={() => setHoveredCard(null)}
          className="relative group"
        >
          <div className="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-20 rounded-2xl blur-xl transition-opacity duration-500" />

          <div className="relative bg-slate-800/40 backdrop-blur-lg border border-slate-700/50 rounded-2xl p-6 shadow-2xl overflow-hidden">
            <div className={`absolute inset-0 bg-gradient-to-br ${card.color} opacity-5`} />

            <div className="relative">
              <div className="flex items-start justify-between mb-4">
                <div className={`p-3 rounded-xl bg-gradient-to-br ${card.color} shadow-lg`}>
                  {card.icon}
                </div>
                {card.tooltip && (
                  <div className="relative group/tooltip">
                    <Info className="w-4 h-4 text-slate-500 cursor-help" />
                    {hoveredCard === index && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="absolute right-0 top-6 w-48 bg-slate-900 border border-cyan-500/30 rounded-lg p-3 text-xs text-slate-300 shadow-xl z-10"
                      >
                        {card.tooltip}
                      </motion.div>
                    )}
                  </div>
                )}
              </div>

              <div className="space-y-1">
                <h3 className="text-sm text-slate-400 font-medium">
                  {card.title}
                </h3>
                <div className="flex items-baseline space-x-2">
                  <span className="text-4xl font-bold font-mono text-white">
                    {card.value}
                  </span>
                  <span className="text-lg text-slate-400 font-mono">
                    {card.unit}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}
