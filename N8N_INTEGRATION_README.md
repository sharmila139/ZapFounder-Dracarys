# N8N Integration for AI Website Generation

This project integrates with an N8N workflow to automatically generate and deploy AI-powered websites based on user descriptions.

## Overview

The integration works as follows:
1. User enters a website description in the frontend
2. Frontend sends the description to the backend API
3. Backend calls the N8N webhook with the description
4. N8N workflow generates a full-stack website and deploys it to Vercel
5. The deployed website URL is returned to the user

## N8N Workflow Details

The N8N workflow (`n8n_fixedchatbot_v5.json`) includes:
- **Frontend Builder Agent**: Generates HTML/CSS/JS based on description
- **Backend Builder Agent**: Creates Flask backend code
- **Chatbot Integrator Agent**: Adds chatbot functionality
- **Vercel Deployment**: Automatically deploys the generated website
- **Webhook Response**: Returns the deployed URL

## Setup Instructions

### 1. Backend Setup

1. Install the required dependencies:
   ```bash
   cd backend
   pip install -r requirements.txt
   ```

2. Copy the environment template:
   ```bash
   cp env.example .env
   ```

3. Update `.env` with your N8N webhook URL:
   ```bash
   N8N_WEBHOOK_URL=https://your-n8n-instance.com/webhook/4f18b5d3-ec0b-43a2-b341-2228e90347d5
   ```

4. Start the backend server:
   ```bash
   uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
   ```

### 2. Frontend Setup

1. Install dependencies:
   ```bash
   cd frontend
   npm install
   ```

2. Copy the environment template:
   ```bash
   cp env.example .env.local
   ```

3. Update `.env.local` with your backend URL:
   ```bash
   BACKEND_URL=http://localhost:8000
   ```

4. Start the frontend development server:
   ```bash
   npm run dev
   ```

### 3. N8N Setup

1. Import the workflow file `n8n_fixedchatbot_v5.json` into your N8N instance
2. Ensure the webhook URL is accessible from your backend
3. Verify that the Google Gemini API credentials are configured
4. Test the workflow with a sample description

## API Endpoints

### Generate Website
- **URL**: `POST /ai/generate-website`
- **Body**: 
  ```json
  {
    "description": "A clean and responsive website for a mental health startup..."
  }
  ```
- **Response**:
  ```json
  {
    "message": "Website generated and deployed successfully!",
    "deployed_url": "https://your-website.vercel.app",
    "description": "User's description",
    "status": "success"
  }
  ```

## Usage

1. Navigate to the homepage
2. Enter a detailed description of the website you want to create
3. Click "Send to AI Agent"
4. Wait for the website generation process (may take 2-5 minutes)
5. Once complete, you'll see a link to your deployed website
6. Click the link to view your AI-generated website

## Example Descriptions

- "A clean and responsive website for a mental health startup with service listings, team bios, blog section, contact form, and chatbot support for user queries"
- "A modern restaurant website with menu, online ordering, reservation system, and beautiful food photography"
- "A SaaS platform landing page for project management with pricing tiers, feature highlights, and customer testimonials"

## Troubleshooting

### Common Issues

1. **Timeout Errors**: The website generation process can take several minutes. Increase the timeout in the backend configuration if needed.

2. **N8N Connection Issues**: Verify that your N8N instance is accessible and the webhook URL is correct.

3. **Vercel Deployment Failures**: Check that the Vercel API token in the N8N workflow is valid and has the necessary permissions.

### Debug Steps

1. Check backend logs for detailed error messages
2. Verify N8N workflow execution status
3. Check browser console for frontend errors
4. Ensure all environment variables are properly set

## Security Considerations

- Store sensitive API keys in environment variables
- Use HTTPS for production deployments
- Implement rate limiting for the website generation endpoint
- Validate user input to prevent injection attacks

## Production Deployment

1. Update environment variables for production
2. Use a production-grade database
3. Implement proper logging and monitoring
4. Set up SSL certificates
5. Configure CORS for production domains
6. Use environment-specific N8N webhook URLs

## Support

For issues related to:
- **Backend**: Check FastAPI logs and database connectivity
- **Frontend**: Check browser console and network requests
- **N8N**: Check workflow execution logs and webhook configuration
- **Vercel**: Check deployment logs and API token validity 