import uuid from 'react-native-uuid';
export const genetateUUID = () => {
  return uuid.v4().toString();
};

export const Category = {
  Agriculture: 'Agri',
  CPVCPro: 'CPVC',
  FoamCore: 'Foam',
  DrainPro: 'Drain',
};

export const LargeCategoryName = {
  Agriculture: 'Agriculture',
  CPVC: 'CPVC',
  CPVCPro: 'CPVC Pro',
  DrainMaster: 'Drain Master',
  DrainPro: 'Drain Pro',
  UPVC: 'UPVC',
  Silencio: 'Silencio',
  FoamCore: 'Foam Core',
  Drex: 'Drex',
};

export const getCategoryEnumValueByString = (
  stringValue: string,
): string | undefined => {
  const enumKey = Object.keys(Category).find(
    key => Category[key as keyof typeof Category] === stringValue,
  );
  // console.log(enumKey);
  return enumKey ? Category[enumKey as keyof typeof Category] : undefined;
};

export const getCategoryLargeEnumValueByString = (
  stringValue: string,
): string | undefined => {
  const enumKey = Object.keys(LargeCategoryName).find(
    key => LargeCategoryName[key as keyof typeof Category] === stringValue,
  );
  // console.log(enumKey);
  return enumKey
    ? LargeCategoryName[enumKey as keyof typeof LargeCategoryName]
    : undefined;
};

export const filterArrayByString = (data: any[], search: string): any[] => {
  if (search.length < 3) return data;

  return data.filter(item =>
    item?.title?.toLowerCase().includes(search.toLowerCase()),
  );
};
