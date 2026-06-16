// ============================================================
// SITE DATA — edit this file to update your website content
// Then commit + push to GitHub. No other files need touching.
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
  bio: "I build AI systems at the intersection of deep learning, computer vision, and clinical healthcare. My work focuses on uncertainty quantification, explainable AI for medical image analysis, and out-of-distribution generalization — with the goal of making AI trustworthy enough to matter at the bedside. I hold an M.S. from Kent State University (GPA 3.80) and a B.Sc. from BUBT.",
  availability: "Open to research collaboration and PhD opportunities",
  photo: "assets/Picture.JPG",  // place your photo here

  // ---- Social links ----
  links: {
    scholar: "https://scholar.google.com/citations?user=fQ_TTFsAAAAJ",
    github: "https://github.com/Kawsher",
    linkedin: "https://www.linkedin.com/in/kawsher-mahbub/",
    twitter: "https://x.com/kawsher_mahbub",
    orcid: "https://orcid.org/0000-0002-4200-542X",
    researchgate: "https://www.researchgate.net/profile/Md-Kawsher-Mahbub",
    cv: "assets/CV_Md_Kawsher_Mahbub.pdf"
  },

  // ---- Scholar stats (update manually or auto-fetch) ----
  stats: {
    publications: 11,
    citations: 345,
    hIndex: 10,
    i10Index: 10
  },

  // ---- Research interests ----
  interests: [
    { icon: "ti-brain", label: "Medical Image Analysis", desc: "Deep learning for MRI/CT/X-ray screening, segmentation, and disease detection under real-world clinical constraints." },
    { icon: "ti-shield-check", label: "Uncertainty Quantification", desc: "Post-hoc UQ for frozen black-box vision models; spatial consistency and calibration under distribution shift." },
    { icon: "ti-zoom-question", label: "Explainable AI (XAI)", desc: "Human-centered explanations and forensic auditing of ensemble classifiers for clinical decision support." },
    { icon: "ti-arrows-transfer-up", label: "OOD Generalization", desc: "Semantic temporal augmentation and predictors of accuracy degradation when models meet real-world deployment." },
    { icon: "ti-lock", label: "Trustworthy ML", desc: "Membership inference auditing, privacy risk stratification, and pretraining objective analysis across large model ecosystems." },
    { icon: "ti-pulse", label: "Health Informatics", desc: "Integration of predictive analytics and multimodal ML into clinical decision support systems, optimizing EHR workflows, and bridging the gap between algorithms and point-of-care utility." }
  ],

  // ---- News items — newest first ----
  news: [
    { date: "Jun 2026", tag: "preprint", text: "STAMP nearing Completion" },
    { date: "May 2026", tag: "paper", text: "'Beyond Benchmark Accuracy' (ESED framework) submitted to Medical Image Analysis." },
    { date: "Mar 2026", tag: "position", text: "Joined NPI University of Bangladesh as Assistant Professor, Dept. of CSE." },
    { date: "May 2025", tag: "milestone", text: "Completed M.S. in Computer Science at Kent State University with CGPA 3.80." },
    { date: "Jan 2025", tag: "paper", text: "Paper accepted — Expert Systems with Applications (heart disease diagnosis via stacked ensemble)." },
    { date: "Sep 2024", tag: "award", text: "First Place and People's Choice Award — International Cook-Off 2024, Kent State University." },
    { date: "Oct 2024", tag: "service", text: "Program Committee Member, IEEE CBMS 2024 (37th edition)." }
  ],

  // ---- Publications ----
  publications: [
    {
      type: "under-review",
      authors: "M. K. Mahbub, S. Hossain, M. A. M. Miah, M. N. Morshed, and M. Biswas",
      title: "Beyond Benchmark Accuracy: Forensic Explainability Auditing for Ensemble Chest Radiograph Classifiers",
      venue: "Medical Image Analysis (MedIA)",
      year: 2025,
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
      venue: "IEEE CBMS 2022",
      year: 2022,
      pages: "pp. 119-124",
      link: ""
    },
    {
      type: "conference",
      authors: "Mahbub, M. K., Biswas, M., Miah, M. A. M., & Kaiser, M. S.",
      title: "Deep neural networks for brain tumor detection from MRI images",
      venue: "TCCE 2021, Springer",
      year: 2022,
      pages: "pp. 473-485",
      link: ""
    },
    {
      type: "conference",
      authors: "Mahbub, M. K., Miah, M. A. M., Islam, S. M. S., Sorna, S., Hossain, S., & Biswas, M.",
      title: "Best eleven forecast for Bangladesh cricket team with machine learning techniques",
      venue: "ICEEICT 2021, IEEE",
      year: 2021,
      link: ""
    },
    {
      type: "conference",
      authors: "Mahbub, M. K., Biswas, M., Miah, A. M., Shahabaz, A., & Kaiser, M. S.",
      title: "COVID-19 detection using chest X-ray images with a RegNet structured deep learning model",
      venue: "AII 2021, Springer",
      year: 2021,
      pages: "pp. 358-370",
      link: ""
    }
  ],

  // ---- Experience ----
  experience: [
    { role: "Assistant Professor", org: "NPI University of Bangladesh", period: "Mar 2026 – Present", desc: "Teaching algorithms and AI; building research lab focused on clinical AI and OOD generalization." },
    { role: "Graduate Teaching Assistant", org: "Kent State University, OH, USA", period: "Aug 2023 – Dec 2025", desc: "Assisted graduate CS courses; conducted research in medical image analysis and trustworthy ML." },
    { role: "Lecturer", org: "BUBT, Dhaka, Bangladesh", period: "Dec 2021 – Jul 2023", desc: "Taught undergraduate CS courses; Advisor, IEEE CS BUBT Student Branch Chapter." }
  ],

  // ---- Education ----
  education: [
    { degree: "M.S. in Computer Science", institution: "Kent State University, OH, USA", period: "Aug 2023 – May 2025", gpa: "3.80" },
    { degree: "B.Sc. in Computer Science and Engineering", institution: "Bangladesh University of Business and Technology (BUBT)", period: "Feb 2017 – May 2021", gpa: "3.84" }
  ],

  // ---- Service ----
  service: [
    { role: "Program Committee Member", org: "IEEE CBMS International Symposium", years: "2023–2026" },
    { role: "Program Committee Member", org: "ICANN 2026 (35th International Conference on Artificial Neural Networks)", years: "2026" },
    { role: "Reviewer", org: "Expert Systems (Wiley)", years: "Ongoing" },
    { role: "Reviewer", org: "CMC – Computers, Materials & Continua (Tech Science Press)", years: "Ongoing" },
    { role: "Reviewer", org: "International Journal of Intelligent Transportation Systems Research (Springer)", years: "Ongoing" }
  ],

  // ---- Skills ----
  skills: [
    { category: "Languages", items: ["Python", "C/C++", "C#", "Java"] },
    { category: "AI / ML", items: ["PyTorch", "TensorFlow", "Keras", "Scikit-learn", "OpenCV"] },
    { category: "Data & Viz", items: ["NumPy", "Pandas", "SciPy", "Matplotlib"] },
    { category: "Web & DB", items: ["HTML5", "CSS3", "PHP", "MySQL", "MongoDB"] },
    { category: "Tools", items: ["Jupyter", "Git", "LaTeX", "PyCharm", "VS Code"] }
  ]
};
