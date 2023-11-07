// test redis
const redis = require("redis");

const redisClient = redis.createClient({
  host: "13.236.23.10",
  port: 6379,
});

redisClient.connect();

redisClient.on("error", (err) => {
  console.log("Error " + err);
});

redisClient.on("connect", () => {
  console.log("Redis client connected");
  redisClient.set("key", "value", redis.print).then((data) => {
    console.log("set data", data);
    console.log(data);
  });
  redisClient.get("key", redis.print).then((data) => {
    console.log(data);
  });
});

redisClient.quit();
