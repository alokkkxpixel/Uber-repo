const axios = require("axios");
const { route } = require("../routes/maps.route");

module.exports.getAddressCoordinate = async (address) => {
  const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
    address
  )}&format=json&limit=1`;

  try {
    const response = await axios.get(url, {
      headers: {
        "User-Agent": "UberClone/1.0 (your-email@gmail.com)", // Replace with YOUR email
      },
    });

    if (response.data && response.data.length > 0) {
      return {
        lat: parseFloat(response.data[0].lat),
        lng: parseFloat(response.data[0].lon),
      };
    } else {
      throw new Error(`Unable to geocode address: ${address}`);
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};

module.exports.getDistanceAndTime = async (origin, destination, modes) => {
  if (!origin || !destination) {
    throw new Error("Origin and Destination are Required");
  }
  const originCoords = await this.getAddressCoordinate(origin);

  const destinationCoords = await this.getAddressCoordinate(destination);

  const originStr = `${originCoords.lat},${originCoords.lng}`;
  const destinationStr = `${destinationCoords.lat},${destinationCoords.lng}`;

  const apiKey = process.env.RADAR_MAPS_API_KEY;
  const url = `https://api.radar.io/v1/route/distance?origin=${encodeURIComponent(
    originStr
  )}&destination=${encodeURIComponent(
    destinationStr
  )}&modes=${encodeURIComponent(modes)}&units=metric`;

  //  {
  //   https://api.radar.io/v1/route/distance?origin=40.78382%2C-73.97536&destination=40.70390%2C-73.98670&modes=car&units=imperial" \
  //  -H "Authorization: prj_test_pk_74520247973584def928f06f7b2d0d4acc7a739e
  //  }

  try {
    const response = await axios.get(url, {
      headers: { Authorization: apiKey },
    });
    const modeData = response.data.routes[modes];
    if (!modeData) {
      throw new Error(`No route data found for mode: ${modes}`);
    }

    return {
      distance: modeData.distance.text,
      distanceValue: modeData.distance.value,
      duration: modeData.duration ? modeData.duration.text : undefined,
      durationValue: modeData.duration ? modeData.duration.value : undefined,
      routes: response.data.routes,
    };
  } catch (err) {
    console.error("Radar API error:", err.response?.data || err.message);
    throw new Error("Error fetching data from Radar API");
  }
};