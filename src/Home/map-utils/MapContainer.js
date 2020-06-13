import React, {useState, useCallback} from 'react';
import {
    GoogleMap,
    useLoadScript,
    Marker,
    InfoWindow,
} from '@react-google-maps/api';
import mapStyles from './mapStyles';

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

const MapContainer = ({currPos, height, markers, onMapClick}) => {
    const [selected, setSelected] = useState(null);

    const {isLoaded, loadError} = useLoadScript({
        googleMapsApiKey: 'AIzaSyC8ZNCv7s7ncj604eU3WX5zQKqb7DhyUEk',
        libraries,
    });

    if (!isLoaded) return 'Maps Loading';
    if (loadError) return 'Error Loading Maps';

    return (
        <GoogleMap
            mapContainerStyle={{
                height,
            }}
            center={center}
            zoom={15}
            options={options}
            onClick={onMapClick}
        >
            {markers &&
                markers.map((marker, index) => {
                    return (
                        <Marker
                            key={index}
                            position={{lat: marker.lat, lng: marker.lng}}
                            onClick={() => setSelected(marker)}
                        />
                    );
                })}
        </GoogleMap>
    );
};

export default React.memo(MapContainer);
