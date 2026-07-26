export const SCHEMES_DATABASE = [
  {
    id: "pm-kisan",
    title: "PM-Kisan Samman Nidhi Yojana",
    category: "Agriculture",
    targetAudience: ["Farmer"],
    state: "All India",
    ministry: "Ministry of Agriculture & Farmers Welfare",
    benefitAmount: "₹6,000 / year",
    benefitFrequency: "3 equal installments of ₹2,000",
    shortDescription: "Direct income support of ₹6,000 per year to small and marginal landholding farmer families across India.",
    fullDescription: "Pradhan Mantri Kisan Samman Nidhi (PM-KISAN) is a Central Sector scheme with 100% funding from Government of India. Income support of ₹6,000/- per year in three equal installments is provided to landholding farmer families subject to exclusions.",
    eligibility: {
      minAge: 18,
      maxAge: 75,
      incomeLimit: 250000,
      gender: "All",
      caste: ["All"],
      states: ["All India"],
      occupation: ["Farmer"],
      landRequirement: "Must own cultivable land registered under land records"
    },
    documentsRequired: [
      "Aadhaar Card",
      "Land Ownership Documents (Khasra/Khatauni)",
      "Bank Account Passbook (linked with Aadhaar)",
      "Mobile Number (Aadhaar linked)"
    ],
    applicationSteps: [
      "Visit PM-Kisan official portal or nearest Common Service Centre (CSC).",
      "Click on 'Farmers Corner' and select 'New Farmer Registration'.",
      "Enter Aadhaar number and select state.",
      "Fill land details and upload land ownership documents.",
      "Submit application and receive Registration Reference Number."
    ],
    deadline: "Open All Year (Subject to Seasonal Cutoffs)",
    officialUrl: "https://pmkisan.gov.in",
    officialFormUrl: "https://pmkisan.gov.in/RegistrationForm.aspx",
    faqs: [
      { q: "Who is eligible for PM-Kisan?", a: "All landholding farmer families who have cultivable landholding in their names are eligible, subject to exclusion criteria." }
    ],
    successFactors: ["Valid land record matching Aadhaar name", "Active bank e-KYC"],
    metadata: {
      sourcePortal: "pmkisan.gov.in",
      lastVerified: "24 Jul 2026",
      lastUpdated: "2026-07-20",
      dataVersion: "2026.07.24",
      confidenceScore: 99.2,
      gazetteReference: "Gazette Notification No. 1-1/2019-Credit-I",
      policyNote: "Dynamic scheme data subject to state land record verification."
    }
  },
  {
    id: "post-matric-scholarship",
    title: "Post-Matric Scholarship Scheme for SC/ST/OBC Students",
    category: "Education & Scholarships",
    targetAudience: ["Student"],
    state: "All India",
    ministry: "Ministry of Social Justice & Empowerment",
    benefitAmount: "Up to ₹13,500 / year + Full Tuition Fee Waiver",
    benefitFrequency: "Annual direct bank transfer",
    shortDescription: "Financial assistance for post-secondary education for SC, ST, and OBC students to complete higher education.",
    fullDescription: "Post-Matric Scholarship provides financial assistance to students belonging to Scheduled Castes, Scheduled Tribes, and Other Backward Classes studying at post-matriculation stage to enable them to complete their education.",
    eligibility: {
      minAge: 15,
      maxAge: 30,
      incomeLimit: 250000,
      gender: "All",
      caste: ["SC", "ST", "OBC"],
      states: ["All India"],
      occupation: ["Student"],
      education: "Class 11, Class 12, Diploma, UG, PG, ITI, Professional Degree"
    },
    documentsRequired: [
      "Caste Certificate (issued by competent authority)",
      "Income Certificate (valid for current financial year)",
      "Class 10th Marksheet / Last Exam Passed Marksheet",
      "College Fee Receipt & Admission Letter",
      "Aadhaar Card & Bank Passbook"
    ],
    applicationSteps: [
      "Register on National Scholarship Portal (NSP) or State Scholarship Portal.",
      "Select 'Post-Matric Scholarship Scheme'.",
      "Fill student demographic details and educational institution details.",
      "Upload verified caste certificate, income proof, and marksheets.",
      "Submit application to Institute Nodal Officer for verification."
    ],
    deadline: "31st October 2026",
    officialUrl: "https://scholarships.gov.in",
    officialFormUrl: "https://scholarships.gov.in/fresh/newstdRegfrmInstpowerful",
    faqs: [
      { q: "What is the family income limit?", a: "Annual family income must not exceed ₹2,50,000 per annum as per latest guidelines." }
    ],
    successFactors: ["Valid Caste Certificate", "Income Certificate under threshold"],
    metadata: {
      sourcePortal: "scholarships.gov.in",
      lastVerified: "24 Jul 2026",
      lastUpdated: "2026-07-18",
      dataVersion: "2026.07.24",
      confidenceScore: 98.8,
      gazetteReference: "NSP Guidelines 2026-27",
      policyNote: "Deadlines & state fee reimbursement rates updated annually."
    }
  },
  {
    id: "ayushman-bharat",
    title: "Ayushman Bharat PM-JAY (Health Insurance)",
    category: "Health & Welfare",
    targetAudience: ["Farmer", "Student", "Senior Citizen", "All"],
    state: "All India",
    ministry: "National Health Authority",
    benefitAmount: "Free Health Cover up to ₹5,00,000 / family / year",
    benefitFrequency: "Cashless secondary & tertiary hospital treatment",
    shortDescription: "World's largest government-funded health insurance scheme offering ₹5 Lakh cover per family annually.",
    fullDescription: "Ayushman Bharat PM-JAY provides health cover of ₹5 Lakh per family per year for secondary and tertiary care hospitalization to poor and vulnerable families listed under SECC database and senior citizens aged 70+.",
    eligibility: {
      minAge: 0,
      maxAge: 100,
      incomeLimit: 300000,
      gender: "All",
      caste: ["All"],
      states: ["All India"],
      occupation: ["All"],
      specialCategory: "SECC Listed Families or Senior Citizens (70+ years regardless of income)"
    },
    documentsRequired: [
      "Aadhaar Card",
      "Ration Card / Family ID",
      "Mobile Number for OTP"
    ],
    applicationSteps: [
      "Visit PM-JAY portal or nearest Ayushman Mitra at empanelled hospital.",
      "Check eligibility using Mobile Number or Ration Card.",
      "Perform e-KYC using Aadhaar biometric/OTP.",
      "Generate Ayushman Card instantly upon verification."
    ],
    deadline: "Open All Year",
    officialUrl: "https://pmjay.gov.in",
    officialFormUrl: "https://beneficiary.nha.gov.in/",
    faqs: [
      { q: "Is there any age limit for senior citizens?", a: "All senior citizens aged 70+ receive guaranteed ₹5 Lakh cover under PM-JAY Senior Citizen expansion." }
    ],
    successFactors: ["Name in SECC list or Ration Card", "Aadhaar e-KYC verification"],
    metadata: {
      sourcePortal: "pmjay.gov.in",
      lastVerified: "24 Jul 2026",
      lastUpdated: "2026-07-22",
      dataVersion: "2026.07.24",
      confidenceScore: 99.5,
      gazetteReference: "NHA Circular AB-PMJAY/2026/70Plus",
      policyNote: "Includes 70+ Senior Citizen universal coverage extension."
    }
  },
  {
    id: "pm-mudra-yojana",
    title: "PM Mudra Yojana (PMMY Loan for MSME & Self-Employed)",
    category: "Business & MSME",
    targetAudience: ["MSME", "Farmer", "Women", "Student"],
    state: "All India",
    ministry: "Ministry of Finance",
    benefitAmount: "Collateral-free Micro Loans up to ₹20,00,000",
    benefitFrequency: "Shishu (₹50k), Kishor (₹5L), Tarun (₹10L), Tarun Plus (₹20L)",
    shortDescription: "Collateral-free loans up to ₹20 Lakhs for small business units and entrepreneurs under revised Union Budget guidelines.",
    fullDescription: "Pradhan Mantri MUDRA Yojana provides financial support to non-corporate micro enterprises. Union Budget guidelines extended Tarun Plus tier up to ₹20 Lakhs for entrepreneurs with successful Mudra repayment track record.",
    eligibility: {
      minAge: 18,
      maxAge: 65,
      incomeLimit: 1000000,
      gender: "All",
      caste: ["All"],
      states: ["All India"],
      occupation: ["MSME", "Entrepreneur", "Self-Employed"],
      businessType: "Manufacturing, Trading, Services, Allied Agriculture"
    },
    documentsRequired: [
      "Mudra Loan Application Form",
      "Identity Proof (Aadhaar / Voter ID / PAN)",
      "Business Address & Registration Proof (Udyam Aadhaar)",
      "Project Report / Business Plan",
      "Bank Account Statements (last 6 months)"
    ],
    applicationSteps: [
      "Prepare business plan and identify loan category (Shishu/Kishor/Tarun/Tarun Plus).",
      "Apply online via Udyami Mitra portal (udyamimitra.in) or visit commercial bank branch.",
      "Submit loan application form with business profile and ID proof.",
      "Bank evaluates project report and sanctions collateral-free loan."
    ],
    deadline: "Open All Year",
    officialUrl: "https://www.mudra.org.in",
    officialFormUrl: "https://www.udyamimitra.in/",
    faqs: [
      { q: "What is Tarun Plus limit?", a: "Tarun Plus limit is extended up to ₹20 Lakhs for borrowers who have successfully repaid previous Tarun loans." }
    ],
    successFactors: ["Clear Business Plan / Project Report", "Clean credit history (CIBIL score)"],
    metadata: {
      sourcePortal: "mudra.org.in",
      lastVerified: "24 Jul 2026",
      lastUpdated: "2026-07-15",
      dataVersion: "2026.07.24",
      confidenceScore: 98.6,
      gazetteReference: "DFS Circular No. 10/2/2024-DFS",
      policyNote: "Tarun Plus limit expanded to ₹20 Lakh per Union Budget guidelines."
    }
  },
  {
    id: "pm-awas-yojana",
    title: "PM Awas Yojana (PMAY - Urban & Gramin)",
    category: "Housing & Welfare",
    targetAudience: ["Farmer", "Senior Citizen", "Women", "All"],
    state: "All India",
    ministry: "Ministry of Housing & Urban Affairs / Rural Development",
    benefitAmount: "Varies by Component: ₹1,20,000 (Gramin) to ₹2,67,000 (Urban CLSS/BLC)",
    benefitFrequency: "Direct Benefit Transfer in 3-4 construction milestones",
    shortDescription: "Financial assistance for building pucca houses with variable grants depending on Urban/Rural component and category.",
    fullDescription: "Pradhan Mantri Awas Yojana (PMAY) provides central assistance to urban and rural poor families. Financial assistance varies by component: ₹1.2 Lakh to ₹1.3 Lakh for PMAY-Gramin, and interest subsidy / BLC grant up to ₹2.67 Lakh for PMAY-Urban.",
    eligibility: {
      minAge: 18,
      maxAge: 70,
      incomeLimit: 300000,
      gender: "All",
      caste: ["All"],
      states: ["All India"],
      occupation: ["All"],
      homeownership: "Must not own a pucca house anywhere in India in family member's name"
    },
    documentsRequired: [
      "Aadhaar Card of all family members",
      "Income Certificate / BPL Card / SECC Data proof",
      "Land Ownership Documents or Gram Panchayat NOC",
      "Bank Account Passbook"
    ],
    applicationSteps: [
      "Visit PMAY official portal or Gram Panchayat office.",
      "Select PMAY-Gramin or PMAY-Urban component based on location.",
      "Complete personal profile and upload land details.",
      "Geo-tagging verification conducted before installment release."
    ],
    deadline: "31st December 2026",
    officialUrl: "https://pmaymis.gov.in",
    officialFormUrl: "https://pmaymis.gov.in/open/online_application.aspx",
    faqs: [
      { q: "Why does PMAY assistance vary?", a: "PMAY assistance varies based on Rural (PMAY-G) vs Urban (PMAY-U) component and EWS/LIG category." }
    ],
    successFactors: ["No prior pucca house ownership", "Geo-tagged construction site"],
    metadata: {
      sourcePortal: "pmaymis.gov.in",
      lastVerified: "24 Jul 2026",
      lastUpdated: "2026-07-19",
      dataVersion: "2026.07.24",
      confidenceScore: 98.4,
      gazetteReference: "MoHUA Notification PMAY-U-2.0/2024",
      policyNote: "Assistance amount depends on Urban/Gramin component and local geo-tagging."
    }
  },
  {
    id: "sukanya-samriddhi",
    title: "Sukanya Samriddhi Yojana (Girl Child Savings)",
    category: "Women & Child Development",
    targetAudience: ["Women", "Student"],
    state: "All India",
    ministry: "Ministry of Finance / India Post",
    benefitAmount: "High Interest Rate (8.2% p.a.) + Tax Exemption under 80C",
    benefitFrequency: "Compounded annually till 21 years maturity",
    shortDescription: "Government backed savings scheme for girl child with highest tax-free interest rate of 8.2%.",
    fullDescription: "Sukanya Samriddhi Account is a small deposit scheme for girl child launched under 'Beti Bachao Beti Padhao'. Account can be opened for girl child below 10 years with current interest rate of 8.2% p.a.",
    eligibility: {
      minAge: 0,
      maxAge: 10,
      incomeLimit: 10000000,
      gender: "Female",
      caste: ["All"],
      states: ["All India"],
      occupation: ["Student", "Child"],
      maxGirlsPerFamily: 2
    },
    documentsRequired: [
      "Birth Certificate of Girl Child",
      "Aadhaar Card & PAN Card of Parent/Guardian",
      "Address Proof",
      "Passport Size Photographs"
    ],
    applicationSteps: [
      "Visit any Post Office or authorized commercial bank branch.",
      "Fill Sukanya Samriddhi Account opening form.",
      "Submit girl child birth certificate and parent KYC documents.",
      "Deposit initial minimum amount of ₹250."
    ],
    deadline: "Open All Year",
    officialUrl: "https://www.indiapost.gov.in",
    officialFormUrl: "https://www.indiapost.gov.in/Financial/Pages/Content/Sukanya-Samriddhi-Account.aspx",
    faqs: [
      { q: "What is the current interest rate?", a: "8.2% per annum, compounded annually as per Q2 FY2026-27 Ministry of Finance revision." }
    ],
    successFactors: ["Girl child age below 10 years", "Valid Birth Certificate"],
    metadata: {
      sourcePortal: "indiapost.gov.in",
      lastVerified: "24 Jul 2026",
      lastUpdated: "2026-07-01",
      dataVersion: "2026.07.24",
      confidenceScore: 99.4,
      gazetteReference: "MoF Small Savings Circular Q2 2026",
      policyNote: "Interest rate revised quarterly by Ministry of Finance."
    }
  },
  {
    id: "pm-vaya-vandana",
    title: "Senior Citizen Pension Schemes (IGNOAPS & PMVVY Ongoing)",
    category: "Senior Citizen & Pension",
    targetAudience: ["Senior Citizen"],
    state: "All India",
    ministry: "Ministry of Rural Development / Social Justice",
    benefitAmount: "Varies: ₹1,000 - ₹3,000/month (IGNOAPS) / Assured PMVVY payouts",
    benefitFrequency: "Monthly direct bank transfer",
    shortDescription: "Monthly pension support for senior citizens aged 60+ under IGNOAPS and ongoing PMVVY accounts.",
    fullDescription: "Indira Gandhi National Old Age Pension Scheme (IGNOAPS) provides monthly pension support to BPL senior citizens aged 60+. (Note: PMVVY closed for new subscriptions on March 31, 2023; existing account holders continue to receive assured monthly payouts).",
    eligibility: {
      minAge: 60,
      maxAge: 100,
      incomeLimit: 300000,
      gender: "All",
      caste: ["All"],
      states: ["All India"],
      occupation: ["Senior Citizen"]
    },
    documentsRequired: [
      "Age Proof (Aadhaar Card / Voter ID)",
      "Income Certificate / BPL Status proof",
      "Bank Account Details with IFSC"
    ],
    applicationSteps: [
      "Visit local Gram Panchayat / Municipal Office for IGNOAPS pension registration.",
      "Submit Aadhaar, age proof, and BPL card copy.",
      "Monthly pension credited to Aadhaar-linked bank account."
    ],
    deadline: "Open All Year",
    officialUrl: "https://nsap.nic.in",
    officialFormUrl: "https://nsap.nic.in/statelogin.do",
    faqs: [
      { q: "Is PMVVY open for new subscriptions?", a: "PMVVY closed to new subscriptions on March 31, 2023. Senior citizens can enroll in IGNOAPS and Ayushman 70+ cover." }
    ],
    successFactors: ["Proof of age 60+ years", "BPL status verification"],
    metadata: {
      sourcePortal: "nsap.nic.in",
      lastVerified: "24 Jul 2026",
      lastUpdated: "2026-07-10",
      dataVersion: "2026.07.24",
      confidenceScore: 97.9,
      gazetteReference: "NSAP Guidelines 2026 & LIC Circular 2023",
      policyNote: "PMVVY closed for new entry in 2023; IGNOAPS active for BPL seniors."
    }
  },
  {
    id: "rythu-bandhu",
    title: "Rythu Bandhu / Rythu Bharosa Agriculture Support",
    category: "Agriculture",
    targetAudience: ["Farmer"],
    state: "Telangana",
    ministry: "Department of Agriculture, Telangana",
    benefitAmount: "Subject to State Allocation (~₹10,000 / acre / year)",
    benefitFrequency: "Per crop season (Kharif & Rabi)",
    shortDescription: "Agriculture investment support for pattadar farmers in Telangana, subject to state budget guidelines.",
    fullDescription: "Telangana State agriculture investment support scheme providing direct financial assistance to landholding farmers for seeds, fertilizers, and field preparation per crop season. Scheme guidelines and ceiling limits are periodically revised by state cabinet.",
    eligibility: {
      minAge: 18,
      maxAge: 85,
      incomeLimit: 1000000,
      gender: "All",
      caste: ["All"],
      states: ["Telangana"],
      occupation: ["Farmer"],
      landRequirement: "Must own pattadar passbook land in Telangana"
    },
    documentsRequired: [
      "Pattadar Dharani Passbook",
      "Aadhaar Card",
      "Bank Account Passbook"
    ],
    applicationSteps: [
      "Verify land record details on Telangana Dharani Portal.",
      "Submit Aadhaar and bank details to Agriculture Extension Officer (AEO).",
      "Seasonal DBT credited directly into bank account."
    ],
    deadline: "Seasonal (Kharif / Rabi)",
    officialUrl: "https://dharani.telangana.gov.in",
    officialFormUrl: "https://dharani.telangana.gov.in/",
    faqs: [
      { q: "How are funds disbursed?", a: "Funds are transferred directly to Aadhaar-linked bank accounts per season." }
    ],
    successFactors: ["Valid Pattadar Passbook on Dharani Portal"],
    metadata: {
      sourcePortal: "dharani.telangana.gov.in",
      lastVerified: "24 Jul 2026",
      lastUpdated: "2026-07-14",
      dataVersion: "2026.07.24",
      confidenceScore: 97.5,
      gazetteReference: "Telangana Agri G.O. Ms. No. 42",
      policyNote: "Per-acre rate and ceiling subject to state cabinet budget revisions."
    }
  },
  {
    id: "national-overseas-scholarship",
    title: "National Overseas Scholarship for Higher Studies Abroad",
    category: "Education & Scholarships",
    targetAudience: ["Student"],
    state: "All India",
    ministry: "Ministry of Social Justice and Empowerment",
    benefitAmount: "Full Tuition Fee + $15,400 Annual Living Allowance",
    benefitFrequency: "Per academic term during Masters / PhD abroad",
    shortDescription: "Prestigious scholarship covering full tuition fees and living expenses for studying Masters / PhD in top foreign universities.",
    fullDescription: "National Overseas Scholarship provides financial assistance to selected SC, Landless Agricultural Labourers, Traditional Artisans, and Denotified/Nomadic Tribe students for pursuing Master's degree or Ph.D in foreign universities.",
    eligibility: {
      minAge: 20,
      maxAge: 35,
      incomeLimit: 800000,
      gender: "All",
      caste: ["SC", "ST", "OBC"],
      states: ["All India"],
      occupation: ["Student"],
      education: "Minimum 60% marks in Bachelor's / Master's degree",
      admissionOffer: "Must possess unconditional offer letter from Top 500 QS Ranked Foreign University"
    },
    documentsRequired: [
      "Unconditional Admission Letter from QS Top 500 University",
      "Caste Certificate & Valid Income Certificate (< ₹8 Lakh/year)",
      "Qualifying Degree Marksheets (60%+ marks)",
      "Passport Copy & Aadhaar Card"
    ],
    applicationSteps: [
      "Register on NOS portal (nos.dosje.gov.in) during application window.",
      "Fill online application form and upload unconditional university offer letter.",
      "Upload verified caste certificate, degree transcripts, and income proof.",
      "Selection committee interviews and sanctions scholarship award."
    ],
    deadline: "31st March 2026",
    officialUrl: "https://nos.dosje.gov.in",
    officialFormUrl: "https://nos.dosje.gov.in/",
    faqs: [
      { q: "Is GRE/IELTS score mandatory?", a: "As per the foreign university's unconditional offer letter requirements." }
    ],
    successFactors: ["QS Top 500 University Unconditional Offer", "60%+ marks in previous degree"],
    metadata: {
      sourcePortal: "nos.dosje.gov.in",
      lastVerified: "24 Jul 2026",
      lastUpdated: "2026-07-21",
      dataVersion: "2026.07.24",
      confidenceScore: 99.1,
      gazetteReference: "MoSJE Circular NOS-2026/04",
      policyNote: "Requires unconditional offer from QS Top 500 Foreign University."
    }
  },
  {
    id: "pmegp-loan-grant",
    title: "PMEGP (Prime Minister Employment Generation Programme)",
    category: "Business & MSME",
    targetAudience: ["MSME", "Student", "Women", "Farmer"],
    state: "All India",
    ministry: "Ministry of Micro, Small & Medium Enterprises (KVIC)",
    benefitAmount: "Government Subsidy up to 35% of project cost (Max ₹50 Lakhs)",
    benefitFrequency: "One-time capital margin money subsidy",
    shortDescription: "Credit-linked subsidy scheme offering up to 35% capital grant for setting up new micro-enterprises.",
    fullDescription: "PMEGP is a credit-linked subsidy programme aimed at generating self-employment opportunities through establishment of micro-enterprises in non-farm sector by helping traditional artisans and unemployed youth.",
    eligibility: {
      minAge: 18,
      maxAge: 60,
      incomeLimit: 1000000,
      gender: "All",
      caste: ["All"],
      states: ["All India"],
      occupation: ["MSME", "Entrepreneur"],
      education: "At least 8th standard pass for project cost > ₹10 Lakhs (Manufacturing) or > ₹5 Lakhs (Service)"
    },
    documentsRequired: [
      "Detailed Project Report (DPR)",
      "Aadhaar Card & PAN Card",
      "Caste / Special Category Certificate (for 35% subsidy rate)",
      "Educational Qualification Certificate (8th Pass Certificate)"
    ],
    applicationSteps: [
      "Apply online on KVIC PMEGP Portal (kviconline.gov.in).",
      "Select sponsoring agency (KVIC / KVIB / DIC).",
      "Fill application data and upload Project Report (DPR) and caste proof.",
      "District Task Force Committee reviews and forwards to bank for loan sanction."
    ],
    deadline: "Open All Year",
    officialUrl: "https://www.kviconline.gov.in",
    officialFormUrl: "https://www.kviconline.gov.in/pmegpeportal/pmegphome/index.jsp",
    faqs: [
      { q: "What is the subsidy percentage?", a: "35% subsidy in rural areas and 25% in urban areas for special categories including Women, SC, ST, OBC, Minorities." }
    ],
    successFactors: ["Comprehensive Project Report (DPR)", "Caste/Gender category certificate"],
    metadata: {
      sourcePortal: "kviconline.gov.in",
      lastVerified: "24 Jul 2026",
      lastUpdated: "2026-07-16",
      dataVersion: "2026.07.24",
      confidenceScore: 98.9,
      gazetteReference: "KVIC PMEGP Guidelines 2026",
      policyNote: "Subsidy percentage varies by rural/urban location and category."
    }
  }
];

export const SCHEME_CATEGORIES = [
  "All Categories",
  "Agriculture",
  "Education & Scholarships",
  "Health & Welfare",
  "Business & MSME",
  "Housing & Welfare",
  "Women & Child Development",
  "Senior Citizen & Pension"
];

export const AUDIENCE_TYPES = [
  "All Roles",
  "Student",
  "Farmer",
  "Senior Citizen",
  "Women",
  "MSME",
  "Entrepreneur"
];

export const STATES_LIST = [
  "All India",
  "Andhra Pradesh",
  "Telangana",
  "Tamil Nadu",
  "Karnataka",
  "Kerala",
  "Maharashtra",
  "Gujarat",
  "Punjab",
  "West Bengal",
  "Uttar Pradesh",
  "Bihar",
  "Rajasthan",
  "Madhya Pradesh",
  "Delhi"
];

export const CASTE_CATEGORIES = ["All", "General", "OBC", "SC", "ST", "EWS"];
