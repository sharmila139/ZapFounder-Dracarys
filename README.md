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

## Project Structure

```
dracarys/
├── frontend/                 # Next.js application
│   ├── app/                 # App router pages
│   ├── components/          # Reusable components
│   ├── lib/                 # Utilities and configurations
│   └── public/              # Static assets
├── backend/                 # Python FastAPI application
│   ├── app/                 # Main application code
│   ├── models/              # Database models
│   ├── schemas/             # Pydantic schemas
│   └── migrations/          # Database migrations
├── docker-compose.yml       # Docker configuration
└── README.md               # This file
```

## Quick Start

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

4. **Environment Variables:**
   Create `.env.local` in frontend and `.env` in backend with:
   ```
   DATABASE_URL=postgresql://user:password@localhost/dracarys_db
   JWT_SECRET=your-secret-key
   ```

### Docker Setup

```bash
docker-compose up --build
```

## API Documentation

Once the backend is running, visit:
- Swagger UI: http://localhost:8000/docs
- ReDoc: http://localhost:8000/redoc

## Default Users

- **Super User**: admin@dracarys.com / admin123
- **Test User**: user@dracarys.com / user123

## Customization

All content is stored in the database and can be customized through:
1. Admin panel (super user access)
2. Direct database updates
3. API endpoints for content management

## License

MIT License 