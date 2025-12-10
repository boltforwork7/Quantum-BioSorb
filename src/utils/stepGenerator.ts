import { ExperimentData, StepDetail, StepParameter } from '../types';

export function generateStepsFromData(data: ExperimentData): StepDetail[] {
  const steps: StepDetail[] = [
    {
      id: 1,
      title: 'Raw Material Preparation',
      description: 'Cutting rice straw into small pieces (2-3 cm)',
      status: 'completed',
      image_filename: 'step1_cutting.jpg',
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
        {
          label: 'Target Piece Size',
          value: '2-3',
          unit: 'cm',
        },
      ],
      scientific_explanation:
        'Cutting the rice straw into uniform pieces (2-3 cm) increases surface area exposure and ensures more uniform heating during pyrolysis. Consistent particle size is critical for reproducible results and efficient carbonization.',
    },
    {
      id: 2,
      title: 'Reactor Sealing',
      description: 'Placing straw in the oven/reactor, sealing all openings except for a gas exhaust vent',
      status: 'completed',
      image_filename: 'step2_sealing.jpg',
      parameters: [
        {
          label: 'Sealing Method',
          value: 'Airtight with exhaust vent',
        },
        {
          label: 'Purpose',
          value: 'Prevents oxygen entry',
        },
      ],
      scientific_explanation:
        'Proper sealing is essential to create an oxygen-free environment. Oxygen inhibits carbonization and promotes combustion instead. The exhaust vent allows volatile compounds to escape while maintaining anoxic conditions.',
    },
    {
      id: 3,
      title: 'Pyrolysis Process',
      description: 'Heating the reactor to 350°C (maintain for 3 hours)',
      status: 'critical',
      image_filename: 'step3_pyrolysis.jpg',
      parameters: [
        {
          label: 'Target Temperature',
          value: 350,
          unit: '°C',
        },
        {
          label: 'Duration',
          value: 3,
          unit: 'hours',
        },
        {
          label: 'Environment',
          value: 'Oxygen-free',
        },
      ],
      scientific_explanation:
        `Heating to 350°C initiates the thermal decomposition of cellulose, hemicellulose, and lignin. This temperature range optimizes the development of porous structures without excessive volatilization. The 3-hour hold time ensures complete carbonization of the biomass and maximum surface area development.`,
      safety_warning: 'High temperature process - ensure proper ventilation, safety equipment, and monitoring throughout heating and cooling cycles.',
    },
    {
      id: 4,
      title: 'Carbonization Result',
      description: 'The rice straw transforms into Bio-Char (burned state)',
      status: 'completed',
      image_filename: 'step4_carbonization.jpg',
      parameters: [
        {
          label: 'Product',
          value: 'Bio-Char',
        },
        {
          label: 'Calculated Mass',
          value: data.experiment_meta.calculated_biochar_g,
          unit: 'g',
        },
        {
          label: 'Color',
          value: 'Black/Dark Brown',
        },
      ],
      scientific_explanation:
        'Carbonization transforms the original biomass into a porous, carbon-rich material. The black color indicates successful conversion and the removal of hydrogen and oxygen-rich compounds. The resulting biochar retains the plant\'s cellular structure but in a solid, stable form.',
    },
    {
      id: 5,
      title: 'Physical Modification',
      description: 'Grinding the Bio-Char into powder',
      status: 'in_progress',
      image_filename: 'step5_grinding.jpg',
      parameters: [
        {
          label: 'Input',
          value: 'Raw biochar pieces',
        },
        {
          label: 'Output',
          value: 'Fine powder',
        },
        {
          label: 'Purpose',
          value: 'Increase surface area',
        },
      ],
      scientific_explanation:
        'Grinding the biochar into powder further increases its specific surface area and improves the interaction surface available for chemical activation. Finer particles also ensure better distribution when mixing with the polymer binder matrix.',
    },
    {
      id: 6,
      title: 'Chemical Activation (Acid Wash)',
      description: 'Soaking in 10% HCL concentration',
      status: 'in_progress',
      image_filename: 'step6_acid_wash.jpg',
      parameters: [
        {
          label: 'Chemical Agent',
          value: 'HCl',
        },
        {
          label: 'Concentration',
          value: 10,
          unit: '%',
        },
        {
          label: 'Duration',
          value: data.biochar_prep.step_2_acid_wash,
        },
      ],
      scientific_explanation:
        'Acid washing chemically removes ash and mineral compounds, creating additional micro-pores in the biochar structure. This dramatically increases surface area and improves CO₂ adsorption capacity. HCl preferentially removes calcium, magnesium, and other cations.',
      safety_warning: 'CRITICAL: Always add Acid to Water (1:3 ratio), NEVER the reverse. Adding water to concentrated acid causes violent exothermic reaction and splashing. Wear acid-resistant gloves, goggles, and work in well-ventilated area.',
    },
    {
      id: 7,
      title: 'Soaking Phase',
      description: 'The visible interaction during the soaking process',
      status: 'in_progress',
      image_filename: 'step7_soaking.jpg',
      parameters: [
        {
          label: 'Medium',
          value: 'HCl Solution',
        },
        {
          label: 'Reaction Type',
          value: 'Acid-base interaction',
        },
        {
          label: 'Visual Indicator',
          value: 'Bubbling, darkening',
        },
      ],
      scientific_explanation:
        'During soaking, HCl reacts with mineral oxides and basic compounds in the biochar, dissolving impurities and creating new pore structures. The bubbling indicates CO₂ release, confirming the activation process. The solution darkens due to leached compounds.',
    },
    {
      id: 8,
      title: 'Drying Phase',
      description: 'Placing the activated char back into the oven for drying',
      status: 'in_progress',
      image_filename: 'step8_drying.jpg',
      parameters: [
        {
          label: 'Temperature',
          value: 110,
          unit: '°C',
        },
        {
          label: 'Duration',
          value: '2-4',
          unit: 'hours',
        },
        {
          label: 'Purpose',
          value: 'Remove residual moisture and acid',
        },
      ],
      scientific_explanation:
        'Drying removes residual HCl solution and water from the biochar pores. Controlled temperature ensures the newly created pore structures remain open and accessible for CO₂ adsorption. Thorough drying is essential for consistent performance.',
    },
    {
      id: 9,
      title: 'Binder Preparation',
      description: 'Image comparing two binders: Gelatin vs. Starch',
      status: 'pending',
      image_filename: 'step9_binder_prep.jpg',
      parameters: [
        {
          label: 'Primary Binder',
          value: 'Starch',
          unit: `${data.components_grams.Starch}g`,
        },
        {
          label: 'Secondary Binder',
          value: 'Gelatin',
          unit: `${data.components_grams.Gelatin}g`,
        },
        {
          label: 'Plasticizer',
          value: 'Glycerol',
          unit: `${data.components_grams.Glycerol}g`,
        },
      ],
      scientific_explanation:
        'Starch and gelatin form a biodegradable polymer matrix that holds biochar particles together. Starch provides structural integrity while gelatin improves flexibility. Glycerol acts as a plasticizer, preventing brittleness and allowing the composite to flex without breaking.',
    },
    {
      id: 10,
      title: 'Membrane Casting',
      description: 'Spreading the final mixture on a film (before drying)',
      status: 'pending',
      image_filename: 'step10_casting.jpg',
      parameters: [
        {
          label: 'Total Mass',
          value: data.experiment_meta.resulting_total_mass_g,
          unit: 'g',
        },
        {
          label: 'Biochar Concentration',
          value: data.experiment_meta.biochar_concentration_percent,
          unit: '%',
        },
        {
          label: 'Support Material',
          value: 'Film/Paper substrate',
        },
      ],
      scientific_explanation:
        'Spreading the biochar-binder mixture uniformly on a substrate creates a thin film composite. Even distribution ensures consistent CO₂ adsorption performance across the entire membrane. The substrate provides mechanical support during handling and drying.',
    },
    {
      id: 11,
      title: 'Final Product',
      description: 'The dried, finished membrane sample',
      status: 'pending',
      image_filename: 'step11_final.jpg',
      parameters: [
        {
          label: 'Final State',
          value: 'Solid membrane',
        },
        {
          label: 'Color',
          value: 'Black/Dark brown',
        },
        {
          label: 'Predicted CO₂ Uptake',
          value: data.experiment_meta.predicted_batch_uptake_g,
          unit: 'g',
        },
      ],
      scientific_explanation:
        'The finished membrane is a solid biochar-polymer composite ready for CO₂ adsorption studies. The combination of high surface area biochar and flexible polymer matrix creates an effective, mechanically stable material. The predicted batch uptake is based on the biochar\'s surface area and the loading percentage.',
    },
  ];

  return steps;
}

