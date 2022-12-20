import { Document, Page } from "react-pdf/dist/esm/entry.webpack5";
import "react-pdf/dist/esm/Page/TextLayer.css";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";

function App() {
  return (
    <div className="App" style={{ display: "flex", justifyContent: "center" }}>
      <Document file="FCH.pdf" style={{ width: "100vw" }}>
        <Page pageNumber={1} devicePixelRatio={7} scale={2} />
      </Document>
    </div>
  );
}

export default App;
