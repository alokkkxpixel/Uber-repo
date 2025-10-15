import React, { useEffect, useState } from "react";
import { FaLocationDot } from "react-icons/fa6";
import axios from "axios";

const LocationSearch = ({
  setVehicalPannelOpen,
  setpannelOpen,
  Pickup,
  setPickup,
  Destination,
  setDestination,
}) => {
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [activeField, setActiveField] = useState(null); // 'pickup' or 'destination'

  // Function to fetch suggestions from backend
  const fetchSuggestions = async (input, field) => {
    if (!input || input.length < 2) {
      setSuggestions([]);
      return;
    }

    setLoading(true);
    setError(null);
    setActiveField(field);

    try {
      const token = localStorage.getItem("token"); // Get the auth token
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/maps/get-suggestions`,
        {
          params: { input },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (
        response.data &&
        response.data.result &&
        response.data.result.results
      ) {
        setSuggestions(response.data.result.results);
      } else {
        setSuggestions([]);
      }
    } catch (err) {
      setError(err.response?.data?.message || "Error fetching suggestions");
      setSuggestions([]);
    } finally {
      setLoading(false);
    }
  };

  // Effect to fetch suggestions when pickup input changes
  useEffect(() => {
    const timer = setTimeout(() => {
      if (Pickup) {
        fetchSuggestions(Pickup, "pickup");
      }
    }, 500); // Debounce for 500ms

    return () => clearTimeout(timer);
  }, [Pickup]);

  // Effect to fetch suggestions when destination input changes
  useEffect(() => {
    const timer = setTimeout(() => {
      if (Destination) {
        fetchSuggestions(Destination, "destination");
      }
    }, 500); // Debounce for 500ms

    return () => clearTimeout(timer);
  }, [Destination]);

  // Handle suggestion selection
  const handleSuggestionClick = (suggestion) => {
    const formattedAddress =
      suggestion.formatted ||
      `${suggestion.name}, ${suggestion.city}, ${suggestion.state}`;

    if (activeField === "pickup") {
      setPickup(formattedAddress);
    } else if (activeField === "destination") {
      setDestination(formattedAddress);
    }

    // If both fields are filled, open vehicle panel
    if (
      (activeField === "pickup" && Destination) ||
      (activeField === "destination" && Pickup)
    ) {
      // setVehicalPannelOpen(true);
      // setpannelOpen(false);
    }
  };

  return (
    <div className="p-2">
      {loading && (
        <div className="text-center py-4 text-gray-600">
          Loading suggestions...
        </div>
      )}

      {error && <div className="text-center py-4 text-red-600">{error}</div>}

      {suggestions.map((suggestion, index) => (
        <div
          key={index}
          onClick={() => handleSuggestionClick(suggestion)}
          className="w-full cursor-pointer hover:bg-gray-100 active:border my-3 bg-zinc-50 rounded-md p-1"
        >
          <div className="flex items-center gap-3">
            <h3 className="p-2 text-xl rounded-full bg-zinc-200">
              <FaLocationDot />
            </h3>
            <div className="flex flex-col py-2">
              <h4 className="text-lg font-semibold">{suggestion.name}</h4>
              <p className="text-sm leading-4 tracking-tight text-gray-600">
                {suggestion.formatted ||
                  `${suggestion.address_line1}, ${suggestion.city}, ${suggestion.state}`}
              </p>
            </div>
          </div>
        </div>
      ))}

      {suggestions.length === 0 &&
        !loading &&
        (activeField === "pickup" ? Pickup : Destination) && (
          <div className="text-center py-4 text-gray-600">
            No suggestions found
          </div>
        )}
    </div>
  );
};

export default LocationSearch;
