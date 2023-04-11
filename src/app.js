const express = require("express");
const path = require("path");
require("./db/conn");
const User = require("./models/usermessage").default;
const app = express();
const port = process.env.PORT || 3000;

const hbs = require("hbs");
//TODO: const { registerPartials } = require("hbs");

//* setting the path
const staticPath = path.join(__dirname, "../public");
const viewPath = path.join(__dirname, "../templates/views");
const partialPath = path.join(__dirname, "../templates/partials");
//? aise console.log me path.join use kerke exactly dekh skte..
//? kha hai hamara path, nodemon run kerna padega
//? lagataar path update kerega..
//? starting me "../" se ham current directory ke bahar nikal jaate...
// console.log(path.join(__dirname, "../public"));

app.use(express.urlencoded({ extended: false }));

//* middleware

//? aise starting me "/css" likha hai...isse path.join(__dirname...) wale path ko
//? ab ham "/css" se use ker skte directly... pura path likhne ki zaroorat nhi...
app.use(
  "/css",
  express.static(path.join(__dirname, "../node_modules/bootstrap/dist/css"))
);
app.use(
  "/js",
  express.static(path.join(__dirname, "../node_modules/bootstrap/dist/js"))
);
app.use(
  "/jq",
  express.static(path.join(__dirname, "../node_modules/jquery/dist"))
);

//? html, css aur bootstrap se static website banate wakt
//? aise uska path leker usse connect ker skte hain express
//? ke sath aur host ker skte
app.use(express.static(staticPath));
//? to set the view engine
app.set("view engine", "hbs");
//? views ka jo path set kiya hai viewPath me, use aise set kerna hoga
//? taaki express ko pata chale, ki kha hai views folder
//? ab viewPath se ham `views` folder ko get ker skte hai express me

app.set("views", viewPath);

//* partials folder ke ander website ke components likhte hai..
//*jaise navbar.. jinhe kai pages me use ker skte hai..
//*fir unhe views folder me call kerte hai.. {{>filename}} ke format me
//* jaise ager navbar.hbs wali file ko partials folder se views folder
//* ke index.hbs me use kerna hai..toh index.hbs me body me ` {{>navbar}} ` likhenge...

//? partials set kerne ke lie registerPartials - ek method hai handlebars
//? (hbs) ka, usko use kerte...
//? to use partials, we require `hbs` and call hbs.partials and put the partialPath in it.
hbs.registerPartials(partialPath);

//? routing
//* app.get( path, callback )
app.get("/", (req, res) => {
  //? this is the way to add multiple pages in a node app.
  //? render is used to redirect (ise use kerke given
  //? file ko server ke response per show skte...)
  //* .render(<file name>)
  res.render("index");
  // res.send("Hey there")
});

// app.get("/contact", (req, res)=> {
//     res.render("contact");
//     // res.send("Hey Universe")
// })

app.post("/contact", async (req, res) => {
  try {
    // res.send(req.body);
    const userData = new User(req.body);
    await userData.save();
    res.status(201).render("index");
  } catch (error) {
    res.status(500).send(error);
  }
});

//? server create
app.listen(port, () => {
  console.log(`server is running at port no ${port}`);
});
