import OpenAI from "openai";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export default async function handler(req, res) {
  const { drinkName, age } = req.body;
  if (!drinkName) return res.status(400).json({ error: "No drinkName provided" });

  const alcoholMsg = age >= 19 ? "Include alcohol if appropriate." : "Do NOT include alcohol.";

  const prompt = `
Generate a drink recipe called "${drinkName}".
${alcoholMsg}
Include a list of ingredients and step-by-step instructions.
`;

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
      max_tokens: 400
    });

    const recipeText = completion.choices[0].message.content;

    // Simple parsing: ingredients & steps separated
    const ingredients = recipeText.split("Ingredients:")[1]?.split("Steps:")[0]?.trim().split("\n") || [recipeText];
    const steps = recipeText.split("Steps:")[1]?.trim().split("\n") || [recipeText];

    res.status(200).json({ name: drinkName, ingredients, steps });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to generate recipe" });
  }
}
