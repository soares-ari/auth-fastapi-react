from passlib.context import CryptContext

# Criamos o contexto de hash com algoritmo bcrypt
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# Função para gerar hash da senha (usada no cadastro)
def get_password_hash(password: str) -> str:
    return pwd_context.hash(password)

# Função para verificar senha (usada no login)
def verify_password(plain_password: str, hashed_password: str) -> bool:
    return pwd_context.verify(plain_password, hashed_password)