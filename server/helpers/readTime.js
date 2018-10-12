
/**
 * @attribute goes to http://www.craigabbott.co.uk/how-to-calculate-reading-time-like-medium
 * @description Calculate the time it takes to read an article
 * @param {string} text - this solve the problem
 * @returns {string} readingTime - Returns the minute(s) it takes to read an article
 */
const readTime = (text) => {
  const wordPerMinute = 200; // average person reads 200 words per minute
  // split the words by spaces, tabs, returns and newlines and get the length
  const numberOfWordsInText = text.split(/\s/g).length;
  // dividing the number of words by word per minute to get the minute(s)
  const minutes = numberOfWordsInText / wordPerMinute;
  const readingTime = Math.ceil(minutes); // roundup the minute(s) to the nearest figure

  return readingTime;
};

export default readTime;
