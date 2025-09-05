const os = require("os");

const interfaces = os.networkInterfaces();
let networkIP = "Not found";

Object.keys(interfaces).forEach((name) => {
  interfaces[name].forEach((iface) => {
    if (iface.family === "IPv4" && !iface.internal) {
      networkIP = iface.address;
    }
  });
});

console.log("\n🌐 Network IP: http://" + networkIP + ":3000");
console.log("🏠 Localhost: http://127.0.0.1:3000");
console.log("\nStarting live-server...\n");
