from fastapi import FastAPI

# Instância principal da API
app = FastAPI(title="Sistema de Autenticação", version="1.0")

# Rota de teste temporária
@app.get("/")
def read_root():
    return {"mensagem": "API de autenticação ativa"}