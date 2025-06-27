import os
import openai 
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
from pydantic import BaseModel

load_dotenv(dotenv_path="openAi.env")
openai.api_key = os.environ.get("OPENAI_API_KEY")
print("🔑 OpenAI key loaded:", openai.api_key)

app = FastAPI()


app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class EnhanceRequest(BaseModel):
    section: str
    content: str

@app.post("/ai-enhance")
async def enhance_section(data: EnhanceRequest):
    # Simulate improvement for now
    enhanced = f"(Enhanced ✨) {data.content}"
    return {"enhanced": enhanced}


@app.post("/save-resume")
async def save(resume: dict):
    print("Resume saved:")
    print(resume)
    return {"message": "Resume saved successfully!"}
