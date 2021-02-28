export const replaceStr = (originalStr: string, matchString: any, replacebleString: any) => {
  if (originalStr && typeof matchString !== 'undefined' && typeof replacebleString !== 'undefined') {
    return originalStr.replace(matchString, replacebleString);
  }
  return originalStr;
};
