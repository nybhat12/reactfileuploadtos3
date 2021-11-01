// import logo from "./logo.svg";
// import "./App.css";

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;

import React, { useState } from "react";
import axios from "axios";
import "./App.css";
// const S3_BUCKET ='YOUR_BUCKET_NAME';
// const REGION ='YOUR_REGION_NAME';
// const ACCESS_KEY ='YOUR_ACCESS_KEY';
// const SECRET_ACCESS_KEY ='YOUR_SECRET_ACCESS_KEY';

// const config = {
//   bucketName: process.env.S3_BUCKET,
//   region: process.env.REGION,
//   accessKeyId: process.env.ACCESS_KEY,
//   secretAccessKey: process.env.SECRET_ACCESS_KEY,
// };

const UploadImageToS3WithReactS3 = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const url = process.env.REACT_APP_API_URL;
  //   const handleFileInput = (e) => {
  //     setSelectedFile(e.target.files[0]);
  //   };

  //   const handleUpload = async (file) => {
  //     uploadFile(file, config)
  //       .then((data) => console.log(data))
  //       .catch((err) => console.error(err));
  //   };
  const handleFileInput = (e) => {
    // console.log(e.target.files[0], "msg");
    setSelectedFile(e.target.files[0]);
  };
  const handleUpload = (e) => {
    // setSelectedFile(e.target.files[0]);
    const fd = new FormData();
    fd.append("fole", selectedFile, selectedFile.name);
    axios
      .post("http://localhost:8080/api/uploadImage", fd, {
        onUploadProgress: (progressEvent) => {
          console.log(
            "Upload progress" +
              (progressEvent.loaded / progressEvent.total) * 100 +
              "%"
          );
        },
      })
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div className="App">
      <div style={{ alignItems: "center", alignSelf: "center" }}>
        React S3 File Upload
      </div>
      <input type="file" onChange={handleFileInput} multiple />
      <button onClick={() => handleUpload(selectedFile)}>Submit</button>
    </div>
  );
};

export default UploadImageToS3WithReactS3;
