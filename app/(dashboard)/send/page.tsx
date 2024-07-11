"use client"
import { getStorage, ref, uploadBytesResumable } from "firebase/storage";
import {app} from "@/app/lib/actions/firebaseConfig";
import { useState } from "react";
import { error } from "console";
export default function Review() {
  const [progres, setProgres] = useState<string|number>(0);
  const [imageUrl, setImageUrl] = useState<File | null>(null);
  function uploadImage() {
    const allowedTypes=["image/jpeg","image/png","image/jpg"]
    // Get the file from the input element
    const imageInput = document.getElementById("imageInput") as HTMLInputElement;
    const file = imageInput.files[0]; // Assuming a single file selection
    if(!file){
      alert("Please select a file");
      return;
    }else{
      const url=URL.createObjectURL(file);
      console.log(url);
      setImageUrl(URL.createObjectURL(file));
    }
  if(!allowedTypes.includes(file.type)){
    alert("Please select a valid image file");
    return;
  }
    // Create a reference to 'images/your-image-name.jpg' in Firebase Storage
    const storage = getStorage(app);
    // console.log(storage);
    const storageRef = ref(storage, 'images/' + file.name);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on("state_changed",(snapshot)=>{
      const progress= Math.floor((snapshot.bytesTransferred/snapshot.totalBytes)*100)
      setProgres(progress);

    },(error)=>{
      console.log("Update failed:",error);
    },()=>{
      setProgres("completed");
    })
  }
    return (
      <div>
        <h1>Send</h1>
        <p>Send your code here</p>
        <div>
          <p>Upload your image</p>
          <input type="file" id="imageInput" />
            <button onClick={uploadImage}>Upload Image</button>
        </div>
        <div>
          {(progres)?
          <p>Image Uploading:{progres}</p>:""}
        </div>
        <div>
          <img src={imageUrl} alt="" />
        </div>
      </div>  
    );
    }