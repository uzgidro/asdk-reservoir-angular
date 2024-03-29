import {
  animate,
  style,
  transition,
  trigger
} from "@angular/animations";
export const DropDownAnimation = trigger("DropDownMenu", [
  transition(":enter", [
    style({ height: 0, overflow: "hidden" }),
    animate("300ms ease-out", style({ height: "*" }))
  ]),

  transition(":leave", [
    style({ height: "*", overflow: "hidden" }),
    animate("300ms ease-in", style({ height: 0 }))
  ])
]);

export const SideMenuAnimation = trigger("SideMenu", [
  transition(":enter", [
    style({ width: 0, overflow: "hidden" }),
    animate("300ms ease-out", style({ width: "*" }))
  ]),

  transition(":leave", [
    style({ width: "*", overflow: "hidden" }),
    animate("300ms ease-in", style({ width: 0 }))
  ])
]);
