import { NextResponse } from "next/server";
import { OpenAI } from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const body = req.body;
    const { degree, preferredCountry, fieldOfStudy, ...otherDetails } = body;

    // Build dynamic prompt
    let prompt = `You are an expert university admission counselor.

Shortlist universities for a student with the following profile:
- Degree Level: ${degree}
- Preferred Country: ${preferredCountry}
- Field of Study: ${fieldOfStudy}
`;

    if (degree === "bachelors") {
      prompt += `- Last Qualification: 12th Grade
- School: ${otherDetails.school || "Not specified"}
- Board Score (%): ${otherDetails.boardScore || "Not specified"}
`;
    } else if (degree === "masters") {
      prompt += `- Last Qualification: Bachelor's
- Bachelor's College: ${otherDetails.bachelorCollege || "Not specified"}
- Major Course: ${otherDetails.majorCourse || "Not specified"}
- CGPA: ${otherDetails.cgpa || "Not specified"}
- Backlogs: ${otherDetails.backlogs || "Not specified"}
`;
    } else if (degree === "phd") {
      prompt += `- Last Qualification: Master's
- Master's College: ${otherDetails.mastersCollege || "Not specified"}
- Major Course: ${otherDetails.majorCourse || "Not specified"}
- PhD Score (GPA/percentage): ${otherDetails.phdScore || "Not specified"}
- Backlogs: ${otherDetails.phdBacklogs || "Not specified"}
`;
    }

    prompt += `- Aptitude Test: ${otherDetails.aptitudeTest || "Not specified"}
- Aptitude Test Score: ${otherDetails.aptitudeTestScore || "Not specified"}
- English Test: ${otherDetails.englishTest || "Not specified"}
- English Test Score: ${otherDetails.englishTestScore || "Not specified"}

**Important Instructions:**
- Prioritize the student's latest GPA/percentage and test scores when recommending universities.
- Classify each university carefully based on the student's real chances:
  - **Ambitious**: Student has a low to medium chance but might succeed.
  - **Moderate**: Student matches the university’s average admission profile.
  - **Safe**: Student exceeds the university's usual admission requirements.
- Always provide a list of exactly **9 universities** divided into:
  - 3 Ambitious
  - 3 Moderate
  - 3 Safe

For each university, provide:
- "name": College Name
- "description": A short 2-3 line explanation mentioning relevant scores if needed
- "category": "Ambitious" | "Moderate" | "Safe"

**Output Format:**
Return a valid **JSON array** with 9 objects. No text or explanation outside the JSON array.
Start the output directly with '[' and end with ']'. Example:

[
  {
    "name": "Example University",
    "description": "Good fit based on your 90% score in 12th grade and strong IELTS score.",
    "category": "Moderate"
  },
  ...
]
`;

    const completion = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.5,
      max_tokens: 2000,
    });

    let reply = completion.choices[0].message.content;

    console.log("GPT raw response:", reply);

    // Remove ``` if present
    if (reply.startsWith("```")) {
      reply = reply.replace(/```(?:json)?/g, "").trim();
      reply = reply.replace(/```/g, "").trim();
    }

    // Parse JSON
    let result;
    try {
      result = JSON.parse(reply);
    } catch (error) {
      console.error("JSON parsing error:", error);
      result = { error: "Could not parse GPT response as JSON." };
    }

    return res.status(200).json({ result });
  } catch (error) {
    console.error("Error generating college recommendations:", error);
    return res.status(500).json({ error: "Failed to generate college recommendations" });
  }
}
