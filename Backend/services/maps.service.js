const axios = require("axios");

module.exports.getAddressCoordinate = async (address) => {
  const apiKey = process.env.RADAR_MAPS_API_KEY; // Replace with your Radar API key
  const url = `https://api.radar.io/v1/geocode/forward?query=${encodeURIComponent(
    address
  )}`;

  try {
    const response = await axios.get(url, {
      headers: { Authorization: apiKey },
    });

    // Radar API typically returns addresses array, check status for 'OK'
    if (response.data.addresses && response.data.addresses.length > 0) {
      const location = response.data.addresses[0].geometry.coordinates;
      return {
        lat: location[1], // Radar returns [longitude, latitude]
        lng: location[0],
      };
    } else {
      throw new Error("Unable to fetch coordinates");
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};
