import { Field, InputType ,Int} from '@nestjs/graphql';
import { IsOptional } from 'class-validator';

@InputType()
export class UpdateBookInput {
  

  @Field({ nullable: true })
  @IsOptional()
  title?: string;

  @Field({ nullable: true })
  @IsOptional()
  description?: string;
}
