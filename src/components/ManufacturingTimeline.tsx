import { motion } from 'framer-motion';
import { Clock, Hammer, Droplet, Flame, Wind, Sun } from 'lucide-react';
import { ExperimentData } from '../types';

interface ManufacturingTimelineProps {
  data: ExperimentData;
}

interface Step {
  number: number;
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
}

export default function ManufacturingTimeline({ data }: ManufacturingTimelineProps) {
  const steps: Step[] = [
    {
      number: 1,
      title: 'Preparation',
      description: `${data.biochar_prep.source_material_note}. ${data.biochar_prep.step_1}.`,
      icon: <Hammer className="w-5 h-5" />,
      color: 'from-cyan-500 to-blue-500',
    },
    {
      number: 2,
      title: 'Activation',
      description: data.biochar_prep.step_2_acid_wash,
      icon: <Droplet className="w-5 h-5" />,
      color: 'from-blue-500 to-indigo-500',
    },
    {
      number: 3,
      title: 'Pyrolysis',
      description: data.biochar_prep.step_3_pyrolysis,
      icon: <Flame className="w-5 h-5" />,
      color: 'from-orange-500 to-red-500',
    },
    {
      number: 4,
      title: 'Mixing',
      description: `Mix at ${data.process_steps.mixing_temp_c}°C with stirring at ${data.process_steps.stirring_speed_rpm} RPM`,
      icon: <Wind className="w-5 h-5" />,
      color: 'from-emerald-500 to-green-500',
    },
    {
      number: 5,
      title: 'Curing',
      description: `Dry for ${data.process_steps.dry_hours} hours at ${data.process_steps.curing_temp_c}°C`,
      icon: <Sun className="w-5 h-5" />,
      color: 'from-amber-500 to-yellow-500',
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6 }}
      className="bg-slate-800/40 backdrop-blur-lg border border-slate-700/50 rounded-2xl p-8 shadow-2xl mb-8"
    >
      <div className="flex items-center space-x-3 mb-8">
        <Clock className="w-6 h-6 text-cyan-400" />
        <h2 className="text-2xl font-bold text-white">
          Manufacturing Protocol
        </h2>
      </div>

      <div className="relative">
        <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-cyan-500 via-emerald-500 to-amber-500" />

        <div className="space-y-6">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7 + index * 0.1 }}
              className="relative flex items-start space-x-4"
            >
              <motion.div
                whileHover={{ scale: 1.2, rotate: 360 }}
                transition={{ type: 'spring', stiffness: 200 }}
                className={`relative z-10 flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br ${step.color} shadow-lg`}
              >
                {step.icon}
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.02 }}
                className="flex-1 bg-slate-900/50 border border-slate-700/50 rounded-xl p-5 hover:border-cyan-500/30 transition-all"
              >
                <div className="flex items-center space-x-3 mb-2">
                  <span className="text-sm font-mono text-slate-500">
                    STEP {step.number}
                  </span>
                  <h3 className="text-lg font-semibold text-white">
                    {step.title}
                  </h3>
                </div>
                <p className="text-slate-300 leading-relaxed">
                  {step.description.split(/(\d+\s*(?:minutes|°C|RPM|hours|g))/g).map((part, i) => {
                    if (part.match(/\d+\s*(?:minutes|°C|RPM|hours|g)/)) {
                      return (
                        <span key={i} className="font-mono font-bold text-cyan-400">
                          {part}
                        </span>
                      );
                    }
                    return part;
                  })}
                </p>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
