from pydantic_settings import BaseSettings
from typing import Optional
from fastapi_mail import ConnectionConfig
from typing import List

# mail_config = ConnectionConfig(
#     MAIL_USERNAME = "your_email@gmail.com",
#     MAIL_PASSWORD = "your_app_password",
#     MAIL_FROM = "your_email@gmail.com",
#     MAIL_PORT = 587,
#     MAIL_SERVER = "smtp.gmail.com",
#     MAIL_TLS = True,
#     MAIL_SSL = False,
#     USE_CREDENTIALS = True
# )

class Settings(BaseSettings):
    # Database
    database_url: str = "postgresql://dracarys_user:dracarys_password@localhost:5432/dracarys_db"
    
    # JWT
    secret_key: str = "your-secret-key-change-this-in-production"
    algorithm: str = "HS256"
    access_token_expire_minutes: int = 30
    
    # CORS
    allowed_origins: list = ["http://localhost:3000", "http://127.0.0.1:3000"]
    
    # Environment
    environment: str = "development"
    debug: bool = True
    # n8n integration settings
    n8n_webhook_url: str = "https://your-n8n-instance.com/webhook/4f18b5d3-ec0b-43a2-b341-2228e90347d5"
    n8n_timeout: int = 300  # 5 minutes timeout for website generation
    
    class Config:
        env_file = ".env"

settings = Settings() 