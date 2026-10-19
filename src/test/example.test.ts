import { describe, it, expect } from "vitest";
import { COUPLE, EVENTS, CONTACTS } from "../data/weddingData";

describe("Wedding Data Integrity", () => {
  it("should have correct couple details", () => {
    expect(COUPLE.groom).toBe("Wahab Ahmad");
    expect(COUPLE.bride).toBe("Zarbab Mubeen");
    expect(COUPLE.hosts).toBe("Mr. & Mrs. Kabeer Ahmad");
  });

  it("should contain 3 chronological events", () => {
    expect(EVENTS).toHaveLength(3);
    const [mehndi, barat, walima] = EVENTS;

    expect(mehndi.id).toBe("mehndi");
    expect(mehndi.date).toBe("1st January 2027");
    expect(mehndi.venue).toContain("DHA Rahbar");
    expect(mehndi.eagerlyAwaiting).toHaveLength(12);
    expect(mehndi.eagerlyAwaiting).toContain("Binish");
    expect(mehndi.eagerlyAwaiting).toContain("Mushfira");

    expect(barat.id).toBe("barat");
    expect(barat.date).toBe("2nd January 2027");
    expect(barat.venue).toContain("Le Grand Chalet Royal");

    expect(walima.id).toBe("walima");
    expect(walima.date).toBe("3rd January 2027");
    expect(walima.venue).toContain("Marquesina Hall");
  });

  it("should contain contact persons with WhatsApp links", () => {
    expect(CONTACTS).toHaveLength(2);
    expect(CONTACTS[0].name).toBe("Waqas Ahmad");
    expect(CONTACTS[0].phone).toBe("+923134046343");
    expect(CONTACTS[1].name).toBe("Mozam Naseer");
    expect(CONTACTS[1].phone).toBe("+923257630095");
  });
});
