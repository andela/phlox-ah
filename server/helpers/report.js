
export default (req) => {
  const data = Object.assign(
    {},
    req.body,
    {
      userId: req.user.id,
      articleSlug: req.params.articleSlug,
      reportId: req.params.reportId,
    },
  );

  return data;
};
