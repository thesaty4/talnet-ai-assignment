# TalentAI - Multi-Tenant Organization Management System

## Overview
For this assignment we are using KeyCloak to handle user identities. We are creating organizations, each with its own separate space in KeyCloak (realm), and we are adding regional offices inside those organizations (as groups). It has an easy-to-use interface for managing everything, a backend API to handle the operations, and a Postgres database to store the data. Plus, it’s all packed into Docker containers, so setting it up is a breeze!

### Technology Stack
- **Frontend**: Angular (TypeScript)
- **Backend**: Node.js + Express
- **Identity Management**: Keycloak
- **Database**: Postgres
- **Deployment**: Docker, Docker Compose

---

## Project Structure
```
talnetAIAssignment/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   ├── db.config.js         # Postgres DB configuration
│   │   │   ├── env.config.js        # Environment variable configuration
│   │   │   └── keyCloak.config.js   # KeyCloak configuration
│   │   ├── controllers/
│   │   │   ├── organization.controller.js  # Organization-related logic
│   │   │   └── region.controller.js        # Regional office-related logic
│   │   ├── middleware/
│   │   │   └── keyCloak.middleware.js      # KeyCloak authentication middleware
│   │   ├── models/
│   │   │   ├── organization.model.js       # Organization model for DB
│   │   │   └── region.model.js             # Regional office model for DB
│   │   ├── routes/
│   │   │   ├── organization.routes.js      # Organization API routes
│   │   │   ├── region.routes.js            # Regional office API routes
│   │   │   └── routes.js                   # Main route aggregator
│   │   └── server.js                       # Main backend entry point
│   ├── .env                                # Environment variables for backend
│   ├── keyCloak.json                       # KeyCloak client configuration
│   ├── keyCloak.conf                       # KeyCloak server configuration
│   ├── Dockerfile                          # Backend Dockerfile
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── app/
│   │   │   ├── features/
│   │   │   │   ├── components/
│   │   │   │   │   └── organization-form/organization-list/regional-office-form
│   │   │   │   │       ├── organization.component.ts    # Organization form component
│   │   │   │   │       ├── organization.component.html  # Organization form template
│   │   │   │   │       ├── regional-office.component.ts # Regional office form component
│   │   │   │   │       └── regional-office.component.html # Regional office form template
│   │   │   ├── shared/
│   │   │   │   ├── components                   # Shared Components
│   │   │   │   │   └── Inputs                   # Shared Input
│   │   │   │   |   └── Button                   # Shared Button
│   │   │   │   |   └── Dropdown                 # Shared Dropdown
│   │   │   │   ├── constants/                   # Shared constants
│   │   │   │   ├── services/                    # Shared services
│   │   │   │   │   └── api.service.ts           # API service for backend communication
│   │   │   │   └── types/                       # Shared TypeScript types
│   │   │   ├── app.component.ts                 # Main app component
│   │   │   ├── app.component.html               # Main app template
│   │   │   ├── app.component.scss               # Main app styles
│   │   │   ├── app.config.ts                    # App configuration
│   │   │   └── app.routes.ts                    # App routing
│   │   ├── environments/                        # Environment configurations
│   │   ├── index.html                           # Main HTML file
│   │   ├── main.ts                              # Main TypeScript entry point
│   │   └── styles.scss                          # Global styles
│   ├── nginx.conf                               # Nginx configuration for Angular
│   ├── Dockerfile.frontend                      # Frontend Dockerfile
│   └── package.json
├── docker-compose.yml                           # Docker Compose for backend, Keycloak, Postgres
└── README.md                                    # This file
```

---

## Setup Instructions

### Prerequisites
- **Docker** and **Docker Compose** installed on your machine.
- **Node.js** (v18) and **npm** for local development (optional).
- **Git/Extract** to clone the repository or extract the zip project.

### Steps
1. **Clone the Repository**:
   ```bash
   git clone <repository-url>
   cd talnetAIAssignment
   ```

