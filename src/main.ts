const startCpu = Game.cpu.getUsed();
import { ErrorMapper } from "utils/ErrorMapper";
import * as Inscribe from "screeps-inscribe";
import * as config from "config";
import { log } from "./utils/logger/logger";
import * as utils from "./utils/utils";
import { Emoji, Splash } from "./utils/emoji";
import * as Profiler from "screeps-profiler";
import { ConsoleCommands } from "utils/consolecommands";
import { StatsManager } from "./utils/stats";

import roleHarvester from "./role.harvester";
import roleBuilder from "./role.builder";
import roleUpgrader from "./role.upgrader";
import structureTower from "./structure.tower";
import spawnCreeps from "./spawn.creep";

// New Script loaded
console.log(`New Script loaded ${Emoji.reload}`);
Splash();

if (config.USE_PROFILER) {
  console.log(`[${Inscribe.color("Profiler: ", "skyblue") + config.USE_PROFILER}]`);
  Profiler.enable();
}

// Clear Memory
if (!Memory.version || Memory.version !== config.TARGET_MEM_VERSION) {
  const memOld = Memory.version;
  Memory.version = config.TARGET_MEM_VERSION;
  log.info("Memory: " + memOld + " / " + Memory.version + " / " + config.TARGET_MEM_VERSION);
  utils.clearMemory();
}

// Get Script loading time
const elapsedCPU = Game.cpu.getUsed() - startCpu;
console.log(`[${Inscribe.color("Script Loading needed: ", "skyblue") + elapsedCPU.toFixed(2) + " Ticks"}]`);

// When compiling TS to JS and bundling with rollup, the line numbers and file names in error messages change
// This utility uses source maps to get the line numbers and file names of the original, TS source code
export const loop = ErrorMapper.wrapLoop(() => {
  /*
  console.log(`Current game tick is ${Game.time}`);
  log.debug("db");
  log.warning("warn");
  log.info("inf");
  log.error("err");
  */

  global.cc = ConsoleCommands;
  // Main Loop here:
  if (!Memory.uuid || Memory.uuid > 1000) {
    Memory.uuid = 0;
  }

  const myStructureKeys = Object.keys(Game.structures);
  const myStructures: Structure<StructureConstant>[] = myStructureKeys.map(key => Game.structures[key]);

  const spawns: StructureSpawn[] = [];
  const towers: StructureTower[] = [];

  for (const struct of myStructures) {
    if (struct.structureType === STRUCTURE_SPAWN) {
      spawns.push(struct as StructureSpawn);
    }
    if (struct.structureType === STRUCTURE_TOWER) {
      towers.push(struct as StructureTower);
    }
  }

  spawns.forEach(spawn => {
    spawnCreeps.spawn(spawn);
  });
  structureTower.run(towers);

  for (const name in Game.creeps) {
    const creep = Game.creeps[name];
    if (creep.memory.role === "harvester") {
      roleHarvester.run(creep);
    }
    if (creep.memory.role === "builder") {
      roleBuilder.run(creep);
    }
    if (creep.memory.role == "upgrader") {
      roleUpgrader.run(creep);
    }
  }
  utils.ClearNonExistingCreeMemory();
  utils.log_info();
  StatsManager.runForAllRooms();
});

/*
functionName {}
Profiler.registerFN(functionName, 'BESCHREIBUNG');
Profiler.registerFN(run, 'run(Creep)');
cConsole: Game.profiler.profile(1000)
*/
