export async function generateContent(promptText) {
    const apiKey = process.env.GEMINI_API_KEY;
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

    // Make sure promptText is just a string, not a complex object
    const promptString = typeof promptText === 'string' ? promptText : JSON.stringify(promptText);

    const requestBody = {
        contents: [
            {
                parts: [
                    { text: promptString }
                ]
            }
        ]
    };

    try {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(requestBody) // This line is failing with circular reference
        });

        if (!response.ok) {
            throw new Error(`API responded with status: ${response.status}`);
        }

        const data = await response.json();
        // console.log("Response from Gemini:", data.message.candidates.content.parts.text);
        return data;
    } catch (error) {
        console.error("Error calling Gemini API:", error);
        throw error;
    }
}