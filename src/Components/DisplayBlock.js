import "../App.css";
import React, { useState } from "react";
import { JsonViewer } from "@textea/json-viewer";
import DataCard from "./DataCard";
import TransformCard from "./TransformCard";
import MLCard from "./MLCard";

export default function DisplayBlock({ data }) {
  return (
    <div>
      {data.Blocks.map((block, index) => {
        if (block.Category == "Data") {
          return (
            <div>
              <DataCard number={index + 1} block={block} />
            </div>
          );
        } else if (block.Category == "Transform") {
          return (
            <div>
              <TransformCard number={index + 1} block={block} />
            </div>
          );
        } else if (block.Category == "Model") {
          return (
            <div>
              <MLCard number={index + 1} block={block} />
            </div>
          );
        }
        return (
          <div>
            <JsonViewer value={block} />
          </div>
        );
      })}
    </div>
  );
  // return <JsonViewer value={data} />;
}
