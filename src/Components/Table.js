export default function Table({ theadData, tbodyData }) {
  tbodyData = tbodyData ? tbodyData : [];
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "flex-start",
        padding: 20,
        justifyContent: "center",
      }}
    >
      <table style={{ border: "1px solid black" }}>
        <thead>
          <tr>
            {theadData.map((heading) => {
              return (
                <th
                  style={{
                    paddingTop: 12,
                    paddingBottom: 12,
                    textAlign: "center",
                    backgroundColor: "#04AA6D",
                    color: "white",
                    width: 150,
                  }}
                  key={heading}
                >
                  {heading}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {tbodyData.map((row, index) => {
            return (
              <tr key={index}>
                {theadData.map((key, index) => {
                  return (
                    <td key={row[key]}>
                      {row[key] != null ? (
                        Math.round((row[key] + Number.EPSILON) * 100) / 100
                      ) : (
                        <p style={{ color: "blue", margin: 0 }}>null</p>
                      )}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
