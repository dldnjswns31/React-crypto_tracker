import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    textColor: string;
    bgColor: string;
    cardBgColor: string;
    accentColor: string;
  }
}
