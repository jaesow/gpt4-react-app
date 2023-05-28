import Head from "next/head";
import { useState, useEffect } from "react";
import styles from "./index.module.css";
import anime from "animejs";

export default function Home() {
  const [moodInput, setMoodInput] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  async function onSubmit(event) {
    event.preventDefault();
    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ mood: moodInput }),
      });

      const data = await response.json();
      if (response.status !== 200) {
        throw data.error || new Error(`Request failed with status ${response.status}`);
      }

      setSuggestions(data.suggestions);
      setMoodInput("");
    } catch(error) {
      // Consider implementing your own error handling logic here
      console.error(error);
      alert(error.message);
    }
  }
    useEffect(() => {
      anime({
        targets: ".suggestion",
        translateY: [100, 0],
        opacity: [0, 1],
        duration: 1000,
        delay: anime.stagger(100)
      });
    }, [suggestions]);
  

  return (
    <div>
      <Head>
        <title>OpenAI Quickstart</title>
        <link rel="icon" href="/bloom.gif" />
      </Head>

      <main className={styles.main}>
        <img src="/bloom.gif" className={styles.icon} />
        <h3>bloom</h3>
        <h4>AI-Powered Growth for Your Mind, Nurturing Well-being One Suggestion at a Time.
        </h4>
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
            <div key={index} className="suggestion">{suggestion}</div>
          ))}
        </div>
      </main>
    </div>
  );
}
