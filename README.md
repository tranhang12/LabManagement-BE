# LabManagement-BE
Steps to Run DB and Code

1. Install MySQL and DBeaver on your machine.
2. Create local host database connection with following configuration: { host: 'localhost', user: 'root', password: 'password', database: 'lab_management_db' }
3. Restore db dump from "src\db\db.sql" into your newly created database.
4. Database will be populated automatically with required schema.
5. Go to project directory, open the terminal and type "npm i" to install all the dependencies.
6. To run the code, type "npm run dev" in the terminal.
7. To test all the APIs, you can import the requests collection in the postman from "src\postman_requests\postman_collection.json"