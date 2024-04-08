export interface ParkingSlotInterface {
    parking_slot_no: string;
    vehicle_type: string;
    status?: string;
}

export interface ParkingSlotUpdateInterface {
    vehicle_type_name: string;
    new_status: string;
}

export interface ReservationRequestInterface {
    vehicle_no: string;
    out_date: string;
}

export interface ReservationResponseInterface {
    parking_slot_no: string;
}

export interface VacateRequestInterface {
    vehicle_no: string;
}

export interface VacateResponeInterface {
    hours_spent: number;
    charges: number;
}