import {Entity, Column, CreateDateColumn, UpdateDateColumn, PrimaryGeneratedColumn} from 'typeorm';

@Entity('tokens')
export class Tokens {
  @PrimaryGeneratedColumn()
  t_idx: number;

  @Column()
  user_id: string;

  @Column()
  token_id: string;

  @Column()
  refresh_token: string;

  @Column({ type: 'timestamptz'})
  expired_at: Date;

  @CreateDateColumn({ type: 'timestamptz'})
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamptz'})
  updated_at: Date;
}