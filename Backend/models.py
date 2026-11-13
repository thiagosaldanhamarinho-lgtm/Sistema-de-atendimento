from sqlalchemy import Column, Integer, String, DateTime, Float
from database import Base
import datetime

class Product(Base):
    __tablename__ = "products"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), index=True)
    price = Column(Float)
    stock = Column(Integer, default=0) # RF02: Controle de estoque
    image_url = Column(String(255))
    image_alt = Column(String(255)) # Acessibilidade (WCAG)

class Appointment(Base):
    __tablename__ = "appointments"
    id = Column(Integer, primary_key=True, index=True)
    client_name = Column(String(100))
    address = Column(String(200))
    description = Column(String(500))
    scheduled_at = Column(DateTime, index=True)
    estimated_delivery = Column(DateTime) # RF03: Prazo calculado pela fila