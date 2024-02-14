import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Copyright from '../../components/Copyright/Copyright';

// TODO remove, this demo shouldn't need to reset the theme.

export default function Layout(){
    return (
        <Box
            sx={{
            display: 'flex',
            flexDirection: 'column',
            }}
        >
            <CssBaseline />
            <Box
            component="footer"
            sx={{
                py: 3,
                px: 2,
                mt: 'auto',
                backgroundColor: (theme) =>
                theme.palette.mode === 'light'
                    ? theme.palette.grey[200]
                    : theme.palette.grey[800],
            }}
            >
            <Container maxWidth="sm">
                <Typography variant="body1">
                My sticky footer can be found here.
                </Typography>
                <Copyright />
            </Container>
            </Box>
        </Box>
    );
}