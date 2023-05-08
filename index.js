 



const express = require('express') ;
const http = require("http");
var bodyParser = require('body-parser')
const app = express();
 


app.set('view engine', 'ejs');
app.set('view cache', false);

// parse application/json
app.use(bodyParser.json())

app.use(express.static(__dirname + "/public"));

app.get('/', (req, res) => {
    res.render('app');
});
var mapFlyViews = [{
    name: 'Capital Overview',
    coordinates: [73.51649, 4.18429],
    bearing: -3.60000,
    pitch: 63.20000,
    zoom: 14.957617104137901,
    description: 'Zoom in to view of Male ,Hulhule, Hulhumale and Dhoonidhoo'
},
{
    name: 'Male City',
    coordinates: [73.51039, 4.17439],
    bearing: 0,
    pitch: 0,
    zoom: 16,
    description: 'Zoom in to Male city'
},
{
    name: 'Hulhumale City',
    coordinates: [73.54240, 4.22154],
    bearing: -73,
    pitch: 0,
    zoom: 15,
    description: 'Zoom in to Hulhumale city'
},
{
    name: 'Ga. Villigili',
    coordinates: [73.43413, 0.75838],
    bearing: 88,
    pitch: 0,
    zoom: 15.79,
    description: 'Zoom in to Ga. Villigli area'
}, 
{
    name: 'Gdh. Thinadhoo',
    coordinates: [72.99806, 0.53199],
    bearing: -73,
    pitch: 0,
    zoom: 16.03,
    description: 'Zoom in to Gdh. Thinadhoo area'
},
{
    name: 'Laamu Atoll',
    coordinates: [73.49248256038058, 1.9025427815391625],
    bearing: 0,
    pitch: 0,
    zoom: 13,
    description: 'Zoom in to L atoll Funadhoo region'
},
{
    name: 'Fuvahmulah City',
    coordinates: [73.42450568609375, -0.2957235668254566],
    bearing: 0,
    pitch: 0,
    zoom: 14,
    description: 'Zoom in to Fuvahmulah city'
},
{
    name: 'Addu City',
    coordinates: [73.15801, -0.64636],
    bearing: 0,
    pitch: 0,
    zoom: 13,
    description: 'Zoom in to Addu atoll region'
},
]
// array sample
app.get("/flyViews", function(req, res){
   
    res.render("partials/flyViews.ejs", {flyViews: mapFlyViews})
});

app.post("/departmentListx",function (req, res)  {
    res.render("partials/depts-list.ejs",  res.json({data:req.body}));
  });


app.post("/departmentList", (req, res, next)   =>{
    res.render("partials/depts-list.ejs",   req.body);
  });
  app.post("/unitList", (req, res, next)   =>{
    res.render("partials/units-list.ejs",   req.body);
  });


app.post("/myList", (req, res, next)   =>{
   
    res.render("partials/my-list.ejs",  req.body);
});




 app.get("/deptListLayout", function(req, res){
   
    res.render("partials/depts-list-layout.ejs", {flyViews: mapFlyViews})
});
app.get("/myListLayout", function(req, res){
   
    res.render("partials/my-list-layout.ejs", {flyViews: mapFlyViews})
});
app.get("/unitListLayout", function(req, res){
   
    res.render("partials/units-list-layout.ejs", {flyViews: mapFlyViews})
});




app.get("/deptList", function(req, res){
   
    res.render("partials/depts-list.ejs", {flyViews: mapFlyViews})
});

var iconSet=['stop.png','traffic-cone.png','stop.png','traffic-cone.png','stop.png','traffic-cone.png','stop.png','traffic-cone.png','stop.png','traffic-cone.png','stop.png','traffic-cone.png','shop.png','hospital.png','stop.png','traffic-cone.png','shop.png','hospital.png','stop.png','traffic-cone.png','shop.png','hospital.png','stop.png','traffic-cone.png','shop.png','hospital.png'];

//Simulator
app.get("/sim", function(req, res){
   
    res.render("sim/index.ejs",  {iconSet:iconSet,myip: req.socket.remoteAddress})
});



app.get("/deptListLayout", function(req, res){
   
    res.render("partials/depts-list-layout.ejs", {flyViews: mapFlyViews})
});

app.listen(3001, () => {
    console.log('App listening on port 3001');
});  