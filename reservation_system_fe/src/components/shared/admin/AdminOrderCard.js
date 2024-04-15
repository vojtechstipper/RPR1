import { Button, Card, CardContent, Container, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { sendChangeOrderStatusRequest } from "../../../services/apiService";

const AdminOrderCard = ({data}) => {
    const [order, setOrder] = useState(null);
    const [visibleButtons, setButtonsvisible] = useState(false);
  
    const sendChangeOrderStatus = async (accept) => {
      await sendChangeOrderStatusRequest({
        orderId: data.id,
        status: accept ? "Accepted" : "Declined",
      });

      data.orderStatus = accept ? "NotStarted" : "Canceled";
    setButtonsvisible(true)
  };

  function formatTime(dateString) {
    const dateTime = new Date(dateString);

    // Extract hours and minutes
    const hours = dateTime.getHours().toString().padStart(2, "0");
    const minutes = dateTime.getMinutes().toString().padStart(2, "0");

    return `${hours}:${minutes}`;
  }

    return (
      <Card sx={{ width: 1 }}>
        <CardContent>
          <Typography
            textAlign="right"
            variant="h8"
            fontWeight="bold"
            component="div"
          >
            #{data.orderIdentifikator}
          </Typography>
          <Typography variant="h5" fontWeight="bold" component="div">
            Položky
          </Typography>

          {data.orderItems.map((orderItem) => (
            <Typography color="text.secondary">
              {orderItem.count} x {orderItem.productName}
            </Typography>
          ))}

          <Typography variant="h5" fontWeight="bold" component="div">
            Vyzvednutí
          </Typography>
          <Typography color="text.secondary">
            {formatTime(data.orderedFor)}
          </Typography>
          <Typography variant="h5" fontWeight="bold" component="div">
            Zákazník
          </Typography>
          <Typography color="text.secondary">
            {data.userName} | {data.userEmail}
          </Typography>
          <Typography variant="h5" fontWeight="bold" component="div">
            Poznámka
          </Typography>
          <Typography color="text.secondary">{data.orderNote}</Typography>
          {data.orderStatus === "NotStarted" && (
            <Container>
              {/* <Button
                variant="contained"
                color="success"
                disabled={visibleButtons}
                onClick={() => sendChangeOrderStatus(true)}
              >
                Příjmout
              </Button> */}
              <Button
                variant="outlined"
                disabled={visibleButtons}
                onClick={() => sendChangeOrderStatus(false)}
              >
                Zamítnout
              </Button>
            </Container>
          )}
        </CardContent>
      </Card>
    );
  };
  
  export default AdminOrderCard;
  