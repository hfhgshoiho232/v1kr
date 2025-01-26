import type { Part } from "./inventory-data"
import { siemensInventory } from "./siemens-inventory-data"
import { abbInventory } from "./abb-inventory-data"
import { beckhoffInventory } from "./beckhoff-inventory-data"
import { danfossInventory } from "./danfoss-inventory-data"
import { fanucInventory } from "./fanuc-inventory-data"
import { keyenceInventory } from "./keyence-inventory-data"
import { leuzeInventory } from "./leuze-inventory-data"
import { mitsubishiInventory } from "./mitsubishi-inventory-data"
import { omronInventory } from "./omron-inventory-data"
import { polycabInventory } from "./polycab-inventory-data"
import { smcInventory } from "./smc-inventory-data"
import { turckInventory } from "./turck-inventory-data"

// Mapping manufacturers to their respective inventory data
export const manufacturerInventoryMap: { [key: string]: Part[] } = {
  SIEMENS: siemensInventory,
  ABB: abbInventory,
  Beckhoff: beckhoffInventory,
  Danfoss: danfossInventory,
  Fanuc: fanucInventory,
  Keyence: keyenceInventory,
  Leuze: leuzeInventory,
  Mitsubishi: mitsubishiInventory,
  Omron: omronInventory,
  Polycab: polycabInventory,
  SMC: smcInventory,
  Turck: turckInventory,
}

