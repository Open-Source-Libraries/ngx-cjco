import { ResourcesConfiguration } from './resources-configuration.container';

let classNameId = 0;

function addClassName(target: { name: string | never[]; }): void {
  if (!target.name || target.name.length < 2) {
    Object.defineProperty(target, 'name', {
      value: `__ClassName__${++classNameId}`,
      enumerable: false,
      writable: false,
      configurable: true,
    });
  }
}

export function resource(resourceName: string): ClassDecorator {
  return (target) => {
    addClassName(target.prototype.constructor);

    if (!ResourcesConfiguration.resources.some((r) => r.resourceName === resourceName)) {
      ResourcesConfiguration.resources.push({
        // type: target.prototype.constructor,
        name: target.prototype.constructor.name,
        type: target.prototype.constructor,
        resourceName
      });
    }
  };
}
