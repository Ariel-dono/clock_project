module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  reporters: [
    'default',
    [
      './node_modules/jest-html-reporter',
      {
        pageTitle: 'Clock project coverage report',
        outputPath: 'coverage/report.html',
        includeFailureMsg: false
      }
    ]
  ]
}
