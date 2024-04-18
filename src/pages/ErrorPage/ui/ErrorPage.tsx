import { Box, Container, Typography } from '@mui/material'
import { Link } from 'react-router-dom'

export const ErrorPage = () => {
  const timer = 5
  // TODO uncomment it
  // const navigate = useNavigate()
  // const [timer, setTimer] = useState(5)

  // useEffect(() => {
  //   const navigateTimer = setInterval(() => {
  //     setTimer(timer - 1)
  //   }, 1000)

  //   if (timer === 0) {
  //     navigate('/')
  //   }

  //   return () => {
  //     clearTimeout(navigateTimer)
  //   }
  // }, [navigate, timer])

  return (
    <Container>
      <Box
        component="div"
        sx={{
          height: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Typography variant="h1">Error page</Typography>

        <Typography variant="body1" component="span">
          After <b>{timer}</b> seconds you will be redirected to the main page or <Link to="/">click to here</Link>
        </Typography>
      </Box>
    </Container>
  )
}
