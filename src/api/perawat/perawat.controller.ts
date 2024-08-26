import { Body, Controller, Get, HttpCode, Post, Req } from '@nestjs/common';
import { PerawatService } from './perawat.service';
import { PerawatCreate, PerawatResponse } from '../../model/perawat.model';
import { ResponseModel } from '../../model/response.model';

@Controller('/api/perawat')
export class PerawatController {
  constructor(private perawatService: PerawatService) {}

  @Post()
  @HttpCode(200)
  async create(
    @Body() req: PerawatCreate,
    @Req() dataReg: any,
  ): Promise<ResponseModel<PerawatResponse>> {
    const result = await this.perawatService.create(req, dataReg);

    return {
      data: result,
    };
  }

  @Get()
  @HttpCode(200)
  async list(@Req() dataReg: any) {
    const result = await this.perawatService.list(dataReg);

    return {
      data: result,
    };
  }
}
