import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn} from 'typeorm';

@Entity()
export class Follows {
    @PrimaryGeneratedColumn()
    f_idx: number

    @Column()
    requester_id: number

    @Column()
    target_id: number

    @Column()
    status: number

    @CreateDateColumn()
    created_at: Date
}