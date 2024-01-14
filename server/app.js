/*var postmark = require("postmark");

// Send an email:
var client = new postmark.ServerClient("bb51e43f-3d88-46fe-ad20-efeaf6f9e3cc");

client.sendEmail({
  "From": "ugs207230_it.bharath@cbit.org.in",
  "To": "bharathyadav161@gmail.com",
  "Subject": "Hello from Bharath",
  "HtmlBody": "<strong>Hello</strong> dear pavan.",
  "TextBody": "Hello from bharath",
  "MessageStream": "outbound"
});*/
//clie="345303063499-1b3cr0p8936q3td83st9lo54sema36ut.apps.googleusercontent.com"
//sre="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
require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
require("./db/conn");
const PORT = 6005;
const bodyParser = require('body-parser');
const session = require("express-session");
const passport = require("passport");
const OAuth2Strategy = require("passport-google-oauth2").Strategy;
var userdb = require("./model/userSchema")
var Email = require("./model/emailSchema")
const clientid = "345303063499-1b3cr0p8936q3td83st9lo54sema36ut.apps.googleusercontent.com"
const clientsecret = "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"


app.use(cors({
    origin:"http://localhost:3000",
    methods:"GET,POST,PUT,DELETE",
    credentials:true
}));
app.use(express.json());
app.use(bodyParser.json());
// setup session
app.use(session({
    secret:"bharath",
    resave:false,
    saveUninitialized:true
}))

// setuppassport
app.use(passport.initialize());
app.use(passport.session());

passport.use(
    new OAuth2Strategy({
        clientID:clientid,
        clientSecret:clientsecret,
        callbackURL:"/auth/google/callback",
        scope:["profile","email"]
    },
    async(accessToken,refreshToken,profile,done)=>{
        try {
            let user = await userdb.findOne({googleId:profile.id});

            if(!user){
                user = new userdb({
                    googleId:profile.id,
                    displayName:profile.displayName,
                    email:profile.emails[0].value,
                    image:profile.photos[0].value
                });

                await user.save();
            }

            return done(null,user)
        } catch (error) {
            return done(error,null)
        }
    }
    )
)

passport.serializeUser((user,done)=>{
    done(null,user);
})

passport.deserializeUser((user,done)=>{
    done(null,user);
});

// initial google ouath login
app.get("/auth/google",passport.authenticate("google",{scope:["profile","email"]}));

app.get("/auth/google/callback",passport.authenticate("google",{
    successRedirect:"http://localhost:3000/dashboard",
    failureRedirect:"http://localhost:3000/login"
}))

app.get("/login/sucess",async(req,res)=>{

    if(req.user){
        res.status(200).json({message:"user Login",user:req.user})
    }else{
        res.status(400).json({message:"Not Authorized"})
    }
})

app.get("/logout",(req,res,next)=>{
    req.logout(function(err){

        if(err){return next(err)}
        res.redirect("http://localhost:3000");
    })
})

const POSTMARK_API_KEY = 'bb51e43f-3d88-46fe-ad20-efeaf6f9e3cc';

app.post('/api/send-email', async (req, res) => {
    try {
      const { to, subject, body } = req.body;
  
      // Save email information to MongoDB
      const email = new Email({ to, subject, body });
      await email.save();
  
      res.status(200).json({ message: 'Email information stored successfully.' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  });
app.get('/dashboard', async (req, res) => {
  try {
    const response = await axios.get('https://api.postmarkapp.com/messages/outbound', {
      headers: {
        'X-Postmark-Server-Token': POSTMARK_API_KEY,
      },
    });

    const communicationHistory = response.data;
    res.json(communicationHistory);
  } catch (error) {
    console.error('Error fetching communication history:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
app.listen(PORT,()=>{
    console.log(`server start at port no ${PORT}`)
})