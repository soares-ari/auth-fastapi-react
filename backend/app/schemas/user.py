from pydantic import BaseModel, EmailStr

# Dados que o cliente envia ao se registrar
class UserCreate(BaseModel):
    email: EmailStr
    password: str

# Dados que retornamos em respostas públicas
class UserRead(BaseModel):
    id: int
    email: EmailStr
    is_active: bool
    is_admin: bool

    class Config:
        orm_mode = True # necessário para retornar dados de modelos ORM

# Representação interna, com senha criptografada
class UserInDB(UserRead):
    hashed_password: str