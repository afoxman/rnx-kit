import {
  ConfigLoadingContext as CLIConfig,
  MetroConfig,
  loadMetroConfig as CLILoadMetroConfig,
} from "@react-native-community/cli-plugin-metro";
import type { ConfigOptionsT } from "@react-native-community/cli-plugin-metro/build/tools/loadMetroConfig";
import type { ConfigT } from "metro-config";
export type { MetroConfig };

export type MetroConfigOverrides = ConfigOptionsT & {
  assetPlugins?: string[];
};

/**
 * Load the Metro configuration and apply overrides. If a config file isn't given,
 * this loads from one of the default files -- metro.config.js, metro.config.json,
 * or package.json.
 *
 * @param cliConfig @react-native-community/cli configuration
 * @param overrides Overrides to apply to the Metro configuration
 * @returns Overridden Metro configuration
 */
export function loadMetroConfig(
  cliConfig: CLIConfig,
  overrides: MetroConfigOverrides
): Promise<ConfigT> {
  return CLILoadMetroConfig(cliConfig, overrides).then(
    (metroConfig: MetroConfig) => {
      //
      //  The CLI's type for Metro configuration is incomplete.
      //  Cast to the full Metro config type as defined in @types/metro-config.
      //
      // eslint-disable-next-line
      // @ts-ignore
      const config = metroConfig as ConfigT;

      if (overrides.assetPlugins) {
        //  Overwrite 'assetPlugins' prop which is marked as readonly.
        //
        // eslint-disable-next-line
        // @ts-ignore
        config.transformer.assetPlugins = overrides.assetPlugins;
      }
      return Promise.resolve(config);
    }
  );
}
