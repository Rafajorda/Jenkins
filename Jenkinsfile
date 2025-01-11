pipeline {
    agent any
    environment {
        LINTER_RESULT = ''
        TEST_RESULT = ''
        UPDATE_README_RESULT = ''
        DEPLOY_RESULT = ''
        NOTIFY_RESULT = ''
        VERCEL_TOKEN = credentials('VERCEL_TOKEN')
        TELEGRAM_BOT_TOKEN =credentials('TELEGRAM_BOT_TOKEN')
            

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
        stage('Configuración de Git') {
            steps {
                script {
                    bat 'git config --global user.name "Rafajorda"'
                    bat 'git config --global user.email "rafajorgis@gmail.com"'
                }
            }
        }

        stage('Actualizar Readme') {
            steps {
                script {
                    catchError(buildResult: 'SUCCESS', stageResult: 'FAILURE') {
                        try {
                            bat 'jenkinsScripts/update_readme.bat'
                            UPDATE_README_RESULT = 'SUCCESS'
                        } catch (Exception e) {
                            UPDATE_README_RESULT = 'FAILURE'
                            error("Falló la actualización del README")
                        }
                    }
                }
            }
        }

        // stage('Push de cambios') {
        //     steps {
        //         script {
        //             catchError(buildResult: 'SUCCESS', stageResult: 'FAILURE') {
        //                 try {
        //                     bat 'jenkinsScripts/push_changes.bat'
        //                 } catch (Exception e) {
        //                     error("El push falló")
        //                 }
        //             }
        //         }
        //     }
        // }

        stage('Deploy a Vercel') {
            steps {
                script {
                    catchError(buildResult: 'SUCCESS', stageResult: 'FAILURE') {
                        try {
                            echo "Verificando versión de Node.js en Jenkins..."
                            bat 'node -v'
                            echo "Verificando versión de npm en Jenkins..."
                            bat 'npm -v' 
                            echo "path"
                            bat 'echo %PATH%' 
                            echo "npm bin"
                            bat 'npm prefix -g'                         
                            bat 'jenkinsScripts/deploy_to_vercel.bat'
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
                            echo "Enviando mensaje a Telegram..."
                            bat """
                            curl -X POST https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage ^
                                -d chat_id=${env.CHAT_ID} ^
                                -d text="Se ha ejecutado la pipeline de Jenkins con los siguientes resultados: Linter_stage: ${LINTER_RESULT} Test_stage: ${TEST_RESULT} Update_readme_stage: ${UPDATE_README_RESULT} Deploy_to_Vercel_stage: ${DEPLOY_RESULT}"
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
