import { Card, CardContent, Typography } from "@mui/material";
import { useEffect, useState } from "react";

const AdminOrderCard = ({data}) => {
    const [order, setOrder] = useState(null);
  
    return (
        <Card>
        <CardContent>
        <Typography textAlign="right" variant="h8" fontWeight="bold" component="div">
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
            {data.orderedFor}
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
          <Typography color="text.secondary">
            Žádná poznámka
          </Typography>
        </CardContent>
      </Card>
    );
  };
  
  export default AdminOrderCard;
  