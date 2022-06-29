import {
    Entity,
    Column,
    CreateDateColumn,
    BaseEntity,
    PrimaryGeneratedColumn,
    JoinColumn,
    ManyToOne,
    OneToOne,
  } from "typeorm";
  import { ProblemEntity } from "./problem.entity";
import { UserEntity } from "./user.entity";
  
  @Entity("problems")
  export class LikeEntity extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column()
    user_id: string;
  
    @OneToOne(() => UserEntity)
    @JoinColumn({ name: "user_id" })
    user: UserEntity;
  
    @Column()
    problem_id: number;
  
    @ManyToOne(() => ProblemEntity)
    @JoinColumn({ name: "problem_id" })
    problem: ProblemEntity;
  
    @CreateDateColumn()
    created_at: Date;
  }
  