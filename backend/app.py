import os
import requests
from flask import Flask, request, jsonify
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

# Retrieve the GitHub token from the .env file
TOKEN = os.getenv("GITHUB_TOKEN")

if not TOKEN:
    raise ValueError("GITHUB_TOKEN is not set in the .env file!")

app = Flask(__name__)

# GitHub API URL
API_URL = "https://api.github.com/graphql"

# Set headers with authorization
HEADERS = {
    "Authorization": f"Bearer {TOKEN}",
    "Content-Type": "application/json"
}


def fetch_vulnerabilities(package_name, ecosystem):
    """
    Fetch vulnerabilities for a given package and ecosystem from GitHub API.
    """
    query = f"""
    {{
      securityVulnerabilities(first: 10, ecosystem: {ecosystem}, package: "{package_name}") {{
        edges {{
          node {{
            severity
            advisory {{
              summary
              references {{
                url
              }}
            }}
            vulnerableVersionRange
          }}
        }}
      }}
    }}
    """

    # Send POST request to GitHub API
    response = requests.post(API_URL, json={"query": query}, headers=HEADERS)

    # Check if the response is successful
    if response.status_code != 200:
        return {"error": f"GitHub API error: {response.status_code} {response.text}"}, response.status_code

    # Parse JSON response
    response_json = response.json()

    # Extract and format vulnerability data
    vulnerabilities = response_json["data"]["securityVulnerabilities"]["edges"]
    parsed_vulnerabilities = [
        {
            "severity": vuln["node"]["severity"],
            "summary": vuln["node"]["advisory"]["summary"],
            "vulnerable_version_range": vuln["node"]["vulnerableVersionRange"],
        }
        for vuln in vulnerabilities
    ]

    return parsed_vulnerabilities


@app.route("/vulnerabilities", methods=["GET"])
def vulnerabilities():
    """
    Endpoint to fetch vulnerabilities for a given package and ecosystem.
    Example usage: /vulnerabilities?package=lodash&ecosystem=NPM
    """
    package_name = request.args.get("package")
    ecosystem = request.args.get("ecosystem", "NPM")  # Default to NPM if not provided

    if not package_name:
        return jsonify({"error": "Package name is required."}), 400

    try:
        vulnerabilities = fetch_vulnerabilities(package_name, ecosystem)
        return jsonify(vulnerabilities), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500


if __name__ == "__main__":
    app.run(debug=True)
