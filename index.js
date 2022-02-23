const fs = require("fs");
const http = require("http");

const server = http.createServer();
server.on("request", (req, res) => {
  filename = process.argv[2];
  const rstream = fs.createReadStream(filename);

  const countWords = (str) => {
    const obj = {};
    const arr = str.replace(/[\r\n\.\""\'']+/gm, " ").split(" ");

    for (word of arr) {
      !obj[word] ? (obj[word] = 1) : obj[word]++;
    }
    return obj;
  };

  rstream.on("data", (chunkdata) => {
    const result = countWords(chunkdata.toString());
    // console.log(result);
    res.write(JSON.stringify({ result }));
    // res.write(chunkdata);

    // console.log(chunkdata.toString());
  });
  rstream.on("end", () => {
    res.end();
  });
  rstream.on("error", (err) => {
    console.log(err);
    res.end();
  });
});
server.listen(9000);
