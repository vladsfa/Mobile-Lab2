import {GestureResponderEvent, Pressable, StyleProp, StyleSheet, Text, TextStyle, ViewStyle} from "react-native";

type projectButtonProps = {
    text: string,
    onPress: ((event: GestureResponderEvent) => void) | null | undefined,
    btnStyles: StyleProp<ViewStyle>
    btnTextStyles: StyleProp<TextStyle>
}

export default function ProjectButton(props: projectButtonProps){
    return (
        <Pressable
            style={StyleSheet.compose(styles.btn, props.btnStyles)}
            onPress={props.onPress}
        >
            <Text style={StyleSheet.compose(styles.btnText, props.btnTextStyles)}>
                {props.text}
            </Text>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    btn:{
        alignSelf: "center",
        justifyContent: "center",
        width: 350,
        padding: 12,
        borderRadius: 20,
        marginBottom: 10,
        marginTop: 10
    },
    btnText:{
        alignSelf: "center",
    }
})