2. **Set Up Environment Variables**:
   - Create a `.env` file in the `backend/` folder with the following content:
     ```
     # Postgres Configuration
     POSTGRES_USER=admin
     POSTGRES_PASSWORD=admin
     POSTGRES_DB=talentai
     POSTGRES_HOST=postgres
     POSTGRES_PORT=5432

     # Keycloak Configuration
     KEYCLOAK_URL=http://keycloak:8080
     KEYCLOAK_ADMIN_USERNAME=admin
     KEYCLOAK_ADMIN_PASSWORD=admin
     KEYCLOAK_CLIENT_ID=backend-client
     KEYCLOAK_CLIENT_SECRET=default-secret-key
     ```
   - Replace `default-secret-key` with the client secret from KeyCloak or this leave it as default.

3. **Deploy the Application**:
   - Please ensure you should be inside the root project & up the docker compose :
     ```bash
     docker-compose up -d
     ```
   - This will:
     - Start Keycloak, Postgres, and the backend on `http://localhost:3000`.
     - Start the frontend on `http://localhost:4200`.
     - Keycloak Admin Console will be available at `http://localhost:8080`.


4. **Access the Application**:
   - **Frontend**: `http://localhost:4200`
   - **Backend API**: `http://localhost:3000`
   - **Keycloak Admin Console**: `http://localhost:8080` (login: `admin/admin`)
   - **Postgres**: `localhost:5433` (user: `admin`, password: `admin`)

5. **Stop the Application**:
    - Terminate the compose :
      ```bash
      docker-compose down
      ```
    - Terminate existing and up the compose :
      ```bash
      docker-compose down && docker-compose up -d
      ```
    - Terminate existing and up the compose :
      ```bash
      docker-compose down && docker-compose up -d
      ```
    - Remove All Container :
      ```bash
      docker rm $(docker ps -aq)
      ```
    - Remove All Images:
      ```bash
      docker rmi $(docker images -aq)

---

## Usage Instructions

### Keycloak Setup
1. **Log in to Keycloak Admin Console**:
   - Go to `http://localhost:8080` and log in with `admin/admin`.

2. **Realm Config Required**:
   - Go to `Realm Settings` at the bottom of left navigation.
   - Enable **User-Managed Access** and **Organizations** in **Realm Settings**.


### Using the Application
1. **Register a New Organization**:
   - Open the frontend at `http://localhost:4200`.
   - Navigate to the organization form (e.g., "Create Organization").
   - Fill in the details (e.g., Name, Domain).
   - Submit the form to create a new realm in Keycloak for the organization.

2. **Create Regional Offices**:
   - After creating an organization, select it from the UI.
   - Navigate to the regional office form (e.g., "Add Regional Office").
   - Add offices (e.g., "North Region", "South Region").
   - These will be created as groups in the organization's realm.

3. **Verify in Keycloak**:
   - In the Keycloak Admin Console, check the new realm created for the organization.
   - Under **Groups**, verify the regional office groups.

---

## Design Details

### Architecture
- **Multi-Tenancy**: Each organization gets its own Keycloak realm, ensuring isolation of users, roles, and groups.
- **Keycloak Integration**: The backend uses KeyCloak's Admin REST API to manage realms and groups.
- **Frontend**: Angular provides UI for organization and regional office management.
- **Backend**: Node.js + Express handles API requests, interacting with Keycloak and Postgres.
- **Database**: Postgres stores organization metadata (e.g., name, realm ID).

### Keycloak Configuration
- **Realm Settings**:
  - Enabled **User-Managed Access (UMA)** for resource sharing.
  - Enabled **Organizations** for multi-tenant support.
  - Configured CORS to allow frontend requests (`http://localhost:4200`).
- **Groups**: Regional offices are represented as groups within each organization's realm.

### Database Schema
The Postgres database (`org_management`) has the following schema:

