import { Document, Page } from "react-pdf/dist/esm/entry.webpack5";
import "react-pdf/dist/esm/Page/TextLayer.css";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import { jsPDF } from "jspdf";
import { useState } from "react";
function App() {
  const [showDownload, setShowDownload] = useState(true);
  var arr = [];
  function selection() {
    if (window.getSelection) {
      let text = window.getSelection().toString();
      console.log(text);
      arr.push(text);
    }
  }
  window.addEventListener("keydown", (e) => {
    e.preventDefault();
    if (e.key === "s") {
      selection();
    }
  });
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
  return (
    <div
      className="App"
      style={{
        display: "flex",
        justifyContent: "flex-start",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      {showDownload ? (
        <button onClick={download}>Download</button>
      ) : (
        <input type="file"></input>
      )}

      <Document file="advance node js.pdf" style={{ width: "100vw" }}>
        <Page pageNumber={50} devicePixelRatio={7} scale={1.3} />
      </Document>
    </div>
  );
}

export default App;
