/*
 * Gets random elements from an array
 */
const getRandomElements = (arr) => {
  // Shuffle the array
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]]; // Swap elements
  }

  return arr.slice(0, arr.len);
}

const getUnique = (arr) => {
  return [...new Set(arr)];
}

module.exports = { getRandomElements, getUnique };
