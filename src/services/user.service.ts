import { DocumentDefinition, FilterQuery } from 'mongoose';
import User, { UserDocument } from '../model/user.model';
import { omit } from 'lodash';
import {
  Show,
  ShowDocument,
  Ticket,
  TicketDocument
} from '../model/show.model';

export async function createUser(input: DocumentDefinition<UserDocument>) {
  try {
    return await User.create(input);
  } catch (error) {
    console.log(error);
    // throw new Error(error)
  }
}

export async function findUser(query: FilterQuery<UserDocument>) {
  return User.findOne(query).lean();
}

export async function validatePassword({
  email,
  password
}: {
  email: UserDocument['email'];
  password: string;
}) {
  const user = await User.findOne({ email });
  if (!user) {
    return false;
  }

  const isValid = await user.comparePassword(password);
  if (!isValid) {
    return false;
  }
  return omit(user.toJSON(), 'password');
}

export async function createTicket(
  screen: string,
  seat: any,
  user: any
) {
  try {
    const s = parseInt(seat);

    if (s > 100) {
      return false;
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const show: any = await Show.findOne({ screenNumber: screen }).populate(
      'seats'
    );

    let isAvailable = true;
    show.seats.map((seat:any) => {
      if (seat.seatNumber == s && seat.isSeatFilled === true) {
        isAvailable = false;
        return false;
      }
      return true;
    });

    if (isAvailable) {
      try {
        const newTicket = await Ticket.create({
          seatNumber: s,
          userId: user._id,
          isSeatFilled: true
        });
        show.seats.push(newTicket);
        await show.save();
        // return await Ticket.create(input)
        return await newTicket;
      } catch (error) {
        console.log(error);
      }
    } else {
      //return available tickets preferable side one
      return false;
    }
  } catch (error) {
    console.log(error);
  }
}

// if(s>100){
//   return res.status(StatusCodes.BAD_REQUEST).json({"message":"Their are only 100 seats"})
// }

// const show = await Show.findOne({ screenNumber: screenNumber }).populate('seats')

// //check the database
// let isAvailable = true
// show.seats.map(seat => {
//   if(seat.seatNumber == s && seat.isSeatFilled === true){
//     // console.log('inside',seat.seatNumber,s)
//     isAvailable = false
//     return false
//   }
//   // console.log('outside',seat.seatNumber,s,seat.isSeatFilled)
//   return true
// })

// if (isAvailable) {
//   try {
//     const newTicket = await Ticket.create({
//       seatNumber: s,
//       userId: req.user._id,
//       isSeatFilled: true,
//     })
//     show.seats.push(newTicket)
//     await show.save()
//     return res.status(200).json(newTicket);
//   } catch (error) {
//     console.log(Error)
//   }
// }else{
//   //return available tickets preferable side one
//   res.send("book ticket");
// }
