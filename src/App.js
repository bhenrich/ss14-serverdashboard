import "./App.css";

import React, { useEffect, useState } from "react";

function App() {
  const [servers, setServers] = useState([]);
  const [refresh, setRefresh] = useState(0);

  useEffect(() => {
    if (refresh > 0) {
      const interval = setInterval(() => {
        fetchData();
      }, refresh * 60000);
      return () => clearInterval(interval);
    }

    fetchData();
  }, [refresh]);

  function calcRoundTimeLength(startTime, running) {
    if (running !== 1) return "In the Lobby";
    else {
      const startTimeDate = new Date(startTime);
      const currentTime = new Date();

      const timeDifference = currentTime.getTime() - startTimeDate.getTime();

      // return in format: 1 Hour, 23 Minutes, 45 Seconds
      return `${Math.floor(timeDifference / 1000 / 60 / 60)} Hours, ${
        Math.floor(timeDifference / 1000 / 60) % 60
      } Minutes, ${Math.floor(timeDifference / 1000) % 60} Seconds`;
    }
  }

  const fetchData = async () => {
    fetch("https://yuniiworks.de:5033/servers")
      .then((response) => response.json())
      .then((data) => setServers(data))
      .catch((error) => console.log(error));
  };

  function getLanguageFullName(langCode) {
    const displayNames = new Intl.DisplayNames(["en"], { type: "language" });
    return displayNames.of(langCode.split(":")[1]);
  }

  function translateRegion(regionTag) {
    switch (regionTag) {
      case "region:eu_w":
        return "West Europe";
      case "region:eu_e":
        return "East Europe";
      case "region:am_n_w":
        return "North America West";
      case "region:am_n_c":
        return "North America Central";
      case "region:am_n_e":
        return "North America East";
      case "region:am_c":
        return "Central America";
      case "region:am_s_s":
        return "South America South";
      case "region:am_s_e":
        return "South America East";
      case "region:am_s_w":
        return "South America West";
      case "region:af_n":
        return "North Africa";
      case "region:af_c":
        return "Central Africa";
      case "region:af_s":
        return "South Africa";
      case "region:me":
        return "Middle East";
      case "region:as_n":
        return "North Asia";
      case "region:as_se":
        return "South East Asia";
      case "region:as_e":
        return "East Asia";
      case "region:ind":
        return "India";
      case "region:oce":
        return "Oceania";
      default:
        return "Unknown Region";
    }
  }

  function parseRPTag(rp) {
    switch (rp) {
      case "rp:low":
        return "Low RP";
      case "rp:med":
        return "Medium RP";
      case "rp:high":
        return "High RP";
      case "rp:none":
        return "No RP";
      default:
        return "Unknown RP";
    }
  }

  function parseTags(tags) {
    const lang = tags.find((tag) => tag.includes("lang:"));
    const region = tags.find((tag) => tag.includes("region:"));
    const rp = tags.find((tag) => tag.includes("rp:"));
    const langName = getLanguageFullName(lang);
    const regionName = translateRegion(region);
    const rpName = parseRPTag(rp);

    return [langName, regionName, rpName];
  }

  return (
    <div className="App">
      <header className="header">
        <div className="logo">
          <a href="https://spacestation14.io" target="_blank" rel="noreferrer">
            <img src="logo.png" className="headerLogo" alt="logo" />
          </a>
          <span className="headerText">Wizard's Den Server Dashboard</span>
        </div>
      </header>

      <div className="refreshButton">
        <button onClick={fetchData} className="refresh" id="refButton">
          Refresh
        </button>
        <span className="refreshText">Refresh every &nbsp;</span>
        <select
          className="refreshDropdown"
          name="Automatic Refresh"
          onChange={(e) => setRefresh(e.target.value)}
        >
          <option value="0" className="refreshDropdownInner">
            Manual
          </option>
          <option value="1" className="refreshDropdownInner">
            1 Minute
          </option>
          <option value="5" className="refreshDropdownInner">
            5 Minutes
          </option>
          <option value="10" className="refreshDropdownInner">
            10 Minutes
          </option>
        </select>
      </div>
      <main>
        <div className="cardContainer">
          {servers.map((server, index) => (
            <div className="card" key={index}>
              <div className="leftContainer">
                <div className="cardHeader">
                  <span className="cardTitle">{server.name}</span>
                  <br />
                  <span className="cardPlayers">
                    {server.players} / {server.soft_max_players} Players
                  </span>
                  <br />
                </div>
                <div className="cardBody">
                  <div className="cardStatus">
                    <span className="cardStatusText">{server.status}</span>
                    <br />
                  </div>
                  <div className="cardFooter">
                    <span className="serverMap">
                      Station: {server.map ? server.map : "Error fetching Map"}
                    </span>
                    <br />
                    <span className="serverRuntime">
                      {calcRoundTimeLength(
                        server.round_start_time,
                        server.run_level,
                      )}
                    </span>
                    <br />
                    <div className="serverTags">
                      {parseTags(server.tags).map((tag, index) => (
                        <span className="serverTag" key={index}>
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              <div className="rightContainer">
                <div className="cardRoundNr">
                  <span className="serverRoundNr">
                    Shift #{server.round_id}
                  </span>
                  <br />
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      <div className="version">
        <span className="versionText">v1.0.1 - Made with 💜 by YuNii</span>
      </div>
      <footer>
        <p className="footerText">
          <a href="https://github.bhenrich.de" target="_blank" rel="noreferrer">
            💻 GitHub Repository 💻
          </a>
        </p>
        <p className="footerText">
          <a href="https://spacestation14.io" target="_blank" rel="noreferrer">
            ✨ Play Space Station 14 ✨
          </a>
        </p>
      </footer>
    </div>
  );
}

export default App;
