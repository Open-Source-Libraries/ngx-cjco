export interface ResourceConfigurationOptions {
  ttl?: number;
  idKey?: string;
  type?: new () => unknown;
  childName?: string;
  autoReset?: boolean;
  skipGetExisting?: boolean;
}
