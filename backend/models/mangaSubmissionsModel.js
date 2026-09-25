import mongoose, { Mongoose } from "mongoose"


const mangaSubmissionsSchema = new mongoose.Schema({
  userId: {
     type: mongoose.Schema.Types.ObjectId,
     required: true,
     unique: true
   },
  mangaDexId: {
    type: String,
    required: true,
  },
  year: {
    type: mongoose.Schema.Types.Mixed,
    default: "N/A",
  },
  title: {
    type: String,
    default: "N/A",
  },
  author: {
    type: String,
    default: "N/A",
  },
  coverArt: {
    type: String,
    default: "N/A",
  },
  description: {
    type: String,
    default: "N/A",
  },
  volumes: {
    type: mongoose.Schema.Types.Mixed,
    default: "N/A",
  },
  chapters: {
    type: mongoose.Schema.Types.Mixed,
    default: "N/A",
  },
  lastAccessed: {
    type: Date,
    default: Date.now,
  },
  currentChapter: {
    type: mongoose.Schema.Types.Mixed,
    default: "N/A",
  },
  currentVolume: {
    type: mongoose.Schema.Types.Mixed,
    default: "N/A",
  },
  tags: {
    type: [],
    default: [],
  },
});


mangaSubmissionsSchema.index({ userId: 1, mangaDexId: 1 });

const MangaSubmissionsModel = mongoose.model(
  "MangaSubmissionModel",
  mangaSubmissionsSchema,
  "mangaSubmissions",
);

export default MangaSubmissionsModel