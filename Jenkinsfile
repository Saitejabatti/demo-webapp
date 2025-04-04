pipeline {
    agent any
    
    environment {
        // Define environment variables
        DOCKER_HUB_CRED = credentials('dockerhub-credentials')
        DOCKER_IMAGE_NAME = 'saitejabatti/demo-webapp'
        DOCKER_IMAGE_TAG = "${env.BUILD_NUMBER}"
        EC2_DEPLOY_IP = '54.197.181.3'  // Can be the same instance or a different one
    }
    
    stages {
        stage('Checkout') {
            steps {
                // Checkout code from GitHub repository
                checkout scm
                echo 'Checkout Completed'
            }
        }
        
        stage('Build') {
            steps {
                // For this simple app, we don't need to build anything
                echo 'Build Step Completed'
            }
        }
        
        stage('Test') {
            steps {
                // Simple test to verify HTML file exists
                sh 'test -f src/index.html'
                echo 'Tests Completed'
            }
        }
        
        stage('Build Docker Image') {
            steps {
                script {
                    // Build Docker image
                    sh "docker build -t ${DOCKER_IMAGE_NAME}:${DOCKER_IMAGE_TAG} ."
                    sh "docker tag ${DOCKER_IMAGE_NAME}:${DOCKER_IMAGE_TAG} ${DOCKER_IMAGE_NAME}:latest"
                    echo 'Docker Image Build Completed'
                }
            }
        }
        
        stage('Push Docker Image to DockerHub') {
            steps {
                script {
                    // Login to DockerHub and push image
                    sh "echo ${DOCKER_HUB_CRED_PSW} | docker login -u ${DOCKER_HUB_CRED_USR} --password-stdin"
                    sh "docker push ${DOCKER_IMAGE_NAME}:${DOCKER_IMAGE_TAG}"
                    sh "docker push ${DOCKER_IMAGE_NAME}:latest"
                    echo 'Docker Image Push Completed'
                }
            }
        }
        
        stage('Deploy') {
            steps {
                script {
                    // For simplicity, deploy to the same instance or specify another instance
                    sh """
                        # Pull the latest Docker image
                        docker pull ${DOCKER_IMAGE_NAME}:${DOCKER_IMAGE_TAG}
                        
                        # Stop and remove any existing container
                        docker stop demo-webapp-container || true
                        docker rm demo-webapp-container || true
                        
                        # Run the new container
                        docker run -d -p 80:80 --name demo-webapp-container ${DOCKER_IMAGE_NAME}:${DOCKER_IMAGE_TAG}
                    """
                    echo 'Deployment Completed'
                }
            }
        }
    }
    
    post {
        always {
            // Clean up Docker images to save space
            sh "docker system prune -a -f || true"
            echo 'Pipeline execution completed'
        }
        success {
            echo 'Pipeline executed successfully!'
        }
        failure {
            echo 'Pipeline execution failed!'
        }
    }
}
