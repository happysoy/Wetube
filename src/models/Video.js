import mongoose from "mongoose";

const videoSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  createdAt: { type: Date, required: true, default: Date.now },
  hashtags: [{ type: String, trim: true }],
  meta: {
    views: { type: Number, default: 0, required: true },
    rating: { type: Number, default: 0, required: true },
  },
});

// 미들웨어 방식
// videoSchema.pre("save", async function()
// {
//   this.hashtags = this.hashtags[0]
//     .split(",")
//     .map((word)=> (word.startsWith("#")? word : `#${word}`));
//     //word가 #으로 시작하면 그냥 출력, #으로 시작하지 않으면 붙여줘서 출력
// });
// middleware는 무조건 model이 생성되기 전에 만들어져야 한다

videoSchema.static("formatHashtags", function(hashtags){
  return hashtags.split(",").map((word)=> (word.startsWith("#")?word:`#${word}`));
}) //static으로 내가 직접 만듦

const Video = mongoose.model("Video", videoSchema);

export default Video;