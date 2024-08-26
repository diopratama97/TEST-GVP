import { HttpException, Injectable } from '@nestjs/common';
import { ValidationService } from '../../common/validation.service';
import { v4 as uuidv4 } from 'uuid';

import { PerawatCreate, PerawatResponse } from '../../model/perawat.model';
import { PerawatValidation } from './perawat.validation';
import { Knex } from 'knex';
import { InjectConnection } from 'nest-knexjs';

@Injectable()
export class PerawatService {
  constructor(
    private validationService: ValidationService,
    @InjectConnection() private readonly knex: Knex,
  ) {}

  async create(req: PerawatCreate, dataReq: Request): Promise<PerawatResponse> {
    try {
      const PerawatReq: PerawatCreate = this.validationService.validate(
        PerawatValidation.CREATE,
        req,
      );

      const checkPerawat = await this.knex
        .table('perawat')
        .select('id')
        .where('name', PerawatReq.name)
        .first();

      if (checkPerawat) {
        throw new HttpException('Perawat sudah terdaftar', 409);
      }

      const perawatId = uuidv4();

      await this.knex.table('perawat').insert({
        id: perawatId,
        created_at: new Date(),
        name: PerawatReq.name,
        phone: PerawatReq.phone,
        address: PerawatReq.address,
      });

      await Promise.all([
        this.knex.table('poli_perawat').insert({
          id: uuidv4(),
          perawat_id: perawatId,
          created_at: new Date(),
          poli_address: PerawatReq.poli_address,
          poli_name: PerawatReq.poli_name,
        }),
        this.knex.table('logs').insert({
          id: uuidv4(),
          created_at: new Date(),
          url: dataReq.url,
          full_response: JSON.stringify({
            statusCode: 200,
            message: 'Berhasil simpan',
          }),
          status_code: 200,
          request: JSON.stringify(dataReq.body),
        }),
      ]);

      return {
        statusCode: 200,
        message: 'Berhasil simpan',
      };
    } catch (error) {
      throw error;
    }
  }

  async list(dataReq: Request) {
    try {
      const response = await this.knex
        .table('perawat as p')
        .select('p.*', 'pp.poli_address', 'pp.poli_name')
        .join('poli_perawat as pp', 'pp.perawat_id', 'p.id');

      await this.knex.table('logs').insert({
        id: uuidv4(),
        created_at: new Date(),
        url: dataReq.url,
        full_response: JSON.stringify(response),
        status_code: 200,
        request: null,
      });

      return response;
    } catch (error) {
      throw error;
    }
  }
}
