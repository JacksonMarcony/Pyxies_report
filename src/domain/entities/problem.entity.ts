import {
  Entity,
  Column,
  CreateDateColumn,
  BaseEntity,
  PrimaryGeneratedColumn,
} from "typeorm";

@Entity("admDepartment")
export class AdmDepartmentEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  registry: string;

  @Column()
  cpf: string;

  @Column()
  department: string;

  @Column()
  password: string;

  @CreateDateColumn()
  created_at: Date;
}
