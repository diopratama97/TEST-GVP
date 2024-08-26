import { Body, Controller, HttpCode, Post, Req } from '@nestjs/common';
import { PoliService } from './poli.service';
import { PoliCreate, PoliResponse } from '../../model/poli.model';
import { ResponseModel } from '../../model/response.model';

@Controller('/api/poli-create')
export class PoliController {
  constructor(private poliService: PoliService) {}

  @Post()
  @HttpCode(200)
  async create(
    @Body() req: PoliCreate,
    @Req() dataReg: any,
  ): Promise<ResponseModel<PoliResponse>> {
    const result = await this.poliService.create(req, dataReg);

    return {
      data: result,
    };
  }
}
