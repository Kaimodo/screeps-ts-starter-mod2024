enum MemoryRole {
  HARVESTER = "harvester",
  UPGRADER = "upgrader",
  BUILDER = "builder"
}

export default MemoryRole;

/*
export const PATH_COLORS = {
  harvesting: "#ffaa00",
  transferring: "#ffffff",
  building: "##00FF00",
  upgrading: "#0000FF",
  claiming: "#FF0000",
  surveying: "#FF00FF"
};

imprt { getNaiveSource, PATH_COLORS } from "./utils";
creep.moveTo(creep.room.controller, { visualizePathStyle: { stroke: PATH_COLORS[creep.memory.state] } });
*/
