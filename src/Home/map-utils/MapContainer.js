import React, {useState, useCallback, useEffect} from 'react';
import {
    GoogleMap,
    useLoadScript,
    Marker,
    InfoWindow,
} from '@react-google-maps/api';
import mapStyles from './mapStyles';

const containerStyle = {
    height: '450px',
};

const center = {
    lat: 17.46221,
    lng: 78.35685,
};

const options = {
    styles: mapStyles,
    disableDefaultUI: true,
    zoomControl: true,
};
const libraries = ['places'];

const MapContainer = () => {
    const {isLoaded, loadError} = useLoadScript({
        googleMapsApiKey: 'AIzaSyC8ZNCv7s7ncj604eU3WX5zQKqb7DhyUEk',
        libraries,
    });

    const [marker, setMarker] = useState([]);

    const handleMapClick = useCallback((event) => {
      setMarker({
            lat: event.latLng.lat(),
            lng: event.latLng.lng(),
        });
    }, []);

    if (!isLoaded) return 'Maps Loading';
    if (loadError) return 'Error Loading Maps';

    return (
        <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={15}
            options={options}
            onClick={handleMapClick}
        >
            {/* Child components, such as markers, info windows, etc. */}
            <></>
        </GoogleMap>
    );
};

export default React.memo(MapContainer);
