
 **Backend Setup – XenoCRM**

Follow the steps below to get the backend up and running on your local machine:

**Step 1: Clone the Repository**

bash
git clone https://github.com/your-username/xeno_crm.git
cd xeno_crm/backend


**Step 2: Install Dependencies**

Make sure you have [Node.js](https://nodejs.org/) installed. Then run:

bash
yarn install


This will download all necessary packages listed in package.json.


**Step 3: Set Up Environment Variables**

Create a .env file in the backend/ directory and add the following keys:


PORT=5000
DB_HOST=localhost
DB_USER=your_mysql_user
DB_PASSWORD=your_mysql_password
DB_NAME=xeno_crm
JWT_SECRET=your_jwt_secret
CLIENT_URL=http://localhost:3000
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_email_app_password


> Replace values accordingly.

**Step 4: Start the Server**

Start the backend server using:

bash
node server.js


OR (if using nodemon for auto-restart):

bash
npx nodemon server.js


**Folder Structure Overview**


backend/
├── config/
│   ├── db.js
│   └── passport.js
├── middleware/
│   └── verifyToken.js
├── routes/
│   ├── AuthRoute.js
│   ├── CampaignRoute.js
│   ├── CommunicationLogRoute.js
│   ├── customerRoutes.js
│   ├── OrderRoute.js
│   └── segmentRoute.js
├── services/
│   ├── CampaignService.js
│   ├── CommunicationLogService.js
│   ├── customerService.js
│   ├── OrderService.js
│   ├── segmentService.js
│   └── UserService.js
├── utils/
│   └── EmailService.js
├── .env
├── .gitignore
├── database.sql
├── package.json
├── package-lock.json
├── yarn.lock
└── server.js


**🧪 Tech Stack Used**

* Node.js + Express.js – Server-side framework
* MySQL – Relational database
* JWT – Token-based authentication
* Passport.js (Google OAuth) – Authentication middleware
* Nodemailer – For sending emails
* dotenv – To manage environment variables
* CORS & cookie-parser – Middleware for secure communication
* Yarn – Package manager
