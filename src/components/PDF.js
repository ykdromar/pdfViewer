import { Document, Page } from "react-pdf/dist/esm/entry.webpack5";
import "react-pdf/dist/esm/Page/TextLayer.css";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import { LineWaveLoader, CircularLoader } from "./Loader";
import { jsPDF } from "jspdf";
import { useState } from "react";
import styles from "../styles/pdf.module.css";
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
function PDF(props) {
  const { file } = props;
  const [page, setPage] = useState(1);
  const [zoom, setZoom] = useState(1.6);
  const [totalPages, setTotalPages] = useState(1);

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
    <div id={styles.pdf}>
      <div className={styles.controlPanel}>
        <button onClick={handelPreviousPage}>Previous Page</button>
        <button onClick={handelNextPage}>Next Page</button>
        <button onClick={handelZoomIn}>Zoom In</button>
        <button onClick={handelZoomOut}>Zoom out</button>
        <button onClick={download}>Download</button>
      </div>
      <Document
        className="document"
        file={file}
        style={{ width: "100vw" }}
        onLoadSuccess={(pdf) => {
          setTotalPages(pdf.numPages);
          console.log(pdf);
        }}
        onLoadError={(error) => {
          console.log(error);
          console.log(file);
        }}
        loading={<LineWaveLoader />}
      >
        <Page
          pageNumber={page}
          devicePixelRatio={6}
          scale={zoom}
          loading={<CircularLoader />}
        />
      </Document>
    </div>
  );
}
export default PDF;
