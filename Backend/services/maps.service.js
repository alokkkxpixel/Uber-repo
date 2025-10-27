const axios = require("axios");
const captainModel = require("../model/captain.model");
// const { route } = require("../routes/maps.route");

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

module.exports.getDistanceAndTime = async (
  origin,
  destination,
  vehicleType = "car"
) => {
  if (!origin || !destination) {
    throw new Error("Origin and Destination are Required");
  }

  try {
    // Step 1: Geocode addresses to coordinates
    const originCoords = await this.getAddressCoordinate(origin);
    const destinationCoords = await this.getAddressCoordinate(destination);

    console.log("Origin coords:", originCoords);
    console.log("Destination coords:", destinationCoords);

    // Step 2: Map vehicle types to Geoapify modes
    const modeMap = {
      car: "drive",
      auto: "drive",
      moto: "motorcycle",
      bike: "bicycle",
      walk: "walk",
    };

    const mode = modeMap[vehicleType] || "drive";

    // Step 3: Build API request
    const apiKey = process.env.GEOAPIFY_API_KEY;
    const waypoints = `${originCoords.lat},${originCoords.lng}|${destinationCoords.lat},${destinationCoords.lng}`;
    const url = `https://api.geoapify.com/v1/routing?waypoints=${waypoints}&mode=${mode}&apiKey=${apiKey}`;

    console.log("Geoapify Routing URL:", url);

    // Step 4: Make API request (NO Authorization header needed)
    const response = await axios.get(url);

    // Step 5: Parse response
    if (
      response.data &&
      response.data.features &&
      response.data.features.length > 0
    ) {
      const route = response.data.features[0].properties;

      // Distance in meters, time in seconds
      const distanceMeters = route.distance;
      const durationSeconds = route.time;

      // Convert to readable formats
      const distanceKm = (distanceMeters / 1000).toFixed(1);
      const durationMin = Math.round(durationSeconds / 60);
      const durationHrs = Math.floor(durationMin / 60);
      const durationMins = durationMin % 60;

      return {
        distance: `${distanceKm} km`,
        distanceValue: distanceMeters,
        duration:
          durationHrs > 0
            ? `${durationHrs} hrs ${durationMins} mins`
            : `${durationMins} mins`,
        durationValue: durationMin, // in minutes
        mode: route.mode,
        origin: origin,
        destination: destination,
      };
    } else {
      throw new Error("No route found between the locations");
    }
  } catch (err) {
    console.error("Geoapify API error:", err.response?.data || err.message);
    throw new Error("Error fetching data from Geoapify API");
  }
};


module.exports.getAddressAutoComplete = async (input) => {
  if (!input || input.length < 3) {
    return { results: [], message: "Input too short" };
  }

  const apiKey = process.env.GEOAPIFY_API_KEY;
  const url = `https://api.geoapify.com/v1/geocode/autocomplete?text=${encodeURIComponent(
    input
  )}&filter=countrycode:in&format=json&apiKey=${apiKey}`;

  try {
    const response = await axios.get(url);

    if (response.data && response.data.results && response.data.results.length === 0) {
      return { results: [], message: "No suggestions found" };
    }

    // Return formatted results with essential fields
    return {
      results: response.data.results.map(item => ({
        name: item.name,
        formatted: item.formatted,
        address_line1: item.address_line1,
        address_line2: item.address_line2,
        city: item.city,
        state: item.state,
        postcode: item.postcode,
        country: item.country,
        lat: item.lat,
        lon: item.lon
      }))
    };
  } catch (err) {
    console.error("Geoapify API error:", err.response?.data || err.message);
    throw new Error("Error fetching data from Geoapify API");
  }
};

module.exports.getCaptainsInTheRadius = async( ltd ,lng , radius) =>{


  // radius  in KM 


  const captain = await captainModel.find({

    location:{
      $geoWithin:{
        $centerSphere: [ [ ltd, lng ] , radius / 6378.1 ]
    }

  }
    })
 return captain
  }
