type gender = "male" | "female";

export interface IUserProfile {
  user_id: string;
  bio: string;
  address: string;
  phone: string;
  gender: gender;
}
