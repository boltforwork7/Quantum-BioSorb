import { ExperimentData, StepDetail, StepParameter } from '../types';

export function generateStepsFromData(data: ExperimentData): StepDetail[] {
  const steps: StepDetail[] = [
    {
      id: 1,
      title: 'Raw Material Preparation',
      description: 'Cutting rice straw into small pieces (2-3 cm)',
      status: 'completed',
      image_filename: 'step1.jpg',
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
      title: 'Pyrolysis Process',
      description: 'Heating the reactor to 350°C (maintain for 3 hours)',
      status: 'critical',
      image_filename: 'step2.jpg',
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
      id: 3,
      title: 'Reactor Sealing',
      description: 'Placing straw in the oven/reactor, sealing all openings except for a gas exhaust vent',
      status: 'completed',
      image_filename: 'step3.jpg',
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
      id: 4,
      title: 'Carbonization Result',
      description: 'The rice straw transforms into Bio-Char (burned state)',
      status: 'completed',
      image_filename: 'step4.jpg',
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
      image_filename: 'step6.jpg',
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
      description: 'Soak in HCL (5%) for 30-45 Minutes',
      status: 'in_progress',
      image_filename: 'step7.jpg',
      parameters: [
        {
          label: 'Chemical Agent',
          value: 'HCl',
        },
        {
          label: 'Concentration',
          value: 5,
          unit: '%',
        },
        {
          label: 'Duration',
          value: '30-45',
          unit: 'minutes',
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
      image_filename: 'step8.jpg',
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
      id: 9,
      title: 'Drying Phase',
      description: 'Placing the activated char back into the oven for drying',
      status: 'in_progress',
      image_filename: 'step4.jpg',
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
      id: 10,
      title: 'Binder Preparation',
      description: 'Image comparing two binders: Gelatin vs. Starch',
      status: 'pending',
      image_filename: 'step10.jpg',
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
      id: 11,
      title: 'Membrane Casting',
      description: 'Spreading the final mixture on a film (before drying)',
      status: 'pending',
      image_filename: 'step11.jpg',
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
  ];

  return steps;
}

export function getStepById(steps: StepDetail[], stepId: number): StepDetail | undefined {
  return steps.find((step) => step.id === stepId);
}

export function getStepImage(stepId: number, filename?: string): string {
  const localImagePath = filename ? `/assets/steps/${filename}` : `/assets/steps/step${stepId}.jpg`;
  return localImagePath;
}

export function getImageLoadFallback(stepId: number): string {
  return `/assets/steps/step${stepId}.jpg`;
}
