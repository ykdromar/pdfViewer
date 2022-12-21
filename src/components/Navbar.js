import styles from "../styles/navbar.module.css";
function Navbar(props) {
  const { handelFileInput, showPDF, download } = props;
  return (
    <div className={styles.navbar}>
      <div className={styles.brandName}>NOTI</div>
      {showPDF ? (
        <button
          className="btn"
          onClick={() => {
            download();
          }}
        >
          {" "}
          Download
        </button>
      ) : (
        <div id="fileInputBtn">
          <label for="file" id="fileLabel">
            Select PDF
          </label>
          <input
            id="file"
            type="file"
            onChange={handelFileInput}
            className={styles.fileInput}
          ></input>
        </div>
      )}
    </div>
  );
}
export default Navbar;
