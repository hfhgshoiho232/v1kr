import { manufacturers } from "./inventory-data"
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

const CACHE_DURATION = 1000 * 60 * 5 // 5 minutes

interface CacheItem {
  data: Part[]
  timestamp: number
}

// Mapping manufacturers to their respective inventory data
const manufacturerInventoryMap: { [key: string]: Part[] } = {
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

class InventoryCache {
  private cache: Map<string, CacheItem> = new Map()

  getInventory(manufacturer: string): Part[] {
    const cacheKey = manufacturer.toLowerCase()
    const cachedItem = this.cache.get(cacheKey)

    if (cachedItem && Date.now() - cachedItem.timestamp < CACHE_DURATION) {
      return cachedItem.data
    }

    const inventory = manufacturerInventoryMap[manufacturer] || []
    this.cache.set(cacheKey, { data: inventory, timestamp: Date.now() })
    return inventory
  }
}

export const inventoryCache = new InventoryCache()

