import { useState } from "react";
import styles from "../styles/app.module.css";
import PDF from "./PDF";
import Navbar from "./Navbar";
import { jsPDF } from "jspdf";

var arr = []; // array to collect selcted text
// function to get text selected
function selection() {
  if (document.getSelection) {
    let text = document
      .getSelection()
      .toString()
      .trim()
      .replace(/\n/g, " ")
      .replace(/\\n/g, " ");
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
  const doc = new jsPDF("p", "pt", "a4");
  doc.setFont("Times-Roman", "bold");
  doc.setFontSize(20);
  doc.text("Notes", 59.52, 60);
  doc.setFont("Times-Roman", "normal");
  let topMargin = 84.18;
  let leftMargin = 59.52;
  let pageWidth = 595;
  let pageHeight = 842;
  pageWidth -= leftMargin * 2;
  pageHeight -= topMargin;
  let startX = leftMargin;
  let startY = topMargin;
  doc.setFontSize(9);
  doc.text("Notes generated from Noti", pageWidth - 30, pageHeight + 60); //adding brand
  doc.setFontSize(12);
  for (let i = 0; i < arr.length; i++) {
    let point = arr[i];
    if (startY >= pageHeight) {
      doc.addPage();
      startY = topMargin;
      doc.setFontSize(9);
      doc.text("Notes generated from Noti", pageWidth - 30, pageHeight + 60); //adding brand
      doc.setFontSize(12);
    }
    let split = doc.splitTextToSize(`${i + 1}. ${point}`, pageWidth);
    doc.text(split, startX, startY);
    startY += doc.getTextDimensions(split).h;
  }

  doc.save(`Noti-${Date.now()}.pdf`);
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
