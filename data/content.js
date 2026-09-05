/* Edit this file to update project details and gallery photographs without changing layouts. */
window.SITE_CONTENT = {
  brainRegions: {
    vision: { index: "01 / 06", system: "Prefrontal systems", copy: "Research interests and questions I am currently thinking about", action: "Research", href: "./research.html", x: .36, y: .34, color: "#ef6c2f" },
    memory: { index: "02 / 06", system: "Hippocampal systems", copy: "Memory, replay, and continuous neural representations", action: "Memory work", href: "./work.html#replay", x: .47, y: .58, color: "#ef6c2f" },
    geometry: { index: "03 / 06", system: "Distributed geometric network", copy: "Symmetry, invariance, dynamics, and SE(2) research", action: "Geometry work", href: "./work.html#se2", x: .62, y: .48, color: "#f1a06f" },
    motor: { index: "04 / 06", system: "Motor systems", copy: "Dance, sport, and other forms of movement", action: "Life", href: "./life.html#movement", x: .58, y: .25, color: "#a51c30" },
    visual: { index: "05 / 06", system: "Visual systems", copy: "Photography and selected visual work", action: "Photography", href: "./life.html#photography", x: .77, y: .42, color: "#a51c30" },
    about: { index: "06 / 06", system: "Whole-brain interaction", copy: "Background, education, and contact", action: "About", href: "./about.html", x: .50, y: .72, color: "#ef6c2f" }
  },
  projects: {
    replay: {
      label: "Independent research · 2025—present",
      title: "Sleep Replay on Continuous Memory Manifolds",
      question: "Does sleep replay simply strengthen memories, or can replay timing and neural overlap determine whether similar memories blend together or become easier to distinguish?",
      contribution: ["Developed a label-free model of sleep replay on continuous memory representations.","Designed a 4,032-row simulation study with matched controls and a locked replication across 48 simulated subjects.","Built a biologically constrained excitatory/inhibitory implementation and tested parameter sweeps, sparse/noisy recovery, and held-out prediction.","Reanalyzed two public targeted-memory-reactivation datasets while separating behaviorally supported predictions from physiological claims that still require validation."],
      methods: "Continuous attractor networks, neural fields, dynamical systems, circular statistics, fixed-effects modeling, bootstrap inference, permutation tests, model recovery, MATLAB, and Python.",
      note: "Result scope: the reported separation appears in a bounded modeled regime; it is not presented as a universal biological effect."
    },
    se2: {
      label: "Co-first author, listed first · Manuscript submitted · 2026",
      title: "Geometry-Informed SE(2) Consistency Monitoring",
      question: "Can geometric consistency under coordinate-frame transformations provide a lightweight and interpretable signal for online robotic fault monitoring?",
      contribution: ["Developed a lightweight neural controller and a detector combining equivariance residuals, kinematic deviations, and command–observation mismatches.","Calibrated on healthy trajectories only and evaluated eight simulated fault types.","Designed locked validation, coordinate-frame and OOD stress tests, multi-seed regularization ablations, fault-family controls, and recovery-control ablations.","Released code, frozen protocols, checkpoints, raw outputs, and figures; reported uncertainty and non-significant effects transparently."],
      methods: "SE(2) equivariance, geometric machine learning, anomaly detection, robotic control, locked validation, out-of-distribution testing, PyTorch, and Python.",
      note: "Status: manuscript submitted to Robotics and Autonomous Systems. It is not described as accepted, published, forthcoming, or peer-reviewed."
    },
    chaos: {
      label: "Jianfeng Lu Lab, Duke University · Research Assistant · 2024",
      title: "Attractor Networks, Forgetting, and Chaos",
      question: "How do dynamical regimes govern transitions among stable recall, drift, and memory loss?",
      contribution: ["Developed and tuned attractor-network models of memory retrieval.","Applied dynamical mean-field theory to characterize recall, drift, and memory-loss regimes.","Reproduced results from Physical Review X 13, 011009 across more than 300 MATLAB simulations and parameter sweeps.","Produced reusable research code and technical documentation; received a $1,000 student research award."],
      methods: "Attractor networks, dynamical mean-field theory, memory retrieval, nonlinear dynamics, MATLAB, and reproducibility.",
      note: "This work focused on careful reproduction, regime characterization, and reusable implementation."
    }
  },
  gallery: [
    /* Example—uncomment after adding your own image:
    { src: "./assets/images/gallery/bromo-01.webp", alt: "Morning light over Mount Bromo", location: "East Java", year: "2026", caption: "Before the caldera woke", camera: "" }
    */
  ]
};
