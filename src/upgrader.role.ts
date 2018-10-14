import { Worker, IWorker } from 'worker.role';

export class Upgrader extends Worker implements IWorker {
  constructor() {
    super();
  }

  run(creep: Creep, controller: any) {
    if (creep.carry.energy == 0) {
      this.harvest(creep);
    } else {
      this.upgrade(creep, controller);
    }
  }

  upgrade(creep: Creep, controller: StructureController) {
    if (creep.upgradeController(controller) == ERR_NOT_IN_RANGE) {
      creep.moveTo(controller);
    }
  }
}
