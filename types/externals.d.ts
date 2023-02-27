declare module "*.less" {
  const resource: { [key: string]: string; [className: string]: string };
  export = resource;
}
