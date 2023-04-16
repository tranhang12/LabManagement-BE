# LabManagement-BE
Steps to Run DB and Code

Install MySQL and DBeaver on your machine.
Create local host database connection with following configuration: { host: 'localhost', user: 'root', password: 'password', database: 'lab_management_db' }
Restore db dump from "src\db\db.sql" into your newly created database.
Database will be populated automatically with required schema.
Go to project directory, open the terminal and type "npm i" to install all the dependencies.
To run the code, type "npm run dev" in the terminal.
To test all the APIs, you can import the requests collection in the postman from "src\postman_requests\postman_collection.json"