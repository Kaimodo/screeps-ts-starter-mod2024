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
import { preTick, reconcileTraffic } from "screeps-cartographer";

import Tasks from "creep-tasks";
import "creep-tasks/prototypes";
import { RoleHarvester } from "./roles/harvester";
import { RoleUpgrader } from "./roles/upgrader";
import structureTower from "./structure.tower";

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
  // log.info("Memory: " + memOld + " / " + Memory.version + " / " + config.TARGET_MEM_VERSION);
  console.log(
    `[${Inscribe.color("Memory: " + memOld + " / " + Memory.version + " / " + config.TARGET_MEM_VERSION, "red")}]`
  );
  utils.clearMemory();
}

// Get Script loading time
const elapsedCPU = Game.cpu.getUsed() - startCpu;
console.log(`[${Inscribe.color("Script Loading needed: ", "skyblue") + elapsedCPU.toFixed(2) + " Ticks"}]`);

let trafficCpu: number[] = [];

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

  preTick();

  global.cc = ConsoleCommands;
  // Main Loop here:
  if (!Memory.uuid || Memory.uuid > 1000) {
    Memory.uuid = 0;
  }

  const myStructureKeys = Object.keys(Game.structures);

  const myStructures: Structure<StructureConstant>[] = myStructureKeys.map(key => Game.structures[key]);
  const towers: StructureTower[] = [];

  for (const struct of myStructures) {
    if (struct.structureType === STRUCTURE_TOWER) {
      towers.push(struct as StructureTower);
    }
  }
  let spawn = Game.spawns["Spawn1"];
  let creeps = _.values(Game.creeps) as Creep[];

  // Separate creeps by role
  let harvesters = _.filter(creeps, creep => creep.name.includes("Harvester"));
  let upgraders = _.filter(creeps, creep => creep.name.includes("Upgrader"));

  // Spawn creeps as needed
  if (harvesters.length < 3) {
    spawn.spawnCreep([WORK, CARRY, MOVE], "Harvester" + Game.time);
  } else if (upgraders.length < 2) {
    spawn.spawnCreep([WORK, CARRY, MOVE], "Upgrader" + Game.time);
  }

  // Handle all roles, assigning each creep a new task if they are currently idle
  for (let harvester of harvesters) {
    if (harvester.isIdle) {
      RoleHarvester.newTask(harvester);
    }
  }
  for (let upgrader of upgraders) {
    if (upgrader.isIdle) {
      RoleUpgrader.newTask(upgrader);
    }
  }

  // Now that all creeps have their tasks, execute everything
  for (let creep of creeps) {
    creep.run();
  }

  structureTower.run(towers);

  if (spawn.spawning) {
    const spawningCreep = Game.creeps[spawn.spawning.name];
    spawn.room.visual.text("🛠️" + spawningCreep.memory.role, spawn.pos.x + 1, spawn.pos.y, {
      align: "left",
      opacity: 0.8
    });
  }

  //End of Loop
  const start = Game.cpu.getUsed();
  reconcileTraffic({ visualize: true });
  const cpuUsed = Game.cpu.getUsed() - start;
  trafficCpu.push(cpuUsed / Object.keys(Game.creeps).length);
  if (trafficCpu.length && Game.time % 100 === 0) {
    // track last 100 ticks
    trafficCpu = trafficCpu.slice(-100);
    console.log(
      `${Emoji.traffic} Average CPU used by traffic management: ${(
        trafficCpu.reduce((a, b) => a + b, 0) / trafficCpu.length
      ).toFixed(2)} per creep`
    );
  }

  Memory.rooms ??= {};

  visualizeIntel();
  utils.ClearNonExistingCreeMemory();
  utils.log_info();
  StatsManager.runForAllRooms();
});

const visualizeIntel = () => {
  for (const room in Memory.rooms) {
    if (Memory.rooms[room].visited) {
      Game.map.visual.text("✓", new RoomPosition(25, 25, room));
    } else {
      Game.map.visual.text("...", new RoomPosition(25, 25, room));
    }
  }
};

/*
functionName {}
Profiler.registerFN(functionName, 'BESCHREIBUNG');
Profiler.registerFN(run, 'run(Creep)');
cConsole: Game.profiler.profile(1000)
*/
