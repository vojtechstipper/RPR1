import { Card, Grid, Typography } from "@mui/material";
import { useDrag, useDrop } from "react-dnd";
import AdminOrderCard from "../components/shared/admin/AdminOrderCard";

const OrdersBoard = ({ cards, moveCard }) => {
    const statuses = ['NotStarted', 'InPreparation', 'Prepared', 'Finished', 'Canceled'];
   
    const DraggableCard = ({ id, orderStatus, children, moveCard }) => {
        const [{ isDragging }, drag] = useDrag({
          item: { id, orderStatus },
          type:"card",
          collect: (monitor) => ({
            isDragging: !!monitor.isDragging(),
          }),
        });

       
      
        return (
          <div
            ref={drag}
            style={{ opacity: isDragging ? 0.5 : 1, padding: 10 }}
          >
            <Card>{children}</Card>
          </div>
        );
      };
      
      const DroppableColumn = ({ status, children, moveCard }) => {
        const [, drop] = useDrop({
          accept: 'card',
          drop: (item) => moveCard(item.id, status),
        });
      
        return (
          <div ref={drop} style={{border:"1px solid"  }}>
            <Typography variant="h4" align="center">
              {status}
            </Typography>
            <Grid item sx={{ width: "90%", minWidth:'180px'}}>
              {children}
            </Grid>
          </div>
        );
      };


    return(
        <Grid container maxWidth={true} >
          {statuses.map((orderStatus) => (
            <DroppableColumn key={orderStatus} status={orderStatus} moveCard={moveCard}>
              {cards
                .filter((card) => card.orderStatus === orderStatus)
                .map((card) => (
                  <DraggableCard key={card.id} {...card} moveCard={moveCard}>
                    <AdminOrderCard data={card}></AdminOrderCard>
                  </DraggableCard>
                ))}
            </DroppableColumn>
          ))}
        </Grid>
      );
}

export default OrdersBoard;