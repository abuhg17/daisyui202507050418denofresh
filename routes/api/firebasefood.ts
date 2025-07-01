import { Handlers } from "$fresh/server.ts";
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import {
  getFirestore,
  collection,
  getDocs,
} from "https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyBperuUWtP36lO_cRyGYSxuiTkhpy54F_Q",
  authDomain: "myvue3-e45b9.firebaseapp.com",
  projectId: "myvue3-e45b9",
  storageBucket: "myvue3-e45b9.firebasestorage.app",
  messagingSenderId: "439732498123",
  appId: "1:439732498123:web:46d43d1cb409e8678c754e",
  measurementId: "G-80R2D8D149",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const myvue3foodCollection = collection(db, "myvue3food");

export const handler: Handlers = {
  async GET(_req) {
    try {
      const snapshot = await getDocs(myvue3foodCollection);
      const documents = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      return new Response(JSON.stringify({ myvue3food: documents }), {
        headers: { "Content-Type": "application/json; charset=utf-8" },
      });
    } catch (error) {
      console.error("Error fetching data:", error);
      return new Response(JSON.stringify({ error: error.message }), {
        status: 500,
        headers: { "Content-Type": "application/json; charset=utf-8" },
      });
    }
  },
};
