import { Worker, IWorker } from 'worker.role';

export class Harvester extends Worker implements IWorker {
  constructor() {
    super();
  }

  autoSpawn(spawn: StructureSpawn) {
    let result: number = 0;

    if (this.workers.length < 2) {
      const name = `h${Game.time}`;
      result = this.newWorker(spawn, [WORK, CARRY, MOVE], name, 'harvester');
    }

    switch (result) {
      case -3:
        throw ERR_NAME_EXISTS;
      case -4:
        throw ERR_BUSY;
      case -6:
        throw ERR_NOT_ENOUGH_ENERGY;
      default:
        return OK;
    }
  }

  run(creep: Creep) {
    if (creep.carry.energy < creep.carryCapacity) {
      this.harvest(creep);
    } else {
      this.energize(creep);
    }
  }

  energize(creep: Creep) {
    const targets = creep.room.find(FIND_STRUCTURES, {
      filter: structure => {
        return (
          (structure.structureType === STRUCTURE_EXTENSION ||
            structure.structureType === STRUCTURE_SPAWN ||
            structure.structureType === STRUCTURE_TOWER) &&
          structure.energy < structure.energyCapacity
        );
      }
    });
    if (targets.length > 0) {
      if (creep.transfer(targets[0], RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
        creep.moveTo(targets[0], {
          visualizePathStyle: { stroke: '#ffffff' }
        });
      }
    }
  }
}
