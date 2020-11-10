import React from "react"
import Grid from "@material-ui/core/Grid"
import MenuAppBar from "../components/Header/Header"
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import { withStyles, createStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import { Facebook } from "@material-ui/icons";
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from '@material-ui/core/InputAdornment';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

const styles = createStyles((theme) => ({
  main: {
    width: "auto",
    display: "block",
    marginLeft: theme.spacing(3),
    marginRight: theme.spacing(3),
    [theme.breakpoints.up("sm")]: {
      width: 400,
      marginLeft: "auto",
      marginRight: "auto",
    },
  },
  paper: {
    marginTop: theme.spacing(12),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: theme.spacing(3),
    borderRadius:"20px",
    border:"2px solid #104E8B",
    borderTop:"10px solid #104E8B",
    borderBottom:"10px solid #104E8B",
  },

  form: {
    width: "100%",
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(2),
  },
  submit: {
    marginTop: theme.spacing(3),
    width:"200px",
    borderRadius:"20px",
    margin:"0 auto",
  },
  signInIcon: {
    color: "white",
    
  },
  googleButton: {
    borderColor: "#104E8B",
    color: "#104E8B",
    margin: theme.spacing(2),
    borderRadius:"60px",
    width:"63px",
    height:"63px",
    textAlign:"center"
  },
  facebookButton: {
    color: "white",
    backgroundColor: "#104E8B",
    margin: theme.spacing(2),
    borderRadius:"60px",
    "&:hover": {
      backgroundColor: "blue",
    },
    width:"63px",
    height:"63px",
    textAlign:"center"
  },
  linkedInButton: {
    backgroundColor: "#027bb6",
    marginTop: theme.spacing(2),
    color: "white",
    "&:hover": {
      backgroundColor: "blue",
    },
  },
  linkedInIcon: {
    marginRight: theme.spacing(1),
  },
}));

const googleLogin = () => {
  let url = new URL("https://accounts.google.com");
  url.pathname = "/o/oauth2/v2/auth";
  url.searchParams.set(
    "client_id",
    process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || ""
  );
  url.searchParams.set(
    "redirect_uri",
    `${window.location.protocol}//${window.location.host}/login/google`
  );
  url.searchParams.set("response_type", "code");
  url.searchParams.set("access_type", "offline");
  url.searchParams.set("prompt", "consent");
  url.searchParams.set("scope", ["openid", "profile", "email"].join(" "));

  window.location.href = url.toString();
};

const facebookLogin = () => {
  let url = new URL("https://www.facebook.com/");
  url.pathname = "v6.0/dialog/oauth";
  url.searchParams.set(
    "redirect_uri",
    `${window.location.protocol}//${window.location.host}/login/facebook`
  );
  url.searchParams.set(
    "client_id",
    process.env.NEXT_PUBLIC_FACEBOOK_CLIENT_ID || ""
  );
  url.searchParams.set("scope", ["email"].join(","));
  window.location.href = url.toString();
};



function Home(classes) {

  const logIn = (event) =>{

    event.preventDefault();
    var payload = JSON.stringify({
      email: values['email1'],
      password: values[`password1`]
    })

    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/account/custom_login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
    },
      body: payload
    }).then((resp) => resp.json())
      .then((response) => {
        if(response.status === 401)
        {
          alert(response.message)
          window.location.href= "/login"
        }
        else if(response.status === 404){
          alert("Please enter your details properly.")
          window.location.href= "/login"
        }
        else if(response.status === 200){
        localStorage.token = response.token;
        document.cookie = `token=${response.token}; path=/; max-age=${
            60 * 60 * 24 * 100
            }`;
        localStorage.onlinejudge_info = JSON.stringify({
            name: response.user.name,
            email: response.user.email,
            image_link: response.user.image_link
        })

        window.location.href = "/"
        
    }})
        
      .catch((error) => { console.log(error) });





  }

  const [values, setValues] = React.useState({
    email1: '',
    email2: '',
    password1: '',
    password2: '',
    username: '',
    first_name: '',
    showPassword: false,
  });


  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };


  return (
    <>
      <MenuAppBar />
      <main className={classes.main}>
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justify="center"
        style={{ minHeight: '100vh' }}
      >

        <Grid item xs={3}>
          {/* <LoginForm /> */}
          <Paper className={classes.paper}>
          
          <Typography variant="h3" gutterBottom style={{color:"#104E8B"}}>
            Login
        </Typography>
        <Button
            variant="outlined"
            color="secondary"
            //onClick={() => Router.push("/signup")}
            style={{ border: "None", outline: "none" }}
          >
            Didn't Sign Up? Register here.
        </Button>
          <form
            className={classes.form}


          >
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="email">Email</InputLabel>
              <Input
                value={values.email1}
                onChange={handleChange('email1')}
                name="email"
                autoFocus
              />
            </FormControl>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="password">Password</InputLabel>
              <Input
                id="standard-adornment-password"
                type={values.showPassword ? 'text' : 'password'}
                value={values.password1}
                onChange={handleChange('password1')}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                    >
                      {values.showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>
            <br/>
              <br/>
              <br/>
            <div style={{textAlign:"center"}}>
            <Button
              variant="contained"
              type="submit"
              fullWidth
              color="primary"
              className={classes.submit}
              onClick={logIn}
            >
              LogIn
          </Button>
          <br/>
              <br/>
              OR
          </div>
          <br/>
          
              <div style={{textAlign:"center"}}>
            <Button
              variant="outlined"
              className={classes.googleButton}
              size="large"
              fullWidth
              onClick={() => googleLogin()}
            >
              <img
                src="https://img.icons8.com/color/24/000000/google-logo.png"
                className={classes.signInIcon}
              />
            {/* Login with Google */}
          </Button>
            <Button
              variant="outlined"
              color="secondary"
              size="large"
              fullWidth
              onClick={() => facebookLogin()}
              className={classes.facebookButton}
            >
              <Facebook className={classes.signInIcon} />
            {/* Login with Facebook */}
          </Button>
          </div>
          </form>
          
        </Paper>
        </Grid>

      </Grid></main>
    </>
  )
}

export default withStyles(styles)(Home);