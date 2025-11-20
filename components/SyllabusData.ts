import { AppView } from "../types";

export interface Chapter {
  id: number;
  grade: 11 | 12;
  title: string;
  description: string;
  topics: string[];
  labId?: AppView;
  labLabel?: string;
}

export const SYLLABUS_DATA: Chapter[] = [
  // --- Grade 11 (Part I) ---
  {
    id: 1,
    grade: 11,
    title: "Measurements",
    description: "Physical Quantities, SI Units, Errors, Uncertainties, Precision, Accuracy, Dimensions.",
    topics: [
      "Base vs. Derived quantities",
      "International System of Units (SI)",
      "Random vs. Systematic errors",
      "Precision and Accuracy",
      "Significant Figures",
      "Dimensional Analysis"
    ]
  },
  {
    id: 2,
    grade: 11,
    title: "Vectors and Equilibrium",
    description: "Vector addition, products, torque, and conditions of equilibrium.",
    topics: [
      "Rectangular Components",
      "Head-to-tail rule",
      "Dot Product (Scalar) & Cross Product (Vector)",
      "Torque (Moment of Force)",
      "First Condition of Equilibrium (Translational)",
      "Second Condition of Equilibrium (Rotational)"
    ],
    labId: AppView.VECTOR_LAB,
    labLabel: "Vector Lab"
  },
  {
    id: 3,
    grade: 11,
    title: "Motion and Force",
    description: "Displacement, Newton's Laws, Momentum, and Projectile Motion.",
    topics: [
      "Velocity-Time Graphs",
      "Newton’s Laws of Motion",
      "Momentum & Impulse",
      "Elastic and Inelastic Collisions",
      "Projectile Motion (Range, Height, Time)"
    ],
    labId: AppView.PROJECTILE_LAB,
    labLabel: "Projectile Sim"
  },
  {
    id: 4,
    grade: 11,
    title: "Work and Energy",
    description: "Work done by constant/variable forces, Power, and Energy conservation.",
    topics: [
      "Work Done by Variable Forces",
      "Gravitational Field & Conservative Fields",
      "Power (Average vs Instantaneous)",
      "Absolute Potential Energy",
      "Inter-conversion of Energy",
      "Non-Conventional Energy Sources"
    ],
    labId: AppView.FRICTION_LAB,
    labLabel: "Friction & Forces Sim"
  },
  {
    id: 5,
    grade: 11,
    title: "Circular Motion",
    description: "Angular kinematics, Centripetal force, and Moment of Inertia.",
    topics: [
      "Angular Displacement, Velocity, Acceleration",
      "Relation between Linear and Angular quantities",
      "Centripetal Force",
      "Moment of Inertia",
      "Angular Momentum",
      "Satellites & Geostationary Orbits"
    ],
    labId: AppView.CIRCULAR_LAB,
    labLabel: "Circular Motion Lab"
  },
  {
    id: 6,
    grade: 11,
    title: "Fluid Dynamics",
    description: "Viscous drag, Terminal velocity, and Bernoulli’s Equation.",
    topics: [
      "Viscous Drag & Stokes’ Law",
      "Terminal Velocity",
      "Streamline vs. Turbulent flow",
      "Equation of Continuity",
      "Bernoulli’s Equation",
      "Venturi meter & Blood pressure"
    ]
  },
  {
    id: 7,
    grade: 11,
    title: "Oscillations",
    description: "Simple Harmonic Motion (SHM), Pendulums, and Resonance.",
    topics: [
      "SHM Characteristics",
      "Mass-Spring System",
      "Simple Pendulum",
      "Energy in SHM",
      "Resonance & Damping"
    ],
    labId: AppView.SHM_LAB,
    labLabel: "Mass-Spring Lab"
  },
  {
    id: 8,
    grade: 11,
    title: "Waves",
    description: "Sound speed, Superposition, Doppler Effect, and Stationary Waves.",
    topics: [
      "Progressive, Transverse, Longitudinal waves",
      "Speed of Sound (Newton & Laplace)",
      "Interference & Beats",
      "Standing (Stationary) Waves",
      "Doppler Effect"
    ]
  },
  {
    id: 9,
    grade: 11,
    title: "Physical Optics",
    description: "Interference, Diffraction, and Polarization of light.",
    topics: [
      "Huygen’s Principle",
      "Young’s Double Slit Experiment (YDSE)",
      "Interference in Thin Films",
      "Michelson Interferometer",
      "Diffraction Grating",
      "Polarization"
    ]
  },
  {
    id: 10,
    grade: 11,
    title: "Optical Instruments",
    description: "Lenses, Microscopes, Telescopes, and Fiber Optics.",
    topics: [
      "Magnification vs. Resolution",
      "Simple & Compound Microscope",
      "Astronomical Telescope",
      "Spectrometer",
      "Fiber Optics & Total Internal Reflection"
    ],
    labId: AppView.OPTICS_LAB,
    labLabel: "Lens Lab"
  },
  {
    id: 11,
    grade: 11,
    title: "Heat and Thermodynamics",
    description: "Kinetic Theory, First & Second Laws of Thermodynamics, Entropy.",
    topics: [
      "Kinetic Theory of Gases",
      "First Law of Thermodynamics",
      "Molar Specific Heats (Cp - Cv = R)",
      "Heat Engine & Efficiency",
      "Carnot Cycle & Entropy"
    ]
  },

  // --- Grade 12 (Part II) ---
  {
    id: 12,
    grade: 12,
    title: "Electrostatics",
    description: "Coulomb's Law, Electric Field, Gauss's Law, and Capacitors.",
    topics: [
      "Coulomb’s Law",
      "Electric Field & Potential",
      "Gauss’s Law Applications",
      "Capacitors & Capacitance",
      "Energy stored in a Capacitor",
      "Charging & Discharging (RC Time Constant)"
    ]
  },
  {
    id: 13,
    grade: 12,
    title: "Current Electricity",
    description: "Ohm's Law, Kirchhoff's Rules, and Measuring Instruments.",
    topics: [
      "Drift Velocity",
      "Ohm’s Law & Resistivity",
      "Color Code of Carbon Resistors",
      "Electrical Power",
      "Kirchhoff’s Rules (KCL & KVL)",
      "Wheatstone Bridge & Potentiometer"
    ]
  },
  {
    id: 14,
    grade: 12,
    title: "Electromagnetism",
    description: "Magnetic Fields, Ampere's Law, Motors, and Galvanometers.",
    topics: [
      "Force on a Conductor in B-Field",
      "Magnetic Flux",
      "Ampere’s Law",
      "Lorentz Force",
      "e/m of an Electron",
      "Torque on a Coil & Motors",
      "Galvanometer Conversion"
    ]
  },
  {
    id: 15,
    grade: 12,
    title: "Electromagnetic Induction",
    description: "Faraday's Law, Lenz's Law, Generators, and Transformers.",
    topics: [
      "Induced EMF & Faraday’s Law",
      "Lenz’s Law",
      "Motional EMF",
      "Mutual & Self Induction",
      "AC Generator",
      "Transformers"
    ]
  },
  {
    id: 16,
    grade: 12,
    title: "Alternating Current",
    description: "AC Circuits, Impedance, Resonance, and Maxwell's Equations.",
    topics: [
      "Peak, RMS, Peak-to-Peak values",
      "Phase lag/lead",
      "RL, RC, and RLC Series Circuits",
      "Resonance",
      "Maxwell’s Equations Overview"
    ]
  },
  {
    id: 17,
    grade: 12,
    title: "Physics of Solids",
    description: "Mechanical and Magnetic properties of solids, Band Theory.",
    topics: [
      "Crystalline, Amorphous, Polymeric solids",
      "Stress, Strain, Young’s Modulus",
      "Band Theory (Conductors, Insulators, Semiconductors)",
      "Superconductors",
      "Magnetic Properties (Dia, Para, Ferro)",
      "Hysteresis Loop"
    ]
  },
  {
    id: 18,
    grade: 12,
    title: "Electronics",
    description: "Semiconductors, Rectification, Transistors, and Logic Gates.",
    topics: [
      "p-n Junction & Biasing",
      "Rectification (Half & Full wave)",
      "Transistors (BJT) as Amplifiers",
      "Operational Amplifiers (Op-Amp)",
      "Digital Electronics (Logic Gates)"
    ]
  },
  {
    id: 19,
    grade: 12,
    title: "Dawn of Modern Physics",
    description: "Relativity, Quantum Theory, and Wave-Particle Duality.",
    topics: [
      "Special Theory of Relativity (E=mc²)",
      "Black Body Radiation",
      "Photoelectric Effect",
      "Compton Effect",
      "De Broglie Wavelength",
      "Heisenberg’s Uncertainty Principle"
    ]
  },
  {
    id: 20,
    grade: 12,
    title: "Atomic Spectra",
    description: "Bohr's Model, Hydrogen Spectrum, X-Rays, and Lasers.",
    topics: [
      "Bohr’s Model",
      "Spectral Series (Lyman, Balmer, etc.)",
      "Excitation & Ionization Potentials",
      "X-Rays Production",
      "Lasers (He-Ne)"
    ]
  },
  {
    id: 21,
    grade: 12,
    title: "Nuclear Physics",
    description: "Radioactivity, Decay, Fission, Fusion, and Reactors.",
    topics: [
      "Mass Defect & Binding Energy",
      "Radioactivity (Alpha, Beta, Gamma)",
      "Half-life",
      "Radiation Detectors",
      "Nuclear Fission & Fusion",
      "Nuclear Reactors"
    ]
  }
];