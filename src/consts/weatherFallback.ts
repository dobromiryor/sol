import { Weather } from "../types/weather.type";

export const weatherFallback: { [key: number]: Weather } = {
  201: {
    id: 201,
    description: "thunderstorm with light rain",
    icon: "11d",
    main: "Rain",
  },
  301: {
    id: 301,
    description: "drizzle",
    icon: "09d",
    main: "Drizzle",
  },
  501: {
    id: 501,
    description: "light rain",
    icon: "10d",
    main: "Rain",
  },
  601: {
    id: 601,
    description: "snow",
    icon: "13d",
    main: "Snow",
  },
  701: {
    id: 701,
    description: "mist",
    icon: "50d",
    main: "Mist",
  },
  800: {
    id: 800,
    description: "clear sky",
    icon: "01d",
    main: "Clear",
  },
  801: {
    id: 801,
    description: "few clouds",
    icon: "02d",
    main: "Clouds",
  },
};
