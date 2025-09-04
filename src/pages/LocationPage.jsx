import React, { useState } from "react";
import Navbar from "../component/Navbar";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import Footer from "../component/Footer";

// Fix Leaflet Icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

// Helper to move map on selection
const FlyTo = ({ position }) => {
  const map = useMap();
  React.useEffect(() => {
    if (position) map.flyTo(position, 15, { duration: 1.5 });
  }, [position]);
  return null;
};

// Dummy restaurants
const dummyRestaurants = [
  {
    id: 1,
    name: "Mama Put 🍲",
    cuisine: "Local Dishes",
    address: "Broad Street, Lagos",
    phone: "+234 801 111 2222",
    rating: 4.6,
    lat: 6.528,
    lng: 3.379,
    image: "https://source.unsplash.com/100x100/?african-food",
  },
  {
    id: 2,
    name: "Pizza Hub 🍕",
    cuisine: "Pizza & Fast Food",
    address: "Victoria Island, Lagos",
    phone: "+234 802 333 4444",
    rating: 4.2,
    lat: 6.524,
    lng: 3.389,
    image: "https://source.unsplash.com/100x100/?pizza",
  },
  {
    id: 3,
    name: "Sushi Spot 🍣",
    cuisine: "Japanese Cuisine",
    address: "Lekki Phase 1, Lagos",
    phone: "+234 803 555 6666",
    rating: 4.8,
    lat: 6.520,
    lng: 3.374,
    image: "https://source.unsplash.com/100x100/?sushi",
  },
  {
    id: 4,
    name: "Grills Me 🍣",
    cuisine: "Japanese Cuisine",
    address: "jabi lake mall, Abuja",
    phone: "+234 803 555 6666",
    rating: 4.8,
    lat: 9.0579,
    lng: 7.4951,
    image: "https://source.unsplash.com/100x100/?sushi",
  },
];

const LocationPage = () => {
  const [position, setPosition] = useState([6.5244, 3.3792]);
  const [selected, setSelected] = useState(null);

  const detectLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => setPosition([pos.coords.latitude, pos.coords.longitude]),
        () => alert("Unable to fetch location ❌")
      );
    }
  };

  return (
    <>
      <Navbar />
      <div className="location-page container">
        <h2>Find Restaurants Near You 📍</h2>
        <button className="btn btn-primary mb-3" onClick={detectLocation}>
          Detect My Location
        </button>

        <div className="location-layout">
          {/* Sidebar */}
          <div className="restaurant-list">
            {dummyRestaurants.map((rest) => (
              <div
                key={rest.id}
                className={`restaurant-card ${selected?.id === rest.id ? "active" : ""}`}
                onClick={() => {
                  setPosition([rest.lat, rest.lng]);
                  setSelected(rest);
                }}
              >
                <img src={rest.image} alt={rest.name} />
                <div className="info">
                  <h4>{rest.name}</h4>
                  <p>{rest.cuisine}</p>
                  <p>⭐ {rest.rating}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Map */}
          <div className="map-container">
            <MapContainer center={position} zoom={14} style={{ height: "500px", width: "100%" }}>
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <FlyTo position={position} />

              {/* User Marker */}
              <Marker position={position}>
                <Popup>You are here 🥘</Popup>
              </Marker>

              {/* Restaurant Markers */}
              {dummyRestaurants.map((rest) => (
                <Marker key={rest.id} position={[rest.lat, rest.lng]}>
                  <Popup>
                    <b>{rest.name}</b> <br />
                    {rest.cuisine} <br />
                    📍 {rest.address} <br />
                    📞 {rest.phone} <br />
                    ⭐ {rest.rating} <br />
                    <button onClick={() => (window.location.href = `/reservation?restId=${rest.id}`)}>
                      Reserve Table
                    </button>
                  </Popup>
                </Marker>
              ))}
            </MapContainer>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default LocationPage;
