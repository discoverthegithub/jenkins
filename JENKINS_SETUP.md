# Jenkins Setup & Configuration Guide

## Quick Start

### System Requirements
- Jenkins 2.300+
- Node.js v18.x
- Git (for source control)
- 2GB RAM minimum, 4GB recommended

---

## Installation Steps

### 1. Download & Launch Jenkins

**Option A: WAR File**
```bash
# Download jenkins.war from https://jenkins.io/download/
java -jar jenkins.war --port=8080
```

**Option B: Docker**
```bash
docker run -p 8080:8080 -p 50000:50000 jenkins/jenkins:latest
```

### 2. Initial Setup (First Run)

1. Navigate to http://localhost:8080
2. Copy-paste the initial admin password from console
3. Click "Install suggested plugins"
4. Create admin account
5. Configure Jenkins URL (keep default: http://localhost:8080)

---

## Plugin Installation

### Required Plugins

1. **NodeJS Plugin**
   - Go to: Manage Jenkins → Manage Plugins
   - Search: "NodeJS"
   - Install "NodeJS Plugin"
   - Restart Jenkins

2. **HTML Publisher Plugin**
   - Search: "HTML Publisher"
   - Install
   - Restart Jenkins

3. **Git Plugin** (Usually pre-installed)
   - Search: "Git"
   - Ensure installed

### Optional Plugins
- Pipeline Aggregator
- Build Name and Description Setter
- Log Parser

---

## Node.js Configuration

### Configure Node.js Tool

1. Go to **Manage Jenkins** → **Global Tool Configuration**
2. Find "NodeJS" section
3. Click "Add NodeJS"
4. Settings:
   - **Name**: `nodejs18`
   - **Version**: `18.17.0` (or latest v18)
   - **Check**: ☑️ Install automatically
5. Save

---

## Create Pipeline Job

### Method 1: Freestyle Job

1. **Create New Job**
   - Click "New Item"
   - Name: `nodejs-auth-pipeline`
   - Select: "Freestyle project"
   - Click OK

2. **Source Code Management**
   - Select: Git
   - Repository URL: `https://github.com/yourusername/nodejs-auth-app.git`
   - Credentials: Setup if needed

3. **Build Environment**
   - Check: ☑️ Provide Node & npm bin/ folder to PATH
   - NodeJS Installation: Select `nodejs18`

4. **Build Steps**
   - Add build step → Execute shell
   ```bash
   npm install
   npm test
   npm run test:report
   ```

5. **Post-build Actions**
   - Add: Publish HTML reports
   - HTML directory: `test-reports`
   - Index pages: `report.html`
   - Add: Archive the artifacts
   - Files to archive: `test-reports/**/*`

6. **Save & Build**

### Method 2: Pipeline Job (Recommended)

1. **Create New Job**
   - Click "New Item"
   - Name: `nodejs-auth-pipeline`
   - Select: "Pipeline"
   - Click OK

2. **Pipeline Configuration**
   - Definition: Pipeline script from SCM
   - SCM: Git
   - Repository URL: Your Git repo
   - Branches: `*/main` or `*/master`
   - Script Path: `Jenkinsfile`

3. **Trigger Configuration**
   - Check: ☑️ GitHub hook trigger for GITScm polling
   - Or: Poll SCM - Enter: `H/15 * * * *` (every 15 minutes)

4. **Save & Build**

---

## Running the Pipeline

### Manual Trigger
1. Open job page
2. Click "Build Now"
3. Monitor progress in "Build History"
4. View console output

### Monitor Build
1. Click on build number
2. View "Console Output"
3. See real-time execution
4. Check for errors/failures

### View Results
1. After build completes
2. Click "Test Results" link
3. See test breakdown
4. Click "HTML Report" for detailed report

---

## Build Parameters

### Add Parameters to Job

1. **Check**: Enable this project is parameterized
2. **Add Parameter**: Boolean Parameter
   - Name: `RUN_INTEGRATION_TESTS`
   - Default: `true`
   - Description: Run integration tests

3. **Add Parameter**: Boolean Parameter
   - Name: `GENERATE_REPORT`
   - Default: `true`
   - Description: Generate HTML report

### Use in Build Steps
```bash
if [ "$RUN_INTEGRATION_TESTS" = "true" ]; then
  npm run test:integration
fi

if [ "$GENERATE_REPORT" = "true" ]; then
  npm run test:report
fi
```

---

## Webhook Integration (GitHub)

### Setup GitHub Webhook

1. Go to GitHub Repository
2. Settings → Webhooks → Add webhook
3. Configure:
   - **Payload URL**: `http://your-jenkins-url/github-webhook/`
   - **Content type**: `application/json`
   - **Trigger**: Push events
   - **Active**: ✓ Checked

4. Save webhook

### Jenkins Configuration
1. Job → Configure
2. Build Triggers: Check "GitHub hook trigger..."
3. Save

Now pushes to GitHub will trigger builds automatically!

---

## Troubleshooting

### Issue: npm command not found
- **Solution**: Ensure NodeJS plugin is installed and configured
- **Check**: Manage Jenkins → Global Tool Configuration

### Issue: Tests timing out
- **Solution**: Increase build timeout
- **Configure**: Job → Configure → Build Timeout
- Set: 30 minutes for full suite

### Issue: Permission denied on Jenkinsfile
- **Solution**: Ensure execute permissions
- Run: `chmod +x Jenkinsfile` locally and push

### Issue: Reports not generated
- **Solution**: Check test command in Jenkinsfile
- **Verify**: `npm run test:report` works locally first

---

## Best Practices

### 1. Email Notifications
- Job → Configure → Post-build Actions
- Add: Email Notification
- Recipients: team@company.com
- Trigger: Always, On failure, etc.

### 2. Build Artifacts
- Archive test reports
- Keep last 10 builds only
- Set cleanup policy

### 3. Environment Variables
- Use .env files (not in repo)
- Jenkins Credentials → Add credentials
- Reference in build steps: `$CREDENTIAL_NAME`

### 4. Performance
- Use agent/node labels for distributed builds
- Cache dependencies when possible
- Parallel test execution

### 5. Security
- Use Jenkins credentials for Git
- Never hardcode secrets
- Enable audit logging
- Use SSH keys for authentication

---

## Advanced: Multi-Branch Pipeline

### For multiple branches (main, develop, etc.)

1. **Create New Job**
   - Name: `nodejs-auth-multibranch`
   - Type: "Multibranch Pipeline"

2. **Add Branch Source**
   - Add source → Git
   - Project Repository: Your repo URL
   - Behaviors: Discover branches

3. **Auto-Build on Push**
   - Webhook triggers builds for any branch
   - Each branch gets separate builds

---

## Monitoring & Metrics

### View Build Metrics
1. Job page shows:
   - Recent builds
   - Success rate
   - Build duration trends
   - Test result trends

### Email Reports
Post-build email can include:
- Build status
- Test results
- Code changes
- Performance metrics

### Blue Ocean (Visualization)
1. Install: Blue Ocean plugin
2. View: Job → Open Blue Ocean
3. See: Visual pipeline representation
4. Better UI for monitoring

---

## Production Deployment

### Deploy on Success
Add post-build action:
```bash
if [ $BUILD_RESULT = "SUCCESS" ]; then
  # Deploy to production
  docker build -t app:latest .
  docker run -d -p 3000:3000 app:latest
fi
```

### Slack Integration
- Install: Slack Notification plugin
- Configure: Slack webhook URL
- Post: Build status to Slack channel

---

## Quick Reference

| Task | Command |
|------|---------|
| List jobs | Jenkins UI: Dashboard |
| View logs | Job → Build → Console Output |
| Run job | Click "Build Now" |
| Edit config | Job → Configure |
| Delete job | Job → Delete Project |
| Restart Jenkins | Manage Jenkins → Restart |

---

**Jenkins Setup Complete! 🎉**

Your pipeline is ready to automate testing and deployment!
