import React from "react";
import { View, Text, StyleSheet, Pressable, Image, TextInput, useWindowDimensions, SafeAreaView, Switch, ActivityIndicator } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import Home_image from '../assets/42_Logo.svg.png';
import { user_id, user_secret } from "../config.json";

const Home = ({ navigation }) => {
    const [login, onChangeLogin] = React.useState("");
    const [enabled, setEnabled] = React.useState(false);
    const [loading, setLoading] = React.useState(false);
    const { height, width } = useWindowDimensions();

    const toggleSwitch = () => {
        setEnabled(oldValue => !oldValue)
    }

    const getToken = async () => {
        try {
            const token = await axios.post("https://api.intra.42.fr/oauth/token/", {
                client_id: user_id,
                client_secret: user_secret,
                grant_type: "client_credentials",
            });

            if (token.data) {
                return token.data;
            }
        } catch (error) {
            return null;
        }
    };

    const sendRequ = async (login, token) => {
        try {
          var response = await axios.get(
            "https://api.intra.42.fr/v2/users/" + login.toLowerCase(),
            {
              headers: {
                Authorization: "Bearer " + token.access_token,
              },
            }
          );
          console.log(response.data);
          navigation.navigate("Details", { data: response.data });
        } catch (error) {
            console.log(error.message);
          alert("login doesnt exist");
        }
      };

    const fetchLogin = async (login) => {
        setLoading(true);
        if (login && login !== "") {
            try {
                // var token = await getToken();
                // await AsyncStorage.setItem("access_token", JSON.stringify(token));
                var token = await AsyncStorage.getItem("access_token");
                if (token)
                {

                    token = JSON.parse(token);
                    if((token.created_at + token.expires_in) <= (Date.now() / 1000))
                    {
                        console.log("token expired");
                        token = await getToken();
                        if (token)
                            await AsyncStorage.setItem("access_token", JSON.stringify(token));
                    }
                }
                else {
                    token = await getToken();
                    if (token)
                        await AsyncStorage.setItem("access_token", JSON.stringify(token));
                }
                // var token = await getToken();
                // console.log(token);
                // var token = await AsyncStorage.getItem("access_token");
                // if (token)
                //     console.log("token fron storage", token)
                // else {
                //     token = await getToken();
                //     if (token)
                //         await AsyncStorage.setItem("access_token", token);
                // }
                await sendRequ(login, token);
            }
            catch (error) {
                console.log(error);
            }

        }
        else
            alert("you should set a login first");
    }

    return (
        <SafeAreaView>
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

            {/* {!loading ? */}
            <View style={styles.container}>
                {/* <Text>sfsfsfsf</Text> */}
                <Image style={styles.tinyLogo} source={Home_image} resizeMode="cover" />
                <TextInput
                    style={styles.input}
                    onChangeText={onChangeLogin}
                    value={login}
                    placeholder="Login"
                // keyboardType="numeric"
                />
                <Pressable
                    style={styles.button}
                    // title="Search"
                    onPress={() => fetchLogin(login)}
                >
                    <Text style={styles.text}>Search</Text>
                </Pressable>
            </View>
            {/* : <ActivityIndicator size="large" color="#00ff00" />} */}
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // width: 100,
        // height:100,
        // backgroundColor: 'white',
        alignItems: 'center',
        // justifyContent: 'center',
        padding: 20
    },
    tinyLogo: {
        width: 150,
        height: 150,
        maxWidth: 200,
        maxHeight: 200,
        marginLeft: -20,
        // borderWidth: 1,
        // borderColor: "red",
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