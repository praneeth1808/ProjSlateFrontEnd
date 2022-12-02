import DisplayBlock from "./DisplayBlock";
import Table from "./Table";
import { JsonViewer } from "@textea/json-viewer";
import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import "react-best-tabs/dist/index.css";
import ScoreCard from "./ScoreCard";
import Tabs from "./Tabs";
import Image from "./imageBlock";
export default function DisplayJson({ data, activeTab, setActiveTab }) {
  const getHeadings = () => {
    if (data) {
      if (data.Results) {
        if (data.Results[0]) {
          return data.Results[0];
        }
      }
    }
    return [];
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "flex-start",
        backgroundColor: "#ebebeb",
        minHeight: window.innerHeight * 0.92 + "px",
      }}
    >
      <div style={{ overflow: "scroll" }}>
        <Tabs data={data} activeTab={activeTab} setActiveTab={setActiveTab}>
          <div label="Model">
            <DisplayBlock data={data.model} />
          </div>
          <div label="Score Card">
            <ScoreCard data={data} />
          </div>
          <div label="Sample Dataset">
            <Table
              theadData={getHeadings()}
              tbodyData={
                data && data.Results && data.Results.length > 0
                  ? data.Results.slice(1, data.Results.length)
                  : []
              }
            />
          </div>
          <div label="CurrentStep">
            <JsonViewer value={data.CurrentProcess} />
          </div>
          <div label="Graphs">
            <div>
              {data && data.Graphs && Object.keys(data.Graphs).length > 0 && (
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <p>
                    {" "}
                    These are static for now - live graphs is under progress
                  </p>
                  {Object.keys(data.Graphs).map((each_graph) => {
                    console.log(each_graph);
                    return (
                      <Image
                        image_url={data.Graphs[each_graph]}
                        title={each_graph}
                      />
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </Tabs>
      </div>
      <div style={{ display: "flex", flexDirection: "column" }}>
        {data && data.model && data.model.CreatedAt && (
          <div
            style={{
              display: "flex",
              fontSize: 10,
            }}
          >
            <p>Created At :</p>
            <p style={{ paddingLeft: 5, paddingRight: 5, color: "green" }}>
              {data.model.CreatedAt}
            </p>
          </div>
        )}
        {data && data.model && data.model.LastModified && (
          <div
            style={{
              display: "flex",
              fontSize: 10,
            }}
          >
            <p>Modified At :</p>
            <p style={{ paddingLeft: 5, color: "Red" }}>
              {data.model.LastModified}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
