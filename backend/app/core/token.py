from datetime import datetime, timedelta, timezone
from typing import Union
from jose import JWTError, jwt

# Configurações
SECRET_KEY = "sua-chave-secreta-supersegura"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

# Geração do token
def create_access_token(data: dict, expires_delta: Union[timedelta, None] = None):
    to_encode = data.copy()
    
    # Define expiração do token
    expire = datetime.now(timezone.utc) + (expires_delta or timedelta(minutes=15))
    to_encode.update({"exp": expire})
    
    # Gera o JWT assinado
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)

# Verificação do token
def verify_token(token: str):
    try:
        return jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
    except JWTError:
        return None