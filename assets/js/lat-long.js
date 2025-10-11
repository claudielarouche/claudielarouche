async function geocodeAddresses() {
    const addressInput = document.getElementById('addressInput');
    const addresses = addressInput.value.split('\n').filter(Boolean); // Splitting addresses by line and removing empty lines

    const outputDiv = document.getElementById('output');
    outputDiv.innerHTML = '';

    for (const address of addresses) {
        try {
            const response = await fetch(`https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(address)}&format=json&addressdetails=1&limit=1`);
            const data = await response.json();
            if (data.length > 0) {
                const lat = data[0].lat;
                const lon = data[0].lon;
                outputDiv.innerHTML += `<p>${lat}, ${lon}</p>`;
            } else {
                outputDiv.innerHTML += `<p>No results found for address: ${address}</p>`;
            }
        } catch (error) {
            console.error('Error geocoding address:', error);
            outputDiv.innerHTML += `<p>Error geocoding address: ${address}</p>`;
        }
    }
}