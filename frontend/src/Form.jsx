import React, { useState } from "react";
import { useRef } from "react";


const FIELD_ALIASES = {
    name: ["name", "full name"],
    email: ["email", "e-mail", "mail"],
    summary: ["summary", "objective", "about"],
    skills: ["skills", "technologies", "tech stack", "tools"],
    experience: ["experience", "work", "employment", "job history", "professional"],
    education: ["education", "academic", "studies", "school", "college"]
  };


export default function ResumeForm() {
  const [resume, setResume] = useState({
    name: "",
    email: "",
    summary: "",
    skills: "",
    experience: [
      { job: "", company: "", duration: "", description: "" }
    ],
    education: [
      { degree: "", institution: "", year: "" }
    ]
  });

  

  const fileInputRef = useRef();
  const handleUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    console.log("Selected file:", file);
  };

  const handleChange = (field, value) => {
    setResume({ ...resume, [field]: value });
  };

  const handleSectionChange = (section, index, field, value) => {
    const updated = [...resume[section]];
    updated[index][field] = value;
    setResume({ ...resume, [section]: updated });
  };

  const addExperience = () => {
    setResume({
      ...resume,
      experience: [...resume.experience, { job: "", company: "", duration: "", description: "" }]
    });
  };

  const addEducation = () => {
    setResume({
      ...resume,
      education: [...resume.education, { degree: "", institution: "", year: "" }]
    });
  };

  const handleUploadedFile = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setResume({
      name: "John Doe",
      email: "john@example.com",
      summary: "A passionate developer with a focus on frontend technologies.",
      skills: "React, JavaScript, HTML, CSS",
      experience: [
        {
          job: "Frontend Intern",
          company: "TechCorp",
          duration: "Jan 2023 - Dec 2023",
          description: "Worked on responsive UI using React and Tailwind CSS."
        }
      ],
      education: [
        {
          degree: "B.Tech in Computer Science",
          institution: "BVCOE, IP University",
          year: "2024"
        }
      ]
    });
  };

  const enhanceSummary = async () => {
    try {
      const response = await fetch("http://localhost:8000/ai-enhance", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          section: "summary",
          content: resume.summary
        })
      });
  
      const data = await response.json();
  
      if (data.enhanced) {
        // ✅ Update summary state
        setResume((prevResume) => ({
          ...prevResume,
          summary: data.enhanced
        }));
        console.log("Updated summary:", data.enhanced);
      } else {
        console.warn("No 'enhanced' field in response:", data);
      }
    } catch (error) {
      console.error("Enhance request failed:", error);
    }
  };
  
  
  

  const saveResume = async () => {
    try {
      const response = await fetch("http://localhost:8000/save-resume", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(resume)
      });
  
      const data = await response.json();
      alert(data.message);  // or toast it later
    } catch (err) {
      console.error("Failed to save resume", err);
    }
  };

  const downloadResume = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(resume, null, 2));
    const link = document.createElement("a");
    link.href = dataStr;
    link.download = "resume.json";
    link.click();
  };
  
  



  return (
    <div className="bg-gradient-to-r from-purple-500 to-purple-900 pt-6 pb-6">
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-xl shadow-lg space-y-6">
      <h1 className="text-4xl font-bold text-center text-blue-700">My Resume Editor</h1>

      <button
        className="bg-green-600 hover:bg-green-700  w-60 h-20 text-white font-semibold px-4 py-2 rounded"
        onClick={() => fileInputRef.current.click()}
        >
        Upload Resume
        </button>

        <input
        type="file"
        accept=".pdf,.docx"
        onChange={handleUploadedFile}
        ref={fileInputRef}
        className="hidden"
        />


     
      <div className="space-y-4">
        <div>
          <label className=" font-10 font-semibold">Name:</label>
          <input
            type="text"
            value={resume.name}
            onChange={(e) => handleChange("name", e.target.value)}
            className="w-full border p-2 rounded mt-1"
            placeholder="John Doe"
          />
        </div>
        <div>
          <label className="font-semibold">Email:</label>
          <input
            type="email"
            value={resume.email}
            onChange={(e) => handleChange("email", e.target.value)}
            className="w-full border p-2 rounded mt-1"
            placeholder="john@email.com"
          />
        </div>
        <div>
          <label className="font-semibold">Summary:</label>
          <textarea
            value={resume.summary}
            onChange={(e) => setResume({ ...resume, summary: e.target.value })}
            className="w-full border p-2 rounded mt-1"
            rows={3}
            />
        </div>
      </div>

      
      <div>
        <h2 className=" font-semibold mb-2">Experience:</h2>
        {resume.experience.map((exp, idx) => (
          <div key={idx} className="space-y-2 border p-4 mb-4 rounded-md">
            <input
              type="text"
              placeholder="Job Title"
              value={exp.job}
              onChange={(e) => handleSectionChange("experience", idx, "job", e.target.value)}
              className="w-full border p-2 rounded"
            />
            <input
              type="text"
              placeholder="Company"
              value={exp.company}
              onChange={(e) => handleSectionChange("experience", idx, "company", e.target.value)}
              className="w-full border p-2 rounded"
            />
            <input
              type="text"
              placeholder="Duration"
              value={exp.duration}
              onChange={(e) => handleSectionChange("experience", idx, "duration", e.target.value)}
              className="w-full border p-2 rounded"
            />
            <textarea
              placeholder="Description"
              value={exp.description}
              onChange={(e) => handleSectionChange("experience", idx, "description", e.target.value)}
              className="w-full border p-2 rounded"
              rows={2}
            />
          </div>
        ))}
        <button
          onClick={addExperience}
          className="text-blue-600 font-medium underline"
        >
          + Add Another Experience
        </button>
      </div>

      {/* Education */}
      <div>
        <h2 className="font-semibold mb-2">Education:</h2>
        {resume.education.map((edu, idx) => (
          <div key={idx} className="space-y-2 border p-4 mb-4 rounded-md">
            <input
              type="text"
              placeholder="Degree"
              value={edu.degree}
              onChange={(e) => handleSectionChange("education", idx, "degree", e.target.value)}
              className="w-full border p-2 rounded"
            />
            <input
              type="text"
              placeholder="Institution"
              value={edu.institution}
              onChange={(e) => handleSectionChange("education", idx, "institution", e.target.value)}
              className="w-full border p-2 rounded"
            />
            <input
              type="text"
              placeholder="Year"
              value={edu.year}
              onChange={(e) => handleSectionChange("education", idx, "year", e.target.value)}
              className="w-full border p-2 rounded"
            />
          </div>
        ))}
        <button
          onClick={addEducation}
          className="text-blue-600 font-medium underline"
        >
          + Add Another Education
        </button>
      </div>

      {/* Skills */}
      <div>
        <label className="font-semibold">Skills (comma-separated):</label>
        <input
          type="text"
          value={resume.skills}
          onChange={(e) => handleChange("skills", e.target.value)}
          className="w-full border p-2 rounded mt-1"
          placeholder="React, Python, SQL"
        />
      </div>

      {/* Action Buttons */}
      <div className="flex justify-center gap-4 mt-6">
        <button onClick={enhanceSummary} className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold px-4 py-2 rounded">
          Enhance with AI
        </button>
        <button onClick={saveResume} className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded">
          Save
        </button>
        <button onClick={downloadResume} className="bg-green-600 hover:bg-green-700 text-white font-semibold px-4 py-2 rounded">
          Download Resume
        </button>
      </div>
    </div>
    </div>
  );
}
