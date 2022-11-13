import { DocumentDefinition, FilterQuery, UpdateQuery } from 'mongoose';
import { Show, ShowDocument } from '../model/show.model';

export async function allShows() {
  try {
    return await Show.find({});
  } catch (error) {
    console.log(error);
  }
}

export async function createShow(input: DocumentDefinition<ShowDocument>) {
  try {
    //check weather their exit a show already
    return await Show.create(input);
  } catch (error) {
    console.log(error);
  }
}

export async function updateShow(
  query: FilterQuery<ShowDocument>,
  update: UpdateQuery<ShowDocument>
) {
  try {
    return await Show.updateOne({ query }, { update });
  } catch (error) {
    console.log(error);
  }
}


export async function deleteShow(query: FilterQuery<ShowDocument>) {
  try {
    return await Show.deleteOne(query);
  } catch (error) {
    console.log(error);
  }
}

export async function showDetails(query: FilterQuery<ShowDocument>) {
  try {
    return await Show.find(query).populate('seats');
  } catch (error) {
    console.log(error);
  }
}
