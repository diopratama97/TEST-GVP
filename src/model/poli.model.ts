export class PoliResponse {
  statusCode: number;
  message: string;
}

export class PoliCreate {
  resourceType: string;
  identifier: JSON;
  status: string;
  name: string;
  description: string;
  mode: string;
  telecom: JSON;
  physicalType: JSON;
  position: JSON;
  managingOrganization: JSON;
}
