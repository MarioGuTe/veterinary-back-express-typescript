import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";

@Entity({
  name: "appointments",
})
export class Appointment {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ nullable: false })
  date: Date;
  @Column({ nullable: false })
  time: string;
  @Column({ nullable: false })
  userId: number;
  @Column()
  status: "active" | "cancelled";
  @ManyToOne(() => User, (user) => user.appointments)
  user: User;
}
