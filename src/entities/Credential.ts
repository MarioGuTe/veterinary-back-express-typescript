import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({
  name: "credentials",
})
export class Credential {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ length: 100, nullable: false, unique: true })
  username: string;
  @Column({ length: 100, nullable: false })
  password: string;
}
