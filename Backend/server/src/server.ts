const express = require("express");
const { createClient } = require("@supabase/supabase-js");
const cors = require("cors");
import  { Request, Response } from "express";
require("dotenv").config();

const app = express();

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY
);

app.use(cors());
app.use(express.json());

app.post("/api/upload-audio", async (req: Request, res: Response) => {
  try {
    const { fileName, fileData } = req.body;
    if (!fileName || !fileData) {
      return res.status(400).json({ error: "Incorrect fileName or fileData" });
    }

    const { data, error } = await supabase.storage
      .from("audio")
      .upload(fileName, Buffer.from(fileData, "base64"));
    if (error) throw error;

    const { publicUrl } = supabase.storage
      .from("audio")
      .getPublicUrl(data.path);
    res.status(200).json({ url: publicUrl });
  } catch (error) {
    console.error("Audio upload error");
    res.status(500).json({ error: "Failed to upload audio" });
  }
});

app.get("/api/tasks", async (req: Request, res:Response) => {
  try {
    const { data, error } = await supabase.from("tasks").select("*");
    if (error) throw error;
    res.status(200).json(data);
  } catch (error) {
    console.error("Failed to get tasks: ", error);
    res.status(500).json({ error: "Failed to get tasks" });
  }
});

app.post("/api/tasks", async (req: Request, res:Response) => {
  try {
    const { title, description, audioTrack } = req.body;
    if (!title) {
      return res.status(400).json({ error: "Title is required" });
    }

    const { data, error } = await supabase.from("tasks").insert({
      title,
      description: description || "",
      audio_track: audioTrack,
      completed: false,
    });

    if (error) throw error;

    res.status(201).json(data);
  } catch (error) {
    console.log("Error: ", error)
    res.status(500).json({error: "Failed to create task"})
  }
});


app.listen(3000, () => {
  console.log("Server is running on port 3000");
});