interface Site {
  about: About;
  hero: Hero;
  social: Social;
}

interface Social {
  facebook: string;
  instagram: string;
  linkedin: string;
  twitter: string;
}

interface Hero {
  heroImg: string;
  nombre: string;
}

interface About {
  birthday: string;
  city: string;
  country: string;
  descripcion: string;
  descripcion2: string;
  descripcion3: string;
  email: string;
  imagen: string;
  titulo: string;
  website: string;
}