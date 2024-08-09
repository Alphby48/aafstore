import { useState } from "react";
import { useEffect } from "react";
import { PostProfile } from "../service/profile";

const useValidasi = () => {
  const [logId, setLogId] = useState(null);
  const [tokenId, setTokenId] = useState(null);
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      window.location.href = "/login";
      return;
    }

    const identy = JSON.parse(localStorage.getItem("token")).id;
    setTokenId(identy);
    PostProfile(identy, (res) => {
      const dataSet = res.find((data) => data._id === identy);
      if (dataSet) {
        setLogId(dataSet._id);
      } else {
        window.location.href = "/login";
      }
    });
  }, []);

  useEffect(() => {
    if (logId && tokenId && logId !== tokenId) {
      window.location.href = "/login";
    }
  }, [logId, tokenId]);
};

export default useValidasi;
