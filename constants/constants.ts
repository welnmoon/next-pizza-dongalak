export const placeHolderaddress = ({
  city = "Алматы",
}: {
  city: string;
}): string => {
  return `г. ${city}, улица Ахмета Байтурсынова, дом 12, блок 4А, кв. 12`;
};

export const deliveryCost = 1000;
