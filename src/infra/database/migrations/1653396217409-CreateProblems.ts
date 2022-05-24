import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateProblems1653396217409 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
              name: "problems",
              columns: [
                {
                  name: "id",
                  type: "integer",
                  isPrimary: true,
                  isGenerated: true,
                  generationStrategy: "increment",
                },
                {
                  name: "department",
                  type: "varchar",
                },
                {
                  name: "description",
                  type: "varchar",
                },
                {
                  name: "file",
                  type: "varchar"
                },
                {
                  name: "user_id",
                  type: "integer"
                },
                {
                  name: "accepted",
                  type: "boolean",
                },
                {
                  name: "created_at",
                  type: "timestamp",
                  default: "now()",
                },
              ],
              foreignKeys: [
                  {
                      name: "fk_problems_user",
                      columnNames: ["user_id"],
                      referencedTableName: "users",
                      referencedColumnNames: ["id"]
                  }
              ]
            })
          );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("problems");
    }

}

