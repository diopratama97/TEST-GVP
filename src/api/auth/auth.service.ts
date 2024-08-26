import { Injectable } from '@nestjs/common';
import { ValidationService } from '../../common/validation.service';
import { v4 as uuidv4 } from 'uuid';
import { Login, LoginResponse } from '../../model/auth.model';
import { AuthValidation } from './auth.validation';
import { HttpServices } from 'src/common/http.service';
import { Knex } from 'knex';
import { InjectConnection } from 'nest-knexjs';

@Injectable()
export class AuthService {
  constructor(
    private validationService: ValidationService,
    private readonly http: HttpServices,
    @InjectConnection() private readonly knex: Knex,
  ) {}

  async login(req: Login, dataReq: Request): Promise<LoginResponse> {
    try {
      const authReq: Login = this.validationService.validate(
        AuthValidation.LOGIN,
        req,
      );

      const getData = await this.http.PostMethod(
        'https://api-satusehat-stg.dto.kemkes.go.id/oauth2/v1/accesstoken?grant_type=client_credentials',
        {
          client_id: authReq.client_id,
          client_secret: authReq.client_secret,
        },
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        },
      );

      await this.knex.table('logs').insert({
        id: uuidv4(),
        created_at: new Date(),
        url: dataReq.url,
        full_response: JSON.stringify({
          client_id: getData.client_id,
          organization_name: getData.organization_name,
          access_token: getData.access_token,
          token_type: getData.token_type,
          expires_in: getData.expires_in,
        }),
        status_code: 200,
        request: JSON.stringify(dataReq.body),
      });

      return {
        client_id: getData.client_id,
        organization_name: getData.organization_name,
        access_token: getData.access_token,
        token_type: getData.token_type,
        expires_in: getData.expires_in,
      };
    } catch (error) {
      throw error;
    }
  }
}
