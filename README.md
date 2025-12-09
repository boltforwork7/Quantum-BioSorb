# Carbon-X Architect: Quantum-Bio Research Dashboard

A futuristic, interactive dashboard for visualizing and exploring biochar composite research experiments. This application transforms scientific JSON data into an engaging, visually stunning interface with detailed step-by-step documentation.

## Features

### Dashboard Overview

The main dashboard provides a comprehensive view of your experiment:

- **AI Quantum Score**: A glowing neon gauge displaying the experiment's AI-evaluated score
- **Key Performance Indicators**: Four glassmorphism cards showing:
  - Adsorption Efficiency (%)
  - Virtual Surface Area (m²/g) with interactive tooltips
  - Total CO₂ Capacity (g)
  - Biochar Loading Percentage (%)
- **Material Composition**: Interactive donut chart with detailed input/output metrics
- **Manufacturing Timeline**: 6-step process visualization with expandable details
- **Advanced Thermodynamics**: Collapsible "nerd section" with:
  - Gibbs Free Energy analysis
  - Shannon Entropy measurements
  - Activation goals and spontaneous reaction indicators

### Interactive Step Gallery

Click the green external link icon (🔗) on any manufacturing step to enter the **Step Detail View**:

#### Step Detail Features:

**Header Section**
- Step title with glowing gradient text
- Current status badge (Pending, In Progress, Completed, Critical Phase)
- Easy "Back to Dashboard" navigation

**Visual Evidence**
- High-quality laboratory imagery (16:9 aspect ratio)
- Customizable photo mapping for each step
- Professional lab scene overlays with step labels

**Process Parameters Grid**
- Dynamic cards showing all relevant metrics for the step
- Temperature, duration, stirring speed, and material quantities
- Iconic indicators for quick visual reference
- Large, readable monospace font for precise values

**Scientific Context**
- In-depth explanation of the process step
- Why each parameter matters for the final result
- Thermodynamic and structural considerations

**Safety Protocols**
- Red alert banner for critical safety warnings
- Appears only when relevant to specific steps
- Clear guidance on hazards and precautions

**Navigation**
- Previous/Next step buttons for sequential exploration
- Return to Dashboard button for quick exit
- Keyboard-accessible and fully animated

## Technology Stack

- **React 18** - UI framework
- **Vite** - Lightning-fast build tool
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **Framer Motion** - Smooth animations and transitions
- **Recharts** - Data visualization (donut chart)
- **React Router** - Client-side routing
- **Lucide React** - Beautiful SVG icons

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Usage

### 1. Upload Your Data

The application starts with a beautiful drag-and-drop upload interface:
- Click the upload zone or drag a JSON file
- Supported format: The provided `sample-data.json` structure
- File is validated and parsed instantly

### 2. Explore the Dashboard

Once data loads:
- **Scroll** through the main dashboard to see all metrics
- **Hover** over cards for additional information
- **Click expand buttons** to reveal detailed explanations
- **Click the green link icon** on any step to view its detail page

### 3. Deep Dive into Steps

Navigate to step detail pages to:
- View laboratory evidence and process photos
- Analyze specific parameters and measurements
- Understand the scientific rationale
- Review safety protocols if applicable
- Navigate between steps sequentially

### 4. Load New Data

Use the "Load Different Dataset" button to upload a new JSON file without refreshing the page.

## JSON Data Format

Required structure for `sample-data.json`:

```json
{
  "experiment_id": "CX-2024-001",
  "experiment_meta": {
    "input_type": "Biochar",
    "input_mass_g": 19.0,
    "calculated_biochar_g": 19.0,
    "resulting_total_mass_g": 36.76,
    "predicted_batch_uptake_g": 2.27,
    "efficiency_g_per_g": 0.061,
    "biochar_concentration_percent": 51.7
  },
  "components_grams": {
    "Starch": 8.19,
    "Gelatin": 5.46,
    "Glycerol": 4.12,
    "Biochar": 19.0
  },
  "biochar_prep": {
    "source_material_note": "Start with 19.0g Biochar",
    "step_1": "Grind Rice Straw",
    "step_2_acid_wash": "Soak in HCL (30%) for 71 minutes",
    "step_3_pyrolysis": "Heat at 572°C",
    "activation_goal": "Target Surface Area: 1349 m2/g"
  },
  "process_steps": {
    "mixing_temp_c": 85,
    "stirring_speed_rpm": 500,
    "dry_hours": 24,
    "curing_temp_c": 25
  },
  "prediction_metrics": {
    "Gibbs_Energy": -25060,
    "Shannon_Entropy": 0.53,
    "Virtual_Surface_Area_m2g": 1349
  },
  "ai_score": 1546
}
```

## Customization Guide

### Adding Custom Step Images

Edit `src/utils/stepGenerator.ts` and update the `stepImageMap`:

```typescript
export const stepImageMap: Record<number, string> = {
  1: 'your-image-url-here',
  2: 'your-image-url-here',
  // ... etc
};
```

**Image Recommendations:**
- Aspect ratio: 16:9 (1200x675px or larger)
- Format: JPEG or WebP for best performance
- Source: Use Pexels for free high-quality lab/science photos

### Modifying Step Data

Edit `src/utils/stepGenerator.ts` to customize:
- Step titles and descriptions
- Parameters and their units
- Scientific explanations
- Safety warnings
- Status indicators

### Changing Theme Colors

All color accents use Tailwind classes:
- Primary accent: `cyan-400` / `cyan-500`
- Secondary accent: `emerald-400` / `emerald-500`
- Edit any component file to swap gradient colors

## Design Features

### Animations
- Fade-in entrance animations on page load
- Smooth hover transitions on interactive elements
- Expanded/collapsed state animations
- Route transition animations when navigating between pages

### Glassmorphism
- Backdrop blur effects on cards
- Semi-transparent backgrounds
- Border gradients for premium feel
- Shadow depth layering

### Typography
- **Body text**: Inter font (clean, modern)
- **Monospace**: JetBrains Mono for all numerical data
- Proper contrast ratios for accessibility
- Font weights optimized for hierarchy

### Responsive Design
- Mobile-first approach
- Grid layouts adapt to screen size
- Touch-friendly button sizes
- Readable text on all devices

## File Structure

```
src/
├── components/
│   ├── AdvancedMetrics.tsx      # Thermodynamics section
│   ├── FileUpload.tsx            # JSON upload interface
│   ├── HeroCards.tsx             # KPI cards
│   ├── MaterialComposition.tsx    # Donut chart & material info
│   ├── ManufacturingTimeline.tsx  # 6-step process visualization
│   └── TopNav.tsx                # Header with AI score gauge
├── pages/
│   └── StepDetailPage.tsx         # Detail view for individual steps
├── utils/
│   └── stepGenerator.ts           # Step data generation & image mapping
├── App.tsx                        # Main app with routing
├── types.ts                       # TypeScript interfaces
└── index.css                      # Global styles & fonts
```

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Performance

- Optimized for production builds
- Lazy loading of images
- Efficient state management
- Smooth 60fps animations

## Future Enhancements

Potential additions:
- Export data visualization as PDF or image
- 3D material composition visualization
- Real-time temperature/parameter graphs
- Export step documentation as printable guide
- Multi-language support
- Dark/Light theme toggle
- Local storage for experiment history

## License

This project is for educational and research purposes.

## Support

For issues or feature requests, please ensure your JSON data matches the required format and that all image URLs are accessible.

---

**Created with** ❤️ **for ISEF science projects**
