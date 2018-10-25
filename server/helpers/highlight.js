import faker from 'faker';

export const validHighlight = {
  articleSlug: 'title-of-article1',
  userId: 1,
  selectedText: 'Nice work',
  comment: 'I like this sentence',
};

export const noArticleSlug = {
  userId: 1,
  selectedText: 'Nice work',
  comment: 'I like this sentence',
};

export const noUserId = {
  articleSlug: '',
  selectedText: 'Nice work',
  comment: 'I like this sentence',
};

export const noSelectedText = {
  articleSlug: '',
  userId: 1,
  comment: 'I like this sentence',
};

export const noComment = {
  articleSlug: '',
  userId: 1,
  selectedText: 'Nice work',
};

export const user = {
  username: faker.internet.userName(),
  email: faker.internet.email(),
  password: 'password'
};

export const article = {
  title: faker.lorem.sentence(),
  body: 'This is the description for this article',
  description: 'This is the description',
  tags: [],
  categoryId: 1
};
