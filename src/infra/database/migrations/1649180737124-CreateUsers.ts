import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateUsers1649180737124 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "users",
        columns: [
          {
              name: "id",
              type: "integer",
              isPrimary:true,
              isGenerated:true,
              generationStrategy:'increment'
          },
          {
            name: "name",
            type: "varchar",
          },
          {
            name: "email",
            type: "varchar",
            isUnique: true,
          },
          {
            name: "registry",
            type: "varchar"
          },
          {
            name: "isVerify",
            type: "boolean"
          },
          {
            name: "password",
            type: "varchar"
          },
          {
            name: "created_at",
            type: "timestamp",
            default: "now()",
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("users");
  }
}
