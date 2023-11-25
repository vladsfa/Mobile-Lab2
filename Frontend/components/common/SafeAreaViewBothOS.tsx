import {ReactNode} from "react";
import {Platform, SafeAreaView, StatusBar, StyleProp, ViewStyle} from "react-native";

type SafeAreaViewBothOsOptions = {
    children: ReactNode,
    style?: StyleProp<ViewStyle>
}

export default function SafeAreaViewBothOS(props: SafeAreaViewBothOsOptions){
    return (
        <SafeAreaView style={[
            props.style,
            {paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0}
        ]}>
            {props.children}
        </SafeAreaView>
    )
}



