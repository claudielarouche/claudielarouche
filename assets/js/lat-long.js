async function geocodeAddresses() {
    const addressInput = document.getElementById('addressInput');
    const addresses = addressInput.value.split('\n').filter(Boolean); // Splitting addresses by line and removing empty lines

    const outputDiv = document.getElementById('output');
    outputDiv.innerHTML = '';

    for (let i = 0; i < addresses.length; i++) {
        const address = addresses[i];
        // Nominatim requires max 1 request per second
        if (i > 0) await new Promise(resolve => setTimeout(resolve, 1000));
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