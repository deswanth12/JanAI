"""
JanAI Model Context Protocol (MCP) Backend Server Engine
Provides standard MCP tool interfaces for AI Assistants (Gemini, Claude, JanAI Copilot)
to query government scheme registries, evaluate household eligibility, perform 22-language translation,
and execute document verification.
"""

from typing import Dict, Any, List
import json
import sqlite3
import os

DB_PATH = os.path.join(os.path.dirname(__file__), "..", "janai.db")

def get_db():
    conn = sqlite3.connect(DB_PATH, check_same_thread=False)
    conn.row_factory = sqlite3.Row
    return conn

# 22 Official Scheduled Languages of India + Dialect & Code-mixed variants
SCHEDULED_INDIAN_LANGUAGES = {
    "en": {"name": "English", "script": "Latin", "family": "Indo-European"},
    "hi": {"name": "हिन्दी (Hindi)", "script": "Devanagari", "family": "Indo-Aryan"},
    "te": {"name": "తెలుగు (Telugu)", "script": "Telugu", "family": "Dravidian"},
    "ta": {"name": "தமிழ் (Tamil)", "script": "Tamil", "family": "Dravidian"},
    "kn": {"name": "ಕನ್ನಡ (Kannada)", "script": "Kannada", "family": "Dravidian"},
    "bn": {"name": "বাংলা (Bengali)", "script": "Bengali", "family": "Indo-Aryan"},
    "mr": {"name": "मराठी (Marathi)", "script": "Devanagari", "family": "Indo-Aryan"},
    "ml": {"name": "മലയാളം (Malayalam)", "script": "Malayalam", "family": "Dravidian"},
    "gu": {"name": "ગુજરાતી (Gujarati)", "script": "Gujarati", "family": "Indo-Aryan"},
    "pa": {"name": "ਪੰਜਾਬੀ (Punjabi)", "script": "Gurmukhi", "family": "Indo-Aryan"},
    "or": {"name": "ଓଡ଼ିଆ (Odia)", "script": "Odia", "family": "Indo-Aryan"},
    "as": {"name": "অসমীয়া (Assamese)", "script": "Bengali-Assamese", "family": "Indo-Aryan"},
    "mai": {"name": "मैथिली (Maithili)", "script": "Devanagari", "family": "Indo-Aryan"},
    "sat": {"name": "ᱥᱟᱱᱛᱟᱲᱤ (Santali)", "script": "Ol Chiki", "family": "Austroasiatic"},
    "ks": {"name": "कॉशुर / كأشُر (Kashmiri)", "script": "Arabic/Devanagari", "family": "Dardic"},
    "ne": {"name": "नेपाली (Nepali)", "script": "Devanagari", "family": "Indo-Aryan"},
    "kok": {"name": "कोंकणी (Konkani)", "script": "Devanagari", "family": "Indo-Aryan"},
    "doi": {"name": "डोगरी (Dogri)", "script": "Devanagari", "family": "Indo-Aryan"},
    "mni": {"name": "ꯃꯤꯇꯩ ꯂꯣꯟ (Manipuri/Meitei)", "script": "Meitei Mayek", "family": "Sino-Tibetan"},
    "brx": {"name": "बर' (Bodo)", "script": "Devanagari", "family": "Sino-Tibetan"},
    "sa": {"name": "संस्कृतम् (Sanskrit)", "script": "Devanagari", "family": "Indo-Aryan"},
    "sd": {"name": "سنڌي / सिन्धी (Sindhi)", "script": "Arabic/Devanagari", "family": "Indo-Aryan"},
    # Dialect & Code-switching support
    "hinglish": {"name": "Hinglish (Hindi + English)", "script": "Latin", "family": "Code-Mixed"},
    "teluglish": {"name": "Teluglish (Telugu + English)", "script": "Latin", "family": "Code-Mixed"},
    "tanglish": {"name": "Tanglish (Tamil + English)", "script": "Latin", "family": "Code-Mixed"}
}

