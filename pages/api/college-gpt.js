import { NextResponse } from "next/server";
import { OpenAI } from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,  
});

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const body = req.body;
    const { degree, preferredCountry, fieldOfStudy, ...otherDetails } = body;

    let prompt = `I need college recommendations for a student with the following profile:
- Degree Level: ${degree}
- Preferred Country: ${preferredCountry}
- Field of Study: ${fieldOfStudy}
`;

    if (degree === "bachelors") {
      prompt += `- School: ${otherDetails.school || "Not specified"}
- Board Score: ${otherDetails.boardScore || "Not specified"}
`;
    } else if (degree === "masters") {
      prompt += `- Bachelor's College: ${otherDetails.bachelorCollege || "Not specified"}
- Major Course: ${otherDetails.majorCourse || "Not specified"}
- CGPA: ${otherDetails.cgpa || "Not specified"}
- Backlogs: ${otherDetails.backlogs || "Not specified"}
- Aptitude Test: ${otherDetails.aptitudeTest || "Not specified"}
`;
    } else if (degree === "phd") {
      prompt += `- Master's College: ${otherDetails.mastersCollege || "Not specified"}
- Major Course: ${otherDetails.majorCourse || "Not specified"}
- Score: ${otherDetails.phdScore || "Not specified"}
- Backlogs: ${otherDetails.phdBacklogs || "Not specified"}
- Aptitude Test: ${otherDetails.aptitudeTest || "Not specified"}
`;
    }

    if (otherDetails.englishTest && otherDetails.englishTest !== "None") {
      prompt += `- English Test: ${otherDetails.englishTest}
- English Test Score: ${otherDetails.englishTestScore || "Not specified"}
`;
    }

    // ✅ Here is your upgraded prompt
    prompt += `

Please suggest exactly 9 colleges divided as follows:
- 3 Ambitious colleges (challenging but achievable)
- 3 Moderate colleges (good match based on profile)
- 3 Safe colleges (high chances of admission)

While suggesting colleges, prefer institutions where the student's Aptitude Test score and English Test score are higher than the general entry requirements.

For each college, provide:
- College Name
- 2-3 line description explaining why it's a good fit based on the profile (mention aptitude and English scores if relevant)
- Category: "Ambitious" | "Moderate" | "Safe"

Return the result strictly as a JSON array of objects with:
- name: College Name
- description: Short description
- category: "Ambitious" | "Moderate" | "Safe"
`;

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
      max_tokens: 2000,
    });

    const reply = completion.choices[0].message.content;

    let result;
    try {
      result = JSON.parse(reply);
    } catch (e) {
      result = reply;
    }

    return res.status(200).json({ result });

  } catch (error) {
    console.error("Error generating college recommendations:", error);
    return res.status(500).json({ error: "Failed to generate college recommendations" });
  }
}
