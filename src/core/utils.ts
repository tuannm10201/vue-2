export default {
  wait(miliseconds: number) {
    return new Promise((resolve) => setTimeout(resolve, miliseconds));
  },
};
