import styles from "../styles/navbar.module.css";
function Navbar(props) {
  const { showPDF, download } = props;
  return (
    <div className={styles.navbar}>
      <a className={styles.brandName} href="/pdfViewer">
        NOTI
      </a>
      {showPDF && (
        <button
          className="btn"
          onClick={() => {
            download();
          }}
        >
          {" "}
          Download
        </button>
      )}
    </div>
  );
}
export default Navbar;
