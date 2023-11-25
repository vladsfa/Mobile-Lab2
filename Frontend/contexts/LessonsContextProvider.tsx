import {createContext, ReactNode, useContext, useEffect, useState} from "react";
import {Lesson} from "../models/lesson";
import axios from "axios";
import {LatLng} from "react-native-maps";
import {MAP_API_KEY} from "../constants/constants";

type lessonCoordInfo = {id: number, coord: LatLng};

const LessonsContext = createContext<
    {isLoading: boolean, lessons: Lesson[] | null, lessonCoords: lessonCoordInfo[] | null} | null>(null);

export function useLessons(){
    const context = useContext(LessonsContext);
    if (!context){
        throw new Error("Lessons is null");
    }

    return context;
}

export default function LessonsContextProvider({children}: {children: ReactNode}){
    const [lessons, setLessons] = useState<Lesson[] | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [coords, setCoords] = useState<lessonCoordInfo[] | null>(null);

    useEffect(() => {
        setIsLoading(true);

        axios.get<Lesson[]>("http://192.168.0.103:8083/lessons?teacherName=Кондратюк Ю.В.&pointsGreaterThen=60")
            .then(({data}) => {
                setLessons(data)
                return data;
            })
            .then((data) => Promise.all(data.map(e => {
                return axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${e.address}&key=${MAP_API_KEY}`)
                    .then(response => {
                        const coord = response.data.results[0].geometry.location;
                        return {id: e.id, coord: {latitude: coord.lat, longitude: coord.lng}};
                    })
            })))
            .then(res => setCoords(res))
            .catch(err => alert(err))
            .finally(() => setIsLoading(false));
    }, [])

    return (
        <LessonsContext.Provider value={{
            lessons: lessons,
            isLoading: isLoading,
            lessonCoords: coords
        }}
        >
            {children}
        </LessonsContext.Provider>
    )
}
