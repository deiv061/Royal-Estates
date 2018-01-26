
import { Pipe, PipeTransform } from "@angular/core";


@Pipe({
  name: "groupBy"
})
export class GroupByPipe implements PipeTransform {
  transform(input: any, discriminator: any = [], delimiter: string = "|"): any {
    if (!Array.isArray(input) || input.length == 0) {
      return input;
    }
    const a = this.groupBy(input, discriminator, delimiter);
    const keys = Object.keys(a);
    let payload = [];
    for (let i = 0; i < keys.length; i++) {
      payload.push([keys[i], a[keys[i]]]);
    }
    
    return payload;
  }

  private groupBy(list: any[], discriminator: any, delimiter: string) {
    return list.reduce((acc: any, payload: string) => {
      const key = this.extractKeyByDiscriminator(
        discriminator,
        payload,
        delimiter
      );

      acc[key] = Array.isArray(acc[key])
        ? acc[key].concat([payload])
        : [payload];

      return acc;
    }, {});
  }

  private extractKeyByDiscriminator(
    discriminator: any,
    payload: string,
    delimiter: string
  ) {
    if (isFunction(discriminator)) {
      return (<Function>discriminator)(payload);
    }

    if (Array.isArray(discriminator)) {
      return discriminator
        .map(k => extractDeepPropertyByMapKey(payload, k))
        .join(delimiter);
    }

    return extractDeepPropertyByMapKey(payload, <string>discriminator);
  

  function isUndefined(value: any) {
    return typeof value === "undefined";
  }
  
  function isFunction(value: any) {
    return typeof value === "function";
  }
  
   function isObject(value: any) {
    return value !== null && typeof value === "object";
  }
   
  function extractDeepPropertyByMapKey(obj: any, map: string): any {
    const keys = map.split(".");
    const head = keys.shift();
  
    return keys.reduce((prop: any, key: string) => {
      return !isUndefined(prop) && !isUndefined(prop[key])
        ? prop[key]
        : undefined;
    }, obj[head || ""]);
  }
  
   function getKeysTwoObjects(obj: any, other: any): any {
    return [...Object.keys(obj), ...Object.keys(other)].filter(
      (key, index, array) => array.indexOf(key) === index
    );
  }
  
   function isDeepEqual(obj: any, other: any): any {
    if (!isObject(obj) || !isObject(other)) {
      return obj === other;
    }
  
    return getKeysTwoObjects(obj, other).every((key: any): boolean => {
      if (!isObject(obj[key]) && !isObject(other[key])) {
        return obj[key] === other[key];
      }
      if (!isObject(obj[key]) || !isObject(other[key])) {
        return false;
      }
  
      return isDeepEqual(obj[key], other[key]);
    });
  }

}
}