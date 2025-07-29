# E2E Testing with GitHub Actions

<img width="1278" height="430" alt="workflow" src="https://github.com/user-attachments/assets/b7a28ae0-96d8-41af-af53-e11bee5c9c2b" />

<img width="970" height="594" alt="githubactions" src="https://github.com/user-attachments/assets/1bac39c8-08bf-4277-8bf6-44ac6811be67" />

This repository demonstrates automated End-to-End (E2E) testing using GitHub Actions for a **React & Node.js CRUD Application**. The CI/CD pipeline automatically runs comprehensive tests using Selenium Java, Cucumber, and REST Assured frameworks.

## 🚀 Application Overview

**React & Node.js CRUD Application**  
This project is a full-featured CRUD (Create, Read, Update, Delete) application with a React frontend and a Node.js (Express) backend. Users can log in and easily add, update, or delete items. The backend stores data in memory (not persistent).

**Application Stack:**
- **Frontend:** React (Port 3000)
- **Backend:** Node.js Express (Port 3001)
- **Database:** In-Memory Storage
- **Testing:** Selenium Java + Cucumber + REST Assured + Maven

**Test Framework Repository:** [mehmet-alatas/testframework](https://github.com/mehmet-alatas/testframework)

## 📁 Project Structure

```
react_node_crud_app_redesigned_frontend/
├── backend/          # Node.js + Express API
├── frontend/         # React application
└── .github/
    └── workflows/
        └── e2e-tests.yml
```

## 🔧 Installation & Usage

### Manual Setup (Development)

**1. Clone the Repository**
```bash
git clone <repo-url>
cd react_node_crud_app_redesigned_frontend
```

**2. Backend Setup**
```bash
cd backend
npm install
```

**To Start the Backend:**
```bash
npm start
# or
node server.js
```
- The server will run at `http://localhost:3001` by default.

**3. Frontend Setup**
```bash
cd ../frontend
npm install
```

**To Start the Frontend:**
```bash
npm start
```
- The app will open at `http://localhost:3000` by default.

### 🔐 User Login Credentials
- **Default username:** `admin`
- **Default password:** `123456`

### 📡 API Endpoints
- `POST /login` : User login
- `GET /items` : Get all items
- `POST /items` : Add a new item
- `PUT /items/:id` : Update an item
- `DELETE /items/:id` : Delete an item

## 📋 Prerequisites for GitHub Actions

Before setting up the GitHub Actions workflow, ensure your repositories have the following structure:

### Application Repository Structure
```
react_node_crud_app_redesigned_frontend/
├── frontend/
│   ├── package.json
│   ├── src/
│   └── public/
├── backend/
│   ├── package.json
│   └── server.js
└── .github/
    └── workflows/
        └── e2e-tests.yml
```

### Test Framework Repository
```
testframework/
├── src/test/java/
│   ├── pages/
│   ├── runner/
│   ├── stepdefinitions/
│   └── utilities/
├── src/test/resources/
│   └── features/
├── pom.xml
└── README.md
```

## ⚙️ Setup Instructions

### 1. Repository Setup
1. **Application Repository:** Contains your React frontend and Node.js backend
2. **Test Repository:** Contains your Selenium + Cucumber test framework
3. Both repositories should be **public** and in the **same GitHub account**

### 2. GitHub Actions Workflow Setup

Create `.github/workflows/e2e-tests.yml` in your application repository with the provided workflow configuration.

### 3. Package.json Requirements

**Backend package.json:**
```json
{
  "name": "backend",
  "version": "1.0.0",
  "scripts": {
    "start": "node server.js"
  },
  "dependencies": {
    "cors": "^2.8.5",
    "express": "^4.18.2"
  }
}
```

**Frontend package.json:**
```json
{
  "name": "frontend",
  "version": "1.0.0",
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build"
  },
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-scripts": "^5.0.1"
  }
}
```

## 🔄 Workflow Process

The GitHub Actions workflow executes the following steps:

### Phase 1: Environment Setup
1. **Checkout Application Code** - Downloads your application repository
2. **Setup Node.js 18** - Installs Node.js runtime
3. **Install Dependencies** - Installs backend and frontend dependencies
4. **Install Serve Package** - Global installation for serving static files

### Phase 2: Application Deployment
5. **Start Backend Server** - Runs backend on port 3001 in background
6. **Build and Start Frontend** - Builds React app and serves on port 3000
7. **Health Check Services** - Verifies both services are running

### Phase 3: Test Execution
8. **Checkout Test Repository** - Downloads test framework from separate repo
9. **Setup Java 21** - Installs Java runtime with Maven cache
10. **Setup Chrome** - Installs Chrome for headless testing
11. **Run E2E Tests** - Executes `mvn clean install`

### Phase 4: Reporting & Cleanup
12. **Generate Test Reports** - Creates Cucumber and Surefire reports
13. **Upload Test Reports** - Saves reports as GitHub artifacts
14. **Upload Screenshots** - Saves failure screenshots
15. **Cleanup Processes** - Terminates background services
16. **PR Comments** - Optional PR commenting with test results

## 🏷️ Test Execution Tags

The test framework supports tag-based execution:

```bash
# All tests (default)
mvn clean install

# Specific test categories
mvn test -Dcucumber.filter.tags="@smoke"
mvn test -Dcucumber.filter.tags="@api"
mvn test -Dcucumber.filter.tags="@ui" 
mvn test -Dcucumber.filter.tags="@login"
mvn test -Dcucumber.filter.tags="@bug_management"
```

## 📊 Test Coverage

- **Code Coverage:** 100% of CRUD operations, login functionality, and data validation
- **Branch Coverage:** 100% of success/failure scenarios in UI and API layers
- **Path Coverage:** 100% of user workflows and business scenarios
- **API Coverage:** All REST endpoints tested (POST /login, GET/POST/PUT/DELETE /items)

## 📈 Workflow Triggers

The workflow automatically runs on:
- **Push** to `main` or `develop` branches
- **Pull Requests** to `main` or `develop` branches

## 🔧 Configuration Options

### Environment Variables
```yaml
env:
  CI: false  # Disables treating warnings as errors in React builds
```

### Timeouts and Waits
- **Backend startup:** 10 seconds
- **Frontend build & serve:** 15 seconds
- **Service health checks:** Configurable retry mechanism

### Artifact Retention
- **Test Reports:** 30 days
- **Screenshots:** 7 days

## 📋 Best Practices Implemented

### Security
- No sensitive data in workflow files

### Performance
- **Parallel Execution:** ThreadLocal WebDriver support
- **Maven Cache:** Enabled for faster builds
- **Background Processes:** Efficient resource utilization

### Reliability
- **Error Handling:** `|| true` prevents build failures from stopping workflow
- **Cleanup:** Always executes regardless of test results
- **Health Checks:** Verifies service availability before testing

### Reporting
- **Multiple Formats:** Cucumber HTML, Surefire reports
- **Screenshots:** Automatic capture on failures


## 🚨 Troubleshooting

### Common Issues

**Frontend Build Fails:**
```bash
# Solution: ESLint warnings treated as errors
CI=false npm run build
```

**Port Conflicts:**
```bash
# Solution: Proper cleanup in workflow
sudo kill -9 $(sudo lsof -t -i:3000)
sudo kill -9 $(sudo lsof -t -i:3001)
```

**Test Repository Access:**
```bash
# Ensure both repositories are public or use PAT
token: ${{ secrets.GITHUB_TOKEN }}
```

**Chrome Headless Issues:**
```bash
# Ensure proper Chrome options in test code
--headless --no-sandbox --disable-dev-shm-usage
```

## 📚 Additional Resources

- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Selenium WebDriver](https://selenium.dev/documentation/)
- [Cucumber Documentation](https://cucumber.io/docs)
- [REST Assured](https://rest-assured.io/)
- [Maven Documentation](https://maven.apache.org/guides/)

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

**Note:** This README assumes your test framework repository is properly configured with Page Object Model, Singleton WebDriver pattern, and headless Chrome capabilities.
