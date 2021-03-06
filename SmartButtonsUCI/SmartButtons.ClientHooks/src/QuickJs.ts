/* eslint-disable @typescript-eslint/no-unused-vars */

import { stringFormat } from "./StringFormat";
import * as ResourceStrings from "./ResourceStrings";

/* eslint-disable @typescript-eslint/no-namespace */
export function QuickJavascript(
  entityIds: string[],
  javascript: string,
  primaryControl: Xrm.FormContext,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  commandProperties: any,
): void {
  try {
    const entityIdStrings = JSON.stringify(entityIds);
    const jsToExecute = javascript.replace("%ids%", entityIdStrings);
    const functionToExecute = Function("ids", "context", "commandProperties", jsToExecute);
    functionToExecute(entityIds, primaryControl, commandProperties);
  } catch (ex) {
    Xrm.Navigation.openAlertDialog({
      text: stringFormat(ResourceStrings.JSException, ex),
    });
  }
}
