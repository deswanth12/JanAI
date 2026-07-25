"""
JanAI Enterprise Permission-Based Access Control (PBAC) Engine
Defines granular permission scopes across CEO, Admin, Manager, Moderator, Partner, and Citizen.
"""

ROLE_PERMISSIONS_MAP = {
    "CEO": [
        "system.settings",
        "security.keys.rotate",
        "backup.restore",
        "feature.flags.manage",
        "users.manage",
        "users.suspend",
        "schemes.manage",
        "schemes.author",
        "audit.read",
        "siem.read",
        "documents.review",
        "applications.approve",
        "ai.review",
        "prompt.manage",
        "partner.manage",
        "citizen.services"
    ],
    "Admin": [
        "users.manage",
        "users.suspend",
        "schemes.manage",
        "schemes.author",
        "audit.read",
        "siem.read",
        "documents.review",
        "applications.approve",
        "ai.review",
        "prompt.manage",
        "citizen.services"
    ],
    "Manager": [
        "documents.review",
        "applications.approve",
        "analytics.district.read",
        "user.verify",
        "citizen.services"
    ],
    "Moderator": [
        "ai.review",
        "prompt.manage",
        "gazette.sync.trigger",
        "citizen.services"
    ],
    "Partner": [
        "partner.applications.submit",
        "partner.cases.read",
        "partner.analytics.read",
        "partner.profile.manage",
        "citizen.services"
    ],
    "Citizen": [
        "citizen.services"
    ]
}

def has_permission(role: str, permission: str) -> bool:
    """Check if a given role possesses a specific permission scope"""
    permissions = ROLE_PERMISSIONS_MAP.get(role, [])
    return permission in permissions
