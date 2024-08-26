import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class HttpServices {
  constructor(private readonly httpServices: HttpService) {}

  public async PostMethod(url: string, data: any, config?: any) {
    try {
      const response = await firstValueFrom(
        this.httpServices.post(url, data, config),
      );

      return response.data;
    } catch (error) {
      throw error;
    }
  }
}
