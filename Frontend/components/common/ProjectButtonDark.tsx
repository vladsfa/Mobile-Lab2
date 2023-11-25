import {forwardRef} from "react";
import {GestureResponderEvent, StyleSheet} from "react-native";
import ProjectButton from "./ProjectButton";
import {COLORS} from "../../constants/theme";

type ProjectButtonDarkOptions = {
    text: string,
    onPress: (event: GestureResponderEvent) => void
    width?: number
}

export default function (props: ProjectButtonDarkOptions){
    return (
        <ProjectButton
            text={props.text}
            onPress={props.onPress}
            btnStyles={{
                ...styles.btnStyles,
                width: props.width ? props.width : 350
            }}
            btnTextStyles={styles.btnTextStyles}/>
    )
}

const styles = StyleSheet.create({
    btnStyles: {
        backgroundColor: "#3F51B5"
    },
    btnTextStyles: {
        color: COLORS.white
    }
})
