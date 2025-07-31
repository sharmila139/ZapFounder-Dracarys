# Dracarys - AI-Powered Website

A complete website with Next.js frontend, Python FastAPI backend, and PostgreSQL database featuring authentication, customizable content, and AI integration.

## Features

- **Landing Page**: Customizable intro section with animations
- **Authentication**: User login system with super user and client roles
- **Content Management**: Customizable pages (About, Contact, Product Details)
- **AI Integration**: Input form that connects to external AI agent
- **Responsive Design**: Modern UI with Tailwind CSS
- **Database**: PostgreSQL with user management

## Tech Stack

- **Frontend**: Next.js 14, Tailwind CSS, Framer Motion
- **Backend**: Python FastAPI, SQLAlchemy, Alembic
- **Database**: PostgreSQL
- **Authentication**: JWT tokens
- **Deployment**: Docker support

### Prerequisites

- Node.js 18+
- Python 3.9+
- PostgreSQL
- Docker (optional)

### Development Setup

1. **Clone and setup frontend:**
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

2. **Setup backend:**
   ```bash
   cd backend
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   pip install -r requirements.txt
   uvicorn app.main:app --reload
   ```

3. **Setup database:**
   ```bash
   # Create PostgreSQL database
   createdb dracarys_db
   
   # Run migrations
   cd backend
   alembic upgrade head
   ```

### Docker Setup

```bash
docker-compose up --build
```


