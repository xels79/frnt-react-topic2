import { Avatar, Box, Button, Card, Divider, Stack, Typography } from '@mui/material';
import {  useHref } from 'react-router-dom';
import { RemoveCircleOutline } from '@mui/icons-material';
import { red } from '@mui/material/colors';
export default function Error() {
    return (
        <Card variant="outlined" sx={{ maxWidth: 560, margin:'0 auto' }}>
            <Box sx={{ p: 2 }}>
                <Stack spacing={2}>
                    <Stack direction="row" spacing={1} alignItems="center">
                        <Avatar sx={{ bgcolor:red[500] }}><RemoveCircleOutline fontSize='small' /></Avatar>
                        <Typography gutterBottom variant="h4" component="div">403</Typography>
                    </Stack>
                    <Typography color="text.secondary" variant="body2" fontSize={"1.4rem"} textAlign={"left"}>Доступ запрещен</Typography>
                </Stack>
            </Box>
            <Divider />
            <Box sx={{ p: 2 }} textAlign={"left"}>
                <Button href={useHref('/')} variant="contained" color="primary">На главную</Button>
            </Box>
        </Card>
    );
}