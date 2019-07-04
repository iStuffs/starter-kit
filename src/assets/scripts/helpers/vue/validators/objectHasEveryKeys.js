function objectHasEveryKeys(object, arrayKeys) {
  return arrayKeys.every(key => key in object);
}
export default objectHasEveryKeys;
