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

    prompt += `
Please suggest at least 8 colleges divided into these categories:
1. Ambitious - hard to get but possible
2. Moderate - good match
3. Safe - easy to get

For each college, give:
- College Name
- 2-3 line description explaining why it's a good fit
- Category (Ambitious, Moderate, Safe)

Return the result as a JSON array with objects containing:
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
