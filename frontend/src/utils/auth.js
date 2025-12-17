
export const loginUser = (data) => {
    if (!data || !data.token) {
      console.warn("No token received");
      return;
    }
    localStorage.setItem("token", data.token);
  };
  
  export const logoutUser = () => {
    localStorage.removeItem("token");
  };
  