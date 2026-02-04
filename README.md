# Fika Coffee

A modern, premium coffee shop website featuring a beautiful UI, reservation system, and dynamic menu.

## Features

- **Modern UI/UX**: Built with React, Tailwind CSS, and Framer Motion for smooth animations.
- **Reservation System**: Easy-to-use booking form for tables.
- **Dynamic Menu**: Categorized menu display with pricing.
- **Responsive Design**: Fully optimized for mobile, tablet, and desktop.
- **FastAPI Backend**: Robust backend handling reservations and status checks.

## Tech Stack

### Frontend
- React 18+
- Tailwind CSS
- Framer Motion
- Lucide React (Icons)
- Axios (API Calls)

### Backend
- FastAPI (Python)
- MongoDB (Database)
- Motor (Async MongoDB Driver)
- Pydantic v2

## Getting Started

### Prerequisites
- Node.js & npm/yarn/pnpm
- Python 3.10+
- MongoDB

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Arbab1308/fika-coffee-.git
   cd fika-coffee-
   ```

2. **Backend Setup**:
   ```bash
   cd backend
   pip install -r requirements.txt
   # Ensure MongoDB is running and update .env if necessary
   python server.py
   ```

3. **Frontend Setup**:
   ```bash
   cd frontend
   npm install
   npm start
   ```

## License

MIT
