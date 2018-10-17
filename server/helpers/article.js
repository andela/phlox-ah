
export const computeOffset = (req) => {
  const page = Object.keys(req.query).length ? parseInt(req.query.page, 10) : 1;
  return ((page <= 0) || (Number.isNaN(page))) ? 1 : page;
};

export const computeTotalPages = (data, limit) => Math.ceil(data.length / limit);
