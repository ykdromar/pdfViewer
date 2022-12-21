import { LineWave, Oval } from "react-loader-spinner";

export function LineWaveLoader() {
  return (
    <LineWave
      height="300"
      width="300"
      color="RGB(37 142 248)"
      ariaLabel="line-wave"
      visible={true}
    />
  );
}

export function CircularLoader() {
  return (
    <Oval
      height={80}
      width={80}
      color="#4fa94d"
      wrapperStyle={{}}
      wrapperClass=""
      visible={true}
      ariaLabel="oval-loading"
      secondaryColor="#4fa94d"
      strokeWidth={2}
      strokeWidthSecondary={2}
    />
  );
}
