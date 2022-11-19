import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import * as React from "react";
import { Button, View } from "react-native";

function Home({ navigation }) {
	return (
		<View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
			<Button
				title="Go to Settings"
				onPress={() => navigation.navigate("Settings")}
			/>
		</View>
	);
}

function Settings({ navigation }) {
	return (
		<View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
			<Button title="Go back" onPress={() => navigation.goBack()} />
		</View>
	);
}

const Stack = createNativeStackNavigator();

function MyStack() {
	return (
		<Stack.Navigator>
			<Stack.Screen name="Home" component={Home} />
			<Stack.Screen name="Settings" component={Settings} />
		</Stack.Navigator>
	);
}

export default function App() {
	return (
		<NavigationContainer>
			<MyStack />
		</NavigationContainer>
	);
}
