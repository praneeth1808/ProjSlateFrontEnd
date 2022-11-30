import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

export default function ScoreCard({ data }) {
  console.log(data);
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "flex-start",
        padding: 20,
        zoom: 0.8,
        justifyContent: "center"
      }}
    >
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
              {data && data.Scores && data.Scores["Training Score"]
                ? Math.round(
                    (data.Scores["Training Score"] + Number.EPSILON) * 100
                  ) + "%"
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
              {data && data.Scores && data.Scores["Testing Score"] != null
                ? Math.round(
                    (data.Scores["Testing Score"] + Number.EPSILON) * 100
                  ) + "%"
                : "NA"}
            </Typography>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
