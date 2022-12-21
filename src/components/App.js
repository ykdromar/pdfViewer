import { useState } from "react";
import styles from "../styles/app.module.css";
import PDF from "./PDF";
import Navbar from "./Navbar";
import { jsPDF } from "jspdf";

var arr = []; // array to collect selcted text
// function to get text selected
function selection() {
  if (window.getSelection) {
    let text = window.getSelection().toString();
    console.log(text);
    arr.push(text);
  }
}
// event listner to listen "s" keydown
window.addEventListener("keydown", (e) => {
  if (e.key === "s") {
    selection();
  }
});
// function to make and download pdf
function download() {
  const doc = new jsPDF();
  doc.setFontSize(10);

  var lMargin = 30; //left margin in mm
  var rMargin = 15; //right margin in mm
  var pdfInMM = 210; // width of A4 in mm
  var splitTitle = doc.splitTextToSize(
    arr.map((e, index) => {
      return `${index + 1}.${e}`;
    }),
    pdfInMM - lMargin - rMargin
  );

  doc.text(lMargin, rMargin, splitTitle);
  doc.save("a4.pdf");
}
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
      <Navbar
        handelFileInput={handelFileInput}
        download={download}
        showPDF={showPDF}
      />
      {showPDF && <PDF file={file} />}
    </div>
  );
}

export default App;
