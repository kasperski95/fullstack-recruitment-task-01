import React from "react";
import { {{name.pascal}}Bloc } from "./{{name.kebab}}-bloc";

let instance: {{name.pascal}}Bloc | null;

export function use{{name.pascal}}Bloc() {
  if (instance == null) instance = new {{name.pascal}}Bloc();

  React.useEffect(() => {
    return () => {
      instance = null;
    }
  }, []);


  return instance;
}
