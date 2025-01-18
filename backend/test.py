import requests

# URL of the Flask app endpoint
API_URL = "http://127.0.0.1:5000/vulnerabilities"  # Replace with your deployed endpoint if necessary

# Parameters for the API request
params = {
    "package": "lodash",  # Replace with the package you want to query
    "ecosystem": "NPM"    # Replace with the ecosystem if needed
}

response = requests.get(API_URL, params=params)
print("Status Code:", response.status_code)
print("Response:", response.json())


##USE IF WANT TO SEE FORMATTED OUTPUT
# def call_vulnerabilities_api():
#     """
#     Call the /vulnerabilities endpoint and print the response.
#     """
#     try:
#         # Send a GET request to the endpoint
#         response = requests.get(API_URL, params=params)

#         # Check if the response is successful
#         if response.status_code == 200:
#             data = response.json()
#             print("Vulnerabilities Response:")
#             for i, vuln in enumerate(data, start=1):
#                 print(f"{i}. Severity: {vuln['severity']}")
#                 print(f"   Summary: {vuln['summary']}")
#                 print(f"   Vulnerable Version Range: {vuln['vulnerable_version_range']}")
#                 print()
#         else:
#             print(f"Error: {response.status_code}")
#             print(response.json())

#     except Exception as e:
#         print(f"An error occurred: {e}")


# if __name__ == "__main__":
#     call_vulnerabilities_api()
