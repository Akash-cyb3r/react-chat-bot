import React, { useState } from "react";
import "./App.css";

function Chat(props) {
  const [text, setText] = useState("");
  const [replay, setReplay] = useState([]);

  async function fnApiCall() {
    document.getElementById("text-box").value = "";
    let replayData = replay;
    let newText = text;
    replayData = [...replayData, `${newText}`];
    setReplay(replayData);
    await fetch(
      "https://dialogflow.clients6.google.com/v2/projects/gmaster-dqbjev/agent/sessions/54ecd8c8-ebb7-30f5-9f75-aa272669b0fd:detectIntent",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization:
            "Bearer ya29.A0ARrdaM9MNO5N4R0XtJ2EM7QcRoHolX6BrZYL0VovEwri9xA2ywhUNkw_e2JUFG1EIVLBNqXO_I3I7-4D2436R16St7cGmH_rYmLoneVjt7nJ8zi164-NuwcPVAQ5ySaMzl0E3G5xTGCK38jKVRbTvliyzthg-iyG1AtwD3q2QIbqybpppl7H7kOFeRY2bskvHhRNTILZLmq8RStgMUDkXhNfF2P44777U1umHzRD6AMIN2w",
        },
        body: JSON.stringify({
          queryInput: {
            text: {
              text: `${text}`,
              languageCode: "en",
            },
          },
        }),
      }
    )
      .then((res) => res.json())
      .then((data) => {
        let newData = data.queryResult.fulfillmentText;
        setTimeout(() => {
          setReplay([...replayData, `${newData}`]);
        }, 2000);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <div className="chat-bot">
      <div className="input-container">
        <input
          id="text-box"
          type="text"
          onChange={(e) => {
            setText(e.target.value);
          }}
          className="input-box"
          placeholder="Type message here..."
        />
        <button className="send-btn" onClick={fnApiCall}>
          send
        </button>
      </div>
      <div style={{ margin: "10px 10px 70px 10px" }}>
        {replay &&
          replay.map((replay, i) =>
            i % 2 == 1 ? (
              <div className="bot-content">
                <div className="bot-msg">{replay}</div>
              </div>
            ) : (
              <div className="user-content">
                <div className="user-msg">{replay}</div>
              </div>
            )
          )}
      </div>
    </div>
  );
}

export default Chat;
