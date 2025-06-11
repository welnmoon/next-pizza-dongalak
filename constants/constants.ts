export const placeHolderAdress = ({
  city = "Алматы",
}: {
  city: string;
}): string => {
  return `г. ${city}, улица Ахмета Байтурсынова, дом 12, блок 4А, кв. 12`;
};
