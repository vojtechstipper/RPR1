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
import Button from '@mui/material/IconButton';
import {IconButton, Paper} from "@mui/material";
import {useState} from "react";


const ProductCard = ({name}, {description}) => {
    const [count, setCount] = useState(0);
    const theme = useTheme();

//   const { data } = this.data;
  return (
      <Paper elevation={5} sx={{width: 500}}>
      <Card sx={{ display: 'flex', boxShadow: 14, width: 500, marginTop: 20, backgroundColor: "#f1efef", padding: 2 }}>
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <CardContent sx={{ flex: '1 0 auto' }}>
                  {/*Left Sside*/}
                  <Grid container spacing={2}>
                      <Grid item xs={8}>
                          <Typography style={{fontWeight: "bold"}} fontSize={20} variant="h4">
                              {name}
                          </Typography>
                          <Typography style={{fontWeight: "bold"}} variant="h6.heading" color="red">
                              35 CZK
                          </Typography>
                          <Typography variant="subtitle1">
                              {/*{description}*/}
                              Zde je nějaký popisek k danému produktu, který zatím v databázi nemáme.

                          </Typography>
                          <Typography style={{fontWeight: "bold"}} variant="subtitle2" >
                              Alergeny: 1, 2, 3
                          </Typography>
                      </Grid>
                      <Grid item xs={4}>
                          <CardMedia
                              component="img"
                              sx={{ width: 151, height: 100}}
                              image={coffee}
                              alt="Coffee"
                          />
                          <Box sx={{ width: 151, textAlign: "center"}}>
                              <IconButton onClick={() => setCount(count -1)} aria-label="delete" color="error">
                                  < RemoveIcon />
                              </IconButton>
                              <Typography style={{fontWeight: "bold", display: "inline-block"}}   variant="h6.heading" color="red">
                                  {count}
                              </Typography>
                              {/* Nesmi do zaprnych cisel */}
                              <IconButton onClick={() => setCount(count +1)} aria-label="delete"  color="error">
                                  <AddIcon />
                              </IconButton>
                          </Box>

                      </Grid>

                  {/*Right side*/}
                  </Grid>


              </CardContent>
          </Box>

          {/*<CardMedia*/}
          {/*    component="img"*/}
          {/*    sx={{ width: 151 }}*/}
          {/*    image="/static/images/cards/live-from-space.jpg"*/}
          {/*    alt="Live from space album cover"*/}
          {/*/>*/}
      </Card>
      </Paper>
  );
};

export default ProductCard;