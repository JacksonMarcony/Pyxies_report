import { Entity, Column, CreateDateColumn, PrimaryColumn, BaseEntity, PrimaryGeneratedColumn } from "typeorm";

@Entity("users")
export class UserEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;
  
  @Column()
  name: string;
  
  @Column()
  email: string;
  
  @Column()
  registry: string;
  
  @Column()
  isVerify: boolean;
  
  @Column()
  password: string;

  @CreateDateColumn()
  created_at: Date;
}
