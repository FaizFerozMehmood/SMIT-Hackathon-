export const sendResponse = (res, statusCode, data = null, error = false, message = "") => {
    res.status(statusCode).json({
        error,
        message,
        data,
    });
};
// export default function sendResponse(res,status,data,error,msg) {
//     return res.status(status).json({
//       error,
//       msg,
//       data,
//     });
//   }