import React, { useState, useEffect } from "react";

import { getPlacesData } from "./api";

import { CssBaseline, Grid } from "@material-ui/core";

import Header from "./components/Header/Header";
import List from "./components/List/List";
import Map from "./components/Map/Map";

const App = () => {
    const [places, setPlaces] = useState([]);
    const [filteredPlaces, setFilteredPlaces] = useState([]);

    const [coordinates, setCoordinates] = useState({});
    const [bounds, setBounds] = useState({});

    const [type, setType] = useState("restaurants");
    const [rating, setRating] = useState(0);

    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(
            ({ coords: { latitude, longitude } }) => {
                setCoordinates({ lat: latitude, lng: longitude });
            }
        );
    }, []);

    useEffect(() => {
        const filteredPlaces = places?.filter(
            (place) => place.rating >= rating
        );
        setFilteredPlaces(filteredPlaces);
    }, [rating]);

    useEffect(() => {
        setIsLoading(true);

        if (bounds.sw && bounds.ne) {
            getPlacesData(type, bounds?.sw, bounds?.ne).then((data) => {
                setPlaces(
                    data.filter((place) => place.name && place.num_reviews > 0)
                );
                setFilteredPlaces([]);
                setRating(0);
                setIsLoading(false);
            });
        }
    }, [type, bounds]);

    return (
        <>
            <CssBaseline />
            <Header setCoordinates={setCoordinates} />
            <Grid container spacing={3} style={{ width: "100%" }}>
                <Grid item xs={12} md={4}>
                    <List
                        places={filteredPlaces.length ? filteredPlaces : places}
                        isLoading={isLoading}
                        type={type}
                        setType={setType}
                        rating={rating}
                        setRating={setRating}
                    />
                </Grid>
                <Grid item xs={12} md={8}>
                    <Map
                        setCoordinates={setCoordinates}
                        coordinates={coordinates}
                        setBounds={setBounds}
                        places={filteredPlaces.length ? filteredPlaces : places}
                    />
                </Grid>
            </Grid>
        </>
    );
};

export default App;
