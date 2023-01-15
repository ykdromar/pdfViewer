import { Document, Page } from "react-pdf/dist/esm/entry.webpack5";
import "react-pdf/dist/esm/Page/TextLayer.css";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import { LineWaveLoader, CircularLoader } from "./Loader";
import { useState } from "react";
import styles from "../styles/pdf.module.css";
import useResizeObserver from "use-resize-observer";
function PDF(props) {
  const { file } = props;
  const [page, setPage] = useState(1);
  const [zoom, setZoom] = useState(70);
  const [totalPages, setTotalPages] = useState(1);
  const { ref, width = 0.02, height = 1 } = useResizeObserver();
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
    setZoom(zoom + 5);
    console.log(zoom);
  };
  const handelZoomOut = () => {
    setZoom(zoom - 5);
    console.log(zoom);
  };

  return (
    <div id={styles.pdf} ref={ref}>
      {/* <div className={styles.refDiv} ref={ref}></div> */}
      {/* <div className={styles.controlPanel}>
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
      </div> */}
      <Document
        className={styles.Doc}
        file={file}
        onLoadSuccess={(pdf) => {
          setTotalPages(pdf.numPages);
          console.log(pdf);
        }}
        onLoadError={(error) => {
          console.log(error);
          console.log(file);
        }}
      >
        {Array.from(new Array(totalPages), (el, index) => (
          <Page
            className={page}
            key={`page_${index + 1}`}
            pageNumber={index + 1}
            devicePixelRatio={3}
            width={width}
          />
        ))}
        {/* <Page pageNumber={page} devicePixelRatio={3} width={width} /> */}
      </Document>
    </div>
  );
}
export default PDF;
