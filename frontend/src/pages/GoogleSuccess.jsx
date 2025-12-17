import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../utils/auth";

const GoogleSuccess = () => {
  const navigate = useNavigate();

  useEffect(() => {
    loginUser();
    navigate("/");
  }, [navigate]);

  return null;
};

export default GoogleSuccess;
