import { AppRegistry } from "react-native";

import { name as appName } from "./app.json";
import { Main } from "./src/presentation/main";

AppRegistry.registerComponent(appName, () => Main);
