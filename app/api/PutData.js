export default async function PutData({ items }) {
    try {
        const pantry_id = process.env.NEXT_PUBLIC_PANTRY_ID;
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({ items });

        var requestOptions = {
            method: 'PUT',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch(`https://getpantry.cloud/apiv1/pantry/${pantry_id}/basket/RecipeData`, requestOptions)
            .then(response => response.text())
            .then(result => console.log(result))
            .catch(error => console.log('error', error));
    } catch (error) { 
        console.error("Error adding data to Pantry", error);
        return null;
    }
}