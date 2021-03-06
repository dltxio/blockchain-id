// todo - write tests for the new sms service
// keeping this file here for reference

// import {
//   generateValidationCodes,
//   generateVerificationCode
// } from "../../utils/verification-codes";
// import { checkVerification } from "./message";

// describe("message.ts", () => {
//   const number = "0412345678";
//   const otherNumber = "+612345678912";
//   describe("generateValidationCodes", () => {
//     it("should generate two codes", () => {
//       const codes = generateValidationCodes(number);
//       expect(codes.length).toBe(2);
//     });
//     it("should generate the same codes for the same number on the same days", () => {
//       const codes = generateValidationCodes(number);
//       const secondCodes = generateValidationCodes(number);
//       expect(codes[0]).toBe(secondCodes[0]);
//       expect(codes[1]).toBe(secondCodes[1]);
//     });
//     it("should generate different codes for different numbers", () => {
//       const codes = generateValidationCodes(number);
//       const secondCodes = generateValidationCodes(otherNumber);
//       expect(codes[0] == secondCodes[0]).toBe(false);
//       expect(codes[1] == secondCodes[1]).toBe(false);
//     });
//   });
//   describe("generateVerificationCode", () => {
//     it("should generate a code", () => {
//       const code = generateVerificationCode(number);
//       expect(code).toBeDefined();
//     });
//     it("should generate the same code for the same number on the same day", () => {
//       const code = generateVerificationCode(number);
//       const secondCode = generateVerificationCode(number);
//       expect(code).toBe(secondCode);
//     });
//   });
//   describe("checkVerification", () => {
//     it("should return true for the correct code number pair", () => {
//       const code = generateVerificationCode(number);
//       const result = checkVerification(number, code);
//       expect(result).toBe(true);
//     });
//     it("should return false for an invalid number code pair", () => {
//       const code = generateVerificationCode(number);
//       const result = checkVerification(otherNumber, code);
//       expect(result).toBe(false);
//     });
//   });
// });
