import { Alert, Fade } from "@mui/material";
import { useState, useEffect } from "react";

const CustomAlert = ({ open, message, severity, setAlert }) => {
  const ALERT_VALUE = {
    duration: 2000,
    position: { position: 'fixed', width: '80%', top: '10%', left: '50%', transform: 'translate(-50%, 0)', zIndex: 1200 },
  };

  const [showAlert, setShowAlert] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowAlert(false);
      setAlert({ open: false, message: '', severity: '' });
    }, ALERT_VALUE.duration);
    return () => clearTimeout(timer);
  }, []);

  if (!open) return null;

  return (
    <Fade in={showAlert} timeout={{ enter: 300, exit: 1000 }}>
      <Alert severity={severity} sx={ALERT_VALUE.position}>
        {message}
      </Alert>
    </Fade >
  );
};

export default CustomAlert;
