import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import coffee from '../static/img/coffee.jpg'
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import {IconButton, Paper} from "@mui/material";
import {useState} from "react";


const FoodItemCard = ({name}, {description}) => {
    const [count, setCount] = useState(0);
    const theme = useTheme();

//   const { data } = this.data;
  return (
    <Paper elevation={5} sx={{ maxWidth: 500, margin: 'auto', padding: 2 }}>
    <Card sx={{ display: 'flex', boxShadow: 14, width: '100%', backgroundColor: "#f1efef", flexDirection: { xs: 'column', md: 'row' } }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
        <CardContent>
          {/*Left Side*/}
          <Typography style={{ fontWeight: "bold" }} fontSize={20} variant="h4">
            {name}
          </Typography>
          <Typography style={{ fontWeight: "bold" }} variant="h6.heading" color="red">
            35 CZK
          </Typography>
          <Typography variant="subtitle1">
            {/*{description}*/}
            Zde je nějaký popisek k danému produktu, který zatím v databázi nemáme.
          </Typography>
          <Typography style={{ fontWeight: "bold" }} variant="subtitle2" >
            Alergeny: 1, 2, 3
          </Typography>
        </CardContent>
      </Box>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: { xs: '100%', md: 'auto' } }}>
        <CardMedia
          component="img"
          sx={{ width: 151, height: 100 }}
          image={coffee}
          alt="Coffee"
        />
        <Box sx={{ textAlign: "center" }}>
          <IconButton onClick={() => setCount(count - 1)} aria-label="delete" color="error">
            <RemoveIcon />
          </IconButton>
          <Typography style={{ fontWeight: "bold", display: "inline-block" }} variant="h6.heading" color="red">
            {count}
          </Typography>
          {/* Nesmi do zaprnych cisel */}
          <IconButton onClick={() => setCount(count + 1)} aria-label="delete" color="error">
            <AddIcon />
          </IconButton>
        </Box>
      </Box>
      {/*Right side*/}
    </Card>
  </Paper>
  );
};

export default FoodItemCard;