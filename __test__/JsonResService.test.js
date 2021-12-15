const response = require('../Services/JsonResService')

describe('jsonResService', () => {
    test('testSuccessResponse', () => {
        expect(response(true, "successfully retrieved all product data", 200, [{"name": "None of your business"}]))
            .toEqual({"data": [{"name": "None of your business"}], "message": "successfully retrieved all product data", "status": 200, "success": true})
    })
})