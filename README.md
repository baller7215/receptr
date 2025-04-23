# Receptr

Receptr is a mobile application designed to help users track expenses by scanning and categorizing receipts. The app utilizes **OCR (Optical Character Recognition)** to extract text from receipts and provides an intuitive interface for managing expenses.

## Features

- **React Native App** – Built with React Native for a smooth mobile experience.
- **Receipt Scanning (OCR) - In Progress** – Uses Tesseract OCR and OpenCV to extract data from scanned receipts.
- **Expense Categorization - In Progress** – Allows users to tag and sort expenses for easy tracking.
- **Authentication - In Progress** – Secure user authentication with JWT and bcrypt.
- **Backend API** – Built with Django and PostgreSQL for handling data storage and user accounts.
- **Dockerized Backend** – The backend runs in a Docker container for easy setup and deployment.

## Tech Stack

- **Frontend:** React Native, Redux, TanStack Query
- **Backend:** Django REST Framework, PostgreSQL
- **OCR Processing:** Tesseract OCR, OpenCV
- **Authentication:** JWT, bcrypt
- **Deployment & Dev Tools:** Docker, AWS S3 (for receipt storage)

## Installation

### Prerequisites

- Node.js and npm
- Python 3
- Docker & Docker Compose
- Expo CLI (`npx expo`)

### Running the Project

1. Clone the repository:

   ```bash
   git clone https://github.com/baller7215/receptr.git
   cd receptr

2. Start the frontend (React Native app):

   ```bash
   cd frontend
   npx expo start

3. Start the backend (Django API using Docker):

   ```bash
   cd backend
   docker-compose up --build
   
## 🚧 Current Status 🚧
This project is **still a work in progress** due to other commitments.

### Features in Progress
- **OCR Receipt Scanner:** Implementing image processing and text extraction
- **User Authentication** - Secure login and account management
