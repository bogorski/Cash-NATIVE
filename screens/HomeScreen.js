import React, { useState, useEffect, useRef } from "react";
import {
	TextInput,
	View,
	Button,
	PixelRatio,
	Linking,
	Text,
	StyleSheet,
} from "react-native";
import { Table, Row, Rows } from "react-native-table-component";
import * as Print from "expo-print";
import { shareAsync } from "expo-sharing";
import { Asset } from "expo-asset";
import { manipulateAsync } from "expo-image-manipulator";
import AsyncStorage from "@react-native-async-storage/async-storage";

import Settings from "../screens/SettingsScreen";

const Home = ({ navigation }) => {
	const [data, setData] = useState({});
	/*async () => {
		//const data = await AsyncStorage.getItem("@SettingData"); //get data and store them in constat
		//setData(data || null); //here the state set self
		AsyncStorage.getItem("@SettingData").then((value) =>
			//AsyncStorage returns a promise so adding a callback to get the value
			setData(value)
		);
		console.log(data, "usestate");
	});*/
	//const [data, setData] = useState({});
	const [result, setResult] = useState([]);
	const [loading, setLoading] = useState("false");

	const getValueFunction = () => {
		//function to get the value from AsyncStorage
		AsyncStorage.getItem("@SettingData").then((value) => {
			console.log(value, "1");
			value = JSON.parse(value);
			console.log(value, "2");
			//AsyncStorage returns a promise so adding a callback to get the value
			setData(value);
			//Setting the value in Text
		});
		console.log(data, "3");
	};

	/*useEffect(() => {
		async function fetchBookList() {
			try {
				setLoading("true");
				const response = await AsyncStorage.getItem("@SettingData");
				//const dane = jsonValue != null ? JSON.parse(jsonValue) : null;
				//const json = await response.json();
				//console.log(json);
				const dane = jsonValue != null ? JSON.parse(jsonValue) : null;

				if (value !== null) {
					// We have data!!
					console.log(dane);
				}
				/*	setResult(
					json.items.map((item) => {
						console.log(item.volumeInfo.title);
						return item.volumeInfo.title;
					})
				);*/
	/*	} catch (error) {
				setLoading("null");
			}
		}

		fetchBookList();
		console.log(data);
	}, []);*/

	/*	const getMyObject = async () => {
		try {
			const jsonValue = await AsyncStorage.getItem("@SettingData");
			const dane = jsonValue != null ? JSON.parse(jsonValue) : null;

			setData(dane);
			console.log(data, "data");
			console.log(dane.houseNumber, "dane");
			//console.log(data, "data home");
			//return setData(value);
		} catch (e) {
			console.log(e, "error storage");
			// read error
		}
	};*/
	useEffect(() => {
		getValueFunction();
		console.log(data, "effecr ten1");
	}, [Settings]);

	/*useEffect(() => {
		console.log(data, "effecr ten2");
	}, [data]);*/

	const row = "row-reverse";
	const border =
		"border: 1px solid black; border-collapse: collapse; padding-left: 5px; padding-right: 5px";
	const container = "flex: 1; margin-top: 8; background-color: aliceblue";

	const asset = Asset.fromModule(require("../image/druk.png"));
	const image = manipulateAsync(asset.localUri ?? asset.uri, [], {
		base64: true,
	});

	const [selectedPrinter, setSelectedPrinter] = React.useState();
	const print = async () => {
		// On iOS/android prints the given html. On web prints the HTML from the current page.
		//await getMyObject();
		//console.log(data, "data print");
		//getMyObject();
		await Print.printAsync({
			html,
			printerUrl: selectedPrinter?.url, // iOS only
		});
		//console.log(data, "data print");
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

	const onChangeSeal = (text) => {
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
			blurOnSubmit={false}
		/>
	);

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
	/*	const getMyObject = async () => {
			try {
				const jsonValue = await AsyncStorage.getItem("@SettingData");
				const value = jsonValue != null ? JSON.parse(jsonValue) : null;
				console.log(value, "home storage load");
			} catch (e) {
				console.log(e, "error storage");
				// read error
			}
		};*/
	/*	console.log(data, "data home 1");
		await getMyObject();
		console.log(data, "data home 2");
	}, []);*/

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

	const sendMail = () => {
		const day = new Date().getDate();
		const month = new Date().getMonth() + 1;
		const year = new Date().getFullYear();
		const date = day + "." + month + "." + year;
		//name z locala
		const name = "Mateusz Bogórski";
		const subject = "kasa " + name + " " + date;
		//mail opiekuna z locala
		const adressMail = "mailto:mateusz.b@automatspec.pl?subject=" + subject;
		Linking.openURL(adressMail);
	};
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
										<p>${data.houseNumber}</p>
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
									<div>
										<p>Dotyczy bezpiecznej koperty o nr: ${seal}</p>
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
	//<Button title="Send mail" onPress={sendMail} />
	return (
		<View style={styles.container}>
			<Button title="Pobierz dane" onPress={getValueFunction} />
			<Text>{data.houseNumber}</Text>
			<View>
				<Table borderStyle={{ borderWidth: 2, borderColor: "#c8e1ff" }}>
					<Row data={tableHead} style={styles.head} />
					<Rows data={tableData} />
				</Table>
			</View>
			<TextInput
				style={styles.input}
				onChangeText={onChangeSeal}
				placeholder="Numer plomby"
			/>
			<View style={styles.btn}>
				<View style={styles.styleWidth}>
					<Button title="Drukuj" onPress={print} />
				</View>
				<View style={styles.styleWidth}>
					<Button
						title="Ustawienia"
						onPress={() => navigation.navigate("Ustawienia")}
					/>
				</View>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: "#fff" },
	head: { height: 40, backgroundColor: "#f1f8ff" },
	text: { margin: 6 },
	row: {
		alignItems: "center",
		justifyContent: "center",
		paddingVertical: 12,
		paddingHorizontal: 32,
		borderRadius: 4,
		elevation: 3,
		backgroundColor: "black",
	},
	styleWidth: {
		width: 150,
	},
	styleLoginBtn: {
		flexDirection: "row",
		justifyContent: "space-around",
		marginLeft: 10,
		marginRight: 10,
		marginBottom: 10,
	},
	btn: {
		flexDirection: "row",
		justifyContent: "space-around",
		margin: 12,
	},
	btnText: { textAlign: "center", color: "#fff" },
	input: {
		height: 40,
		margin: 12,
		borderWidth: 1,
		padding: 10,
	},
	spacer: { textAlign: "left" },
});

export default Home;
