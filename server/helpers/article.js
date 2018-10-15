
export const computeOffset = (req) => {
  let page = Object.keys(req.query).length ? parseInt(req.query.page) : 1;
  return page <=0 ? 1 : page;
}

export const computeTotalPages = (data, limit) => {
  return Math.ceil(data.length / limit);
}

