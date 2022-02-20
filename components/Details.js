import React, { useState } from "react";
import {
    SafeAreaView,
    View,
    Text,
    StyleSheet,
    ImageBackground,
    ScrollView,
    useWindowDimensions
} from "react-native";
import defaultImage from "../assets/default_img.png";
import * as Progress from "react-native-progress";
import { Icon } from "react-native-elements";
import { RadioButton, Avatar, ProgressBar } from "react-native-paper";
import { SvgCssUri } from 'react-native-svg';
// import BiosSvg from "../file.svg";

const Details = ({ route, navigation }) => {
    const [checked, setChecked] = useState("first");
    const { height, width } = useWindowDimensions();

    const { data, coalition } = route.params;

    const full_name = data.first_name + " " + data.last_name;
    const image = data.image_url ? data.image_url : defaultImage;
    const login = data.login;
    const email = data.email;
    const wallet = data.wallet + " ₳";
    const correction_point = data.correction_point;
    //cursus
    const cursus1 = data.cursus_users[2]
        ? data.cursus_users[2]
        : (data.cursus_users[1] ? data.cursus_users[1] : data.cursus_users[0]);
    // cursus name
    const cursus = data.cursus_users[2]
        ? data.cursus_users[2].cursus.name
        : (data.cursus_users[1].cursus.name ? data.cursus_users[1].cursus.name : data.cursus_users[0].cursus.name);
    const grade = cursus1.grade;
    const cursus_skills = cursus1.skills;
    const level = cursus1.level;
    const cursus_project = data.projects_users;

    const level_per = (level % 100) - parseInt(level);
    const coalition1 = coalition.length > 0 ? coalition[0] : coalition;
    let arr = [];
    data?.cursus_users.map((el, key) => arr.push(el.cursus.name));
    const cover = {
        uri: `${coalition1?.cover_url}`,
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView
                style={styles.scroll}
                contentContainerStyle={{
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <ImageBackground
                    source={cover}
                    resizeMode="cover"
                    style={styles.image}
                >
                    <View
                        style={{
                            position: "absolute",
                            top: 0,
                            left: 10,
                            justifyContent: "center",
                            alignItems: "center",

                        }}
                    >
                        <View
                            style={{
                                justifyContent: "center",
                                alignItems: "center",
                                padding: 5,
                                backgroundColor: coalition1.color,
                                maxWidth: 60,
                                maxHeight: 100,
                                minWidth: 60,
                                minHeight: 100,
                                borderWidth: 2,
                                borderColor: "transparent",
                                borderBottomLeftRadius: 100,
                                borderBottomRightRadius: 100,
                                flex: 0.15,
                            }}
                        >
                            <SvgCssUri
                                width="100%"
                                height="100%"
                                uri={coalition1.image_url}
                                fill="white"
                            />
                        </View>
                        <Text style={{
                            fontSize: 17,
                            fontWeight: "bold",
                            color: coalition1.color,
                        }}>
                            {coalition1.name}
                        </Text>
                    </View>
                    <View
                        style={{
                            flexDirection: "row",
                            flexWrap: "wrap",
                            alignContent: "center",
                            justifyContent: "center",
                            position: "relative",
                        }}
                    >
                        <Avatar.Image
                            size={150}
                            source={{ uri: `${image}` }}
                            style={styles.img}
                        />

                        <Avatar.Text
                            size={19}
                            style={{
                                backgroundColor: data.location ? "#00A400" : "#606770",
                                position: "absolute",
                                top: "80%",
                                left: "59%",
                            }}
                        />
                    </View>
                    {data.location ? (
                        <Text
                            style={{
                                textAlign: "center",
                                fontWeight: "bold",
                                fontSize: 16,
                                color: "#fff",
                            }}
                        >
                            {data.location}
                        </Text>
                    ) : (
                        <Text
                            style={{
                                textAlign: "center",
                                fontWeight: "bold",
                                fontSize: 16,
                                color: "#fff",
                            }}
                        >
                            unavailable
                        </Text>
                    )}
                </ImageBackground>
                <SafeAreaView
                    style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
                >
                    <View style={{ justifyContent: "center", alignItems: "center" }}>
                        <Text
                            style={{
                                fontWeight: "700",
                                fontSize: 20,
                                color: "#fff",
                                marginTop: 10,
                            }}
                        >
                            {full_name}
                        </Text>
                        <Text
                            style={{
                                fontSize: 15,
                                color: "#fff",
                                marginTop: 20,
                                fontStyle: "italic",
                            }}
                        >
                            {login}
                        </Text>
                        <Text style={{ marginTop: 5, color: "#fff" }}>{email}</Text>
                        <Text style={{ marginTop: 25, color: "#fff" }}>
                            Wallet: {wallet}
                        </Text>
                        <Text style={{ marginTop: 5, color: "#fff" }}>
                            Evaluation Points: {correction_point}
                        </Text>
                        <Text style={{ marginTop: 15, color: "#fff" }}>
                            Cursus: {cursus}
                        </Text>
                        <Text style={{ marginTop: 5, color: "#fff" }}>Grade: {grade}</Text>
                    </View>
                    <View style={{ marginTop: 20, alignItems: "center", justifyContent: 'center' }}>
                        <Progress.Bar
                            progress={level_per}
                            width={300}
                            color={coalition1.color}
                            height={20}
                        >
                            <Text
                                style={{
                                    position: "absolute",
                                    color: "#fff",
                                    fontSize: 11,
                                    marginLeft: 120,
                                }}
                            >
                                Level {level}%
                            </Text>
                        </Progress.Bar>
                    </View>

                    <View style={{ flexDirection: "row", marginTop: 30, marginBottom: 10 }}>
                        <Text style={{ color: "white" }}>Skills</Text>
                        <RadioButton
                            value="second"
                            uncheckedColor="white"
                            color={coalition1.color}
                            status={checked === "first" ? "checked" : "unchecked"}
                            onPress={() => setChecked("first")}
                        />

                        <Text style={{ color: "white" }}>Projects</Text>
                        <RadioButton
                            value="first"
                            uncheckedColor="white"
                            color={coalition1.color}
                            status={checked === "second" ? "checked" : "unchecked"}
                            onPress={() => setChecked("second")}
                        />
                    </View>
                    <View style={{ flexDirection: "column", padding: 5, marginBottom: 30 }}>
                        {checked === "first"
                            ? cursus_skills.map((item, i) => {
                                return (
                                    <View key={item.id} style={{ marginTop: 7, marginBottom: 5 }}>
                                        <View style={{ flexDirection: 'column' }}>
                                            <Text
                                                style={{
                                                    color: "white",
                                                    textAlign: "center",
                                                    marginBottom: 4,
                                                }}
                                            >
                                                {item.name}
                                            </Text>
                                            <Text style={{
                                                fontSize: 12,
                                                fontWeight: "bold",
                                                color: coalition1.color,
                                                alignItems: "flex-end",
                                                marginBottom: 2
                                            }}>{item.level.toFixed(2)}%</Text>
                                        </View>
                                        <ProgressBar
                                            progress={item.level.toFixed(2) / 100}
                                            color={coalition1.color}
                                            style={{ width: 300, height: 5 }}
                                        />
                                    </View>
                                );
                            })
                            : cursus_project.map((item, i) => {
                                return (
                                    <View
                                        style={{
                                            flexDirection: "row",
                                            alignItems: "center",
                                            justifyContent: "space-between",
                                            paddingVertical: 10,
                                            paddingHorizontal: 10,
                                            width: width,
                                            borderBottomWidth: 1,
                                            borderBottomColor: "gray"
                                        }}
                                        key={i}
                                    >
                                        <Text
                                            style={{
                                                fontSize: 15,
                                                color: "#fff",
                                                textAlign: "right",
                                            }}
                                        >
                                            {item.project.slug} :
                                        </Text>
                                        <Text
                                            style={[
                                                styles.text,
                                                item.status !== "finished"
                                                    ? styles.text
                                                    : item.final_mark > 0
                                                        ? styles.green_mark
                                                        : styles.red_mark,
                                            ]}
                                        >
                                            {item.status === "finished"
                                                ? item.final_mark
                                                    ? item.final_mark
                                                    : 0
                                                :
                                                <Icon
                                                    style={{ margin: "auto" }}
                                                    name="clock"
                                                    type="evilicon"
                                                    color="gray"
                                                />}
                                        </Text>
                                    </View>
                                );
                            })}
                    </View>
                </SafeAreaView>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "black"
    },
    image: {
        justifyContent: "center",
        width: "100%",
        height: 250,
    },
    img: {
        width: 150,
        height: 150,
        borderRadius: 100,
    },
    profileImg: {
        width: 500,
        height: 450,
    },

    imagebg: {
        flex: 1,
        resizeMode: "cover",
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
    },

    scroll: {
        width: "100%",
        height: "100%",
    },

    location_border: {
        color: "#fff",
        borderBottomColor: "black",
        borderStyle: "solid",
        borderWidth: 1,
        width: 300,
        height: 100,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 30,
        backgroundColor: "#202026",
    },

    text: {
        fontSize: 15,
        fontWeight: "bold",
        color: "#00babc",
        alignItems: "flex-end",
    },

    red_mark: {
        color: "red",
    },

    green_mark: {
        color: "green",
    },
});

export default Details;