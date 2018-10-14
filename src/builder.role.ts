import { Worker, IWorker } from 'worker.role';

export class Builder extends Worker implements IWorker {
  constructor() {
    super();
  }

  run(creep: any) {
    if (creep.memory.building && creep.carry.energy === 0) {
      creep.memory.building = false;
      creep.say('harvest');
    }
    if (!creep.memory.building && creep.carry.energy === creep.carryCapacity) {
      creep.memory.building = true;
      creep.say('building');
    }

    if (creep.memory.building) {
      this.build(creep);
    } else {
      this.harvest(creep);
    }
  }

  build(creep: Creep) {
    const targets = creep.room.find(FIND_CONSTRUCTION_SITES);
    if (targets.length) {
      if (creep.build(targets[0]) === ERR_NOT_IN_RANGE) {
        creep.moveTo(targets[0], {
          visualizePathStyle: { stroke: '#ffffff' }
        });
      }
    }
  }
}
