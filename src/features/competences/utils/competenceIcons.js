import {
  BrickWall,
  Fan,
  Hammer,
  HardHat,
  Layers,
  Paintbrush,
  Plug,
  ToolCase,
  Wrench,
} from "lucide-react";

export const competenceIcons = {
  tømrer: Hammer,
  snedker: Hammer,
  maler: Paintbrush,
  vvs: Wrench,
  "vvs'er": Wrench,
  elektriker: Plug,
  murer: BrickWall,
  arbejdsmand: HardHat,
  ventilation: Fan,
  gulvlægger: Layers,
  montør: ToolCase,
};

export const getCompetenceIcon = (name) => {
  if (!name) {
    return null;
  }

  return competenceIcons[name.trim().toLowerCase()] ?? null;
};
