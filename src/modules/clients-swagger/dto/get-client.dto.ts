import { ApiProperty } from '@nestjs/swagger';
import { ApiExtraModels } from '@nestjs/swagger';
import { Client } from '../extra-models/client';

@ApiExtraModels(Client)
export class GetClientDto { }

// I stayed here:        Arrays