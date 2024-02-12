const axios = require('axios');

// Geocodes the address
const geocodeAddress = async (address) => {
    try {
        const apiKey = process.env.GOOGLE_API_KEY;
        const apiUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${apiKey}`;
        const response = await axios.get(apiUrl);
        const { data } = response;
        return data;
    } catch(error) {
        console.error()
    }
};

module.exports = { geocodeAddress };