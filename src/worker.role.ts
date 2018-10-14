export class Worker {
  workers: string[] = [];

  constructor() {}

  newWorker(
    spawn: StructureSpawn,
    tasks: Array<any>,
    name: string,
    role: string
  ): number {
    const result: number = spawn.spawnCreep(tasks, name, {
      memory: { role: role }
    });

    if (result === 0) {
      this.workers.push(name);
      return result;
    } else {
      return result;
    }
  }

  harvest(creep: Creep) {
    const sources = creep.room.find(FIND_SOURCES);
    if (creep.harvest(sources[0]) === ERR_NOT_IN_RANGE) {
      creep.moveTo(sources[0], { visualizePathStyle: { stroke: '#ffaa00' } });
    }
  }
}

export interface IWorker {
  run(creep: Creep, controller?: any): void;
  autoSpawn?(spawn: StructureSpawn): any;
}
