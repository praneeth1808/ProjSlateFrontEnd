import "./App.css";
import React, { Component, useState, useEffect } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import useSpeechToText from "react-hook-speech-to-text";
import DisplayJson from "./Components/DisplayJson";
import fixed_recording from "./assets/fixed.gif";
import live_recording from "./assets/listening.gif";
import Blink from "react-blink-text";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
import "react-notifications/lib/notifications.css";
// const URI = "https://proj-slate-backend.herokuapp.com";
const URI = "http://127.0.0.1:5000";

function MyForm() {
  const [text, setText] = useState("");
  const [data, setData2] = useState({});
  const [activeTab, setActiveTab] = useState("Model");
  const [processedText, setProcessedText] = useState("");
  const {
    error,
    interimResult,
    isRecording,
    results,
    startSpeechToText,
    stopSpeechToText,
    setResults,
  } = useSpeechToText({
    continuous: true,
    useLegacyResults: false,
    crossBrowser: true,
    googleApiKey: "YOUR_GOOGLE_CLOUD_API_KEY_HERE",
    timeout: 10000000,
  });
  const setData = (data) => {
    console.log("Here");
    console.log(data);
    if (
      data &&
      data.CurrentProcess &&
      data.CurrentProcess.Action &&
      data.CurrentProcess.Action == "SwitchTab" &&
      data.CurrentProcess.value &&
      data.CurrentProcess.value.length > 0
    ) {
      setActiveTab(data.CurrentProcess.value);
      setData2({
        messageType: "",
        message: "",
        CurrentProcess: {},
        Results: data.Results,
        Scores: data.Scores,
        model: data.model,
        Graphs: data.Graphs,
      });
      
    } else if (
      data &&
      data.message &&
      data.message.length > 0 &&
      data.messageType &&
      data.messageType.length > 0
    ) {
      if (data.messageType == "Info") {
        NotificationManager.info(data.message, "", 5000);
      } else {
        NotificationManager.error(data.message, "", 5000);
      }
      setData2({
        messageType: "",
        message: "",
        CurrentProcess: {},
        Results: data.Results,
        Scores: data.Scores,
        model: data.model,
        Graphs: data.Graphs,
      });
    } else {
      setData2(data);
    }
  };
  const ProcessResults = () => {
    if (results.length > 0 && results[0].transcript != [processedText]) {
      setProcessedText(results[0].transcript);
      if (results[0].transcript.toLowerCase().trim() == "stop") {
        stopSpeechToText();
        return <></>;
      } else {
        const response = fetch(`${URI}/process/?text=${results[0].transcript}`)
          .then((res) => res.json())
          .then((actualData) => setData(actualData));
        setResults([]);
      }
      return <></>;
    }
  };
  const handleReset = async (event) => {
    const response = await fetch(`${URI}/resetModel`)
      .then((res) => res.json())
      .then((actualData) => setData(actualData));
  };
  const onKeyPress = (event) => {
    if (event.keyCode == 13) {
      const response = fetch(`${URI}/process/?text=${text}`)
        .then((res) => res.json())
        .then((actualData) => setData(actualData));
    }
  };
  useEffect(() => {
    handleReset(null);
  }, []);
  return (
    <div>
      <div
        style={{
          display: "flex",
          padding: "10px 10px 0px 10px",
        }}
      >
        <NotificationContainer />
        <div
          style={{ paddingRight: 10 }}
          onClick={isRecording ? stopSpeechToText : startSpeechToText}
        >
          <div
            style={{
              width: window.innerWidth * 0.08,
              height: window.innerWidth * 0.05,
              background: "white",
            }}
          >
            {isRecording && (
              <div style={{ height: "66px" }}>
                <img
                  style={{
                    height: 50,
                    paddingLeft: window.innerWidth * 0.01,
                    paddingRight: window.innerWidth * 0.01,
                    borderRadius: "100%",
                    background: "#ffb6b6",
                  }}
                  src={live_recording}
                  alt="loading..."
                />
              </div>
            )}
            {!isRecording && (
              <div style={{ height: "66px" }}>
                <img
                  style={{
                    height: 50,
                    paddingLeft: window.innerWidth * 0.01,
                    paddingRight: window.innerWidth * 0.01,
                    borderRadius: "100%",
                    background: "#ff3f3f",
                  }}
                  src={fixed_recording}
                  alt="loading..."
                />
                <div
                  style={{
                    zoom: 0.7,
                    margin: "-1px -1px -1px 6px",
                  }}
                >
                  <Blink color="#6b0d45" text="Click Me !!" fontSize="20">
                    Click Me !!
                  </Blink>
                </div>
              </div>
            )}
          </div>
        </div>
        {results && ProcessResults()}
        {isRecording && (
          <TextField
            label={"Recording ..!!"}
            value={
              results.length > 0 && results[0].transcript
                ? results[0].transcript
                : interimResult
            }
            id="outlined-basic"
            variant="outlined"
            fullWidth={true}
            onChange={(e) => setText(e.target.value)}
            style={{ width: window.innerWidth * 0.9, padding: 0 }}
            onKeyDown={onKeyPress}
            disabled={true}
            defaultValue={" "}
          />
        )}
        {!isRecording && (
          <TextField
            label={"Enter Command"}
            value={
              results.length > 0 && results[0].transcript
                ? results[0].transcript
                : interimResult
            }
            id="outlined-basic"
            variant="outlined"
            fullWidth={true}
            onChange={(e) => setText(e.target.value)}
            style={{ width: window.innerWidth * 0.9, padding: 0 }}
            onKeyDown={onKeyPress}
          />
        )}
      </div>
      <DisplayJson
        data={data}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />
    </div>
  );
}

function App() {
  return (
    <div className="App">
      <MyForm />
    </div>
  );
}

export default App;
