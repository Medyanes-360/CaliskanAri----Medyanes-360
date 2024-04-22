export function PostHomeInfo(params) {
  if (params.page === "1") {
    return {
      title: "Home Page",
      description: "This is the home page",
    };
  }
}
