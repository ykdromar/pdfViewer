import { Document, Page } from "react-pdf/dist/esm/entry.webpack5";
import "react-pdf/dist/esm/Page/TextLayer.css";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import { LineWaveLoader, CircularLoader } from "./Loader";
import { useState } from "react";
import styles from "../styles/pdf.module.css";

function PDF(props) {
  const { file } = props;
  const [page, setPage] = useState(1);
  const [zoom, setZoom] = useState(1.6);
  const [totalPages, setTotalPages] = useState(1);

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
        <button onClick={handelPreviousPage} className={styles.navBtn}>
          {"<<"}
        </button>

        <span
          style={{
            margin: "3px",
            backgroundColor: "white",
            border: "0.5px solid black",
            padding: "2px",
            borderRadius: "5px",
          }}
        >
          {page}/{totalPages}
        </span>
        <button onClick={handelNextPage} className={styles.navBtn}>
          {">>"}
        </button>
        <button onClick={handelZoomIn} className={styles.navBtn}>
          {"+"}
        </button>
        <button onClick={handelZoomOut} className={styles.navBtn}>
          {"-"}
        </button>
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
          loading={<LineWaveLoader />}
        />
      </Document>
    </div>
  );
}
export default PDF;
