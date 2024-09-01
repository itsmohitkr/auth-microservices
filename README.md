Here's a detailed `README.md` file template for your Node.js authentication microservices project. This template covers the setup, usage, and deployment processes, including the CI/CD pipeline you described.

```markdown
# Node.js Authentication Microservices

This project is an authentication microservices system built with Node.js, Express, Docker, and GitHub Actions for CI/CD deployment on an EC2 instance. It includes routes for user signup, login, logout, token verification, and password reset functionalities.

## Features

- User Signup and Login
- JWT Token-based Authentication
- Password Reset and Email Notifications
- Secure Cookie Handling
- CI/CD Pipeline with GitHub Actions and Docker
- Deployed on Amazon EC2

## Table of Contents

- [Getting Started](#getting-started)
- [Prerequisites](#prerequisites)
- [Environment Variables](#environment-variables)
- [Installation](#installation)
- [Running Locally](#running-locally)
- [Deployment](#deployment)
- [CI/CD Pipeline](#cicd-pipeline)
- [API Endpoints](#api-endpoints)
- [Contributing](#contributing)
- [License](#license)

## Getting Started

Follow the instructions below to set up and run the project locally or deploy it using GitHub Actions and Docker.

## Prerequisites

- [Node.js](https://nodejs.org/) (version 18 or above)
- [Docker](https://www.docker.com/) installed on your system
- [GitHub Account](https://github.com/) for CI/CD setup
- Amazon EC2 instance for deployment
- GitHub repository secrets configured for sensitive environment variables

## Environment Variables

Ensure you have the following environment variables set up in your `.env` file and GitHub Secrets:

```env
DATABASE_URL=your_database_connection_url
JWT_SECRET=your_jwt_secret
EMAIL_USERNAME=your_email_username
EMAIL_PASSWORD=your_email_password
NODE_ENV=development  # or production
```

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/auth-microservices.git
   cd auth-microservices
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

## Running Locally

To run the application locally, use the following command:

```bash
npm start
```

The server will start on `http://localhost:5002`.

## Deployment

The application is deployed on an EC2 instance using Docker and GitHub Actions. The CI/CD pipeline automatically builds and pushes the Docker image to Docker Hub, then pulls the latest image to the EC2 instance and runs the container.

### CI/CD Pipeline

#### CI Workflow (`ci-docker-image.yml`)

- Trigger: On push to the main branch
- Steps:
  - Checkout code
  - Log in to Docker Hub
  - Build Docker image
  - Push image to Docker Hub

#### CD Workflow (`cd-deploy-to-ec2.yml`)

- Trigger: After successful CI workflow completion
- Steps:
  - Pull the latest Docker image from Docker Hub
  - Stop and remove the old container
  - Run the new Docker container with updated environment variables

### CI Workflow Example:

```yaml
name: CI - Build Docker Image

on:
  push:
    branches: [ "main" ]

jobs:
  deploy:
    runs-on: ubuntu-latest

    steps:
    - name: Checkout code
      uses: actions/checkout@v4

    - name: Log in to Docker Hub
      uses: docker/login-action@v3
      with:
            username: ${{ secrets.DOCKERHUB_USERNAME }}
            password: ${{ secrets.DOCKERHUB_PASSWORD }}

    - name: Build Docker Image
      run: docker build -t ${{ secrets.DOCKERHUB_USERNAME }}/auth-microservices:latest .

    - name: Push Docker image
      run: docker push ${{ secrets.DOCKERHUB_USERNAME }}/auth-microservices:latest
```

### CD Workflow Example:

```yaml
name: CD - Deploy to EC2

on:
   workflow_run:
    workflows: ["CI - Build Docker Image"]
    types:
      - completed

jobs:
  deploy:
    runs-on: self-hosted

    steps:
    - name: Pull docker image
      run: sudo docker pull ${{ secrets.DOCKERHUB_USERNAME }}/auth-microservices:latest

    - name: Delete Old docker container
      run: sudo docker rm -f auth-microservices-container || true

    - name: Run Docker Container
      run: |
            docker run -d -p 5002:5002 --name auth-microservices-container \
            -e DATABASE_URL="${{ secrets.DATABASE_URL }}" \
            -e JWT_SECRET="${{ secrets.JWT_SECRET }}" \
            -e EMAIL_USERNAME="${{ secrets.EMAIL_USERNAME }}" \
            -e EMAIL_PASSWORD="${{ secrets.EMAIL_PASSWORD }}" \
            -e NODE_ENV="development" \
            ${{ secrets.DOCKERHUB_USERNAME }}/auth-microservices:latest
```

## API Endpoints

- **`POST /signup`** - Register a new user
- **`POST /login`** - Authenticate a user and generate a token
- **`GET /verify-token`** - Verify the user’s JWT token
- **`POST /logout`** - Logout user and clear the cookie
- **`POST /forgot-password`** - Send password reset email
- **`POST /reset-password`** - Reset the user's password

## Contributing

Feel free to submit issues or pull requests for improvements. For major changes, please discuss them in an issue first.

