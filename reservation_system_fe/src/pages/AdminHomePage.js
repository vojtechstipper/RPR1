import React from 'react';
import Typography from "@mui/material/Typography";
import AdminSideBar from "../components/AdminSidebar";
import { HubConnectionBuilder } from "@microsoft/signalr";
import { useEffect, useState } from "react";
import { Button } from '@mui/material';
import moment from 'moment/moment';
import AdminOrderCard from '../components/AdminOrderCard';
import { getNotStartedOrders } from '../services/apiService';


function AdminHomePage() {
    const [connection, setConnection] = useState(null);
    const [inputText, setInputText] = useState('');
    const [messages, setMessages] = useState([]);
  
    useEffect(() => {

      async function fetchOrders() {
        try {
          const response = await getNotStartedOrders();
          //init stav objednávek
          setMessages([...response]);
        } catch (error) {
          console.error("Chyba při načítání produktů:", error);
        }
    }

    fetchOrders();
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
            connection.on("ReceivedOrder", (message) => {
              message.orderedAt = moment(message.orderedAt).format("HH:mm");
              message.orderedFor = moment(message.orderedFor).format("HH:mm");
              //Tady se zprávy jen přidávají do již existujícího pole zpráv
              setMessages((prevMessages) => [...prevMessages, message]);
            });
          })
          .catch((error) => console.log(error));
      }
    }, [connection]);
  
    const sendMessage = async () => {
        console.log("send message");
      if (connection) await connection.send("SendMessage", inputText);
      setInputText("");
    };
  
    return (
      <div style={{ display: "flex" }}>
        <AdminSideBar />
        <div>
          <Typography>ADMIN HOME PAGE</Typography>
          <Button onClick={sendMessage} type="primary">
            Send
          </Button>
        </div>
        <div>
          {messages.map((message, index) => (
            <AdminOrderCard data={message}></AdminOrderCard>
          ))}
        </div>
      </div>
    );
}

export default AdminHomePage;