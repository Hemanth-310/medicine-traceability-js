# Medicine Traceability — Node.js Backend

![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat&logo=nodedotjs&logoColor=white)
![Express](https://img.shields.io/badge/Express-000000?style=flat&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=flat&logo=mongodb&logoColor=white)

A Node.js + Express REST API for medicine traceability across the pharmaceutical supply chain — register batches, track movement, verify authenticity, and maintain a full transfer history.

This is the Node.js backend rewrite of the [Medicine Traceability System](https://github.com/Hemanth-310/Medicine-Traceability), built during my Backend Developer Internship at Farm To Plate (January–May 2026) as part of backend module work.

---

## Supply Chain Flow

```
Manufacturer → Distributor → Pharmacy → Patient
```

Every transfer is recorded in MongoDB with a full history trail. Any stakeholder can verify a batch's authenticity and track where it has been at any point.

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Runtime | Node.js 18+ |
| Framework | Express.js |
| Database | MongoDB + Mongoose |
| HTTP Client | Axios |
| Dev Server | Nodemon |

---

## Project Structure

```
medicine-traceability-js/
├── config/
│   └── db.js                   # MongoDB connection
├── controllers/
│   └── medicineController.js   # Route handler logic
├── models/
│   └── medicineModel.js        # Mongoose schema
├── routes/
│   └── medicineRoutes.js       # API route definitions
├── services/
│   └── medicineService.js      # Business logic layer
├── middleware/
│   ├── errorHandler.js         # Global error handling
│   └── logger.js               # Request logging
├── app.js                      # Express app setup
├── server.js                   # Server entry point
└── package.json
```

---

## Setup

### Prerequisites

- Node.js 18+
- npm 9+
- MongoDB 6.0+ running locally

### 1. Clone the repository

```bash
git clone https://github.com/Hemanth-310/medicine-traceability-js.git
cd medicine-traceability-js
```

### 2. Install dependencies

```bash
npm install
```

### 3. Create a `.env` file

```env
PORT=3000
MONGO_URI=mongodb://127.0.0.1:27017/medicine_traceability
```

### 4. Start the server

```bash
npm run dev
```

Server runs at `http://localhost:3000`

---

## API Endpoints

### Register a medicine batch

```bash
curl -X POST http://localhost:3000/api/medicine/register \
  -H "Content-Type: application/json" \
  -d '{
    "medicine_name": "Amoxicillin 250mg",
    "manufacturer": "Cipla",
    "batch_number": "AMOX2026B01",
    "manufacturing_date": "2026-03-01",
    "expiry_date": "2028-03-01",
    "composition": "Amoxicillin 250mg",
    "dosage_form": "Capsule",
    "quantity": 500,
    "location": "Chennai"
  }'
```

Response:
```json
{
  "message": "Medicine registered successfully",
  "batch_number": "AMOX2026B01"
}
```

### Transfer a batch

```bash
curl -X POST http://localhost:3000/api/medicine/transfer \
  -H "Content-Type: application/json" \
  -d '{
    "batch_number": "AMOX2026B01",
    "from": "Manufacturer",
    "to": "Distributor",
    "quantity": 500
  }'
```

Response:
```json
{
  "message": "Transfer recorded",
  "batch_number": "AMOX2026B01",
  "from": "Manufacturer",
  "to": "Distributor"
}
```

### Verify a batch

```bash
curl -X GET http://localhost:3000/api/medicine/verify/AMOX2026B01
```

Response:
```json
{
  "batch_number": "AMOX2026B01",
  "medicine_name": "Amoxicillin 250mg",
  "manufacturer": "Cipla",
  "status": "verified",
  "current_holder": "Distributor"
}
```

### Track full supply chain history

```bash
curl -X GET http://localhost:3000/api/medicine/track/AMOX2026B01
```

Response:
```json
{
  "batch_number": "AMOX2026B01",
  "history": [
    { "from": "Manufacturer", "to": "Distributor", "quantity": 500, "timestamp": "2026-04-01T10:00:00Z" },
    { "from": "Distributor", "to": "Pharmacy", "quantity": 200, "timestamp": "2026-04-03T14:30:00Z" }
  ]
}
```

### Record pharmacy stock entry

```bash
curl -X POST http://localhost:3000/api/medicine/pharmacy \
  -H "Content-Type: application/json" \
  -d '{
    "batch_number": "AMOX2026B01",
    "pharmacy_name": "Apollo Pharmacy",
    "location": "Chennai",
    "quantity": 200
  }'
```

---

## Full API Reference

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/medicine/register` | Register a new medicine batch |
| POST | `/api/medicine/transfer` | Record a transfer between stakeholders |
| GET | `/api/medicine/verify/:batch_number` | Verify batch authenticity |
| GET | `/api/medicine/track/:batch_number` | Get full supply chain history |
| POST | `/api/medicine/pharmacy` | Record pharmacy stock entry |

---

## Related Repos

This is the Node.js backend rewrite. See the full system:

- [`Medicine-Traceability`](https://github.com/Hemanth-310/Medicine-Traceability) — original full-stack version with Solidity smart contracts + Flask backend
- [`Medicine-traceability-middleware`](https://github.com/Hemanth-310/Medicine-traceability-middleware) — Flask middleware pattern extracted as a standalone demo

---

## Author

**Hemanth E B**  
Backend Developer Intern, Farm To Plate (Jan–May 2026)  
[LinkedIn](https://www.linkedin.com/in/hemanth10) · [GitHub](https://github.com/Hemanth-310)
