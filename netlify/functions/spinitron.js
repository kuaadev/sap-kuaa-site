export async function handler() {
    try {
        const API_KEY = process.env.SPINITRON_API_KEY;
        const response = await fetch(
            "https://spinitron.com/api/spins?count=1&station=kuaa",
            {
                headers: {
                    "Authorization": `Bearer ${API_KEY}`,
                    "Accept": "application/json",
                },
            }
        );

        const data = await response.json();

        return {
            statusCode: 200,
            body: JSON.stringify(data[0]?.track || {}),
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "GET",
                "Access-Control-Allow-Headers": "Content-Type",
            },
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: error.message }),
        };
    }
}
