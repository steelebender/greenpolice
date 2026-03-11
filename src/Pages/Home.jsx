import React, { useEffect, useState } from "react";
import "./Home.css";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Legend,
  Cell,
} from "recharts";

const Home = () => {
  const add = {
    border: "none",
    height: "2px",
    backgroundColor: "black",
    margin: "10px 0",
  };

  // States for JSON chart data
  const [data, setData] = useState([]);
  const [seasonData, setSeasonData] = useState([]);
  const [timeData, setTimeData] = useState([]);
  const [genderData, setGenderData] = useState([]);
  const [raceData, setRaceData] = useState([]);
  const [violationData, setViolationData] = useState([]);
  const [speedingRaceData, setSpeedingRaceData] = useState([]);
  const [drugRacePercData, setDrugRacePercData] = useState([]);
  const [raceOutcomeData, setRaceOutcomeData] = useState([]);
  const [stopOutcomeData, setStopOutcomeData] = useState([]);

  // Vite-safe base URL
  const base = import.meta.env.BASE_URL;

  // Fetch yearly trend
  useEffect(() => {
    fetch(`${base}/JSONstop_trend.json`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load stop trend data");
        return res.json();
      })
      .then(setData)
      .catch(console.error);
  }, [base]);

  // Fetch season data
  useEffect(() => {
    fetch(`${base}/JSONstop_season.json`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load stop season data");
        return res.json();
      })
      .then(setSeasonData)
      .catch(console.error);
  }, [base]);

  // Fetch time-of-day data
  useEffect(() => {
    fetch(`${base}/JSONstop_time_trend.json`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load time-of-day data");
        return res.json();
      })
      .then(setTimeData)
      .catch(console.error);
  }, [base]);

  // Fetch gender trend data
  useEffect(() => {
    fetch(`${base}/JSONstop_gender.json`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load gender data");
        return res.json();
      })
      .then(setGenderData)
      .catch(console.error);
  }, [base]);

  // Fetch race trend data
  useEffect(() => {
    fetch(`${base}/JSON_race_trend.json`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load race data");
        return res.json();
      })
      .then(setRaceData)
      .catch(console.error);
  }, [base]);
  useEffect(() => {
    fetch(`${base}/JSONstop_violations.json`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load violations data");
        return res.json();
      })
      .then(setViolationData)
      .catch(console.error);
  }, [base]);
  useEffect(() => {
    fetch(`${base}/JSONspeeding_by_race.json`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load speeding-by-race data");
        return res.json();
      })
      .then(setSpeedingRaceData)
      .catch(console.error);
  }, [base]);
  useEffect(() => {
    fetch(`${base}/JSONdrugs_by_race_percentage.json`)
      .then((res) => {
        if (!res.ok)
          throw new Error("Failed to load drug-race percentage data");
        return res.json();
      })
      .then(setDrugRacePercData)
      .catch(console.error);
  }, [base]);
  // Fetch race outcome counts
  useEffect(() => {
    fetch(`${base}/JSONrace_outcome_counts.json`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load race outcome data");
        return res.json();
      })
      .then(setRaceOutcomeData)
      .catch(console.error);
  }, [base]);

  // Fetch stop outcome counts
  useEffect(() => {
    fetch(`${base}/JSONstop_outcomes.json`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load stop outcome data");
        return res.json();
      })
      .then(setStopOutcomeData)
      .catch(console.error);
  }, [base]);

  // Chart colors
  const GENDER_COLORS = ["#FF6F61", "#6B5B95", "#88B04B"];
  const RACE_COLORS = [
    "#FF6F61",
    "#6B5B95",
    "#88B04B",
    "#F7CAC9",
    "#92A8D1",
    "#FFA500",
  ];

  // Helper for image paths
  const img = (name) => `${base}${name}`;

  return (
    <div className="homeContainer">
      <header className="heroBanner">
        <div className="heroContent">
          <h1>Police Stops Data Analysis</h1>
          <p>Turning police report data into actionable insights</p>
        </div>
      </header>

      <div className="introduction">
        <h2>Introduction</h2>
        <hr style={add} />
        <div className="intro">
          <p>
            The U.S has the largest car traffic in the world prompting active
            police presence on roads. This report investigates insights from a
            Rhode Island "police traffic stops" dataset.
          </p>
        </div>
      </div>
      <div className="card-row">
        <div className="simple-card deep-red">
          <h3>10:00 AM</h3>
          <p className="value">7,350</p>
        </div>

        <div className="simple-card medium-red">
          <h3>9:00 AM</h3>
          <p className="value">6,838</p>
        </div>

        <div className="simple-card light-red">
          <h3>11:00 AM</h3>
          <p className="value">5,877</p>
        </div>
      </div>
      <main className="dashboard">
        {/* Peak Stop Times */}

        {/* Yearly Trend */}
        <div className="card">
          <h2>Traffic Stops Trend</h2>

          <ResponsiveContainer
            width="100%"
            height={350}>
            <LineChart
              data={data}
              margin={{ top: 20, right: 20, left: 20, bottom: 50 }}>
              <XAxis
                dataKey="year"
                interval={0}
                angle={-45}
                textAnchor="end"
                tick={{ fontSize: 12 }}
              />
              <YAxis />
              <Tooltip />

              <Line
                type="monotone"
                dataKey="count"
                stroke="#8884d8"
                strokeWidth={2}
                dot={(props) => {
                  const max = Math.max(...data.map((d) => d.count));
                  const isMax = props.payload.count === max;

                  return (
                    <g>
                      <circle
                        cx={props.cx}
                        cy={props.cy}
                        r={isMax ? 6 : 4}
                        fill={isMax ? "#FF0000" : "white"}
                        stroke={isMax ? "#FF0000" : "#8884d8"}
                        strokeWidth={isMax ? 2 : 1}
                      />
                    </g>
                  );
                }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Time-of-Day Trend */}
        <div className="card">
          <h2>Trends by Time of Day</h2>
          <ResponsiveContainer
            width="100%"
            height={300}>
            <LineChart
              data={timeData}
              margin={{ top: 20, right: 20, left: 20, bottom: 50 }}>
              <XAxis
                dataKey="time"
                interval={0} // show all x-labels
                angle={-45}
                textAnchor="end"
                tick={{ fontSize: 12 }}
              />
              <YAxis />
              <Tooltip />

              <Line
                type="monotone"
                dataKey="count"
                stroke="#8884d8"
                strokeWidth={2}
                dot={(props) => {
                  const max = Math.max(...timeData.map((d) => d.count)); // find highest
                  const isMax = props.payload.count === max;
                  return (
                    <circle
                      cx={props.cx}
                      cy={props.cy}
                      r={isMax ? 6 : 4} // bigger for highest
                      fill={isMax ? "#FF0000" : "white"} // solid red for highest, hollow for others
                      stroke={isMax ? "#FF0000" : "#8884d8"} // outline color
                      strokeWidth={isMax ? 2 : 1}
                    />
                  );
                }}
              />
            </LineChart>
          </ResponsiveContainer>

          {/* Grouped time legend */}
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              gap: "20px",
              marginTop: "15px",
            }}>
            {[
              { label: "6–10 AM", color: "red" },
              { label: "11 AM–2 PM", color: "#FF6F61" },
              { label: "11 PM–5 AM", color: "#FFA500" },
              { label: "3–6 PM", color: "#82ca9d" },
              { label: "7–10 PM", color: "green" },
            ].map((group) => (
              <div
                key={group.label}
                style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                <span
                  style={{
                    width: "12px",
                    height: "12px",
                    backgroundColor: group.color,
                    borderRadius: "50%",
                    display: "inline-block",
                  }}></span>
                <span style={{ fontSize: "12px" }}>{group.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Season Trend */}
        <div className="card">
          <h2>Trends by Seasons</h2>

          <ResponsiveContainer
            width="100%"
            height={300}>
            <BarChart data={seasonData}>
              <XAxis
                dataKey="season"
                interval={0}
                angle={-30}
                textAnchor="end"
                height={60}
              />
              <YAxis />
              <Tooltip />
              <Bar
                dataKey="count"
                fill="#82ca9d"
              />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Stops by Gender */}

        <div className="card">
          <h2>Stops by Gender</h2>
          <ResponsiveContainer
            width="100%"
            height={300}>
            <PieChart>
              <Pie
                data={genderData.map((d) => ({
                  ...d,
                  gender:
                    d.gender.toLowerCase() === "unknown" ? "Unknown" : d.gender,
                }))}
                dataKey="count"
                nameKey="gender"
                cx="50%"
                cy="50%"
                outerRadius={100}
                labelLine={false} // remove the lines
                label={({
                  cx,
                  cy,
                  midAngle,
                  innerRadius,
                  outerRadius,
                  value,
                  index,
                  payload,
                }) => {
                  const total = genderData.reduce(
                    (acc, curr) => acc + curr.count,
                    0,
                  );
                  const percent = ((value / total) * 100).toFixed(1);

                  // get initial of gender
                  const initial = payload.gender.charAt(0).toUpperCase();

                  const RADIAN = Math.PI / 180;
                  const radius = innerRadius + (outerRadius - innerRadius) / 2;
                  const x = cx + radius * Math.cos(-midAngle * RADIAN);
                  const y = cy + radius * Math.sin(-midAngle * RADIAN);

                  return (
                    <text
                      x={x}
                      y={y}
                      fill="#fff"
                      textAnchor="middle"
                      dominantBaseline="central"
                      fontSize={12}
                      fontWeight="bold">
                      {initial} - {percent}%
                    </text>
                  );
                }}>
                {genderData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={GENDER_COLORS[index % GENDER_COLORS.length]}
                  />
                ))}
              </Pie>

              <Tooltip
                formatter={(value, name) => {
                  const total = genderData.reduce(
                    (acc, curr) => acc + curr.count,
                    0,
                  );
                  const percent = ((value / total) * 100).toFixed(1);
                  return [`${percent}%`, name];
                }}
              />

              <Legend verticalAlign="bottom" />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Stops by Race */}
        <div className="card">
          <h2>Stops by Race</h2>

          <ResponsiveContainer
            width="100%"
            height={350}>
            <BarChart
              data={raceData}
              margin={{ bottom: 70 }}>
              <XAxis
                dataKey="race"
                interval={0}
                angle={-30}
                textAnchor="end"
              />
              <YAxis />

              <Tooltip
                formatter={(value, name, props) => {
                  const total = raceData.reduce((sum, d) => sum + d.count, 0);
                  return [
                    `${((value / total) * 100).toFixed(1)}%`,
                    "Percentage",
                  ];
                }}
              />

              <Bar
                dataKey="count"
                barSize={40}
                label={({ x, y, width, value }) => {
                  const total = raceData.reduce((sum, d) => sum + d.count, 0);
                  const percent = ((value / total) * 100).toFixed(1);
                  return (
                    <text
                      x={x + width / 2}
                      y={y - 6}
                      textAnchor="middle"
                      fontSize={12}
                      fill="#000">
                      {percent}%
                    </text>
                  );
                }}>
                {raceData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={RACE_COLORS[index % RACE_COLORS.length]}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Violations Trend */}
        <div className="card">
          <h2>Top 3 Violations</h2>

          <ResponsiveContainer
            width="100%"
            height={400}>
            <BarChart
              data={violationData.sort((a, b) => b.count - a.count).slice(0, 3)}
              margin={{ top: 20, right: 30, left: 20, bottom: 50 }}>
              <XAxis
                dataKey="violation"
                tick={{ fontSize: 12 }}
                angle={-20}
                textAnchor="end"
                interval={0}
              />
              <YAxis />
              <Tooltip
                formatter={(value, name, props) => {
                  const total = violationData
                    .sort((a, b) => b.count - a.count)
                    .slice(0, 3)
                    .reduce((sum, d) => sum + d.count, 0);

                  return [
                    `${((value / total) * 100).toFixed(1)}%`,
                    "Percentage",
                  ];
                }}
              />

              <Bar
                dataKey="count"
                fill="#FF6F61"
                barSize={60}
                label={({ x, y, width, value }) => {
                  const top3 = violationData
                    .sort((a, b) => b.count - a.count)
                    .slice(0, 3);

                  const total = top3.reduce((sum, d) => sum + d.count, 0);
                  const percent = ((value / total) * 100).toFixed(1);

                  return (
                    <text
                      x={x + width / 2}
                      y={y - 6}
                      textAnchor="middle"
                      fontSize={12}
                      fill="#000">
                      {percent}%
                    </text>
                  );
                }}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Speeding Violations by Race */}
        <div className="card">
          <h2>Speeding Violations by Race</h2>
          <ResponsiveContainer
            width="100%"
            height={350}>
            <PieChart>
              <Pie
                data={speedingRaceData}
                dataKey="count"
                nameKey="race"
                cx="50%"
                cy="50%"
                innerRadius={70} // doughnut thickness
                outerRadius={120}
                isAnimationActive={false} // optional for performance
                label={false} // remove inside labels
              >
                {speedingRaceData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={RACE_COLORS[index % RACE_COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip
                formatter={(value, name) => {
                  const total = speedingRaceData.reduce(
                    (acc, curr) => acc + curr.count,
                    0,
                  );
                  const percent = ((value / total) * 100).toFixed(1);
                  return [`${percent}%`, name];
                }}
              />
              <Legend
                verticalAlign="bottom"
                align="center"
                layout="horizontal"
              />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Drug-Related Stops by Race (%) */}
        <div className="card">
          <h2>Drug-Related Stops by Race</h2>
          <ResponsiveContainer
            width="100%"
            height={350}>
            <PieChart>
              <Pie
                data={drugRacePercData}
                dataKey="percentage"
                nameKey="race"
                cx="50%"
                cy="50%"
                innerRadius={70} // doughnut thickness
                outerRadius={120}
                isAnimationActive={false} // optional
              >
                {drugRacePercData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={RACE_COLORS[index % RACE_COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip formatter={(value, name) => [`${value}%`, `${name}`]} />
              <Legend
                verticalAlign="bottom"
                align="center"
                layout="horizontal"
              />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="card">
          <h2>Stop Outcomes</h2>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "20px",
              justifyContent: "center",
              marginTop: "15px",
            }}>
            {stopOutcomeData
              .slice()
              .sort((a, b) => b.count - a.count) // descending
              .map((outcome, index, arr) => {
                const max = arr[0].count;
                const min = arr[arr.length - 1].count;
                // Map count to red lightness (30% dark red → 80% light red)
                const lightness =
                  80 - ((outcome.count - min) / (max - min || 1)) * 50;
                const bgColor = `hsl(0, 80%, ${lightness}%)`; // red hue
                return (
                  <div
                    key={outcome.outcome}
                    className="simple-card"
                    style={{
                      minWidth: "120px",
                      padding: "15px",
                      backgroundColor: bgColor,
                      color: "#fff",
                      borderRadius: "10px",
                      textAlign: "center",
                    }}>
                    <h3 style={{ margin: "0 0 10px 0" }}>{outcome.outcome}</h3>
                    <p
                      className="value"
                      style={{ fontSize: "18px", margin: 0 }}>
                      {outcome.count.toLocaleString()}
                    </p>
                  </div>
                );
              })}
          </div>
        </div>

        {/* Stops by Race (Outcome Dataset) */}
        <div className="card">
          <h2>Arrests by Race</h2>
          <ResponsiveContainer
            width="100%"
            height={350}>
            <PieChart>
              <Pie
                data={raceOutcomeData}
                dataKey="count"
                nameKey="race"
                cx="50%"
                cy="50%"
                innerRadius={70} // doughnut thickness
                outerRadius={120}
                label={false} // remove inside labels
              >
                {raceOutcomeData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={RACE_COLORS[index % RACE_COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip
                formatter={(value, name) => {
                  const total = raceOutcomeData.reduce(
                    (acc, curr) => acc + curr.count,
                    0,
                  );
                  const percent = ((value / total) * 100).toFixed(1);
                  return [`${percent}%`, name];
                }}
              />
              <Legend
                verticalAlign="bottom"
                align="center"
                layout="horizontal"
              />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Stop Outcomes */}

        {/* Existing static cards */}
      </main>

      <footer className="footer">
        <p>&copy; 2025 Police Data Analysis Project</p>
        <p>Clement</p>
        <div className="socials">
          <span>🔗 GitHub</span>
          <span>🐦 Twitter</span>
          <span>📧 Contact</span>
        </div>
      </footer>
    </div>
  );
};

export default Home;
