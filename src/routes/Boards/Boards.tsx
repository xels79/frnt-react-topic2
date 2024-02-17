
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import { Box, Card, CardContent, CardHeader, ListItem, Paper, Typography } from '@mui/material';


export default function Boards(){

    return (
        <Box component="div" sx={{pb:10.5}}>
        <Card variant="outlined"  sx={{ boxShadow: 4, maxWidth: 460, margin:'0 auto 1rem auto'}}>
            <List
                sx={{ width: '100%', bgcolor: 'background.paper' }}
                component="div"
                aria-labelledby="nested-list-subheader"
                subheader={
                <ListSubheader component="div" id="nested-list-subheader">
                    Задание №1
                </ListSubheader>
                }
            >
                <ListItem>
                    <Card sx={{width:'100%'}}>
                        <CardContent>
                            <Typography sx={{ fontSize: '1.2rem' }} color="text.primary" gutterBottom>
                                Действие 1:
                            </Typography>
                            <Typography sx={{ mb: .125 }} color="text.secondary" variant='body2'>
                                Описание действия 1
                            </Typography>
                            <Typography sx={{ mb: .125 }} color="text.secondary" variant='body2'>
                                Описание действия 1.1
                            </Typography>
                            <Typography sx={{ mb: 1.5 }} color="text.secondary" variant='body2'>
                                Описание действия 1.2
                            </Typography>
                        </CardContent>
                    </Card>
                </ListItem>
                <ListItem>
                    <Card sx={{width:'100%'}}>
                        <CardContent>
                            <Typography sx={{ fontSize: '1.2rem' }} color="text.primary" gutterBottom>
                                Действие 2:
                            </Typography>
                            <Typography sx={{ mb: .125 }} color="text.secondary" variant='body2'>
                                Описание действия 2
                            </Typography>
                            <Typography sx={{ mb: .125 }} color="text.secondary" variant='body2'>
                                Описание действия 2.1
                            </Typography>
                            <Typography sx={{ mb: 1.5 }} color="text.secondary" variant='body2'>
                                Описание действия 2.2
                            </Typography>
                        </CardContent>
                    </Card>
                </ListItem>
            </List>
        </Card>
        <Card variant="outlined" sx={{ boxShadow: 4, maxWidth: 460, margin:'0 auto'}}>
            <CardHeader title="Задание №2" subheader="September 14, 2016"/>
                <CardContent sx={{textAlign:'left'}}>
                    {/* <Card sx={{width:'100%'}}>
                        <CardContent> */}
                            <Paper elevation={3} sx={{padding:'1rem 2rem 1rem 2rem', mb:2}}>
                            <Typography sx={{ fontSize: '1.2rem' }} color="text.primary" gutterBottom>
                                Действие 1:
                            </Typography>
                            <Typography sx={{ mb: .125 }} color="text.secondary" variant='body2'>
                                Описание действия 1
                            </Typography>
                            <Typography sx={{ mb: .125 }} color="text.secondary" variant='body2'>
                                Описание действия 1.1
                            </Typography>
                            <Typography sx={{ mb: .125 }} color="text.secondary" variant='body2'>
                                Описание действия 1.2
                            </Typography>
                            </Paper>
                        {/* </CardContent>
                    </Card>
                    <Card sx={{width:'100%'}}>
                        <CardContent> */}
                            <Paper elevation={3} sx={{padding:'1rem 2rem 1rem 2rem'}}>
                            <Typography sx={{ fontSize: '1.2rem' }} color="text.primary" gutterBottom>
                                Действие 2:
                            </Typography>
                            <Typography sx={{ mb: .125 }} color="text.secondary" variant='body2'>
                                Описание действия 2
                            </Typography>
                            <Typography sx={{ mb: .125 }} color="text.secondary" variant='body2'>
                                Описание действия 2.1
                            </Typography>
                            <Typography sx={{ mb: .125 }} color="text.secondary" variant='body2'>
                                Описание действия 2.2
                            </Typography>
                            </Paper>
                        {/* </CardContent>
                    </Card> */}
                </CardContent>
        </Card>
        </Box>
    );
}