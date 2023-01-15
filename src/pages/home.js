import styles from "../styles/home.module.css";
import illustration from "../img/illust.png";
const Home = (props) => {
  const { handelFileInput } = props;
  return (
    <div className={styles.home}>
      <img className={styles.leftDiv} src={illustration} alt="" />
      <div className={styles.rightDiv}>
        <h1>Simplifying Notes Taking</h1>
        <span>Making notes from PDFs is now easier than ever.</span>
        <p>
          Simply select the text, then click the <b>"S"</b> key on the keyboard
          to add important info into Notes.
        </p>
        <div id="fileInputBtn">
          <label for="file" id="fileLabel" className={styles.fileInput}>
            Get Started
          </label>
          <input id="file" type="file" onChange={handelFileInput}></input>
        </div>
      </div>
    </div>
  );
};
export default Home;
