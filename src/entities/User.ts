import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Credential } from "./Credential";
import { Appointment } from "./Appointment";

@Entity({
  name: "users",
})
export class User {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ length: 100, nullable: false })
  name: string;
  @Column({ unique: true, nullable: false })
  email: string;
  @Column({ nullable: false })
  birthdate: Date;
  @Column({ unique: true, nullable: false })
  nDni: string;
  @OneToOne(() => Credential)
  @JoinColumn()
  credentials: Credential;

  @OneToMany(() => Appointment, (appointment) => appointment.user)
  appointments: Appointment[];
}
