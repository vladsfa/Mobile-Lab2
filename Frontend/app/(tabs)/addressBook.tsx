import {Text, View} from "react-native";
import {COLORS, FONT, FONT_SIZES} from "../../constants/theme";
import {useEffect, useState} from "react";
import * as Contacts from 'expo-contacts';
import isMale from "../../utils/isMale";
import SafeAreaViewBothOS from "../../components/common/SafeAreaViewBothOS";

export default function AddressBook(){
    const [contacts, setContacts] = useState<Contacts.Contact[] | null>(null)
    useEffect(() => {
        Contacts.requestPermissionsAsync()
            .then(status => {
                if (status.granted){
                    Contacts.getContactsAsync()
                        .then(({data}) => {
                            setContacts(data);
                        })
                }
            })
            .catch(err => alert(err));
    })

    return (
        <SafeAreaViewBothOS style={{marginTop: 20}}>
            <View
                style={{
                    paddingHorizontal: 15
                }}
            >
                <View>
                    <View>
                        <Text style={{
                            fontSize: FONT_SIZES.pageTitle,
                            fontFamily: FONT.bold,
                            color: COLORS.black
                        }}>
                            Адресна книга
                        </Text>
                    </View>
                    <View>
                        <Text style={{
                            fontSize: FONT_SIZES.medium,
                            fontFamily: FONT.regular,
                            color: COLORS.grey
                        }}
                        >
                            Контакти з чоловічим іменем по батькові
                        </Text>
                    </View>
                </View>
                <View style={{
                    height: "100%",
                    marginTop: 10
                }}>
                    {contacts && contacts.filter(e => isMale(e.lastName)).map(e => (
                        <View key={e.id}
                              style={{
                                  paddingTop: 10,
                                  paddingBottom: 10,
                                  borderTopWidth: 1,
                                  borderTopColor: "#ccc",
                              }}
                        >
                            <View>
                                <Text style={{
                                    fontSize: FONT_SIZES.medium,
                                    fontFamily: FONT.regular
                                }}>
                                    {e.firstName} {e.lastName}
                                </Text>
                            </View>
                        </View>
                    ))}
                </View>
            </View>
        </SafeAreaViewBothOS>
    )
}
