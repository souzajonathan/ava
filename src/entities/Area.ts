import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { v4 as uuid} from "uuid";

@Entity("areas")
export class Area {
    @PrimaryGeneratedColumn("uuid")
    id: string;
    
    @Column()
    name: string;

    @Column()
    description: string;
    
    @CreateDateColumn()
    created_at: Date;

    @Column()
    area_id: string;

    @ManyToOne(() => Area)
    @JoinColumn({name: "area_id"})
    area: Area;

    constructor() {
        if(!this.id){
            this.id = uuid();
        }
    }
}