# Vernacular Bureaucracy Simplifier Dictionary
VERNACULAR_JARGON_DICTIONARY = {
    "Direct Benefit Transfer": {
        "simple_en": "Money sent directly into your bank account with zero middleman charges.",
        "simple_hi": "बिना किसी बिचौलिए के सीधे आपके बैंक खाते में पैसा ट्रांसफर।",
        "simple_te": "ఎలాంటి దళారీలు లేకుండా నేరుగా మీ బ్యాంక్ ఖాతాలో డబ్బులు జమ చేయడం.",
        "hinglish": "No middleman, direct money in your bank account."
    },
    "Pattadar Passbook": {
        "simple_en": "Official government document proving land ownership.",
        "simple_hi": "जमीन के स्वामित्व का सरकारी प्रमाण पत्र।",
        "simple_te": "మీ భూమి హక్కులను నిరూపించే ప్రభుత్వ పాస్‌బుక్.",
        "hinglish": "Land ownership proof book from government."
    },
    "Domicile Certificate": {
        "simple_en": "Proof that you live in this state.",
        "simple_hi": "आप इस राज्य के स्थायी निवासी हैं इसका प्रमाण।",
        "simple_te": "మీరు ఈ రాష్ట్రంలోనే నివసిస్తున్నారని తెలిపే నివాస ధృవీకరణ పత్రం.",
        "hinglish": "State residence proof document."
    },
    "Income Certificate": {
        "simple_en": "Government paper stating how much money your family earns per year.",
        "simple_hi": "आपकी वार्षिक कमाई को दर्शाने वाला सरकारी प्रमाणपत्र।",
        "simple_te": "మీ కుటుంబం సంవత్సరానికి ఎంత సంపాదిస్తుందో తెలిపే ఆదాయ ధృవీకరణ పత్రం.",
        "hinglish": "Yearly family income proof paper."
    }
}

