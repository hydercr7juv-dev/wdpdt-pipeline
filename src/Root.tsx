import React from "react";
import { Composition } from "remotion";
import { Short } from "./Short";
import { FPS, WIDTH, HEIGHT } from "./lib/timing";
import { VideoSpec, durationInFrames } from "./lib/video";
import { airplaneLights } from "./videos/airplaneLights";
import { windowHole } from "./videos/windowHole";
import { fuelDump } from "./videos/fuelDump";
import { bleedAir } from "./videos/bleedAir";
import { blandFood } from "./videos/blandFood";
import { wingFlex } from "./videos/wingFlex";
import { roundWindows } from "./videos/roundWindows";
import { contrails } from "./videos/contrails";
import { blackbox } from "./videos/blackbox";
import { cruiseAltitude } from "./videos/cruiseAltitude";
import { windowShades } from "./videos/windowShades";
import { boardingLeft } from "./videos/boardingLeft";
import { landingWind } from "./videos/landingWind";
import { tireBurst } from "./videos/tireBurst";
import { lostLuggage } from "./videos/lostLuggage";
import { whitePlanes } from "./videos/whitePlanes";
import { earsPop } from "./videos/earsPop";
import { lightningStrike } from "./videos/lightningStrike";
import { toiletFlush } from "./videos/toiletFlush";
import { pushback } from "./videos/pushback";
import { earthStopped } from "./videos/earthStopped";

const SPECS: VideoSpec[] = [
  airplaneLights,
  windowHole,
  fuelDump,
  bleedAir,
  blandFood,
  wingFlex,
  roundWindows,
  contrails,
  blackbox,
  cruiseAltitude,
  windowShades,
  boardingLeft,
  landingWind,
  tireBurst,
  lostLuggage,
  whitePlanes,
  earsPop,
  lightningStrike,
  toiletFlush,
  pushback,
  earthStopped,
];

export const RemotionRoot: React.FC = () => {
  return (
    <>
      {SPECS.map((spec) => (
        <Composition
          key={spec.id}
          id={spec.id}
          component={Short}
          durationInFrames={durationInFrames(spec)}
          fps={FPS}
          width={WIDTH}
          height={HEIGHT}
          defaultProps={{ spec }}
        />
      ))}
    </>
  );
};
