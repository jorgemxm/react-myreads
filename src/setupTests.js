/**
* localStorage MOCK
* INFO: https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md#initializing-test-environment
*/
const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  clear: jest.fn()
};

global.localStorage = localStorageMock;


/**
* fetch MOCK
* INFO: how to test api calls using fetch?
* - https://github.com/facebookincubator/create-react-app/issues/967
* - http://facebook.github.io/jest/docs/en/tutorial-async.html
*/
global.fetch = jest.fn().mockImplementation(() => {
  const promise = new Promise((resolve, reject) => {
    resolve({
      ok: true,
      books: [],
      json: function() {
        return { books: [] }
      }
    });
  });

  return promise;
});
