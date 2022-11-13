import mongoose, { Types } from 'mongoose';

export interface ShowDocument extends mongoose.Document {
  screenNumber: number;
  movieName: string;
  duration: Date;
  price: number;
  seats: Array<TicketDocument>;
}

export interface TicketDocument extends mongoose.Document {
  seatNumber: number;
  showId: Types.ObjectId;
  isSeatFilled: boolean;
  userId: string;
}

const TicketSchema = new mongoose.Schema({
  seatNumber: { type: Number },
  showId: { type: mongoose.SchemaTypes.ObjectId, ref: 'Show' },
  isSeatFilled: { type: Boolean, default: false },
  userId: { type: String }
});

const ShowSchema = new mongoose.Schema({
  screenNumber: { required: true, type: Number },
  movieName: { require: true, type: String },
  duration: { required: true, type: Date },
  price: { require: true, type: Number },
  seats: [
    {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'Ticket'
    }
  ]
});

const Show = mongoose.model<ShowDocument>('Show', ShowSchema);
const Ticket = mongoose.model<TicketDocument>('Ticket', TicketSchema);

export { Show, Ticket };
