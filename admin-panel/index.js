const express = require("express");
const cors = require("cors");
let path = require("path");

const db = require("./db/connectdb.js");
const errorHandler = require("./Errorhandler/Errorhandler.js");
const errormidd = require("./Errorhandler/error.js")
const careerRoute = require("./routes/careerRoute.js");
const adminRoute = require("./routes/adminRoute.js");
const homepageRoute = require("./routes/homepageRoute.js");
const contactRoute = require("./routes/contactRoute.js");
const servicesRoute = require("./routes/servicesRoute.js");
const aboutRoute = require("./routes/aboutRoute.js");
const faqRoute = require("./routes/faqRoute.js");
const pagesRoute = require("./routes/pagesRoute.js");
const mediaRoute = require("./routes/mediaRoute.js");
const caseStudyRoute = require("./routes/caseStudyRoute.js");
const blogsRoute = require("./routes/blogsRoute.js");



if (process.env.NODE_ENV !== "PRODUCTION") {
  require("dotenv").config({ path: "admin-panel/.env" });
}
const port = process.env.PORT || 4000;
const app = express();
app.use(cors());
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

// Handling Uncaught Exception
process.on("uncaughtException", (err) => {
  console.log(`Error: ${err.message} ${err}`);
  console.log(`Shutting down the server due to Uncaught Exception`);
  process.exit(1);
});


db(process.env.MONGO_URL)
let uploadpath = path.join(__dirname, "uploads");
let newuploadpath = path.join(__dirname, "newuploads");

app.use(express.static(uploadpath))
app.use(express.static(newuploadpath))
app.use(errorHandler);
app.use(errormidd);
//routes
app.use('/admin/', adminRoute);
app.use('/admin/career', careerRoute);
app.use('/admin/homepage', homepageRoute);
app.use('/admin/contactus', contactRoute);
app.use('/admin/services', servicesRoute);
app.use('/admin/about', aboutRoute);
app.use('/admin/faq', faqRoute);
app.use('/admin/pages', pagesRoute);
app.use('/api/media', mediaRoute);
app.use('/admin/casestudy/', caseStudyRoute);
app.use('/admin/blogs/', blogsRoute);
app.use(express.static(path.join(__dirname, "../fifilo-main/build")));

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../fifilo-main/build/index.html"));
});


let server = app.listen(port, (err) => {
  console.log(err || "server run on port " + port)
})

// Unhandled Promise Rejection
process.on("unhandledRejection", (err) => {
  console.log(`Error: ${err.message} ${err}`);
  console.log(`Shutting down the server due to Unhandled Promise Rejection`);
  server.close(() => {
    process.exit(1);
  });
});






/*const express = require("express");
const cors = require("cors");
let path = require("path");

const db = require("./db/connectdb.js");
const errorHandler = require("./Errorhandler/Errorhandler.js");
const errormidd = require("./Errorhandler/error.js")
const careerRoute = require("./routes/careerRoute.js");
const adminRoute = require("./routes/adminRoute.js");
const homepageRoute = require("./routes/homepageRoute.js");
const contactRoute = require("./routes/contactRoute.js");
const servicesRoute = require("./routes/servicesRoute.js");
const aboutRoute = require("./routes/aboutRoute.js");
const faqRoute = require("./routes/faqRoute.js");
const pagesRoute = require("./routes/pagesRoute.js");
const mediaRoute = require("./routes/mediaRoute.js");
const caseStudyRoute = require("./routes/caseStudyRoute.js");
const blogsRoute = require("./routes/blogsRoute.js");



if (process.env.NODE_ENV !== "PRODUCTION") {
  require("dotenv").config({ path: "admin-panel/.env" });
}
const port = process.env.PORT || 4000;
const app = express();
app.use(cors());
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

// Handling Uncaught Exception
process.on("uncaughtException", (err) => {
  console.log(`Error: ${err.message} ${err}`);
  console.log(`Shutting down the server due to Uncaught Exception`);
  process.exit(1);
});


db(process.env.MONGO_URL)
let uploadpath = path.join(__dirname, "uploads");
let newuploadpath = path.join(__dirname, "newuploads");

app.use(express.static(uploadpath))
app.use(express.static(newuploadpath))
app.use(errorHandler);
app.use(errormidd);
//routes
app.use('/admin/', adminRoute);
app.use('/admin/career', careerRoute);
app.use('/admin/homepage', homepageRoute);
app.use('/admin/contactus', contactRoute);
app.use('/admin/services', servicesRoute);
app.use('/admin/about', aboutRoute);
app.use('/admin/faq', faqRoute);
app.use('/admin/pages', pagesRoute);
app.use('/api/media', mediaRoute);
app.use('/admin/casestudy/', caseStudyRoute);
app.use('/admin/blogs/', blogsRoute);
app.use(express.static(path.join(__dirname, "../fifilo-main/build")));

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../fifilo-main/build/index.html"));
});


let server = app.listen(port, (err) => {
  console.log(err || "server run on port " + port)
})

// Unhandled Promise Rejection
process.on("unhandledRejection", (err) => {
  console.log(`Error: ${err.message} ${err}`);
  console.log(`Shutting down the server due to Unhandled Promise Rejection`);
  server.close(() => {
    process.exit(1);
  });
});






*/