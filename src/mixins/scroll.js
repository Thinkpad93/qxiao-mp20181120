export const scrollMixins = {
  deactivated() {
    window.removeEventListener("scroll", this.handleLoadingMore);
  },
  activated() {
    window.addEventListener("scroll", this.handleLoadingMore);
  },
}
