import React, { useState, useEffect } from "react";

import "./App.css";
import Post from "./Post";
import { db, auth } from "./firebase";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import { Button, Input } from "@material-ui/core";
import ImageUpload from "./ImageUpload";
import InstagramEmbed from "react-instagram-embed";

import TelegramIcon from '@material-ui/icons/Telegram';
import {  IconButton } from "@material-ui/core";
import {BrowserRouter as Router, Route, Link,Switch} from 'react-router-dom';
import Home from "./Home";

import alanBtn from "@alan-ai/alan-sdk-web";
function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));
const alanKey="3b39a0cf3dd8d9d7d83d849f11c00b952e956eca572e1d8b807a3e2338fdd0dc/stage";
function App() {
  const classes = useStyles();
  const [posts, setPosts] = useState([]);
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [user, setUser] = useState(null);
  const [openSignIn, setOpenSignIn] = useState(false);


useEffect(()=>{
  alanBtn({
   key: alanKey,
    onCommand :({command})=>{
      if(command === 'testCommand'){
        alert("this is working");
      }
    }
  })
},[])

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        // if user is logged in}
        console.log(authUser);
        setUser(authUser);
      } else {
        // this
        setUser(null);
      }
    });
    return () => {
      // perform cleanup before refire this code
      unsubscribe();
    };
  }, [user, username]);

  //using useEffect there for conditional rendering
  useEffect(() => {
    // this is ewher the code runs
    db.collection("posts").onSnapshot((snapshot) => {
      // every new post fire this code
      setPosts(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          post: doc.data(),
        }))
      );
    });
  }, []);

  const signUp = (event) => {
    event.preventDefault();
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((authUser) => {
        return authUser.user.updateProfile({
          displayName: username,
        });
      })
      .catch((error) => alert(error.message));
    setOpen(false);
  };

  const signIn = (event) => {
    event.preventDefault();
    auth
      .signInWithEmailAndPassword(email, password)
      .catch((error) => alert(error.message));

    setOpenSignIn(false);
  };
  
  
  return (
    <div className="App">

    

  
 
   
    
      <Modal open={open} onClose={() => setOpen(false)}>
        <div style={modalStyle} className={classes.paper}>
          <form className="app__signup">
            <center>
              <img className="app__headerImage" src="logo07.png" alt=""></img>
            </center>
            <Input
              placeholder="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />

            <Input
              placeholder="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <Input
              placeholder="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button type="submit" onClick={signUp}>
              sign Up
            </Button>
          </form>
        </div>
      </Modal>

      <Modal open={openSignIn} onClose={() => setOpenSignIn(false)}>
        <div style={modalStyle} className={classes.paper}>
          <form className="app__signup">
            <center>
              <img className="app__headerImage" src="logo07.png" alt=""></img>
            </center>

            <Input
              placeholder="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <Input
              placeholder="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button type="submit" onClick={signIn} color="primary">
              Sign In
            </Button>
          </form>
        </div>
        
      </Modal>


   

      <div className="app__header">
      
        <img
          className="app__headerImage"
          src="logo09.png"
          // insta url -- https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png
          alt=""
        ></img>
        
        

        {user ? (
          <Button onClick={() => auth.signOut()}>LogOut</Button>
        ) : (
          <div className="app__loginController">
            <Button onClick={() => setOpenSignIn(true)} color="primary">
              Sign In
            </Button>
            <Button onClick={() => setOpen(true)} color="primary">
              Sign Up
            </Button>
          </div>
          
        )}
        
      </div>
      <div className="chatInit">
      

<Router>
<Route path="/init" exact component={Home}/>
          <Link to="/init"><h1><IconButton> <TelegramIcon color="action" style={{ fontSize: 60 }}/></IconButton></h1></Link>
</Router>


</div>

     

      {/* posts */}
      <div className="app__post">
        <div className="app__postLeft">
          {posts.map(({ id, post }) => (
            <Post
              key={id}
              postId={id}
              user={user}
              username={post.username}
              caption={post.caption}
              imageUrl={post.imageUrl}
            />
          ))}
        </div>
        <div className="app__postRight">
          <InstagramEmbed
            url="https://instagr.am/p/CEPir34pDmS/"
            maxWidth={320}
            hideCaption={false}
            containerTagName="div"
            protocol=""
            injectScript
            onLoading={() => {}}
            onSuccess={() => {}}
            onAfterRender={() => {}}
            onFailure={() => {
              console.log("nahi kaam kar ra be");
            }}
          />

          <InstagramEmbed
            url="https://instagr.am/p/CEHQaM8g7Ce/"
            maxWidth={320}
            hideCaption={false}
            containerTagName="div"
            protocol=""
            injectScript
            onLoading={() => {}}
            onSuccess={() => {}}
            onAfterRender={() => {}}
            onFailure={() => {
              console.log("nahi kaam kar ra be");
            }}
          />
        </div
        >
      </div>

      {user?.displayName ? (
        <ImageUpload username={user.displayName} />
      ) : (
        <h3>
          <center>SignIn 2 be SOCsIAL</center>
        </h3>
      )}

   
        
    </div>
  
  );
}



export default App;
