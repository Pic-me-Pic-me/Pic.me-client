export interface UserInfo {
  user_id: number;
  user_name: string;
  email: string;
  password: string;
  refreshToken: string;
}

export interface LoginType {
  provider_key: string;
  user_id: number;
  provider_type: string;
}