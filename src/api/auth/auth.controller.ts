import { Body, Controller, HttpCode, Post, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Login, LoginResponse } from '../../model/auth.model';
import { ResponseModel } from '../../model/response.model';

@Controller('/api/login')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post()
  @HttpCode(200)
  async create(
    @Body() req: Login,
    @Req() dataReg: any,
  ): Promise<ResponseModel<LoginResponse>> {
    const result = await this.authService.login(req, dataReg);

    return {
      data: result,
    };
  }
}
