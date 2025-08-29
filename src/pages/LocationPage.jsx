import React, { useState } from "react";
import Navbar from "../component/Navbar";
import { toast } from "react-toastify";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import Footer from "../component/Footer";

// Default Leaflet icon fix
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

const restaurants = [
  { id: 1, name: "Mama Put 🍲", lat: 6.528, lng: 3.379, food: "Local Dishes" },
  { id: 2, name: "Pizza Hub 🍕", lat: 6.524, lng: 3.389, food: "Pizza & Fast Food" },
  { id: 3, name: "Sushi Spot 🍣", lat: 6.520, lng: 3.374, food: "Japanese Cuisine" },
];

const LocationPage = () => {
  const [position, setPosition] = useState([6.5244, 3.3792]); // Default Lagos

  const detectLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setPosition([pos.coords.latitude, pos.coords.longitude]);
        },
        (err) => {
          console.error(err);
          toast.error("Unable to fetch location ❌");
        }
      );
    }
  };

  return (
    <>
      <Navbar />
      <div className="location container">
        <h2>Find Best Food Near You 📍</h2>
        <button className="btn btn-primary mb-3" onClick={detectLocation}>
          Detect My Location
        </button>

        <MapContainer center={position} zoom={14} style={{ height: "500px", width: "100%" }}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {/* User Marker */}
          <Marker position={position}>
            <Popup>You are here 🥘</Popup>
          </Marker>

          {/* Restaurant Pins */}
          {restaurants.map((rest) => (
            <Marker key={rest.id} position={[rest.lat, rest.lng]}>
              <Popup>
                <b>{rest.name}</b>
                <br />
                {rest.food}
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
      <Footer/>
    </>
  );
};

export default LocationPage;