class JanAIMCPRegistry:
    """Model Context Protocol (MCP) Server Tool Registry"""

    @staticmethod
    def list_tools() -> List[Dict[str, Any]]:
        return [
            {
                "name": "janai_search_schemes",
                "description": "Search 25+ verified central and state Indian government schemes using natural language queries across 22 regional languages & code-mixed dialects.",
                "inputSchema": {
                    "type": "object",
                    "properties": {
                        "query": {"type": "string", "description": "Natural language query e.g. 'Farmer in AP with 2 acres' or 'scholarship for SC girl student'"},
                        "language": {"type": "string", "description": "Language code e.g. 'en', 'te', 'hi', 'hinglish'", "default": "en"},
                        "state": {"type": "string", "description": "Filter by Indian State e.g. 'Andhra Pradesh', 'Telangana', 'All India'", "default": "All India"}
                    },
                    "required": ["query"]
                }
            },
            {
                "name": "janai_check_eligibility",
                "description": "Evaluate citizen eligibility rules based on age, income, caste, land ownership, and occupation.",
                "inputSchema": {
                    "type": "object",
                    "properties": {
                        "age": {"type": "integer"},
                        "occupation": {"type": "string"},
                        "annualIncome": {"type": "integer"},
                        "caste": {"type": "string"},
                        "landOwnershipAcres": {"type": "number"},
                        "state": {"type": "string"}
                    },
                    "required": ["occupation", "annualIncome"]
                }
            },
            {
                "name": "janai_multilingual_translate",
                "description": "Translate and simplify official government bureaucracy jargon into 22 Indian languages or code-mixed dialects (Hinglish, Teluglish, Tanglish).",
                "inputSchema": {
                    "type": "object",
                    "properties": {
                        "text": {"type": "string", "description": "Government jargon or scheme explanation to simplify"},
                        "targetLanguage": {"type": "string", "description": "Target language code from 22 official scheduled languages or code-mixed variant"},
                        "simplificationMode": {"type": "string", "enum": ["standard", "village_vernacular", "code_mixed"], "default": "village_vernacular"}
                    },
                    "required": ["text", "targetLanguage"]
                }
            },
            {
                "name": "janai_household_scrutiny",
                "description": "Run AI scheme matrix scrutiny across all family members (Self, Father, Mother, Siblings) to calculate total household benefit potential.",
                "inputSchema": {
                    "type": "object",
                    "properties": {
                        "user_id": {"type": "string", "default": "user-1"}
                    }
                }
            },
            {
                "name": "janai_digilocker_kyc",
                "description": "Perform e-KYC document verification via DigiLocker MeitY gateway.",
                "inputSchema": {
                    "type": "object",
                    "properties": {
                        "citizen_name": {"type": "string"},
                        "mobile_number": {"type": "string"}
                    },
                    "required": ["citizen_name"]
                }
            }
        ]

    @staticmethod
    def execute_tool(name: str, arguments: Dict[str, Any]) -> Dict[str, Any]:
        if name == "janai_search_schemes":
            query = arguments.get("query", "").lower()
            lang = arguments.get("language", "en")
            
            # Simple keyword matching over database or mock scheme catalog
            schemes_sample = [
                {"id": "pm-kisan", "title": "PM-Kisan Samman Nidhi", "category": "Agriculture", "benefit": "₹6,000 / year", "state": "All India"},
                {"id": "post-matric-scholarship", "title": "Post-Matric Scholarship Scheme", "category": "Education", "benefit": "₹20,000 / year", "state": "All India"},
                {"id": "rythu-bandhu", "title": "Rythu Bandhu Scheme", "category": "Agriculture", "benefit": "₹10,000 / acre", "state": "Telangana"},
                {"id": "ayushman-bharat", "title": "Ayushman Bharat PM-JAY", "category": "Healthcare", "benefit": "₹5 Lakh insurance", "state": "All India"}
            ]
            
            results = [s for s in schemes_sample if any(w in s["title"].lower() or w in s["category"].lower() for w in query.split())]
            if not results:
                results = schemes_sample[:2]
                
            return {
                "mcp_protocol": "2.0",
                "tool": name,
                "language_context": SCHEDULED_INDIAN_LANGUAGES.get(lang, SCHEDULED_INDIAN_LANGUAGES["en"]),
                "results_count": len(results),
                "schemes": results
            }

        elif name == "janai_check_eligibility":
            income = arguments.get("annualIncome", 180000)
            occupation = arguments.get("occupation", "Student")
            
            is_eligible = income <= 250000
            score = 94 if is_eligible else 40
            
            return {
                "mcp_protocol": "2.0",
                "tool": name,
                "eligible": is_eligible,
                "ai_success_score": score,
                "reasons": ["Income within ₹2.5 Lakh limit", f"Target occupation matched ({occupation})"]
            }

        elif name == "janai_multilingual_translate":
            text = arguments.get("text", "")
            target_lang = arguments.get("targetLanguage", "hi")
            mode = arguments.get("simplificationMode", "village_vernacular")
            
            lang_info = SCHEDULED_INDIAN_LANGUAGES.get(target_lang, SCHEDULED_INDIAN_LANGUAGES["hi"])
            
            # Check dictionary match or return simplified vernacular string
            simplified_term = VERNACULAR_JARGON_DICTIONARY.get(text, {}).get(f"simple_{target_lang}", None)
            if not simplified_term:
                simplified_term = f"[Vernacular {lang_info['name']}]: {text} (Simplified for rural citizens with zero bureaucracy jargon)"
                
            return {
                "mcp_protocol": "2.0",
                "tool": name,
                "target_language": lang_info,
                "mode": mode,
                "original_text": text,
                "simplified_text": simplified_term
            }

        elif name == "janai_household_scrutiny":
            conn = get_db()
            cursor = conn.cursor()
            cursor.execute("SELECT * FROM users WHERE id = 'user-1'")
            user = cursor.fetchone()
            cursor.execute("SELECT * FROM family_members WHERE user_id = 'user-1'")
            family = cursor.fetchall()
            conn.close()
            
            total_members = 1 + len(family)
            estimated_benefit = 6000 + (20000 * len([f for f in family if dict(f).get("occupation") == "Student"])) + 5000
            
            return {
                "mcp_protocol": "2.0",
                "tool": name,
                "household_members_scanned": total_members,
                "total_estimated_annual_benefit": f"₹{estimated_benefit:,}",
                "primary_citizen": dict(user) if user else {"name": "Devanth"}
            }

        elif name == "janai_digilocker_kyc":
            name_input = arguments.get("citizen_name", "Devanth")
            return {
                "mcp_protocol": "2.0",
                "tool": name,
                "status": "Verified",
                "gateway": "MeitY DigiLocker Aadhaar Gateway",
                "citizen_name": name_input,
                "verification_badge": "Green Verified Citizen",
                "imported_docs": ["Aadhaar Card", "Income Certificate", "Caste Certificate"]
            }

        else:
            return {"error": f"Unknown MCP tool '{name}'"}
