import { faker } from "@faker-js/faker";
import { ANIMALS } from "../constants/ANIMALS";

const getImage = () =>
  faker.image.urlLoremFlickr({ category: "animals", width: 644, height: 362 });
const getType = () => faker.animal.type();
const getUrl = () => faker.internet.url();
const getText = () => faker.lorem.sentences();
const getTitle = (type: string) => {
  const animalFunctions: { [key: string]: () => string } = Object.fromEntries(
    ANIMALS.map((animal) => [
      animal,
      faker.animal[animal as keyof typeof faker.animal],
    ])
  );

  return animalFunctions[type.toLowerCase()]
    ? animalFunctions[type.toLowerCase()]()
    : faker.animal.type();
};

export const generateFakeData = (count: number) => {
  return [...new Array(count)].map((_, index) => {
    const type = getType();
    return {
      type,
      id: index + 1,
      url: getUrl(),
      title: getTitle(type),
      description: getText(),
      image: getImage(),
    };
  });
};
