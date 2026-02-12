import jwt from "jsonwebtoken";

const API_KEY = "0e5eeade-e404-4d95-934e-d9dd4be80c90";       // from VideoSDK dashboard
const API_SECRET = "35c489148716d9a1740ce5e9dd1b801c1bda3389f8ae890b431188cff4aa6903"; // from VideoSDK dashboard

const payload = {
  apikey: API_KEY,
  permissions: ["allow_join"],
};

const token = jwt.sign(payload, API_SECRET, {
  expiresIn: "2h",
});

console.log(token);
