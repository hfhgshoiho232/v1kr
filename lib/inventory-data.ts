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

export interface Part {
  id: number
  partNumber: string
  manufacturer: string
  status: "In Stock" | "Available" | "Processing" | "Contact for Details"
  description?: string
  specifications?: string[]
  features?: string[]
}

export const inventoryData: Part[] = [
  ...siemensInventory,
  ...abbInventory,
  ...beckhoffInventory,
  ...danfossInventory,
  ...fanucInventory,
  ...keyenceInventory,
  ...leuzeInventory,
  ...mitsubishiInventory,
  ...omronInventory,
  ...polycabInventory,
  ...smcInventory,
  ...turckInventory,
]

export const manufacturers = [
  "SIEMENS",
  "ABB",
  "Beckhoff",
  "Danfoss",
  "Fanuc",
  "Keyence",
  "Leuze",
  "Mitsubishi",
  "Omron",
  "Polycab",
  "SMC",
  "Turck",
]

export const manufacturerDescriptions: { [key: string]: string } = {
  SIEMENS: "Siemens offers a wide range of industrial control products and solutions.",
  Beckhoff: "Beckhoff implements open automation systems based on PC Control technology.",
  Danfoss: "Danfoss engineers technologies that enable the world of tomorrow to do more with less.",
  Fanuc: "FANUC offers CNC systems, robots, and ROBOMACHINES.",
  Keyence:
    "KEYENCE provides automation sensors, vision systems, barcode readers, laser markers, measuring instruments, and digital microscopes.",
  Leuze: "Leuze electronic develops and manufactures switching and sensing equipment for automation technology.",
  Mitsubishi:
    "Mitsubishi Electric provides automation products, including PLCs, HMIs, inverters, servo motors, and robots.",
  Omron: "Omron offers a wide range of industrial automation products and solutions.",
  Polycab: "Polycab is a leading manufacturer of cables and wires.",
  Turck: "Turck provides efficient sensor, fieldbus, connection, and interface technology solutions.",
}

