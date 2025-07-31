#!/bin/bash

# Dracarys Setup Script
# This script sets up the complete development environment

set -e

echo "🚀 Setting up Dracarys - AI-Powered Website"
echo "=============================================="

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if required tools are installed
check_requirements() {
    print_status "Checking system requirements..."
    
    # Check Node.js
    if ! command -v node &> /dev/null; then
        print_error "Node.js is not installed. Please install Node.js 18+ first."
        exit 1
    fi
    
    # Check npm
    if ! command -v npm &> /dev/null; then
        print_error "npm is not installed. Please install npm first."
        exit 1
    fi
    
    # Check Python
    if ! command -v python3 &> /dev/null; then
        print_error "Python 3 is not installed. Please install Python 3.9+ first."
        exit 1
    fi
    
    # Check pip
    if ! command -v pip3 &> /dev/null; then
        print_error "pip3 is not installed. Please install pip3 first."
        exit 1
    fi
    
    # Check PostgreSQL (optional, will use Docker if not available)
    if ! command -v psql &> /dev/null; then
        print_warning "PostgreSQL is not installed locally. Will use Docker for database."
        USE_DOCKER_DB=true
    else
        USE_DOCKER_DB=false
    fi
    
    # Check Docker (optional)
    if ! command -v docker &> /dev/null; then
        print_warning "Docker is not installed. Some features may not work."
        USE_DOCKER=false
    else
        USE_DOCKER=true
    fi
    
    print_success "System requirements check completed"
}

# Setup frontend
setup_frontend() {
    print_status "Setting up frontend..."
    
    cd frontend
    
    # Install dependencies
    print_status "Installing frontend dependencies..."
    npm install
    
    # Create environment file if it doesn't exist
    if [ ! -f .env.local ]; then
        print_status "Creating frontend environment file..."
        cp env.example .env.local
    fi
    
    cd ..
    print_success "Frontend setup completed"
}

# Setup backend
setup_backend() {
    print_status "Setting up backend..."
    
    cd backend
    
    # Create virtual environment
    if [ ! -d "venv" ]; then
        print_status "Creating Python virtual environment..."
        python3 -m venv venv
    fi
    
    # Activate virtual environment
    print_status "Activating virtual environment..."
    source venv/bin/activate
    
    # Install dependencies
    print_status "Installing backend dependencies..."
    pip install -r requirements.txt
    
    # Create environment file if it doesn't exist
    if [ ! -f .env ]; then
        print_status "Creating backend environment file..."
        cp env.example .env
    fi
    
    # Initialize Alembic
    print_status "Initializing database migrations..."
    alembic init migrations || true
    
    cd ..
    print_success "Backend setup completed"
}

# Setup database
setup_database() {
    print_status "Setting up database..."
    
    if [ "$USE_DOCKER_DB" = true ]; then
        print_status "Using Docker for PostgreSQL..."
        
        if [ "$USE_DOCKER" = true ]; then
            # Start PostgreSQL with Docker
            docker run --name dracarys_postgres \
                -e POSTGRES_DB=dracarys_db \
                -e POSTGRES_USER=dracarys_user \
                -e POSTGRES_PASSWORD=dracarys_password \
                -p 5432:5432 \
                -d postgres:15
                
            print_status "Waiting for PostgreSQL to start..."
            sleep 10
        else
            print_error "Docker is required for database setup. Please install Docker or PostgreSQL."
            exit 1
        fi
    else
        print_status "Using local PostgreSQL..."
        
        # Create database if it doesn't exist
        createdb -U postgres dracarys_db 2>/dev/null || print_warning "Database might already exist"
    fi
    
    # Run database setup
    cd backend
    source venv/bin/activate
    
    print_status "Running database migrations..."
    alembic upgrade head
    
    print_status "Setting up initial data..."
    python setup_db.py
    
    cd ..
    print_success "Database setup completed"
}

# Start services
start_services() {
    print_status "Starting services..."
    
    # Start backend
    print_status "Starting backend server..."
    cd backend
    source venv/bin/activate
    uvicorn app.main:app --reload --host 0.0.0.0 --port 8000 &
    BACKEND_PID=$!
    cd ..
    
    # Wait for backend to start
    sleep 5
    
    # Start frontend
    print_status "Starting frontend server..."
    cd frontend
    npm run dev &
    FRONTEND_PID=$!
    cd ..
    
    print_success "Services started successfully!"
    echo ""
    echo "🌐 Frontend: http://localhost:3000"
    echo "🔧 Backend API: http://localhost:8000"
    echo "📚 API Docs: http://localhost:8000/docs"
    echo ""
    echo "👤 Default users:"
    echo "   Admin: admin@dracarys.com / admin123"
    echo "   User:  user@dracarys.com / user123"
    echo ""
    echo "Press Ctrl+C to stop all services"
    
    # Wait for user to stop
    wait
}

# Cleanup function
cleanup() {
    print_status "Stopping services..."
    kill $BACKEND_PID 2>/dev/null || true
    kill $FRONTEND_PID 2>/dev/null || true
    print_success "Services stopped"
    exit 0
}

# Main execution
main() {
    # Set up signal handlers
    trap cleanup SIGINT SIGTERM
    
    # Check requirements
    check_requirements
    
    # Setup components
    setup_frontend
    setup_backend
    setup_database
    
    # Start services
    start_services
}

# Run main function
main 