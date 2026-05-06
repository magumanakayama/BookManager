import { Alert, Fade } from "@mui/material";
import { useState, useEffect } from "react";

const ALERT_VALUE = {
  duration: 2000,
  position: { position: 'fixed', width: '80%', top: '10%', left: '50%', transform: 'translate(-50%, 0)', zIndex: 1200 },
  timeout: { enter: 300, exit: 1000 }
};

const CustomAlert = ({ alert, close }) => {
  const { open, message, severity } = alert;

  // openだけだと2秒後のopen=false時に再レンダリングが走るので、フェードアウトする前にコンポーネント全体が再レンダリングされてしまう
  // よってステートを分けることでアラートの表示(showAlert)とコンポーネント全体のレンダリング判定(open)を別にする
  const [showAlert, setShowAlert] = useState(false);

  // useEffect(() => {
  //   if (open) {
  //     setShowAlert(true);
  //     const timer = setTimeout(() => {
  //       setShowAlert(false);
  //     }, ALERT_VALUE.duration);
  //     return () => clearTimeout(timer);
  //   }
  // }, [open]);

  return (
    <Fade in={showAlert} timeout={ALERT_VALUE.timeout} onExited={close}>
      <Alert severity={severity} sx={ALERT_VALUE.position}>
        {message}
      </Alert>
    </Fade >
  );
};

export default CustomAlert;
