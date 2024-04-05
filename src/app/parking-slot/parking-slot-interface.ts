export interface ParkingSlotInterface {
    parking_slot_no: string;
    vehicle_type: string;
    status?: string;
}

export interface ParkingSlotUpdateInterface {
    vehicle_type_name: string;
    new_status: string;
}