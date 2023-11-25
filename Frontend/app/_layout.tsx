import {Slot} from "expo-router";
import {useFonts} from "expo-font";
import {setStatusBarStyle} from "expo-status-bar";
import axios from "axios";
import LessonsContextProvider from "../contexts/LessonsContextProvider";

export default function AppLayout(){
    const [fontsLoaded, fontError] = useFonts({
        InterRegular: require('../assets/fonts/Inter-Regular.ttf'),
        InterBold: require('../assets/fonts/Inter-Bold.ttf')
    })

    axios.defaults.headers.post['Content-Type'] = 'application/json';

    if (!fontsLoaded && !fontError) {
        return null;
    }

    setStatusBarStyle("dark");

    return (
        <LessonsContextProvider>
            <Slot></Slot>
        </LessonsContextProvider>
    )
}
