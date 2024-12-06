export default async function GetData() {
    try {
        const pantry_id = process.env.NEXT_PUBLIC_PANTRY_ID;
        const response = await fetch(`https://getpantry.cloud/apiv1/pantry/${pantry_id}/basket/RecipeData`);
        
        if (!response.ok) {
            throw new Error(`Network response was not ok: ${response.status} ${response.statusText}`);
        }
        
        const pantrydata = await response.json();
        console.log("Pantry data fetched successfully\n", pantrydata);
        return pantrydata;
    } catch (error) {
        console.error("Error fetching data from Pantry", error);
        return null;
    }
}