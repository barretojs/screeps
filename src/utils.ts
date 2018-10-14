export function clearMemory() {
  for (let name in Memory.creeps) {
    if (!Game.creeps[name]) {
      console.log('Clearing non-existing creep memory: ', name);
      delete Memory.creeps[name];
    }
  }
}

export function workerCost(body: string[], spawn: StructureSpawn): boolean {
  let cost: number = 0;
  for (let i = 0; i < body.length; i++) {
    switch (body[i]) {
      case MOVE:
        cost += 50;
        break;
      case WORK:
        cost += 100;
        break;
      case ATTACK:
        cost += 80;
        break;
      case CARRY:
        cost += 50;
        break;
      case HEAL:
        cost += 250;
        break;
      case RANGED_ATTACK:
        cost += 150;
        break;
      case TOUGH:
        cost += 10;
        break;
      case CLAIM:
        cost += 600;
        break;
    }
  }

  return cost >= spawn.energy;
}
