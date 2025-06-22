from fastapi import FastAPI
from app.routes import auth
from fastapi.security import OAuth2PasswordBearer
from fastapi.openapi.utils import get_openapi

# Define o esquema OAuth2 para reutilizar na definição do OpenAPI
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/login")

# Instância principal da aplicação
app = FastAPI(
    title="Sistema de Autenticação",
    version="1.0"
)

# Inclui as rotas definidas
app.include_router(auth.router)

# Rota pública de teste
@app.get("/")
def read_root():
    return {"mensagem": "API de autenticação ativa"}

# Customiza o schema OpenAPI para exibir o botão "Authorize" com bearerAuth
def custom_openapi():
    if app.openapi_schema:
        return app.openapi_schema

    openapi_schema = get_openapi(
        title=app.title,
        version=app.version,
        description="API com autenticação JWT via Bearer Token",
        routes=app.routes,
    )

    openapi_schema["components"]["securitySchemes"] = {
        "bearerAuth": {
            "type": "http",
            "scheme": "bearer",
            "bearerFormat": "JWT"
        }
    }

    for path in openapi_schema["paths"]:
        for method in openapi_schema["paths"][path]:
            if "security" not in openapi_schema["paths"][path][method]:
                openapi_schema["paths"][path][method]["security"] = [{"bearerAuth": []}]

    app.openapi_schema = openapi_schema
    return app.openapi_schema

app.openapi = custom_openapi
