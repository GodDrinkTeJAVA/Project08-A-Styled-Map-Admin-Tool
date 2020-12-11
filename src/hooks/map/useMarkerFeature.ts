import mapboxgl from 'mapbox-gl';
import getRandomId from '../../utils/getRandomId';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store';
import {
  MarkerState,
  addMarker,
  updateMarker,
  ADD_MARKER,
  UPDATE_MARKER,
} from '../../store/marker/action';

interface ReduxStateType {
  map: mapboxgl.Map;
  marker: MarkerState;
}

interface MarkerPosType {
  x: number | null;
  y: number | null;
}

export interface MarkerLngLatType {
  lng: number | null;
  lat: number | null;
}

export interface RegisterMarkerType {
  id?: string;
  text: string;
  lngLat?: MarkerLngLatType;
  instance?: mapboxgl.Marker;
}

export interface MarkerHookType {
  markerPos: MarkerPosType;
  resetMarkerPos: () => void;
  registerMarker: ({ text, lngLat }: RegisterMarkerType) => void;
}

function useMarkerFeature(): MarkerHookType {
  const dispatch = useDispatch();
  const { map, marker } = useSelector<RootState>((state) => ({
    map: state.map.map,
    marker: state.marker,
  })) as ReduxStateType;

  const [markerPos, setMarkerPos] = useState<MarkerPosType>({
    x: null,
    y: null,
  });

  const [markerLngLat, setMarkerLngLat] = useState<MarkerLngLatType>({
    lng: null,
    lat: null,
  });

  const resetMarkerPos = () => {
    setMarkerPos({
      x: null,
      y: null,
    });
    setMarkerLngLat({
      lng: null,
      lat: null,
    });
  };

  const registerMarker = ({
    id = getRandomId(8),
    text,
    lngLat = markerLngLat,
    instance,
  }: RegisterMarkerType): void => {
    const type = lngLat === markerLngLat ? ADD_MARKER : UPDATE_MARKER;
    if (!map || !marker) return;
    if (!lngLat.lng || !lngLat.lat) return;
    if (instance) {
      instance.addTo(map);
      instance.on('dragend', () => {
        const lnglat = instance.getLngLat();
        dispatch(
          updateMarker({
            id,
            lng: lnglat.lng,
            lat: lnglat.lat,
          })
        );
      });
    }

    if (type === ADD_MARKER) {
      const newMarker = new mapboxgl.Marker({ draggable: true })
        .setLngLat([lngLat.lng, lngLat.lat])
        .setPopup(new mapboxgl.Popup().setHTML(`<p>${text}</p>`))
        .addTo(map);

      newMarker.on('dragend', () => {
        const lnglat = newMarker.getLngLat();
        dispatch(
          updateMarker({
            id,
            lng: lnglat.lng,
            lat: lnglat.lat,
          })
        );
      });

      dispatch(
        addMarker({
          id,
          text,
          lng: lngLat.lng,
          lat: lngLat.lat,
          instance: newMarker,
        })
      );
    }

    dispatch(
      updateMarker({
        id,
        text,
        lng: lngLat.lng,
        lat: lngLat.lat,
        instance,
      })
    );
  };

  useEffect(() => {
    if (!map) return;
    map.on('contextmenu', (e) => {
      e.preventDefault();
      setMarkerPos({ ...e.point });
      setMarkerLngLat({ ...e.lngLat });
    });
  }, [map]);

  return {
    markerPos,
    resetMarkerPos,
    registerMarker,
  };
}

export default useMarkerFeature;
