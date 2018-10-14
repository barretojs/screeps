import { Upgrader } from './upgrader.role';
import { Builder } from './builder.role';
import { Harvester } from './harvester.role';
import { clearMemory, workerCost } from './utils';

const harvester = new Harvester();
const upgrader = new Upgrader();
const builder = new Builder();

export const loop = () => {
  clearMemory();

  const spawn1 = Game.spawns['Spawn1'];

  if (workerCost && !spawn1.spawning) {
    try {
      harvester.autoSpawn(spawn1);
    } catch (err) {
      if (err === ERR_NAME_EXISTS) console.log('harvester name already exists');
      else if (err === ERR_BUSY) console.log('spawner busy');
      else console.log('not enough energy');
    }
  }

  for (let creep in Game.creeps) {
    const worker: any = Game.creeps[creep];

    if (worker.memory.role === 'harvester') harvester.run(worker);
    else if (worker.memory.role === 'upgrader')
      upgrader.run(worker, worker.room.controller);
    else builder.run(worker);
  }
};
