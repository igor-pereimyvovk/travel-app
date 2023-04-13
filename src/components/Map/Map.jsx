import React from "react";

import GoogleMapReact from "google-map-react";
import { Paper, Typography, useMediaQuery } from "@material-ui/core";

import useStyles from "./styles";
import { LocationOnOutlined } from "@material-ui/icons";
import { Rating } from "@material-ui/lab";

const Map = ({ setCoordinates, coordinates, setBounds, places }) => {
    const classes = useStyles();
    const isDesktop = useMediaQuery("(min-width: 600px)");

    return (
        <div className={classes.mapContainer}>
            <GoogleMapReact
                bootstrapURLKeys={{
                    key: "AIzaSyCbFOLffteO4pIOd6VkGIsJR9Wrf9ZXP04",
                }}
                defaultCenter={coordinates}
                center={coordinates}
                defaultZoom={15}
                margin={[50, 50, 50, 50]}
                // options={""}
                onChange={(e) => {
                    setCoordinates({ lat: e.center.lat, lng: e.center.lng });
                    setBounds({ ne: e.marginBounds.ne, sw: e.marginBounds.sw });
                }}
            >
                {places?.map((place, i) => (
                    <div
                        className={classes.markerContainer}
                        lat={Number(place.latitude)}
                        lng={Number(place.longitude)}
                        key={i}
                    >
                        {!isDesktop ? (
                            <LocationOnOutlined
                                color="primary"
                                fontSize="large"
                            />
                        ) : (
                            <Paper elevation={3} className={classes.paper}>
                                <Typography
                                    className={classes.typography}
                                    variant="subtitle2"
                                    gutterBottom
                                >
                                    {place.name}
                                </Typography>
                                <img
                                    src={
                                        place.photo
                                            ? place.photo.images.large.url
                                            : "https://www.foodserviceandhospitality.com/wp-content/uploads/2016/09/Restaurant-Placeholder-001.jpg"
                                    }
                                    alt={place.name}
                                    className={classes.pointer}
                                />
                                <Rating
                                    size="small"
                                    value={Number(place.rating)}
                                    readOnly
                                ></Rating>
                            </Paper>
                        )}
                    </div>
                ))}
            </GoogleMapReact>
        </div>
    );
};

export default Map;
