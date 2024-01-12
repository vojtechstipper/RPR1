import { HubConnection, HubConnectionBuilder } from "@microsoft/signalr";
import {  notification } from "antd";
import { useEffect, useState } from "react";

export const Notify = () => {
  const [connection, setConnection] = useState<null | HubConnection>(null);
  const [inputText, setInputText] = useState("");

  useEffect(() => {
    const connect = new HubConnectionBuilder()
      .withUrl("https://localhost:7038/orderHub")
      .withAutomaticReconnect()
      .build();

    setConnection(connect);
  }, []);

  useEffect(() => {
    if (connection) {
      connection
        .start()
        .then(() => {
          connection.on("ReceiveMessage", (message) => {
            console.log("recieved message")
            notification.open({
              message: "New Notification",
              description: message,
            });
          });
        })
        .catch((error) => console.log(error));
    }
  }, [connection]);

  const sendMessage = async () => {
    if (connection) await connection.send("SendMessage", inputText);
    setInputText("");
  };

 
};