export function getStepById(steps: StepDetail[], stepId: number): StepDetail | undefined {
  return steps.find((step) => step.id === stepId);
}

export function getStepImage(stepId: number, filename?: string): string {
  const localImagePath = filename ? `/assets/steps/${filename}` : `/assets/steps/step${stepId}_placeholder.jpg`;
  return localImagePath;
}

export function getImageLoadFallback(stepId: number): string {
  const fallbacks: Record<number, string> = {
    1: '/home/project/assets/steps/step1.jpg',
    2: '/home/project/assets/steps/step2.jpg',
    3: '/home/project/assets/steps/step3.jpg',
    4: 'https://images.pexels.com/photos/3196887/pexels-photo-3196887.jpeg?w=1200&h=800',
    5: 'https://images.pexels.com/photos/3808517/pexels-photo-3808517.jpeg?w=1200&h=800',
    6: 'https://images.pexels.com/photos/2433090/pexels-photo-2433090.jpeg?w=1200&h=800',
    7: 'https://images.pexels.com/photos/3825517/pexels-photo-3825517.jpeg?w=1200&h=800',
    8: 'https://images.pexels.com/photos/3808517/pexels-photo-3808517.jpeg?w=1200&h=800',
    9: 'https://images.pexels.com/photos/3196887/pexels-photo-3196887.jpeg?w=1200&h=800',
    10: 'https://images.pexels.com/photos/2433090/pexels-photo-2433090.jpeg?w=1200&h=800',
    11: 'https://images.pexels.com/photos/3831857/pexels-photo-3831857.jpeg?w=1200&h=800',
  };
  return fallbacks[stepId] || 'https://images.pexels.com/photos/3831857/pexels-photo-3831857.jpeg?w=1200&h=800';
}
