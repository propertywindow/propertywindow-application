#!/usr/bin/env groovy



        pipeline {

            agent {
                docker {
                    image 'docker pull teracy/angular-cli'
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
                            try {
                                notifyBuild('STARTED')
                                echo 'Deploying...'
                                sshagent(['52488a7e-586a-4087-a6fc-4654e5420403']) {
                                    sh 'ssh -o StrictHostKeyChecking=no -l root propertywindow.nl rm -rf /var/www/propertywindow.nl/html/*'
                                    sh 'scp -r ./dist/ root@propertywindow.nl:/var/www/propertywindow.nl/html'
                                }
                            } catch (e) {
                                currentBuild.result = "FAILED"
                                throw e
                            } finally {
                                notifyBuild(currentBuild.result)
                            }
                        }
                    }

            }
    }




def notifyBuild(String buildStatus = 'STARTED') {

  buildStatus =  buildStatus ?: 'SUCCESSFUL'

  def colorName = 'RED'
  def colorCode = '#FF0000'
  def subject = "${buildStatus}: Job '${env.JOB_NAME}'"
  def summary = "${subject} (${env.BUILD_URL})"

  if (buildStatus == 'STARTED') {
    color = 'YELLOW'
    colorCode = '#FFFF00'
  } else if (buildStatus == 'SUCCESSFUL') {
    color = 'GREEN'
    colorCode = '#00FF00'
  } else {
    color = 'RED'
    colorCode = '#FF0000'
  }

  slackSend (color: colorCode, message: summary)
}