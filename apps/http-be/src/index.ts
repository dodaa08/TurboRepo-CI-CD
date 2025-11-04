import "dotenv/config";
import express from "express";
const app = express();
const port = 8000;
import { pgClient } from "@repo/prisma/client";

app.use(express.json());

app.post("/signup", async (req, res)=>{
    const {email, password} = req.body;
    try{
        const response = await pgClient.user.create({
            data : {
                email : email,
                password : password
            }
        });

        res.json({
            message : "user created",
            user : response
        })
    }
    catch(error){
        console.log("error", error);
    }
});


app.get("/", ()=>{
    console.log("default route..");
});

app.listen(port, ()=>{
    console.log("Listening on ", port);
})