import fetch from "node-fetch";

export async function handler() {
    try {
        const response = await fetch("https://spinitron.com/api/spins?count=1&station=kuaa");
        const data = await response.json();

        return {
            statusCode: 200,
            body: JSON.stringify(data[0]?.track || {}),
            headers: { "Access-Control-Allow-Origin": "*" }
        };
    } catch (error) {
        return { statusCode: 500, body: JSON.stringify({ error: error.message }) };
    }
}
