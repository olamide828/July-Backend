const getSystemInfo = require("./system");
const help = require("./help")

const http = require("http");
const PORT = 9000

const server = http.createServer((req, res) => {

    if(req.url == "/") {
        // const os = require("os");
        // const hostName = os.hostname();
        // res.end(hostName);
        res.writeHead(200, {"Content-Type": "text/plain"});
        res.end("this is the homepage");
    } else if(req.url == "/about") {
        res.writeHead(200, {"Content-Type": "text/plain"});
        res.end("this is the about page");
    } else if(req.url == "/contact") {
        res.writeHead(200, {"Content-Type": "text/html"});
        res.end("<button>This is a contact page</button>");
    } else if(req.url == "/faq") {
        res.end("this is the faq page");
    }  else if (req.url == "/system") {
        res.writeHead(200, {"Content-Type": "application/json"});
        res.end(JSON.stringify(getSystemInfo()));
    } else if(req.url == "/services") {
        res.writeHead(200, {"content-type" : "text/plain"});
        res.end("This is the service page!");
    } else if (req.url == "/profile") {
        res.writeHead(200, {"content-type" : "text/html"});
        res.end("<h1>Login to access your Profile Unknown User!</h1>")
    } else if (req.url == "/help") {
        res.writeHead(200, {"content-type" : "application/json"});
        res.end(JSON.stringify(help()));
    } else {
        res.end("page not found");
    }

    // res.writeHead(200, {"content-Type": "text/plain"});
    // res.statusCode(200).json({ message: "successful" });
    // res.end("This is our backend class");
});

server.listen(PORT, () => {
    console.log(`server is listening at port ${PORT}`);
});





// const chalk = require("chalk");
// console.log(chalk.bgYellow("olamide"))


// const os = require("os");

// const availableSpace = os.freemem()
// console.log(availableSpace);
// if (os.freemem() > 0.7 * os.totalmem()) {
//     console.log("can download")
// }

// const upkey = os.uptime();
// const userInfo = os.userInfo();
// const arch = os.arch()
// const hostName = os.hostname();
// console.log(upkey, userInfo, arch, hostName);



// const user = require("./name");
// const add = require("./math");

// console.log(add(30, 40))
// console.log("hello", user || totalSpace);

// const totalSpace = os.totalmem / os.freemem;
// console.log(totalSpace);

// const practice = require("./practice");
// console.log(practice(2, 10));


// // MODULES
// // 1. IN-BUILT MODULES
// // 2. CUSTOM MODULES
// // 3. THIRD-PARTY MODULES


// const express = require("express");
// const cors = require("cors")

// const app = express();
// app.use(express.json());
// app.use(cors())

// //CRUD
// const students = [
//     {id: 1, name: "Olamide", course: "Fullstack", },
//     {id: 2, name: "Toheeb", course: "Graphic Designer",},
//     {id: 3, name: "Ayomide", course: "Frontend", },
// ]

// app.get("/students", (req, res) => {
//     res.json(students)
// })

// app.get("/students/:id", (req, res) => {
//     const id = Number(req.params.id)

//     const student = students.find((s) => s.id === id);
//     // if (student) {
//     //     res.json(student)
//     // } else {
//     //     return res.status(404).json({ message: "Student not found" })
//     // }
//     if (!student) {
//         return res.status(404).json({ message: "Student not found" })
//     }
//     res.json(student);
// });

// //CREATE 
// app.post("/students/create", (req, res) => {
//     const {name, course} = req.body
//     if (!name || !course) {
//         res.status(400).json({ message: "Please provide a valid Input" });
//     };

//     const newStudent = {
//         id: students.length + 1,
//         name,
//         course,
//     };
//     students.push(newStudent);
//     res.status(201).json(students)
// })

// //UPDATE
// app.put("/students/update/:id", (req, res) => {
//     const id = Number(req.params.id)
//     const { name, course } = req.body

//     const student = students.find((s) => s.id === id)
//     if(!student) {
//         res.status(404).json({ message: "Student not Found" })
//     }
//     if(name) student.name = name;
//     if(course) student.course = course;

//     res.json(students)
// });

// //DELETE
// app.delete("/students/delete/:id", (req, res) => {
//     const id = Number(req.params.id)
//     const index = students.findIndex((s) => s.id === id);

//     if (index === -1) {
//         return res.status(404).json({ message: "Student not Found" });
//     };

//     students.splice(index, 1);

//     res.status(200).json({ message: "Student deleted Successfully" })
    
// })

// const PORT = 9000;
// app.listen(PORT, () => {
//     console.log(`Backend is Live ${PORT}`)
// })


//image: "https://websitedemos.net/be-bold-beauty-store-04/wp-content/uploads/sites/1117/2022/08/product-09-a-300x366.jpg"
//image: "https://websitedemos.net/be-bold-beauty-store-04/wp-content/uploads/sites/1117/2022/08/product-10-a-300x366.jpg"
//image: "https://websitedemos.net/be-bold-beauty-store-04/wp-content/uploads/sites/1117/2022/08/product-14-a-300x366.jpg"

