#!/usr/bin/env groovy

pipeline {

    agent {
        docker {
            image 'node'
            args '-u root'
        }
    }

    stages {
        stage('Construction: Build') {
            steps {
                echo 'Building ...'
                sh 'npm install'
                sh 'npm rebuild node-sass --force'
                sh 'npm i -g --unsafe-perm @angular/cli'
                sh 'ng build --prod --build-optimizer=false'
            }
        }
        stage('Construction: Test') {
            steps {
                echo 'Testing...'
                sh 'npm test'
            }
        }
        stage('Deploying: Deploy') {
            steps {
                echo 'Deploying...'
                sshagent(['52488a7e-586a-4087-a6fc-4654e5420403']) {
                    sh 'ssh -o StrictHostKeyChecking=no -l root propertywindow.nl rm -rf /var/www/propertywindow.nl/html/*'
                    sh 'scp -r ./dist/ root@propertywindow.nl:/var/www/propertywindow.nl/html'
                }
            }
        }
    }
}
