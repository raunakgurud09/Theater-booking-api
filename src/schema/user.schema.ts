import { object, string, ref } from 'yup';

export const createUserSchema = object({
  body: object({
    name: string().required('Name is required'),
    email: string().required('email is required'),
    password: string()
      .required('password is required')
      .min(6, 'password is to short - should be 6 char at least ')
      .matches(/^[a-zA-Z0-9_.-]*$/, 'password can contain one latin letter'),
    confirmPassword:string().oneOf(
        [ref("password"),null],
        "password must match"
    )
  })
});
