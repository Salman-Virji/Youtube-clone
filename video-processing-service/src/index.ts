import express from "express";
import ffmpeg from "fluent-ffmpeg";

const app = express();
app.use(express.json())

app.post("/process-video", (req,res) => {
   //GEt path of the input video file from the request body 

   const inputFilePath = req.body.inputFilePath;
   const outputFilePath = req.body.outputFilePath;


   if(!inputFilePath || !outputFilePath){
    res.status(400).send("Bad Request: Missing File Path")
   }

   ffmpeg(inputFilePath)
        .outputOptions("-vf", "scale=-1:360")// Convert video to 360p 
        .on("end", () => {
            res.status(200).send("Video processing finised successfully.")
        })
        .on("error", (err) => {
            console.log("An error occured: ${err.message}");
            res.status(500).send("Internal server error: ${err.message}");

        })
        .save(outputFilePath);

        

});


const port = process.env.PORT || 3000;
app.listen(port ,() => {
    console.log(`Server running at http://localhost:${port}`);
});