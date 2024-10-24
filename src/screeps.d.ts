interface Memory {
  creeps: { [name: string]: CreepMemory };
  codeVersion?: string;
  date?: string;
  version: string;
  uuid: number;
  stats: any;
}

interface CreepMemory {
  [name: string]: any;
  role: string;
  building?: boolean;
  upgrading?: boolean;
}

interface RoomMemory {
  [name: string]: any;
  lastProgressChecktime: any;
  lastProgress: any;
}

// Syntax for adding proprties to `global` (ex "global.log")
declare namespace NodeJS {
  interface Global {
    //log: any;
    log: {
      level: number;
      showSource: boolean;
      showTick: boolean;
    };
    cc: any;
  }
}
