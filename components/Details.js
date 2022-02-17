import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";

const Details = ({ route, navigation }) => {
    const { data } = route.params;
    return (
        <View style={styles.container}>
            <Text>Details :</Text>
            <Text>{data.first_name }</Text>
            <Text>{data.last_name }</Text>
            <Button
                title="Go to Home"
                onPress={() => navigation.push('Home')}
            />
            {/* <Button
                title="ghadi 3nd rachid+"
                onPress={() => navigation.push('Details', {
                    name: "rachid",
                })}
            /> */}
            {/* <Button title="Go back" onPress={() => navigation.goBack()} /> */}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default Details;