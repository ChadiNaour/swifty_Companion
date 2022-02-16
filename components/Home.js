import React from "react";
import { View, Text, StyleSheet, Pressable, Image, TextInput, useWindowDimensions, SafeAreaView, Switch } from "react-native";
import Home_image from '../assets/42_Logo.svg.png'

const Home = ({ navigation }) => {
    const [text, onChangeText] = React.useState("");
    const [enabled, setEnabled] = React.useState(false)
    const { height, width } = useWindowDimensions();

    const toggleSwitch = () => {
        setEnabled(oldValue => !oldValue)
      }

    return (
        <SafeAreaView style={{backgroundColor: 'white', flex: 1}}>
            <View style={styles.Switch}>
                <Switch
                    trackColor={{ false: "#767577", true: "#81b0ff" }}
                    thumbColor={enabled ? "#f5dd4b" : "#f4f3f4"}
                    ios_backgroundColor="#3e3e3e"
                    value={enabled}
                    onValueChange={toggleSwitch}
                    // onValueChange={() => setTheme(!theme)}
                    // value={!theme}
                />
            </View>
            <View style={styles.container}>
                {/* <Text>sfsfsfsf</Text> */}
                <Image style={styles.tinyLogo, { height: height * 0.25 }} source={Home_image} resizeMode="contain" />
                <TextInput
                    style={styles.input}
                    onChangeText={onChangeText}
                    value={text}
                    placeholder="Login"
                // keyboardType="numeric"
                />
                <Pressable
                    style={styles.button}
                    // title="Search"
                    onPress={() => navigation.push('Details')}
                >
                    <Text style={styles.text}>Search</Text>
                </Pressable>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // width: 100,
        // height:100,
        backgroundColor: 'white',
        alignItems: 'center',
        // justifyContent: 'center',
        padding: 20
    },
    tinyLogo: {
        width: '100%',
        // maxWidth: 300,
        // maxHeight: 200,
        borderWidth: 1,
        borderColor: "red",
    },
    input: {
        width: '90%',
        margin: 12,
        borderWidth: 1,
        borderRadius: 5,
        borderColor: '#e8e8e8',
        padding: 10,
    },
    button: {
        backgroundColor: 'skyblue',
        width: '90%',
        padding: 15,
        alignItems: 'center',
        borderRadius: 5,
    },
    text: {
        fontWeight: 'bold',
        color: 'white'

    },
    Switch: {
        padding: 15,
        alignItems: "flex-end",
      },
});

export default Home;