export interface WeddingScheduleItem {
  label: string;
  time: string;
}

export interface WeddingEvent {
  id: string;
  title: string;
  ceremony: string;
  subtitle: string;
  date: string;
  day: string;
  isoDate: string; // for calendar and countdown
  timeSummary: string;
  schedule: WeddingScheduleItem[];
  departureFrom?: string;
  venue: string;
  venueShort: string;
  googleMapsUrl: string;
  eagerlyAwaiting?: string[];
  rsvp?: string;
  theme: "mehndi" | "barat" | "walima";
}

export interface ContactPerson {
  name: string;
  phone: string;
  displayPhone: string;
  whatsappUrl: string;
  relation?: string;
}

export const COUPLE = {
  groom: "Wahab Ahmad",
  bride: "Zarbab Mubeen",
  initials: "W & Z",
  hosts: "Mr. & Mrs. Kabeer Ahmad",
  quranicVerse: "In the Name of Allah, the Most Beneficent, the Most Merciful",
  arabicBismillah: "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ",
  weddingTargetDate: "2027-01-01T19:00:00", // Start of celebrations (Mehndi)
};

export const CONTACTS: ContactPerson[] = [
  {
    name: "Waqas Ahmad",
    phone: "+923134046343",
    displayPhone: "0313-4046343",
    whatsappUrl: "https://wa.me/923134046343?text=Salam%20Waqas!%20Heartiest%20congratulations%20on%20Wahab%20and%20Zarbab's%20wedding!",
    relation: "Family Host",
  },
  {
    name: "Mozam Naseer",
    phone: "+923257630095",
    displayPhone: "0325-7630095",
    whatsappUrl: "https://wa.me/923257630095?text=Salam%20Mozam!%20Heartiest%20congratulations%20on%20Wahab%20and%20Zarbab's%20wedding!",
    relation: "Family Host",
  },
];

export const EVENTS: WeddingEvent[] = [
  {
    id: "mehndi",
    title: "Mehndi",
    ceremony: "Rasm-e-Hina",
    subtitle: "Please join us to celebrate the Rasm-e-Hina of our beloved son",
    day: "Friday",
    date: "1st January 2027",
    isoDate: "2027-01-01T19:00:00",
    timeSummary: "7:00 PM Onwards",
    schedule: [
      { label: "Reception of Guests", time: "7:00 PM" },
      { label: "Dinner", time: "8:00 PM" },
    ],
    venue: "House #2, Block J, Sector II, DHA Rahbar Phase II, Lahore",
    venueShort: "DHA Rahbar Phase II, Lahore",
    googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=House+2+Block+J+Sector+II+DHA+Rahbar+Phase+II+Lahore",
    eagerlyAwaiting: [
      "Binish",
      "Ansa",
      "Maryam",
      "Aqsa",
      "Javeria",
      "Qudsia",
      "Ramsha",
      "Rijja",
      "Nimra",
      "Banafsha",
      "Husna",
      "Mushfira",
    ],
    theme: "mehndi",
  },
  {
    id: "barat",
    title: "Barat",
    ceremony: "Wedding Ceremony",
    subtitle: "Mr. & Mrs. Kabeer Ahmad cordially invite you to the Wedding Ceremony of their beloved son",
    day: "Saturday",
    date: "2nd January 2027",
    isoDate: "2027-01-02T17:00:00",
    timeSummary: "5:00 PM Onwards",
    schedule: [
      { label: "Sehra Bandi", time: "5:00 PM" },
      { label: "Departure of Barat", time: "6:00 PM" },
    ],
    departureFrom: "House #2, Block J, Sector II, DHA Rahbar Phase II, Lahore",
    venue: "Le Grand Chalet Royal, Plot 405 to 410, Block D2, Behind LDA Sports Complex, Johar Town, Lahore",
    venueShort: "Le Grand Chalet Royal, Johar Town",
    googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=Le+Grand+Chalet+Royal+Plot+405+to+410+Block+D2+Johar+Town+Lahore",
    rsvp: "All Uncles, Aunts, Cousins, Friends and Their Families",
    theme: "barat",
  },
  {
    id: "walima",
    title: "Walima",
    ceremony: "Walima Ceremony",
    subtitle: "Mr. & Mrs. Kabeer Ahmad cordially invite you to the Walima Ceremony celebrating the marriage of their beloved son",
    day: "Sunday",
    date: "3rd January 2027",
    isoDate: "2027-01-03T19:00:00",
    timeSummary: "7:00 PM Onwards",
    schedule: [
      { label: "Reception of Guests", time: "7:00 PM" },
      { label: "Dinner", time: "8:00 PM" },
    ],
    venue: "Marquesina Hall, Garrison Golf & Country Club, Saddar Town, Lahore",
    venueShort: "Marquesina Hall, Garrison Golf & Country Club",
    googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=Marquesina+Hall+Garrison+Golf+and+Country+Club+Saddar+Town+Lahore",
    rsvp: "All Uncles, Aunts, Cousins, Friends and Their Families",
    theme: "walima",
  },
];
