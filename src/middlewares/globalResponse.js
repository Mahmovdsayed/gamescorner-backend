export const globalResponse = (err, req, res, next) => {
  if (err) {
    return res.status(500).json({
      success: false,
      message: "Catch error",
      errorMsg: err.message,
    });
  }
};
