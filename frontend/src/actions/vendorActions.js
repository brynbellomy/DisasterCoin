import { FETCH_VENDORS, REGISTER_VENDOR, STORE_VENDORS } from '../constants/VendorActionTypes'

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

export function registerVendor (vendorObj) {
  return {
    type: REGISTER_VENDOR,
    vendorObj
  }
}
