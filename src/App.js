import { Document, Page } from "react-pdf/dist/esm/entry.webpack5";
import "react-pdf/dist/esm/Page/TextLayer.css";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import { jsPDF } from "jspdf";
import { useState } from "react";
function App() {
  const [showDownload, setShowDownload] = useState(false);
  const [file, setFile] = useState("");
  const [page, setPage] = useState(1);
  const [zoom, setZoom] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

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
  const handelFileInput = (e) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
    setShowDownload(true);
  };

  const handelNextPage = () => {
    if (page < totalPages) {
      setPage(page + 1);
    }
  };
  const handelPreviousPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };
  const handelZoomIn = () => {
    setZoom(zoom + 0.2);
  };
  const handelZoomOut = () => {
    setZoom(zoom - 0.2);
  };
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
        <>
          <div>
            <button onClick={handelPreviousPage}>Previous Page</button>
            <button onClick={handelNextPage}>Next Page</button>
            <button onClick={handelZoomIn}>Zoom In</button>
            <button onClick={handelZoomOut}>Zoom out</button>
            <button onClick={download}>Download</button>
          </div>

          <Document
            file={file}
            style={{ width: "100vw" }}
            onLoadSuccess={(pdf) => setTotalPages(pdf.numPages)}
          >
            <Page pageNumber={page} devicePixelRatio={6} scale={zoom} />
          </Document>
        </>
      ) : (
        <input type="file" onChange={handelFileInput}></input>
      )}
    </div>
  );
}

export default App;
