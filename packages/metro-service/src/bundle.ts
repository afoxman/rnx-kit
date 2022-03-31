import {
  buildBundleWithConfig,
  CommandLineArgs as BundleArgs,
  MetroConfig,
} from "@react-native-community/cli-plugin-metro";
export type { BundleArgs };

export async function bundle(args: BundleArgs, config: ConfigT): Promise<void> {
  //
  //  The CLI uses an incomplete type for Metro config.
  //  Cast to it here for the the bundle API call.
  //  Also, ignore the unused return value from the CLI.
  //
  // eslint-disable-next-line
  // @ts-ignore
  return buildBundleWithConfig(args, config as MetroConfig).then(() => {
    return;
  });
}
