import { object, string, number, date } from 'yup';

export const createShowSchema = object({
  body: object({
    screenNumber: number().required('Screen number is required'),
    movieName: string().required('movie name is required'),
    duration: date().required('date is required')
  })
});

export const bookTicketSchema = object({
  body: object({}),
  params: object({
    screen: string().required('screen number is required')
  }),
  query: object({
    seat: string().required('seat number is required')
  })
});
