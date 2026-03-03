export interface HotelData {
  id: string;
  name: string;
  location: string;
  price: number;
  rating: number;
  description: string;
  photos: string[];
}

export const hotels: HotelData[] = [
  {
    id: "1",
    name: "LM Unity Cabo Branco",
    location: "João Pessoa, PB",
    price: 255,
    rating: 8.9,
    description: "Vista definitiva para o mar de Cabo Branco. Deck privativo e piscina infinita.",
    photos: ["https://images.unsplash.com/photo-1566073771259-6a8506099945", "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b", "https://images.unsplash.com/photo-1563298723-dcfebaa392e3"]
  },
  {
    id: "2",
    name: "The South Kensington",
    location: "Londres, UK",
    price: 890,
    rating: 9.2,
    description: "Charme britânico clássico com interiores modernos no coração de Londres.",
    photos: ["https://images.unsplash.com/photo-1542314831-068cd1dbfeeb", "https://images.unsplash.com/photo-1571896349842-33c89424de2d", "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4"]
  },
  {
    id: "3",
    name: "Resort Solar das Águas",
    location: "Olímpia, SP",
    price: 450,
    rating: 8.5,
    description: "Perfeito para famílias. Parques aquáticos termais e lazer completo.",
    photos: ["https://images.unsplash.com/photo-1584132967334-10e028bd69f7", "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd", "https://images.unsplash.com/photo-1529290130-4ca3753253ae"]
  },
  {
    id: "4",
    name: "Eco Lodge Amazônia",
    location: "Manaus, AM",
    price: 1200,
    rating: 9.8,
    description: "Experiência imersiva na selva com luxo sustentável e passeios exclusivos.",
    photos: ["https://images.unsplash.com/photo-1590073242678-70ee3fc28e8e", "https://images.unsplash.com/photo-1439066615861-d1af74d74000", "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9"]
  },
  {
    id: "5",
    name: "Oceanic Suítes",
    location: "Balneário Camboriú, SC",
    price: 670,
    rating: 9.0,
    description: "Apartamentos de alto padrão com automação residencial e vista para a ilha.",
    photos: ["https://images.unsplash.com/photo-1563911302283-d2bc129e7570", "https://images.unsplash.com/photo-1578683010236-d716f9759678", "https://images.unsplash.com/photo-1551882547-ff43c63efe8c"]
  }
];
