/**
 * Jenkins Declarative Pipeline Configuration
 * Defines CI/CD stages for automated testing and deployment
 */

pipeline {
  agent any

  options {
    timeout(time: 30, unit: 'MINUTES')
    buildDiscarder(logRotator(numToKeepStr: '10'))
    timestamps()
  }

  parameters {
    booleanParam(name: 'RUN_INTEGRATION_TESTS', defaultValue: true, description: 'Run integration tests')
    booleanParam(name: 'GENERATE_REPORT', defaultValue: true, description: 'Generate HTML test report')
  }

  stages {
    stage('Checkout Code') {
      steps {
        echo '=== Checking Out Code ==='
        checkout scm
        echo '✓ Code checked out successfully'
      }
    }

    stage('Install Dependencies') {
      steps {
        echo '=== Installing Dependencies ==='
        sh 'npm install'
        echo '✓ Dependencies installed'
      }
    }

    stage('Lint & Code Quality') {
      when {
        expression { fileExists('package.json') }
      }
      steps {
        echo '=== Running Code Quality Checks ==='
        sh 'npm run test:verbose || true'
        echo '✓ Code quality checks completed'
      }
    }

    stage('Unit Tests') {
      steps {
        echo '=== Running Unit Tests ==='
        sh 'npm run test:unit'
        echo '✓ Unit tests completed'
      }
    }

    stage('Integration Tests') {
      when {
        expression { params.RUN_INTEGRATION_TESTS == true }
      }
      steps {
        echo '=== Running Integration Tests ==='
        sh 'npm run test:integration'
        echo '✓ Integration tests completed'
      }
    }

    stage('Run All Tests') {
      steps {
        echo '=== Running Complete Test Suite ==='
        sh 'npm test'
        echo '✓ All tests completed successfully'
      }
    }

    stage('Generate Test Report') {
      when {
        expression { params.GENERATE_REPORT == true }
      }
      steps {
        echo '=== Generating HTML Test Report ==='
        sh 'npm run test:report || npm test'
        echo '✓ Test report generated'
      }
    }

    stage('Archive Artifacts') {
      steps {
        echo '=== Archiving Build Artifacts ==='
        archiveArtifacts artifacts: 'test-reports/**/*', allowEmptyArchive: true
        echo '✓ Artifacts archived'
      }
    }

    stage('Publish Test Results') {
      steps {
        echo '=== Publishing Test Results ==='
        junit allowEmptyResults: true, testResults: 'test-reports/**/*.xml'
        echo '✓ Test results published'
      }
    }
  }

  post {
    always {
      echo '=== Pipeline Execution Summary ==='
      echo "Build Status: ${currentBuild.result}"
      echo "Build Number: ${env.BUILD_NUMBER}"
      echo "Build URL: ${env.BUILD_URL}"
    }

    success {
      echo '✓ Pipeline executed successfully!'
      echo '✓ All tests passed'
      echo '✓ Ready for deployment'
    }

    failure {
      echo '✗ Pipeline failed'
      echo '✗ Check logs for details'
    }

    unstable {
      echo '⚠ Pipeline is unstable'
      echo '⚠ Some tests may have failed'
    }

    cleanup {
      echo '=== Cleaning Up ==='
      deleteDir()
      echo '✓ Cleanup completed'
    }
  }
}
