"""
JanAI Asynchronous Event Bus Module
Decouples domain services via Event-Driven Architecture (EDA).
"""

import logging
from typing import Callable, Dict, List, Any

class JanAIEventBus:
    def __init__(self):
        self._subscribers: Dict[str, List[Callable]] = {}

    def subscribe(self, event_type: str, handler: Callable):
        """Subscribe a domain handler to an event type"""
        if event_type not in self._subscribers:
            self._subscribers[event_type] = []
        self._subscribers[event_type].append(handler)

    def publish(self, event_type: str, payload: Dict[str, Any]):
        """Publish an event to all registered domain subscribers"""
        logging.info(f"[EVENT BUS] Publishing '{event_type}': {payload.get('event_id', 'N/A')}")
        handlers = self._subscribers.get(event_type, [])
        for handler in handlers:
            try:
                handler(payload)
            except Exception as e:
                logging.error(f"[EVENT BUS] Error executing handler for '{event_type}': {str(e)}")

# Singleton Event Bus Instance
event_bus = JanAIEventBus()
