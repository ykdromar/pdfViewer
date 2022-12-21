import { useState } from "react";
import styles from "../styles/app.module.css";
import PDF from "./PDF";
import Navbar from "./Navbar";
function App() {
  const [showPDF, setShowPDF] = useState(false);
  const [file, setFile] = useState();
  const handelFileInput = async (e) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
      setShowPDF(true);
    }
  };
  return (
    <div className={styles.App}>
      <Navbar handelFileInput={handelFileInput} />
      {showPDF && <PDF file={file} />}
    </div>
  );
}

export default App;
