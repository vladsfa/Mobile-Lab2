import {Tabs} from "expo-router";
import {COLORS, FONT_SIZES} from "../../constants/theme";
import {useLessons} from "../../contexts/LessonsContextProvider";
import {ActivityIndicator, View} from "react-native";

export default function TabsLayout(){
    const {isLoading} = useLessons();

    if (isLoading){
        return (
            <View style={{
                justifyContent: "center",
                alignItems: "center",
                height: "100%"
            }}>
                <ActivityIndicator size={"large"}/>
            </View>
        )
    }

    return (
        <Tabs
            screenOptions={{
                headerShown: false,
                tabBarIconStyle: {
                    display: "none"
                },
                tabBarLabelStyle: {
                    fontSize: FONT_SIZES.medium
                },
                tabBarItemStyle: {
                    justifyContent: "center",
                    alignItems: "center"
                },
                tabBarStyle: {
                    height: 75
                },
                tabBarActiveTintColor: COLORS.black
            }}
            sceneContainerStyle={{
                backgroundColor: COLORS.light_grey
            }}
        >
            <Tabs.Screen
                name={"index"}
                options={{href: null}}
            />
            <Tabs.Screen
                name={"db"}
                options={{
                    tabBarLabel: "База даних"
                }}
            />
            <Tabs.Screen
                name={"addressBook"}
                options={{
                    tabBarLabel: "Адресна книга"
                }}
            />
            <Tabs.Screen
                name={"geoService"}
                options={{
                    tabBarLabel: "Геосервіс",
                    headerTransparent: true,
                }}
            />
        </Tabs>
    )
}
