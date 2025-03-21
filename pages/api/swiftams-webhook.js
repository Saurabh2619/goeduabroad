export default async function handler(req, res) {
    if (req.method !== "POST") {
      return res.status(405).json({ error: "Method Not Allowed" });
    }
  
    // Secret Key Validation
    const secretKey = process.env.SWIFTAMS_SECRET_KEY;
    const receivedKey = req.headers.authorization?.split("Bearer ")[1];
  
    if (!receivedKey || receivedKey !== secretKey) {
      return res.status(401).json({ error: "Unauthorized: Invalid Secret Key" });
    }
  
    // Extracting data from the webhook
    const { firstname, lastname, phone, email, city, state, country, message } = req.body;
  
    if (!firstname || !phone || !email) {
      return res.status(400).json({ error: "Missing required fields" });
    }
  
    const leadData = {
      name: `${firstname} ${lastname}`,
      phone,
      email,
      city,
      state,
      country,
      message,
    };
  
    console.log("New Lead Received:", leadData);
  
    return res.status(200).json({ message: "Lead received successfully!" });
  }
  