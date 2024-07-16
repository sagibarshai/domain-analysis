**This project was written in 2 days.**



Getting Started


To start the application, follow these steps:


Clone the repository to your local machine:


git clone <repository_url>
Navigate to the project directory:


cd <project_directory>
Make sure that ports 4000, 4001, 4002 and 5432 are available and the Docker daemon is running.

Start the application using Docker Compose with the command: docker-compose up


To change the cronjob interval (default is 30 seconds, can be changed to 30 days), go to Scanner => src => config and modify the cronjobIntervalLoop value.


************************************************************************************************************************************************************************************************************************


API Endpoints


1. GET Domain Data

Description: Retrieves domain data from the server. If the domain exists in the list, it returns the domain data. If not, it adds the domain to the list for future analysis.

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



************************************************************************************************************************************************************************************************************************


System Design




The system runs on Docker Compose as a microservices application. The communication between services is synchronous, meaning one service can call another using API calls.

Services:



API Service:


Handles incoming API requests.
Provides endpoints for fetching domain data and adding new domains.
Communicates with the Data Service to retrieve and update data.



Data Service:


Manages the database and handles data persistence.
Provides endpoints for saving and retrieving domain analysis data.
Communicates with the API Service to serve data to users and with the Cronjob Service to update data.




Cronjob Service:


Runs at specified intervals to fetch data from external APIs (WHOIS and VirusTotal).
Processes the fetched data and sends it to the Data Service for updating the database.
Ensures that domain analysis data is kept up-to-date.
Communication
API Service to Data Service: The API Service makes synchronous API calls to the Data Service to retrieve and update domain data.
Cronjob Service to Data Service: The Cronjob Service makes synchronous API calls to the Data Service to update the domain analysis data with the latest information from WHOIS and VirusTota




************************************************************************************************************************************************************************************************************************


Future Improvements:





1. Add Rate Limiter
Why: To prevent abuse and ensure fair usage of the system, adding a rate limiter will help manage the number of requests a user can make within a specified time frame. This enhances the security and stability of the application by protecting it from excessive traffic and potential DDoS attacks.




2. Deep Dive into APIs
Why: Spending more time understanding the WHOIS and VirusTotal APIs will allow for better integration and more efficient use of their features. This could lead to improved data quality, more accurate results, and optimized API usage, which can reduce costs and improve performance.




3. Add Middleware for Caching with Redis
Why: Implementing a caching mechanism with Redis for domain requests can significantly reduce the load on the database, improve response times, and improve the overall performance of the system. By caching frequently accessed data, the system can serve requests faster and more efficiently.




4. Improve CORS Configuration
Why: Properly configuring CORS ensures that only authorized services can communicate with each other, enhancing security by preventing unauthorized access. It also helps in protecting against cross-origin attacks and ensuring that data is only accessible to intended clients.



5. Create Private NPM Packages for Shared Code
Why: Extracting common code, such as error handling and middleware, types and models into private NPM packages facilitates code reuse, improves maintainability, and ensures consistency across the API and Data services. This approach makes it easier to manage and update shared functionality.



6. Implement Database Per Service Approach
Why: Using a separate database for each service can enhance scalability, improve fault isolation, and allow for more tailored optimization of each service's database schema. This approach can also simplify the microservices architecture by decoupling the services further.




7. Invest More Time in Normalizing Tables
Why: Proper normalization of database tables reduces redundancy and ensures data integrity. It simplifies the database structure, making it easier to maintain and query, and improves the efficiency of data storage.



8. Implement Promise.all and Transactions
Why: Using Promise.all and database transactions can enhance reliability by ensuring that multiple asynchronous operations are executed concurrently and consistently. Transactions ensure that a group of operations either all succeed or all fail, maintaining data consistency.



9. Improve Database Schema
Why: Enhancing types, constraints, and foreign keys in the database schema ensures data integrity, enforces relationships between tables, and improves query performance. This leads to a more robust and reliable database design.



10. Fix Type Status Error in PostgreSQL
Why: Checking for the existence of a type before creating it prevents errors and ensures that the database schema can be created or updated without conflicts. This step improves the deployment process and reduces the likelihood of runtime errors.




11. Improve Logging
Why: Enhanced logging provides better visibility into the system's operations, making it easier to monitor, debug, and maintain. Comprehensive logs help track the application's behavior, detect issues early, and provide valuable insights for troubleshooting.




12. Improve Communication Design
Why: A better communication design can enhance the efficiency and reliability of interactions between services. One approach could be to adopt an event-driven architecture with an event bus or message broker, enabling asynchronous communication and decoupling services.

************************************************************************************************************************************************************************************************************************

