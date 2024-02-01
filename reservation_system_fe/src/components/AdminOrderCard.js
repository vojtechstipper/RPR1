import { Button, Card, CardContent, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { sendChangeOrderStatusRequest } from "../services/apiService";

const AdminOrderCard = ({data}) => {
    const [order, setOrder] = useState(null);
    const [visibleButtons, setButtonsvisible] = useState(false);
  
    const sendChangeOrderStatus = async (accept) => {
      console.log("nevím proc")
      await sendChangeOrderStatusRequest({
        orderId: data.Id,
        status: accept ? "Accepted" : "Declined",
      });
    setButtonsvisible(true)
  };

    return (
      <Card>
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
          <Typography color="text.secondary">{data.orderedFor}</Typography>
          <Typography variant="h5" fontWeight="bold" component="div">
            Zákazník
          </Typography>
          <Typography color="text.secondary">
            {data.userName} | {data.userEmail}
          </Typography>
          <Typography variant="h5" fontWeight="bold" component="div">
            Poznámka
          </Typography>
          <Typography color="text.secondary">Žádná poznámka</Typography>
          <Button
            variant="contained"
            color="success"
            disabled={visibleButtons}
            onClick={() => sendChangeOrderStatus(true)}
          >
            Příjmout
          </Button>
          <Button
            variant="outlined"
            disabled={visibleButtons}
            onClick={() => sendChangeOrderStatus(false)}
          >
            Zamítnout
          </Button>
        </CardContent>
      </Card>
    );
  };
  
  export default AdminOrderCard;
  