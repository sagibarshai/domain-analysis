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


