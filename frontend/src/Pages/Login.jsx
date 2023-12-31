import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { Container } from '@mui/material';
import { getUserDetail, loginUser } from '../Services/auth';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './../Context/AuthContext';
import { useUserDetail } from './../Context/userDetailContext';

export default function LogIn() {
  const { setAuthToken } = useAuth();
  const { setUserDetail } = useUserDetail();
  const navigate = useNavigate();
  const handleSubmit = async event => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);
    try {
      const response = await loginUser({
        email: data.get('email'),
        password: data.get('password')
      });
      toast.success('Login Successfully !', {
        position: toast.POSITION.TOP_RIGHT
      });
      localStorage.setItem('userToken', JSON.stringify(response.data));
      setAuthToken(JSON.stringify(response.data));
      navigate('/Dashboard');
    } catch (error) {
      toast.error('Invalid Credentials !', {
        position: toast.POSITION.TOP_CENTER
      });
      console.error('An error occurred:', error);
    } finally {
      async function fetchUserData() {
        try {
          const userResponse = await getUserDetail();
          setUserDetail(userResponse.data);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      }
      fetchUserData();
    }
  };

  return (
    <Container component="main" maxWidth="lg">
      <Box
        sx={{
          marginTop: 5,
          marginBottom: 5
        }}
      >
        <Grid container>
          <CssBaseline />
          <Grid
            item
            xs={false}
            sm={4}
            md={4}
            sx={{
              backgroundColor: '#FDC414',
              backgroundRepeat: 'no-repeat',
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
          />
          <Grid
            item
            xs={12}
            sm={8}
            md={8}
            component={Paper}
            elevation={6}
            square
          >
            <Box
              sx={{
                my: 8,
                mx: 4,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center'
              }}
            >
              <Typography component="h1" variant="h5">
                Sign in
              </Typography>
              <Box
                component="form"
                noValidate
                onSubmit={handleSubmit}
                sx={{ mt: 1 }}
              >
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  autoFocus
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                />
                <FormControlLabel
                  control={<Checkbox value="remember" color="primary" />}
                  label="Remember me"
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2, bgcolor: '#FDC414' }}
                >
                  Sign In
                </Button>
                <Grid container>
                  <Grid item>
                    <Link href="/SignUp" variant="body2">
                      {"Don't have an account? Sign Up"}
                    </Link>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
