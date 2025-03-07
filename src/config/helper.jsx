import { toast } from "react-toastify";

export const Success = (msg) =>
  toast.success(msg, {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  });

export const Error = (err) =>
  toast.error(err, {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  });

export const getConvertedParams = (endUrl, params) => {
  if (!endUrl) return "";

  let lastChar = endUrl.charAt(endUrl.length - 1);
  if (lastChar !== "?") {
    endUrl += "?";
  }

  Object.keys(params).forEach((key) => {
    if (params[key] !== undefined && params[key] !== null) {
      endUrl +=
        encodeURIComponent(key) +
        "=" +
        encodeURIComponent(params[key]) +
        "&";
    }
  });

  return endUrl.slice(0, -1);
};
