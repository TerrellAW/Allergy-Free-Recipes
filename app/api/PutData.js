export default async function PutData({ items }) {
    try {
        const pantry_id = process.env.NEXT_PUBLIC_PANTRY_ID;
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const uniqueItems = Array.from(new Map(items.map(item => [item.id, item])).values());

        var raw = JSON.stringify({ items });

        var requestOptions = {
            method: 'PUT',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        const response = await fetch(`https://getpantry.cloud/apiv1/pantry/${pantry_id}/basket/RecipeData`, requestOptions)
        if (!response.ok) {
            throw new Error(`Network response was not ok: ${response.status} ${response.statusText}`);
        }
        const result = await response.text();
        console.log("Pantry data added successfully\n", result);
        return result;
    } catch (error) { 
        console.error("Error adding data to Pantry", error);
        return null;
    }
}