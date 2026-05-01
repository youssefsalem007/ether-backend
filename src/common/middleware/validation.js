export const validation = (schema) => {
  return (req, res, next) => {
    const validationErrors = [];
    const validateTarget = ['body', 'params', 'query', 'file', 'files'];

    validateTarget.forEach(target => {
      if (schema[target]) {
        const { error, value } = schema[target].validate(req[target], { abortEarly: false });
        if (error) {
          error.details.forEach(detail => {
            validationErrors.push({
              message: detail.message,
              path: detail.path,
            });
          });
        } else {
          // Apply Joi-processed value back (applies defaults, strips unknowns, etc.)
          req[target] = value;
        }
      }
    });

    if (validationErrors.length > 0) {
      return res.status(400).json({ message: 'Validation Error', errors: validationErrors });
    }

    next();
  };
};
