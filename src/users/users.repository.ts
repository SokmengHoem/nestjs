import { AbstractRepository } from "src/shared/repository.abstract";
import { User } from "./entities/user.entity";
import { Injectable } from "@nestjs/common";
import { EntityManager } from "typeorm";

@Injectable() //use explain class is a part of service mantainace by framework
export class UserRepository extends AbstractRepository<User>{
    constructor(protected readonly entityManager: EntityManager) {
        super(User, entityManager);
    }
}