import { ExperimentData, StepDetail, StepParameter } from '../types';

export function generateStepsFromData(data: ExperimentData): StepDetail[] {
  const isBiocharInput = data.experiment_meta.input_type.toLowerCase() === 'biochar';

  const steps: StepDetail[] = [
    {
      id: 1,
      title: 'Preparation',
      description: `${data.biochar_prep.source_material_note}. ${data.biochar_prep.step_1}.`,
      status: isBiocharInput ? 'completed' : 'in_progress',
      parameters: [
        {
          label: 'Input Material',
          value: data.experiment_meta.input_type,
        },
        {
          label: 'Input Mass',
          value: data.experiment_meta.input_mass_g,
          unit: 'g',
        },
      ],
      scientific_explanation:
        'The raw material must be ground to increase surface area and ensure uniform processing. Proper particle size distribution is essential for effective activation and pyrolysis in subsequent steps.',
    },
    {
      id: 2,
      title: 'Activation',
      description: data.biochar_prep.step_2_acid_wash,
      status: isBiocharInput ? 'completed' : 'in_progress',
      parameters: [
        {
          label: 'Chemical Agent',
          value: 'HCl',
        },
        {
          label: 'Concentration',
          value: 30,
          unit: '%',
        },
        {
          label: 'Duration',
          value: 71,
          unit: 'minutes',
        },
      ],
      scientific_explanation:
        'Acid washing removes impurities and creates initial pore structures. This chemical activation step is critical for developing the high surface area needed for effective CO₂ adsorption. The HCl treatment opens up the biomass structure and prepares it for thermal transformation.',
    },
    {
      id: 3,
      title: 'Pyrolysis',
      description: data.biochar_prep.step_3_pyrolysis,
      status: isBiocharInput ? 'completed' : 'critical',
      parameters: [
        {
          label: 'Temperature',
          value: 572,
          unit: '°C',
        },
        {
          label: 'Target Surface Area',
          value: data.prediction_metrics.Virtual_Surface_Area_m2g,
          unit: 'm²/g',
        },
      ],
      scientific_explanation: `Heating at 572°C is the most critical step for creating the porous structure. This specific temperature maximizes surface area development while maintaining structural integrity. The carbonization process creates the nanoscale pores that give biochar its exceptional CO₂ adsorption capacity.`,
      safety_warning: 'High temperature process - ensure proper ventilation and safety equipment',
    },
    {
      id: 4,
      title: 'Matrix Preparation',
      description: 'Dissolve calculated amounts of Starch and Gelatin in hot water with stirring until a clear gel is formed',
      status: 'in_progress',
      parameters: [
        {
          label: 'Starch',
          value: data.components_grams.Starch,
          unit: 'g',
        },
        {
          label: 'Gelatin',
          value: data.components_grams.Gelatin,
          unit: 'g',
        },
        {
          label: 'Glycerol',
          value: data.components_grams.Glycerol,
          unit: 'g',
        },
        {
          label: 'Temperature',
          value: 85,
          unit: '°C',
        },
      ],
      scientific_explanation:
        'This step creates the "glue" that binds biochar particles together. The temperature ensures proper gelatinization of the starch and complete dissolution of the gelatin. Glycerol is added as a plasticizer to prevent brittleness.',
    },
    {
      id: 5,
      title: 'Mixing',
      description: `Mix at ${data.process_steps.mixing_temp_c}°C with stirring at ${data.process_steps.stirring_speed_rpm} RPM`,
      status: 'in_progress',
      parameters: [
        {
          label: 'Temperature',
          value: data.process_steps.mixing_temp_c,
          unit: '°C',
        },
        {
          label: 'Stirring Speed',
          value: data.process_steps.stirring_speed_rpm,
          unit: 'RPM',
        },
      ],
      scientific_explanation: `The biochar is carefully dispersed into the polymer matrix. Temperature and stirring speed are optimized to ensure uniform distribution without damaging the biochar's porous structure.`,
    },
    {
      id: 6,
      title: 'Curing',
      description: `Dry for ${data.process_steps.dry_hours} hours at ${data.process_steps.curing_temp_c}°C`,
      status: 'pending',
      parameters: [
        {
          label: 'Duration',
          value: data.process_steps.dry_hours,
          unit: 'hours',
        },
        {
          label: 'Temperature',
          value: data.process_steps.curing_temp_c,
          unit: '°C',
        },
      ],
      scientific_explanation:
        'Controlled drying removes water while allowing the polymer matrix to set properly. The low temperature and extended time prevent cracking and ensure the formation of a stable, non-brittle material.',
    },
  ];

  return steps;
}

export function getStepById(steps: StepDetail[], stepId: number): StepDetail | undefined {
  return steps.find((step) => step.id === stepId);
}

export const stepImageMap: Record<number, string> = {
  1: 'https://drive.google.com/file/d/1v-pJmMcqSIb8JEoT04egbvOnG1Jc8ao0/view?usp=sharing',
  2: 'https://images.pexels.com/photos/3825517/pexels-photo-3825517.jpeg?w=1200&h=800',
  3: 'https://images.pexels.com/photos/5632399/pexels-photo-5632399.jpeg?w=1200&h=800',
  4: 'https://images.pexels.com/photos/3196887/pexels-photo-3196887.jpeg?w=1200&h=800',
  5: 'https://images.pexels.com/photos/3808517/pexels-photo-3808517.jpeg?w=1200&h=800',
  6: 'https://images.pexels.com/photos/2433090/pexels-photo-2433090.jpeg?w=1200&h=800',
};

export function getStepImage(stepId: number): string {
  return stepImageMap[stepId] || 'https://images.pexels.com/photos/3831857/pexels-photo-3831857.jpeg?w=1200&h=800';
}
