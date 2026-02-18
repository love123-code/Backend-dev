function validateYear(req, res, next) {
  const { year } = req.body;

  if (!year || isNaN(year)) {
    return res.status(400).json({ message: "Year must be a valid number" });
  }

  const currentYear = new Date().getFullYear();

  if (year < 1500 || year > currentYear) {
    return res.status(400).json({
      message: `Year must be between 1500 and ${currentYear}`
    });
  }

  next();
}

module.exports = validateYear;
