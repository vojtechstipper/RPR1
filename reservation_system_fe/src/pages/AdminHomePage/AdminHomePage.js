import React from 'react';
import AdminSideBar from "../../components/shared/admin/AdminSidebar";
import { HubConnectionBuilder } from "@microsoft/signalr";
import { useEffect, useState } from "react";
import moment from 'moment/moment';
import { getNotStartedOrders, sendChangeOrderStepRequest } from '../../services/apiService';
import OrdersBoard from '../../containers/OrdersBoard';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { toast } from "react-toastify";
import {useNavigate} from "react-router-dom";

function AdminHomePage() {
    const [connection, setConnection] = useState(null);
    const [messages, setMessages] = useState([]);
    const navigate = useNavigate();


    useEffect(() => {
      async function fetchOrders() {
        try {
          const response = await getNotStartedOrders(navigate);
          //init stav objednávek
          setMessages([...response]);
        } catch (error) {
          console.error("Chyba při načítání produktů:", error);
          navigate("/error", { state: { error: error.response.status } });        }
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
            console.log("Connected to SignalR!");
          })
          .catch((error) => console.log(error));
            connection.on("ReceivedOrder", (message) => {
              message.orderedAt = moment(message.orderedAt).format("HH:mm");
              message.orderedFor = moment(message.orderedFor).format("HH:mm");          
              setMessages((prevMessages) => [...prevMessages, message]);
            });
      }
    }, [connection]);
  
    useEffect(() => {
    console.log("další userffect")
    console.log(JSON.stringify(messages));
    }, [messages]);

    const moveCard = async (orderId, status) => {
      try{
        await sendChangeOrderStepRequest({
          orderId: orderId,
          status: status,
        })

        update(orderId, status)
      }
      catch{
        toast.error(`Nelze přesunout do ${status}`);
      }        
    };


    function update(id, status) {
      var newArr=[...messages]
      const object = newArr.find((element) => element.id === id);
      object.orderStatus = status;
      setMessages(newArr);
    }
    

    return (
      <div style={{ display: "flex" }}>
        <AdminSideBar />
        <DndProvider backend={HTML5Backend}>
          <OrdersBoard cards={messages} moveCard={moveCard}></OrdersBoard>
        </DndProvider>
      </div>
    );
}

export default AdminHomePage;