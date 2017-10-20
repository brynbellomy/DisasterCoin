import { FETCH_VENDORS, STORE_VENDORS } from '../constants/VendorActionTypes'

export function fetchVendors () {
  return {
    type: FETCH_VENDORS
  }
}

export function storeVendors (vendors) {
  return {
    type: STORE_VENDORS,
    vendors
  }
}
