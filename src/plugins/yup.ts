import * as yup from 'yup';



declare module 'yup' {
  interface StringSchema {
    phone(): StringSchema;
  }
}

yup.addMethod(yup.string, 'phone', function () {
  return this.test('phone', 'Invalid phone number', function (value) {
    if (value === undefined || value === null || value === '') {
      return true;
    }
    return /^1[3456789]\d{9}$/.test(value)
  });
});
