export interface RSVPResponse {
  id: string
  full_name: string
  guest_count: number
  attending: boolean
  created_at: string
}

export interface RSVPFormData {
  full_name: string
  guest_count: number
  attending: boolean
}