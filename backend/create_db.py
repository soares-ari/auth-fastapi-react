from app.database.base_class import Base
from app.database.session import engine
from app import models # importa para garantir que os modelos sejam registrados

def init_db():
    print("Criando as tabelas no banco de dados...")
    Base.metadata.create_all(bind=engine)
    print("Tabelas criadas com sucesso!")

if __name__ == "__main__":
    init_db()