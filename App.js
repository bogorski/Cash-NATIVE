import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import Settings from "./screens/SettingsScreen";
import Home from "./screens/HomeScreen";

/*const Liczenie = ({ navigation }) => {

	const row = "row-reverse";
const border =
	"border: 1px solid black; border-collapse: collapse; padding-left: 5px; padding-right: 5px";
const container = "flex: 1; margin-top: 8; background-color: aliceblue";
	const asset = Asset.fromModule(require("./image/druk.png"));
	
	const image = manipulateAsync(asset.localUri ?? asset.uri, [], {
		base64: true,
	});
	const [selectedPrinter, setSelectedPrinter] = React.useState();
	const print = async () => {
		await Print.printAsync({
			html,
			printerUrl: selectedPrinter?.url, // iOS only
		});
	};

	const printToFile = async () => {
		const { uri } = await Print.printToFileAsync({ html });
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
			blurOnSubmit={false}
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
	//<Button title="Send mail" onPress={sendMail} />
	return (
		<View style={styles.container}>
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
					<Button title="Print" onPress={print} />
				</View>
				<View style={styles.styleWidth}>
					<Button
						title="Go to Settings"
						onPress={() => navigation.navigate("Ustawienia")}
					/>
				</View>
			</View>
		</View>
	);
};*/
/*const ElementInput = ({
	innerRef,
	onSubmitEditing,
	placeholder,
	autoFocus,
	value,
	onChangeText,
	id,
	...props
}) => (
	<TextInput
		ref={innerRef}
		placeholder={placeholder}
		returnKeyType="next"
		onSubmitEditing={onSubmitEditing}
		blurOnSubmit={false}
		autoFocus={autoFocus}
		selectTextOnFocus
		onChangeText={(value) => onChangeText(id, value)}
		value={value}
		id={id}
		{...props}
	/>
);*/
/*const Ustawienia = ({ navigation }) => {
	const refInput1 = useRef();
	const refInput2 = useRef();
	const refInput3 = useRef();
	const refInput4 = useRef();
	const refInput5 = useRef();
	const refInput6 = useRef();
	const refInput7 = useRef();
	const refInput8 = useRef();
	const refInput9 = useRef();
	const refInput10 = useRef();
	const refInput11 = useRef();
	const refInput12 = useRef();
	const refInput13 = useRef();
	const refInput14 = useRef();
	const [data, setData] = useState({
		fullName: "",
		street: "",
		houseNumber: "",
		flatNumber: "",
		city: "",
		postCode: "",
		recipientName: "",
		recipientStreet: "",
		recipientHouseNumber: "",
		recipientFlatNumber: "",
		recipientCity: "",
		recipientPostCode: "",
		accountNumber: "",
		transferTitle: "",
	});
	useEffect(() => {
		const backAction = () => {
			backAlert();
			return true;
		};

		const backHandler = BackHandler.addEventListener(
			"hardwareBackPress",
			backAction
		);

		return () => backHandler.remove();
	}, []);
	useEffect(() => {
		async function getData() {
			try {
				const jsonValue = await AsyncStorage.getItem("@SettingData");
				const value = jsonValue != null ? JSON.parse(jsonValue) : null;
				console.log(value);
				return setData((data) => ({
					...data,
					...value,
				}));
			} catch (e) {
				console.log(e, "error storage");
			}
		}
		getData();
	}, []);
	const sendDataAlert = () => {
		Alert.alert("Zapisano", "Twoje dane zostały pomyślnie zaktualizowane", [
			{ text: "OK", onPress: () => storeData() },
		]);
	};

	const backAlert = () => {
		Alert.alert("Wróc", "Czy chcesz wyjść bez zapisania danych", [
			{
				text: "Nie",
				onPress: () => console.log("Cancel Pressed"),
				style: "cancel",
			},
			{ text: "Tak", onPress: () => navigation.goBack() },
		]);
	};

	const storeData = async (value) => {
		try {
			console.log(data, "data");
			value = data;
			console.log(value), "value";
			const jsonValue = JSON.stringify(value);
			console.log(jsonValue, "jsonValue");
			await AsyncStorage.setItem("@SettingData", jsonValue);
		} catch (e) {
			console.log(e, "error storage");
		}
		console.log("Done.");
		navigation.goBack();
	};
	const onChange = () => {};

	const onChangeValue = (id, value) => {
		setData((data) => ({
			...data,
			[id]: value,
		}));
		console.log(data, "data");
	};

	return (
		<ScrollView>
			<View>
				<Text>DANE JEDNOSTKI ORGANIZACYJNEJ KLIENTA DOKONUJĄCEJ WPŁATY</Text>
				<ElementInput
					id={"fullName"}
					value={data.fullName}
					innerRef={refInput1}
					placeholder={"Imię i nazwisko"}
					autoFocus={true}
					onSubmitEditing={() => refInput2.current.focus()}
					onChangeText={onChangeValue}
					style={styles.input}
				/>
				<ElementInput
					id={"street"}
					value={data.street}
					innerRef={refInput2}
					placeholder={"Ulica"}
					onSubmitEditing={() => refInput3.current.focus()}
					onChangeText={onChangeValue}
					style={styles.input}
				/>
				<ElementInput
					id={"houseNumber"}
					value={data.houseNumber}
					innerRef={refInput3}
					placeholder={"Nr domu"}
					onSubmitEditing={() => refInput4.current.focus()}
					onChangeText={onChangeValue}
					style={styles.input}
				/>
				<ElementInput
					id={"flatNumber"}
					value={data.flatNumber}
					innerRef={refInput4}
					placeholder={"Nr mieszkania"}
					onSubmitEditing={() => refInput5.current.focus()}
					onChangeText={onChangeValue}
					style={styles.input}
				/>
				<ElementInput
					id={"city"}
					value={data.city}
					innerRef={refInput5}
					placeholder={"Miejscowość"}
					onSubmitEditing={() => refInput6.current.focus()}
					onChangeText={onChangeValue}
					style={styles.input}
				/>
				<ElementInput
					id={"postCode"}
					value={data.postCode}
					innerRef={refInput6}
					placeholder={"Kod pocztowy"}
					onSubmitEditing={() => refInput7.current.focus()}
					onChangeText={onChangeValue}
					style={styles.input}
				/>
			</View>
			<View>
				<Text>DANE BANKOWEGO DOWODU WPŁATY</Text>
				<ElementInput
					id={"recipientName"}
					value={data.recipientName}
					innerRef={refInput7}
					placeholder={"Nazwa właściciela rachunku"}
					onSubmitEditing={() => refInput8.current.focus()}
					onChangeText={onChangeValue}
					style={styles.input}
				/>
				<ElementInput
					id={"recipientStreet"}
					value={data.recipientStreet}
					innerRef={refInput8}
					placeholder={"Ulica"}
					onSubmitEditing={() => refInput9.current.focus()}
					onChangeText={onChangeValue}
					style={styles.input}
				/>
				<ElementInput
					id={"recipientHouseNumber"}
					value={data.recipientHouseNumber}
					innerRef={refInput9}
					placeholder={"Nr domu"}
					onSubmitEditing={() => refInput10.current.focus()}
					onChangeText={onChangeValue}
					style={styles.input}
				/>
				<ElementInput
					id={"recipientFlatNumber"}
					value={data.recipientFlatNumber}
					innerRef={refInput10}
					placeholder={"Nr lokalu"}
					onSubmitEditing={() => refInput11.current.focus()}
					onChangeText={onChangeValue}
					style={styles.input}
				/>
				<ElementInput
					id={"recipientCity"}
					value={data.recipientCity}
					innerRef={refInput11}
					placeholder={"Miejscowość"}
					onSubmitEditing={() => refInput12.current.focus()}
					onChangeText={onChangeValue}
					style={styles.input}
				/>
				<ElementInput
					id={"recipientPostCode"}
					value={data.recipientPostCode}
					innerRef={refInput12}
					placeholder={"Kod pocztowy"}
					onSubmitEditing={() => refInput13.current.focus()}
					onChangeText={onChangeValue}
					style={styles.input}
				/>
				<ElementInput
					id={"accountNumber"}
					value={data.accountNumber}
					innerRef={refInput13}
					placeholder={"Nr rachunku bankowego"}
					onSubmitEditing={() => refInput14.current.focus()}
					onChangeText={onChangeValue}
					style={styles.input}
				/>
				<ElementInput
					id={"transferTitle"}
					value={data.transferTitle}
					innerRef={refInput14}
					placeholder={"Tytuł przelewu"}
					//onSubmitEditing={() => refInput14.current.focus()}
					onChangeText={onChangeValue}
					style={styles.input}
				/>
				<View style={styles.styleLoginBtn}>
					<View style={styles.styleWidth}>
						<Button title="Wróć" onPress={backAlert} />
					</View>
					<View style={styles.styleWidth}>
						<Button title="Zapisz" onPress={sendDataAlert} />
					</View>
				</View>
			</View>
		</ScrollView>
	);
};
*/
const Stack = createNativeStackNavigator();
function MyStack() {
	return (
		<Stack.Navigator>
			<Stack.Screen name="Liczenie" component={Home} />
			<Stack.Screen name="Ustawienia" component={Settings} />
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
