from pydantic import BaseModel, validator
from datetime import datetime
import html

class AppointmentCreate(BaseModel):
    client_name: str
    address: str
    description: str
    scheduled_at: datetime

    @validator('description', 'client_name', 'address')
    def sanitize_xss(cls, v):
        # RNF02: Proteção contra injeção de scripts (XSS)
        return html.escape(v)

class ProductResponse(BaseModel):
    id: int
    name: str
    price: float
    stock: int
    image_url: str
    image_alt: str

    class Config:
        from_attributes = True

class ProductCreate(BaseModel):
    name: str
    price: float
    stock: int
    image_url: str
    image_alt: str