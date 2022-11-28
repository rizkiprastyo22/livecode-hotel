import { Guest } from "./guest";

export interface Book {
    id: number;
    status: "reserved" | "checked-in" | "checked-out";
    roomNumber: string;
    duration: number; // dalam satuan malam, jika 2 berarti 2 malam menginap.
    guestCount: number; // jumlah tamu yang menginap dalam 1 kamar
    reservee: Guest;
}

export const BOOK = 'bookings'