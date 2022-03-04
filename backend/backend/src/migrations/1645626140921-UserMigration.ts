import { User } from "../user/user.entity";
import { MigrationInterface, QueryRunner } from "typeorm";

export class UserMigration1645626140921 implements MigrationInterface {

    // Create factice registered users in our db.

    public async up(queryRunner: QueryRunner): Promise<void> {
        const dummy1 = await queryRunner.manager.save(
            queryRunner.manager.create<User>(User, {
                login: 'dummy1',
                status: 'offline',
                friends: ['dummy2']
            }),
        );
        const dummy2 = await queryRunner.manager.save(
            queryRunner.manager.create<User>(User, {
                login: 'dummy2',
                status: 'online',
                friends: ['dummy1']
            }),
        );
        const dummy3 = await queryRunner.manager.save(
            queryRunner.manager.create<User>(User, {
                login: 'dummy3',
                status: 'online',
                friends: ['dummy4']
            }),
        );
        const dummy4 = await queryRunner.manager.save(
            queryRunner.manager.create<User>(User, {
                login: 'dummy4',
                status: 'online',
                friends: ['dummy1']
            }),
        );
        const dummy5 = await queryRunner.manager.save(
            queryRunner.manager.create<User>(User, {
                login: 'dummy5',
                status: 'online',
                friends: ['dummy2']
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DELETE * FROM user`);
    }
}
