import bcrypt from "bcrypt";

const saltRounds = 10;
const myPassword = "def";
const testPassword = "password2";
const myHash = "$2b$10$XcU.AbqdbcCSfjCMMR2QruQQbm8fI92Vr.8Kfbzw2NIcoXPLUv8Re";

// bcrypt.hash(myPassword, saltRounds).then(function (hash) {
//   // Store hash in your password DB.
//   console.log(hash);
//   bcrypt.compare(myPassword, hash).then(function (res) {
//     console.log(res); // true
//   });
// });

// 驗證密碼
bcrypt.compare(myPassword, myHash).then(function (res) {
  console.log(res); // true
});
// bcrypt.compare(testPassword, myHash).then(function (res) {
//   console.log(res); // false
// });
