import React, { useState } from "react";
import { Text, TextInput, View } from "react-native";

function PizzaTranslator() {
	const [text, setText] = useState("");
	//console.log(text);
	return (
		<TextInput
			style={{ height: 40 }}
			placeholder="Type here to translate!"
			onChangeText={(newText) => setText(newText)}
			defaultValue={text}
		/>
	);
}

export { PizzaTranslator };
