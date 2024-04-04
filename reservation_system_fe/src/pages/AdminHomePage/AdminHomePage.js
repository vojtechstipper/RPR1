import React from 'react';
import AdminSideBar from "../../components/shared/admin/AdminSidebar";
import { HubConnectionBuilder } from "@microsoft/signalr";
import { useEffect, useState } from "react";
import moment from 'moment/moment';
import { getNotStartedOrders, sendChangeOrderStepRequest } from '../../services/apiService';
import OrdersBoard from '../../containers/OrdersBoard';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';


function AdminHomePage() {
    const [connection, setConnection] = useState(null);
    const [messages, setMessages] = useState([]);
  
    useEffect(() => {
      console.log("Useffect2")
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
      console.log("Useffect1")
      if (connection) {
        connection
          .start()
          .then(() => {
            connection.on("ReceivedOrder", (message) => {
              console.log("obržena objednávka")
              message.orderedAt = moment(message.orderedAt).format("HH:mm");
              message.orderedFor = moment(message.orderedFor).format("HH:mm");
              //Tady se zprávy jen přidávají do již existujícího pole zpráv
              setMessages((prevMessages) => [...prevMessages, message]);
            });
          })
          .catch((error) => console.log(error));
      }
    }, [connection]);
  
    const moveCard = async (orderId, status) => {
      await sendChangeOrderStepRequest({
        orderId: orderId,
        status: status,
      }).then(update(orderId, status));
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