import express from "express";
import bodyparser from "body-parser";
import fs from "fs";
import readline from "linebyline";


import { dirname } from "path";
import { fileURLToPath } from "url";
const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const port = 3000;

let existingtasks=[];
let existingworks=[];
app.use(express.static("public"));

app.use(bodyparser.urlencoded({extended: true}));

app.get("/", (req, res) => {
    existingtasks=[];
    const allFileContents = fs.readFileSync('tasks.txt', 'utf-8');
allFileContents.split(/\r?\n/).forEach(line =>  {
    existingtasks.push(line);
});

//console.log(existingtasks);

res.render("tasks.ejs",{existingdata:existingtasks,title:"Task List",subTitle:"All Tasks"});
});


app.post("/tasks", (req, res) => {
//    console.log(req.body["task"]);
    if (req.body["task"]!==''){
//   console.log(`printing from submit options ${existingtasks}`);
    existingtasks.push(req.body["task"]);

    fs.open('tasks.txt', 'a', 666, function( e, id ) {
   fs.write( id,  "\r\n" + req.body["task"] , null, 'utf8', function(){
    fs.close(id, function(){});
   });
  });
}
 res.render("tasks.ejs",{existingdata:existingtasks,title:"Task List",subTitle:"All Tasks"});
    
});



app.get("/works", (req, res) => {
    existingworks=[];
    const allFileContents = fs.readFileSync('works.txt', 'utf-8');
allFileContents.split(/\r?\n/).forEach(line =>  {
    existingworks.push(line);
});

//console.log(existingtasks);

res.render("works.ejs",{existingdata:existingworks,title:"Work Items",subTitle:"All Work Items"});
});


app.post("/works", (req, res) => {

    if (req.body["work"]!==''){
    existingworks.push(req.body["work"]);

    fs.open('works.txt', 'a', 666, function( e, id ) {
   fs.write( id,  "\r\n" + req.body["work"] , null, 'utf8', function(){
    fs.close(id, function(){});
   });
  });
}
 res.render("works.ejs",{existingdata:existingworks,title:"Work Items",subTitle:"All Work Items"});
    
});





app.listen(port, ()=>{
    console.log("listenijg on 3000");
});


