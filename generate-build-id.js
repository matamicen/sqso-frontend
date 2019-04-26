var fs = require("fs");
console.log("Incrementing build number...");
fs.readFile("package.json", function(err, content) {
  if (err) throw err;
  var metadata = JSON.parse(content);
  metadata.version = metadata.version + 1;
  fs.writeFile("package.json", JSON.stringify(metadata), function(err) {
    if (err) throw err;
    console.log("Current build number: " + metadata.version);
  });
});
