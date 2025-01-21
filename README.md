# VULSCANNER

UofThacks12 submission URL: https://dorahacks.io/buidl/21690

**VULSCANNER** is a fast, user-friendly application designed to help developers identify and avoid security vulnerabilities in their packages. By providing a package name and the environment it is used in, VULSCANNER displays the package's past and present security issues in a table alongside a pie chart showing the severity of these issues. Additionally, VULSCANNER offers AI-generated suggestions for alternative packages that can replace any dangerous ones.

## Features

- **Package Vulnerability Scanning**: Scan for vulnerabilities in your packages by providing the package name and environment.
- **Severity Visualization**: View a pie chart displaying the severity levels of the identified vulnerabilities.
- **AI Recommendations**: Get AI-generated suggestions for alternative packages to replace vulnerable ones.
- **User-Friendly Interface**: Enjoy a simple and intuitive interface for easy scanning and results interpretation.

## Live hosted URL: https://uofthacks12.onrender.com

## Local Installation

### Backend

1. Navigate to the `backend` directory:
   ```
   cd backend
   ```

2. Create a virtual environment:
    ```
    python -m venv venv
    ```

3. Activate the virtual environment:

    On Windows:
    ```
    venv\Scripts\activate
    ```

    On macOS/Linux:
    ```
    ource venv/bin/activate
    ```

4. Install the required dependencies:
    ```
    pip install -r requirements.txt
    ```

5. Create a .env file in the backend directory and add your GitHub Advisory API token:
    ```
    GITHUB_TOKEN=your_github_token_here
    ```

6. Run the Flask app:
    ```
    python app.py
    ```

### Frontend 

1. Navigate to the my-react-app directory:
    ```
    cd my-react-app
    ```

2. Install the required dependencies:
    ```
    npm install
    ```

3. Start the development server:
    ```
    npm run dev
    ```

4. Follow the Localhost URL






