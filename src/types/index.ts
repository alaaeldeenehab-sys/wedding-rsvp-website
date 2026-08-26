export interface RSVP {
  id?: string;
  full_name: string;
  guest_count: number;
  attending: boolean;
  created_at?: string;
}

export interface AdminStats {
  total_confirmed: number;
  total_guests_confirmed: number;
  total_declined: number;
  total_responses: number;
}
