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
    let prompt = `I need college recommendations for a student with the following profile:
- Degree Level: ${degree}
- Preferred Country: ${preferredCountry}
- Field of Study: ${fieldOfStudy}
`;

    if (degree === "bachelors") {
      prompt += `- Last Qualification: 12th Grade
- School: ${otherDetails.school || "Not specified"}
- Board Score: ${otherDetails.boardScore || "Not specified"}
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
- PhD Score: ${otherDetails.phdScore || "Not specified"}
- Backlogs: ${otherDetails.phdBacklogs || "Not specified"}
`;
    }

    prompt += `- Aptitude Test: ${otherDetails.aptitudeTest || "Not specified"}
- Aptitude Test Score: ${otherDetails.aptitudeTestScore || "Not specified"}
- English Test: ${otherDetails.englishTest || "Not specified"}
- English Test Score: ${otherDetails.englishTestScore || "Not specified"}
`;

    prompt += `
Note: Prioritize colleges where the student's GPA/percentage and test scores give them a realistic chance of admission. However, always return a list of 9 colleges — even if exact matches are not available, suggest the closest possible options based on the profile. Do not leave the list empty.

Please suggest exactly 9 colleges divided as follows:
- 3 Ambitious colleges (challenging but achievable)
- 3 Moderate colleges (good match based on profile)
- 3 Safe colleges (high chances of admission)

For each college, provide:
- College Name
- 2-3 line description explaining why it's a good fit based on the profile (mention aptitude and English scores if relevant)
- Category: "Ambitious" | "Moderate" | "Safe"

Return the result strictly as a valid JSON array of objects with:
- "name": College Name
- "description": A brief description of why it's a good fit
- "category": "Ambitious" | "Moderate" | "Safe"
`;

    // OpenAI API call
    const completion = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.5,
      max_tokens: 2000,
    });

    const reply = completion.choices[0].message.content;

    // Debug logging (optional in dev)
    console.log("GPT raw response:", reply);

    // Try to extract JSON array from response
    let result;
    const jsonMatch = reply.match(/\[\s*{[\s\S]*?}\s*\]/);
    if (jsonMatch) {
      result = JSON.parse(jsonMatch[0]);
    } else {
      result = { error: "Could not extract valid JSON from the response." };
    }

    return res.status(200).json({ result });
  } catch (error) {
    console.error("Error generating college recommendations:", error);
    return res
      .status(500)
      .json({ error: "Failed to generate college recommendations" });
  }
}
