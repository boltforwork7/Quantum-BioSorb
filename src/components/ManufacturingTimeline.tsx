import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, Hammer, Droplet, Flame, Wind, Sun, Beaker, Plus, Minus, CheckCircle2, ExternalLink } from 'lucide-react';
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
  detailedExplanation: string;
  isPreProcessed?: boolean;
}

export default function ManufacturingTimeline({ data }: ManufacturingTimelineProps) {
  const navigate = useNavigate();
  const [expandedStep, setExpandedStep] = useState<number | null>(null);
  const inputType = data.experiment_meta.input_type;
  const isBiocharInput = inputType.toLowerCase() === 'biochar';

  const toggleStep = (stepNumber: number) => {
    setExpandedStep(expandedStep === stepNumber ? null : stepNumber);
  };

  const steps: Step[] = [
    {
      number: 1,
      title: 'Preparation',
      description: `${data.biochar_prep.source_material_note}. ${data.biochar_prep.step_1}.`,
      icon: isBiocharInput ? <CheckCircle2 className="w-5 h-5" /> : <Hammer className="w-5 h-5" />,
      color: isBiocharInput ? 'from-slate-500 to-slate-600' : 'from-cyan-500 to-blue-500',
      detailedExplanation: 'The raw material (Rice Straw) must be ground to increase surface area and ensure uniform processing. Proper particle size distribution is essential for effective activation and pyrolysis in subsequent steps.',
      isPreProcessed: isBiocharInput,
    },
    {
      number: 2,
      title: 'Activation',
      description: data.biochar_prep.step_2_acid_wash,
      icon: isBiocharInput ? <CheckCircle2 className="w-5 h-5" /> : <Droplet className="w-5 h-5" />,
      color: isBiocharInput ? 'from-slate-500 to-slate-600' : 'from-blue-500 to-indigo-500',
      detailedExplanation: 'Acid washing removes impurities and creates initial pore structures. This chemical activation step is critical for developing the high surface area needed for effective CO₂ adsorption. The HCl treatment opens up the biomass structure and prepares it for thermal transformation.',
      isPreProcessed: isBiocharInput,
    },
    {
      number: 3,
      title: 'Pyrolysis',
      description: data.biochar_prep.step_3_pyrolysis,
      icon: isBiocharInput ? <CheckCircle2 className="w-5 h-5" /> : <Flame className="w-5 h-5" />,
      color: isBiocharInput ? 'from-slate-500 to-slate-600' : 'from-orange-500 to-red-500',
      detailedExplanation: `Heating at ${data.biochar_prep.step_3_pyrolysis.match(/\d+/)?.[0]}°C is the most critical step for creating the porous structure. This specific temperature maximizes surface area development while maintaining structural integrity. The carbonization process creates the nanoscale pores that give biochar its exceptional CO₂ adsorption capacity. This temperature was optimized using physics-informed AI to avoid thermodynamic energy penalties that could create unstable or brittle structures.`,
      isPreProcessed: isBiocharInput,
    },
    {
      number: 4,
      title: 'Matrix Preparation',
      description: 'Dissolve calculated amounts of Starch and Gelatin in hot water (~85°C) with stirring until a clear gel is formed',
      icon: <Beaker className="w-5 h-5" />,
      color: 'from-purple-500 to-pink-500',
      detailedExplanation: 'This step creates the "glue" that binds biochar particles together. The temperature ensures proper gelatinization of the starch and complete dissolution of the gelatin. Glycerol is added as a plasticizer to prevent brittleness. The precise ratios are calculated to create a stable, flexible matrix that doesn\'t compromise the biochar\'s surface area accessibility.',
      isPreProcessed: false,
    },
    {
      number: 5,
      title: 'Mixing',
      description: `Mix at ${data.process_steps.mixing_temp_c}°C with stirring at ${data.process_steps.stirring_speed_rpm} RPM`,
      icon: <Wind className="w-5 h-5" />,
      color: 'from-emerald-500 to-green-500',
      detailedExplanation: `The biochar is carefully dispersed into the polymer matrix. Temperature and stirring speed are optimized to ensure uniform distribution without damaging the biochar's porous structure. These conditions prevent thermodynamic energy penalties that could destabilize the composite. The physics-informed AI determined these parameters to maximize structural stability while maintaining CO₂ adsorption efficiency.`,
      isPreProcessed: false,
    },
    {
      number: 6,
      title: 'Curing',
      description: `Dry for ${data.process_steps.dry_hours} hours at ${data.process_steps.curing_temp_c}°C`,
      icon: <Sun className="w-5 h-5" />,
      color: 'from-amber-500 to-yellow-500',
      detailedExplanation: 'Controlled drying removes water while allowing the polymer matrix to set properly. The low temperature and extended time prevent cracking and ensure the formation of a stable, non-brittle material. This gentle curing process maintains the biochar\'s pore structure integrity and creates strong intermolecular bonds in the polymer network.',
      isPreProcessed: false,
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6 }}
      className="bg-slate-800/40 backdrop-blur-lg border border-slate-700/50 rounded-2xl p-8 shadow-2xl mb-8"
    >
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center space-x-3">
          <Clock className="w-6 h-6 text-cyan-400" />
          <h2 className="text-2xl font-bold text-white">
            Manufacturing Protocol
          </h2>
        </div>
        {isBiocharInput && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.8 }}
            className="px-4 py-2 bg-slate-700/50 border border-slate-600 rounded-lg"
          >
            <span className="text-xs text-slate-400">Input Type: </span>
            <span className="text-sm font-semibold text-emerald-400">{inputType}</span>
          </motion.div>
        )}
      </div>

      <div className="relative">
        <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-cyan-500 via-purple-500 via-emerald-500 to-amber-500" />

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
                whileHover={{ scale: step.isPreProcessed ? 1.1 : 1.2, rotate: step.isPreProcessed ? 0 : 360 }}
                transition={{ type: 'spring', stiffness: 200 }}
                className={`relative z-10 flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br ${step.color} shadow-lg ${
                  step.isPreProcessed ? 'opacity-60' : ''
                }`}
              >
                {step.icon}
              </motion.div>

              <div className="flex-1">
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className={`bg-slate-900/50 border rounded-xl p-5 transition-all ${
                    step.isPreProcessed
                      ? 'border-slate-700/30 opacity-75'
                      : 'border-slate-700/50 hover:border-cyan-500/30'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-3">
                      <span className={`text-sm font-mono ${step.isPreProcessed ? 'text-slate-600' : 'text-slate-500'}`}>
                        STEP {step.number}
                      </span>
                      <h3 className={`text-lg font-semibold ${step.isPreProcessed ? 'text-slate-400' : 'text-white'}`}>
                        {step.title}
                      </h3>
                      {step.isPreProcessed && (
                        <span className="px-2 py-1 bg-slate-700/50 border border-slate-600/50 rounded text-xs text-slate-400">
                          Pre-processed
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      <motion.button
                        onClick={() => navigate(`/protocol/${step.number}`)}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        className="p-2 rounded-lg bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30 transition-colors"
                        title="View detailed step information"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </motion.button>
                      <motion.button
                        onClick={() => toggleStep(step.number)}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        className={`p-2 rounded-lg transition-colors ${
                          expandedStep === step.number
                            ? 'bg-cyan-500/20 text-cyan-400'
                            : 'bg-slate-800/50 text-slate-400 hover:bg-slate-700/50 hover:text-cyan-400'
                        }`}
                      >
                        {expandedStep === step.number ? (
                          <Minus className="w-4 h-4" />
                        ) : (
                          <Plus className="w-4 h-4" />
                        )}
                      </motion.button>
                    </div>
                  </div>

                  <p className={`leading-relaxed ${step.isPreProcessed ? 'text-slate-500' : 'text-slate-300'}`}>
                    {step.description.split(/(\d+\s*(?:minutes|°C|RPM|hours|g|~85))/g).map((part, i) => {
                      if (part.match(/\d+\s*(?:minutes|°C|RPM|hours|g|~85)/)) {
                        return (
                          <span key={i} className={`font-mono font-bold ${step.isPreProcessed ? 'text-slate-600' : 'text-cyan-400'}`}>
                            {part}
                          </span>
                        );
                      }
                      return part;
                    })}
                  </p>

                  <AnimatePresence>
                    {expandedStep === step.number && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className={`mt-4 pt-4 border-t ${step.isPreProcessed ? 'border-slate-700/30' : 'border-slate-700/50'}`}>
                          <div className="flex items-start space-x-2">
                            <div className={`mt-1 p-1 rounded ${step.isPreProcessed ? 'bg-slate-700/30' : 'bg-cyan-500/10'}`}>
                              <svg
                                className={`w-4 h-4 ${step.isPreProcessed ? 'text-slate-500' : 'text-cyan-400'}`}
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                />
                              </svg>
                            </div>
                            <p className={`text-sm leading-relaxed ${step.isPreProcessed ? 'text-slate-500' : 'text-slate-400'}`}>
                              <span className={`font-semibold ${step.isPreProcessed ? 'text-slate-400' : 'text-cyan-400'}`}>
                                Why this matters:{' '}
                              </span>
                              {step.detailedExplanation}
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
