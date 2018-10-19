
export default (req) => {
  const data = Object.assign(
    {},
    {
      title: req.body.title,
      body: req.body.body,
      userId: req.user.id,
      articleSlug: req.params.articleSlug,
      reportId: req.params.reportId,
    },
  );

  return data;
};
