
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

            if [ ! -d "$BUILD_DIR" ]; then
                echo "ERROR: Build directory not found!"
                exit 1
            fi

            echo "Cleaning old deployment..."

            rm -rf "$DEPLOY_DIR/browser"
            rm -f "$DEPLOY_DIR/3rdpartylicenses.txt"
            rm -f "$DEPLOY_DIR/prerendered-routes.json"

            echo "Copying Angular build..."

            cp -r "$BUILD_DIR/browser" "$DEPLOY_DIR/"
            cp "$BUILD_DIR/3rdpartylicenses.txt" "$DEPLOY_DIR/"
            cp "$BUILD_DIR/prerendered-routes.json" "$DEPLOY_DIR/"

            echo "Setting ownership..."

            chown -R jenkins:jenkins "$DEPLOY_DIR/browser"
            chown jenkins:jenkins "$DEPLOY_DIR/3rdpartylicenses.txt"
            chown jenkins:jenkins "$DEPLOY_DIR/prerendered-routes.json"

            echo "Deployment completed successfully."
        '''
    }
}

      stage('Verify Deployment') {
    steps {
        sh '''
            set -e

            echo "======================================"
            echo "Verifying Portfolio"
            echo "======================================"

            ls -lah /var/www/satendra2rajput
            ls -lah /var/www/satendra2rajput/browser

            if [ ! -f "/var/www/satendra2rajput/browser/index.html" ]; then
                echo "ERROR: Angular index.html not found!"
                exit 1
            fi

            if [ ! -d "/var/www/satendra2rajput/browser/assets" ]; then
                echo "WARNING: assets directory not found."
            fi

            echo "index.html found."
            echo "Deployment verification successful."
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

