import "./App.css";
import React, { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import axios, * as others from "axios";
import useSpeechToText from "react-hook-speech-to-text";
import DisplayJson from "./Components/DisplayJson";
const URI = "https://proj-slate-backend.herokuapp.com";
// const URI = "http://127.0.0.1:5000";

function MyForm() {
  const [text, setText] = useState("");
  const [data, setData] = useState({});
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
  const ProcessResults = () => {
    if (results.length > 0 && results[0].transcript != [processedText]) {
      setProcessedText(results[0].transcript);
      if (results[0].transcript.toLowerCase().trim() == "stop") {
        stopSpeechToText();
        return <></>;
      } else {
        const response = axios
          .get(`${URI}/process/?text=${results[0].transcript}`)
          .then((res) => {
            setData(res.data);
          });
        setResults([]);
      }
      return <></>;
    }
  };
  const handleSubmit = async (event) => {
    const response = await axios.get(`${URI}/process/?text=${text}`);
    setData(response.data);
  };
  const handleReset = async (event) => {
    const response = await axios.get(`${URI}/resetModel`);
    setData(response.data);
  };
  const handleDataSetlect = async (event) => {
    const response = await axios.get(
      `${URI}/process/?text=Select Iris DataSet`
    );
    setData(response.data);
  };
  const handleStandardization = async (event) => {
    const response = await axios.get(
      `${URI}/process/?text=Apply Standardization`
    );
    setData(response.data);
  };
  const handleSplitAndTrain = async (event) => {
    const response = await axios.get(
      `${URI}/process/?text=split the dataset into split and train`
    );
    setData(response.data);
  };
  const handleStndize1Col = async (event) => {
    const response = await axios.get(
      `${URI}/process/?text=Apply Standardization for sepal width`
    );
    setData(response.data);
  };
  const handleStndize1Col2 = async (event) => {
    const response = await axios.get(
      `${URI}/process/?text=Apply Standardization for sepal length`
    );
    setData(response.data);
  };
  const handleDataSetlectSales = async (event) => {
    const response = await axios.get(
      `${URI}/process/?text=Select Sales data set`
    );
    setData(response.data);
  };
  const handleLinearRegression = async (event) => {
    const response = await axios.get(
      `${URI}/process/?text=apply Linear regression`
    );
    setData(response.data);
  };
  const handleRemoveNulls = async (event) => {
    const response = await axios.get(`${URI}/process/?text=Remove null values`);
    setData(response.data);
  };
  const handleRemoveNulls_Columns = async (event) => {
    const response = await axios.get(`${URI}/process/?text=Columns`);
    setData(response.data);
  };
  const handleRemoveNulls_Rows = async (event) => {
    const response = await axios.get(`${URI}/process/?text=Rows`);
    setData(response.data);
  };
  const handleRemoveNulls_SepalWidth = async (event) => {
    const response = await axios.get(
      `${URI}/process/?text=Remove nulls from SepalWidth`
    );
    setData(response.data);
  };
  const handleRemoveNulls_PetalWidth = async (event) => {
    const response = await axios.get(
      `${URI}/process/?text=Remove nulls from Petal Width`
    );
    setData(response.data);
  };
  const handleReplaceNulls_mean = async (event) => {
    const response = await axios.get(
      `${URI}/process/?text=Replace all null values with mean`
    );
    setData(response.data);
  };
  const handleReplaceNulls_mode_PetalWidth = async (event) => {
    const response = await axios.get(
      `${URI}/process/?text=Replace nulls from Petal length with mode`
    );
    setData(response.data);
  };
  const handleReplaceNulls_mean_sepalWidth = async (event) => {
    const response = await axios.get(
      `${URI}/process/?text=Replace nulls from SepalWidth with mean`
    );
    setData(response.data);
  };
  const handleIQR = async (event) => {
    const response = await axios.get(`${URI}/process/?text=use IQR`);
    setData(response.data);
  };
  const handleZScore = async (event) => {
    const response = await axios.get(`${URI}/process/?text=use Z Score`);
    setData(response.data);
  };
  const handleTestFlow = async (event) => {
    var response = "";
    response = await axios.get(`${URI}/resetModel`);
    response = await axios.get(`${URI}/process/?text=Select Iris DataSet`);
    response = await axios.get(
      `${URI}/process/?text=Replace all null values with mean`
    );
    response = await axios.get(`${URI}/process/?text=Apply Normalization`);
    response = await axios.get(
      `${URI}/process/?text=split the dataset into split and train`
    );
    response = await axios.get(
      `${URI}/process/?text=apply Decission tree model`
    );
    setData(response.data);
  };
  const handleTestFlow_LR = async (event) => {
    var response = "";
    response = await axios.get(`${URI}/resetModel`);
    response = await axios.get(`${URI}/process/?text=Select Iris DataSet`);
    response = await axios.get(
      `${URI}/process/?text=Replace all null values with mean`
    );
    response = await axios.get(`${URI}/process/?text=Apply Normalization`);
    response = await axios.get(
      `${URI}/process/?text=split the dataset into split and train`
    );
    response = await axios.get(`${URI}/process/?text=apply Linear Regression`);
    setData(response.data);
  };
  const onKeyPress = (event) => {
    if (event.keyCode == 13) {
      const response = axios.get(`${URI}/process/?text=${text}`).then((res) => {
        setData(res.data);
      });
    }
  };
  return (
    <div>
      <div style={{ display: "flex", padding: 10 }}>
        <div style={{ paddingRight: 10 }}>
          <Button
            variant="contained"
            onClick={isRecording ? stopSpeechToText : startSpeechToText}
          >
            {isRecording ? "Stop Recording" : "Start Recording"}
          </Button>
        </div>
        {results && ProcessResults()}
        <TextField
          value={
            results.length > 0 && results[0].transcript
              ? results[0].transcript
              : interimResult
          }
          id="outlined-basic"
          label=""
          variant="outlined"
          fullWidth={true}
          onChange={(e) => setText(e.target.value)}
          style={{ width: 1000, padding: 0 }}
          onKeyDown={onKeyPress}
        />
      </div>
      <div style={{ display: "flex", flexWrap: "wrap" }}>
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

      <DisplayJson data={data} />
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
