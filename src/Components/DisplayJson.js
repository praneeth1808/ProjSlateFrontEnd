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

export default function DisplayJson({ data }) {
  console.log(data.Scores);
  const getHeadings = () => {
    return data.Results[0];
  };
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "left",
        alignItems: "flex-start",
        backgroundColor: "#ebebeb",
        padding: 50,
      }}
    >
      {data && data.Scores && (
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "flex-start",
            padding: 20,
            zoom: 0.8,
          }}
        >
          <div style={{ paddingRight: 82 }}>Scores : </div>
          <Card sx={{ minWidth: 275 }}>
            <CardContent>
              <div style={{ display: "flex" }}>
                <Typography
                  sx={{ fontSize: 14, paddingRight: 3 }}
                  color="text.secondary"
                  gutterBottom
                >
                  Training Score:
                </Typography>
                <Typography
                  sx={{ fontSize: 14, color: "#ff0060" }}
                  color="text.secondary"
                  gutterBottom
                  fontWeight="Bold"
                >
                  {data.Scores["Training Score"] != null
                    ? Math.round(
                        (data.Scores["Training Score"] + Number.EPSILON) * 100
                      ) / 100
                    : "NA"}
                </Typography>
              </div>
              <div style={{ display: "flex" }}>
                <Typography
                  sx={{ fontSize: 14, paddingRight: 4 }}
                  color="text.secondary"
                  gutterBottom
                >
                  Testing Score:
                </Typography>
                <Typography
                  sx={{ fontSize: 14, color: "#473fffb3" }}
                  color="text.secondary"
                  gutterBottom
                  fontWeight="Bold"
                >
                  {data.Scores["Testing Score"] != null
                    ? Math.round(
                        (data.Scores["Testing Score"] + Number.EPSILON) * 100
                      ) / 100
                    : "NA"}
                </Typography>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
      {data && data.model && data.model.Blocks.length > 0 && (
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "flex-start",
            padding: 20,
            zoom: 0.8,
          }}
        >
          <div style={{ paddingRight: 82 }}>Model : </div>
          {data.model && <DisplayBlock data={data.model} />}
        </div>
      )}
      {data &&
        data.CurrentProcess &&
        JSON.stringify(data.CurrentProcess) != "{}" && (
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "flex-start",
              padding: 20,
              zoom: 0.8,
            }}
          >
            <div style={{ paddingRight: 20 }}>Current Process : </div>
            <JsonViewer value={data.CurrentProcess} />
          </div>
        )}
      {data && data.Results && (
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "flex-start",
            padding: 20,
          }}
        >
          <div style={{ paddingRight: 90 }}>DataFrame : </div>
          {data.Results && (
            <Table
              theadData={getHeadings()}
              tbodyData={data.Results.slice(1, data.Results.length)}
            />
          )}{" "}
        </div>
      )}
      <div style={{ display: "flex" }}>
        {data && data.model && data.model.CreatedAt && (
          <div
            style={{
              display: "flex",
              fontSize: 10,
            }}
          >
            <p>Created At :</p>
            <p style={{ paddingLeft: 5, paddingRight: 10, color: "green" }}>
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
