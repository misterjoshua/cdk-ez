import { getLocalConfigHook } from "./getLocalConfig";

export async function applyLocalConfig<Type>(
  name: string,
  object: Type
): Promise<Type> {
  return (await getLocalConfigHook<Type>(name))(object);
}
