export interface ExperimentData {
  experiment_id?: string;
  experiment_meta: {
    input_type: string;
    input_mass_g: number;
    calculated_biochar_g: number;
    resulting_total_mass_g: number;
    predicted_batch_uptake_g: number;
    efficiency_g_per_g: number;
    biochar_concentration_percent: number;
  };
  components_grams: {
    Starch: number;
    Gelatin: number;
    Glycerol: number;
    Biochar: number;
  };
  biochar_prep: {
    source_material_note: string;
    step_1: string;
    step_2_acid_wash: string;
    step_3_pyrolysis: string;
    activation_goal: string;
  };
  process_steps: {
    mixing_temp_c: number;
    stirring_speed_rpm: number;
    dry_hours: number;
    curing_temp_c: number;
  };
  prediction_metrics: {
    Gibbs_Energy: number;
    Shannon_Entropy: number;
    Virtual_Surface_Area_m2g: number;
  };
  ai_score: number;
}
