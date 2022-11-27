import "../App.css";
import React, { useState } from "react";
import Button from "@mui/material/Button";
import { JsonViewer } from "@textea/json-viewer";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

const FontSize = 10;

export default function DataCard({ number, block }) {
  const [show, setShow] = useState(false);
  var attributes = {};
  block.Attributes.forEach((each) => {
    attributes[each.key] = each.value;
  });
  return (
    <div style={{ padding: 10 }}>
      <div
        style={{
          background: "#8eee8e",
          paddingLeft: 10,
          paddingTop: 1,
          paddingBottom: 1,
          borderRadius: "0 6 6 0",
          display: "flex",
          width: 500,
          minHeight: 70,
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: 10,
            color: "white",
          }}
        >
          <h1>{number}</h1>
        </div>
        <Card sx={{ width: 500 }}>
          <CardContent>
            <div style={{ display: "flex" }}>
              <Typography
                sx={{ fontSize: FontSize, paddingRight: 10 }}
                color="text.secondary"
                gutterBottom
              >
                Block : {block.Category}
              </Typography>

              <Typography sx={{ fontSize: FontSize }} component="div">
                DataSet Name : {attributes.DataSet}
              </Typography>
            </div>
            <div style={{ display: "flex" }}>
              <Typography variant="body2">
                {attributes.Description}
                <br />
              </Typography>
              {!show && (
                <Button
                  size="small"
                  onClick={() => {
                    setShow(true);
                  }}
                >
                  Show
                </Button>
              )}
              {show && (
                <div>
                  <Button
                    size="small"
                    onClick={() => {
                      setShow(false);
                    }}
                  >
                    Hide
                  </Button>
                </div>
              )}
            </div>

            {show && (
              <Typography variant="body2">
                <JsonViewer
                  value={attributes}
                  displayDataTypes={false}
                  theme={"light"}
                />
                <br />
              </Typography>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
