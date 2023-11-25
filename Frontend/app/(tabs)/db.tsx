import {View, Text, StyleSheet, ScrollView} from "react-native";
import {COLORS, FONT, FONT_SIZES} from "../../constants/theme";
import {useEffect, useState} from "react";
import axios from "axios";
import SafeAreaViewBothOS from "../../components/common/SafeAreaViewBothOS";
import {useLessons} from "../../contexts/LessonsContextProvider";

export default function Db(){
    const [avgPoints, setAvgPoints] = useState<string | null>(null);
    const {lessons} = useLessons();

    useEffect(() => {
        axios.get<number>("http://192.168.0.103:8083/lessons/average-points")
            .then(({data}) => setAvgPoints(data.toFixed(2)))
            .catch(err => alert(err))
    }, []);

    const titles = [
        '№',
        'Назва',
        'Викладач',
        'Адреса',
        'Бали'
    ]

    const heights = [35, 35, 35, 90, 35];

    return (
        <SafeAreaViewBothOS style={{marginTop: 20}}>
            <View style={{
                marginBottom: 20,
                paddingHorizontal: 15
            }}>
                <Text style={{
                    fontSize: FONT_SIZES.pageTitle,
                    fontFamily: FONT.bold,
                    color: COLORS.black
                }}>
                    База даних
                </Text>
            </View>
            <View style={{
                paddingHorizontal: 15
            }}>
                <View>
                    <Text style={{
                        fontSize: FONT_SIZES.sectionTitle,
                        fontFamily: FONT.bold,
                        color: COLORS.black,
                    }}
                    >
                        Інформація
                    </Text>
                </View>
                <View>
                    <Text style={{
                        fontSize: FONT_SIZES.medium,
                        fontFamily: FONT.regular,
                        color: COLORS.black,
                        marginTop: 10
                    }}
                    >
                        Середній бал всіх дисциплін: {avgPoints && avgPoints}
                    </Text>
                </View>
            </View>
            <View>
                <View style={{paddingHorizontal: 15}}>
                    <View>
                        <Text style={{
                            fontSize: FONT_SIZES.sectionTitle,
                            fontFamily: FONT.bold,
                            color: COLORS.black,
                            marginTop: 40
                        }}
                        >
                            Таблиця
                        </Text>
                    </View>
                    <View>
                        <Text style={styles.desc}>
                            Викладач: Кондратюк Ю.В.
                        </Text>
                        <Text style={styles.desc}>
                            Бал: {'>'} 60
                        </Text>
                    </View>
                </View>
            </View>
            <ScrollView
                horizontal
                contentContainerStyle={{
                    marginTop: 10,
                    left: 15
                }}
                showsHorizontalScrollIndicator={false}
            >
                <View style={{
                    flexDirection: "row",
                    borderBottomWidth: 1.5,
                    borderRightWidth: 1,
                    borderColor: COLORS.grey,
                }}>
                    <View>
                        {titles.map((e, i) => (
                            <View
                                style={{
                                    ...styles.tableCell,
                                    height: heights[i]
                                }}
                                key={i}
                            >
                                <Text style={{
                                    fontSize: FONT_SIZES.medium,
                                    fontFamily: FONT.bold,
                                    color: COLORS.black
                                }}>
                                    {e}
                                </Text>
                            </View>
                        ))}
                    </View>
                    {lessons && lessons.map(e => Object.values(e)).map((e1, i1) => (
                        <View key={i1}>
                            {e1.map((e2, i2) => (
                                <View
                                    style={{
                                        ...styles.tableCell,
                                        height: heights[i2],
                                    }}
                                    key={i2}
                                >
                                    <Text>
                                        {e2}
                                    </Text>
                                </View>
                            ))}
                        </View>
                    ))}
                </View>
            </ScrollView>
        </SafeAreaViewBothOS>
    )
}

const styles = StyleSheet.create({
    desc: {
        fontSize: FONT_SIZES.medium,
        fontFamily: FONT.regular,
        color: COLORS.grey
    },
    tableCell: {
        width: 130,
        borderWidth: 1,
        borderBottomWidth: 0,
        borderRightWidth: 0,
        borderColor: COLORS.grey,
        justifyContent: "center",
        alignItems: "flex-start",
        padding: 5
    },
})
