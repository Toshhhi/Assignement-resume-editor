# Resume Editor – Assignment

This is a web-based **Resume Editor** that allows users to upload and edit their resumes, enhance sections using a mock (or real) AI backend, and save/download the final version.

## Features

### Frontend (React + Tailwind CSS)
- Upload `.pdf` or `.docx` files (mock parsing with dummy data)
- Edit resume fields: `Name`, `Email`, `Summary`, `Skills`, `Experience`, and `Education`
- Add or remove multiple entries in Experience and Education
- Enhance the Summary section using AI (OpenAI API or mock)
- Save the entire resume to backend
- Download the resume as a `.json` file

### Backend (FastAPI)
- `/upload-resume`: Accepts file upload (mock or optional parser)
- `/ai-enhance`: Mocks or uses OpenAI to enhance resume sections
- `/save-resume`: Saves resume data to memory or disk


## Setup Instructions
###  Frontend Setup (React)

```bash
cd frontend
npm install
npm run dev
```


### Backend Setup

```bash
cd backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
uvicorn main:app --reload
```

### Optional AI 
OPENAI_API_KEY=your-api-key-here 
return {"enhanced": "(Enhanced) " + content}

Thank you for considering my submission for the internship opportunity.  
I thoroughly enjoyed building this project and exploring both frontend and backend integration.  
Looking forward to your feedback!

– Toshika
