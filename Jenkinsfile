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

                    echo "Cleaning old deployment..."
                    rm -rf "${DEPLOY_DIR:?}"/*

                    echo "Copying new build..."

                    if [ -d "dist" ]; then
                        cp -r dist/* "$DEPLOY_DIR/"
                    else
                        echo "ERROR: dist directory not found!"
                        exit 1
                    fi

                    echo "Setting ownership..."
                    chown -R jenkins:jenkins "$DEPLOY_DIR"

                    echo "Deployment completed successfully."
                '''
            }
        }

        stage('Verify Deployment') {
            steps {
                sh '''
                    echo "Checking deployed files..."
                    ls -lah /var/www/satendra2rajput

                    if [ ! -f "/var/www/satendra2rajput/index.html" ]; then
                        echo "ERROR: index.html not found!"
                        exit 1
                    fi

                    echo "Portfolio deployment verified successfully."
                '''
            }
        }
    }

    post {
        success {
            echo '======================================'
            echo 'Portfolio deployment SUCCESSFUL'
            echo 'https://satendra2rajput.com'
            echo '======================================'
        }

        failure {
            echo '======================================'
            echo 'Portfolio deployment FAILED'
            echo 'Check the Jenkins console output.'
            echo '======================================'
        }
    }
}