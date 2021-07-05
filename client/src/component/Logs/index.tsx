import { useAppSelector } from "@hooks/useAppSelector";
import { Typography } from "@material-ui/core";

function Logs() {
  const logs = useAppSelector((state) => state.logs.logs);
  return (
    <>
      {logs.map((e, i) => (
        <Typography key={i} component={"h1"}>
          {e}
        </Typography>
      ))}
    </>
  );
}

export default Logs;
