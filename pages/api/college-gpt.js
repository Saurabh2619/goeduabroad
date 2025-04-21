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
- Focus mainly on the student's latest CGPA or board percentage for university selection.
- Classify universities carefully into three categories:
  - **Ambitious**: Universities whose entry requirement is slightly higher (around +0.5 to +1.0 CGPA higher, or +5% marks higher) than the student's CGPA/percentage. 
    - These universities should be reachable if the student puts extra effort (good SOP, LOR, resume, etc.).
    - Do NOT suggest extremely high-ranking universities that are unrealistic based on the profile.
  - **Moderate**: Universities that closely match the student's current CGPA or board percentage.
  - **Safe**: Universities that are slightly lower than the student's CGPA or board percentage and offer a high chance of admission.

- Always prefer CGPA if available; otherwise, consider Board Score.
- Keep university suggestions relevant to the student's selected country and course.

**Output Format:**
Return a valid **JSON array** with exactly 9 universities divided equally:
- 3 "Ambitious"
- 3 "Moderate"
- 3 "Safe"

Each university must have:
- "name": (university name)
- "description": (why it's suitable for the student)
- "category": ("Ambitious", "Moderate", or "Safe")

Start your output directly with '[' and end with ']'.
Example format:
[
  {
    "name": "University A",
    "description": "Good match based on your CGPA and program fit.",
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

    // Clean GPT reply if it has ```json
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
