#!/usr/bin/env groovy

pipeline {

    agent {
        docker {
            image 'node'
            args '-u root'
        }
    }

    stages {
        stage('build') {
            steps {
                echo 'Building ...'
                sh 'npm install'
                sh 'ng build --prod --build-optimizer=false'
            }
        }
        stage('test') {
            steps {
                echo 'Testing...'
                sh 'npm test'
            }
        }
    }
}