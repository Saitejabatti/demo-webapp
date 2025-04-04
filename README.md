# cicd
cat > README.md << 'EOF'
# DevOps Demo Application

This is a simple web application designed to demonstrate a complete CI/CD pipeline using:
- GitHub for source code management
- Jenkins for CI/CD orchestration
- Docker for containerization 
- DockerHub for container registry
- AWS EC2 for deployment

## Pipeline Stages
1. Checkout code from GitHub
2. Build the application
3. Run tests
4. Build Docker image
5. Push Docker image to DockerHub
6. Deploy to AWS EC2

## How to Use
1. Fork this repository
2. Configure your Jenkins pipeline
3. Set up required credentials in Jenkins
4. Run the pipeline
EOF
