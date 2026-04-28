from sqlalchemy import Column, String, ForeignKey, DateTime, Integer, Boolean, UUID, DECIMAL, Numeric
from sqlalchemy.orm import relationship

import uuid
from datetime import datetime

from database import Base


class User(Base):
    __tablename__ = 'users'

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    username = Column(String(50), unique=True, nullable=False)
    email = Column(String(120), unique=True, nullable=False)
    password = Column(String(), nullable=False)
    is_active = Column(Boolean(), default=True)
    created_at = Column(DateTime(timezone=True), default=datetime.utcnow)

    patient_relations = relationship("Patient", back_populates="user")
    appointment_relations = relationship("Appointment", back_populates="therapeut")


class Patient(Base):
    __tablename__ = 'patients'

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    first_name = Column(String(100))
    last_name = Column(String(100))
    address = Column(String())
    email = Column(String(), unique=True, nullable=False)
    phone_number = Column(Integer())
    created_at = Column(DateTime(timezone=True), default=datetime.utcnow)

    user_id = Column(UUID(as_uuid=True), ForeignKey('users.id'))
    user = relationship("User", back_populates="patient_relations")

  
class Appointment(Base):
    __tablename__ = 'appointments'

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    patient_id = Column(UUID(as_uuid=True), ForeignKey('patients.id'), nullable=False)    
    therapeut_id = Column(UUID(as_uuid=True), ForeignKey('users.id'))
    start_time = Column(DateTime(timezone=True)) 
    end_time = Column(DateTime(timezone=True))
    is_tele_consultation = Column(Boolean(), default=False)
    is_confirmed = Column(Boolean(), default=False)

    patient = relationship("Patient", back_populates="appointment_relations")
    therapeut = relationship("User", back_populates="appointment_relations")


class Payment(Base):
    __tablename__ = 'payments'

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    appointment_id = Column(UUID(as_uuid=True), ForeignKey('appointments.id'))
    amount = Column(Numeric(), nullable=False)  # Ajustement type DECIMAL -> Numeric
    payment_date_time = Column(DateTime(timezone=True))