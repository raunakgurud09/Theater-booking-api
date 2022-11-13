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
  showId: string,
  seat: string,
  user: any
) {
  try {
    const s = parseInt(seat);

    if (s > 100) {
      return false;
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const show: any = await Show.findOne({
      screenNumber: screen,
      _id: showId
    }).populate('seats');

    if(!show){
      const message = {"message":"No such show exist"}
      return message
    }


    let isAvailable = true;
    show.seats.map((seat: TicketDocument) => {
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

export async function cancelTicket(
  screen: string,
  showId: string,
  seat: string,
  user: any
) {
  try {
    const s = parseInt(seat);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const show = await Show.findOne({
      screenNumber: screen,
      _id: showId
    }).populate('seats');

    if(!show){
      return {"message":"No such show exist"}
    }

    show.seats.map(async (seat: TicketDocument) => {
      if (seat.seatNumber == s && seat.userId === user._id) {
        try {
          //cancel the ticket
          return await Ticket.findOneAndDelete({ seatNumber: s });
        } catch (error) {
          console.log(error);
        }
      }
      return;
    });
  } catch (error) {
    console.log(error);
  }
}

export async function getTicket(user: any) {
  try {
    return await Ticket.find({ userId: user._id });
  } catch (error) {
    console.log(error);
  }
}
