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
    shortDescription: "Direct income support of ₹6,000 per year to small and marginal farmer families across India.",
    fullDescription: "Pradhan Mantri Kisan Samman Nidhi (PM-KISAN) is a Central Sector scheme with 100% funding from Government of India. Under the scheme, income support of ₹6,000/- per year in three equal installments is provided to all landholding farmer families.",
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
    deadline: "Open All Year",
    officialUrl: "https://pmkisan.gov.in",
    faqs: [
      { q: "Who is eligible for PM-Kisan?", a: "All landholding farmer families who have cultivable landholding in their names are eligible." },
      { q: "Is tenant farmer eligible?", a: "No, institutional landholders and tenant farmers are currently excluded." }
    ],
    successFactors: ["Valid land record matching Aadhaar name", "Active bank e-KYC"]
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
    fullDescription: "Post-Matric Scholarship aims to provide financial assistance to students belonging to Scheduled Castes, Scheduled Tribes, and Other Backward Classes studying at post-matriculation or post-secondary stage to enable them to complete their education.",
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
    faqs: [
      { q: "What is the family income limit for SC/ST students?", a: "Annual family income must not exceed ₹2,50,000 per annum." },
      { q: "Can I apply if studying in private college?", a: "Yes, provided the college is recognized by AICTE/UGC/Government." }
    ],
    successFactors: ["Valid Caste Certificate", "Income Certificate under threshold", "College admission verification"]
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
    faqs: [
      { q: "Is there any age limit for senior citizens?", a: "All senior citizens aged 70 and above receive guaranteed ₹5 Lakh cover under PM-JAY Senior Citizen expansion." }
    ],
    successFactors: ["Name in SECC 2011 list or Ration Card", "Aadhaar e-KYC verification"]
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
    shortDescription: "Collateral-free loans up to ₹20 Lakhs for small business units, entrepreneurs, and self-employed individuals.",
    fullDescription: "Pradhan Mantri MUDRA Yojana provides financial support to non-corporate, non-farm small/micro enterprises. Loans are available through Banks, NBFCs, and MFIs without requiring collateral.",
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
      "Prepare business plan and identify loan category (Shishu/Kishor/Tarun).",
      "Apply online via Udyami Mitra portal (udyamimitra.in) or visit any commercial bank branch.",
      "Submit loan application form with business profile and ID proof.",
      "Bank evaluates project report and sanctions collateral-free loan."
    ],
    deadline: "Open All Year",
    officialUrl: "https://www.mudra.org.in",
    faqs: [
      { q: "Do I need security or collateral for Mudra Loan?", a: "No collateral security is required for Mudra loans." }
    ],
    successFactors: ["Clear Business Plan / Project Report", "Clean credit history (CIBIL score)", "Udyam Registration"]
  },
  {
    id: "pm-awas-yojana",
    title: "PM Awas Yojana (PMAY - Pucca House for All)",
    category: "Housing & Welfare",
    targetAudience: ["Farmer", "Senior Citizen", "Women", "All"],
    state: "All India",
    ministry: "Ministry of Housing and Urban Affairs",
    benefitAmount: "Financial assistance up to ₹2,67,000 / house construction",
    benefitFrequency: "Direct Benefit Transfer in 3-4 construction milestones",
    shortDescription: "Financial grant for building pucca houses for homeless and BPL/EWS families.",
    fullDescription: "Pradhan Mantri Awas Yojana (PMAY) aims to provide 'Housing for All' by providing central assistance to urban and rural poor families to construct pucca houses equipped with basic amenities.",
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
      "Bank Account Passbook",
      "Affidavit confirming no existing pucca house"
    ],
    applicationSteps: [
      "Visit PMAY official portal or Gram Panchayat office.",
      "Select 'Citizen Assessment' ➔ 'Benefit under 3 components'.",
      "Enter Aadhaar number and complete personal/family profile.",
      "Upload land documents and income certificate.",
      "Physical verification conducted by Geo-tagging team before installment release."
    ],
    deadline: "31st December 2026",
    officialUrl: "https://pmaymis.gov.in",
    faqs: [
      { q: "Who is considered a family under PMAY?", a: "A family consists of husband, wife, unmarried sons and/or unmarried daughters." }
    ],
    successFactors: ["No prior pucca house ownership", "BPL/EWS income verification", "Geo-tagged construction site"]
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
    fullDescription: "Sukanya Samriddhi Account is a small deposit scheme for girl child launched as a part of 'Beti Bachao Beti Padhao' campaign. The account can be opened in the name of a girl child below 10 years of age.",
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
      "Address Proof (Passport/Voter ID/Utility Bill)",
      "Passport Size Photographs"
    ],
    applicationSteps: [
      "Visit any Post Office or authorized commercial bank branch.",
      "Fill Sukanya Samriddhi Account opening form (Form-1).",
      "Submit girl child birth certificate and parent KYC documents.",
      "Deposit initial minimum amount of ₹250."
    ],
    deadline: "Open All Year",
    officialUrl: "https://www.indiapost.gov.in",
    faqs: [
      { q: "What is the minimum annual deposit?", a: "Minimum ₹250 and maximum ₹1,50,000 per financial year." }
    ],
    successFactors: ["Girl child age below 10 years", "Valid Birth Certificate"]
  },
  {
    id: "pm-vaya-vandana",
    title: "PM Vaya Vandana Yojana / IGNOAPS Senior Pension",
    category: "Senior Citizen & Pension",
    targetAudience: ["Senior Citizen"],
    state: "All India",
    ministry: "Ministry of Rural Development / LIC India",
    benefitAmount: "₹1,000 to ₹9,250 / month assured pension",
    benefitFrequency: "Monthly / Quarterly / Yearly pension credit",
    shortDescription: "Assured pension scheme for senior citizens aged 60 and above offering monthly financial security.",
    fullDescription: "Pradhan Mantri Vaya Vandana Yojana and Indira Gandhi National Old Age Pension Scheme provide social security and guaranteed monthly pension to senior citizens, protecting them against fall in interest income.",
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
      "Age Proof (Aadhaar Card / Voter ID / Birth Certificate)",
      "Income Certificate / BPL Status proof",
      "Bank Account Details with IFSC",
      "Passport Photograph"
    ],
    applicationSteps: [
      "Visit LIC portal for PMVVY or local Gram Panchayat / Municipal Office for IGNOAPS.",
      "Fill pension application form.",
      "Attach Aadhaar, age proof, and BPL card copy.",
      "Pension automatically credited to bank account monthly."
    ],
    deadline: "Open All Year",
    officialUrl: "https://licindia.in",
    faqs: [
      { q: "Is medical examination required?", a: "No medical examination is needed." }
    ],
    successFactors: ["Proof of age 60+ years", "Aadhaar e-KYC linked bank account"]
  },
  {
    id: "rythu-bandhu",
    title: "Rythu Bandhu Scheme (Telangana Agriculture Support)",
    category: "Agriculture",
    targetAudience: ["Farmer"],
    state: "Telangana",
    ministry: "Department of Agriculture, Telangana",
    benefitAmount: "₹10,000 / acre / year",
    benefitFrequency: "₹5,000 per acre per season (Kharif & Rabi)",
    shortDescription: "Investment support of ₹10,000 per acre annually for farmers in Telangana.",
    fullDescription: "Telangana Government's flagship agriculture investment support scheme providing direct financial assistance of ₹5,000 per acre per crop season to farmers for purchasing seeds, fertilizers, pesticides, and field preparation.",
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
      "Register land details on Dharani Portal.",
      "Submit Aadhaar and bank account details to Agriculture Extension Officer (AEO).",
      "Direct Benefit Transfer (DBT) directly into bank account every crop season."
    ],
    deadline: "Seasonal (Kharif / Rabi)",
    officialUrl: "https://dharani.telangana.gov.in",
    faqs: [
      { q: "Is there any ceiling on land holding size?", a: "No, all pattadar farmers in Telangana receive benefit per acre." }
    ],
    successFactors: ["Valid Pattadar Passbook on Dharani Portal"]
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
      "Passport Copy & Aadhaar Card",
      "Tax Returns / Form 16 of parents"
    ],
    applicationSteps: [
      "Register on NOS portal (nos.dosje.gov.in) during application window.",
      "Fill online application form and upload unconditional university offer letter.",
      "Upload verified caste certificate, degree transcripts, and income proof.",
      "Selection committee interviews and sanctions scholarship award."
    ],
    deadline: "31st March 2026",
    officialUrl: "https://nos.dosje.gov.in",
    faqs: [
      { q: "Is GRE/IELTS score mandatory?", a: "As per the foreign university's unconditional offer letter requirements." }
    ],
    successFactors: ["QS Top 500 University Unconditional Offer", "60%+ marks in previous degree"]
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
      "Educational Qualification Certificate (8th Pass Certificate)",
      "EDP Training Certificate (can be completed online post approval)"
    ],
    applicationSteps: [
      "Apply online on KVIC PMEGP Portal (kviconline.gov.in).",
      "Select sponsoring agency (KVIC / KVIB / DIC).",
      "Fill application data and upload Project Report (DPR) and caste proof.",
      "District Task Force Committee reviews and forwards to bank for loan sanction."
    ],
    deadline: "Open All Year",
    officialUrl: "https://www.kviconline.gov.in",
    faqs: [
      { q: "What is the subsidy percentage for rural women/SC/ST?", a: "35% subsidy in rural areas and 25% in urban areas for special categories including Women, SC, ST, OBC, Minorities." }
    ],
    successFactors: ["Comprehensive Project Report (DPR)", "Caste/Gender category certificate for max subsidy"]
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
