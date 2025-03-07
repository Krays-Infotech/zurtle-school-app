import { Toaster, toast } from "react-hot-toast";

const MessageBar = () => (
  <Toaster
    position="top-center"
    reverseOrder={false}
    toastOptions={{
      duration: 5000,
      style: {
        border: "1px solid #e0e0e0",
        padding: "16px",
        borderRadius: "8px",
        backgroundColor: "#fff",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        color: "#333",
        fontSize: "16px",
      },
    }}
    data-testid="toast"
  />
);

// Success notification toast
export const successNotify = (msg) =>
  toast.success(msg, {
    position: "top-center",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  });

// error notification toast

export const errorNotify = (err) =>
  toast.error(err, {
    position: "top-center",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  });

export default MessageBar;

export const config = {
  headers: {
    "Content-Type": "application/json",
  },
};

export const localStorageKey = {
  USERDATA: "userData",
};

export const getValueFromLocalStorage = (key) => {
  try {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : null;
    return value ? value : null;
  } catch (error) {
    console.error("Error getting value from localStorage:", error);
    return null;
  }
};

export const getValueFromLocalStorageKey = (key, field) => {
  const storedObject = localStorage.getItem(key);

  if (storedObject) {
    try {
      const parsedObject = JSON.parse(storedObject);
      return parsedObject[field];
    } catch (error) {
      console.log("Error parsing JSON from localStorage:", error);
      return null;
    }
  } else {
    return null;
  }
};

export const updateValueInLocalStorage = (key, newValue) => {
  try {
    const existingValue = getValueFromLocalStorage(key);
    const updatedValue = { ...existingValue, ...newValue };
    localStorage.setItem(key, JSON.stringify(updatedValue));
  } catch (error) {
    console.error("Error updating value in localStorage:", error);
  }
};
