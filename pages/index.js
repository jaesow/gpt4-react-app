import Head from "next/head";
import { useState, useEffect } from "react";
import styles from "./index.module.css";
import anime from "animejs";
import dynamic from "next/dynamic";

// Dynamically import ApexChart component from react-apexcharts
const ApexChart = dynamic(() => import("react-apexcharts"), { ssr: false });

export default function Home() {
  // State variables
  const [moodInput, setMoodInput] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [moodData, setMoodData] = useState([]);

  useEffect(() => {
    anime({
      targets: ".suggestion",
      translateY: [100, 0],
      opacity: [0, 1],
      duration: 1000,
      delay: anime.stagger(100)
    });
  }, [suggestions]);

  // Handle form submission
  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      // Send a POST request to the API
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ mood: moodInput }),
      });

      // Update state with suggestions and reset input
      const data = await response.json();
      if (response.status !== 200) {
        throw data.error || new Error(`Request failed with status ${response.status}`);
      }

      setSuggestions(data.suggestions);
      setMoodInput("");

      // Update moodData to aggregate mood occurrences
      const updatedMoodData = [...moodData];
      const existingMoodIndex = updatedMoodData.findIndex((item) => item.mood === moodInput);
      if (existingMoodIndex !== -1) {
        updatedMoodData[existingMoodIndex].count += 1;
      } else {
        updatedMoodData.push({ mood: moodInput, count: 1 });
      }
      setMoodData(updatedMoodData);
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  };

  // Configuration for ApexCharts
  const chartOptions = {
    chart: {
      id: "mood-chart"
    },
    xaxis: {
      categories: moodData.map((item) => item.mood),
      labels: {
        show: true,
      },
    },
    yaxis: {
      labels: {
        formatter: function (value) {
          return value.toFixed(0);
        }
      }
    },
    colors: ["#4BC0C0"],
    stroke: {
      curve: "smooth"
    }
  };

  const chartSeries = [
    {
      name: "Mood Trend",
      data: moodData.map((item) => item.count)
    }
  ];

  const tagline = "Meet Your AI-Powered Growth Mindset.";
  const description = "Welcome to the garden, where Energy Meets Understanding. Communicate Your Mood with One Word, One Emoji 🌱, or an Entire Paragraph.";
  const newline = "Harness the Power of AI to Discover Your Well-being Journey and Cultivate a Positive Mindset.";

  return (
    <div>
      <Head>
        <title>bloom: Meet Your AI-Powered Growth Mindset</title>
        <link rel="icon" href="/bloom.gif" />
      </Head>

      <main className={styles.main}>
        <img src="/bloom.gif" className={styles.icon} />
        <h3>bloom</h3>
        <h4>{tagline}</h4>
        {description}
        <h4>{newline}</h4>
        <form onSubmit={onSubmit}>
          <input
            type="text"
            name="mood"
            placeholder="Enter your mood"
            value={moodInput}
            onChange={(e) => setMoodInput(e.target.value)}
          />
          <input type="submit" value="Get suggestions" />
        </form>
        <div className={styles.result}>
          {suggestions.map((suggestion, index) => (
            <div key={index} className="suggestion">
              {suggestion}
            </div>
          ))}
        </div>
        <div>
          <ApexChart options={chartOptions} series={chartSeries} type="line" height={400} />
        </div>
      </main>
    </div>
  );
}
