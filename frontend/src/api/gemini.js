import { GoogleGenerativeAI } from "@google/generative-ai"
import { SCHEMES_DATABASE } from "./schemesData"

const apiKey = import.meta.env.VITE_GEMINI_API_KEY

let genAI = null
if (apiKey && apiKey.startsWith("AIzaSy")) {
  try {
    genAI = new GoogleGenerativeAI(apiKey)
  } catch (err) {
    console.error("Gemini AI initialization error:", err)
  }
}

export async function askAI(question, context = "") {
  if (!genAI) {
    return generateSmartFallbackResponse(question, context)
  }

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" })
    const prompt = `You are JanAI, an expert AI assistant specializing in Indian Government Schemes, Scholarships, MSME Loans, and Citizen Welfare.
User Question: "${question}"
Additional Context / Profile: "${context}"

Knowledge Base Schemes:
${JSON.stringify(SCHEMES_DATABASE.map(s => ({ title: s.title, category: s.category, state: s.state, benefitAmount: s.benefitAmount, eligibility: s.eligibility })))}

Instructions:
1. Give a clear, practical, empathetic response in simple language.
2. Recommend relevant matching schemes from the database if applicable.
3. Include eligibility requirements, required documents, and step-by-step application guidance.
4. Format output nicely with markdown bullet points and bold headers.`

    const result = await model.generateContent(prompt)
    const response = await result.response
    return response.text()
  } catch (error) {
    console.warn("Gemini API call failed, using local AI engine:", error)
    return generateSmartFallbackResponse(question, context)
  }
}

export async function calculateSchemeSuccessProbability(scheme, profile) {
  let score = 75 // base score
  const logs = []

  if (profile.state === scheme.state || scheme.state === "All India") {
    score += 10
    logs.push("✓ State criteria matched")
  } else {
    score -= 30
    logs.push("✗ State location mismatch")
  }

  if (scheme.eligibility.caste.includes("All") || scheme.eligibility.caste.includes(profile.caste)) {
    score += 5
    logs.push("✓ Category / Caste matched")
  }

  if (profile.annualIncome && Number(profile.annualIncome) <= scheme.eligibility.incomeLimit) {
    score += 10
    logs.push("✓ Family annual income within eligible limit")
  } else if (profile.annualIncome) {
    score -= 20
    logs.push("⚠️ Income exceeds recommended threshold")
  }

  if (profile.documents && profile.documents.length > 0) {
    score += 10
    logs.push(`✓ ${profile.documents.length} verified documents in wallet`)
  }

  const finalScore = Math.min(Math.max(score, 15), 98)
  return {
    score: finalScore,
    level: finalScore >= 80 ? "High Likelihood" : finalScore >= 50 ? "Moderate Chance" : "Low Eligibility",
    logs
  }
}

function generateSmartFallbackResponse(question) {
  const q = question.toLowerCase()
  
  if (q.includes("scholarship") || q.includes("student") || q.includes("study") || q.includes("college")) {
    return `### 🎓 AI Recommended Scholarships for You:

1. **Post-Matric Scholarship Scheme for SC/ST/OBC Students**
   - **Benefit**: Up to ₹13,500/year + Full Tuition Fee Waiver
   - **Eligibility**: Class 11 to Post-Graduation, Family Income < ₹2.5 Lakh/year
   - **Documents**: Caste Certificate, Income Certificate, 10th Marksheet, Admission Fee Receipt.

2. **National Overseas Scholarship**
   - **Benefit**: Full Tuition Fee + $15,400 Annual Living Allowance for Masters/PhD abroad.

💡 **AI Next Step**: Upload your Grade Marksheet & Caste Certificate in the **Document Wallet** to get a 95%+ AI Success Score before submitting on NSP portal!`
  }

  if (q.includes("farmer") || q.includes("land") || q.includes("kisan") || q.includes("crop")) {
    return `### 🌾 AI Recommended Agriculture Schemes:

1. **PM-Kisan Samman Nidhi Yojana**
   - **Benefit**: ₹6,000 per year in 3 equal installments of ₹2,000.
   - **Eligibility**: Landholding farmer families with registered land records.
   - **Documents**: Aadhaar Card, Land Passbook (Khatauni), Bank Passbook.

2. **Rythu Bandhu Scheme** (Telangana)
   - **Benefit**: ₹10,000 per acre annually for crop investment.

💡 **AI Tip**: Ensure your Aadhaar name matches your land passbook name exactly to prevent payment holds!`
  }

  if (q.includes("business") || q.includes("loan") || q.includes("msme") || q.includes("startup")) {
    return `### 💼 AI Recommended Business & MSME Schemes:

1. **PM Mudra Yojana (PMMY)**
   - **Benefit**: Collateral-free loan up to ₹20 Lakhs (Shishu, Kishor, Tarun).
   - **Eligibility**: Micro-enterprises, small traders, self-employed individuals.

2. **PMEGP Loan Grant**
   - **Benefit**: Up to 35% Capital Subsidy for new project setups up to ₹50 Lakhs.

💡 **AI Action Item**: Use our **Auto Form Filler** to generate your Detailed Project Report (DPR) draft!`
  }

  return `### 🤖 JanAI Scheme Assistant Recommendation:

Based on your profile, here are top matching government programs:
- **Ayushman Bharat PM-JAY**: Free health insurance cover up to ₹5 Lakh/family/year.
- **PM Awas Yojana (PMAY)**: Up to ₹2.67 Lakh subsidy for building your pucca home.
- **Sukanya Samriddhi Yojana**: High 8.2% tax-free interest rate for girl child savings.

📌 **Need customized help?** Click on **AI Scheme Finder** or run the **Eligibility Checker** wizard!`
}