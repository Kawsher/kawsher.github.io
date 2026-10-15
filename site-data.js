// ============================================================
// SITE DATA — edit this file to update your website content.
// Then push to GitHub. No other files need touching.
// ============================================================

const SITE_DATA = {

  // ---- Personal info ----
  name: "Md. Kawsher Mahbub",
  title: "Assistant Professor",
  department: "Department of Computer Science and Engineering",
  institution: "NPI University of Bangladesh",
  location: "495 East Basta, Singair, Manikganj-1800, Bangladesh",
  email: "kawsher.cse@gmail.com",
  phone: "+8801719145411",
  mission: "Reliable AI for high-stakes decisions.",
  bio: [
    "I am an Assistant Professor of Computer Science and Engineering at NPI University of Bangladesh, where I founded and lead the CARMA AI Lab. My research builds trustworthy AI for clinical decision-making: uncertainty quantification, explainable AI, out-of-distribution generalization, and forensic auditing of medical imaging models.",
    "I received my M.S. in Computer Science from Kent State University (2025) and my B.Sc. from the Bangladesh University of Business and Technology (2021). My work is driven by a simple observation from the clinic: a model that is accurate on a benchmark can still fail a patient when the hospital, the scanner, or the population changes. I build methods that catch those failures before they reach the bedside."
  ],
  availability: "I am always happy to discuss research collaborations.",
  photo: "assets/Picture.JPG",

  // ---- Narrative sections (home page) ----
  path: [
    "I received my B.Sc. in Computer Science and Engineering from the Bangladesh University of Business and Technology (BUBT) in 2021, and stayed on as a lecturer. There I mentored undergraduate research projects in medical imaging and computer vision — several of those student projects grew into peer-reviewed publications — and served as advisor to the IEEE CS BUBT student branch chapter.",
    "I then earned my M.S. in Computer Science from Kent State University (2025), where I worked as a graduate teaching assistant while researching trustworthy machine learning for medical image analysis.",
    "In 2026 I returned to Bangladesh to join the faculty of NPI University of Bangladesh as an Assistant Professor, where I also head the ICT Cell and founded the CARMA AI Lab."
  ],
  currentWork: [
    "My lab studies how to make clinical AI reliable enough to matter at the bedside. We audit models the way clinicians audit diagnoses: hunting for shortcut learning and miscalibration (forensic evaluation), predicting how a model will behave at a new hospital before it is ever deployed (out-of-distribution generalization), explaining model decisions in terms clinicians can inspect (interpretability), and quantifying uncertainty so that models know when to abstain and refer (safety).",
    "Two active threads drive this work: STAMP, which predicts out-of-distribution performance without target data, and SpatialUQ, which quantifies uncertainty for frozen black-box vision models from spatial consistency. Both are currently under review."
  ],
  collaboratorNote: "Prospective collaborators: I am always happy to discuss research collaborations — especially on auditing, generalization, and uncertainty in medical AI. Email me with a short note about the problem you want to work on.",

  // ---- Social links ----
  links: {
    scholar: "https://scholar.google.com/citations?user=fQ_TTFsAAAAJ",
    github: "https://github.com/Kawsher",
    linkedin: "https://www.linkedin.com/in/kawsher-mahbub/",
    twitter: "https://x.com/kawsher_mahbub",
    orcid: "https://orcid.org/0000-0002-4200-542X",
    researchgate: "https://www.researchgate.net/profile/Md-Kawsher-Mahbub",
    lab: "https://kawsher.github.io/carma-ai-lab/",
    cv: "assets/CV_Md_Kawsher_Mahbub.pdf"
  },

  // ---- Scholar stats (static fallback; updated live when scholar loads) ----
  stats: {
    publications: 14,
    citations: 368,
    hIndex: 10,
    i10Index: 11
  },

  // ---- Research pillars ----
  interests: [
    { icon: "ti-clipboard-check", label: "Evaluation & Auditing",
      desc: "Forensic auditing of ensemble classifiers: calibration, shortcut detection, and failure analysis when models meet real clinical data." },
    { icon: "ti-arrows-transfer-up", label: "Generalization",
      desc: "Predicting out-of-distribution performance without target data. How do medical vision models behave across hospitals, scanners, and populations?" },
    { icon: "ti-zoom-question", label: "Interpretability",
      desc: "Human-centered explanations for clinical decision support: what the model looked at, and why a clinician should (or should not) trust it." },
    { icon: "ti-shield-check", label: "Safety & Uncertainty",
      desc: "Post-hoc uncertainty quantification for frozen black-box vision models. Knowing when to predict, when to abstain, and when to refer." }
  ],

  // ---- News items — newest first ----
  news: [
    { date: "Oct 2026", tag: "milestone", text: "Founded the CARMA AI Lab — Clinical AI for Reliable Medical Analytics." },
    { date: "Oct 2026", tag: "paper", text: "SpatialUQ: post-hoc uncertainty quantification from spatial consistency — submitted to AISTATS 2027." },
    { date: "2026", tag: "paper", text: "STAMP: predicting out-of-distribution generalization without target data — submitted to ICLR 2027." },
    { date: "2026", tag: "paper", text: "'Foundation Models in Healthcare' survey under review at ACM Computing Surveys." },
    { date: "Mar 2026", tag: "position", text: "Joined NPI University of Bangladesh as Assistant Professor, Dept. of CSE." },
    { date: "May 2025", tag: "milestone", text: "Completed M.S. in Computer Science at Kent State University (CGPA 3.80)." },
    { date: "Jan 2025", tag: "paper", text: "Paper published — Expert Systems with Applications (explainable heart disease diagnosis via stacked ensembles)." },
    { date: "Oct 2024", tag: "service", text: "Program Committee Member, IEEE CBMS 2024 (37th edition)." }
  ],

  // ---- Publications — newest first ----
  publications: [
    {
      type: "under-review",
      authors: "M. K. Mahbub and M. Biswas",
      title: "STAMP: Predicting Out-of-Distribution Generalization without Target Data",
      venue: "Submitted to ICLR 2027",
      year: 2026,
      status: "Under Review"
    },
    {
      type: "under-review",
      authors: "M. K. Mahbub, M. Biswas, M. N. Morshed, and W. Yu",
      title: "SpatialUQ: Post-Hoc Uncertainty Quantification from Spatial Consistency in Black-Box Vision Models",
      venue: "Submitted to AISTATS 2027",
      year: 2026,
      status: "Under Review"
    },
    {
      type: "under-review",
      authors: "M. K. Mahbub, M. S. Hossain, M. A. M. Miah, M. N. Morshed, M. N. Arpa, K. C. Santosh, and M. Biswas",
      title: "Beyond Benchmark Accuracy: Forensic Explainability Auditing for Ensemble Chest X-ray Classifiers",
      venue: "",
      year: 2026,
      status: "Under Revision"
    },
    {
      type: "under-review",
      authors: "M. K. Mahbub, S. Hossain, M. A. M. Miah, M. N. Arpa, and M. Biswas",
      title: "Foundation Models in Healthcare: A Survey of Generalization, Uncertainty, and Trustworthiness",
      venue: "Under review at ACM Computing Surveys",
      year: 2026,
      status: "Under Review"
    },
    {
      type: "journal",
      authors: "Ghose, P., Oliullah, K., Mahbub, M. K., Biswas, M., Uddin, K. N., & Jamil, H. M.",
      title: "Explainable AI assisted heart disease diagnosis through effective feature engineering and stacked ensemble learning",
      venue: "Expert Systems with Applications",
      year: 2025,
      volume: "265, 125928",
      link: ""
    },
    {
      type: "journal",
      authors: "Mahbub, M. K., Biswas, M., Gaur, L., Alenezi, F., & Santosh, K. C.",
      title: "Deep features to detect pulmonary abnormalities in chest X-rays due to infectious diseases: COVID-19, pneumonia, and tuberculosis",
      venue: "Information Sciences",
      year: 2022,
      volume: "592, 389-401",
      link: ""
    },
    {
      type: "journal",
      authors: "Ghose, P., Alavi, M., Tabassum, M., Ashraf Uddin, M., Biswas, M., Mahbub, M. K., & Zhao, Z.",
      title: "Detecting COVID-19 infection status from chest X-ray and CT scan via single transfer learning-driven approach",
      venue: "Frontiers in Genetics",
      year: 2022,
      volume: "13, 980338",
      link: ""
    },
    {
      type: "conference",
      authors: "Mahbub, M. K., Zamil, M. Z. H., Miah, M. A. M., Ghose, P., Biswas, M., & Santosh, K. C.",
      title: "Mobapp4infectiousdisease: Classify COVID-19, pneumonia, and tuberculosis",
      venue: "Proc. IEEE 35th International Symposium on Computer-Based Medical Systems (CBMS)",
      year: 2022,
      pages: "119-124",
      link: ""
    },
    {
      type: "conference",
      authors: "Mahbub, M. K., Biswas, M., Miah, M. A. M., & Kaiser, M. S.",
      title: "Deep neural networks for brain tumor detection from MRI images",
      venue: "Proc. Trends in Computational and Cognitive Engineering (TCCE 2021), Springer",
      year: 2022,
      pages: "473-485",
      link: ""
    },
    {
      type: "conference",
      authors: "Mahbub, M. K., Miah, M. A. M., Islam, S. M. S., Sorna, S., Hossain, S., & Biswas, M.",
      title: "Best eleven forecast for Bangladesh cricket team with machine learning techniques",
      venue: "Proc. 5th International Conference on Electrical Engineering and Information & Communication Technology (ICEEICT), IEEE",
      year: 2021,
      pages: "1-6",
      link: ""
    },
    {
      type: "conference",
      authors: "Mahbub, M. K., Biswas, M., Miah, A. M., Shahabaz, A., & Kaiser, M. S.",
      title: "COVID-19 detection using chest X-ray images with a RegNet structured deep learning model",
      venue: "Proc. International Conference on Applied Intelligence and Informatics (AII 2021), Springer",
      year: 2021,
      pages: "358-370",
      link: ""
    },
    {
      type: "conference",
      authors: "Biswas, M., Mahbub, M. K., & Miah, M. A. M.",
      title: "An enhanced deep convolution neural network model to diagnose Alzheimer's disease using brain magnetic resonance imaging",
      venue: "Proc. Recent Trends in Image Processing and Pattern Recognition (RTIP2R), Springer",
      year: 2021,
      pages: "42-52",
      link: ""
    },
    {
      type: "conference",
      authors: "Biswas, M., Nova, A. J., Mahbub, M. K., Chaki, S., Ahmed, S., & Islam, M. A.",
      title: "Stock market prediction: a survey and evaluation",
      venue: "Proc. International Conference on Science & Contemporary Technologies (ICSCT), IEEE",
      year: 2021,
      pages: "1-6",
      link: ""
    },
    {
      type: "conference",
      authors: "Biswas, M., Niamat Ullah Akhund, T. M., Mahbub, M. K., Saiful Islam, S. M., Sorna, S., & Shamim Kaiser, M.",
      title: "A survey on predicting player's performance and team recommendation in game of cricket using machine learning",
      venue: "Proc. International Conference on Information and Communication Technology for Competitive Strategies (ICTCS 2020), Springer",
      year: 2021,
      pages: "223-230",
      link: ""
    }
  ],

  // ---- Experience ----
  experience: [
    { role: "Founder & Principal Investigator", org: "CARMA AI Lab — Clinical AI for Reliable Medical Analytics", period: "Oct 2026 – Present", desc: "Leading research on reliable clinical AI across four pillars: evaluation and auditing, OOD generalization, interpretability, and safety and uncertainty." },
    { role: "Assistant Professor", org: "NPI University of Bangladesh, Dept. of CSE", period: "Mar 2026 – Present", desc: "Teaching algorithms and AI. Head of the ICT Cell since April 2026." },
    { role: "Graduate Teaching Assistant", org: "Kent State University, OH, USA", period: "Aug 2023 – Dec 2025", desc: "Assisted graduate CS courses; conducted research in medical image analysis and trustworthy machine learning." },
    { role: "Lecturer", org: "Bangladesh University of Business and Technology (BUBT), Dhaka", period: "Dec 2021 – Jul 2023", desc: "Taught undergraduate CS courses; Advisor, IEEE CS BUBT Student Branch Chapter." }
  ],

  // ---- Education ----
  education: [
    { degree: "M.S. in Computer Science", institution: "Kent State University, OH, USA", period: "Aug 2023 – May 2025", gpa: "3.80" },
    { degree: "B.Sc. in Computer Science and Engineering", institution: "Bangladesh University of Business and Technology (BUBT)", period: "Feb 2017 – May 2021", gpa: "3.84" }
  ],

  // ---- Teaching ----
  teaching: [
    { course: "Algorithms", org: "NPI University of Bangladesh", period: "2026 – Present", level: "Undergraduate core",
      desc: "Design and analysis of algorithms: asymptotic analysis, sorting and searching, graph algorithms, dynamic programming, greedy methods, and NP-completeness. Emphasis on proving correctness and reasoning about efficiency, not just coding solutions." },
    { course: "Core Programming Courses", org: "NPI University of Bangladesh", period: "2026 – Present", level: "Undergraduate",
      desc: "Programming fundamentals in C, C++, and Java: control flow, data structures, object-oriented design, and disciplined debugging. The foundation every later course builds on." },
    { course: "Graduate Teaching Assistant", org: "Kent State University, OH, USA", period: "2023 – 2025", level: "Graduate",
      desc: "Assisted graduate-level computer science courses — running recitations, grading, holding office hours — while conducting research in medical image analysis and trustworthy machine learning." },
    { course: "Undergraduate CS Courses & Research Mentoring", org: "Bangladesh University of Business and Technology, Dhaka", period: "2021 – 2023", level: "Undergraduate",
      desc: "Lecturer for undergraduate computer science courses and advisor to the IEEE CS BUBT Student Branch Chapter. Mentored undergraduate research projects in medical imaging and computer vision, several of which grew into peer-reviewed publications." }
  ],

  // ---- Service ----
  service: [
    { role: "Program Committee Member", org: "IEEE CBMS International Symposium on Computer-Based Medical Systems", years: "2023 – 2026" },
    { role: "Program Committee Member", org: "ICANN 2026 — 35th International Conference on Artificial Neural Networks", years: "2026" },
    { role: "Reviewer", org: "Expert Systems (Wiley)", years: "Ongoing" },
    { role: "Reviewer", org: "CMC – Computers, Materials & Continua (Tech Science Press)", years: "Ongoing" },
    { role: "Reviewer", org: "International Journal of Intelligent Transportation Systems Research (Springer)", years: "Ongoing" }
  ],

  // ---- Research detail (one rich section per pillar) ----
  researchDetail: [
    {
      id: "auditing",
      icon: "ti-clipboard-check",
      label: "Evaluation & Auditing",
      tagline: "Benchmark accuracy is not enough.",
      overview: "A model can top a leaderboard and still fail patients. My auditing work treats evaluation as a forensic discipline: stress-testing classifiers the way clinicians audit diagnoses, hunting for shortcut learning, miscalibration, and silent failure modes before a model ever reaches the bedside.",
      questions: [
        "How do we detect shortcut learning in chest X-ray classifiers — models that are right for the wrong reasons?",
        "What does a forensic evaluation protocol look like for ensemble classifiers under real clinical distribution shift?",
        "When a model collapses on external data (our locked model fell from 0.9999 to 0.6876 AUC moving across sites), how do we characterize and report that failure honestly?"
      ],
      methods: ["Calibration analysis", "Shortcut detectors", "Grad-CAM auditing", "Paired bootstrap testing", "Failure-mode analysis"],
      pubs: [
        "Beyond Benchmark Accuracy: Forensic Explainability Auditing for Ensemble Chest X-ray Classifiers"
      ]
    },
    {
      id: "generalization",
      icon: "ti-arrows-transfer-up",
      label: "Generalization",
      tagline: "Will it work at the next hospital?",
      overview: "Medical models are trained at one site and deployed at many. I work on predicting out-of-distribution performance without ever seeing target data — so a hospital can know, before deployment, whether a model will hold up on its own patients, scanners, and protocols.",
      questions: [
        "Can we predict a model's accuracy on unseen hospitals using only source-domain information?",
        "Which signals — semantic, temporal, or statistical — actually forecast degradation under shift?",
        "How do we turn a generalization forecast into a deployment decision?"
      ],
      methods: ["OOD performance prediction", "Semantic augmentation", "Distribution-shift characterization", "Cross-site validation"],
      pubs: [
        "STAMP: Predicting Out-of-Distribution Generalization without Target Data"
      ]
    },
    {
      id: "interpretability",
      icon: "ti-zoom-question",
      label: "Interpretability",
      tagline: "Show the clinician what you saw.",
      overview: "Explanations are only useful if they change decisions for the better. My interpretability work focuses on human-centered explanations for clinical models: feature-level reasoning clinicians can inspect, and explanation methods audited for faithfulness rather than taken on faith.",
      questions: [
        "Which explanations actually help a clinician catch a model's mistake?",
        "How do we verify that a saliency map reflects the model's reasoning and not an artifact of the method?",
        "Can interpretable feature engineering rival black-box performance on tabular clinical data?"
      ],
      methods: ["Explainable ensembles", "Feature engineering", "Saliency auditing", "Human-centered evaluation"],
      pubs: [
        "Explainable AI assisted heart disease diagnosis through effective feature engineering and stacked ensemble learning",
        "Beyond Benchmark Accuracy: Forensic Explainability Auditing for Ensemble Chest X-ray Classifiers"
      ]
    },
    {
      id: "uncertainty",
      icon: "ti-shield-check",
      label: "Safety & Uncertainty",
      tagline: "Know when to say 'I don't know.'",
      overview: "The most dangerous model is a confident wrong one. I develop post-hoc uncertainty quantification for frozen, black-box vision models — no retraining, no architecture changes. By measuring spatial consistency in a model's own attention, we can flag the cases it should abstain from or refer to a clinician.",
      questions: [
        "How do we quantify uncertainty for a model we cannot open or retrain?",
        "Can spatial consistency in attention maps serve as a reliable uncertainty signal?",
        "Where should the referral threshold sit so that retained predictions are trustworthy?"
      ],
      methods: ["Post-hoc UQ", "Spatial consistency", "Referral learning", "Temperature calibration", "Selective prediction"],
      pubs: [
        "SpatialUQ: Post-Hoc Uncertainty Quantification from Spatial Consistency in Black-Box Vision Models"
      ]
    }
  ],

  // ---- Lab ----
  lab: {
    name: "CARMA AI Lab",
    acronym: "CARMA",
    tagline: "Clinical AI for Reliable Medical Analytics",
    mission: "Reliable AI for high-stakes decisions.",
    about: [
      "The CARMA AI Lab develops reliable AI for high-stakes medical decisions. We audit models the way clinicians audit diagnoses: stress-testing them under distribution shift, explaining their reasoning, and quantifying when they should not be trusted.",
      "Our work spans four pillars — evaluation and auditing, out-of-distribution generalization, interpretability, and safety and uncertainty — unified by a single question: what does it take for a clinician to justifiably trust a model's output on their patient?"
    ],
    pillars: ["Evaluation & Auditing", "Generalization", "Interpretability", "Safety & Uncertainty"],
    joinTitle: "Work with us",
    joinText: "We collaborate with clinicians, hospitals, and ML researchers on auditing, generalization, and uncertainty problems in medical AI. If you have a model that needs stress-testing — or a clinical question that needs honest answers — get in touch.",
    site: "https://kawsher.github.io/carma-ai-lab/"
  },

  // ---- Skills ----
  skills: [
    { category: "Languages", items: ["Python", "C/C++", "C#", "Java"] },
    { category: "AI / ML", items: ["PyTorch", "TensorFlow", "Keras", "Scikit-learn", "OpenCV"] },
    { category: "Data & Viz", items: ["NumPy", "Pandas", "SciPy", "Matplotlib"] },
    { category: "Web & DB", items: ["HTML5", "CSS3", "PHP", "MySQL", "MongoDB"] },
    { category: "Tools", items: ["Jupyter", "Git", "LaTeX", "PyCharm", "VS Code"] }
  ]
};
