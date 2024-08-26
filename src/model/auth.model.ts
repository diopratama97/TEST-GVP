export class Login {
  client_id: string;
  client_secret: string;
}

export class LoginResponse {
  access_token: string;
  token_type: string;
  client_id: string;
  expires_in: string;
  organization_name: string;
}
