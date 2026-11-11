from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from datetime import timedelta
import models, schemas
from database import engine, get_db

models.Base.metadata.create_all(bind=engine)

app = FastAPI(title="Oficina & Arte API")

# Configuração de CORS para permitir requisições do Vercel
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # Na produção, substitua pela URL do Vercel
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/api/products", response_model=list[schemas.ProductResponse])
def get_products(skip: int = 0, limit: int = 10, db: Session = Depends(get_db)):
    # RNF03: Paginação e limite para garantir desempenho e portabilidade
    products = db.query(models.Product).filter(models.Product.stock > 0).offset(skip).limit(limit).all()
    return products

@app.post("/api/appointments", status_code=status.HTTP_201_CREATED)
def create_appointment(appt: schemas.AppointmentCreate, db: Session = Depends(get_db)):
    # RF01: Validação de choque de horários (Agenda)
    existing_appt = db.query(models.Appointment).filter(
        models.Appointment.scheduled_at == appt.scheduled_at
    ).first()
    
    if existing_appt:
        # RNF02: Omissão de erro técnico no frontend (Retorna apenas 409)
        raise HTTPException(status_code=409, detail="Horário indisponível.")

    # RF03: Cálculo de previsão para a fila de produção (15 dias fixos para o MVP)
    delivery_date = appt.scheduled_at + timedelta(days=15)

    new_appt = models.Appointment(
        client_name=appt.client_name,
        address=appt.address,
        description=appt.description,
        scheduled_at=appt.scheduled_at,
        estimated_delivery=delivery_date
    )
    
    db.add(new_appt)
    db.commit()
    db.refresh(new_appt)
    
    return {
        "message": "Agendamento confirmado", 
        "scheduled_at": new_appt.scheduled_at,
        "estimated_delivery": new_appt.estimated_delivery
    }