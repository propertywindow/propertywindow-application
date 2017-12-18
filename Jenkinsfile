#!/usr/bin/env groovy

notifyBuild('STARTED')

pipeline {

    agent {
        docker {
            image 'teracy/angular-cli'
            args '-u root'
        }
    }

    stages {
            stage('Construction: Build') {
                steps {
                    echo 'Building ...'
                    sh 'npm install'
                    sh 'ng build --prod --build-optimizer=false'
                }
            }
            stage('Construction: Test') {
                steps {
                    echo 'Testing...'
                    echo 'npm test'
                }
            }
            stage('Deploying: Deploy') {
                steps {
                    echo 'Deploying...'
                    sshagent(['52488a7e-586a-4087-a6fc-4654e5420403']) {
                        sh 'ssh -o StrictHostKeyChecking=no -l root propertywindow.nl rm -rf /var/www/propertywindow.nl/html/*'
                        sh 'scp -r ./dist/* root@propertywindow.nl:/var/www/propertywindow.nl/html'
                    }
                    notifyBuild('SUCCESSFUL')
                }
            }
    }
}

def notifyBuild(String buildStatus = 'STARTED') {

  buildStatus =  buildStatus ?: 'SUCCESSFUL'

  def colorName = 'RED'
  def colorCode = '#FF0000'
  def subject = "${buildStatus}: Build '${env.JOB_NAME}'"
  def summary = "${subject} (${env.BUILD_URL})"

  if (buildStatus == 'STARTED') {
    color = 'YELLOW'
    colorCode = '#E6993B'
  } else if (buildStatus == 'SUCCESSFUL') {
    color = 'GREEN'
    colorCode = '#56A459'
  } else {
    color = 'RED'
    colorCode = '#FF0000'
  }

  slackSend (color: colorCode, message: summary)
}