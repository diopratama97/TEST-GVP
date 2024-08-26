import { HttpException, Injectable } from '@nestjs/common';
import { ValidationService } from '../../common/validation.service';
import { v4 as uuidv4 } from 'uuid';
import { PoliCreate, PoliResponse } from '../../model/poli.model';
import { PoliValidation } from './poli.validation';
import { HttpServices } from 'src/common/http.service';
import { Knex } from 'knex';
import { InjectConnection } from 'nest-knexjs';

@Injectable()
export class PoliService {
  constructor(
    private validationService: ValidationService,
    private readonly http: HttpServices,
    @InjectConnection() private readonly knex: Knex,
  ) {}

  async create(req: PoliCreate, dataReq: Request): Promise<PoliResponse> {
    try {
      const header: any = {
        ...dataReq.headers,
      };

      if (!header.authorization) {
        throw new HttpException('Unauthorized', 401);
      }

      const PoliReq: PoliCreate = this.validationService.validate(
        PoliValidation.CREATE,
        req,
      );

      await this.http.PostMethod(
        'https://api-satusehat-stg.dto.kemkes.go.id/oauth2/v1/Location',
        PoliReq,
        {
          headers: {
            Authorization: header.authorization,
            'Content-Type': 'application/json',
          },
        },
      );

      await this.knex.table('poli').insert({
        id: uuidv4(),
        created_at: new Date(),
        resource_type: PoliReq.resourceType,
        identifier: JSON.stringify(PoliReq.identifier),
        status: PoliReq.status,
        name: PoliReq.name,
        description: PoliReq.description,
        mode: PoliReq.mode,
        telecom: JSON.stringify(PoliReq.telecom),
        physical_type: JSON.stringify(PoliReq.physicalType),
        position: JSON.stringify(PoliReq.position),
        managingOrganization: JSON.stringify(PoliReq.managingOrganization),
      });

      await this.knex.table('logs').insert({
        id: uuidv4(),
        created_at: new Date(),
        url: dataReq.url,
        full_response: JSON.stringify({
          statusCode: 200,
          message: 'Berhasil simpan',
        }),
        status_code: 200,
        request: JSON.stringify(dataReq.body),
      });

      return {
        statusCode: 200,
        message: 'Berhasil simpan',
      };
    } catch (error) {
      throw error;
    }
  }
}
