import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
	const [inputText, setInputText] = useState("");
	const [translatedText, setTranslatedText] = useState("");
	const [targetLanguage, setTargetLanguage] = useState("es"); // Spanish by default

	useEffect(() => {
		const translateText = async (text, targetLang = "es") => {
			if (!text.trim()) {
				setTranslatedText("");
				return;
			}

			try {
				const res = await fetch("https://libretranslate.com/translate", {
					method: "POST",
					body: JSON.stringify({
						q: text,
						source: "auto",
						target: targetLang,
						format: "text",
						alternatives: 1,
						api_key: "", // Optional
					}),
					headers: { "Content-Type": "application/json" },
        });
        //console.log(await res.json());

				const data = await res.json();
				console.log("Translation result:", data);
				setTranslatedText(data.translatedText);
			} catch (err) {
				console.error("Fetch error:", err);
				setTranslatedText("Translation failed.");
			}
		};

		const timeoutID = setTimeout(() => {
			translateText(inputText, targetLanguage);
		}, 500); // Debounce delay

		return () => clearTimeout(timeoutID);
	}, [inputText, targetLanguage]);

	return (
		<div className="App">
			<h2>Real-Time Translator</h2>

			<textarea
				placeholder="Type something..."
				rows="4"
				value={inputText}
				onChange={(e) => setInputText(e.target.value)}
			/>

			<select
				value={targetLanguage}
				onChange={(e) => setTargetLanguage(e.target.value)}
			>
				<option value="es">Spanish</option>
				<option value="fr">French</option>
				<option value="de">German</option>
				<option value="ar">Arabic</option>
				<option value="zh">Chinese</option>
				<option value="ru">Russian</option>
			</select>

			<div className="output">
				<strong>Translation:</strong>
				<p>{translatedText}</p>
			</div>
		</div>
	);
}

export default App;