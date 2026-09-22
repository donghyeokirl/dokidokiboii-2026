declare module "*.inline.svg" {
  import * as React from "react";
  const ReactComponent: React.FunctionComponent<
    React.ComponentPropsWithoutRef<"svg"> & { title?: string }
  >;
  export default ReactComponent;
}
