import React from 'react';
import GoogleMapReact from 'google-map-react';
import LocationPin from './LocationPin';

function Map({ location, zoomLevel }) {
  return (
    <div className="google-map" style={{ overflow: 'hidden', borderRadius: '4px' }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: `${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}` }}
        defaultCenter={location}
        defaultZoom={zoomLevel}
      >
        {console.log('Map called')}
        <LocationPin
          lat={location.lat}
          lng={location.lng}
          text={location.address}
        />
      </GoogleMapReact>
    </div>
  );
}

export default Map;
