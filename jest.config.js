module.exports = {
  transform: {
    '^.+\\.[t|j]sx?$': 'babel-jest',
  },
  moduleNameMapper: {
    '^ky$': '<rootDir>/config/__mocks__/ky.js',
    '\\.(jpg|ico|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/config/__mocks__/fileMock.js',
    '\\.(css|less)$': '<rootDir>/config/__mocks__/fileMock.js',
  },
}
