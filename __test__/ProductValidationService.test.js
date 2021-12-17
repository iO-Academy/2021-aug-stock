const PVS = require('../Services/ProductValidationService')

describe('validateProductName', () => {
    test('testSuccessValidInput', () => {
        expect(PVS.validateProductName('aaaaaaaaaaaaaaaaaaaa')).toBe(true)
    })
    test('testFailureInvalidInput', () => {
        expect(PVS.validateProductName('aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')).toBe(false)
    })
})

describe('validatePrice', () => {
    test('testSuccessValidPrice', () => {
        expect(PVS.validatePrice(50)).toBe(true)
    })
    test('testSuccessValidPrice', () => {
        expect(PVS.validatePrice(100.5)).toBe(true)
    })
    test('testFailureValidPrice', () => {
        expect(PVS.validatePrice(0)).toBe(false)
    })
    test('testFailureInvalidPrice', () => {
        expect(PVS.validatePrice(-50)).toBe(false)
    })
    test('testFailureInvalidPrice', () => {
        expect(PVS.validatePrice(999999999999)).toBe(false)
    })
    test('testFailureInvalidPrice', () => {
        expect(PVS.validatePrice('This is a string')).toBe(false)
    })
    test('testFailureInvalidPrice', () => {
        expect(PVS.validatePrice([])).toBe(false)
    })
})

describe('validateStockQuantity', () => {
    test('testSuccessValidStockQuantity', () => {
        expect(PVS.validateStockQuantity(10)).toBe(true)
    })
    test('testSuccessValidStockQuantity', () => {
        expect(PVS.validateStockQuantity(0)).toBe(true)
    })
    test('testFailureValidStockQuantity', () => {
        expect(PVS.validateStockQuantity(10.5)).toBe(false)
    })
    test('testFailureValidStockQuantity', () => {
        expect(PVS.validateStockQuantity('This is a string')).toBe(false)
    })
    test('testFailureValidStockQuantity', () => {
        expect(PVS.validateStockQuantity([])).toBe(false)
    })
    test('testFailureValidStockQuantity', () => {
        expect(PVS.validateStockQuantity(true)).toBe(false)
    })
})

describe('validateSku', () => {
    test('testSuccessValidSku', () => {
        expect(PVS.validateSku('BUN-14HL64MF95NE40NGL8')).toBe(true)
    })
    test('testFailureInvalidSku', () => {
        expect(PVS.validateSku('bun-14HL64MF95NE40NGL8')).toBe(false)
    })
    test('testFailureInvalidSku', () => {
        expect(PVS.validateSku('BUN-14HL64MF95NE40NGL8888888888888')).toBe(false)
    })
    test('testFailureInvalidSku', () => {
        expect(PVS.validateSku('<h1>14HL64MF95NE40</h1>')).toBe(false)
    })
    test('testFailureInvalidSku', () => {
        expect(PVS.validateSku([])).toBe(false)
    })
})