// Define the User interface to represent the structure of a user object
export interface User {
  id: number;        // Unique identifier for the user
  username: string;  // Username chosen by the user (must be unique)
  password: string;  // Hashed password for authentication
}
