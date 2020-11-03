function get(v) {
  const { title } = v.$options;
  if (title) return typeof title === "function" ? title.call(v) : title;
}

export default {
  created() {
    const title = get(this);
    if (title) document.title = `Pilih Yuk | ${title}`;
  }
};
