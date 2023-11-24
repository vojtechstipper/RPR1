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

    const handleAddClick = () => {
        setCount((prevCount) => (prevCount >= 0 ? prevCount + 1 : prevCount));
    };

    const handleRemoveClick = () => {
        setCount((prevCount) => (prevCount > 0 ? prevCount - 1 : prevCount));
    };

    return (
        <Paper elevation={5} sx={{width: 500, margin: '60px'}}>
            <Card sx={{display: 'flex', boxShadow: 14, width: 500, backgroundColor: '#f1efef', padding: 2}}>
                <Box sx={{display: 'flex', flexDirection: 'column'}}>
                    <CardContent sx={{flex: '1 0 auto'}}>
                        <Grid container>
                            <Grid item xs={8} width={300}>
                                <Typography style={{fontWeight: 'bold'}} fontSize={20} variant="h4">
                                    {name}
                                </Typography>
                                <Typography style={{fontWeight: 'bold'}} variant="h6.heading" color="red">
                                    35 CZK
                                </Typography>
                                <Typography variant="subtitle1">
                                    {/*{description}*/}
                                    Zde je nějaký popisek k danému produktu, který zatím v databázi nemáme.
                                </Typography>
                                <Typography style={{fontWeight: 'bold'}} variant="subtitle2">
                                    {/*{allergens}*/}
                                    Alergeny: 1, 2, 3
                                </Typography>
                            </Grid>
                            <Grid item xs={4}>
                                <CardMedia
                                    component="img"
                                    sx={{width: 151, height: 100}}
                                    image={coffee}
                                    alt="Coffee"
                                />
                                <Box sx={{width: 151, textAlign: 'center'}}>
                                    <IconButton onClick={handleRemoveClick} aria-label="delete" color="error">
                                        <RemoveIcon/>
                                    </IconButton>
                                    <Typography style={{fontWeight: 'bold', display: 'inline-block'}}
                                                variant="h6.heading" color="red">
                                        {count}
                                    </Typography>
                                    <IconButton onClick={handleAddClick} aria-label="delete" color="error">
                                        <AddIcon/>
                                    </IconButton>
                                </Box>
                            </Grid>
                        </Grid>
                    </CardContent>
                </Box>
            </Card>
        </Paper>
    );
};

export default FoodItemCard;