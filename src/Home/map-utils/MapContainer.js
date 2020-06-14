/*global google*/
import React, {useState, useCallback, useRef, useEffect} from 'react';
import {
    GoogleMap,
    useLoadScript,
    Marker,
    InfoWindow,
    DirectionsRenderer,
    DirectionsService,
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
const libraries = ['places', 'geometry'];

const MapContainer = ({currPos, height, markers, onMapClick, favLocation}) => {
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
            zoom={10}
            options={options}
            onClick={onMapClick}
        >
            {favLocation ? (
                <Marker
                    position={{lat: favLocation.lat, lng: favLocation.lng}}
                    onClick={() => setSelected(favLocation)}
                />
            ) : (
                markers &&
                markers.map((marker, index) => {
                    return (
                        <Marker
                            key={index}
                            position={{lat: marker.lat, lng: marker.lng}}
                            onClick={() => setSelected(marker)}
                        />
                    );
                })
            )}

            {currPos && (
                <Marker
                    position={{lat: currPos.latitude, lng: currPos.longitude}}
                    icon={{
                        url:
                            'http://maps.google.com/mapfiles/kml/pushpin/red-pushpin.png',
                        scaledSize: new window.google.maps.Size(30, 30),
                        origin: new window.google.maps.Point(0, 0),
                        anchor: new window.google.maps.Point(15, 15),
                    }}
                />
            )}
        </GoogleMap>
    );
};

export default React.memo(MapContainer);
