# Data Pusher

## Overview
Data Pusher is an Express.js application that receives data for specific accounts and forwards it to multiple destinations (webhook URLs) based on the account's secret token.

## Tech Stack
- Node.js (Latest)
- Express.js
- SQLite (via Sequelize ORM)
- UUID for token generation
- Axios for HTTP requests

## Setup Instructions

1. **Clone the repository** (or unzip the project):
    ```bash
    git clone https://github.com/your_username/data-pusher.git
    cd data-pusher
    ```

2. **Install dependencies**:
    ```bash
    npm install
    ```

3. **Run the application**:
    ```bash
    npm start
    ```
    The server will run on `http://localhost:3000` by default.

## Project Structure
```
data-pusher
├── controllers
│   ├── account.controller.js
│   ├── destination.controller.js
│   └── dataHandler.controller.js
├── models
│   ├── account.js
│   └── destination.js
├── routes
│   ├── account.routes.js
│   ├── destination.routes.js
│   └── data.routes.js
├── utils
│   └── forwarder.js
├── database
│   └── sqlite.js
├── sample-apis
│   ├── create-account.json
│   ├── get-destinations.json
│   └── incoming-data.json
├── .gitignore
├── package.json
├── README.md
└── server.js
```

## API Endpoints

### Account APIs
- **Create Account**: `POST /accounts`
- **Get All Accounts**: `GET /accounts`
- **Get Single Account**: `GET /accounts/:id`
- **Update Account**: `PUT /accounts/:id`
- **Delete Account**: `DELETE /accounts/:id`

### Destination APIs
- **Create Destination**: `POST /accounts/:accountId/destinations`
- **Get All Destinations for Account**: `GET /accounts/:accountId/destinations`
- **Get Single Destination**: `GET /destinations/:id`
- **Update Destination**: `PUT /destinations/:id`
- **Delete Destination**: `DELETE /destinations/:id`

### Data Handler API
- **Receive Data**: `POST /server/incoming_data`
  - Header: `CL-X-TOKEN: <app secret token>`
  - Body: JSON data to be forwarded to destinations.

## Sample API Requests
Check the `sample-apis` folder for example JSON requests.

## Notes
- When deleting an account, all associated destinations are also deleted.
- Forwarding logic: `GET` requests send data as query parameters; `POST`/`PUT` send JSON body.

