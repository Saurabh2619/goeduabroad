import axios from "axios";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  // Secret Key Validation
  const secretKey = process.env.SWIFTAMS_SECRET_KEY;
  

 

  // Extracting data from the webhook
  const { firstname, lastname, phone, email, city, state, country, message, yearOfPassing, neetAppeared, intake } = req.body;

  if (!firstname || !phone || !email) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    // Sending data to SwiftAMS webhook
    const response = await axios.post(
      "https://app.swiftams.com/callback/custom-webhook/d9d64d9b-de3e-42f9-9bed-e9da68f9aa84",
      {
        firstname,
        lastname,
        phone,
        email,
        city,
        state,
        country,
        message,
        yearOfPassing,
        neetAppeared,
        intake,
      },
      {
        headers: {
          Authorization: "Bearer bgNjgfNegfdt5hAqxsYiGxekP9JWkl3x",
          "Content-Type": "application/json",
        },
      }
    );

    return res.status(200).json({ message: "Lead received successfully!", data: response.data });
  } catch (error) {
    console.error("Error sending data to SwiftAMS:", error);
    return res.status(500).json({ error: "Failed to process lead" });
  }
}
