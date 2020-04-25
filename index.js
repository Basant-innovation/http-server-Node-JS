const http = require("http");
const hostname = "127.0.0.1";
const port = 3000;

const fs = require("fs");
const dbPath = "./db.json";

const readDB = () => {
  const dbReadFile = fs.readFileSync(dbPath, "utf8") || "[]";
  return JSON.parse(dbReadFile);
};

const server = http.createServer((req, res) => {
  switch (req.url) {
    case "/":
      res.setHeader("Content-Type", "text/html");
      res.end(`<html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Document</title>
        <link rel="stylesheet" href="style.css" />
      </head>
      <body>
        <h1>Home</h1>
        <nav>
          <ul>
            <li><a class = "active" href="/">Home</a></li>
            <li><a href="/Nature">Nature</a></li>
            <li><a href="/Quote">Quote</a></li>
          </ul>
        </nav>
        <div class="content">
        <h3>TODO List</h3>
        <ul>${readDB()
          .map((e) => "<li>" + e.title + "</li>")
          .join("")}</ul>
        </div>
      </body>
    </html>`);
      break;
    case "/Nature":
      res.setHeader("Content-Type", "text/html");
      res.end(`<html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Document</title>
        <link rel="stylesheet" href="style.css" />
      </head>
      <body>
        <h1>Nature</h1>
        <nav>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a class = "active" href="/Nature">Nature</a></li>
            <li><a href="/Quote">Quote</a></li>
          </ul>
        </nav>
        <div class="content">
        <img src="/NatureImages1" width=500 height=300>
        <img src="/NatureImages2" width=500 height=300>
        </div>
      </body>
    </html>`);
      break;
    case "/Quote":
      res.setHeader("Content-Type", "text/html");
      res.end(`<html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Document</title>
        <link rel="stylesheet" href="style.css" />
      </head>
      <body>
        <h1>Quote</h1>
        <nav>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/Nature">Nature</a></li>
            <li><a class = "active" href="/Quote">Quote</a></li>
          </ul>
        </nav>
        <div class="content">
        <img src="/QuoteImages1" width=500 height=300>
        <img src="/QuoteImages2" width=500 height=300>
        </div>
      </body>
    </html>`);
      break;

    case "/style.css":
      res.setHeader("Content-Type", "text/css");
      res.end(`
      body{
        font-family: 'Montserrat';
      }

      h1{
        margin:3%;
        text-align: center;
      }
        ul {
          list-style-type: none;
          margin: 0;
          padding: 0;
        }
        nav {
          border-bottom: 5px solid #383838;
          overflow: hidden;
          
        }
        
        nav a {
          float: left;
          color: #383838;
          text-align: center;
          padding: 14px 16px;
          text-decoration: none;
          font-size: 17px;
        }
        
        nav a:hover {
          background-color: #37BC6150;
          color: black;
        }

        nav a.active {
          background-color: #37BC61;
          color: white;
        }
        .content{
          margin:2%;
        }`);
      break;

    case "/NatureImages1":
      res.setHeader("Content-Type", "image/jpeg");
      const bufferimage1 = fs.readFileSync("./Nature/2-Nature.jpg");
      res.end(bufferimage1);
      break;
    case "/NatureImages2":
      res.setHeader("Content-Type", "image/jpeg");
      const bufferimage2 = fs.readFileSync("./Nature/foresttb-l.jpg");
      res.end(bufferimage2);
      break;
    case "/QuoteImages1":
      res.setHeader("Content-Type", "image/jpeg");
      const bufferimage3 = fs.readFileSync("./Quotes/Linus.jpg");
      res.end(bufferimage3);
      break;
    case "/QuoteImages2":
      res.setHeader("Content-Type", "image/jpeg");
      const bufferimage4 = fs.readFileSync("./Quotes/Think twice.jpg");
      res.end(bufferimage4);
      break;
    case "/NotFound":
      res.setHeader("Content-Type", "image/gif");
      const bufferimage5 = fs.readFileSync("./4042.gif");
      res.end(bufferimage5);
      break;
    default:
      res.statusCode = 404;
      res.end(`<html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Document</title>
        <link rel="stylesheet" href="style.css" />
      </head>
      <body>
        <img src="/NotFound" style="margin-left:20%">
      </body>
    </html>`);
      break;
  }
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

// const { program } = require("commander");
// program.version("0.0.1");

// const fs = require("fs");
// const dbPath = "./db.json";

// const readDB = () => {
//   const dbReadFile = fs.readFileSync(dbPath, "utf8") || "[]";
//   return JSON.parse(dbReadFile);
// };

// program
//   .command("add <title>")
//   .requiredOption(" -t, --title", "indicates the title of entry")
//   .action(title => {
//     const db = readDB();
//     const newToDo = {
//       id: Date.now(),
//       title
//     };
//     db.push(newToDo);
//     fs.writeFileSync(dbPath, JSON.stringify(db, null, 2), "utf8");
//     console.log(`${title} added to your TODO List`);
//     console.log(db);
//   });

// program.command("list").action(() => {
//   const db = readDB();
//   console.log(db);
// });

// program
//   .command("edit <title> <id>")
//   .requiredOption(" -t, --title", "for editing title")
//   .requiredOption(" -i, --id", "id")
//   .action((title, id) => {
//     const db = readDB();
//     const updatedDB = db.map(element => {
//       if (element.id === parseInt(id)) {
//         console.log(element.id);
//         element.title = title;
//       }
//       return element;
//     });
//     fs.writeFileSync(dbPath, JSON.stringify(updatedDB, null, 2), "utf8");
//     console.log(updatedDB);
//   });

// program.command("delete <id>").action(id => {
//   const db = readDB();
//   const updatedDB = db.filter(x => x.id != id);
//   fs.writeFileSync(dbPath, JSON.stringify(updatedDB, null, 2), "utf8");
//   console.log("Deleted successfully");
// });

// program.parse(process.argv);

// const addToDo = title => {
//   const db = readDB();
//   const newToDo = {
//     id: Date.now(),
//     title
//   };
//   db.push(newToDo);
//   fs.writeFileSync(dbPath, JSON.stringify(db, null, 2), "utf8");
//   console.log(`${title} added to your TODO List`);
//   console.log(db);
// };

// const listToDos = () => {
//   const db = readDB();
//   console.log(db);
// };

// const editToDo = (title, id) => {
//   const db = readDB();
//   const updatedDB = db.map(element => {
//     if (element.id === parseInt(id)) {
//       console.log(element.id);
//       element.title = title;
//     }
//     return element;
//   });
//   fs.writeFileSync(dbPath, JSON.stringify(updatedDB, null, 2), "utf8");
//   console.log(updatedDB);
// };

// const deleteToDo = id => {
//   const db = readDB();
//   const updatedDB = db.filter(x => x.id != id);
//   fs.writeFileSync(dbPath, JSON.stringify(updatedDB, null, 2), "utf8");
//   console.log("Deleted successfully");
// };

// const [, , action] = process.argv;
// switch (action) {
//   case "add":
//     addToDo(process.argv[3]);
//     break;
//   case "list":
//     listToDos();
//     break;
//   case "edit":
//     editToDo(process.argv[3], process.argv[4]);
//     break;
//   case "delete":
//     deleteToDo(process.argv[3]);
//     break;
//   default:
//     console.log("Argument not defined");
//     break;
// }
