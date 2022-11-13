import { object, string, number, date } from 'yup';

const payload = {
  body: object({
    screenNumber: number().required('Screen number is required'),
    movieName: string().required('movie name is required'),
    duration: date().required('date is required')
  })
};

const params = {
  params: object({
    showId: string().required('showId is required')
  })
};

export const createShowSchema = object({
  ...payload
});

export const updateShowSchema = object({
  ...payload,
  ...params
});

export const deleteShowSchema = object({
  ...payload,
  ...params
});


export const bookTicketSchema = object({
  body: object({}),
  params: object({
    screen: string().required('screen number is required'),
    showId: string().required('show id is required')
  }),
  query: object({
    seat: string().required('seat number is required')
  })
});

export const showDetailsSchema = object({
  params: object({
    screen: string().required('screen number is required'),
    showId: string()
  })
});
