import React, { Component, setState, useState, useEffect, useRef } from "react";
import Canvas, { Image } from "react-native-canvas";
import { Image as RNimage } from "react-native";
import druk from "./image/druk.png";
import {
	Text,
	TextInput,
	StyleSheet,
	View,
	Button,
	TouchableOpacity,
	PixelRatio,
} from "react-native";
import {
	Table,
	Row,
	Rows,
	Cell,
	TableWrapper,
} from "react-native-table-component";
import * as Print from "expo-print";
import { shareAsync } from "expo-sharing";
import { PizzaTranslator } from "./components/myInput";
import { element } from "prop-types";

import { Asset } from "expo-asset";
import { printAsync } from "expo-print";
import { manipulateAsync } from "expo-image-manipulator";

import AsyncStorage from "@react-native-async-storage/async-storage";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";

const row = "row-reverse";
const border =
	"border: 1px solid black; border-collapse: collapse; padding-left: 5px; padding-right: 5px";
const container = "flex: 1; margin-top: 8; background-color: aliceblue";

const Liczenie = ({ navigation }) => {
	const asset = Asset.fromModule(require("./image/druk.png"));
	//console.log(asset.uri, "asset");
	const image = manipulateAsync(asset.localUri ?? asset.uri, [], {
		base64: true,
	});

	//console.log(image, "image");
	const [selectedPrinter, setSelectedPrinter] = React.useState();
	const print = async () => {
		// On iOS/android prints the given html. On web prints the HTML from the current page.
		await Print.printAsync({
			html,
			printerUrl: selectedPrinter?.url, // iOS only
		});
	};

	const printToFile = async () => {
		// On iOS/android prints the given html. On web prints the HTML from the current page.
		const { uri } = await Print.printToFileAsync({ html });
		//console.log("File has been saved to:", uri);
		await shareAsync(uri, { UTI: ".pdf", mimeType: "application/pdf" });
	};
	const refInput1 = useRef();
	const refInput2 = useRef();
	const refInput3 = useRef();
	const refInput4 = useRef();
	const refInput5 = useRef();
	const refInput6 = useRef();

	const onChangeValue = (text, id) => {
		setValue((value) => {
			const thisValue = value[id];
			const sum = (text * thisValue[0]).toFixed(2);
			thisValue.splice(1, 1, text);
			thisValue.splice(2, 1, sum);
			return [...value];
		});
	};

	const onChangePress = () => {
		console.log("button działa");
	};

	const onChangeName = (text) => {
		console.log(text, "text");
		console.log(name, "name");
		setName(text);
	};

	const onChangeSeal = (text) => {
		console.log(text);
		setSeal(text);
	};
	const elementInput = (id, ref, nextRef) => (
		<TextInput
			ref={ref}
			maxLength={5}
			autoFocus={id == 0 ? true : false}
			selectTextOnFocus
			keyboardType="numeric"
			defaultValue="0"
			returnKeyType={"go"}
			onSubmitEditing={() => nextRef.current.focus()}
			value={value[id][1]}
			onChangeText={(value) => onChangeValue(value, id)}
		/>
	);

	const [name, setName] = useState();
	const [seal, setSeal] = useState();
	const [value, setValue] = useState([
		[5, 0, 0],
		[2, 0, 0],
		[1, 0, 0],
		[0.5, 0, 0],
		[0.2, 0, 0],
		[0.1, 0, 0],
	]);

	const [sumValue, setSumValue] = useState(0);
	const [sumQuantity, setSumQuantity] = useState(0);
	useEffect(() => {
		setSumValue((sumValue) => {
			let sum = 0;
			for (let i = 0; i < value.length; i++) {
				sum = parseFloat(sum) + parseFloat(value[i][2]);
			}
			sumValue = parseFloat(sum).toFixed(2);
			return sumValue;
		});
	});
	useEffect(() => {
		setSumQuantity((sumQuantity) => {
			let sum = 0;
			for (let i = 0; i < value.length; i++) {
				let valueInt = parseInt(value[i][1]);
				sum = sum + valueInt;
			}
			sumQuantity = sum;
			return sumQuantity;
		});
	});
	const tableHead = ["Nominał", "Ilość", "Razem"];
	tableData = [
		[value[0][0] + " zł", elementInput(0, refInput1, refInput2), value[0][2]],
		[value[1][0] + " zł", elementInput(1, refInput2, refInput3), value[1][2]],
		[value[2][0] + " zł", elementInput(2, refInput3, refInput4), value[2][2]],
		[value[3][0] + " zł", elementInput(3, refInput4, refInput5), value[3][2]],
		[value[4][0] + " zł", elementInput(4, refInput5, refInput6), value[4][2]],
		[value[5][0] + " zł", elementInput(5, refInput6, refInput1), value[5][2]],
		["Razem", sumQuantity, sumValue],
		["Waga", "Worek ma odpowiednią wagę", "0"],
	];

	const USER_1 = {
		name: "Tom",
		age: 30,
		traits: { hair: "brown" },
	};
	console.log(USER_1.name);

	const storeData = async (value) => {
		try {
			//	const jsonValue = JSON.stringify(USER_1);
			/*await AsyncStorage.setItem("@MyApp_USER_1", jsonValue);
			console.log(jsonValue, "1");
			const aaa = JSON.parse(jsonValue);
			console.log(aaa.name, "2");*/
			console.log(name);
			const value = name;
			await AsyncStorage.setItem("@MyApp_USER_1", value);
		} catch (e) {
			console.log(e, "error storage");
			// saving error
		}
		//console.log(MyApp_USER_1);
		console.log("Done.");
	};

	const getMyObject = async () => {
		try {
			const jsonValue = await AsyncStorage.getItem("@MyApp_USER_1");
			const value = jsonValue != null ? JSON.parse(jsonValue) : null;
			console.log(value.name);
			setName(value.name);
		} catch (e) {
			console.log(e, "error storage");
			// read error
		}

		//	console.log(@MyApp_USER_1);
	};
	//	console.log(@MyApp_USER_1);
	/*const handleSave = async () => {
		storeData();
		console.log(storeData);
	};*/

	const www = PixelRatio.getPixelSizeForLayoutSize(148);
	const hhh = PixelRatio.getPixelSizeForLayoutSize(105);
	const html = `
					<html>
					<head>
						<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no" />
					</head>
					<body>
					<div style="break-after: column;">
						<div>
							<div style="${container}" class="container depositTicket">
								<div style="${row}">
									<div class="col text-center  ">
										<h1>Specyfikacja Wpłaty zamkniętej</h1>
									</div>
								</div>
								<div class="row">
									<div class="col">
										<p>DANE JEDNOSTKI ORGANIZACYJNEJ KLIENTA DOKONUJĄCEJ WPŁATY:</p>
									</div>
								</div>
								<div class="row">
									<div class="col-3">
										<p>Nazwa klienta:</p>
									</div>
									<div class="col-9">
										<p>Robert Stawieraj</p>
									</div>
								</div>
								<div class="row">
									<div class="col-3">
										<p>Ulica</p>
									</div>
									<div class="col-9">
										<p>al. Katowicka 66</p>
									</div>
								</div>
								<div class="row">
									<div class="col-3">
										<p>Kod pocztowy</p>
									</div>
									<div class="col-3">
										<p>05-830</p>
									</div>
									<div class="col-3">
										<p>Miejscowość</p>
									</div>
									<div class="col-3">
										<p>Nadarzyn</p>
									</div>
								</div>
								<div class="row">
									<div class="col">
										<p>WPŁATA DOKONYWANA W ODDZIALE:</p>
									</div>
								</div>
								<div class="row">
									<div class="col-3">
										<p>Miasto</p>
									</div>
									<div class="col-9">
										<p>Warszawa</p>
									</div>
									<div class="col-3">
										<p>Kwota wpłaty</p>
									</div>
									<div class="col-9">
										<p id="depositAmount"></p>
									</div>
									<div class="col-3">
										<p>Słownie</p>
									</div>
									<div class="col-9">
										<p id="amountWords"></p>
									</div>
								</div>
								<div class="row">
									<div class="col">
										<p>SPECYFIKACJA WPŁATY:</p>
									</div>
								</div>
								<div class="row">
									<div class="col-6">
										<p>Dotyczy bezpiecznej koperty o nr:</p>
									</div>
									<div class="col-6">
										<p id="secureNumber"></p>
									</div>
								</div>
							</div>
							<div>
								<div >
									<table style="margin-left: auto; margin-right: auto; ${border}" >
										<thead style="${border}">
											<tr style="${border}">
												<th style="${border}">Nominał</th>
												<th style="${border}">Ilość sztuk</th>
												<th style="${border}">Kwota</th>
												<th style="${border}">Waluta</th>
											</tr>
										</thead>
										<tbody style="${border}">
											<tr style="${border}">
												<td style="${border}">500,00</td>
												<td style="${border}">0</td>
												<td style="${border}">0.00</td>
												<td style="${border}">PLN</td>
											</tr>
											<tr style="${border}">
												<td style="${border}">200,00</td>
												<td style="${border}">0</td>
												<td style="${border}">0.00</td>
												<td style="${border}">PLN</td>
											</tr>
											<tr style="${border}">
												<td style="${border}">100,00</td>
												<td style="${border}">0</td>
												<td style="${border}">0.00</td>
												<td style="${border}">PLN</td>
											</tr>
											<tr style="${border}">
												<td style="${border}">50,00</td>
												<td style="${border}">0</td>
												<td style="${border}">0.00</td>
												<td style="${border}">PLN</td>
											</tr>
											<tr style="${border}">
												<td style="${border}">20,00</td>
												<td style="${border}">0</td>
												<td style="${border}">0.00</td>
												<td style="${border}">PLN</td>
											</tr>
											<tr style="${border}">
												<td style="${border}">10,00</td>
												<td style="${border}">0</td>
												<td style="${border}">0.00</td>
												<td style="${border}">PLN</td>
											</tr>
											<tr style="${border}">
												<td style="${border}">5,00</td>
												<td style="${border}">${value[0][1]}</td>
												<td style="${border}">${value[0][2]}</td>
												<td style="${border}">PLN</td>
											</tr>
											<tr style="${border}">
												<td style="${border}">2,00</td>
												<td style="${border}">${value[1][1]}</td>
												<td style="${border}">${value[1][2]}</td>
												<td style="${border}">PLN</td>
											</tr>
											<tr style="${border}">
												<td style="${border}">1,00</td>
												<td style="${border}">${value[2][1]}</td>
												<td style="${border}">${value[2][2]}</td>
												<td style="${border}">PLN</td>
											</tr>
											<tr style="${border}">
												<td style="${border}">0,50</td>
												<td style="${border}">${value[3][1]}</td>
												<td style="${border}">${value[3][2]}</td>
												<td style="${border}">PLN</td>
											</tr>
											<tr style="${border}">
												<td style="${border}">0,20</td>
												<td style="${border}">${value[4][1]}</td>
												<td style="${border}">${value[4][2]}</td>
												<td style="${border}">PLN</td>
											</tr>
											<tr style="${border}">
												<td style="${border}">0,10</td>
												<td style="${border}">${value[5][1]}</td>
												<td style="${border}">${value[5][2]}</td>
												<td style="${border}">PLN</td>
											</tr>
											<tr style="${border}">
												<td style="${border}">Razem</td>
												<td style="${border}">${sumQuantity}</td>
												<td style="${border}">${sumValue}</td>
												<td style="${border}">PLN</td>
											</tr>
										</tbody>
									</table>
								</div>
							</div>
							<div style="position: relative; background-color: red">
								<img src="${asset.uri}" alt="Image blankiet" width="${www}" height="${hhh}"> 
								<p style="position: absolute; transform: rotate(90deg); top: -7; left: 25">AUTOMATSPEC</p>
							</div>
						</div>
					</body>
					</html>
					`;

	return (
		<View style={styles.container}>
			<Text>Liczenie kasy</Text>

			<TextInput onChangeText={onChangeName} placeholder="Imię i nazwisko" />
			<TextInput onChangeText={onChangeSeal} placeholder="Numer plomby" />
			<Button title="Zapisz" onPress={storeData} />
			<Button title="Wczytaj" onPress={getMyObject} />
			<Text>{name}</Text>
			<View>
				<Table borderStyle={{ borderWidth: 2, borderColor: "#c8e1ff" }}>
					<Row data={tableHead} style={styles.head} />
					<Rows data={tableData} />
				</Table>
			</View>
			<Button title="Print" onPress={print} />
			<Button
				title="Go to Settings"
				onPress={() => navigation.navigate("Ustawienia")}
			/>
		</View>
	);
};
const styles = StyleSheet.create({
	container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: "#fff" },
	head: { height: 40, backgroundColor: "#f1f8ff" },
	text: { margin: 6 },
	row: { flexDirection: "row", backgroundColor: "#FFF1C1" },
	btn: { width: 58, height: 18, backgroundColor: "#78B7BB", borderRadius: 2 },
	btnText: { textAlign: "center", color: "#fff" },
	input: { color: "red " },
	spacer: { textAlign: "left" },
});
const Ustawienia = ({ navigation }) => {
	const handleBack = async () => {
		try {
			const jsonValue = await AsyncStorage.getItem("@MyApp_USER_1");
			//const value = jsonValue != null ? JSON.parse(jsonValue) : null;
			console.log(jsonValue);
			//	setName(value.name);
		} catch (e) {
			console.log(e, "error storage");
			// read error
		}

		///	console.log(@MyApp_USER_1);
	};
	const onChange = () => {};
	return (
		<View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
			<Button title="Go back" onPress={() => navigation.goBack()} />
			<Button title="Back" onPress={handleBack} />
			<View>
				<Text>Imię i nazwisko</Text>
				<TextInput onChangeText={onChange} value={""} />
			</View>
		</View>
	);
};
const Stack = createNativeStackNavigator();
function MyStack() {
	return (
		<Stack.Navigator>
			<Stack.Screen name="Liczenie" component={Liczenie} />
			<Stack.Screen name="Ustawienia" component={Ustawienia} />
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
//export default Home;
