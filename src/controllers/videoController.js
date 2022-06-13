import Video from "../models/Video";

export const home = async (req, res) => {
    const videos = await Video.find({}).sort({createdAt: "desc"});

    return res.render("home", {pageTitle:"SKKU", videos})
}
export const watch = async (req, res) =>{
    const {id} = req.params;
    const video = await Video.findById(id);

    if(!video){
      return res.render("404", {pageTitle: "Video Not Found."});
    }

    return res.render("watch", {pageTitle:`Watching`, video});
}
export const getEdit = async (req, res) => {
    const {id} = req.params;
    const video = await Video.findById(id);

    if(!video){
      return res.render("404", {pageTitle: "Video Not Found."});
    }

    return res.render("edit", {pageTitle:`Editing`, video});
}
export const postEdit = async (req, res) => {
    const {id} = req.params;
    const {titles, description, hashtags} = req.body;
  
    const video = await Video.exists({_id: id});
    
    console.log(video);
    if(!video){
      return res.render("404", {pageTitle:"Video Not Found"});
    }
    await Video.findByIdAndUpdate(id, {
      titles,
      description,
      hashtags: Video.formatHashtags(hashtags)
    });
    
    return res.redirect(`/videos/${id}`);

}
//video object를 보내줘야 하면 Video.findById
//video object가 필요없으면 Video.exists
export const getUpload = (req, res) => {
  return res.render("upload", {pageTitle:"Upload Video"});
}

export const postUpload = async (req, res)=>{
  const {title, description, hashtags} = req.body;

  try{
    await Video.create({
      title,
      description,
      hashtags: Video.formatHashtags(hashtags),
      meta:{
        views:0,
        rating:0
      }
    });
    return res.redirect("/");
  }catch(error){
    return res.render("upload", {
      pageTitle: "Upload Video",
      errorMessage: error._message
    });
  }
  
}
export const search = async (req, res) => {
  const {keyword} = req.query;
  let videos = [];
  if(keyword){
    videos = await Video.find({
      title:{
        $regex: new RegExp(`${keyword}$`, "i")
      }
    });
  }
 // 주어진 keyword로 시작하는 제목을 가진 영상을 검색하기
 // $regex 는 정규 표현식
 // "i"는 대소문자 구분 없애기
  return res.render("search", {pageTitle: "Search", videos})
}
export const deleteVideo = async (req, res) => {
  const {id} = req.params;
  await Video.findByIdAndDelete(id);
  return res.redirect("/");
}
