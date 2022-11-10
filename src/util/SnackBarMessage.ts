import { useCallback, useState } from "react";

interface SnackBarMessage {
  open: boolean;
  data: string;
}

const useSnackBarMessage = (): [SnackBarMessage, (message: string) => void] => {
  const [snackBarMessage, setUserMessage] = useState<SnackBarMessage>({
    open: false,
    data: "",
  });
  const showSnackBar = useCallback((message: string) => {
    setUserMessage({ open: true, data: message });
    setTimeout(() => setUserMessage({ open: false, data: "" }), 5000);
  }, []);
  return [snackBarMessage, showSnackBar];
};

export default useSnackBarMessage;
