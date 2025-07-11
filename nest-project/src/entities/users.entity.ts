import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from "typeorm"


@Entity('users')
export class Users {
    @PrimaryGeneratedColumn()
    u_idx: number

    @Column()
    kakao_id: string

    @Column()
    nickname: string

    @Column()
    profile_image: string

    @CreateDateColumn()
    created_at: Date
}