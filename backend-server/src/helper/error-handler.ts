import { MongoError } from 'mongodb';

export default function errorHandler(error: unknown): { code: number; message: string } {
  if (error instanceof Error) {
    console.error(error.message);
    return { code: 500, message: 'Server error.' };
  } else if (error instanceof MongoError) {
    console.error(error.message);
    return { code: 404, message: 'Database error.' };
  } else {
    console.error(error);
    return { code: 500, message: 'Error retrieving sensor data.' };
  }
}
