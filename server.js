const express= require('express');
require("dotenv").config();
// const session = require('express-session');
// const passport = require('passport');
const mongoose =require('mongoose');
const NoteModel = require('./models/note');

// require('./src/auth');

// function isLoggedin(req,res,next){
//     req.user ? next() : res.sendStatus(401);
// 
const app=express();
const PORT=process.env.PORT;
//Express middleware
app.use(express.urlencoded({extended:true}));
//connect to mongo
mongoose.connect(process.env.DB_URI,{useNewUrlParser:true,useUnifiedTopology:true}).then((result)=>{
    console.log("connected to db");
    //listening for requests after database connection has been made
    app.listen(PORT,()=>console.log('listening'));
}).catch((err)=>{
    console.log(err);
});

//DB Routes
app.get('/add-note',(req,res)=>{
    const note = new NoteModel({
        title:'Survey',
        sem: 'S1',
        sub: "BCC",
        module:"3",
        category:"Note",
        link: 'https://drive.google.com/file/d/1hn1i654hK-vE6O5qYupmHBpSafg2gt8U/view?usp=sharing'
    });

    note.save()
        .then((result)=>{
            res.send(result)
        })
        .catch((err)=>{
            console.log(err);
        });
})

app.post('/add-note',(req,res)=>{
    const note = new NoteModel({
        title:req.body.title,
        sem: req.body.sem,
        sub: req.body.sub,
        module:req.body.module,
        category:req.body.category,
        link: req.bodylink
    });

    note.save()
        .then((result)=>{
            res.send(result)
            res.redirect('/note')
        })
        .catch((err)=>{
            console.log(err);
        });
})

app.get('/note',(req,res)=>{
    NoteModel.find().then((result)=>{
        res.send(result);
    })
    .catch((err)=>{
        console.log(err);
    })
})

app.post('/filter-note',(req,res)=>{
    NoteModel.find({title:req.body.title,sem:req.body.sem,module:req.body.module,type:req.body.type})
    .then((result)=>{
        res.send(result);
    }).catch((err)=>{
        console.log(err);
    })
})

// app.use(session({secret:'hello'}));
// app.use(passport.initialize());
// app.use(passport.session());

app.get('/',(req,res)=>{
    res.send("<a href='/auth/google'>Login with Google</a>");
})

// app.get('/auth/google',passport.authenticate('google',{scope:['profile','email']}))
// app.get('/google/callback',passport.authenticate('google',{
//     successRedirect:'/auth/success',
//     failureRedirect:'/auth/failure'
// }))
// app.get('/auth/success',isLoggedin,(req,res)=>{
//     res.send(`Hello ${req.user.displayName}`);
// })

// app.get('/auth/failure',(req,res)=>{
//     res.send("Error");
// })

// app.get('/logout',(req,res)=>{
//     req.logOut();
//     req.session.destroy();
//     res.send('Bye');
// })