/**
 * 
 * @param {string} root root folder of views
 * @returns {(view: string | undefined) => string} view name in root folder
 */
const view = (root) => {
  return (view) => {
    if(!view?.trim()){
      return `${root}`;
    }
    return `${root}/${view}`;
  }
}

module.exports = view;