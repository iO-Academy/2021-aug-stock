const SSS = require('../Services/StringSanitisationService')

describe('sanitiseString', () => {
    test('testSuccessSanitiseString', () => {
        expect(SSS.sanitiseString('<h1>naughtyBitOfCode</h1>')).toBe('&lt;h1&gt;naughtyBitOfCode&lt;&#x2F;h1&gt;')
    })
})