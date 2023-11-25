import {Image, View} from "react-native";
import MapView, {LatLng, Marker} from "react-native-maps";
import {useEffect, useState} from "react";
import * as Location from 'expo-location';
import {useLessons} from "../../contexts/LessonsContextProvider";
import ProjectButtonDark from "../../components/common/ProjectButtonDark";
import {COLORS} from "../../constants/theme";
import MapViewDirections from "react-native-maps-directions"
import {INITIAL_REGION, MAP_API_KEY} from "../../constants/constants";

export default function GeoService(){
    const [location, setLocation] = useState<LatLng | null>(null)
    const [locationSubscription, setLocationSubscription] = useState<Location.LocationSubscription | null>(null);
    const {lessons, lessonCoords} = useLessons();

    useEffect(() => {
        Location.requestForegroundPermissionsAsync()
            .then(({status}) => {
                if (status === "granted"){
                    Location.getCurrentPositionAsync()
                        .then(({coords}) => {
                            setLocation({latitude: coords.latitude, longitude: coords.longitude});
                        })
                }
            })

        Location.watchPositionAsync(
            { accuracy: Location.Accuracy.High, timeInterval: 1000, distanceInterval: 10 },
            ({coords}) => setLocation({latitude: coords.latitude, longitude: coords.longitude})
        )
            .then(subs => setLocationSubscription(subs))
            .catch(err => alert(err));

        return () => {
            if (locationSubscription){
                locationSubscription.remove();
            }
        }
    }, []);

    const [lastRouteMarker, setLastRouteMarker] = useState<{id: number, coord: LatLng} | null>(null)
    const [selectedMarker, setSelectedMarker] = useState<{id: number, coord: LatLng} | null>(null)

    //Емулятор видає місцезнаходження в США, маршрут туди не будується,
    //тому визначим свою локацію користувача
    const randLocation = {latitude: 50.44772201026219, longitude: 30.522004239143648};
    return (
        <View>
            <MapView
                style={{height: "100%", width: "100%"}}
                initialRegion={INITIAL_REGION}
                onPress={() => {
                    setSelectedMarker(null);
                }}
            >
                {location && (
                    <Marker coordinate={randLocation}/>
                )}

                {lessons && lessonCoords && lessonCoords.map(e => (
                    <Marker
                        key={e.id}
                        coordinate={e.coord}
                        onPress={(event) => {
                            setSelectedMarker(e)
                            event.stopPropagation();
                        }}
                        style={{
                            width: 42,
                            height: 42
                        }}
                    >
                        <Image
                            source={require('../../assets/images/univ-icon.png')}
                            style={{
                                width: selectedMarker?.id === e.id ? 42 : 35,
                                height: selectedMarker?.id === e.id ? 42 : 35,
                                resizeMode: "contain"
                            }}
                        />
                    </Marker>
                ))}
                {lastRouteMarker && (
                    <MapViewDirections
                        origin={randLocation}
                        destination={lastRouteMarker.coord}
                        apikey={MAP_API_KEY}
                        strokeWidth={3}
                        strokeColor="#3F51B5"
                    />
                )}
            </MapView>

            {selectedMarker && (
                <View
                    style={{
                        position: "absolute",
                        bottom: 0,
                        width: "100%",
                        height: 100,
                        justifyContent: "center",
                        alignItems: "center",
                        backgroundColor: COLORS.light_grey,
                        borderTopRightRadius: 50,
                        borderTopLeftRadius: 50,
                    }}
                >
                    <ProjectButtonDark
                        onPress={() => {
                            setLastRouteMarker(selectedMarker);
                        }}
                        text={"Побудувати маршрут"}
                    />
                </View>
            )}
        </View>
    )
}
