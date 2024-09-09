
export interface userRequestBody {
  user_code: string;
  user_username: string;
  user_password: string;
  confirmPassword: string;
  user_phone?: string;
  user_email: string;
  role_id: string;
}

export interface roleRequestBody {
  role_type: string;
}