#### Table: `organizations`
| Column       | Type         | Description                     |
|--------------|--------------|---------------------------------|
| id           | SERIAL       | Primary key                     |
| name         | VARCHAR(255) | Organization name               |
| realm        | VARCHAR(50)  | Keycloak realm ID               |
| createdAt    | TIMESTAMP    | Creation timestamp              |
| updatedAt    | TIMESTAMP    | Updated timestamp               |

#### Table: `regional_offices`
| Column         | Type              | Description                     |
|----------------|-------------------|---------------------------------|
| id             | SERIAL(AUTO_INCR) | Primary key                     |
| organizationId | INTEGER           | Foreign key to `organizations`  |
| name           | VARCHAR(255)      | Regional office name            |
| keycloakGroupId| VARCHAR(50)       | Keycloak group ID               |
| createdAt      | TIMESTAMP         | Creation timestamp              |
| updatedAt      | TIMESTAMP         | Updated timestamp               |

---

## API Details

### Base URL
`http://localhost:3000`

### Authentication
- The backend uses Keycloak's service account to authenticate API requests.
- Currently we are using hardcoded token, so there is no need of login

### Endpoints

#### 1. Create a New Organization
- **Endpoint**: `POST /api/v1/organization`
- **Description**: Creates a new organization and a corresponding Keycloak realm.
- **Request Body**:
  ```json
  {
    "name": "OrgName",
  }
  ```
- **Response**:
  - **201 Created**:
    ```json
    {
      "id": 1,
      "name": "OrgName",
      "realm": "org-name" // This is will be automatically created, I handle this in backend
    }
    ```
  - **400 Bad Request**: If the request is invalid.
  - **500 Internal Server Error**: If Keycloak or DB operations fail.


#### 2. Get All Organizations
- **Endpoint**: `GET /api/organization`
- **Description**: Retrieves a list of all organizations.
- **Response**:
  - **200 OK**:
    ```json
    [
      {
        "id": 1,
        "name": "OrgName",
        "domain": "orgname.com",
        "realmId": "orgname-realm"
      }
    ]
    ```


#### 3. Create a Regional Office
- **Endpoint**: `POST /api/v1/regional-office`
- **Description**: Creates a regional office as a group in the organization's Keycloak realm.
- **Request Body**:
  ```json
  {
    "organizationId": 5,
    "name": "North Region"
  }
  ```
- **Response**:
  - **201 Created**:
    ```json
    {
      "message": "Regional office created successfully",
      "regionalOffice": {
        "id": 8,
        "name": "North Region",
        "organizationId": 5,
        "keycloakGroupId": "a900caa6-42c6-4f8d-9e63-cbc13400cc44"
      }
    }
    ```
  - **400 Bad Request**: If the request is invalid.
  - **404 Not Found**: If the organization is not found.
  - **500 Internal Server Error**: If Keycloak or DB operations fail.

#### 4. Get a Regional Office By Organization Id
- **Endpoint**: `GET /api/v1/regional-offices/4`
- **Description**: get regional detail, related to organization
- **Response**:
  - **200 get**:
    ```json
    {
        "id": 7,
        "name": "office",
        "organizationId": 4,
        "keycloakGroupId": "1ab3b398-0a8f-47f3-81d7-407415808827",
        "createdAt": "2025-03-27T16:29:55.789Z",
        "updatedAt": "2025-03-27T16:29:55.789Z",
        "Organization": {
            "name": "satya-testing",
            "realm": "satya-testing"
        }
    }
    ```
---

## Troubleshooting
- **Keycloak Not Starting**: Check logs (`docker logs <keycloak-container>`) and ensure the `.env` file has correct credentials.
- **Frontend Not Loading**: Verify Nginx logs (`docker logs <frontend-container>`) and ensure CORS is configured in Keycloak.
- **API Errors**: Check backend logs (`docker logs <backend-container>`) for Keycloak or DB connection issues.

---

## This is Our Future Improvements
- Add user management within organizations.
- Implement role-based access control (RBAC) for regional offices.
- Enhance security by restricting CORS origins in production.
- Add UI for managing users and roles within organizations.