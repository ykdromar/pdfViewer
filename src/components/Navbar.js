import styles from "../styles/navbar.module.css";
function Navbar(props) {
  const { handelFileInput } = props;
  return (
    <div className={styles.navbar}>
      <div className={styles.brandName}>NOTI</div>
      <input
        type="file"
        onChange={handelFileInput}
        className={styles.fileInput}
      ></input>
    </div>
  );
}
export default Navbar;
