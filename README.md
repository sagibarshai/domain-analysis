Getting Started


To start the application, follow these steps:


Clone the repository to your local machine:


git clone <repository_url>
Navigate to the project directory:


cd <project_directory>
Make sure that ports 4000, 4001, and 4002 are available and the Docker daemon is running.

Start the application using Docker Compose:


docker-compose up

************************************************************************************************************************************************************************************************************************


API Endpoints


1. GET Domain Data

Description: Retrieves domain data from the server. If the domain exists in the list, it returns the domain data. If not, it adds the domain to the list and then returns the data.

URL: http://localhost:4000/api/domain/{domain}

Method: GET

Parameters:

{domain}: The domain name you want to fetch or add to the list.
Response:

Successful response: Returns domain data as JSON or domain status if there is no data for now.






2. POST Domain for future analysis


Description: Adds a new domain to the server for future scan analysis.

URL: http://localhost:4000/api/domain

Method: POST

Request Body:

JSON object containing the domain to be added.


Example:  { "domain": "example.com" }


************************************************************************************************************************************************************************************************************************



System Overview




The system is designed to collect domains to scan, using a cron job that runs at a given interval to fetch data from the WHOIS API and VirusTotal API. It updates the domain analysis data and provides access to this data when a user requests domain information.

Additionally, the system collects request data, a list of domains to scan, WHOIS API data, and VirusTotal API data for future analysis.

The system is separated into three services:

API Service: Responsible for handling API endpoints.
Data Service: Responsible for saving data to the database and managing the data.
Cronjob Service: Responsible for running at intervals, fetching data from the APIs, and requesting the Data Service to update the data.




