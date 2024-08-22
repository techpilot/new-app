import { PartialType } from '@nestjs/mapped-types';
import { CreateAutobotDto } from './create-autobot.dto';

export class UpdateAutobotDto extends PartialType(CreateAutobotDto) {}
