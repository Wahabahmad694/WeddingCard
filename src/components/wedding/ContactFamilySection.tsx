import { motion } from "framer-motion";
import { Phone, MessageCircle, MapPin, Heart, ExternalLink, UserCheck } from "lucide-react";
import { COUPLE, CONTACTS, EVENTS } from "@/data/weddingData";

const ContactFamilySection = () => {
  return (
    <section
      id="contacts"
      className="relative w-screen min-h-screen snap-start flex flex-col items-center justify-center px-4 py-16 overflow-hidden flex-shrink-0"
    >
      {/* Background */}
      <div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(180deg, hsl(35 30% 92%) 0%, hsl(40 33% 96%) 100%)",
        }}
      />
      <div className="absolute inset-0 pattern-islamic opacity-10 pointer-events-none" />

      <div className="relative z-10 w-full max-w-3xl mx-auto my-auto text-center space-y-8">
        {/* Header */}
        <div className="space-y-2">
          <div className="flex items-center justify-center gap-2">
            <UserCheck size={16} className="text-amber-700" />
            <span className="font-cinzel text-xs uppercase tracking-[0.25em] text-amber-800 font-semibold">
              RSVP & Inquiries
            </span>
            <UserCheck size={16} className="text-amber-700" />
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold gold-foil">
            Cordially Invited By
          </h2>

          <p className="font-serif text-lg sm:text-2xl text-amber-950 font-medium">
            {COUPLE.hosts}
          </p>

          <p className="font-serif italic text-sm sm:text-base text-muted-foreground max-w-lg mx-auto">
            "All Uncles, Aunts, Cousins, Friends and Their Families are warmly invited to share our joy."
          </p>
        </div>

        {/* Contact Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {CONTACTS.map((contact, idx) => (
            <motion.div
              key={idx}
              className="p-5 rounded-2xl glass-card border border-amber-300/50 shadow-md text-left flex flex-col justify-between"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.15 }}
            >
              <div>
                <span className="text-[10px] font-cinzel uppercase tracking-wider text-amber-700 font-semibold block mb-1">
                  {contact.relation}
                </span>
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-amber-950 mb-1">
                  {contact.name}
                </h3>
                <p className="font-sans text-sm font-medium text-muted-foreground mb-4">
                  {contact.displayPhone}
                </p>
              </div>

              <div className="flex items-center gap-2 pt-2 border-t border-amber-200">
                <a
                  href={`tel:${contact.phone}`}
                  className="flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-sans text-xs font-semibold shadow transition-all hover:scale-102"
                >
                  <Phone size={14} />
                  <span>Call Now</span>
                </a>

                <a
                  href={contact.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-sans text-xs font-semibold shadow transition-all hover:scale-102"
                >
                  <MessageCircle size={14} />
                  <span>WhatsApp</span>
                </a>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Venues Directory at a glance */}
        <div className="p-6 rounded-3xl glass-card border border-amber-300/40 shadow-lg text-left">
          <h4 className="font-cinzel text-xs uppercase tracking-[0.2em] text-amber-900 font-bold mb-4 text-center">
            Venues Directory • Lahore
          </h4>

          <div className="space-y-3">
            {EVENTS.map((event) => (
              <div
                key={event.id}
                className="flex flex-col sm:flex-row sm:items-center justify-between p-3 rounded-xl bg-white/70 border border-amber-200 gap-2"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-cinzel text-xs font-bold text-amber-800 uppercase">
                      {event.title} ({event.day}, {event.date})
                    </span>
                  </div>
                  <p className="text-xs font-serif text-muted-foreground mt-0.5">
                    {event.venue}
                  </p>
                </div>

                <a
                  href={event.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-100 hover:bg-amber-200 text-amber-900 font-sans text-xs font-medium border border-amber-300 transition-colors self-start sm:self-auto"
                >
                  <MapPin size={13} className="text-amber-700" />
                  <span>Directions</span>
                  <ExternalLink size={11} />
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactFamilySection;
