const admin = require("firebase-admin");

// Load service account
const serviceAccount = require(process.env.GITHUB_WORKSPACE + "/serviceAccount.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://bloxytube-e76b6-default-rtdb.firebaseio.com"
});

const db = admin.database();

// Use PR title as video name
// GitHub passes it via environment variable
const videoName = process.env.PR_TITLE || "Unnamed Video";

// --- Generate a short base64 ID ---
const truncated = videoName.replace(/\s+/g, "").slice(0, 6); // first 6 chars, remove spaces
const base64Id = Buffer.from(truncated).toString("base64");
const randomOffset = Math.random().toString(36).substring(2, 5); // 3 random chars
const videoId = base64Id + randomOffset;

console.log("Generated video ID:", videoId);

// --- Push to Firebase ---
const videoRef = db.ref("videos").child(videoId);

videoRef.set({
  id: videoId,
  title: videoName,
  repo: process.env.GITHUB_REPOSITORY,
  commit: process.env.GITHUB_SHA,
  createdAt: new Date().toISOString()
})
  .then(() => console.log("✅ Video added with custom ID"))
  .catch(err => console.error("❌ Error:", err));