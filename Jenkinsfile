pipeline {
    agent any
    environment {
        LINTER_RESULT = ''
        TEST_RESULT = ''
        UPDATE_README_RESULT = ''
        DEPLOY_RESULT = ''
        NOTIFY_RESULT = ''
    }

    stages {
        stage('Dependencias') {
            steps {
                script {
                    echo "Instalando dependencias..."
                    bat 'npm install'
                    echo "Instalando CLI de Vercel..."
                    bat 'npm install -g vercel'
                }
            }
        }

        stage('Solicitud de datos') {
            steps {
                script {
                    def ejecutor = input message: '¿Quién ejecuta esta pipeline?', parameters: [
                        string(defaultValue: 'defaultEjecutor', description: 'Ejecutor del job', name: 'ejecutor')
                    ]
                    def motivo = input(message: 'Motivo de la ejecución:', parameters: [
                        string(defaultValue: '', description: 'Motivo de la ejecución', name: 'motivo')
                    ])
                    def chatId = input(message: 'Indica el ChatID de Telegram para las notificaciones:', parameters: [
                        string(defaultValue: '', description: 'ChatID de Telegram', name: 'chatId')
                    ])
                    
                    env.EJECUTOR = ejecutor
                    env.MOTIVO = motivo
                    env.CHAT_ID = chatId
                }
            }
        }

        stage('Linter') {
            steps {
                script {
                    catchError(buildResult: 'SUCCESS', stageResult: 'FAILURE') {
                        try {
                            bat 'npm -v'
                            echo "Verificando instalación de node..."
                            bat 'node -v'
                            echo "Verificando npx..."
                            bat 'npx --version'
                            echo "Verificando versión de ESLint..."
                            bat 'npx eslint --version'
                            echo "Verificando si eslint está instalado..."
                            bat 'npm list eslint || npm install eslint'
                            echo "Verificando versión de ESLint..."
                            bat 'npx eslint --version'
                            echo "Ejecutando ESLint en el proyecto..."
                            bat 'npx eslint .'
                            LINTER_RESULT = 'SUCCESS'
                        } catch (Exception e) {
                            LINTER_RESULT = 'FAILURE'
                            error("Linter falló")
                        }
                    }
                }
            }
        }

        stage('Test') {
            steps {
                script {
                    catchError(buildResult: 'SUCCESS', stageResult: 'FAILURE') {
                        try {
                            bat 'npm test -- --coverage'
                            TEST_RESULT = 'SUCCESS'
                        } catch (Exception e) {
                            TEST_RESULT = 'FAILURE'
                            error("Las pruebas fallaron")
                        }
                    }
                }
            }
        }

        stage('Build') {
            steps {
                script {
                    catchError(buildResult: 'SUCCESS', stageResult: 'FAILURE') {
                        try {
                            bat 'npm run build'
                        } catch (Exception e) {
                            error("El build falló")
                        }
                    }
                }
            }
        }

        stage('Actualizar Readme') {
            steps {
                script {
                    catchError(buildResult: 'SUCCESS', stageResult: 'FAILURE') {
                        try {
                            bat '"C:\\Program Files\\Git\\git-bash.exe" jenkinsScripts/update_readme.sh'
                            UPDATE_README_RESULT = 'SUCCESS'
                        } catch (Exception e) {
                            UPDATE_README_RESULT = 'FAILURE'
                            error("Falló la actualización del README")
                        }
                    }
                }
            }
        }

        stage('Push de cambios') {
            steps {
                script {
                    catchError(buildResult: 'SUCCESS', stageResult: 'FAILURE') {
                        try {
                            bat '"C:\\Program Files\\Git\\git-bash.exe"  jenkinsScripts/push_changes.sh'
                        } catch (Exception e) {
                            error("El push falló")
                        }
                    }
                }
            }
        }

        stage('Deploy a Vercel') {
            steps {
                script {
                    catchError(buildResult: 'SUCCESS', stageResult: 'FAILURE') {
                        try {
                            bat '"C:\\Program Files\\Git\\git-bash.exe"  jenkinsScripts/deploy_to_vercel.sh'
                            DEPLOY_RESULT = 'SUCCESS'
                        } catch (Exception e) {
                            DEPLOY_RESULT = 'FAILURE'
                            error("El deploy a Vercel falló")
                        }
                    }
                }
            }
        }

        stage('Notificación') {
            steps {
                script {
                    catchError(buildResult: 'SUCCESS', stageResult: 'FAILURE') {
                        try {
                            bat """
                            curl -X POST https://api.telegram.org/bot${env.TELEGRAM_BOT_TOKEN}/sendMessage \
                                -d chat_id=${env.CHAT_ID} \
                                -d text="Se ha ejecutado la pipeline de Jenkins con los siguientes resultados:\n
                                Linter_stage: ${LINTER_RESULT}\n
                                Test_stage: ${TEST_RESULT}\n
                                Update_readme_stage: ${UPDATE_README_RESULT}\n
                                Deploy_to_Vercel_stage: ${DEPLOY_RESULT}"
                            """
                            NOTIFY_RESULT = 'SUCCESS'
                        } catch (Exception e) {
                            NOTIFY_RESULT = 'FAILURE'
                        }
                    }
                }
            }
        }
    }

    post {
        always {
            echo "Pipeline completada "
        }
    }
}
