#  Medicine Traceability Backend

Backend API for medicine traceability across the pharmaceutical supply chain  
(Manufacturer → Distributor → Pharmacy → Patient).

Built using **Node.js, Express, and MongoDB**.

---

#  Features

- Register medicines with complete metadata
- Track medicine movement across supply chain
- Verify authenticity of medicines
- Maintain transfer history
- Record pharmacy stock
- REST API architecture

---

#  Tech Stack

- Node.js
- Express.js
- MongoDB
- Mongoose
- Axios
- Nodemon

---

#  Project Structure

```
medicine-traceability-js
│
├── config
│   └── db.js                
│
├── controllers
│   └── medicineController.js
│
├── models
│   └── medicineModel.js     
│
├── routes
│   └── medicineRoutes.js    
│
├── services
│   └── medicineService.js 
│
├── middleware
│   └── errorHandler.js
│   └── logger.js
│
├── app.js                   # Express app
├── server.js                # Server entry point
├── package.json
```

---

#  Installation

Clone repository

```
git clone https://github.com/Hemanth-310/medicine-traceability-js.git
```

Go to project folder

```
cd medicine-traceability-js
```

Install dependencies

```
npm install
```

Create `.env`

```
PORT=3000
MONGO_URI=mongodb://127.0.0.1:27017/medicine_traceability
```

Start server

```
npm run dev
```

Server runs at

```
http://localhost:3000
```

---

#  API Endpoints

## 1 Register Medicine

POST

```
/api/medicine/register
```

Body

```json
{
  "medicine_name": "Amoxicillin 250mg",
  "manufacturer": "Cipla",
  "batch_number": "AMOX2026B01",
  "manufacturing_date": "2026-03-01",
  "expiry_date": "2028-03-01",
  "composition": "Amoxicillin 250mg",
  "dosage_form": "Capsule",
  "quantity": 500,
  "location": "Chennai"
}
```

---

## 2 Transfer Medicine

POST

```
/api/medicine/transfer
```

Body

```json
{
  "batch_number": "AMOX2026B01",
  "from": "Manufacturer",
  "to": "Distributor",
  "quantity": 500
}
```

---

## 3 Verify Medicine

GET

```
/api/medicine/verify/:batch_number
```

Example

```
/api/medicine/verify/AMOX2026B01
```

---

## 4 Track Medicine History

GET

```
/api/medicine/track/:batch_number
```

Returns full supply chain history.

---

## 5 Pharmacy Stock Entry

POST

```
/api/medicine/pharmacy
```

Body

```json
{
  "batch_number": "AMOX2026B01",
  "pharmacy_name": "Apollo Pharmacy",
  "location": "Chennai",
  "quantity": 200
}
```

---

#  Supply Chain Flow

```
Manufacturer
     ↓
Distributor
     ↓
Pharmacy
     ↓
Patient
```

Every transfer is recorded in MongoDB.

---


# 👨‍💻 Author

**Hemanth E B**

Backend Developer Intern
