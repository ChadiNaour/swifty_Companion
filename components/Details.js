import React, { useState } from "react";
import {
    SafeAreaView,
    View,
    Text,
    Image,
    StyleSheet,
    ImageBackground,
    ScrollView,
} from "react-native";
import imagebg from "../assets/42.jpeg";
import defaultImage from "../assets/default_img.png";
import * as Progress from "react-native-progress";
import { Icon } from "react-native-elements";
import { RadioButton, Avatar, ProgressBar } from "react-native-paper";

const Details = ({ route, navigation }) => {
    const [checked, setChecked] = useState("first");
    const { data, coalition } = route.params;

    const full_name = data.first_name + " " + data.last_name;
    const image = data.image_url;
    const login = data.login;
    const level = data.cursus_users[2]
        ? data.cursus_users[2].level
        : data.cursus_users[0].level;
    const location = data.location;
    const email = data.email;
    const wallet = data.wallet + " ₳";
    const correction_point = data.correction_point;
    const cursus = data.cursus_users[2]
        ? data.cursus_users[2].cursus.name
        : data.cursus_users[0].cursus.name;
    const grade = data.cursus_users[2]
        ? data.cursus_users[2].grade
        : data.cursus_users[0].grade;
    const cursus_skills = data.cursus_users[0].skills;
    const cursus_project = data.projects_users;

    const level_per = (level % 100) - parseInt(level);
    const coalition1 = coalition.length > 0 ? coalition[0] : coalition;
    let arr = [];
    data?.cursus_users.map((el, key) => arr.push(el.cursus.name));
    const cover = {
        uri: `${coalition1?.cover_url}`,
    };
    const img_coallition = {
        uri: `${coalition1?.image_url}`,
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
                            {/* <SvgUri
                            uri={coalition1.image_url}
                            width={"100%"}
                            height={"100%"}
                            fill="#fff"
                        /> */}
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
                            source={{ uri: `${data.image_url}` }}
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
                    {/* <ModalDropdown
                    options={arr}
                    animated={true}
                    defaultIndex={0}
                    // onSelect={(e) => setvalue(e)}
                /> */}
                    {/* // <Icon type="font-awesome-5" name="sort-down" color="#000" /> */}
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
                {/* <View>
                    {image ? (
                        <Image style={styles.profileImg} source={{ uri: image }} />
                    ) : (
                            <Image style={styles.profileImg} source={{ uri: defaultImage }} />
                        )}
                </View> */}
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
                    <View style={{ marginTop: 20, alignItems: "center" }}>
                        <Progress.Bar
                            progress={level_per}
                            width={290}
                            color={coalition1.color}
                            height={15}
                        >
                            <Text
                                style={{
                                    position: "absolute",
                                    color: "#fff",
                                    fontSize: 12,
                                    marginLeft: 120,
                                }}
                            >
                                {level}
                            </Text>
                        </Progress.Bar>
                    </View>

                    <View style={{ flexDirection: "row", marginTop: 30 }}>
                        <Text style={{ color: "white" }}>Projects</Text>
                        <RadioButton
                            value="first"
                            uncheckedColor="white"
                            color={coalition1.color}
                            status={checked === "first" ? "checked" : "unchecked"}
                            onPress={() => setChecked("first")}
                        />

                        <Text style={{ color: "white" }}>Skills</Text>
                        <RadioButton
                            value="second"
                            uncheckedColor="white"
                            color={coalition1.color}
                            status={checked === "second" ? "checked" : "unchecked"}
                            onPress={() => setChecked("second")}
                        />
                    </View>
                    <View style={{ flexDirection: "column", padding: 5, marginBottom: 30 }}>
                        {checked === "second"
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
                                            progress={(item.level / 10).toFixed(2)}
                                            color={coalition1.color}
                                            style={{ width: 280, height: 5 }}
                                        />
                                    </View>
                                    // <View
                                    //     style={{
                                    //         flexDirection: "row",
                                    //         alignItems: "center",
                                    //         justifyContent: "space-between",
                                    //     }}
                                    //     key={i}
                                    // >
                                    //     <Text
                                    //         style={{
                                    //             fontSize: 18,
                                    //             color: "#fff",
                                    //             textAlign: "right",
                                    //         }}
                                    //     >
                                    //         {item.name}:{" "}
                                    //     </Text>
                                    //     <Text style={styles.text}>{item.level}%</Text>
                                    // </View>
                                );
                            })
                            : cursus_project.map((item, i) => {
                                return (
                                    <View
                                        style={{
                                            flexDirection: "row",
                                            alignItems: "center",
                                            justifyContent: "space-between",
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
        // flex: 1,
        justifyContent: "center",
        width: "100%",
        height: 250,
    },
    img: {
        width: 150,
        height: 150,
        borderRadius: 100,
        // marginTop: 10,
        // marginBottom: 10
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