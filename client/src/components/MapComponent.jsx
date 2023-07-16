import React, { useEffect, useState } from 'react';

function MapComponent(props) {
  const [map, setMap] = useState(null);
  const [customLocation, setCustomLocation] = useState(null);
  console.log(props.location);
  console.log(props.userLocation);

  useEffect(() => {
    const loadMap = () => {
      // Initialize the map
      const newMap = new window.google.maps.Map(document.getElementById('map'), {
        center: { lat: 0, lng: 0 },
        zoom: 18,
        scrollwheel: true,
        zoomControl: true,
        styles: [
          {
            featureType: "administrative",
            elementType: "labels.text.fill",
            stylers: [{ color: "#444444" }],
          },
          {
            featureType: "landscape",
            elementType: "all",
            stylers: [{ color: "#f2f2f2" }],
          },
          {
            featureType: "road",
            elementType: "all",
            stylers: [{ saturation: -100 }, { lightness: 45 }],
          },
          {
            featureType: "road.highway",
            elementType: "all",
            stylers: [{ visibility: "simplified" }],
          },
          {
            featureType: "water",
            elementType: "all",
            stylers: [{ color: "#5e72e4" }, { visibility: "on" }],
          },
        ],
      });
      setMap(newMap);

      // Get the user's current location
      if (props.userLocation) {
        // Add a marker for the user's location
        const userMarker = new window.google.maps.Marker({
          position: props.userLocation,
          map: newMap,
          title: 'Your Location',
          label: 'You',
        });
        attachInfoWindow(userMarker, 'Your Location');
      }

      if (props.location) {
        // Add a marker for the custom location
        const customMarker = new window.google.maps.Marker({
          position: props.location,
          map: newMap,
          title: 'Recommendation',
          label: '',
        });
        attachInfoWindow(customMarker, 'Recommendation');
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
  }, [props.location]);

  useEffect(() => {
    // Update the map center when userLocation changes
    if (map && props.userLocation) {
      map.setCenter(props.userLocation);
    }
  }, [map, props.userLocation]);

  useEffect(() => {
    // Update the custom marker position when location changes
    if (customLocation && props.location) {
      customLocation.setPosition(props.location);
    }
  }, [customLocation, props.location]);

  return <div id="map" style={{ height: '600px', borderRadius:'4px' }} />;
}

export default MapComponent;
