
pipeline {
    agent any

    options {
        disableConcurrentBuilds()
        timestamps()
    }

    stages {

        stage('Checkout') {
            steps {
                echo 'Checking out source code...'
                checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {
                echo 'Installing dependencies...'
                sh 'npm ci'
            }
        }

        stage('Build Angular Application') {
            steps {
                echo 'Building Angular application...'
                sh 'npm run build'
            }
        }

        stage('Deploy') {
            steps {
                echo 'Deploying portfolio...'

                sh '''
                    set -e

                    DEPLOY_DIR="/var/www/satendra2rajput"
                    BUILD_DIR="dist/satendra-portfolio"

                    echo "======================================"
                    echo "Starting Portfolio Deployment"
                    echo "======================================"

                    echo "Build directory: $BUILD_DIR"
                    echo "Deploy directory: $DEPLOY_DIR"

                    echo "Checking build directory..."

                    if [ ! -d "$BUILD_DIR" ]; then
                        echo "ERROR: Build directory not found!"
                        echo "Expected: $BUILD_DIR"
                        exit 1
                    fi

                    echo "Build directory found."

                    echo "Cleaning old deployment..."

                    rm -rf "${DEPLOY_DIR:?}"/*

                    echo "Copying Angular build..."

                    cp -r "$BUILD_DIR"/* "$DEPLOY_DIR/"

                    echo "Setting ownership..."

                    chown -R jenkins:jenkins "$DEPLOY_DIR"

                    echo "Deployment completed successfully."
                '''
            }
        }

        stage('Verify Deployment') {
            steps {
                echo 'Verifying deployment...'

                sh '''
                    set -e

                    echo "======================================"
                    echo "Verifying Portfolio"
                    echo "======================================"

                    echo "Deployed files:"
                    ls -lah /var/www/satendra2rajput

                    echo "Checking index.html..."

                    if [ ! -f "/var/www/satendra2rajput/index.html" ]; then
                        echo "ERROR: index.html not found!"
                        exit 1
                    fi

                    echo "index.html found."

                    echo "Checking Angular assets..."

                    if [ ! -d "/var/www/satendra2rajput/assets" ]; then
                        echo "WARNING: assets directory not found."
                    else
                        echo "assets directory found."
                    fi

                    echo "======================================"
                    echo "Deployment verification successful."
                    echo "======================================"
                '''
            }
        }
    }

    post {

        success {
            echo '''
========================================
PORTFOLIO DEPLOYMENT SUCCESSFUL
========================================

Website:
https://satendra2rajput.com

Deployment Directory:
/var/www/satendra2rajput

========================================
'''
        }

        failure {
            echo '''
========================================
PORTFOLIO DEPLOYMENT FAILED
========================================

Please check the Jenkins console output.

========================================
'''
        }

        always {
            echo 'Jenkins pipeline finished.'
        }
    }
}

