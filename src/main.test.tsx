beforeAll(() => {
  const root = document.createElement("div");
  root.setAttribute("id", "root");
  document.body.appendChild(root);
});

test("main.tsx renders without crashing", () => {
  import("./main.tsx");
});
