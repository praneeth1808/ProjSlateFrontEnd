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
  const handleSubmit = async (event) => {
    const response = await fetch(`${URI}/process/?text=${text}`)
      .then((res) => res.json())
      .then((actualData) => setData(actualData));
  };
  const handleReset = async (event) => {
    const response = await fetch(`${URI}/resetModel`)
      .then((res) => res.json())
      .then((actualData) => setData(actualData));
  };

  const handleDataSetlect = async (event) => {
    const response = await fetch(`${URI}/process/?text=Select Iris DataSet`)
      .then((res) => res.json())
      .then((actualData) => setData(actualData));
  };
  const handleStandardization = async (event) => {
    const response = await fetch(`${URI}/process/?text=Apply Standardization`)
      .then((res) => res.json())
      .then((actualData) => setData(actualData));
  };
  const handleSplitAndTrain = async (event) => {
    const response = await fetch(
      `${URI}/process/?text=split the dataset into split and train`
    )
      .then((res) => res.json())
      .then((actualData) => setData(actualData));
  };
  const handleStndize1Col = async (event) => {
    const response = await fetch(
      `${URI}/process/?text=Apply Standardization for sepal width`
    )
      .then((res) => res.json())
      .then((actualData) => setData(actualData));
  };
  const handleStndize1Col2 = async (event) => {
    const response = await fetch(
      `${URI}/process/?text=Apply Standardization for sepal length`
    )
      .then((res) => res.json())
      .then((actualData) => setData(actualData));
  };
  const handleDataSetlectSales = async (event) => {
    const response = await fetch(`${URI}/process/?text=Select Sales data set`)
      .then((res) => res.json())
      .then((actualData) => setData(actualData));
  };
  const handleLinearRegression = async (event) => {
    const response = await fetch(`${URI}/process/?text=apply Linear regression`)
      .then((res) => res.json())
      .then((actualData) => setData(actualData));
  };
  const handleRemoveNulls = async (event) => {
    const response = await fetch(`${URI}/process/?text=Remove null values`)
      .then((res) => res.json())
      .then((actualData) => setData(actualData));
  };
  const handleRemoveNulls_Columns = async (event) => {
    const response = await fetch(`${URI}/process/?text=Columns`)
      .then((res) => res.json())
      .then((actualData) => setData(actualData));
  };
  const handleRemoveNulls_Rows = async (event) => {
    const response = await fetch(`${URI}/process/?text=Rows`)
      .then((res) => res.json())
      .then((actualData) => setData(actualData));
  };
  const handleRemoveNulls_SepalWidth = async (event) => {
    const response = await fetch(
      `${URI}/process/?text=Remove nulls from SepalWidth`
    )
      .then((res) => res.json())
      .then((actualData) => setData(actualData));
  };
  const handleRemoveNulls_PetalWidth = async (event) => {
    const response = await fetch(
      `${URI}/process/?text=Remove nulls from Petal Width`
    )
      .then((res) => res.json())
      .then((actualData) => setData(actualData));
  };
  const handleReplaceNulls_mean = async (event) => {
    const response = await fetch(
      `${URI}/process/?text=Replace all null values with mean`
    )
      .then((res) => res.json())
      .then((actualData) => setData(actualData));
  };
  const handleReplaceNulls_mode_PetalWidth = async (event) => {
    const response = await fetch(
      `${URI}/process/?text=Replace nulls from Petal length with mode`
    )
      .then((res) => res.json())
      .then((actualData) => setData(actualData));
  };
  const handleReplaceNulls_mean_sepalWidth = async (event) => {
    const response = await fetch(
      `${URI}/process/?text=Replace nulls from SepalWidth with mean`
    )
      .then((res) => res.json())
      .then((actualData) => setData(actualData));
  };
  const handleIQR = async (event) => {
    const response = await fetch(`${URI}/process/?text=use IQR`)
      .then((res) => res.json())
      .then((actualData) => setData(actualData));
  };
  const handleZScore = async (event) => {
    const response = await fetch(`${URI}/process/?text=use Z Score`)
      .then((res) => res.json())
      .then((actualData) => setData(actualData));
  };
  const handleTestFlow = async (event) => {
    var response = "";
    response = await fetch(`${URI}/resetModel`);
    response = await fetch(`${URI}/process/?text=Select Iris DataSet`);
    response = await fetch(
      `${URI}/process/?text=Replace all null values with mean`
    );
    response = await fetch(`${URI}/process/?text=Remove null values`);
    response = await fetch(`${URI}/process/?text=Apply Normalization`);
    response = await fetch(`${URI}/process/?text=Apply Standardization`);
    response = await fetch(
      `${URI}/process/?text=split the dataset into split and train`
    );
    response = await fetch(`${URI}/process/?text=apply Decission tree model`)
      .then((res) => res.json())
      .then((actualData) => setData(actualData));
  };
  const handleTestFlow_LR = async (event) => {
    var response = "";
    response = await fetch(`${URI}/resetModel`);
    response = await fetch(`${URI}/process/?text=Select Iris DataSet`);
    response = await fetch(
      `${URI}/process/?text=Replace all null values with mean`
    );
    response = await fetch(`${URI}/process/?text=Apply Normalization`);
    response = await fetch(
      `${URI}/process/?text=split the dataset into split and train`
    );
    response = await fetch(`${URI}/process/?text=apply Linear Regression`)
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
    handleDataSetlect(null);
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

          {/* <Button
            variant="contained"
            onClick={isRecording ? stopSpeechToText : startSpeechToText}
          >
            {isRecording ? "Stop Recording" : "Start Recording"}
          </Button> */}
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
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          alignContent: "flex-end",
          paddingLeft: 30,
        }}
      >
        <div style={{ padding: 10 }}>
          <Button variant="contained" onClick={handleReset}>
            Reset
          </Button>
        </div>
        <div style={{ padding: 10 }}>
          <Button variant="contained" onClick={handleDataSetlect}>
            Select Iris
          </Button>
        </div>
        <div style={{ padding: 10 }}>
          <Button variant="contained" onClick={handleDataSetlectSales}>
            Select Sales
          </Button>
        </div>
        <div style={{ padding: 10 }}>
          <Button variant="contained" onClick={handleStandardization}>
            Standardization
          </Button>
        </div>
        <div style={{ padding: 10 }}>
          <Button variant="contained" onClick={handleSplitAndTrain}>
            Split to Train & Test
          </Button>
        </div>
        <div style={{ padding: 10 }}>
          <Button variant="contained" onClick={handleLinearRegression}>
            Apply Linear Regression
          </Button>
        </div>
        <div style={{ padding: 10 }}>
          <Button variant="contained" onClick={handleStndize1Col}>
            Stndize-SepalWidth
          </Button>
        </div>
        <div style={{ padding: 10 }}>
          <Button variant="contained" onClick={handleStndize1Col2}>
            Stndize-SepalLength
          </Button>
        </div>
        <div style={{ padding: 10 }}>
          <Button variant="contained" onClick={handleRemoveNulls}>
            Remove Nulls
          </Button>
        </div>
        <div style={{ padding: 10 }}>
          <Button variant="contained" onClick={handleRemoveNulls_Rows}>
            follow_Remove Nulls-Rows
          </Button>
        </div>
        <div style={{ padding: 10 }}>
          <Button variant="contained" onClick={handleRemoveNulls_Columns}>
            follow_Remove Nulls-columns
          </Button>
        </div>
        <div style={{ padding: 10 }}>
          <Button variant="contained" onClick={handleRemoveNulls_SepalWidth}>
            RemoveNulls_sepalwidth
          </Button>
        </div>
        <div style={{ padding: 10 }}>
          <Button variant="contained" onClick={handleRemoveNulls_PetalWidth}>
            RemoveNulls_PetalWidth
          </Button>
        </div>
        <div style={{ padding: 10 }}>
          <Button variant="contained" onClick={handleReplaceNulls_mean}>
            ReplaceNulls-Mean
          </Button>
        </div>
        <div style={{ padding: 10 }}>
          <Button
            variant="contained"
            onClick={handleReplaceNulls_mean_sepalWidth}
          >
            ReplaceNulls-Mean-SeaplWidth
          </Button>
        </div>
        <div style={{ padding: 10 }}>
          <Button
            variant="contained"
            onClick={handleReplaceNulls_mode_PetalWidth}
          >
            ReplaceNulls-mode-PetalWidth
          </Button>
        </div>
        <div style={{ padding: 10 }}>
          <Button variant="contained" onClick={handleIQR}>
            Use IQR
          </Button>
        </div>
        <div style={{ padding: 10 }}>
          <Button variant="contained" onClick={handleZScore}>
            Use ZScore
          </Button>
        </div>
        <div style={{ padding: 10 }}>
          <Button variant="contained" onClick={handleTestFlow}>
            Test Happy flow Decission Tree
          </Button>
        </div>
        <div style={{ padding: 10 }}>
          <Button variant="contained" onClick={handleTestFlow_LR}>
            Test Happy flow Linear Regression
          </Button>
        </div>
      </div>
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
