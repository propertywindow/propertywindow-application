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
                echo 'NPM Install ...'
                sh 'npm install'
            }
        }
        stage('test') {
            steps {
                echo 'Testing...'
                sh 'ng build --prod --build-optimizer=false'
            }
        }
    }
}