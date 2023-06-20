import React, { useEffect, useState } from 'react';

const MapComponent = ({ location }) => {
  const [map, setMap] = useState(null);
  const [userLocation, setUserLocation] = useState(null);
  const [customLocation, setCustomLocation] = useState(null);

  useEffect(() => {
    const loadMap = () => {
      // Initialize the map
      const newMap = new window.google.maps.Map(document.getElementById('map'), {
        center: { lat: 0, lng: 0 },
        zoom: 15,
      });
      setMap(newMap);

      // Get the user's current location
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            const userLocation = { lat: latitude, lng: longitude };
            setUserLocation(userLocation);

            // Add a marker for the user's location
            const userMarker = new window.google.maps.Marker({
              position: userLocation,
              map: newMap,
              title: 'Your Location',
              label: 'You',
            });
            attachInfoWindow(userMarker, 'Your Location');
          },
          (error) => {
            console.error('Error getting user location:', error);
          }
        );
      }

      if (location) {
        // Add a marker for the custom location
        const customMarker = new window.google.maps.Marker({
          position: location,
          map: newMap,
          title: 'Reccomendation',
          label: '',
        });
        attachInfoWindow(customMarker, 'Custom Location');
        setCustomLocation(customMarker);
      }
    };

    const attachInfoWindow = (marker, locationName) => {
      const infoWindow = new window.google.maps.InfoWindow({
        content: `<div><strong>${locationName}</strong></div>`,
      });

      marker.addListener('click', () => {
        infoWindow.open(map, marker);
      });
    };

    // Load the Google Maps API script
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}&libraries=places`;
    script.async = true;
    script.defer = true;
    script.onload = loadMap;
    document.body.appendChild(script);

    return () => {
      // Clean up the script and map instance
      script.onload = null;
      document.body.removeChild(script);
      setMap(null);
    };
  }, [location]);

  useEffect(() => {
    // Update the map center when userLocation changes
    if (map && userLocation) {
      map.setCenter(userLocation);
    }
  }, [map, userLocation]);

  useEffect(() => {
    // Update the custom marker position when location changes
    if (customLocation && location) {
      customLocation.setPosition(location);
    }
  }, [customLocation, location]);

  return <div id="map" style={{ width: '100%', height: '400px' }} />;
};

export default MapComponent;