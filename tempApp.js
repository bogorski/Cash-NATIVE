export default class ExampleOne extends Component {
	constructor(props) {
		super(props);
		const elementButton = (value) => (
			<TextInput style={styles.input} onChange={this.onChangeText}>
				{value}
			</TextInput>
		);
		this.onChangeText = this.onChangeText.bind(this);
		this.state = {
			name: "fgh",
			data: "elo",
			tableHead: ["Nominał", "Ilość", "Razem"],
			tableData: [
				["5 zł", elementButton(), "500"],
				["2 zł", "0", "0"],
				["1 zł", "0", "0"],
				["50 gr", "0", "0"],
				["20 gr", "0", "0"],
				["10 gr", "0", "0"],
				["Razem", "0", "0"],
				["Waga", "Worek ma odpowiednią wagę", "0"],
			],
		};
		//this.setText = this.setText.bind(this);

		/*const elementButton = (value) => (
			<View style={styles.btn}>
				<TextInput style={styles.btnText} value={this.state.searchtext}>
					0
				</TextInput>
			</View>
		);*/
	}

	onChangeText() {
		//let array_of_data = this.state.tableData.map((object) => ({})); // the right way copy the array of object without reference
		//	array_of_data.splice(1, 1);
		console.log(this.state.tableData[0][1].value);
		//console.log(array_of_data);
		/*console.log("elo");
		let table = this.state.tableData[1][1];
		console.log(table);*/
		//	let item = table[1];
		//this.setState({ array_data: array_of_data });
	}

	/*changeText = (text) => {
		this.setState({ name: text });
		//const value = text * 5;
		//	console.log(elementButton);
		//const inputValue = tableData;
		/*this.setState({ inputValue: value });
	};*/
	render() {
		const state = this.state;
		const html = `
        <html>
            <body>
                <h2>Hi </h2>
                <h4>Email: </h4>
                <h4>Address:</h4>
            </body>
        </html>
    `;
		/*const element = (value) => (
			<View style={styles.btn}>
				<TextInput keyboardType="numeric" onChangeText={this.changeText}>
					input
				</TextInput>
			</View>
		);*/

		const element = (data, index) => {
			return <PizzaTranslator />;
		};
		const generatePdf = async () => {
			const file = await printToFileAsync({
				html: html,
				base64: false,
			});
			await shareAsync(file.uri);
		};
		return (
			<View style={styles.container}>
				<Table borderStyle={{ borderWidth: 2, borderColor: "#c8e1ff" }}>
					<Row
						data={state.tableHead}
						style={styles.head}
						//textStyle={styles.text}
					/>
					<Rows data={state.tableData} />
				</Table>
				<Text>{state.tableData[1][0]}</Text>
				<Text>{state.name}</Text>
				<PizzaTranslator></PizzaTranslator>
				<Button title="generate Pdf" onPress={generatePdf} />
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: "#fff" },
	head: { height: 40, backgroundColor: "#f1f8ff" },
	text: { margin: 6 },
	row: { flexDirection: "row", backgroundColor: "#FFF1C1" },
	btn: { width: 58, height: 18, backgroundColor: "#78B7BB", borderRadius: 2 },
	btnText: { textAlign: "center", color: "#fff" },
	input: { color: "red " },
});
