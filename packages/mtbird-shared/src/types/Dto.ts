export interface ITemplateDTO {
  id?: string;
  name: string;
  avatar?: string;
  content: any;
  teamId?: string;
  pageType?: string;
  type: "component" | "page";
  isPrivate?: boolean;
  componentName?: string;
}
