// Define the Quiz interface to represent the structure of a quiz object
export interface Quiz {
  id: number;          // Unique identifier for the quiz
  title: string;       // Title of the quiz
  description: string; // Brief description of the quiz
  userId: number;      // ID of the user who created the quiz (foreign key reference)
}
