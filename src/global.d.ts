declare module "*.md";
declare module "*.json" {
  const content: {
    [prop: string]: Record<"src" | "url" | "title" | "summary", string>;
  };
  export default content;
}
