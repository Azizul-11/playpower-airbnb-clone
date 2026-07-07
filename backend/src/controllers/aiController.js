import { groq } from '../config/groq.js';

export const generateListingHighlight = async (req, res) => {
  const { title, description, amenities } = req.body;

  if (!title) {
    return res.status(400).json({ error: "Listing title is required." });
  }

  try {
    const response = await groq.chat.completions.create({
      messages: [
        {
          role: "system",
          content: "You are an expert hospitality copywriter. Generate a concise, catchy 2-sentence 'Host Highlight' summarizing why this property is special based on its details. Keep it sophisticated and authentic.",
        },
        {
          role: "user",
          content: `Title: ${title}\nDescription: ${description}\nAmenities: ${amenities?.join(', ')}`,
        },
      ],
      model: "llama-3.1-8b-instant", // Fast and efficient model perfect for rapid UI loads
      temperature: 0.7,
      max_tokens: 100,
    });

    const highlight = response.choices[0]?.message?.content?.trim();
    return res.status(200).json({ highlight });
  } catch (error) {
    console.error("Groq AI Error:", error);
    return res.status(500).json({ error: "Failed to generate AI listing highlight." });
  }
};